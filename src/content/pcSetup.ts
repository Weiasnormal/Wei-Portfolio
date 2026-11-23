// Parts of the PC setup shown on /setup. Each id matches a clickable part in public/setup/pc-setup.glb
// (tagged by the Blender export script). Shop links are store searches for now: swap in your own
// product or affiliate links, or set one to "" to hide that button.

export type ShopKey = "shopee" | "lazada" | "tiktok";

export type PcPart = {
  id: string;
  /** What kind of part it is, e.g. "Graphics card". */
  label: string;
  /** The exact item. */
  name: string;
  /** One sentence about it. */
  blurb: string;
  group: "System unit" | "Desk";
  links: Record<ShopKey, string>;
  /** Fly to another part's mesh instead (the CPU is hidden under the AIO pump). */
  focus?: string;
};

export const shops: { key: ShopKey; label: string; color: string }[] = [
  { key: "shopee", label: "Shopee", color: "#ee4d2d" },
  { key: "lazada", label: "Lazada", color: "#3b5bff" },
  { key: "tiktok", label: "TikTok Shop", color: "#fe2c55" },
];

export const pcParts: PcPart[] = [
  {
    id: "case",
    label: "Case",
    name: "Coolman Spectra M-ATX",
    blurb: "A micro-ATX case with panoramic glass on the side and front, so the whole build is on show.",
    group: "System unit",
    links: {
      shopee: "https://shopee.ph/search?keyword=Coolman%20Spectra%20case",
      lazada: "https://www.lazada.com.ph/catalog/?q=Coolman+Spectra+case",
      tiktok: "https://www.tiktok.com/search?q=Coolman%20Spectra%20case",
    },
  },
  {
    id: "cpu",
    label: "Processor",
    name: "AMD Ryzen 7 5700X",
    blurb: "Eight cores and sixteen threads on AM4 at a cool 65 W, hidden under the AIO pump.",
    group: "System unit",
    focus: "aio:pump",
    links: {
      shopee: "https://shopee.ph/search?keyword=Ryzen%207%205700X",
      lazada: "https://www.lazada.com.ph/catalog/?q=Ryzen+7+5700X",
      tiktok: "https://www.tiktok.com/search?q=Ryzen%207%205700X",
    },
  },
  {
    id: "gpu",
    label: "Graphics card",
    name: "Gigabyte GeForce RTX 4070 WINDFORCE OC 12G",
    blurb: "A compact dual-fan RTX 4070 with 12 GB of GDDR6X and DLSS 3, for high-refresh gaming and fast Blender renders.",
    group: "System unit",
    links: {
      shopee: "https://shopee.ph/search?keyword=Gigabyte%20RTX%204070%20Windforce%20OC",
      lazada: "https://www.lazada.com.ph/catalog/?q=Gigabyte+RTX+4070+Windforce+OC",
      tiktok: "https://www.tiktok.com/search?q=Gigabyte%20RTX%204070%20Windforce%20OC",
    },
  },
  {
    id: "motherboard",
    label: "Motherboard",
    name: "MSI B550M PRO-VDH",
    blurb: "The micro-ATX B550 board that ties everything together, with PCIe 4.0 for the GPU and SSD.",
    group: "System unit",
    links: {
      shopee: "https://shopee.ph/search?keyword=MSI%20B550M%20PRO-VDH",
      lazada: "https://www.lazada.com.ph/catalog/?q=MSI+B550M+PRO-VDH",
      tiktok: "https://www.tiktok.com/search?q=MSI%20B550M%20PRO-VDH",
    },
  },
  {
    id: "ram",
    label: "Memory",
    name: "Teamgroup T-Force DDR4 32 GB (2 × 16 GB)",
    blurb: "Two 16 GB sticks in dual channel, plenty of room for games, editing and 3D work.",
    group: "System unit",
    links: {
      shopee: "https://shopee.ph/search?keyword=T-Force%20DDR4%2032GB%202x16GB",
      lazada: "https://www.lazada.com.ph/catalog/?q=T-Force+DDR4+32GB+2x16GB",
      tiktok: "https://www.tiktok.com/search?q=T-Force%20DDR4%2032GB%202x16GB",
    },
  },
  {
    id: "ssd",
    label: "Storage",
    name: "Samsung 990 SSD 1 TB",
    blurb: "A fast NVMe M.2 drive for quick boots and load times, tucked under the board's heatsink.",
    group: "System unit",
    links: {
      shopee: "https://shopee.ph/search?keyword=Samsung%20990%201TB%20NVMe",
      lazada: "https://www.lazada.com.ph/catalog/?q=Samsung+990+1TB+NVMe",
      tiktok: "https://www.tiktok.com/search?q=Samsung%20990%201TB%20NVMe",
    },
  },
  {
    id: "psu",
    label: "Power supply",
    name: "Corsair RM850e",
    blurb: "An 850 W, 80 Plus Gold power supply with plenty of headroom, hidden in the rear chamber.",
    group: "System unit",
    links: {
      shopee: "https://shopee.ph/search?keyword=Corsair%20RM850e",
      lazada: "https://www.lazada.com.ph/catalog/?q=Corsair+RM850e",
      tiktok: "https://www.tiktok.com/search?q=Corsair%20RM850e",
    },
  },
  {
    id: "aio",
    label: "CPU cooler",
    name: "Jungle Leopard AstroShel V2G 240 mm AIO",
    blurb: "A 240 mm liquid cooler whose square pump screen plays live visuals.",
    group: "System unit",
    links: {
      shopee: "https://shopee.ph/search?keyword=Jungle%20Leopard%20AstroShel%20V2G%20240",
      lazada: "https://www.lazada.com.ph/catalog/?q=Jungle+Leopard+AstroShel+V2G+240",
      tiktok: "https://www.tiktok.com/search?q=Jungle%20Leopard%20AstroShel%20V2G%20240",
    },
  },
  {
    id: "fans",
    label: "Case fans",
    name: "Jungle Leopard Star-River Galaxy 120 mm × 7",
    blurb: "Seven ARGB fans with square frames and an octagonal light ring, set to white, pink and red.",
    group: "System unit",
    links: {
      shopee: "https://shopee.ph/search?keyword=Jungle%20Leopard%20Star%20River%20Galaxy%20fan",
      lazada: "https://www.lazada.com.ph/catalog/?q=Jungle+Leopard+Star+River+Galaxy+fan",
      tiktok: "https://www.tiktok.com/search?q=Jungle%20Leopard%20Star%20River%20Galaxy%20fan",
    },
  },
  {
    id: "cables",
    label: "Cables",
    name: "ICE Whale SL-24 ARGB Neon Cables",
    blurb: "Neon-line extensions for the 24-pin and GPU 8-pin that sync with the motherboard's ARGB lighting.",
    group: "System unit",
    links: {
      shopee: "https://shopee.ph/search?keyword=ICE%20Whale%20SL-24",
      lazada: "https://www.lazada.com.ph/catalog/?q=ICE+Whale+SL-24",
      tiktok: "https://www.tiktok.com/search?q=ICE%20Whale%20SL-24",
    },
  },
  {
    id: "monitor",
    label: "Monitor",
    name: "Acer EK251Q P6bi 24.5\" IPS 144 Hz",
    blurb: "A 24.5-inch Full HD IPS panel at 144 Hz for smooth, sharp gameplay.",
    group: "Desk",
    links: {
      shopee: "https://shopee.ph/search?keyword=Acer%20EK251Q",
      lazada: "https://www.lazada.com.ph/catalog/?q=Acer+EK251Q",
      tiktok: "https://www.tiktok.com/search?q=Acer%20EK251Q",
    },
  },
  {
    id: "lightbar",
    label: "Monitor light",
    name: "Xiaomi Monitor Light Bar",
    blurb: "Clamps on top of the screen and lights the desk without glare on the display.",
    group: "Desk",
    links: {
      shopee: "https://shopee.ph/search?keyword=Xiaomi%20Monitor%20Light%20Bar",
      lazada: "https://www.lazada.com.ph/catalog/?q=Xiaomi+Monitor+Light+Bar",
      tiktok: "https://www.tiktok.com/search?q=Xiaomi%20Monitor%20Light%20Bar",
    },
  },
  {
    id: "keyboard",
    label: "Keyboard",
    name: "Aula F75",
    blurb: "A 75% gasket-mount mechanical keyboard with a volume knob and rainbow backlight.",
    group: "Desk",
    links: {
      shopee: "https://shopee.ph/search?keyword=Aula%20F75",
      lazada: "https://www.lazada.com.ph/catalog/?q=Aula+F75",
      tiktok: "https://www.tiktok.com/search?q=Aula%20F75",
    },
  },
  {
    id: "mouse",
    label: "Mouse",
    name: "Attack Shark X11",
    blurb: "A lightweight wireless gaming mouse that charges on its RGB dock.",
    group: "Desk",
    links: {
      shopee: "https://shopee.ph/search?keyword=Attack%20Shark%20X11",
      lazada: "https://www.lazada.com.ph/catalog/?q=Attack+Shark+X11",
      tiktok: "https://www.tiktok.com/search?q=Attack%20Shark%20X11",
    },
  },
  {
    id: "mic",
    label: "Microphone",
    name: "Fifine AM8",
    blurb: "A USB and XLR dynamic mic with an RGB ring, tap-to-mute and a gain knob.",
    group: "Desk",
    links: {
      shopee: "https://shopee.ph/search?keyword=Fifine%20AM8",
      lazada: "https://www.lazada.com.ph/catalog/?q=Fifine+AM8",
      tiktok: "https://www.tiktok.com/search?q=Fifine%20AM8",
    },
  },
  {
    id: "webcam-c60e",
    label: "Webcam",
    name: "Emeet C60e",
    blurb: "A 4K webcam on top of the case for sharp video and streams.",
    group: "System unit",
    links: {
      shopee: "https://shopee.ph/search?keyword=Emeet%20C60E",
      lazada: "https://www.lazada.com.ph/catalog/?q=Emeet+C60E",
      tiktok: "https://www.tiktok.com/search?q=Emeet%20C60E",
    },
  },
  {
    id: "webcam-c100",
    label: "Webcam",
    name: "Emeet C100",
    blurb: "A 1080p webcam for everyday calls, sitting on top of the case.",
    group: "System unit",
    links: {
      shopee: "https://shopee.ph/search?keyword=Emeet%20C100",
      lazada: "https://www.lazada.com.ph/catalog/?q=Emeet+C100",
      tiktok: "https://www.tiktok.com/search?q=Emeet%20C100",
    },
  },
  {
    id: "webcam-joy",
    label: "Webcam",
    name: "Joyusing 4K webcam",
    blurb: "A round-headed 4K webcam that sits on top of the case with the two Emeets.",
    group: "System unit",
    links: {
      shopee: "https://shopee.ph/search?keyword=Joyusing%204K%20webcam",
      lazada: "https://www.lazada.com.ph/catalog/?q=Joyusing+4K+webcam",
      tiktok: "https://www.tiktok.com/search?q=Joyusing%204K%20webcam",
    },
  },
];
