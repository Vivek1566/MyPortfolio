import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link, NavLink, Route, Routes, useLocation } from "react-router-dom";
import About from "./pages/About.jsx";
import Achievements from "./pages/Achievements.jsx";
import Contact from "./pages/Contact.jsx";
import Home from "./pages/Home.jsx";
import Projects from "./pages/Projects.jsx";
import Skills from "./pages/Skills.jsx";

const WELCOME_KEY = "vivek-welcome-seen";
const WELCOME_TTL_MS = 1000 * 60 * 12;

gsap.registerPlugin(ScrollTrigger);

function shouldShowWelcome() {
  try {
    const storedValue = sessionStorage.getItem(WELCOME_KEY);
    if (!storedValue) return true;
    const storedTime = Number.parseInt(storedValue, 10);
    if (Number.isNaN(storedTime)) return true;
    return Date.now() - storedTime > WELCOME_TTL_MS;
  } catch (error) {
    console.error("Could not read the welcome session preference.", error);
    return true;
  }
}

function WelcomeIntro({ onDismiss }) {
  const [isLeaving, setIsLeaving] = useState(false);
  const dismissButton = useRef(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dismissButton.current?.focus();

    try {
      sessionStorage.setItem(WELCOME_KEY, String(Date.now()));
    } catch (error) {
      console.error("Could not save the welcome session preference.", error);
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsLeaving(true);
      } else if (event.key === "Tab") {
        event.preventDefault();
        dismissButton.current?.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const enterTimer = window.setTimeout(() => setIsLeaving(true), reducedMotion ? 260 : 3800);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      window.clearTimeout(enterTimer);
    };
  }, []);

  useEffect(() => {
    if (!isLeaving) return undefined;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const exitTimer = window.setTimeout(onDismiss, reducedMotion ? 50 : 650);
    return () => window.clearTimeout(exitTimer);
  }, [isLeaving, onDismiss]);

  return (
    <div className={`welcome-screen${isLeaving ? " is-leaving" : ""}`} role="dialog" aria-modal="true" aria-labelledby="welcome-title">
      {/* Live animation layers — clouds + mist drift over the landscape */}
      <div className="hero-live-layers" aria-hidden="true">
        <div className="cloud-far" />
        <div className="cloud-mid" />
        <div className="cloud-near" />
        <div className="mist-layer" />
        <div className="water-shimmer">
          <div className="water-ripple" style={{"--ripple-dur":"6.2s", "--ripple-delay":"0s",   top:"8%"}} />
          <div className="water-ripple" style={{"--ripple-dur":"4.5s", "--ripple-delay":"-1.8s", top:"30%"}} />
          <div className="water-ripple" style={{"--ripple-dur":"5.8s", "--ripple-delay":"-3.1s", top:"55%"}} />
          <div className="water-ripple" style={{"--ripple-dur":"7.0s", "--ripple-delay":"-0.9s", top:"78%"}} />
        </div>
      </div>
      <div className="welcome-topline"><span>VR<span className="welcome-accent">.</span></span><span>PERSONAL PORTFOLIO · 2026</span></div>
      <div className="welcome-message">
        <p className="welcome-eyebrow"><span className="status-dot" /> A QUICK INTRODUCTION</p>
        <h2 id="welcome-title">Hi, I'm<br /><span>Vivek Rajak.</span></h2>
        <p className="welcome-caption">Software developer · Full-stack · AI/ML</p>
      </div>
      <div className="welcome-bottomline">
        <span className="welcome-loading-label">WELCOME TO MY PORTFOLIO</span>
        <span className="welcome-progress" aria-hidden="true"><i /></span>
      </div>
      <button className="welcome-skip" ref={dismissButton} type="button" onClick={() => setIsLeaving(true)}>Skip intro <span aria-hidden="true">↗</span></button>
    </div>
  );
}

function ScrollToRoute() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const target = hash ? document.querySelector(hash) : null;
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    if (target) {
      target.scrollIntoView({ behavior, block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior });
    }
  }, [pathname, hash]);

  return null;
}

function ScrollReveal() {
  const { pathname } = useLocation();

  useEffect(() => {
    const revealElements = gsap.utils.toArray("[data-reveal]");
    const hero = document.querySelector("[data-hero-intro]");
    const heroItems = hero ? hero.querySelectorAll("[data-hero-item]") : [];
    const skillItems = gsap.utils.toArray(".skill-list li");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      gsap.set([...revealElements, ...heroItems, ...skillItems], { clearProps: "all" });
      return undefined;
    }

    let refreshFrame;
    const context = gsap.context(() => {
      revealElements.forEach((element) => {
        const delay = Number.parseFloat(getComputedStyle(element).getPropertyValue("--reveal-delay")) || 0;

        gsap.fromTo(element, { y: 32 }, {
          y: 0,
          delay: delay / 1000,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 88%",
            once: true,
          },
        });
      });

      if (heroItems.length) {
        gsap.fromTo(heroItems, { y: 24 }, {
          y: 0,
          immediateRender: false,
          duration: 0.8,
          stagger: 0.12,
          delay: 0.12,
          ease: "power3.out",
        });
      }

      const heroBackground = document.querySelector(".hero-bg");
      const heroSection = document.querySelector(".hero");
      if (heroBackground && heroSection) {
        gsap.to(heroBackground, {
          scale: 1.18,
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: heroSection,
            start: "top top",
            end: "bottom top",
            scrub: 1.6,
          },
        });
      }

      skillItems.forEach((item, index) => {
        gsap.fromTo(item, { x: -18 }, {
          x: 0,
          duration: 0.75,
          delay: index * 0.04,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 88%",
            once: true,
          },
        });
      });
    });

    refreshFrame = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      window.cancelAnimationFrame(refreshFrame);
      context.revert();
    };
  }, [pathname]);

  return null;
}

function NotFound() {
  return (
    <main id="main" className="page-wrap inner-page">
      <p className="eyebrow">404 · PAGE NOT FOUND</p>
      <h1>This path<br /><span>isn’t here.</span></h1>
      <Link className="button button-primary" to="/">Back to home <span aria-hidden="true">↗</span></Link>
    </main>
  );
}

function Layout() {
  const [showWelcome, setShowWelcome] = useState(shouldShowWelcome);

  return (
    <>
      {showWelcome && <WelcomeIntro onDismiss={() => setShowWelcome(false)} />}
      <ScrollToRoute />
      <ScrollReveal />
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <Link className="brand" to="/" aria-label="Vivek Rajak home">VR<span>.</span></Link>
        <nav className="site-nav" aria-label="Main navigation">
          <NavLink end to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/projects">Projects</NavLink>
          <NavLink to="/skills">Skills</NavLink>
          <NavLink to="/achievements">Achievements</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <footer className="site-footer page-wrap">
        <Link className="brand" to="/">VR<span>.</span></Link>
        <p>Designed &amp; built by Vivek Rajak · {new Date().getFullYear()}</p>
        <Link className="text-link" to="/contact">Get in touch →</Link>
      </footer>
    </>
  );
}

export default function App() {
  return <Layout />;
}
