import { SplitText } from "gsap-trial/SplitText";
import gsap from "gsap";
import { smoother } from "../Navbar";

export function initialFX() {
  document.body.style.overflowY = "auto";
  smoother.paused(false);
  document.getElementsByTagName("main")[0].classList.add("main-active");
  gsap.to("body", {
    backgroundColor: "#080706",
    duration: 0.35,
    delay: 0.05,
    ease: "power2.out",
  });

  const intro = new SplitText(
    [".landing-intro h3", ".landing-intro h2", ".landing-intro h1"],
    {
      type: "lines",
      linesClass: "split-line",
    }
  );
  gsap.fromTo(
    intro.lines,
    { opacity: 0, y: 22 },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
      stagger: 0.075,
      delay: 0.08,
    }
  );

  const TextProps = { type: "chars,lines", linesClass: "split-h2" };

  const landingText2 = new SplitText(".landing-h2-info", TextProps);
  gsap.fromTo(
    landingText2.chars,
    { opacity: 0, y: 24 },
    {
      opacity: 1,
      duration: 0.45,
      ease: "power2.out",
      y: 0,
      stagger: 0.018,
      delay: 0.12,
    }
  );

  gsap.fromTo(
    ".landing-info-h2",
    { opacity: 0, y: 16 },
    {
      opacity: 1,
      duration: 0.55,
      ease: "power2.out",
      y: 0,
      delay: 0.22,
    }
  );

  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0, y: -8 },
    {
      opacity: 1,
      duration: 0.45,
      ease: "power2.out",
      y: 0,
      delay: 0.04,
    }
  );

  const landingText3 = new SplitText(".landing-h2-info-1", TextProps);
  const landingText4 = new SplitText(".landing-h2-1", TextProps);
  const landingText5 = new SplitText(".landing-h2-2", TextProps);

  LoopText(landingText2, landingText3);
  LoopText(landingText4, landingText5);
}

function LoopText(Text1: SplitText, Text2: SplitText) {
  const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.6 });
  const delay = 3.8;
  const delay2 = delay * 2 + 0.85;

  tl.fromTo(
    Text2.chars,
    { opacity: 0, y: 36 },
    {
      opacity: 1,
      duration: 0.55,
      ease: "power2.out",
      y: 0,
      stagger: { each: 0.045, from: "start" },
      delay: delay,
    },
    0
  )
    .fromTo(
      Text1.chars,
      { y: 36 },
      {
        duration: 0.55,
        ease: "power2.out",
        y: 0,
        stagger: { each: 0.045, from: "start" },
        delay: delay2,
      },
      1
    )
    .fromTo(
      Text1.chars,
      { y: 0 },
      {
        y: -36,
        duration: 0.5,
        ease: "power2.in",
        stagger: { each: 0.04, from: "end" },
        delay: delay,
      },
      0
    )
    .to(
      Text2.chars,
      {
        y: -36,
        duration: 0.5,
        ease: "power2.in",
        stagger: { each: 0.04, from: "end" },
        delay: delay2,
      },
      1
    );
}
