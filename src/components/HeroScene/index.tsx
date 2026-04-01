import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useLoading } from "../../context/LoadingProvider";
import handleResize from "../utils/heroResize";
import { setProgress } from "../Loading";
import { setCharTimeline, setAllTimeline } from "../utils/GsapScroll";

function buildHero(): THREE.Group {
  const parallax = new THREE.Group();
  parallax.name = "heroParallax";

  const coreGeo = new THREE.IcosahedronGeometry(1.65, 1);
  const coreMat = new THREE.MeshStandardMaterial({
    color: 0x14110e,
    metalness: 0.88,
    roughness: 0.28,
    emissive: new THREE.Color(0xc45c26),
    emissiveIntensity: 0.18,
  });
  const core = new THREE.Mesh(coreGeo, coreMat);
  core.name = "heroCore";
  parallax.add(core);

  const wireGeo = new THREE.IcosahedronGeometry(2.05, 1);
  const wireMat = new THREE.MeshBasicMaterial({
    color: 0x3dd6c6,
    wireframe: true,
    transparent: true,
    opacity: 0.28,
  });
  const wire = new THREE.Mesh(wireGeo, wireMat);
  wire.name = "heroWire";
  parallax.add(wire);

  const innerGlowGeo = new THREE.IcosahedronGeometry(1.25, 0);
  const innerGlowMat = new THREE.MeshBasicMaterial({
    color: 0xe8a54b,
    transparent: true,
    opacity: 0.06,
  });
  const innerGlow = new THREE.Mesh(innerGlowGeo, innerGlowMat);
  innerGlow.name = "heroGlow";
  parallax.add(innerGlow);

  const orbit = new THREE.Group();
  orbit.name = "heroOrbit";
  const blockMat = new THREE.MeshStandardMaterial({
    color: 0xe8a54b,
    metalness: 0.72,
    roughness: 0.32,
    emissive: new THREE.Color(0x6b3010),
    emissiveIntensity: 0.35,
  });
  const n = 10;
  for (let i = 0; i < n; i++) {
    const t = (i / n) * Math.PI * 2;
    const h = 0.22 + (i % 3) * 0.06;
    const cube = new THREE.Mesh(
      new THREE.BoxGeometry(0.2, h, 0.12),
      blockMat.clone()
    );
    const r = 2.85 + (i % 2) * 0.35;
    cube.position.set(Math.cos(t) * r, Math.sin(t * 1.7) * 0.55, Math.sin(t) * r);
    cube.rotation.set(
      Math.sin(t) * 0.2,
      t + Math.PI / 2,
      Math.cos(t * 0.5) * 0.15
    );
    orbit.add(cube);
  }
  parallax.add(orbit);

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(3.95, 0.035, 12, 128),
    new THREE.MeshBasicMaterial({
      color: 0xe8a54b,
      transparent: true,
      opacity: 0.42,
    })
  );
  ring.rotation.x = Math.PI / 2.15;
  ring.name = "heroRing";
  parallax.add(ring);

  const ring2 = new THREE.Mesh(
    new THREE.TorusGeometry(4.45, 0.018, 8, 96),
    new THREE.MeshBasicMaterial({
      color: 0x3dd6c6,
      transparent: true,
      opacity: 0.22,
    })
  );
  ring2.rotation.x = Math.PI / 2.4;
  ring2.rotation.z = Math.PI / 6;
  ring2.name = "heroRingCool";
  parallax.add(ring2);

  const root = new THREE.Group();
  root.name = "heroRoot";
  root.add(parallax);
  root.position.set(0, 11.2, 0);
  root.scale.setScalar(1.365);

  return root;
}

const HeroScene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<THREE.Group | null>(null);
  const { setLoading } = useLoading();

  useEffect(() => {
    if (!canvasDiv.current) return;

    const el = canvasDiv.current;
    const rect = el.getBoundingClientRect();
    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(rect.width, rect.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    el.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(14.5, rect.width / rect.height, 0.1, 1000);
    camera.position.set(0, 13.1, 24.7);
    camera.zoom = 1.1;
    camera.updateProjectionMatrix();

    const ambient = new THREE.AmbientLight(0xfff0e6, 0.38);
    const key = new THREE.DirectionalLight(0xe8a54b, 1.35);
    key.position.set(-5, 12, 8);
    const cool = new THREE.DirectionalLight(0x3dd6c6, 0.42);
    cool.position.set(6, 4, -6);
    const rim = new THREE.PointLight(0xe8a54b, 1.6, 40, 2);
    rim.position.set(-3, 6, 4);
    scene.add(ambient, key, cool, rim);

    const hero = buildHero();
    scene.add(hero);
    heroRef.current = hero;

    const progress = setProgress(setLoading);
    setCharTimeline(hero, camera);
    setAllTimeline();

    let killed = false;
    progress.clear();
    progress.loaded().then(() => {
      if (killed) return;
      el.classList.add("character-loaded");
    });

    const mouse = { x: 0, y: 0 };
    const onMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    document.addEventListener("mousemove", onMove);

    const clock = new THREE.Clock();
    let rafId = 0;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const parallax = hero.getObjectByName("heroParallax") as THREE.Group | null;
      if (parallax) {
        parallax.rotation.y += delta * 0.09;
        parallax.rotation.x = THREE.MathUtils.lerp(
          parallax.rotation.x,
          mouse.y * 0.14,
          0.055
        );
        parallax.rotation.z = THREE.MathUtils.lerp(
          parallax.rotation.z,
          -mouse.x * 0.09,
          0.045
        );
      }
      const wire = hero.getObjectByName("heroWire") as THREE.Mesh | null;
      if (wire) wire.rotation.y -= delta * 0.11;
      const orbit = hero.getObjectByName("heroOrbit") as THREE.Group | null;
      if (orbit) orbit.rotation.y += delta * 0.05;

      const core = hero.getObjectByName("heroCore") as THREE.Mesh | null;
      if (core?.material && "emissiveIntensity" in core.material) {
        const m = core.material as THREE.MeshStandardMaterial;
        m.emissiveIntensity =
          0.14 + Math.sin(clock.elapsedTime * 1.7) * 0.04;
      }

      renderer.render(scene, camera);
    };
    rafId = requestAnimationFrame(animate);

    const onResize = () => {
      if (!canvasDiv.current || !heroRef.current) return;
      handleResize(renderer, camera, canvasDiv, heroRef.current);
    };
    window.addEventListener("resize", onResize);

    return () => {
      killed = true;
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      scene.clear();
      renderer.dispose();
      if (el.contains(renderer.domElement)) {
        el.removeChild(renderer.domElement);
      }
    };
  }, [setLoading]);

  return (
    <div className="character-container">
      <div className="character-model" ref={canvasDiv}>
        <div className="character-rim" />
      </div>
    </div>
  );
};

export default HeroScene;
