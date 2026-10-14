"use client";

import { useEffect, useRef, useState } from "react";
import { layerNames, layers, profile } from "@/data";
import { filterProjects } from "./filterEvents";

// Resting pose of the axonometric view, in degrees.
const REST_RX = 58;
const REST_RZ = -38;

// Gap between slabs, in em of the stack's font-size.
const GAP_ASSEMBLED = 2; // equal to slab thickness: a closed block
const GAP_EXPLODED = 8;
const GAP_SCROLL_EXTRA = 4;

// Callout column limits, in px.
const LABEL_SPACING = 14;
const LABEL_TOP = 64; // clear of the header
const LABEL_BOTTOM = 24;

const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export default function PacketHero() {
  const heroRef = useRef<HTMLElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const anchorRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const labelRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const lineRefs = useRef<(SVGPathElement | null)[]>([]);
  const dotRefs = useRef<(SVGCircleElement | null)[]>([]);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const stack = stackRef.current;
    if (!hero || !stack) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const wide = window.matchMedia("(min-width: 960px)");

    let targetX = 0;
    let targetY = 0;
    let tiltX = 0;
    let tiltY = 0;
    let raf = 0;
    let running = false;
    const start = performance.now();

    const onPointer = (e: PointerEvent) => {
      if (reduceMotion.matches || e.pointerType === "touch") return;
      targetX = (e.clientX / window.innerWidth) * 2 - 1;
      targetY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const placeCallouts = () => {
      if (!wide.matches) return;
      const heroBox = hero.getBoundingClientRect();
      const points = anchorRefs.current.map((el) => {
        const r = el!.getBoundingClientRect();
        return { x: r.left - heroBox.left, y: r.top - heroBox.top };
      });

      // Labels sit in a column on the right. Each one wants to line up with
      // its slab: push colliding labels down, then pull the column back up
      // if that ran it off the bottom of the hero.
      const order = points
        .map((p, i) => ({ i, y: p.y }))
        .sort((a, b) => a.y - b.y);
      const placed: number[] = [];
      let floor = LABEL_TOP;
      for (const { i, y } of order) {
        const top = Math.max(y - 14, floor);
        placed[i] = top;
        floor = top + labelRefs.current[i]!.offsetHeight + LABEL_SPACING;
      }
      let ceiling = heroBox.height - LABEL_BOTTOM;
      for (const { i } of [...order].reverse()) {
        const h = labelRefs.current[i]!.offsetHeight;
        placed[i] = Math.min(placed[i], ceiling - h);
        ceiling = placed[i] - LABEL_SPACING;
      }

      points.forEach((p, i) => {
        const label = labelRefs.current[i]!;
        const top = placed[i];
        label.style.transform = `translateY(${top}px)`;
        const lx = label.getBoundingClientRect().left - heroBox.left - 12;
        const ly = top + 14;
        lineRefs.current[i]!.setAttribute(
          "d",
          `M${p.x.toFixed(1)} ${p.y.toFixed(1)} L${(lx - 28).toFixed(1)} ${ly.toFixed(1)} H${lx.toFixed(1)}`,
        );
        dotRefs.current[i]!.setAttribute("cx", p.x.toFixed(1));
        dotRefs.current[i]!.setAttribute("cy", p.y.toFixed(1));
      });
    };

    const frame = (now: number) => {
      const still = reduceMotion.matches;
      const intro = still
        ? 1
        : easeOutCubic(clamp((now - start - 200) / 1600, 0, 1));

      tiltX += (targetX - tiltX) * 0.06;
      tiltY += (targetY - tiltY) * 0.06;

      const box = hero.getBoundingClientRect();
      const scroll = still ? 0 : clamp(-box.top / (box.height * 0.75), 0, 1);

      const gap =
        GAP_ASSEMBLED +
        (GAP_EXPLODED - GAP_ASSEMBLED) * intro +
        GAP_SCROLL_EXTRA * scroll;
      // The block arrives turned a little further and settles into place.
      const rz = REST_RZ - 22 * (1 - intro) + tiltX * 9;
      const rx = REST_RX + 6 * (1 - intro) - tiltY * 7;

      stack.style.setProperty("--gap", `${gap.toFixed(3)}em`);
      stack.style.setProperty("--rx", `${rx.toFixed(3)}deg`);
      stack.style.setProperty("--rz", `${rz.toFixed(3)}deg`);
      hero.style.setProperty("--intro", intro.toFixed(3));

      placeCallouts();
      if (running) raf = requestAnimationFrame(frame);
    };

    const startLoop = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(frame);
    };
    const stopLoop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    // Only animate while the hero is on screen.
    const io = new IntersectionObserver(([entry]) =>
      entry.isIntersecting ? startLoop() : stopLoop(),
    );
    io.observe(hero);
    window.addEventListener("pointermove", onPointer, { passive: true });

    return () => {
      stopLoop();
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  const stackSize = layers.length;

  return (
    <section
      ref={heroRef}
      className="hero"
      aria-labelledby="hero-name"
    >
      <div className="hero-stage">
        <div
          ref={stackRef}
          className="stack"
          style={{ "--count": stackSize } as React.CSSProperties}
        >
          {layers.map((layer, i) => {
            const isTop = i === stackSize - 1;
            return (
              <div
                key={layer.id}
                className={`slab${active === i ? " is-active" : ""}`}
                style={
                  {
                    "--i": i,
                    "--c": `var(--layer-${layer.id})`,
                  } as React.CSSProperties
                }
                onPointerEnter={() => setActive(i)}
                onPointerLeave={() => setActive(null)}
              >
                <div className="face face-bottom" />
                <div className="face face-back" />
                <div className="face face-left" />
                <div className="face face-front" />
                <div className="face face-right" />
                <div className={`face face-top${isTop ? " face-top--name" : ""}`}>
                  {isTop ? (
                    <>
                      <p className="slab-protocol">{layer.protocol}</p>
                      <h1 id="hero-name" className="slab-name">
                        <span>Harun</span>
                        <span>Şahinol</span>
                      </h1>
                    </>
                  ) : null}
                  <div className="slab-print">
                    {isTop ? null : (
                      <p className="slab-protocol">{layer.protocol}</p>
                    )}
                    <dl className="slab-fields">
                      {layer.fields.map(([k, v]) => (
                        <div key={k}>
                          <dt>{k}</dt>
                          <dd>{v}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                  <span
                    className="slab-anchor"
                    ref={(el) => {
                      anchorRefs.current[i] = el;
                    }}
                    aria-hidden="true"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <svg className="hero-leaders" aria-hidden="true">
        {layers.map((layer, i) => (
          <g key={layer.id} className={active === i ? "is-active" : undefined}>
            <path
              ref={(el) => {
                lineRefs.current[i] = el;
              }}
            />
            <circle
              r="4"
              ref={(el) => {
                dotRefs.current[i] = el;
              }}
            />
          </g>
        ))}
      </svg>

      <div className="hero-intro">
        <p>
          Developer in {profile.location}. I build tools that read networks
          and watch servers, and the web apps that sit on top of them.
        </p>
        <div className="hero-actions">
          <a className="button button--solid" href="#projects">
            See projects
          </a>
          <a className="button" href={`mailto:${profile.email}`}>
            Email me
          </a>
        </div>
      </div>

      <ol className="hero-callouts" aria-label="What I work on, by network layer">
        {[...layers].reverse().map((layer) => {
          const i = layers.indexOf(layer);
          return (
            <li key={layer.id}>
              <a
                href="#projects"
                className={`callout${active === i ? " is-active" : ""}`}
                style={{ "--c": `var(--layer-${layer.id})` } as React.CSSProperties}
                ref={(el) => {
                  labelRefs.current[i] = el;
                }}
                onPointerEnter={() => setActive(i)}
                onPointerLeave={() => setActive(null)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                onClick={() => filterProjects(layer.id)}
              >
                <span className="callout-layer">
                  <span className="callout-osi">{layer.osi}</span>{" "}
                  {layerNames[layer.id]}
                </span>
                <span className="callout-text">{layer.callout}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
