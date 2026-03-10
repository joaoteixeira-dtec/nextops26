import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useRef } from "react";
import { Container } from "./Container";
import { useReducedMotion } from "../hooks/useReducedMotion";

/* ── Word-by-word text reveal ── */
function AnimatedWords({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: delay + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block mr-[0.3em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export function Hero() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.7], reduced ? [1, 1] : [1, 0.96]);

  return (
    <div ref={ref} className="relative flex min-h-[100svh] items-center justify-center">
      <Container>
        <motion.div style={{ opacity, scale }} className="flex flex-col items-center text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-white/70 backdrop-blur-sm">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              Software sob medida · IA aplicada
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="max-w-4xl text-balance text-[2.5rem] font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            <AnimatedWords text="Tecnologia que" delay={0.15} />
            <br />
            <motion.span
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-fuchsia-400 bg-clip-text text-transparent"
            >
              move o teu negócio.
            </motion.span>
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-white/55 sm:text-lg lg:text-xl"
          >
            Soluções digitais à medida, de ERP a apps para negócios locais.
            <br className="hidden sm:block" />
            Desenhamos, construímos e entregamos por sprints.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85 }}
            className="mt-10"
          >
            <a
              href="#form"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("form")?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="group inline-flex h-13 items-center gap-2.5 rounded-2xl bg-white px-8 text-[15px] font-semibold text-ink-950 shadow-soft transition-all duration-300 hover:bg-white/90 hover:shadow-glow-sm active:scale-[0.98]"
            >
              Falar connosco
              <ArrowDown size={16} className="transition-transform group-hover:translate-y-0.5" />
            </a>
          </motion.div>

          {/* Trusted industries */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-white/30"
          >
            {["ERP", "Restaurantes", "Cabeleireiros", "Oficinas", "Clínicas", "Serviços"].map((s) => (
              <span key={s}>{s}</span>
            ))}
          </motion.div>
        </motion.div>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-white/20"
        >
          <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
          <div className="h-8 w-[1px] bg-gradient-to-b from-white/20 to-transparent" />
        </motion.div>
      </motion.div>
    </div>
  );
}
