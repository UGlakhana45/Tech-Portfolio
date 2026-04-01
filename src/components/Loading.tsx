import { useEffect, useState } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/LoadingProvider";

import Marquee from "react-fast-marquee";

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  const [loaded, setLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (percent < 100) return;
    const enterReady = window.setTimeout(() => setLoaded(true), 140);
    const fxReady = window.setTimeout(() => setIsLoaded(true), 380);
    return () => {
      window.clearTimeout(enterReady);
      window.clearTimeout(fxReady);
    };
  }, [percent]);

  useEffect(() => {
    if (!isLoaded) return;
    let cancelled = false;
    import("./utils/initialFX").then((module) => {
      if (cancelled) return;
      setClicked(true);
      window.setTimeout(() => {
        if (cancelled) return;
        module.initialFX?.();
        setIsLoading(false);
      }, 320);
    });
    return () => {
      cancelled = true;
    };
  }, [isLoaded, setIsLoading]);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  }

  return (
    <>
      <div className="loading-header">
        <a href="/#" className="loader-title" data-cursor="disable">
          UG<span style={{ color: "var(--accent)" }}>45</span>
        </a>
        <div className={`loaderGame ${clicked && "loader-out"}`}>
          <div className="loaderGame-container">
            <div className="loaderGame-in">
              {[...Array(27)].map((_, index) => (
                <div className="loaderGame-line" key={index}></div>
              ))}
            </div>
            <div className="loaderGame-ball"></div>
          </div>
        </div>
      </div>
      <div className="loading-screen">
        <div className="loading-marquee">
          <Marquee speed={48}>
            <span>Fintech</span>
            <span>Web3</span>
            <span>React Native</span>
            <span>Nest.js</span>
            <span>Blast radius zero</span>
            <span>TypeScript</span>
            <span>Real-time</span>
          </Marquee>
        </div>
        <div
          className={`loading-wrap ${clicked && "loading-clicked"}`}
          onMouseMove={(e) => handleMouseMove(e)}
        >
          <div className="loading-hover"></div>
          <div className={`loading-button ${loaded && "loading-complete"}`}>
            <div className="loading-container">
              <div className="loading-content">
                <div className="loading-content-in">
                  Loading <span>{percent}%</span>
                </div>
              </div>
              <div className="loading-box"></div>
            </div>
            <div className="loading-content2">
              <span>Enter</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;

export const setProgress = (setLoading: (value: number) => void) => {
  let percent: number = 0;

  let interval = setInterval(() => {
    if (percent <= 50) {
      const rand = Math.round(Math.random() * 6) + 2;
      percent = Math.min(50, percent + rand);
      setLoading(percent);
    } else {
      window.clearInterval(interval);
      interval = window.setInterval(() => {
        percent = Math.min(92, percent + Math.round(Math.random() * 4) + 1);
        setLoading(percent);
        if (percent >= 92) {
          window.clearInterval(interval);
        }
      }, 380);
    }
  }, 85);

  function clear() {
    window.clearInterval(interval);
    setLoading(100);
  }

  function loaded() {
    return new Promise<number>((resolve) => {
      window.clearInterval(interval);
      interval = window.setInterval(() => {
        if (percent < 100) {
          percent++;
          setLoading(percent);
        } else {
          resolve(percent);
          window.clearInterval(interval);
        }
      }, 2);
    });
  }
  return { loaded, percent, clear };
};
