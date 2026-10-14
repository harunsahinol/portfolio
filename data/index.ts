// Layer ids double as color keys: each one maps to a Wireshark default
// coloring rule (see the --layer-* tokens in app/globals.css).
export type LayerId = "eth" | "ip" | "tcp" | "tls" | "http";

export const profile = {
  name: "Harun Şahinol",
  email: "harun.sahinol@outlook.com",
  github: "https://github.com/harunsahinol",
  location: "Turkey",
};

// The exploded packet in the hero, bottom of the stack first. Each layer
// stands for a level of the stack, from hardware up to the interface.
export const layers: {
  id: LayerId;
  osi: string;
  protocol: string;
  callout: string;
  fields: [string, string][];
}[] = [
  {
    id: "eth",
    osi: "L2",
    protocol: "Ethernet II",
    callout:
      "Hardware. DSAN App runs on the company's own servers with Docker Compose.",
    fields: [
      ["Dst", "ff:ff:ff:ff:ff:ff"],
      ["Src", "48:61:72:75:6e:00"],
      ["Type", "IPv4 (0x0800)"],
    ],
  },
  {
    id: "ip",
    osi: "L3",
    protocol: "IPv4",
    callout: "Delivery. iFix Coastal is served as static pages from Cloudflare.",
    fields: [
      ["Version", "4"],
      ["TTL", "64"],
      ["Protocol", "TCP (6)"],
    ],
  },
  {
    id: "tcp",
    osi: "L4",
    protocol: "TCP",
    callout:
      "Backend. One API and background job queue shared by the DSAN mobile app and admin panel.",
    fields: [
      ["Src port", "443"],
      ["Dst port", "51234"],
      ["Flags", "PSH, ACK"],
    ],
  },
  {
    id: "tls",
    osi: "L6",
    protocol: "TLS 1.3",
    callout:
      "Access. DSAN accounts stay locked until HR approves them, and rejected users are signed out at once.",
    fields: [
      ["Content", "Application Data (23)"],
      ["Cipher", "TLS_AES_256_GCM_SHA384"],
    ],
  },
  {
    id: "http",
    osi: "L7",
    protocol: "HTTP/1.1 200 OK",
    callout:
      "Interfaces. The DSAN mobile app and admin panel, and the iFix Coastal and İz Merdiven websites.",
    fields: [["Content-Type", "text/html; charset=utf-8"]],
  },
];

export const layerNames: Record<LayerId, string> = {
  eth: "Ethernet",
  ip: "IPv4",
  tcp: "TCP",
  tls: "TLS",
  http: "HTTP",
};

export const osiOf: Record<LayerId, string> = Object.fromEntries(
  layers.map((l) => [l.id, l.osi]),
) as Record<LayerId, string>;

export type Project = {
  slug: string;
  name: string;
  year: number;
  platform: string;
  // The lowest layer of the stack the project reaches; it sets the row color.
  deepest: LayerId;
  info: string;
  description: string;
  stack: string[];
  // Client work has no public repo, so the live site is the only link.
  live?: string;
};

export const projects: Project[] = [
  {
    slug: "dsan",
    name: "DSAN App",
    year: 2026,
    platform: "iOS, Android, web",
    deepest: "eth",
    info: "In-house super app for a 500-person industrial company: mobile app and admin panel",
    description:
      "An internal app for a heavy-industry company with more than 500 employees, built as an Expo mobile app for iOS and Android and a Next.js admin panel on one shared backend. Staff can sign in only after HR approves them, then report near misses for occupational safety and follow news, the catering menu, surveys, videos and the company magazine. It runs entirely on the company's own servers with Docker Compose, so staff data never leaves them.",
    stack: ["Expo", "React Native", "Next.js", "Hono", "PostgreSQL", "Prisma", "Docker"],
  },
  {
    slug: "ifix",
    name: "iFix Coastal",
    year: 2026,
    platform: "Web",
    deepest: "ip",
    info: "Bilingual site for a phone repair shop, with a phone you can take apart in 3D",
    description:
      "Website for iFix, a phone and tablet repair shop inside Coastal Grand Mall in Myrtle Beach, South Carolina. Every page is in English and Spanish, and a three.js repair stage lets visitors pick a repair or keep scrolling to take the phone apart. Built with Next.js 16 as a static export and served from Cloudflare Workers.",
    stack: ["Next.js", "three.js", "next-intl", "Cloudflare Workers"],
    live: "https://www.ifixcoastal.com",
  },
  {
    slug: "iz-merdiven",
    name: "İz Merdiven",
    year: 2026,
    platform: "Web",
    deepest: "http",
    info: "Site for a staircase maker in Antalya, with a project gallery and quote requests",
    description:
      "Turkish-language website for İz Merdiven, a staircase manufacturer in Konyaaltı, Antalya. It presents their spiral, floating-step and wooden staircases and glass railings, shows completed projects across Antalya, and lets visitors ask for a quote.",
    stack: ["Next.js"],
    live: "https://www.izmerdiven.com",
  },
];

export const experience = [
  {
    role: "Freelance frontend developer",
    detail:
      "Building and maintaining client sites and web apps with Next.js and TypeScript.",
  },
  {
    role: "Frontend engineer intern",
    detail:
      "Worked on a React web platform, focused on making its interface more interactive.",
  },
  {
    role: "Data analyst intern, PI internship program",
    detail: "Python analysis work during the 2023 internship program.",
  },
];

export const toolbox = [
  { group: "Languages", items: ["TypeScript", "Python", "Rust"] },
  { group: "Web", items: ["Next.js", "React", "three.js", "Hono"] },
  { group: "Mobile", items: ["Expo", "React Native"] },
  { group: "Servers", items: ["PostgreSQL", "Prisma", "Docker", "Cloudflare"] },
];
