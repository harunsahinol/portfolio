# Harun Şahinol

Personal site. Live at https://portfolio-puce-gamma-55.vercel.app

The design is an exploded-view assembly drawing of a network packet. The hero
is a CSS 3D stack of protocol layers (Ethernet, IPv4, TCP, TLS, HTTP) that
tilts with the pointer and comes apart as you scroll. Each layer stands for a
level of the stack, from hardware up to the interface, and its callout says
which project reaches it. Colors come from Wireshark's
default packet coloring rules, and type is set in Anybody and Fragment Mono.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Edit content

Everything on the page lives in `data/index.ts`:

- `layers` – the slabs in the hero and their callouts
- `projects` – rows in the projects list (`deepest` picks the row color)
- `experience` and `toolbox` – the experience section
- `profile` – name, email and GitHub link

## Layout

- `components/PacketHero.tsx` – 3D stack, pointer tilt, scroll explode, callout placement
- `components/Capture.tsx` – projects list with expandable rows
- `app/globals.css` – design tokens and all styles
