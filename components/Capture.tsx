"use client";

import { Fragment, useState } from "react";
import { osiOf, projects, type LayerId } from "@/data";

// "L2–L7": from the deepest layer a project reaches up to the interface.
const layerSpan = (deepest: LayerId) =>
  deepest === "http" ? "L7" : `${osiOf[deepest]}–L7`;

export default function Capture() {
  const [open, setOpen] = useState<string | null>(projects[0]?.slug ?? null);

  return (
    <section id="projects" className="section capture" aria-labelledby="projects-title">
      <div className="section-head">
        <h2 id="projects-title" className="display" style={{ "--c": "var(--layer-tcp)" } as React.CSSProperties}>
          Projects
        </h2>
        <p className="lede">
          Each row is colored by the lowest layer of the stack the project
          reaches, using Wireshark&rsquo;s default coloring rules. Open a row
          for the details.
        </p>
      </div>

      <table className="capture-table">
        <thead>
          <tr>
            <th scope="col" className="col-year">Year</th>
            <th scope="col" className="col-name">Project</th>
            <th scope="col" className="col-platform">Platform</th>
            <th scope="col" className="col-layers">Layers</th>
            <th scope="col" className="col-info">Info</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => {
            const isOpen = open === p.slug;
            const detailId = `detail-${p.slug}`;
            const color = { "--c": `var(--layer-${p.deepest})` } as React.CSSProperties;
            return (
              <Fragment key={p.slug}>
                <tr
                  className={`capture-row${isOpen ? " is-open" : ""}`}
                  style={color}
                  onClick={() => setOpen(isOpen ? null : p.slug)}
                >
                  <td className="col-year">{p.year}</td>
                  <th scope="row" className="col-name">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={detailId}
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpen(isOpen ? null : p.slug);
                      }}
                    >
                      {p.name}
                    </button>
                  </th>
                  <td className="col-platform">{p.platform}</td>
                  <td className="col-layers">{layerSpan(p.deepest)}</td>
                  <td className="col-info">{p.info}</td>
                </tr>
                <tr id={detailId} className="capture-detail" hidden={!isOpen} style={color}>
                  <td colSpan={5}>
                    <div className="detail-grid">
                      <ul className="detail-tree">
                        <li>{p.name}</li>
                        <li>Platform: {p.platform}</li>
                        <li>Layers: {layerSpan(p.deepest)}</li>
                        <li>Built with: {p.stack.join(", ")}</li>
                        {p.live ? (
                          <li>
                            Live:{" "}
                            <a href={p.live} target="_blank" rel="noreferrer">
                              {p.live.replace("https://", "")}
                            </a>
                          </li>
                        ) : (
                          <li>Access: internal to the company</li>
                        )}
                      </ul>
                      <p className="detail-text">{p.description}</p>
                    </div>
                  </td>
                </tr>
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
