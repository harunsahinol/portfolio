"use client";

import { Fragment, useEffect, useState } from "react";
import { layerNames, projects, type LayerId } from "@/data";
import { FILTER_EVENT } from "./filterEvents";

type Filter = LayerId | "all";

const filterOrder: LayerId[] = ["eth", "ip", "tcp", "tls", "http", "vision"];

export default function Capture() {
  const [filter, setFilter] = useState<Filter>("all");
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    const onFilter = (e: Event) => {
      setFilter((e as CustomEvent<Filter>).detail);
      setOpen(null);
    };
    window.addEventListener(FILTER_EVENT, onFilter);
    return () => window.removeEventListener(FILTER_EVENT, onFilter);
  }, []);

  const shown =
    filter === "all" ? projects : projects.filter((p) => p.layer === filter);

  return (
    <section id="projects" className="section capture" aria-labelledby="projects-title">
      <div className="section-head">
        <h2 id="projects-title" className="display" style={{ "--c": "var(--layer-tcp)" } as React.CSSProperties}>
          Projects
        </h2>
        <p className="lede">
          Newest first. Each row is colored by the network layer it works at,
          using Wireshark&rsquo;s default coloring rules. Open a row for the
          details.
        </p>
      </div>

      <div className="filters" role="group" aria-label="Show projects by layer">
        <button
          type="button"
          className="filter"
          aria-pressed={filter === "all"}
          onClick={() => setFilter("all")}
        >
          All <span className="filter-count">{projects.length}</span>
        </button>
        {filterOrder.map((id) => (
          <button
            key={id}
            type="button"
            className="filter"
            style={{ "--c": `var(--layer-${id})` } as React.CSSProperties}
            aria-pressed={filter === id}
            onClick={() => setFilter(filter === id ? "all" : id)}
          >
            <span className="filter-swatch" aria-hidden="true" />
            {layerNames[id]}{" "}
            <span className="filter-count">
              {projects.filter((p) => p.layer === id).length}
            </span>
          </button>
        ))}
      </div>

      <table className="capture-table">
        <thead>
          <tr>
            <th scope="col" className="col-year">Year</th>
            <th scope="col" className="col-lang">Language</th>
            <th scope="col" className="col-layer">Layer</th>
            <th scope="col" className="col-name">Project</th>
            <th scope="col" className="col-info">Info</th>
          </tr>
        </thead>
        <tbody>
          {shown.map((p) => {
            const isOpen = open === p.slug;
            const detailId = `detail-${p.slug}`;
            return (
              <Fragment key={p.slug}>
                <tr
                  className={`capture-row${isOpen ? " is-open" : ""}`}
                  style={{ "--c": `var(--layer-${p.layer})` } as React.CSSProperties}
                  onClick={() => setOpen(isOpen ? null : p.slug)}
                >
                  <td className="col-year">{p.year}</td>
                  <td className="col-lang">{p.language}</td>
                  <td className="col-layer">{layerNames[p.layer]}</td>
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
                  <td className="col-info">{p.info}</td>
                </tr>
                <tr
                  id={detailId}
                  className="capture-detail"
                  hidden={!isOpen}
                  style={{ "--c": `var(--layer-${p.layer})` } as React.CSSProperties}
                >
                  <td colSpan={5}>
                    <div className="detail-grid">
                      <ul className="detail-tree">
                        <li>{p.name}</li>
                        <li>Layer: {layerNames[p.layer]}</li>
                        <li>Language: {p.language}</li>
                        <li>Built with: {p.stack.join(", ")}</li>
                        <li>
                          Source:{" "}
                          <a href={p.repo} target="_blank" rel="noreferrer">
                            {p.repo.replace("https://", "")}
                          </a>
                        </li>
                        {p.live ? (
                          <li>
                            Live:{" "}
                            <a href={p.live} target="_blank" rel="noreferrer">
                              {p.live.replace("https://", "")}
                            </a>
                          </li>
                        ) : null}
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
