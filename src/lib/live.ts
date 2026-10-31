// Realtime layer behind the visitor count, shared cursors and visitor chat.
// Firebase loads on demand so it never weighs down the first paint. Setup: docs/live-visitors.md.

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};
const useEmulator = process.env.NEXT_PUBLIC_FIREBASE_EMULATOR === "1";

export const liveEnabled = Boolean(config.apiKey && config.databaseURL);

// The limits here are repeated in database.rules.json, which is what actually enforces them.
export const MAX_NAME = 24;
export const MAX_MESSAGE = 280;
const LINK = /https?:|www\./i;
const RESERVED_NAME = /wincel|crusit|admin|owner|moderator/i;
const CHAT_HISTORY = 50;

export type Cursor = { x: number; y: number };
export type Peer = { uid: string; name: string; path: string; cursor?: Cursor };
export type ChatMessage = { id: string; uid: string; name: string; text: string; at: number };

export type LiveHandle = {
  uid: string;
  setPresence: (presence: { name: string; path: string }) => void;
  setCursor: (cursor: Cursor | null) => void;
  send: (name: string, text: string) => Promise<void>;
  close: () => void;
};

export function nameProblem(name: string) {
  const clean = name.trim();
  if (!clean) return "Pick a name first.";
  if (RESERVED_NAME.test(clean)) return "That name is reserved. Try another.";
  return null;
}

export function messageProblem(text: string) {
  if (LINK.test(text)) return "Links aren't allowed in the chat.";
  return null;
}

const adjectives = ["Quiet", "Curious", "Sunny", "Swift", "Kind", "Bright", "Calm", "Lucky"];
const animals = ["Otter", "Heron", "Tarsier", "Carabao", "Gecko", "Sparrow", "Panda", "Lynx"];

export function randomName() {
  const pick = (list: string[]) => list[Math.floor(Math.random() * list.length)];
  return `${pick(adjectives)} ${pick(animals)}`;
}

/** A stable color per visitor, so the same person matches across cursors and chat. */
export function colorFor(uid: string) {
  let hash = 0;
  for (const ch of uid) hash = (hash * 31 + ch.charCodeAt(0)) % 360;
  return `hsl(${hash} 75% 68%)`;
}

let boot: ReturnType<typeof loadFirebase> | undefined;

async function loadFirebase() {
  const [{ getApps, initializeApp }, authSdk, dbSdk] = await Promise.all([
    import("firebase/app"),
    import("firebase/auth"),
    import("firebase/database"),
  ]);
  const app = getApps()[0] ?? initializeApp(config);
  // Local storage, not the default IndexedDB popup stack: every tab of a browser is one visitor.
  const auth = authSdk.initializeAuth(app, { persistence: authSdk.browserLocalPersistence });
  const db = dbSdk.getDatabase(app);
  if (useEmulator) {
    authSdk.connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
    dbSdk.connectDatabaseEmulator(db, "127.0.0.1", 9000);
  }
  return { auth, authSdk, db, dbSdk };
}

function parsePeers(value: unknown): Peer[] {
  if (!value || typeof value !== "object") return [];
  return Object.entries(value as Record<string, Record<string, Omit<Peer, "uid">>>).flatMap(([uid, tabs]) => {
    const all = Object.values(tabs ?? {});
    // Several tabs are still one person. The tab holding the cursor is the one they're using.
    const tab = all.find((t) => t.cursor) ?? all[0];
    return tab ? [{ uid, name: tab.name, path: tab.path, cursor: tab.cursor }] : [];
  });
}

export async function connectLive(options: {
  name: string;
  path: string;
  onPeers: (peers: Peer[]) => void;
  onMessages: (messages: ChatMessage[]) => void;
}): Promise<LiveHandle> {
  boot ??= loadFirebase();
  const { auth, authSdk, db, dbSdk } = await boot;
  const { onDisconnect, onValue, push, query, limitToLast, ref, remove, serverTimestamp, set, update } = dbSdk;
  const { user } = await authSdk.signInAnonymously(auth);
  const uid = user.uid;

  const me = ref(db, `presence/${uid}/${crypto.randomUUID().slice(0, 12)}`);
  const cursorRef = dbSdk.child(me, "cursor");
  const ignore = () => {};
  let current = { name: options.name, path: options.path };
  let joined = false;

  // Runs on every reconnect, so a dropped connection puts the visitor back once it returns.
  const offConnected = onValue(ref(db, ".info/connected"), (snap) => {
    if (snap.val() !== true) {
      joined = false;
      return;
    }
    onDisconnect(me)
      .remove()
      .then(() => set(me, { ...current, at: serverTimestamp() }))
      .then(() => {
        joined = true;
      })
      .catch(ignore);
  });
  const offPeers = onValue(ref(db, "presence"), (snap) => options.onPeers(parsePeers(snap.val())), ignore);
  const offChat = onValue(
    // By server time, not key: visitors choose their own keys, so a crafted one could pin a message last.
    query(ref(db, "chat"), dbSdk.orderByChild("at"), limitToLast(CHAT_HISTORY)),
    (snap) => {
      const messages: ChatMessage[] = [];
      snap.forEach((m) => {
        messages.push({ id: m.key, ...(m.val() as Omit<ChatMessage, "id">) });
      });
      options.onMessages(messages);
    },
    ignore,
  );

  return {
    uid,
    setPresence(next) {
      current = next;
      if (joined) update(me, next).catch(ignore);
    },
    setCursor(cursor) {
      if (!joined) return;
      (cursor ? set(cursorRef, cursor) : remove(cursorRef)).catch(ignore);
    },
    async send(name, text) {
      const id = push(ref(db, "chat")).key;
      // Written together so the rules can compare this message to the sender's last one.
      await update(ref(db), {
        [`chat/${id}`]: { uid, name: name.trim(), text: text.trim(), at: serverTimestamp() },
        [`chatRate/${uid}`]: serverTimestamp(),
      });
    },
    close() {
      offConnected();
      offPeers();
      offChat();
      remove(me).catch(ignore);
      onDisconnect(me).cancel().catch(ignore);
    },
  };
}
