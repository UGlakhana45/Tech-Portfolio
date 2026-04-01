import { useEffect, useRef } from "react";
import "./styles/TechStack.css";

const GROUPS: { title: string; items: string[] }[] = [
  {
    title: "Product UI",
    items: ["React", "Next.js", "React Native", "TypeScript", "Tailwind", "PWA"],
  },
  {
    title: "Services & data",
    items: ["Nest.js", "Node.js", "GraphQL", "REST", "WebSockets", "WebRTC"],
  },
  {
    title: "Stores & ops",
    items: ["MongoDB", "MySQL", "MSSQL", "AWS QLDB", "Firebase", "Docker", "GitHub Actions"],
  },
];

const TechStack = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) el.classList.add("techstack--visible");
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="techstack" ref={rootRef} id="techstack">
      <div className="techstack-inner section-container">
        <h2>
          Stack<br />
          <span className="techstack-sub font-mono">
            What ships behind the NDAs
          </span>
        </h2>

        <div className="techstack-grid">
          {GROUPS.map((g) => (
            <div key={g.title} className="techstack-group">
              <h3 className="techstack-group-title font-mono">{g.title}</h3>
              <ul className="techstack-list">
                {g.items.map((item) => (
                  <li key={item} className="techstack-pill">
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="techstack-foot font-mono">
          Logos live in prod repos; this grid stays legible on every screen.
        </p>
      </div>
    </div>
  );
};

export default TechStack;
