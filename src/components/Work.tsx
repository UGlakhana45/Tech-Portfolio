import { useState, useCallback, type CSSProperties } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

const projects: {
  title: string;
  category: string;
  tools: string;
  image?: string;
  link?: string;
}[] = [
  {
    title: "Enterprise fintech platform",
    category: "Mobile-first banking & payments — NDA",
    tools:
      "Full-stack rebuild · React Native and Nest · wallet integrations (e.g. Apple / Google Pay) · statements & account flows · adaptive layouts for phone and tablet",
    image: "/work/card-fintech-app.svg",
  },
  {
    title: "Visa & immigration platform",
    category: "Canadian legal tech — NDA",
    tools:
      "WebRTC audio/video · WebSockets for live status · event-driven alerts · regulated documents & payments",
    image: "/work/card-visa.svg",
  },
  {
    title: "Web3 Digital verifications & signatures",
    category: "Web3-facing proof & ledger (current focus)",
    tools:
      "React · PWA · AWS QLDB · Nest.js microservices on AWS · Expo / RN to store",
    image: "/work/card-qldb.svg",
  },
  {
    title: "AI Fintech Dashboard",
    category: "Public demo — GitHub",
    tools: "TypeScript · composable dashboard architecture",
    image: "/work/card-ai-dash.svg",
    link: "https://github.com/UGlakhana45/AI-Fintech-Dashboard",
  },
  {
    title: "ai-fintech-webrtc",
    category: "Realtime experiments — GitHub",
    tools: "TypeScript · WebRTC-first patterns",
    image: "/work/card-webrtc.svg",
    link: "https://github.com/UGlakhana45/ai-fintech-webrtc",
  },
];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const goToPrev = useCallback(() => {
    const newIndex =
      currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex =
      currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          Selected <span>work</span>
        </h2>
        <p className="work-lede font-mono">
          Enterprise repos stay private; spots below mix NDA clients with public
          labs on{" "}
          <a
            href="https://github.com/UGlakhana45"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          .
        </p>

        <div className="carousel-wrapper">
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={goToPrev}
            aria-label="Previous project"
            data-cursor="disable"
          >
            <MdArrowBack />
          </button>
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={goToNext}
            aria-label="Next project"
            data-cursor="disable"
          >
            <MdArrowForward />
          </button>

          <div className="carousel-track-container">
            <div
              className="carousel-track"
              style={
                {
                  "--slide-count": projects.length,
                  transform: `translateX(calc(-${currentIndex} * 100% / var(--slide-count)))`,
                } as CSSProperties
              }
            >
              {projects.map((project, index) => (
                <div className="carousel-slide" key={project.title}>
                  <div className="carousel-content">
                    <div className="carousel-info">
                      <div className="carousel-number">
                        <h3>0{index + 1}</h3>
                      </div>
                      <div className="carousel-details">
                        <h4>{project.title}</h4>
                        <p className="carousel-category">
                          {project.category}
                        </p>
                        <div className="carousel-tools">
                          <span className="tools-label">Scope &amp; stack</span>
                          <p>{project.tools}</p>
                        </div>
                      </div>
                    </div>
                    <div className="carousel-image-wrapper">
                      <WorkImage
                        image={project.image}
                        alt={project.title}
                        link={project.link}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="carousel-dots">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${
                  index === currentIndex ? "carousel-dot-active" : ""
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to project ${index + 1}`}
                data-cursor="disable"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
