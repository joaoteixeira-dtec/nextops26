import { useRef, useEffect, useState } from "react";

/* ── Color palette (r,g,b strings) ── */
const PALETTE = [
  "99,102,241",   // indigo
  "34,211,238",   // cyan
  "167,139,250",  // violet
  "52,211,153",   // emerald
  "232,121,249",  // fuchsia
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  baseAlpha: number;
  phase: number;
}

/* ── Canvas2D interactive particle network ── */
export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const particles = useRef<Particle[]>([]);
  const raf = useRef(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!mq.matches && window.innerWidth >= 768) setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      const el = canvas!.parentElement!;
      const w = el.clientWidth;
      const h = el.clientHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return { w, h };
    }

    function seed() {
      const { w, h } = resize();
      const n = Math.min(Math.floor((w * h) / 12000), 140);
      particles.current = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: 1 + Math.random() * 2,
        color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
        alpha: 0,
        baseAlpha: 0.1 + Math.random() * 0.3,
        phase: Math.random() * Math.PI * 2,
      }));
    }

    seed();

    const onResize = () => seed();
    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    const onLeave = () => {
      mouse.current.x = -9999;
      mouse.current.y = -9999;
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);

    const CONNECT = 140;
    const MOUSE_R = 220;
    let t = 0;

    function frame() {
      t += 0.008;
      const el = canvas!.parentElement!;
      const w = el.clientWidth;
      const h = el.clientHeight;
      ctx.clearRect(0, 0, w, h);

      const pts = particles.current;
      const m = mouse.current;

      /* ── Update ── */
      for (const p of pts) {
        const pulse = Math.sin(t * 3 + p.phase) * 0.08;
        const dx = m.x - p.x;
        const dy = m.y - p.y;
        const dist = Math.hypot(dx, dy);

        if (dist < MOUSE_R && dist > 0) {
          const strength = 1 - dist / MOUSE_R;
          p.vx += (dx / dist) * strength * 0.015;
          p.vy += (dy / dist) * strength * 0.015;
          p.alpha += (p.baseAlpha + strength * 0.6 - p.alpha) * 0.06;
        } else {
          p.alpha += (p.baseAlpha + pulse - p.alpha) * 0.02;
        }

        p.vx *= 0.988;
        p.vy *= 0.988;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -30) p.x += w + 60;
        else if (p.x > w + 30) p.x -= w + 60;
        if (p.y < -30) p.y += h + 60;
        else if (p.y > h + 30) p.y -= h + 60;
      }

      /* ── Connection lines ── */
      ctx.lineCap = "round";
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
          if (d >= CONNECT) continue;

          let opacity = (1 - d / CONNECT) * 0.1;
          let lw = 0.4;

          const mx = (pts[i].x + pts[j].x) / 2;
          const my = (pts[i].y + pts[j].y) / 2;
          const md = Math.hypot(m.x - mx, m.y - my);
          if (md < MOUSE_R) {
            const boost = 1 - md / MOUSE_R;
            opacity += boost * 0.3;
            lw += boost * 1.5;
          }

          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = `rgba(99,102,241,${opacity})`;
          ctx.lineWidth = lw;
          ctx.stroke();
        }
      }

      /* ── Particles with glow halos ── */
      for (const p of pts) {
        if (p.radius > 1.3) {
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 6);
          g.addColorStop(0, `rgba(${p.color},${p.alpha * 0.25})`);
          g.addColorStop(1, `rgba(${p.color},0)`);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 6, 0, Math.PI * 2);
          ctx.fillStyle = g;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
        ctx.fill();
      }

      /* ── Cursor glow ring ── */
      if (m.x > 0 && m.y > 0) {
        const g = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, MOUSE_R);
        g.addColorStop(0, "rgba(99,102,241,0.045)");
        g.addColorStop(0.4, "rgba(34,211,238,0.02)");
        g.addColorStop(1, "rgba(99,102,241,0)");
        ctx.beginPath();
        ctx.arc(m.x, m.y, MOUSE_R, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      }

      raf.current = requestAnimationFrame(frame);
    }

    raf.current = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none" }}
    />
  );
}
