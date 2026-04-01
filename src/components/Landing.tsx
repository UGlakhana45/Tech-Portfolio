import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h3 className="landing-eyebrow font-mono">
              Ahmedabad · Fintech &amp; Web3
            </h3>
            <h2>Hello — I&apos;m</h2>
            <h1>
              UDAY
              <br />
              <span className="landing-name-accent">LAKHANA</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>I build</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">Mobile</div>
              <div className="landing-h2-2">Web</div>
            </h2>
            <h2>
              <div className="landing-h2-info">Ship</div>
              <div className="landing-h2-info-1">Scale</div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
