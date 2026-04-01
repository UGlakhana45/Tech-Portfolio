import { useEffect, useRef } from "react";
import "./styles/WhatIDo.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const WhatIDo = () => {
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el;
  };
  useEffect(() => {
    if (ScrollTrigger.isTouch) {
      containerRef.current.forEach((container) => {
        if (container) {
          container.classList.remove("what-noTouch");
          container.addEventListener("click", () => handleClick(container));
        }
      });
    }
    return () => {
      containerRef.current.forEach((container) => {
        if (container) {
          container.removeEventListener("click", () => handleClick(container));
        }
      });
    };
  }, []);
  return (
    <div className="whatIDO">
      <div className="what-box">
        <h2 className="title">
          How I
          <span className="hat-h2"> work</span>
          <div>
            <span className="do-h2">now</span>
          </div>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          <div className="what-border2">
            <svg width="100%">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="rgba(232, 165, 75, 0.35)"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
              <line
                x1="100%"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="rgba(232, 165, 75, 0.35)"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
            </svg>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 0)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="rgba(232, 165, 75, 0.35)"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="rgba(232, 165, 75, 0.35)"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>

            <div className="what-content-in">
              <h3>Surfaces</h3>
              <h4>Web &amp; mobile products</h4>
              <p>
                Screens compose—they don&apos;t compute. React Native (New
                Architecture, Reanimated, MMKV) and Next.js clients stay lean;
                hooks and services own orchestration so telemetry and financial
                UIs stay at full frame rate.
              </p>
              <h5>Stack signals</h5>
              <div className="what-content-flex">
                <div className="what-tags">React</div>
                <div className="what-tags">React Native</div>
                <div className="what-tags">Next.js</div>
                <div className="what-tags">TypeScript</div>
                <div className="what-tags">Tailwind</div>
                <div className="what-tags">TanStack Query</div>
                <div className="what-tags">PWA</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 1)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="rgba(232, 165, 75, 0.35)"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>Systems</h3>
              <h4>Backends, data &amp; delivery</h4>
              <p>
                Nest.js and Node services with explicit module boundaries, SQL
                and ledger stores (MSSQL, QLDB, Firebase), WebSockets / WebRTC
                when the product is real-time, Dockerized deploys and GitHub
                Actions for predictable releases.
              </p>
              <h5>Stack signals</h5>
              <div className="what-content-flex">
                <div className="what-tags">Nest.js</div>
                <div className="what-tags">Node.js</div>
                <div className="what-tags">GraphQL</div>
                <div className="what-tags">REST</div>
                <div className="what-tags">AWS QLDB</div>
                <div className="what-tags">MSSQL</div>
                <div className="what-tags">Docker</div>
                <div className="what-tags">GitHub Actions</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;

function handleClick(container: HTMLDivElement) {
  container.classList.toggle("what-content-active");
  container.classList.remove("what-sibling");
  if (container.parentElement) {
    const siblings = Array.from(container.parentElement.children);

    siblings.forEach((sibling) => {
      if (sibling !== container) {
        sibling.classList.remove("what-content-active");
        sibling.classList.toggle("what-sibling");
      }
    });
  }
}
