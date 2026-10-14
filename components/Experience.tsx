import { experience, toolbox } from "@/data";

export default function Experience() {
  return (
    <section id="experience" className="section experience" aria-labelledby="experience-title">
      <div className="section-head">
        <h2
          id="experience-title"
          className="display"
          style={{ "--c": "var(--layer-ip)" } as React.CSSProperties}
        >
          Experience
        </h2>
      </div>

      <div className="experience-grid">
        <ul className="roles">
          {experience.map((item) => (
            <li key={item.role}>
              <h3>{item.role}</h3>
              <p>{item.detail}</p>
            </li>
          ))}
        </ul>

        <div className="toolbox" aria-labelledby="toolbox-title">
          <h3 id="toolbox-title">Toolbox</h3>
          <dl>
            {toolbox.map((row) => (
              <div key={row.group}>
                <dt>{row.group}</dt>
                <dd>{row.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
