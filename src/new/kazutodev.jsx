import { useEffect, useRef, useState } from "react";

/* ─── TOKENS ─────────────────────────────────────────────── */
const T = {
  bg:        "#f0f0eb",
  bgAlt:     "#e8e8e2",
  ink:       "#0d0d0d",
  inkMuted:  "#6b6b6b",
  inkFaint:  "#b0b0a8",
  lime:      "#c5f135",
  limeDark:  "#9dc41a",
  white:     "#fafafa",
  border:    "rgba(13,13,13,0.1)",
};

/* ─── GLOBAL STYLES ──────────────────────────────────────── */
function GlobalStyle() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Grotesk:wght@300;400;500;600&family=JetBrains+Mono:wght@300;400&display=swap');

      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body {
        background: #f0f0eb;
        color: #0d0d0d;
        font-family: 'Space Grotesk', sans-serif;
        -webkit-font-smoothing: antialiased;
        overflow-x: hidden;
      }
      ::selection { background: #c5f135; color: #0d0d0d; }
      ::-webkit-scrollbar { width: 3px; }
      ::-webkit-scrollbar-track { background: #f0f0eb; }
      ::-webkit-scrollbar-thumb { background: #c5f135; }
      :focus-visible { outline: 2px solid #c5f135; outline-offset: 3px; }

      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(24px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes fadeIn {
        from { opacity: 0; } to { opacity: 1; }
      }

      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          transition-duration: 0.01ms !important;
        }
      }

      .nav-pill-link {
        font-family: 'Space Grotesk', sans-serif;
        font-size: 14px; font-weight: 400;
        color: #6b6b6b;
        text-decoration: none;
        padding: 6px 14px;
        border-radius: 99px;
        transition: background 0.2s, color 0.2s;
      }
      .nav-pill-link:hover { background: rgba(13,13,13,0.07); color: #0d0d0d; }

      .section-reveal {
        opacity: 0; transform: translateY(36px);
        transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1);
      }
      .section-reveal.visible { opacity: 1; transform: translateY(0); }

      .project-card {
        background: #fafafa;
        border: 1px solid rgba(13,13,13,0.1);
        border-radius: 16px;
        overflow: hidden;
        transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s;
        cursor: pointer;
      }
      .project-card:hover {
        transform: translateY(-6px);
        box-shadow: 0 20px 60px rgba(13,13,13,0.1);
      }
      .project-card:active { transform: translateY(-2px) scale(0.99); }

      .skill-chip {
        font-family: 'JetBrains Mono', monospace;
        font-size: 12px; letter-spacing: 0.04em;
        color: #0d0d0d;
        background: transparent;
        border: 1px solid rgba(13,13,13,0.15);
        padding: 8px 14px;
        border-radius: 99px;
        transition: background 0.2s, border-color 0.2s;
        white-space: nowrap;
        cursor: default;
      }
      .skill-chip:hover { background: #c5f135; border-color: #c5f135; }

      .btn-lime {
        display: inline-flex; align-items: center; gap: 8px;
        font-family: 'Space Grotesk', sans-serif;
        font-size: 14px; font-weight: 600;
        color: #0d0d0d;
        background: #c5f135;
        border: none; border-radius: 99px;
        padding: 14px 28px;
        cursor: pointer; text-decoration: none;
        transition: background 0.2s, transform 0.15s;
      }
      .btn-lime:hover { background: #9dc41a; transform: translateY(-1px); }
      .btn-lime:active { transform: scale(0.97); }

      .contact-field {
        width: 100%;
        background: #fafafa;
        border: 1px solid rgba(13,13,13,0.1);
        border-radius: 10px;
        color: #0d0d0d;
        font-family: 'Space Grotesk', sans-serif;
        font-size: 15px;
        padding: 14px 18px;
        outline: none;
        transition: border-color 0.2s;
      }
      .contact-field::placeholder { color: #b0b0a8; }
      .contact-field:focus { border-color: #c5f135; }

      .field-label {
        display: block;
        font-family: 'JetBrains Mono', monospace;
        font-size: 11px; letter-spacing: 0.09em;
        color: #6b6b6b; text-transform: uppercase;
        margin-bottom: 7px;
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
    let frameId;
    let cleanup;

    import("https://esm.sh/three@0.165.0").then((THREE) => {
      const W = el.clientWidth;
      const H = el.clientHeight;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(W, H);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      el.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
      camera.position.set(0, 0, 5);

      scene.add(new THREE.AmbientLight(0xffffff, 0.5));

      const dir = new THREE.DirectionalLight(0xffffff, 3);
      dir.position.set(4, 5, 5);
      scene.add(dir);

      const limeLight = new THREE.PointLight(0xc5f135, 4, 12);
      limeLight.position.set(-3, -2, 3);
      scene.add(limeLight);

      const topL = new THREE.PointLight(0xffffff, 2, 8);
      topL.position.set(0, 6, 2);
      scene.add(topL);

      const rimL = new THREE.DirectionalLight(0xb8f000, 2);
      rimL.position.set(-5, 0, -3);
      scene.add(rimL);

      // Blob
      const geo = new THREE.SphereGeometry(1.5, 128, 128);
      const originalPos = new Float32Array(geo.attributes.position.array);

      const pmrem = new THREE.PMREMGenerator(renderer);
      const envTex = pmrem.fromScene(new THREE.RoomEnvironment(), 0.04).texture;
      scene.environment = envTex;
      pmrem.dispose();

      const mat = new THREE.MeshStandardMaterial({
        color: 0xc8d4b0,
        metalness: 0.98,
        roughness: 0.04,
        envMap: envTex,
        envMapIntensity: 1.2,
      });

      const blob = new THREE.Mesh(geo, mat);
      scene.add(blob);

      // Main orbital ring - lime
      const rGeo = new THREE.TorusGeometry(2.1, 0.022, 8, 140);
      const rMat = new THREE.MeshStandardMaterial({ color: 0xc5f135, metalness: 0.3, roughness: 0.5 });
      const ring = new THREE.Mesh(rGeo, rMat);
      ring.rotation.x = Math.PI / 2.6;
      scene.add(ring);

      // Secondary ring - chrome
      const r2Geo = new THREE.TorusGeometry(2.55, 0.009, 6, 100);
      const r2Mat = new THREE.MeshStandardMaterial({ color: 0xaaaaaa, metalness: 0.9, roughness: 0.1, transparent: true, opacity: 0.45 });
      const ring2 = new THREE.Mesh(r2Geo, r2Mat);
      ring2.rotation.x = Math.PI / 3.8;
      ring2.rotation.z = Math.PI / 5;
      scene.add(ring2);

      let t = 0;
      const animate = () => {
        frameId = requestAnimationFrame(animate);
        t += 0.007;

        const pos = geo.attributes.position;
        for (let i = 0; i < pos.count; i++) {
          const ox = originalPos[i * 3];
          const oy = originalPos[i * 3 + 1];
          const oz = originalPos[i * 3 + 2];
          const len = Math.sqrt(ox*ox + oy*oy + oz*oz);
          const freq = 1.7;
          const amp = 0.26;
          const n =
            Math.sin(ox*freq + t*1.0) * Math.cos(oy*freq + t*0.7) * amp +
            Math.sin(oz*freq*1.4 + t*0.85) * Math.cos(ox*freq*0.9 + t*1.3) * amp * 0.55 +
            Math.cos(oy*freq*1.6 + t*0.55) * Math.sin(oz*freq + t*1.1) * amp * 0.38;
          const s = (1 + n) / len;
          pos.setXYZ(i, ox*s, oy*s, oz*s);
        }
        pos.needsUpdate = true;
        geo.computeVertexNormals();

        blob.rotation.y += 0.004;
        blob.rotation.x += 0.0008;
        ring.rotation.z += 0.005;
        ring2.rotation.z -= 0.003;

        renderer.render(scene, camera);
      };
      animate();

      const onResize = () => {
        const nW = el.clientWidth;
        const nH = el.clientHeight;
        camera.aspect = nW / nH;
        camera.updateProjectionMatrix();
        renderer.setSize(nW, nH);
      };
      window.addEventListener("resize", onResize);

      cleanup = () => {
        cancelAnimationFrame(frameId);
        window.removeEventListener("resize", onResize);
        renderer.dispose();
        geo.dispose(); mat.dispose();
        rGeo.dispose(); rMat.dispose();
        r2Geo.dispose(); r2Mat.dispose();
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
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      height: 64, display: "flex", alignItems: "center",
      padding: "0 clamp(20px, 5vw, 60px)", justifyContent: "space-between",
      background: scrolled ? "rgba(240,240,235,0.88)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(13,13,13,0.08)" : "1px solid transparent",
      transition: "background 0.4s, border-color 0.4s",
    }}>
      <div style={{
        display: "flex", alignItems: "center",
        background: "rgba(13,13,13,0.05)",
        borderRadius: 99, padding: "4px 6px", gap: 2,
      }}>
        {["About", "Projects", "Skills", "Contact"].map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} className="nav-pill-link">{l}</a>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer"
          style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, color: "#6b6b6b", textDecoration: "none", transition: "color 0.2s" }}
          onMouseOver={e => e.currentTarget.style.color = "#0d0d0d"}
          onMouseOut={e => e.currentTarget.style.color = "#6b6b6b"}
        >GitHub</a>
        <a href="#contact" className="btn-lime" style={{ fontSize: 13, padding: "10px 20px" }}>
          Hire me &rarr;
        </a>
      </div>
    </nav>
  );
}

/* ─── HERO ───────────────────────────────────────────────── */
function Hero() {
  return (
    <section style={{
      minHeight: "100dvh", position: "relative", overflow: "hidden",
    }}>
      {/* BIG TYPE - z:1, behind blob */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1,
        display: "flex", alignItems: "center", justifyContent: "center",
        pointerEvents: "none", userSelect: "none",
      }}>
        <h1 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(88px, 17vw, 210px)",
          fontWeight: 400, lineHeight: 0.9,
          color: "#0d0d0d", textAlign: "center",
          opacity: 0,
          animation: "fadeIn 1s cubic-bezier(0.16,1,0.3,1) 0.2s forwards",
          whiteSpace: "nowrap",
        }}>KAZUTO.</h1>
      </div>

      {/* 3D blob - z:2 */}
      <Blob3D />

      {/* Top-right: feature tags - z:3 */}
      <div style={{
        position: "absolute", top: "clamp(80px, 11vh, 110px)",
        right: "clamp(20px, 5vw, 60px)", zIndex: 3, textAlign: "right",
        opacity: 0, animation: "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.9s forwards",
      }}>
        {[["Web-based", "/01"], ["Cross-platform", "/02"], ["Game-ready", "/03"]].map(([label, num]) => (
          <div key={num} style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 10, marginBottom: 9 }}>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: "#6b6b6b" }}>{label}</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#b0b0a8", letterSpacing: "0.06em" }}>{num}</span>
          </div>
        ))}
      </div>

      {/* Bottom-left: avatar + count - z:3 */}
      <div style={{
        position: "absolute", bottom: "clamp(100px, 14vh, 140px)",
        left: "clamp(20px, 5vw, 60px)", zIndex: 3,
        display: "flex", alignItems: "center", gap: 12,
        opacity: 0, animation: "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 1.0s forwards",
      }}>
        <div style={{ display: "flex" }}>
          {["kz-a1", "kz-a2", "kz-a3"].map((s, i) => (
            <img key={s} src={`https://picsum.photos/seed/${s}/40/40`} alt="collaborator"
              style={{ width: 32, height: 32, borderRadius: "50%", border: "2px solid #f0f0eb", marginLeft: i > 0 ? -10 : 0, objectFit: "cover" }}
            />
          ))}
        </div>
        <div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 600, lineHeight: 1 }}>20+</div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#6b6b6b", letterSpacing: "0.07em", marginTop: 3 }}>projects shipped</div>
        </div>
      </div>

      {/* Bottom-left: descriptor copy */}
      <div style={{
        position: "absolute", bottom: "clamp(36px, 5vh, 56px)",
        left: "clamp(20px, 5vw, 60px)", zIndex: 3,
        opacity: 0, animation: "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 1.05s forwards",
      }}>
        <p style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "clamp(13px, 1.5vw, 16px)", lineHeight: 1.55,
          color: "#6b6b6b", maxWidth: "34ch",
        }}>
          Software engineer and game developer.<br />Building web, mobile, and interactive games.
        </p>
        <div style={{ marginTop: 14, borderTop: "1px dotted #b0b0a8", width: 160 }} />
      </div>

      {/* Bottom-right: CTA */}
      <div style={{
        position: "absolute", bottom: "clamp(36px, 5vh, 56px)",
        right: "clamp(20px, 5vw, 60px)", zIndex: 3,
        opacity: 0, animation: "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 1.1s forwards",
      }}>
        <a href="#projects" className="btn-lime" style={{
          fontSize: 15, padding: "16px 34px",
          boxShadow: "0 8px 32px rgba(197,241,53,0.4)",
        }}>
          &#9654; View work
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
    <section id="about" ref={ref} className="section-reveal" style={{ padding: "120px clamp(20px, 5vw, 60px)", background: "#e8e8e2" }}>
      <div style={{ maxWidth: 1100, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "60px 80px", alignItems: "center" }}>
        <div style={{ position: "relative" }}>
          <div style={{ aspectRatio: "3/4", borderRadius: 20, overflow: "hidden", border: "1px solid rgba(13,13,13,0.1)" }}>
            <img src="https://picsum.photos/seed/kazuto-noval-portrait/560/745" alt="Noval Hadi Purnomo"
              style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ position: "absolute", bottom: -16, right: -16, background: "#c5f135", borderRadius: 12, padding: "14px 20px" }}>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: "#0d0d0d", lineHeight: 1 }}>4+ yrs</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "rgba(13,13,13,0.6)", letterSpacing: "0.06em", marginTop: 3 }}>EXPERIENCE</div>
          </div>
        </div>
        <div>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(52px, 6vw, 80px)", lineHeight: 0.95, color: "#0d0d0d", marginBottom: 28 }}>
            Engineer<br />by day.<br />Game dev<br />by night.
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.75, color: "#6b6b6b", maxWidth: "48ch", marginBottom: 18 }}>
            I'm Noval Hadi Purnomo, a software engineer based in Indonesia. I build web platforms, mobile apps, and interactive games from architecture through to deployment.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.75, color: "#6b6b6b", maxWidth: "48ch", marginBottom: 40 }}>
            Game development is where creativity and systems thinking collide. I've shipped titles on itch.io and the Play Store, and I bring that same level of craft to every product I work on.
          </p>
          <a href="#contact" className="btn-lime">Start a project</a>
        </div>
      </div>
    </section>
  );
}

/* ─── PROJECTS ───────────────────────────────────────────── */
const PROJECTS = [
  { title: "FieldMap Mobile", type: "Mobile App", desc: "Offline-first field data collection. Real-time sync on reconnect. Cross-platform.", tags: ["React Native", "Supabase", "SQLite"], img: "https://picsum.photos/seed/kazuto-fieldmap/800/480", span: 2 },
  { title: "Dungeon Fragment", type: "Game", desc: "Procedural dungeon crawler in Unity. 2.3k downloads on itch.io.", tags: ["Unity", "C#", "Procedural Gen"], img: "https://picsum.photos/seed/kazuto-dungeon/480/480", span: 1 },
  { title: "Nusantara Runner", type: "Game", desc: "Endless runner set in Indonesian folklore. Android and web.", tags: ["Godot 4", "GDScript", "Firebase"], img: "https://picsum.photos/seed/kazuto-nusantara/480/400", span: 1 },
  { title: "Infratrack", type: "Web Platform", desc: "Infrastructure monitoring for small DevOps teams. Real-time alerts and log aggregation.", tags: ["Next.js", "Go", "PostgreSQL"], img: "https://picsum.photos/seed/kazuto-infratrack/800/400", span: 2 },
];

function Projects() {
  const ref = useRef(null);
  useReveal(ref);
  return (
    <section id="projects" ref={ref} className="section-reveal" style={{ padding: "120px clamp(20px, 5vw, 60px)" }}>
      <div style={{ maxWidth: 1100 }}>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(52px, 6vw, 80px)", lineHeight: 0.95, color: "#0d0d0d", marginBottom: 56 }}>Selected work</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
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
      <div style={{ width: "100%", aspectRatio: "16/9", overflow: "hidden" }}>
        <img src={p.img} alt={p.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
          onMouseOver={e => e.currentTarget.style.transform = "scale(1.04)"}
          onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
        />
      </div>
      <div style={{ padding: "18px 22px 22px" }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.1em", color: "#6b6b6b", marginBottom: 7 }}>{p.type.toUpperCase()}</div>
        <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 19, fontWeight: 600, color: "#0d0d0d", marginBottom: 7, lineHeight: 1.3 }}>{p.title}</h3>
        <p style={{ fontSize: 13, color: "#6b6b6b", lineHeight: 1.65, marginBottom: 12 }}>{p.desc}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {p.tags.map(t => <span key={t} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#6b6b6b", border: "1px solid rgba(13,13,13,0.12)", padding: "3px 8px", borderRadius: 4 }}>{t}</span>)}
        </div>
      </div>
    </>
  );
}

/* ─── SKILLS ─────────────────────────────────────────────── */
const SKILLS = ["React","Next.js","TypeScript","Node.js","Go","React Native","Expo","Android","SQLite","Unity","C#","Godot 4","GDScript","Procedural Gen","PostgreSQL","Supabase","Firebase","Docker","Linux","Figma","Git","Vercel"];

function Skills() {
  const ref = useRef(null);
  useReveal(ref);
  return (
    <section id="skills" ref={ref} className="section-reveal" style={{ padding: "120px clamp(20px, 5vw, 60px)", background: "#e8e8e2" }}>
      <div style={{ maxWidth: 1100 }}>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(52px, 6vw, 80px)", lineHeight: 0.95, color: "#0d0d0d", marginBottom: 48 }}>Tech stack</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {SKILLS.map(s => <span key={s} className="skill-chip">{s}</span>)}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24, marginTop: 64, borderTop: "1px solid rgba(13,13,13,0.1)", paddingTop: 48 }}>
          {[
            { title: "Web", body: "Full-stack React and Go. APIs that hold up under load." },
            { title: "Mobile", body: "React Native and native Android. Offline-first architecture." },
            { title: "Games", body: "Unity and Godot. From concept to published title." },
          ].map(({ title, body }) => (
            <div key={title}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, color: "#c5f135", lineHeight: 1, marginBottom: 8 }}>{title}</div>
              <p style={{ fontSize: 14, lineHeight: 1.65, color: "#6b6b6b" }}>{body}</p>
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
    <section id="contact" ref={ref} className="section-reveal" style={{ padding: "120px clamp(20px, 5vw, 60px) 80px" }}>
      <div style={{ maxWidth: 1100 }}>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(52px, 9vw, 120px)", lineHeight: 0.9, color: "#0d0d0d", marginBottom: 64, letterSpacing: "-0.01em" }}>
          Let's build<br />
          <span style={{ WebkitTextStroke: "2px #0d0d0d", color: "transparent" }}>something.</span>
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "60px 80px" }}>
          {sent ? (
            <div style={{ background: "#c5f135", borderRadius: 16, padding: "40px 36px", gridColumn: "1 / -1", maxWidth: 480 }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 48, color: "#0d0d0d", lineHeight: 1, marginBottom: 12 }}>Message sent.</div>
              <p style={{ fontSize: 15, color: "rgba(13,13,13,0.6)", lineHeight: 1.6 }}>I'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSent(true); }} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
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
                <textarea id="cf-msg" className="contact-field" placeholder="Tell me about your project..." rows={5} required style={{ resize: "vertical", minHeight: 130 }} />
              </div>
              <div><button type="submit" className="btn-lime">Send message &rarr;</button></div>
            </form>
          )}
          <div style={{ paddingTop: 4 }}>
            <div style={{ marginBottom: 32 }}>
              <div className="field-label" style={{ marginBottom: 8 }}>Email</div>
              <a href="mailto:noval@kazuto.dev" style={{ fontSize: 17, color: "#0d0d0d", textDecoration: "none", fontWeight: 500, borderBottom: "1px solid rgba(13,13,13,0.15)", paddingBottom: 3, transition: "border-color 0.2s" }}
                onMouseOver={e => e.currentTarget.style.borderColor = "#c5f135"}
                onMouseOut={e => e.currentTarget.style.borderColor = "rgba(13,13,13,0.15)"}
              >noval@kazuto.dev</a>
            </div>
            <div>
              <div className="field-label" style={{ marginBottom: 14 }}>Elsewhere</div>
              {[["GitHub","https://github.com"],["LinkedIn","https://linkedin.com"],["itch.io","https://itch.io"]].map(([label,href]) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 15, color: "#6b6b6b", textDecoration: "none", marginBottom: 10, transition: "color 0.2s" }}
                  onMouseOver={e => e.currentTarget.style.color = "#0d0d0d"}
                  onMouseOut={e => e.currentTarget.style.color = "#6b6b6b"}
                >
                  <span style={{ width: 20, height: 1, background: "#b0b0a8", display: "inline-block" }} />
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
    <footer style={{ padding: "32px clamp(20px, 5vw, 60px)", borderTop: "1px solid rgba(13,13,13,0.1)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
      <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, letterSpacing: "0.04em", color: "#0d0d0d" }}>KAZUTO.DEV</span>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#b0b0a8", letterSpacing: "0.06em" }}>Noval Hadi Purnomo - Indonesia</span>
    </footer>
  );
}

/* ─── REVEAL HOOK ────────────────────────────────────────── */
function useReveal(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
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
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}