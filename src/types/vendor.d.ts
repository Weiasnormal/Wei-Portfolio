declare module "vanta/dist/vanta.halo.min" {
  import type * as THREE from "three";
  interface VantaOptions {
    THREE?: typeof THREE;
    el: HTMLElement | null;
    [key: string]: unknown;
  }
  interface VantaEffect {
    destroy(): void;
  }
  function HALO(options: VantaOptions): VantaEffect;
  export default HALO;
}

declare module "*.css";
