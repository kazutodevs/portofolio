import { useEffect, useRef, useState } from "react";

import Spline from "@splinetool/react-spline";
/* ─── TOKENS ─────────────────────────────────────────────── */
const T = {
  bg:         "#09090f",
  bgAlt:      "#111118",
  surface:    "#13131c",
  surfaceHi:  "#1a1a26",
  ink:        "#e8eaf0",
  inkMuted:   "#c2c2c2",
  inkFaint:   "#2e2e3e",
  lime:       "#c5f135",
  limeDark:   "#9dc41a",
  limeDim:    "rgba(197,241,53,0.10)",
  border:     "rgba(255,255,255,0.06)",
  borderHi:   "rgba(255,255,255,0.12)",
};

/* ─── GLOBAL STYLES ──────────────────────────────────────── */
function GlobalStyle() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Grotesk:wght@300;400;500;600&family=JetBrains+Mono:wght@300;400;500&display=swap');

      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }

      body {
        background: #09090f;
        color: #e8eaf0;
        font-family: 'Space Grotesk', sans-serif;
        -webkit-font-smoothing: antialiased;
        overflow-x: hidden;
      }

      /* CRT scanline - fixed, pointer-events-none, never on scroll container */
      body::after {
        content: '';
        position: fixed;
        inset: 0;
        z-index: 9999;
        pointer-events: none;
        background: repeating-linear-gradient(
          0deg,
          transparent,
          transparent 3px,
          rgba(0,0,0,0.025) 3px,
          rgba(0,0,0,0.025) 4px
        );
      }

      ::selection { background: #c5f135; color: #09090f; }
      ::-webkit-scrollbar { width: 3px; }
      ::-webkit-scrollbar-track { background: #09090f; }
      ::-webkit-scrollbar-thumb { background: rgba(197,241,53,0.5); border-radius: 2px; }
      :focus-visible { outline: 2px solid #c5f135; outline-offset: 3px; }

      @keyframes fadeIn  { from { opacity:0 } to { opacity:1 } }
      @keyframes fadeUp  { from { opacity:0; transform:translateY(28px) } to { opacity:1; transform:translateY(0) } }
      @keyframes blobGlow {
        0%,100% { box-shadow: 0 0 80px 20px rgba(197,241,53,0.06); }
        50%      { box-shadow: 0 0 120px 40px rgba(197,241,53,0.12); }
      }
      @keyframes float {
        0%,100% { transform:translateY(0)   }
        50%      { transform:translateY(-10px) }
      }
      @keyframes gridPulse {
        0%,100% { opacity:0.035 }
        50%      { opacity:0.07  }
      }
      @keyframes spin { from { transform:rotate(0deg) } to { transform:rotate(360deg) } }

      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          transition-duration: 0.01ms !important;
        }
      }

      /* ── NAV ── */
      .nav-pill-link {
        font-family: 'Space Grotesk', sans-serif;
        font-size: 13.5px; font-weight: 400;
        color: #5a5a6e;
        text-decoration: none;
        padding: 6px 14px;
        border-radius: 99px;
        transition: background 0.2s, color 0.2s;
      }
      .nav-pill-link:hover { background: rgba(255,255,255,0.05); color: #e8eaf0; }

      /* ── REVEAL ── */
      .reveal {
        opacity: 0; transform: translateY(36px);
        transition: opacity 0.75s cubic-bezier(0.16,1,0.3,1),
                    transform 0.75s cubic-bezier(0.16,1,0.3,1);
      }
      .reveal.in { opacity:1; transform:translateY(0); }

      /* ── BUTTONS ── */
      .btn-lime {
        display: inline-flex; align-items: center; gap: 8px;
        font-family: 'Space Grotesk', sans-serif;
        font-size: 14px; font-weight: 600;
        color: #09090f; background: #c5f135;
        border: none; border-radius: 99px;
        padding: 13px 28px;
        cursor: pointer; text-decoration: none;
        transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
        white-space: nowrap;
      }
      .btn-lime:hover {
        background: #d4ff3d;
        transform: translateY(-2px);
        box-shadow: 0 8px 32px rgba(197,241,53,0.3);
      }
      .btn-lime:active { transform: scale(0.97); }

      .btn-ghost {
        display: inline-flex; align-items: center; gap: 8px;
        font-family: 'Space Grotesk', sans-serif;
        font-size: 14px; font-weight: 500;
        color: #e8eaf0; background: transparent;
        border: 1px solid rgba(255,255,255,0.15);
        border-radius: 99px; padding: 12px 24px;
        cursor: pointer; text-decoration: none;
        transition: border-color 0.2s, background 0.2s, transform 0.15s;
        white-space: nowrap;
      }
      .btn-ghost:hover {
        border-color: rgba(255,255,255,0.35);
        background: rgba(255,255,255,0.04);
        transform: translateY(-1px);
      }
      .btn-ghost:active { transform: scale(0.97); }

      /* ── CARDS ── */
      .project-card {
        background: #13131c;
        border: 1px solid rgba(255,255,255,0.06);
        border-radius: 16px; overflow: hidden;
        transition: border-color 0.3s, transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s;
        cursor: pointer;
      }
      .project-card:hover {
        border-color: rgba(197,241,53,0.25);
        transform: translateY(-6px);
        box-shadow: 0 24px 60px rgba(0,0,0,0.4);
      }
      .project-card:active { transform: translateY(-2px) scale(0.99); }

      /* ── SKILL CHIP ── */
      .skill-chip {
        font-family: 'JetBrains Mono', monospace;
        font-size: 12px; letter-spacing: 0.04em;
        color: #5a5a6e; background: transparent;
        border: 1px solid rgba(255,255,255,0.08);
        padding: 8px 14px; border-radius: 99px;
        transition: color 0.2s, background 0.2s, border-color 0.2s;
        white-space: nowrap; cursor: default;
      }
      .skill-chip:hover {
        color: #09090f;
        background: #c5f135;
        border-color: #c5f135;
      }

      /* ── CONTACT FIELDS ── */
      .contact-field {
        width: 100%;
        background: #13131c;
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 10px;
        color: #e8eaf0;
        font-family: 'Space Grotesk', sans-serif;
        font-size: 15px; padding: 14px 18px;
        outline: none;
        transition: border-color 0.2s;
      }
      .contact-field::placeholder { color: #2e2e3e; }
      .contact-field:focus { border-color: rgba(197,241,53,0.5); }

      .field-label {
        display: block;
        font-family: 'JetBrains Mono', monospace;
        font-size: 11px; letter-spacing: 0.09em;
        color: #5a5a6e; text-transform: uppercase;
        margin-bottom: 7px;
      }

      /* ── TECH GRID BG ── */
      .tech-grid {
        position: absolute; inset: 0; pointer-events: none;
        background-image:
          linear-gradient(rgba(197,241,53,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(197,241,53,0.04) 1px, transparent 1px);
        background-size: 52px 52px;
        animation: gridPulse 5s ease-in-out infinite;
      }

      /* ── EXPERIENCE ITEM ── */
      .exp-row {
        padding: 28px 0;
        border-bottom: 1px solid rgba(255,255,255,0.05);
        display: grid;
        grid-template-columns: 180px 1fr;
        gap: 24px;
        transition: background 0.2s;
      }
      .exp-row:last-child { border-bottom: none; }
      .exp-row:hover { background: rgba(255,255,255,0.015); margin: 0 -24px; padding-left: 24px; padding-right: 24px; border-radius: 8px; }

      @media (max-width: 768px) {
        .exp-row { grid-template-columns: 1fr; gap: 8px; }
        .hero-tl, .hero-br, .hero-bl, .hero-tr { display: none; }
        .projects-grid { grid-template-columns: 1fr !important; }
        .nav-pill-group { display: none; }
      }
    `}</style>
  );
}

/* ─── THREE.JS BLOB ──────────────────────────────────────── */
function Blob3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;
    let frameId, cleanup;

    import("https://esm.sh/three@0.165.0").then((THREE) => {
      const W = el.clientWidth;
      const H = el.clientHeight;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(W, H);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.1;
      el.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 100);
      camera.position.set(0, 0, 5.5);

      /* Lights */
      scene.add(new THREE.AmbientLight(0xffffff, 0.15));

      const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
      keyLight.position.set(5, 6, 5);
      scene.add(keyLight);

      const limeKey = new THREE.PointLight(0xc5f135, 6, 14);
      limeKey.position.set(-3, -1.5, 3);
      scene.add(limeKey);

      const limeFill = new THREE.PointLight(0xc5f135, 2.5, 10);
      limeFill.position.set(3, 3, -2);
      scene.add(limeFill);

      const rimLight = new THREE.DirectionalLight(0xffffff, 1.5);
      rimLight.position.set(-4, 2, -4);
      scene.add(rimLight);

      const backGlow = new THREE.PointLight(0x3a3aff, 1.5, 12);
      backGlow.position.set(0, -4, -4);
      scene.add(backGlow);

      /* PMREMGenerator for env map */
      const pmrem = new THREE.PMREMGenerator(renderer);
      const envTex = pmrem.fromScene(new THREE.RoomEnvironment(), 0.02).texture;
      scene.environment = envTex;
      pmrem.dispose();

      /* Blob */
      const geo = new THREE.SphereGeometry(1.55, 160, 160);
      const origPos = new Float32Array(geo.attributes.position.array);

      const mat = new THREE.MeshStandardMaterial({
        color: 0x1a2a10,
        metalness: 1.0,
        roughness: 0.02,
        envMap: envTex,
        envMapIntensity: 1.5,
      });

      const blob = new THREE.Mesh(geo, mat);
      scene.add(blob);

      /* Main lime ring */
      const rGeo = new THREE.TorusGeometry(2.2, 0.024, 10, 160);
      const rMat = new THREE.MeshStandardMaterial({
        color: 0xc5f135, metalness: 0.2, roughness: 0.45,
        emissive: 0x4a5a00, emissiveIntensity: 0.3,
      });
      const ring = new THREE.Mesh(rGeo, rMat);
      ring.rotation.x = Math.PI / 2.4;
      scene.add(ring);

      /* Secondary chrome ring */
      const r2Geo = new THREE.TorusGeometry(2.7, 0.009, 6, 120);
      const r2Mat = new THREE.MeshStandardMaterial({
        color: 0x888888, metalness: 0.95, roughness: 0.08,
        transparent: true, opacity: 0.35,
      });
      const ring2 = new THREE.Mesh(r2Geo, r2Mat);
      ring2.rotation.x = Math.PI / 3.5;
      ring2.rotation.z = Math.PI / 5.5;
      scene.add(ring2);

      /* Third thin accent ring */
      const r3Geo = new THREE.TorusGeometry(1.9, 0.006, 4, 100);
      const r3Mat = new THREE.MeshStandardMaterial({
        color: 0xc5f135, metalness: 0.1, roughness: 0.8,
        transparent: true, opacity: 0.5,
      });
      const ring3 = new THREE.Mesh(r3Geo, r3Mat);
      ring3.rotation.x = Math.PI / 1.8;
      ring3.rotation.y = Math.PI / 4;
      scene.add(ring3);

      /* Animate */
      let t = 0;
      const animate = () => {
        frameId = requestAnimationFrame(animate);
        t += 0.006;

        /* Organic vertex morph */
        const pos = geo.attributes.position;
        for (let i = 0; i < pos.count; i++) {
          const ox = origPos[i * 3];
          const oy = origPos[i * 3 + 1];
          const oz = origPos[i * 3 + 2];
          const len = Math.sqrt(ox*ox + oy*oy + oz*oz);
          const f = 1.6, a = 0.25;
          const n =
            Math.sin(ox*f + t*0.9) * Math.cos(oy*f + t*0.7) * a +
            Math.sin(oz*f*1.3 + t*0.8) * Math.cos(ox*f*0.9 + t*1.2) * a * 0.55 +
            Math.cos(oy*f*1.5 + t*0.5) * Math.sin(oz*f + t*1.0) * a * 0.38;
          const s = (1 + n) / len;
          pos.setXYZ(i, ox*s, oy*s, oz*s);
        }
        pos.needsUpdate = true;
        geo.computeVertexNormals();

        blob.rotation.y += 0.0038;
        blob.rotation.x += 0.0007;

        ring.rotation.z  += 0.005;
        ring2.rotation.z -= 0.0028;
        ring3.rotation.y += 0.004;
        ring3.rotation.z += 0.002;

        /* Lime light pulse */
        limeKey.intensity = 5 + Math.sin(t * 1.2) * 1.5;

        renderer.render(scene, camera);
      };
      animate();

      const onResize = () => {
        const nW = el.clientWidth, nH = el.clientHeight;
        camera.aspect = nW / nH;
        camera.updateProjectionMatrix();
        renderer.setSize(nW, nH);
      };
      window.addEventListener("resize", onResize);

      cleanup = () => {
        cancelAnimationFrame(frameId);
        window.removeEventListener("resize", onResize);
        [geo, mat, rGeo, rMat, r2Geo, r2Mat, r3Geo, r3Mat].forEach(x => x.dispose());
        renderer.dispose();
        if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
      };
    });

    return () => { if (cleanup) cleanup(); };
  }, []);

  return (
    <div ref={mountRef} style={{
      position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
    }} />
  );
}

/* ─── NAV ────────────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 300,
      height: 64,
      display: "flex", alignItems: "center",
      padding: "0 clamp(20px, 5vw, 64px)",
      justifyContent: "space-between",
      background: scrolled ? "rgba(9,9,15,0.88)" : "transparent",
      backdropFilter: scrolled ? "blur(20px) saturate(1.5)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
      transition: "background 0.4s, border-color 0.4s",
    }}>
      {/* Logo */}
      <a href="#" style={{ textDecoration: "none" }}>
        <span style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 22, letterSpacing: "0.06em", color: T.ink,
        }}>
          KAZUTO<span style={{ color: T.lime }}>.</span>DEV
        </span>
      </a>

      {/* Pill nav */}
      <div className="nav-pill-group" style={{
        display: "flex", alignItems: "center",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 99, padding: "4px 6px", gap: 2,
      }}>
        {["About", "Skills", "Experience", "Projects", "Contact"].map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} className="nav-pill-link">{l}</a>
        ))}
      </div>

      {/* Right CTA */}
      <a href="#contact" className="btn-lime" style={{ fontSize: 13, padding: "9px 20px" }}>
        Hire me &rarr;
      </a>
    </nav>
  );
}

/* ─── HERO ───────────────────────────────────────────────── */
function Hero() {
  const [tick, setTick] = useState(true);
  useEffect(() => {
    const id = setInterval(() => setTick(p => !p), 520);
    return () => clearInterval(id);
  }, []);

  return (
    <section style={{
      minHeight: "100dvh", position: "relative", overflow: "hidden",
    }}>
      {/* Tech grid */}
      <div className="tech-grid" />

      {/* Ambient lime glow halo - pointer-events-none, absolute */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
        width: 600, height: 600, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(197,241,53,0.07) 0%, transparent 68%)",
        pointerEvents: "none", zIndex: 1,
        animation: "blobGlow 4s ease-in-out infinite",
      }} />

      {/* MASSIVE TYPE - z:1, behind blob */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1,
        display: "flex", alignItems: "center", justifyContent: "center",
        pointerEvents: "none", userSelect: "none",
      }}>
        <h1 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(96px, 18vw, 220px)",
          fontWeight: 400, lineHeight: 0.88,
          color: T.ink, textAlign: "center",
          letterSpacing: "0.02em",
          opacity: 0,
          animation: "fadeIn 1.1s cubic-bezier(0.16,1,0.3,1) 0.15s forwards",
          whiteSpace: "nowrap",
        }}>KAZUTO.</h1>
      </div>

{/* 3D Spline */}
{/* <div style={{
  position: "absolute",
  inset: 0,
  zIndex: 2,
}}>
  <Spline scene="https://prod.spline.design/usP08qHaNco0bDsG/scene.splinecode" />
</div> */}

      {/* ── SCATTERED OVERLAYS z:3 ── */}

      {/* Top-right: feature list */}
      <div className="hero-tr" style={{
        position: "absolute",
        top: "clamp(80px,12vh,116px)",
        right: "clamp(20px,5vw,64px)",
        zIndex: 3, textAlign: "right",
        opacity: 0, animation: "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 1.0s forwards",
      }}>
        {[["Web engineering", "/01"], ["Mobile apps", "/02"], ["Game development", "/03"]].map(([label, num]) => (
          <div key={num} style={{
            display: "flex", alignItems: "center",
            justifyContent: "flex-end", gap: 10, marginBottom: 10,
          }}>
            <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, color: T.inkMuted }}>{label}</span>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: T.inkFaint, letterSpacing: "0.07em" }}>{num}</span>
          </div>
        ))}
      </div>

      {/* Bottom-left: social proof + descriptor */}
      <div className="hero-bl" style={{
        position: "absolute",
        bottom: "clamp(36px,6vh,64px)",
        left: "clamp(20px,5vw,64px)",
        zIndex: 3,
        opacity: 0, animation: "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 1.05s forwards",
      }}>
        {/* Avatar stack */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <div style={{ display: "flex" }}>
            {["kzav1","kzav2","kzav3"].map((s, i) => (
              <img key={s}
                src={`https://picsum.photos/seed/${s}/40/40`}
                alt="collaborator"
                style={{
                  width: 30, height: 30, borderRadius: "50%",
                  border: "2px solid #09090f",
                  marginLeft: i > 0 ? -9 : 0, objectFit: "cover",
                }}
              />
            ))}
          </div>
          <div>
            <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 17, fontWeight: 600, color: T.ink, lineHeight: 1 }}>20+</div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: T.inkMuted, letterSpacing: "0.07em", marginTop: 3 }}>projects shipped</div>
          </div>
        </div>

        <p style={{
          fontFamily: "'Space Grotesk',sans-serif",
          fontSize: "clamp(13px,1.5vw,15px)", lineHeight: 1.6,
          color: T.inkMuted, maxWidth: "32ch",
        }}>
          Software engineer and game developer.<br />
          Building web, mobile, and interactive games.
        </p>

        {/* Terminal cursor line */}
        <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: T.lime }}>$</span>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: T.inkFaint, letterSpacing: "0.04em" }}>currently_available</span>
          <span style={{
            display: "inline-block", width: 7, height: 13,
            background: T.lime, verticalAlign: "text-bottom",
            opacity: tick ? 1 : 0, transition: "opacity 0.05s",
          }} />
        </div>
      </div>

      {/* Bottom-right: CTA */}
      <div className="hero-br" style={{
        position: "absolute",
        bottom: "clamp(36px,6vh,64px)",
        right: "clamp(20px,5vw,64px)",
        zIndex: 3,
        opacity: 0, animation: "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 1.1s forwards",
        display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12,
      }}>
        <a href="#projects" className="btn-lime" style={{
          fontSize: 15, padding: "15px 34px",
          boxShadow: "0 0 40px rgba(197,241,53,0.25)",
        }}>
          &#9654; View work
        </a>
        <a href="#contact" className="btn-ghost" style={{ fontSize: 13, padding: "10px 20px" }}>
          Get in touch
        </a>
      </div>
    </section>
  );
}

/* ─── ABOUT ──────────────────────────────────────────────── */
function About() {
  const ref = useRef(null);
  useReveal(ref);

  return (
    <section id="about" ref={ref} className="reveal" style={{
      padding: "120px clamp(20px,5vw,64px)",
      background: T.bgAlt,
      position: "relative", overflow: "hidden",
    }}>
      <div style={{ maxWidth: 1140, position: "relative", zIndex: 1 }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "64px 72px", alignItems: "center",
        }}>
          {/* Photo */}
          <div style={{ position: "relative" }}>
            <div style={{
              aspectRatio: "3/4", borderRadius: 20, overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.07)",
              position: "relative",
            }}>
              <img
                src="https://fxxjfkcjtuuxbrxhfrph.supabase.co/storage/v1/object/sign/MyCode/WhatsApp%20Image%202025-12-30%20at%208.02.51%20AM.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jYmMxZWFkMi01NzczLTQ1MzctODUwNS02ZTg3NjRkODAwNTUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeUNvZGUvV2hhdHNBcHAgSW1hZ2UgMjAyNS0xMi0zMCBhdCA4LjAyLjUxIEFNLmpwZWciLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzgxODc0MDMwLCJleHAiOjQ5MDM5MzgwMzB9.acL9r_ETaPM0iYQso6PMl0Nfsfx-Bu2wsfKzy7mpOcU"
                alt="Noval Hadi Purnomo"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              {/* Dark gradient at bottom */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: "35%",
                background: "linear-gradient(to top, rgba(9,9,15,0.7), transparent)",
              }} />
            </div>
            {/* Lime badge */}
            <div style={{
              position: "absolute", bottom: -18, right: -18,
              background: T.lime, borderRadius: 12, padding: "14px 20px",
              boxShadow: "0 8px 32px rgba(197,241,53,0.3)",
            }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 30, color: "#09090f", lineHeight: 1 }}>4+ yrs</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "rgba(9,9,15,0.55)", letterSpacing: "0.07em", marginTop: 3 }}>EXPERIENCE</div>
            </div>
          </div>

          {/* Text */}
          <div>
            <h2 style={{
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: "clamp(52px,6vw,84px)",
              lineHeight: 0.92, color: T.ink,
              marginBottom: 30, letterSpacing: "0.01em",
            }}>
              Engineer<br />by day.<br />
              <span style={{ color: T.lime }}>Game dev</span><br />by night.
            </h2>

            <p style={{ fontSize: 16, lineHeight: 1.78, color: T.inkMuted, maxWidth: "48ch", marginBottom: 18 }}>
              I'm Noval Hadi Purnomo, a software engineer based in Indonesia. I build web platforms, mobile apps, and interactive games from architecture through to deployment.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.78, color: T.inkMuted, maxWidth: "48ch", marginBottom: 44 }}>
              Game development is where creativity and systems thinking collide. I've shipped titles on itch.io and the Play Store, bringing that same craft to every product.
            </p>

            {/* Stats */}
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(3,1fr)",
              borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 28,
            }}>
              {[["4+","years building"],["20+","projects shipped"],["3","disciplines"]].map(([n, l]) => (
                <div key={l}>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 40, color: T.lime, lineHeight: 1, letterSpacing: "-0.01em" }}>{n}</div>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: T.inkMuted, letterSpacing: "0.07em", marginTop: 5 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── SKILLS ─────────────────────────────────────────────── */
const SKILL_GROUPS = [
  { cat: "Web", items: ["React","Next.js","TypeScript","Node.js","Go","PostgreSQL","Supabase","TailwindCSS","REST","GraphQL"] },
  { cat: "Mobile", items: ["React Native","Expo","Android","Kotlin","SQLite","Push Notifications","Offline-first"] },
  { cat: "Game Dev", items: ["Unity","C#","Godot 4","GDScript","Procedural Gen","Physics Systems","itch.io","Play Store"] },
  { cat: "Infra", items: ["Docker","Linux","Git","Vercel","Firebase","CI/CD","Nginx"] },
];

function Skills() {
  const ref = useRef(null);
  useReveal(ref);

  return (
    <section id="skills" ref={ref} className="reveal" style={{
      padding: "120px clamp(20px,5vw,64px)",
    }}>
      <div style={{ maxWidth: 1140 }}>
        <h2 style={{
          fontFamily: "'Bebas Neue',sans-serif",
          fontSize: "clamp(52px,6vw,84px)",
          lineHeight: 0.92, color: T.ink, marginBottom: 64,
        }}>Tech stack</h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "44px 48px" }}>
          {SKILL_GROUPS.map(({ cat, items }) => (
            <div key={cat}>
              <div style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: 11, letterSpacing: "0.1em",
                color: T.lime, marginBottom: 18,
              }}>{cat.toUpperCase()}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {items.map(s => <span key={s} className="skill-chip">{s}</span>)}
              </div>
            </div>
          ))}
        </div>

        {/* Discipline callouts */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
          gap: 24, marginTop: 72,
          borderTop: "1px solid rgba(255,255,255,0.06)",
          paddingTop: 52,
        }}>
          {[
            { t: "Web", b: "Full-stack React and Go. APIs that hold up under load." },
            { t: "Mobile", b: "React Native and native Android. Offline-first by default." },
            { t: "Games", b: "Unity and Godot. From mechanic prototype to published title." },
          ].map(({ t, b }) => (
            <div key={t}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 38, color: T.lime, lineHeight: 1, marginBottom: 10 }}>{t}</div>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: T.inkMuted }}>{b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── EXPERIENCE ─────────────────────────────────────────── */
const EXPERIENCE = [
  {
    period: "2023 - now",
    role: "Software Engineer",
    company: "Freelance",
    desc: "Building web platforms and mobile apps for clients across Southeast Asia. Full-stack delivery from architecture to production.",
    tags: ["React","React Native"],
  },
  {
    period: "2022 - 2023",
    role: "Website Freelancer",
    company: "Freelance",
    desc: "Designed and developed custom websites for local businesses and personal brands. Focused on clean UI and responsive design.",
    tags: ["React Native","JavaScript"],
  },
  {
    period: "2021 - 2022",
    role: "Game Server Engineer",
    company: "San Andreas Multiplayer (SAMP)",
    desc: "Maintained and optimized the open-source multiplayer mod for GTA San Andreas. Implemented new features and fixed critical bugs in C++ and Pawn.",
    tags: ["C++","Pawn"],
  },
  {
    period: "2019 - 2021",
    role: "Indie Game Developer",
    company: "Indie",
    desc: "Shipped two games on itch.io. Developed all aspects from design to coding to deployment.",
    tags: ["Unity","C#"],
  },
];

function Experience() {
  const ref = useRef(null);
  useReveal(ref);

  return (
    <section id="experience" ref={ref} className="reveal" style={{
      padding: "120px clamp(20px,5vw,64px)",
      background: T.bgAlt,
    }}>
      <div style={{ maxWidth: 1140 }}>
        <h2 style={{
          fontFamily: "'Bebas Neue',sans-serif",
          fontSize: "clamp(52px,6vw,84px)",
          lineHeight: 0.92, color: T.ink, marginBottom: 56,
        }}>Experience</h2>

        <div>
          {EXPERIENCE.map((e) => (
            <div key={e.role} className="exp-row">
              {/* Period + company */}
              <div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: T.inkMuted, letterSpacing: "0.04em", marginBottom: 6 }}>{e.period}</div>
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, color: T.inkFaint, fontWeight: 500 }}>{e.company}</div>
              </div>
              {/* Role + desc + tags */}
              <div>
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 19, fontWeight: 600, color: T.ink, marginBottom: 8, lineHeight: 1.3 }}>{e.role}</div>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: T.inkMuted, marginBottom: 14, maxWidth: "60ch" }}>{e.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {e.tags.map(tag => (
                    <span key={tag} style={{
                      fontFamily: "'JetBrains Mono',monospace",
                      fontSize: 10, letterSpacing: "0.06em",
                      color: T.lime, background: T.limeDim,
                      border: "1px solid rgba(197,241,53,0.18)",
                      padding: "3px 9px", borderRadius: 4,
                    }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── PROJECTS ───────────────────────────────────────────── */
const PROJECTS = [
  { title:"Xalbador Store", type:"Website App",   desc:"Online digital Shop with Payment Gateway. Integrated with Mayar Payment Gateway, allow qris and all method payment", tags:["React Native","Supabase","Express"], img:"https://fxxjfkcjtuuxbrxhfrph.supabase.co/storage/v1/object/sign/MyCode/Screenshot%20from%202026-05-07%2020-33-08.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jYmMxZWFkMi01NzczLTQ1MzctODUwNS02ZTg3NjRkODAwNTUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeUNvZGUvU2NyZWVuc2hvdCBmcm9tIDIwMjYtMDUtMDcgMjAtMzMtMDgucG5nIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4MTg3NzQyOCwiZXhwIjo0OTAzOTQxNDI4fQ.Zb0I02m4uNz-_GzOQHkvSHClc1CYkYIutnEu8svB_OE" },
  { title:"CashFlow System", type:"Website",         desc:"Digital CashFlow for tracking transaction with proof image expense.", tags:["Express","JavaScript","React Native"], img:"https://fxxjfkcjtuuxbrxhfrph.supabase.co/storage/v1/object/sign/MyCode/Screenshot%20from%202026-06-19%2020-52-49.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jYmMxZWFkMi01NzczLTQ1MzctODUwNS02ZTg3NjRkODAwNTUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeUNvZGUvU2NyZWVuc2hvdCBmcm9tIDIwMjYtMDYtMTkgMjAtNTItNDkucG5nIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4MTg3NzU4MywiZXhwIjo0OTAzOTQxNTgzfQ.-ZuaPyCFLensJXvlKpbuG8A6zZhjYRpfmD29zvpS0O0" },
  { title:"San Andreas System Server",type:"Game",          desc:"Server San Andreas Multiplayer, integrated with discord and mysql and using pawn script", tags:["PostgreSQL","C++","Pawn"], img:"https://fxxjfkcjtuuxbrxhfrph.supabase.co/storage/v1/object/sign/MyCode/Screenshot%20from%202026-06-19%2020-54-51.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jYmMxZWFkMi01NzczLTQ1MzctODUwNS02ZTg3NjRkODAwNTUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeUNvZGUvU2NyZWVuc2hvdCBmcm9tIDIwMjYtMDYtMTkgMjAtNTQtNTEucG5nIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4MTg3NzcyMywiZXhwIjo0OTAzOTQxNzIzfQ.EiNX_OfPdEKlYDx28stKKct2pP-R9gkXPVVKJWl1b0s" },
  { title:"Animas Chaos", type:"Native Game",  desc:"A Chaos game with anime cute character, can play multiplayer using mirror tools in unity", tags:["C#","Network","Unity"], img:"https://fxxjfkcjtuuxbrxhfrph.supabase.co/storage/v1/object/sign/MyCode/Screenshot%20from%202026-06-19%2020-56-50.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jYmMxZWFkMi01NzczLTQ1MzctODUwNS02ZTg3NjRkODAwNTUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeUNvZGUvU2NyZWVuc2hvdCBmcm9tIDIwMjYtMDYtMTkgMjAtNTYtNTAucG5nIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4MTg3Nzg2MCwiZXhwIjo0OTAzOTQxODYwfQ.c9I1q_vnPJgVAcIsfzBjW3GJ_GTZ_A1MffbvICBYhQA" },
];

function Projects() {
  const ref = useRef(null);
  useReveal(ref);

  return (
    <section id="projects" ref={ref} className="reveal" style={{
      padding: "120px clamp(20px,5vw,64px)",
    }}>
      <div style={{ maxWidth: 1140 }}>
        <h2 style={{
          fontFamily: "'Bebas Neue',sans-serif",
          fontSize: "clamp(52px,6vw,84px)",
          lineHeight: 0.92, color: T.ink, marginBottom: 56,
        }}>Selected work</h2>

        {/* Asymmetric bento: wide(2) + narrow(1) / narrow(1) + wide(2) */}
        <div className="projects-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 16,
        }}>
          <div style={{ gridColumn: "span 2" }} className="project-card"><PCard p={PROJECTS[0]} /></div>
          <div className="project-card"><PCard p={PROJECTS[1]} /></div>
          <div className="project-card"><PCard p={PROJECTS[2]} /></div>
          <div style={{ gridColumn: "span 2" }} className="project-card"><PCard p={PROJECTS[3]} /></div>
        </div>
      </div>
    </section>
  );
}

function PCard({ p }) {
  return (
    <>
      <div style={{ width:"100%", aspectRatio:"16/9", overflow:"hidden" }}>
        <img src={p.img} alt={p.title}
          style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform 0.55s ease" }}
          onMouseOver={e => e.currentTarget.style.transform="scale(1.05)"}
          onMouseOut={e  => e.currentTarget.style.transform="scale(1)"}
        />
      </div>
      <div style={{ padding:"18px 22px 24px" }}>
        <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, letterSpacing:"0.1em", color:T.lime, marginBottom:7 }}>{p.type.toUpperCase()}</div>
        <h3 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:19, fontWeight:600, color:T.ink, marginBottom:8, lineHeight:1.3 }}>{p.title}</h3>
        <p style={{ fontSize:13, color:T.inkMuted, lineHeight:1.68, marginBottom:14 }}>{p.desc}</p>
        <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
          {p.tags.map(t => (
            <span key={t} style={{
              fontFamily:"'JetBrains Mono',monospace", fontSize:10, letterSpacing:"0.05em",
              color:T.inkMuted, border:`1px solid ${T.border}`,
              padding:"3px 8px", borderRadius:4,
            }}>{t}</span>
          ))}
        </div>
      </div>
    </>
  );
}
/*====Certifiacate====*/
const CERTIFICATES = [
  {
    title: "MikroTik Certified Network Associate",
    year: "2026",
    desc: "Completed professional certification covering Subneting, routing, and network configuration.",
    img: "https://fxxjfkcjtuuxbrxhfrph.supabase.co/storage/v1/object/sign/MyCode/SERTIFF%20JINGGGGGGGGGGGGGGGGGGG_page-0001.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jYmMxZWFkMi01NzczLTQ1MzctODUwNS02ZTg3NjRkODAwNTUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeUNvZGUvU0VSVElGRiBKSU5HR0dHR0dHR0dHR0dHR0dHR0dHX3BhZ2UtMDAwMS5qcGciLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzgxODcxNTMzLCJleHAiOjQ5MDM5MzU1MzN9.lbukolARxJ1vIOaj4YRa-wRTmdf-cEVjN3fcoxSlOrM",
  },
  {
    title: "Hour Of Code - AI for Oceans",
    year: "2025",
    desc: "Completed Hour of Code program focused on AI applications in ocean conservation and marine life protection.",
    img: "https://fxxjfkcjtuuxbrxhfrph.supabase.co/storage/v1/object/sign/MyCode/WhatsApp%20Image%202026-06-19%20at%207.24.35%20PM.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jYmMxZWFkMi01NzczLTQ1MzctODUwNS02ZTg3NjRkODAwNTUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeUNvZGUvV2hhdHNBcHAgSW1hZ2UgMjAyNi0wNi0xOSBhdCA3LjI0LjM1IFBNLmpwZWciLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzgxODcyNjQzLCJleHAiOjQ5MDM5MzY2NDN9.keFYRcNaLqSRN91ihopl1RiLDI_OWfkuSaq4cBXDuNo",
  },
  {
    title: "Unity Certified Associate - Programmer C#",
    year: "2023",
    desc: "Certified in Unity engine fundamentals, gameplay systems, and optimization.",
    img: "https://fxxjfkcjtuuxbrxhfrph.supabase.co/storage/v1/object/sign/MyCode/certif.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jYmMxZWFkMi01NzczLTQ1MzctODUwNS02ZTg3NjRkODAwNTUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNeUNvZGUvY2VydGlmLnBuZyIsInNjb3BlIjoiZG93bmxvYWQiLCJpYXQiOjE3ODE4NzM1MTIsImV4cCI6NDkwMzkzNzUxMn0.Xmx4mxI9dWTgb6JPy089Rzy_6F6P7DWrM_cGD6QHVSE",
  },
];

function Certificates() {
  const ref = useRef(null);
  useReveal(ref);

  return (
    <section
      id="certificates"
      ref={ref}
      className="reveal"
      style={{
        padding: "120px clamp(20px,5vw,64px)",
        background: T.bg,
      }}
    >
      <div style={{ maxWidth: 1140, margin: "0 auto" }}>
        <h2
          style={{
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: "clamp(52px,6vw,84px)",
            lineHeight: 0.92,
            color: T.ink,
            marginBottom: 56,
          }}
        >
          Certificates
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 18,
          }}
        >
          {CERTIFICATES.map((c) => (
            <div key={c.title} className="project-card">
<div
  style={{
    width: "100%",
    height: 420,
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#111",
    padding: 12,
  }}
>
  <img
    src={c.img}
    alt={c.title}
    style={{
      maxWidth: "100%",
      maxHeight: "100%",
      width: "auto",
      height: "auto",
      objectFit: "contain",
    }}
  />
</div>

              <div style={{ padding: "18px 22px 24px" }}>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono',monospace",
                    fontSize: 10,
                    letterSpacing: "0.1em",
                    color: T.lime,
                    marginBottom: 7,
                  }}
                >
                  {c.year}
                </div>

                <h3
                  style={{
                    fontFamily: "'Space Grotesk',sans-serif",
                    fontSize: 18,
                    fontWeight: 600,
                    color: T.ink,
                    marginBottom: 8,
                  }}
                >
                  {c.title}
                </h3>

                <p
                  style={{
                    fontSize: 13,
                    color: T.inkMuted,
                    lineHeight: 1.6,
                  }}
                >
                  {c.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CONTACT ────────────────────────────────────────────── */
function Contact() {
  const ref = useRef(null);
  useReveal(ref);
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" ref={ref} className="reveal" style={{
      padding: "120px clamp(20px,5vw,64px) 80px",
      background: T.bgAlt, position: "relative", overflow: "hidden",
    }}>
      <div className="tech-grid" style={{ opacity: 0.6 }} />

      <div style={{ maxWidth: 1140, position: "relative", zIndex: 1 }}>
        {/* Massive outlined headline */}
        <h2 style={{
          fontFamily: "'Bebas Neue',sans-serif",
          fontSize: "clamp(56px,10vw,130px)",
          lineHeight: 0.88, color: T.ink,
          marginBottom: 72, letterSpacing: "-0.01em",
        }}>
          Let's build<br />
          <span style={{ WebkitTextStroke: `2px ${T.ink}`, color: "transparent" }}>
            something.
          </span>
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
          gap: "60px 80px",
        }}>
          {sent ? (
            <div style={{
              background: T.lime, borderRadius: 16,
              padding: "40px 36px", gridColumn: "1/-1", maxWidth: 480,
            }}>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:52, color:"#09090f", lineHeight:1, marginBottom:12 }}>Message sent.</div>
              <p style={{ fontSize:15, color:"rgba(9,9,15,0.6)", lineHeight:1.65 }}>I'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSent(true); }}
              style={{ display:"flex", flexDirection:"column", gap:18 }}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                <div>
                  <label className="field-label" htmlFor="cf-name">Name</label>
                  <input id="cf-name" className="contact-field" type="text" placeholder="Your name" required />
                </div>
                <div>
                  <label className="field-label" htmlFor="cf-email">Email</label>
                  <input id="cf-email" className="contact-field" type="email" placeholder="you@example.com" required />
                </div>
              </div>
              <div>
                <label className="field-label" htmlFor="cf-msg">Message</label>
                <textarea id="cf-msg" className="contact-field"
                  placeholder="Tell me about your project..."
                  rows={5} required style={{ resize:"vertical", minHeight:130 }} />
              </div>
              <div><button type="submit" className="btn-lime">Send message &rarr;</button></div>
            </form>
          )}

          {/* Right: links */}
          <div style={{ paddingTop: 4 }}>
            <div style={{ marginBottom: 36 }}>
              <div className="field-label" style={{ marginBottom: 9 }}>Email</div>
              <a href="mailto:novalgamedev1@gmail.com"
                style={{ fontSize:17, color:T.ink, textDecoration:"none", fontWeight:500, borderBottom:`1px solid ${T.border}`, paddingBottom:3, transition:"border-color 0.2s" }}
                onMouseOver={e => e.currentTarget.style.borderColor = T.lime}
                onMouseOut={e  => e.currentTarget.style.borderColor = T.border}
              >novalgamedev1@gmail.com</a>
            </div>
            <div>
              <div className="field-label" style={{ marginBottom: 16 }}>Elsewhere</div>
              {[["GitHub","https://github.com/kazutodevs"],["LinkedIn","https://www.linkedin.com/in/noval-hadi-purnomo-921552377/"],["itch.io","https://itch.io/profile/kazutodev"]].map(([label,href]) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  style={{ display:"flex", alignItems:"center", gap:10, fontSize:15, color:T.inkMuted, textDecoration:"none", marginBottom:12, transition:"color 0.2s" }}
                  onMouseOver={e => e.currentTarget.style.color = T.ink}
                  onMouseOut={e  => e.currentTarget.style.color = T.inkMuted}
                >
                  <span style={{ width:20, height:1, background:T.inkFaint, display:"inline-block", flexShrink:0 }} />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── FOOTER ─────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{
      padding: "32px clamp(20px,5vw,64px)",
      borderTop: "1px solid rgba(255,255,255,0.06)",
      display: "flex", alignItems: "center",
      justifyContent: "space-between", flexWrap: "wrap", gap: 12,
    }}>
      <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:20, letterSpacing:"0.05em", color:T.ink }}>
        KAZUTO<span style={{ color:T.lime }}>.</span>DEV
      </span>
      <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:T.inkFaint, letterSpacing:"0.06em" }}>
        Noval Hadi Purnomo - Indonesia
      </span>
    </footer>
  );
}

/* ─── REVEAL HOOK ────────────────────────────────────────── */
function useReveal(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("in"); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
}

/* ─── APP ────────────────────────────────────────────────── */
export default function App() {
  return (
    <>
      <GlobalStyle />
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certificates />
        <Contact />
      </main>
      <Footer />
    </>
  );
}