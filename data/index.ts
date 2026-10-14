// Layer ids double as color keys: each one maps to a Wireshark default
// coloring rule (see the --layer-* tokens in app/globals.css).
export type LayerId = "eth" | "ip" | "tcp" | "tls" | "http" | "vision";

export const profile = {
  name: "Harun Şahinol",
  email: "harun.sahinol@outlook.com",
  github: "https://github.com/harunsahinol",
  location: "Turkey",
};

// The exploded packet in the hero, bottom of the stack first.
export const layers: {
  id: Exclude<LayerId, "vision">;
  osi: string;
  protocol: string;
  callout: string;
  fields: [string, string][];
}[] = [
  {
    id: "eth",
    osi: "L2",
    protocol: "Ethernet II",
    callout: "ARP sweeps and packet sniffing with Scapy.",
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
    callout:
      "Sentinet: anomaly detection over Zeek and Suricata logs, with an LLM explaining each finding.",
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
      "Port scanning, and a 4 MB Rust binary that health-checks servers and reports to Telegram.",
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
    callout: "AES-256-GCM file encryption from the command line.",
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
      "Next.js apps, a WebGL company site, and a Rust crawler that audits SEO at scale.",
    fields: [["Content-Type", "text/html; charset=utf-8"]],
  },
];

export const layerNames: Record<LayerId, string> = {
  eth: "Ethernet",
  ip: "IPv4",
  tcp: "TCP",
  tls: "TLS",
  http: "HTTP",
  vision: "Vision",
};

export type Project = {
  slug: string;
  name: string;
  year: number;
  language: string;
  layer: LayerId;
  info: string;
  description: string;
  stack: string[];
  repo: string;
  live?: string;
};

const gh = (repo: string) => `https://github.com/harunsahinol/${repo}`;

// Newest first, like a capture you scroll back through.
export const projects: Project[] = [
  {
    slug: "sentinet",
    name: "Sentinet",
    year: 2026,
    language: "Python",
    layer: "ip",
    info: "Network traffic anomaly detection with AI-assisted triage",
    description:
      "Ingests Zeek and Suricata logs into PostgreSQL, runs statistical and rule-based detectors over sliding time windows, and asks an LLM to explain why each finding stands out, what attack class it resembles and what to do next. The model is pluggable: Claude, a local model through Ollama, any OpenAI-compatible server, or a rule-based fallback.",
    stack: ["Zeek", "Suricata", "PostgreSQL", "Claude API", "Ollama"],
    repo: gh("sentinet"),
  },
  {
    slug: "sentinel",
    name: "sentinel",
    year: 2026,
    language: "Rust",
    layer: "tcp",
    info: "Server health CLI shipped as one static 4 MB binary",
    description:
      "Checks HTTP endpoints, TCP ports, disk, memory and load, Docker containers and PostgreSQL replication lag on production and staging servers. Results go to Uptime Kuma as heartbeats and problems go to Telegram. Built against musl, so it needs no libc, OpenSSL, docker CLI or psql on the host.",
    stack: ["Rust", "musl", "Uptime Kuma", "Telegram", "PostgreSQL"],
    repo: gh("cli-monitoring"),
  },
  {
    slug: "connect-bilisim",
    name: "Connect Bilişim",
    year: 2026,
    language: "TypeScript",
    layer: "http",
    info: "Company site where services open out of a WebGL server rack",
    description:
      "Marketing site for an IT infrastructure company covering networking, camera systems, software and AI work. Each service is a layer in a Three.js rack that slides out like a drawer as you scroll. Built with the Next.js App Router and generated fully static.",
    stack: ["Next.js", "Three.js", "WebGL", "TypeScript"],
    repo: gh("connectbilisim"),
  },
  {
    slug: "yolo-hotspot",
    name: "Hotspot detection server",
    year: 2026,
    language: "Python",
    layer: "vision",
    info: "Flask API serving a custom YOLOv8 model, including live video",
    description:
      "Runs a custom-trained YOLOv8 model behind Flask. Images uploaded to /detect come back with detections and confidence scores, and video frames streamed over a WebSocket are analysed in real time.",
    stack: ["Flask", "YOLOv8", "WebSocket"],
    repo: gh("Flask-YOLOv8-HotspotDetect-new"),
  },
  {
    slug: "seo-audit",
    name: "SEO audit engine",
    year: 2026,
    language: "Rust",
    layer: "http",
    info: "Distributed crawler designed to audit millions of pages in minutes",
    description:
      "Async crawl engine on Tokio with per-domain token-bucket rate limiting, Bloom-filter URL deduplication and a streaming HTML parser that keeps memory flat. Hot data lives in Redis, analytics in ClickHouse and raw HTML in S3, split across scheduler, worker and aggregator services behind an Axum REST API.",
    stack: ["Rust", "Tokio", "Axum", "Redis", "ClickHouse", "S3"],
    repo: gh("seo-audit-tool"),
  },
  {
    slug: "aes",
    name: "AES-256 file encryption",
    year: 2025,
    language: "Python",
    layer: "tls",
    info: "Encrypt and decrypt files with AES-256-GCM from the terminal",
    description:
      "A small CLI for encrypting and decrypting files with AES-256-GCM authenticated encryption, plus commands for generating and managing strong 256-bit keys. Built on the cryptography library.",
    stack: ["Python", "cryptography", "AES-256-GCM"],
    repo: gh("aes-encryption"),
  },
  {
    slug: "port-scanner",
    name: "Port scanner",
    year: 2025,
    language: "Python",
    layer: "tcp",
    info: "Find open TCP ports on a host",
    description:
      "A basic TCP port scanner in Python that reports which ports on a host accept connections.",
    stack: ["Python", "sockets"],
    repo: gh("port-scanner"),
  },
  {
    slug: "net-sniffer",
    name: "net-sniffer",
    year: 2025,
    language: "Python",
    layer: "eth",
    info: "Print source, destination and protocol for every IP packet",
    description:
      "Listens on an interface with Scapy and prints the source and destination address and protocol of each IP packet that passes. Interface and packet count are set from the command line.",
    stack: ["Python", "Scapy"],
    repo: gh("net-sniffer"),
  },
  {
    slug: "arp-scanner",
    name: "ARP scanner",
    year: 2025,
    language: "Python",
    layer: "eth",
    info: "List every host on the local network by IP, MAC and hostname",
    description:
      "Sweeps the local network with ARP or ICMP, auto-detecting the subnet when none is given, and prints each host's IP address, MAC address and hostname.",
    stack: ["Python", "Scapy", "ARP", "ICMP"],
    repo: gh("arp-scanner"),
  },
  {
    slug: "videocall",
    name: "Videocall",
    year: 2024,
    language: "TypeScript",
    layer: "http",
    info: "Video calls in the browser with Clerk auth and Stream",
    description:
      "A video conferencing web app for meeting colleagues and friends in the browser. Authentication runs on Clerk and calls run on Stream's video SDK.",
    stack: ["Next.js", "Clerk", "Stream", "Tailwind CSS"],
    repo: gh("videocall"),
    live: "https://videocall-nine-orpin.vercel.app",
  },
  {
    slug: "startup-viewer",
    name: "Startup Viewer",
    year: 2024,
    language: "TypeScript",
    layer: "http",
    info: "A place to publish and browse startup ideas",
    description:
      "A Next.js and TypeScript platform for showcasing and publishing startups and early startup ideas.",
    stack: ["Next.js", "TypeScript"],
    repo: gh("startup-viewer"),
  },
  {
    slug: "solar-hotspots",
    name: "Solar panel hotspots",
    year: 2024,
    language: "Python",
    layer: "vision",
    info: "YOLOv8 model that finds hotspots in solar panels",
    description:
      "Trains YOLOv8 to detect hotspots in solar panels, so maintenance can be targeted and panels keep performing.",
    stack: ["YOLOv8", "Python", "Jupyter"],
    repo: gh("solar-panel-detection-with-YOLOv8"),
  },
  {
    slug: "cancer-detection",
    name: "Cancer detection",
    year: 2024,
    language: "Python",
    layer: "vision",
    info: "Machine-learning experiments for cancer detection",
    description:
      "A Jupyter notebook exploring machine-learning models for cancer detection.",
    stack: ["Python", "Jupyter"],
    repo: gh("cancer-detection"),
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
  { group: "Languages", items: ["Python", "Rust", "TypeScript"] },
  { group: "Network", items: ["Scapy", "Zeek", "Suricata", "Tokio"] },
  { group: "Web", items: ["Next.js", "React", "Three.js", "Axum"] },
  { group: "Data", items: ["PostgreSQL", "ClickHouse", "Redis", "YOLOv8"] },
];
