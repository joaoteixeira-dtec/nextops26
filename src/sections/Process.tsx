import { ArrowRight, CheckCircle2, Rocket, Search, Sparkles } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { Section } from "../components/Section";
import { MobileCarousel } from "../components/MobileCarousel";
import type { LucideIcon } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Diagnóstico",
    meta: "1 semana",
    num: "01",
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
    glow: "rgba(99,102,241,0.12)",
    dot: "bg-indigo-400",
    line: "from-indigo-400/40",
    points: ["Análise do fluxo atual", "Identificação de gargalos", "Proposta de solução concreta"],
  },
  {
    icon: Rocket,
    title: "Construção",
    meta: "2–6 semanas",
    num: "02",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    glow: "rgba(34,211,238,0.12)",
    dot: "bg-cyan-400",
    line: "from-cyan-400/40",
    points: ["Desenvolvimento por sprints", "Entregas semanais funcionais", "Feedback contínuo"],
  },
  {
    icon: Sparkles,
    title: "Automação & IA",
    meta: "1–2 semanas",
    num: "03",
    color: "text-fuchsia-400",
    bg: "bg-fuchsia-500/10",
    glow: "rgba(232,121,249,0.12)",
    dot: "bg-fuchsia-400",
    line: "from-fuchsia-400/40",
    points: ["Integração de IA no fluxo", "Automações inteligentes", "Otimização de processos"],
  },
  {
    icon: CheckCircle2,
    title: "Evolução",
    meta: "contínuo",
    num: "04",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    glow: "rgba(52,211,153,0.12)",
    dot: "bg-emerald-400",
    line: "from-emerald-400/40",
    points: ["Melhorias baseadas em dados", "Novas funcionalidades", "Suporte dedicado"],
  },
];

interface Step {
  icon: LucideIcon;
  title: string;
  meta: string;
  num: string;
  color: string;
  bg: string;
  glow: string;
  dot: string;
  line: string;
  points: string[];
}

function StepCard({ s }: { s: Step }) {
  return (
    <div className="group relative h-full">
      <div className="relative mb-4 flex items-center">
        <div className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${s.bg} ring-2 ring-ink-950 transition-transform duration-300 group-hover:scale-110`}>
          <span className={`text-xs font-bold ${s.color}`}>{s.num}</span>
        </div>
        <div className={`hidden h-[2px] flex-1 bg-gradient-to-r ${s.line} to-transparent lg:block`} />
      </div>
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 transition-all duration-500 hover:bg-white/[0.05] hover:border-white/[0.1]">
        <div
          className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: s.glow }}
        />
        <div className="relative">
          <div className="flex items-center justify-between gap-3">
            <div className={`rounded-xl ${s.bg} p-2.5 ring-1 ring-white/[0.06] transition-all duration-300 group-hover:scale-110 group-hover:ring-white/[0.1]`}>
              <s.icon size={18} className={s.color} />
            </div>
            <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-white/40">
              {s.meta}
            </span>
          </div>
          <h3 className="mt-4 text-[15px] font-semibold">{s.title}</h3>
          <ul className="mt-3 grid gap-2 text-[13px] text-white/45">
            {s.points.map((p) => (
              <li key={p} className="flex items-start gap-2.5 transition-colors duration-300 group-hover:text-white/60">
                <span className={`mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full ${s.dot} opacity-50`} />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function Process() {
  return (
    <Section
      id="processo"
      eyebrow="Como trabalhamos"
      title="Sprints rápidos. Resultados reais."
      subtitle="Resultados rápidos, risco baixo, evolução constante."
    >
      {/* Desktop timeline */}
      <div className="relative hidden sm:block">
        <div className="grid gap-4 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1} variant="blur-up">
              <StepCard s={s} />
            </Reveal>
          ))}
        </div>
      </div>

      {/* Mobile carousel */}
      <MobileCarousel className="sm:hidden" cardWidth={260} gap={12}>
        {steps.map((s) => (
          <StepCard key={s.title} s={s} />
        ))}
      </MobileCarousel>

      {/* CTA bar */}
      <Reveal delay={0.4} variant="fade">
        <div className="mt-12 overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-r from-indigo-500/[0.06] via-white/[0.02] to-cyan-500/[0.04]">
          <div className="relative p-6">
            <div className="pointer-events-none absolute -top-16 left-1/2 h-32 w-64 -translate-x-1/2 rounded-full bg-indigo-500/[0.08] blur-3xl" />
            <div className="relative grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="text-sm font-semibold">Começa pelo diagnóstico gratuito</div>
                <p className="mt-1.5 text-[13px] text-white/45">
                  Analisamos o teu caso, identificamos oportunidades e propomos uma solução com prazo e investimento.
                </p>
              </div>
              <a
                href="#form"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("form")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-semibold text-ink-950 transition-all duration-300 hover:bg-white/90 hover:shadow-glow-sm active:scale-[0.98]"
              >
                Pedir Diagnóstico
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
