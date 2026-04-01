import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          Experience <span>&</span>
          <br /> trajectory
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4> Software Engineer</h4>
                <h5>eSparkBiz · Ahmedabad</h5>
              </div>
              <h3 className="font-mono">2026 - Present</h3>
            </div>
            <p>
              Web3 verification with a responsive React / PWA front end and AWS
              QLDB for immutable audit trails. Nest.js microservices on AWS with
              CI/CD focused on scalability and reliable transactions. Shipped
              production Android and iOS builds with Expo and React Native CLI.
              Heavy use of Cursor / Copilot for speed on the safe, isolated
              parts of the stack.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Full Stack Developer</h4>
                <h5>IT Path Solutions · Ahmedabad</h5>
              </div>
              <h3 className="font-mono">2022 - 2025</h3>
            </div>
            <p>
              End-to-end work on a financial platform integrating Twilio, Pismo,
              and Basiq for payments and card lifecycle. Improved React
              rendering through memoization and structural cleanup (~25%).
              Node, Express, and MSSQL backends with faster sync and ~40% less
              downtime after REST migrations. Jenkins CI/CD that cut deploy time
              ~30%; Angular admin surfaces for reporting when the product needed
              it.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
