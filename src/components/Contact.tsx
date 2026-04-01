import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";
import { TECHNICAL_MANIFESTO_URL } from "../config/site";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a href="mailto:lakhanauday9@gmail.com" data-cursor="disable">
                lakhanauday9@gmail.com
              </a>
            </p>
            <h4>Phone</h4>
            <p className="font-mono">+91 82005 04513</p>
            <h4>Education</h4>
            <p>
              B.E. Information Technology — Marwadi University (2017–2021),
              CGPA 7.7/10
            </p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="https://github.com/UGlakhana45"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              GitHub <MdArrowOutward />
            </a>
            <a
              href="https://www.linkedin.com/in/uday-lakhana"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              LinkedIn <MdArrowOutward />
            </a>
            <a
              href={TECHNICAL_MANIFESTO_URL}
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Technical manifesto <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Designed &amp; engineered <br /> by{" "}
              <span>Uday Lakhana</span>
            </h2>
            <h5>
              <MdCopyright /> 2026 · Ahmedabad
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
