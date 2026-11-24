// Three.js scene for the 3D PC setup on /setup: loads the Blender export, flies the camera to a part when
// it is clicked, and outlines it. Loaded only in the browser (SetupExplorer imports it dynamically).
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";

export type SceneOptions = {
  model: string;
  lcdVideo?: string;
  /** Part id -> the part to fly to instead ("aio:pump" = a sub-node of a part). */
  focusOf?: Record<string, string | undefined>;
  onSelect: (id: string | null) => void;
  onHover: (id: string | null, x: number, y: number) => void;
  onReady: () => void;
  onError: (message: string) => void;
};

export type SetupScene = {
  select: (id: string | null) => void;
  /** Pixels on the right covered by the info card; the view centres the part in the space left over. */
  setInset: (px: number) => void;
  dispose: () => void;
};

const HOME = { pos: new THREE.Vector3(0.05, 1.5, 1.4), target: new THREE.Vector3(0.05, 0.9, -0.05) };
const MIST_ORIGIN = new THREE.Vector3(0.1, 0.955, -0.15); // humidifier top hole

export function createSetupScene(host: HTMLElement, opt: SceneOptions): SetupScene {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let w = host.clientWidth || 1, h = host.clientHeight || 1;

  const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
  // 1.5x is sharp enough with bloom on top; drops further if the device can't hold the frame rate (see loop).
  const MAX_DPR = Math.min(devicePixelRatio, 1.5);
  let dpr = MAX_DPR;
  renderer.setPixelRatio(dpr);
  renderer.setSize(w, h);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.9;
  renderer.domElement.style.display = "block";
  host.prepend(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x050608);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = env;
  scene.environmentIntensity = 0.15;
  scene.add(new THREE.HemisphereLight(0x8090ff, 0x100808, 0.25));
  const bar = new THREE.SpotLight(0xfff4e8, 2.2, 2.5, Math.PI / 3, 0.6, 1.5); // monitor light bar
  bar.position.set(-0.15, 1.25, -0.15);
  bar.target.position.set(-0.1, 0.75, 0.15);
  scene.add(bar, bar.target);
  const caseGlow = new THREE.PointLight(0xffc8d8, 0.8, 1.2, 2);
  caseGlow.position.set(0.5, 0.95, -0.05);
  scene.add(caseGlow);

  const camera = new THREE.PerspectiveCamera(38, w / h, 0.005, 50);
  // Full-desk view, backed off on narrow frames so the whole desk still fits.
  const homePos = () => {
    const back = Math.max(1, Math.pow(1.6 / (w / h), 0.9));
    return HOME.target.clone().add(HOME.pos.clone().sub(HOME.target).multiplyScalar(back));
  };
  camera.position.copy(homePos());
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.copy(HOME.target);
  controls.enableDamping = true;
  controls.minDistance = 0.06;
  controls.maxDistance = 3;
  controls.maxPolarAngle = Math.PI * 0.55;
  // Inside a scrolling page: one finger scrolls the page (taps still pick parts), two fingers orbit and pinch.
  controls.touches = { ONE: null, TWO: THREE.TOUCH.DOLLY_ROTATE };
  renderer.domElement.style.touchAction = "pan-y";
  // Plain wheel scrolls the page; Ctrl/Cmd + wheel (and trackpad pinch, which sends ctrlKey) zooms the model.
  // This capture listener on the host runs before OrbitControls' own wheel handler on the canvas.
  controls.enableZoom = false;
  const onWheel = (e: WheelEvent) => { controls.enableZoom = e.ctrlKey || e.metaKey; };
  host.addEventListener("wheel", onWheel, { capture: true, passive: true });

  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const outline = new OutlinePass(new THREE.Vector2(w, h), scene, camera);
  outline.edgeStrength = 3;
  outline.edgeGlow = 0.4;
  outline.edgeThickness = 1.2;
  outline.visibleEdgeColor.set(0xd9ccff);
  outline.hiddenEdgeColor.set(0xb9a4ff); // internals sit behind glass, so hidden edges get the same colour
  composer.addPass(outline);
  // (UnrealBloomPass already works at half resolution. Halving it again washed out thin lights such as the
  // monitor light bar and the red fan accents, so it stays at its default.)
  composer.addPass(new UnrealBloomPass(new THREE.Vector2(w, h), 0.4, 0.45, 0.92));
  composer.addPass(new OutputPass());

  // Real AIO screen recording, looped on the pump LCD. Its src is set once the model is in, so it doesn't
  // compete with the model download.
  let lcd: HTMLVideoElement | null = null, lcdTex: THREE.VideoTexture | null = null;
  if (opt.lcdVideo) {
    lcd = Object.assign(document.createElement("video"), { preload: "none", loop: true, muted: true, playsInline: true });
    lcdTex = new THREE.VideoTexture(lcd);
    lcdTex.colorSpace = THREE.SRGBColorSpace;
    lcdTex.flipY = false; // glTF UV convention
  }

  // Humidifier mist: soft sprites that rise, spread and fade.
  const mistCanvas = Object.assign(document.createElement("canvas"), { width: 64, height: 64 });
  const g = mistCanvas.getContext("2d")!;
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, "rgba(255,255,255,0.55)");
  grad.addColorStop(0.5, "rgba(255,255,255,0.18)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  const mistTex = new THREE.CanvasTexture(mistCanvas);
  const mist = Array.from({ length: 26 }, (_, i) => {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: mistTex, color: 0xdfe6ff, transparent: true, depthWrite: false, opacity: 0 }));
    s.userData = { age: i / 26, drift: Math.random() * Math.PI * 2 };
    scene.add(s);
    return s;
  });
  const updateMist = (dt: number) => {
    for (const s of mist) {
      const u = s.userData as { age: number; drift: number };
      u.age = (u.age + dt / 4.5) % 1;
      const a = u.age;
      s.position.set(MIST_ORIGIN.x + Math.sin(u.drift + a * 5) * 0.012 * a, MIST_ORIGIN.y + a * 0.16, MIST_ORIGIN.z + Math.cos(u.drift + a * 4) * 0.01 * a);
      const size = 0.012 + a * 0.06;
      s.scale.set(size, size, 1);
      (s.material as THREE.SpriteMaterial).opacity = Math.min(a * 6, 1) * (1 - a) * 0.45;
    }
  };

  /* ---------- parts ---------- */
  const nodes: Record<string, THREE.Object3D[]> = {}; // "gpu" -> nodes, "aio:pump" -> nodes
  const fans: THREE.Object3D[] = [];
  let model: THREE.Object3D | null = null;
  let selected: string | null = null, hovered: string | null = null;
  const targetNodes = (id: string | null) => (id ? nodes[opt.focusOf?.[id] ?? id] ?? [] : []);
  const refreshOutline = () => {
    outline.selectedObjects = [...new Set([...targetNodes(selected), ...targetNodes(hovered)])];
  };
  const partOf = (o: THREE.Object3D | null) => {
    for (; o; o = o.parent) if (o.userData?.part) return o.userData.part as string;
    return null;
  };
  const isGlass = (m: THREE.Material | THREE.Material[]) => {
    const mm = m as THREE.MeshPhysicalMaterial;
    return !Array.isArray(m) && (mm.transmission > 0 || (mm.transparent && mm.opacity < 0.9));
  };

  /* ---------- camera flight ---------- */
  type Flight = { p0: THREE.Vector3; t0: THREE.Vector3; p1: THREE.Vector3; t1: THREE.Vector3; t: number; dur: number; arc: number };
  let flight: Flight | null = null;
  const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const flyTo = (p1: THREE.Vector3, t1: THREE.Vector3) => {
    const d = camera.position.distanceTo(p1);
    flight = { p0: camera.position.clone(), t0: controls.target.clone(), p1, t1, t: 0,
      dur: reduced ? 0.001 : THREE.MathUtils.clamp(0.7 + d * 0.5, 0.8, 1.6), arc: Math.min(d * 0.25, 0.3) };
  };
  controls.addEventListener("start", () => { flight = null; }); // grabbing the view cancels a flight

  const framing = (objs: THREE.Object3D[]) => {
    const box = new THREE.Box3();
    for (const o of objs) box.expandByObject(o);
    const sphere = box.getBoundingSphere(new THREE.Sphere());
    const dir = new THREE.Vector3(...((objs[0].userData.view as [number, number, number]) ?? [0, 0.4, 1])).normalize();
    const half = THREE.MathUtils.degToRad(camera.fov) / 2;
    const visibleAspect = (w - inset) / h;
    const fit = sphere.radius / Math.sin(Math.min(half, Math.atan(Math.tan(half) * visibleAspect)));
    const dist = THREE.MathUtils.clamp(fit * 1.4, 0.18, 2.4);
    return { target: sphere.center.clone(), pos: sphere.center.clone().addScaledVector(dir, dist) };
  };

  // The info card covers the right side: shift the projection so the part sits centred in the free area.
  let inset = 0, insetNow = 0;
  const applyInset = () => {
    if (insetNow < 0.5) camera.clearViewOffset();
    else camera.setViewOffset(w, h, insetNow / 2, 0, w, h);
  };

  const select = (id: string | null) => {
    selected = id;
    refreshOutline();
    const objs = targetNodes(id);
    if (id && objs.length) {
      const f = framing(objs);
      flyTo(f.pos, f.target);
    } else if (!id) flyTo(homePos(), HOME.target.clone());
  };

  /* ---------- picking: first solid surface under the pointer; glass is clicked through ---------- */
  const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
  const pick = (e: PointerEvent) => {
    if (!model) return null;
    const r = renderer.domElement.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    for (const hit of ray.intersectObject(model, true)) {
      if (isGlass((hit.object as THREE.Mesh).material)) continue;
      return partOf(hit.object); // a solid non-part (desk, props) blocks the click
    }
    return null;
  };
  let down: { x: number; y: number; t: number } | null = null;
  const el = renderer.domElement;
  const onDown = (e: PointerEvent) => {
    down = { x: e.clientX, y: e.clientY, t: performance.now() };
    lcd?.play().catch(() => {});
  };
  const onUp = (e: PointerEvent) => {
    if (!down || Math.hypot(e.clientX - down.x, e.clientY - down.y) > 6 || performance.now() - down.t > 600) return;
    const id = pick(e);
    if (id) opt.onSelect(id);
    else if (selected) opt.onSelect(null);
  };
  const onMove = (e: PointerEvent) => {
    if (e.pointerType !== "mouse" || e.buttons) return;
    const id = pick(e);
    if (id !== hovered) { hovered = id; refreshOutline(); }
    el.style.cursor = id ? "pointer" : "";
    const r = el.getBoundingClientRect();
    opt.onHover(id, e.clientX - r.left, e.clientY - r.top);
  };
  const onLeave = () => {
    if (hovered) { hovered = null; refreshOutline(); }
    opt.onHover(null, 0, 0);
  };
  el.addEventListener("pointerdown", onDown);
  el.addEventListener("pointerup", onUp);
  el.addEventListener("pointermove", onMove);
  el.addEventListener("pointerleave", onLeave);

  /* ---------- load ---------- */
  let disposed = false;
  // The model is meshopt-compressed (gltf-transform). The decoder's worker mode isn't used: it builds the worker
  // from function source, which breaks once the bundler minifies it. Decoding ~1 MB on the main thread is quick.
  new GLTFLoader().setMeshoptDecoder(MeshoptDecoder).load(
    opt.model,
    async (gltf) => {
      if (disposed) return;
      gltf.scene.traverse((o) => {
        const m = (o as THREE.Mesh).material as THREE.MeshPhysicalMaterial | undefined;
        if ((o as THREE.Mesh).isMesh && m) {
          // Lights and screens (KHR_materials_emissive_strength > 1) skip tone mapping so bloom catches them.
          // Materials merged into palettes carry an all-black emissive map, so the colour alone can't tell.
          if (m.emissiveIntensity > 1) m.toneMapped = false;
          // Transmission makes three.js render the whole scene a second time every frame. Thin tinted glass
          // looks the same as plain transparency here, so swap it (picking still clicks through it).
          // A dark tint keeps it reading as clear glass (a light one turns milky under the case glow).
          if (m.transmission > 0) {
            m.transmission = 0;
            m.map = null; // palette colour; the tint below replaces it
            m.color.setRGB(0.012, 0.012, 0.016);
            m.roughness = 0.05;
            m.metalness = 0;
            m.transparent = true;
            m.opacity = 0.22;
            m.depthWrite = false;
            m.needsUpdate = true;
          }
          if (m.name === "Monitor screen") { m.toneMapped = true; m.emissiveIntensity = 0.75; } // keep the wallpaper readable
          if (m.name === "Pump LCD screen" && lcdTex) { m.emissiveMap = lcdTex; m.map = null; m.needsUpdate = true; }
        }
        if (o.name.startsWith("Fan_blades") || o.name.startsWith("Fan blades")) fans.push(o);
        const u = o.userData as { part?: string; sub?: string };
        if (u.part) {
          (nodes[u.part] ||= []).push(o);
          if (u.sub) (nodes[`${u.part}:${u.sub}`] ||= []).push(o);
        }
      });
      // Compile the shaders before the first frame, one node at a time with a yield in between, so the work is
      // spread over many short tasks instead of one long one that freezes the page (programs are cached, so
      // nodes that share a material set cost nothing). The scene is drawn into the composer's buffer, not the
      // screen, and three.js picks different shader variants for that (no tone mapping), so compile for it.
      for (const node of [...gltf.scene.children]) {
        renderer.setRenderTarget(composer.readBuffer);
        try { await renderer.compileAsync(node, camera, scene); } catch { /* compiled on first render instead */ }
        renderer.setRenderTarget(null);
        await new Promise((r) => setTimeout(r));
        if (disposed) return;
      }
      model = gltf.scene;
      scene.add(model);
      if (lcd && opt.lcdVideo) { lcd.src = opt.lcdVideo; lcd.play().catch(() => {}); } // muted autoplay; retried on the first click if blocked
      refreshOutline();
      if (selected) select(selected);
      opt.onReady();
    },
    undefined,
    (err) => opt.onError(err instanceof Error ? err.message : String(err)),
  );

  /* ---------- loop: paused while the model is off screen ---------- */
  const clock = new THREE.Clock();
  // Adaptive resolution: if a second of frames averages under ~45 fps, render at a lower pixel ratio (down to 1).
  let frames = 0, spent = 0;
  const adapt = (raw: number) => {
    if (!model || flight || dpr <= 1) return;
    frames++; spent += raw;
    if (spent < 1) return;
    if (frames / spent < 45) {
      dpr = Math.max(1, dpr - 0.25);
      renderer.setPixelRatio(dpr);
      composer.setPixelRatio(dpr);
    }
    frames = 0; spent = 0;
  };
  const loop = () => {
    const raw = clock.getDelta();
    const dt = Math.min(raw, 0.1);
    if (raw < 0.25) adapt(raw); // skip the gap after the tab or the frame was hidden
    if (!reduced) for (const f of fans) f.rotateY(dt * 6);
    updateMist(dt);
    if (Math.abs(insetNow - inset) > 0.5) {
      insetNow += (inset - insetNow) * Math.min(1, dt * 8);
      applyInset();
    } else if (insetNow !== inset) { insetNow = inset; applyInset(); }
    if (flight) {
      flight.t += dt;
      const k = ease(Math.min(flight.t / flight.dur, 1));
      camera.position.lerpVectors(flight.p0, flight.p1, k);
      camera.position.y += Math.sin(Math.PI * k) * flight.arc; // slight lift so the path clears the desk items
      controls.target.lerpVectors(flight.t0, flight.t1, k);
      if (k >= 1) flight = null;
    }
    controls.update();
    composer.render();
  };
  const io = new IntersectionObserver(([entry]) => {
    clock.getDelta();
    renderer.setAnimationLoop(entry.isIntersecting ? loop : null);
    if (entry.isIntersecting) lcd?.play().catch(() => {});
    else lcd?.pause();
  });
  io.observe(host);

  const ro = new ResizeObserver(() => {
    w = host.clientWidth || 1;
    h = host.clientHeight || 1;
    camera.aspect = w / h;
    applyInset();
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    composer.setSize(w, h);
  });
  ro.observe(host);

  return {
    select,
    setInset: (px) => { inset = px; },
    dispose: () => {
      disposed = true;
      io.disconnect();
      ro.disconnect();
      renderer.setAnimationLoop(null);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      host.removeEventListener("wheel", onWheel, { capture: true });
      controls.dispose();
      lcd?.pause();
      lcd?.removeAttribute("src");
      scene.traverse((o) => {
        const mesh = o as THREE.Mesh;
        mesh.geometry?.dispose();
        const mats = Array.isArray(mesh.material) ? mesh.material : mesh.material ? [mesh.material] : [];
        for (const m of mats) {
          for (const v of Object.values(m)) if (v instanceof THREE.Texture) v.dispose();
          m.dispose();
        }
      });
      env.dispose();
      pmrem.dispose();
      composer.dispose();
      renderer.dispose();
      el.remove();
    },
  };
}
