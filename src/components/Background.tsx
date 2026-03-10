import { motion, useScroll, useTransform } from "framer-motion";
import { lazy, Suspense, useEffect, useRef } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

const ParticleField = lazy(() =>
  import("./ParticleField").then((m) => ({ default: m.ParticleField }))
);

/* ── Floating glassmorphic shapes config ── */
const SHAPES = [
  { top: "12%", left: "8%", w: 80, r: "16px", dur: 38, dir: 1, clr: "99,102,241" },
  { top: "55%", left: "auto", right: "6%", w: 100, r: "22px", dur: 48, dir: -1, clr: "34,211,238" },
  { top: "32%", left: "auto", right: "18%", w: 56, r: "12px", dur: 32, dir: 1, clr: "232,121,249" },
  { top: "72%", left: "16%", w: 64, r: "14px", dur: 42, dir: -1, clr: "52,211,153" },
  { top: "22%", left: "auto", right: "32%", w: 44, r: "10px", dur: 55, dir: 1, clr: "167,139,250" },
];

/* ── Shooting star positions ── */
const STARS = [
  { top: "6%", left: "15%", delay: 0, dur: 12 },
  { top: "18%", left: "55%", delay: 4, dur: 15 },
  { top: "10%", left: "75%", delay: 8, dur: 18 },
  { top: "25%", left: "35%", delay: 12, dur: 14 },
  { top: "3%", left: "90%", delay: 6, dur: 16 },
];

export function Background() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["0%", "25%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["0%", "-18%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["0%", "12%"]);
  const rot = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, 25]);

  /* ── Mouse-following gradient blob ── */
  const blobRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (reduced || window.innerWidth < 768) return;
    target.current = { x: window.innerWidth / 2, y: window.innerHeight / 3 };
    current.current = { ...target.current };

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    let id: number;
    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * 0.03;
      current.current.y += (target.current.y - current.current.y) * 0.03;
      if (blobRef.current) {
        blobRef.current.style.transform = `translate(${current.current.x - 350}px, ${current.current.y + window.scrollY - 350}px)`;
      }
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(id);
    };
  }, [reduced]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Noise texture */}
      <div className="noise" />

      {/* Animated grid */}
      <div className="grid-overlay" />

      {/* Interactive particle network (desktop, lazy) */}
      <div className="absolute inset-x-0 top-0 h-screen">
        <Suspense fallback={null}>
          <ParticleField />
        </Suspense>
      </div>

      {/* Mouse-following gradient blob */}
      <div
        ref={blobRef}
        className="hidden md:block absolute top-0 left-0 w-[700px] h-[700px] rounded-full will-change-transform"
        style={{
          background:
            "radial-gradient(circle at 40% 40%, rgba(99,102,241,0.35) 0%, rgba(34,211,238,0.18) 35%, rgba(232,121,249,0.08) 65%, transparent 100%)",
          filter: "blur(90px)",
        }}
      />

      {/* Floating glassmorphic shapes */}
      {!reduced &&
        SHAPES.map((s, i) => (
          <motion.div
            key={i}
            className="absolute hidden md:block"
            style={{
              top: s.top,
              left: s.left,
              right: (s as Record<string, unknown>).right as string | undefined,
              width: s.w,
              height: s.w,
              borderRadius: s.r,
              border: `1px solid rgba(${s.clr},0.06)`,
              backdropFilter: "blur(4px)",
            }}
            animate={{ rotate: [0, 360 * s.dir], y: [0, -15, 0] }}
            transition={{
              rotate: { duration: s.dur, repeat: Infinity, ease: "linear" },
              y: { duration: s.dur / 5, repeat: Infinity, ease: "easeInOut" },
            }}
          />
        ))}

      {/* Shooting stars */}
      {!reduced &&
        STARS.map((s, i) => (
          <div
            key={`star-${i}`}
            className="shooting-star hidden md:block"
            style={{
              top: s.top,
              left: s.left,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.dur}s`,
            }}
          />
        ))}

      {/* Aurora gradient orbs */}
      <motion.div
        style={{ y: y1, rotate: rot }}
        className="glow-orb -top-40 left-1/2 h-[700px] w-[700px] -translate-x-1/2 bg-gradient-to-br from-indigo-500/30 via-cyan-400/20 to-fuchsia-400/10"
      />
      <motion.div
        style={{ y: y2 }}
        className="glow-orb -bottom-44 left-[5%] h-[500px] w-[500px] bg-gradient-to-br from-emerald-400/20 via-indigo-500/[0.14] to-transparent"
      />
      <motion.div
        style={{ y: y3 }}
        className="glow-orb -bottom-52 right-[2%] h-[600px] w-[600px] bg-gradient-to-br from-fuchsia-400/[0.14] via-violet-500/[0.12] to-transparent"
      />
      <motion.div
        style={{ y: y2 }}
        className="glow-orb top-[38%] right-[12%] h-[400px] w-[400px] bg-gradient-to-br from-violet-500/[0.12] via-cyan-400/[0.08] to-transparent"
      />
      <motion.div
        style={{ y: y1 }}
        className="glow-orb top-[65%] left-[25%] h-[350px] w-[350px] bg-gradient-to-br from-cyan-400/10 via-indigo-500/[0.08] to-transparent"
      />

      {/* Aurora wave */}
      <div className="aurora-wave" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950/80 via-ink-950/60 to-ink-950" />
    </div>
  );
}
