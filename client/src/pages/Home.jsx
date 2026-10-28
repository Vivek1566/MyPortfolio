import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard from "../components/ProjectCard.jsx";
import { githubProfile, projects } from "../data/projects.js";

const skills = ["React", "JavaScript", "TypeScript", "Python", "FastAPI", "Machine Learning", "PostgreSQL", "MySQL", "Git", "Computer Vision"];

gsap.registerPlugin(ScrollTrigger);

const assetUrl = (path) => `${import.meta.env.BASE_URL}${path}`;

const imageCards = [
  {
    source: assetUrl("images/vivek-portrait.jpg"),
    width: 2.35,
    height: 3.13,
    x: 0.15,
    y: 0,
    z: 0.6,
    rotation: -0.045,
    depth: 0.9,
  },
  {
    source: assetUrl("images/portfolio-atmosphere.jpg"),
    width: 1.95,
    height: 1.38,
    x: -0.8,
    y: 1.3,
    z: -1.15,
    rotation: 0.1,
    depth: -0.7,
  },
  {
    source: assetUrl("images/hero-bg.png"),
    width: 1.35,
    height: 1.4,
    x: 1.25,
    y: -2.05,
    z: -1.5,
    rotation: -0.12,
    depth: 0.55,
    cropBottom: 0.24,
  },
];

function HeroImageScene() {
  const mountRef = useRef(null);
  const [webglUnavailable, setWebglUnavailable] = useState(false);

  useEffect(() => {
    let disposed = false;
    let teardown = () => {};

    async function initializeScene() {
      let threeModule;
      try {
        threeModule = await import("three");
      } catch (error) {
        if (!disposed) {
          console.error("Could not load Three.js for the portfolio image animation.", error);
          setWebglUnavailable(true);
        }
        return;
      }

      if (disposed) return;
      const {
        DoubleSide,
        Group,
        Mesh,
        MeshBasicMaterial,
        PerspectiveCamera,
        PlaneGeometry,
        Scene,
        SRGBColorSpace,
        TextureLoader,
        WebGLRenderer,
      } = threeModule;
      const mountNode = mountRef.current;
      if (!mountNode) return;

      let renderer;
      try {
        renderer = new WebGLRenderer({ alpha: true, antialias: true });
      } catch (error) {
        console.error("Could not start the portfolio image animation.", error);
        setWebglUnavailable(true);
        return;
      }

      const scene = new Scene();
      const camera = new PerspectiveCamera(36, 1, 0.1, 100);
      camera.position.z = 9;

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.outputColorSpace = SRGBColorSpace;
      mountNode.appendChild(renderer.domElement);

      const photoGroup = new Group();
      scene.add(photoGroup);

      const loader = new TextureLoader();
      const textures = [];
      const geometries = [];
      const materials = [];
      const cards = [];
      let targetScroll = 0;
      let scrollPosition = 0;
      let animationFrame;
      let isPageVisible = !document.hidden;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      imageCards.forEach((card, index) => {
        const cardGroup = new Group();
        cardGroup.position.set(card.x, card.y, card.z);
        cardGroup.rotation.z = card.rotation;
        photoGroup.add(cardGroup);

        const frameGeometry = new PlaneGeometry(card.width + 0.1, card.height + 0.1);
        const frameMaterial = new MeshBasicMaterial({
          color: index === 0 ? 0xffe2ae : 0xfff7e9,
          transparent: true,
          opacity: index === 0 ? 0.88 : 0.68,
          side: DoubleSide,
        });
        const frame = new Mesh(frameGeometry, frameMaterial);
        frame.position.z = -0.025;
        cardGroup.add(frame);
        geometries.push(frameGeometry);
        materials.push(frameMaterial);

        const imageGeometry = new PlaneGeometry(card.width, card.height);
        const imageMaterial = new MeshBasicMaterial({
          color: 0xffffff,
          side: DoubleSide,
          toneMapped: false,
        });
        const image = new Mesh(imageGeometry, imageMaterial);
        cardGroup.add(image);
        geometries.push(imageGeometry);
        materials.push(imageMaterial);
        cards.push({ group: cardGroup, ...card });

        loader.load(
          card.source,
          (texture) => {
            if (disposed) {
              texture.dispose();
              return;
            }

            if (card.cropBottom) {
              texture.offset.y = card.cropBottom;
              texture.repeat.y = 1 - card.cropBottom;
              texture.needsUpdate = true;
            }
            texture.colorSpace = SRGBColorSpace;
            imageMaterial.map = texture;
            imageMaterial.needsUpdate = true;
            textures.push(texture);

            const visibleHeight = texture.image.height * (1 - (card.cropBottom || 0));
            const sourceAspect = texture.image.width / visibleHeight;
            const cardAspect = card.width / card.height;
            if (sourceAspect > cardAspect) {
              image.scale.y = cardAspect / sourceAspect;
            } else {
              image.scale.x = sourceAspect / cardAspect;
            }
          },
          undefined,
          (error) => {
            if (disposed) return;
            console.error(`Could not load portfolio image: ${card.source}`, error);
            setWebglUnavailable(true);
          },
        );
      });

      const resizeObserver = new ResizeObserver(() => {
        const { clientWidth, clientHeight } = mountNode;
        if (!clientWidth || !clientHeight) return;
        camera.aspect = clientWidth / clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(clientWidth, clientHeight);
        renderer.render(scene, camera);
      });
      resizeObserver.observe(mountNode);

      const onVisibilityChange = () => {
        isPageVisible = !document.hidden;
        if (isPageVisible && !reducedMotion) animationFrame = requestAnimationFrame(animate);
        else cancelAnimationFrame(animationFrame);
      };
      document.addEventListener("visibilitychange", onVisibilityChange);

      const heroSection = mountNode.closest(".hero");
      const scrollTrigger = heroSection ? ScrollTrigger.create({
        trigger: heroSection,
        start: "top top",
        end: "bottom top",
        onUpdate: ({ progress }) => {
          targetScroll = progress;
        },
      }) : null;

      function renderFrame(time = 0) {
        const elapsed = time * 0.001;
        scrollPosition += (targetScroll - scrollPosition) * 0.075;

        photoGroup.position.y = scrollPosition * 0.55;
        photoGroup.rotation.y = scrollPosition * 0.1;
        photoGroup.scale.setScalar(1 - scrollPosition * 0.08);

        cards.forEach((card, index) => {
          const side = index === 1 ? -1 : 1;
          const drift = reducedMotion ? 0 : Math.sin(elapsed * 0.65 + index * 1.3) * 0.08;
          card.group.position.x = card.x + side * scrollPosition * card.depth;
          card.group.position.y = card.y + drift - scrollPosition * (index === 0 ? 0.3 : -0.18);
          card.group.rotation.z = card.rotation + side * scrollPosition * 0.07;
        });

        renderer.render(scene, camera);
      }

      function animate(time) {
        if (!isPageVisible || disposed) return;
        renderFrame(time);
        animationFrame = requestAnimationFrame(animate);
      }

      renderFrame();
      if (!reducedMotion && isPageVisible) animationFrame = requestAnimationFrame(animate);

      teardown = () => {
        cancelAnimationFrame(animationFrame);
        document.removeEventListener("visibilitychange", onVisibilityChange);
        resizeObserver.disconnect();
        scrollTrigger?.kill();
        renderer.domElement.remove();
        renderer.dispose();
        geometries.forEach((geometry) => geometry.dispose());
        materials.forEach((material) => material.dispose());
        textures.forEach((texture) => texture.dispose());
      };
    }

    void initializeScene();
    return () => {
      disposed = true;
      teardown();
    };
  }, []);

  return (
    <div className={`hero-image-scene${webglUnavailable ? " is-fallback" : ""}`} aria-hidden="true">
      <div className="hero-image-fallback">
        <img className="fallback-photo fallback-photo-main" src={assetUrl("images/vivek-portrait.jpg")} alt="" />
        <img className="fallback-photo fallback-photo-left" src={assetUrl("images/portfolio-atmosphere.jpg")} alt="" />
        <img className="fallback-photo fallback-photo-right" src={assetUrl("images/hero-bg.png")} alt="" />
      </div>
      <div ref={mountRef} className="hero-image-canvas" />
    </div>
  );
}

export default function Home() {
  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <main id="main">
      {/* ── HERO with animated background image ─────────────────────── */}
      <section className="hero" aria-labelledby="hero-title">
        {/* Static base image — Ken Burns */}
        <div className="hero-bg" aria-hidden="true" />

        <HeroImageScene />

        {/* ── LIVE VIDEO ANIMATION LAYERS ────────────────────────────── */}
        <div className="hero-live-layers" aria-hidden="true">
          {/* Cloud layers — 3 independent speeds */}
          <div className="cloud-far" />
          <div className="cloud-mid" />
          <div className="cloud-near" />

          {/* Mist rolling over valley & lake */}
          <div className="mist-layer" />

          {/* Lake water shimmer with multiple ripple lines */}
          <div className="water-shimmer">
            <div className="water-ripple" style={{"--ripple-dur":"6.2s", "--ripple-delay":"0s",   top:"8%"}} />
            <div className="water-ripple" style={{"--ripple-dur":"4.5s", "--ripple-delay":"-1.8s", top:"22%"}} />
            <div className="water-ripple" style={{"--ripple-dur":"5.8s", "--ripple-delay":"-3.1s", top:"36%"}} />
            <div className="water-ripple" style={{"--ripple-dur":"7.0s", "--ripple-delay":"-0.9s", top:"52%"}} />
            <div className="water-ripple" style={{"--ripple-dur":"4.9s", "--ripple-delay":"-4.5s", top:"68%"}} />
            <div className="water-ripple" style={{"--ripple-dur":"6.5s", "--ripple-delay":"-2.3s", top:"82%"}} />
          </div>
        </div>

        {/* Floating warm dust / pollen specks */}
        <div className="hero-particles" aria-hidden="true">
          <span /><span /><span /><span /><span />
          <span /><span /><span /><span /><span />
        </div>

        <div className="hero-copy page-wrap" data-hero-intro>
          <p className="eyebrow" data-hero-item><span className="status-dot" /> SOFTWARE DEVELOPER · FULL-STACK · AI/ML</p>
          <h1 id="hero-title" data-hero-item>I build things<br />that make <span className="accent-text">sense.</span></h1>
          <p className="hero-description" data-hero-item>I'm Vivek Rajak, a Computer Science Engineering student building thoughtful products across full-stack, backend, and AI.</p>
          <div className="button-row" data-hero-item>
            <a className="button button-primary" href="#work">Explore selected work <span aria-hidden="true">↓</span></a>
            <Link className="button button-outline" to="/contact">Let's connect <span aria-hidden="true">↗</span></Link>
          </div>
          <a className="scroll-cue" data-hero-item href="#intro"><span className="scroll-line" /> SCROLL TO EXPLORE</a>
        </div>
      </section>

      {/* ── TICKER ──────────────────────────────────────────────────── */}
      <div className="ticker" aria-label="Areas of interest">
        <div className="ticker-track"><span>PRODUCT ENGINEERING</span><i>✳</i><span>ARTIFICIAL INTELLIGENCE</span><i>✳</i><span>BACKEND SYSTEMS</span><i>✳</i><span>COMPUTER VISION</span><i>✳</i><span>FULL-STACK DEVELOPMENT</span><i>✳</i><span>PRODUCT ENGINEERING</span><i>✳</i><span>ARTIFICIAL INTELLIGENCE</span><i>✳</i><span>BACKEND SYSTEMS</span><i>✳</i><span>COMPUTER VISION</span><i>✳</i><span>FULL-STACK DEVELOPMENT</span><i>✳</i></div>
      </div>

      {/* ── INTRO ────────────────────────────────────────────────────── */}
      <section className="intro-section page-wrap section-space" id="intro" data-reveal>
        <div className="section-label"><span>01</span><span>THE PERSON BEHIND THE BUILDS</span></div>
        <div className="intro-grid">
          <h2>Curiosity is the<br />start of <span className="accent-text">everything.</span></h2>
          <div className="intro-body">
            <p>I'm a Computer Science Engineering student with hands-on experience building full-stack applications, backend APIs, and AI-enabled products. I enjoy taking a real problem from a rough idea to something people can actually use.</p>
            <p>I care about clean architecture, useful details, and technology that solves more than it complicates.</p>
            <Link className="text-link" to="/about">More about me <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>

      {/* ── FEATURED WORK ────────────────────────────────────────────── */}
      <section className="work-section section-space" id="work">
        <div className="page-wrap">
          <div className="section-label"><span>02</span><span>SELECTED PROJECTS</span></div>
          <div className="section-heading" data-reveal>
            <div><h2>Built to be <span className="accent-text">useful.</span></h2><p>A few ideas, systems, and experiments from my GitHub.</p></div>
            <Link className="text-link" to="/projects">View all projects <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="project-grid">
            {featuredProjects.map((project) => <ProjectCard project={project} key={project.repo} />)}
          </div>
        </div>
      </section>

      {/* ── TOOLKIT ─────────────────────────────────────────────────── */}
      <section className="toolkit-section page-wrap section-space" id="toolkit">
        <div className="section-label"><span>03</span><span>MY TOOLKIT</span></div>
        <div className="toolkit-grid" data-reveal>
          <div><h2>Good tools.<br /><span className="accent-text">Better questions.</span></h2><p>My work spans frontend craft, backend foundations, and practical AI/ML exploration.</p></div>
          <ul className="skill-list">{skills.map((skill, index) => <li key={skill}><span>{String(index + 1).padStart(2, "0")}</span>{skill}<i aria-hidden="true">↗</i></li>)}</ul>
        </div>
      </section>

      {/* ── CTA / CONTACT ────────────────────────────────────────────── */}
      <section className="home-contact section-space" id="hello">
        <div className="page-wrap home-contact-inner" data-reveal>
          <div className="section-label"><span>04</span><span>HAVE SOMETHING IN MIND?</span></div>
          <h2>Let's make the<br /><span className="accent-text">next thing matter.</span></h2>
          <div className="home-contact-bottom"><a className="button button-primary" href="mailto:vivekrajak3004@gmail.com">Email Vivek <span aria-hidden="true">↗</span></a><a className="home-email" href="mailto:vivekrajak3004@gmail.com">vivekrajak3004@gmail.com</a><a className="home-email" href={githubProfile} target="_blank" rel="noreferrer">GitHub profile ↗</a></div>
        </div>
      </section>
    </main>
  );
}
