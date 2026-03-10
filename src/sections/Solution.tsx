import { Bot, Briefcase, LayoutDashboard, Smartphone, Zap, Brain, Headphones } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { Section } from "../components/Section";
import { TiltCard } from "../components/TiltCard";
import { MobileCarousel } from "../components/MobileCarousel";

const items = [
  {
    icon: LayoutDashboard,
    title: "ERP sob medida",
    desc: "Sistemas de gestão modulares adaptados ao fluxo real do teu negócio.",
    color: "indigo" as const,
    glow: "rgba(99,102,241,0.15)",
    accent: "from-indigo-400/60",
  },
  {
    icon: Bot,
    title: "IA aplicada",
    desc: "Automação inteligente com Gemini, triagens, resumos e relatórios.",
    color: "cyan" as const,
    glow: "rgba(34,211,238,0.15)",
    accent: "from-cyan-400/60",
  },
  {
    icon: Smartphone,
    title: "Apps para negócios locais",
    desc: "Reservas, agendamentos, ementas e catálogos digitais, tudo acessível a clientes e equipas, em qualquer dispositivo.",
    color: "emerald" as const,
    glow: "rgba(52,211,153,0.15)",
    accent: "from-emerald-400/60",
  },
  {
    icon: Briefcase,
    title: "Soluções à medida",
    desc: "Cada negócio é único. Desenhamos e construímos exatamente o que precisas.",
    color: "violet" as const,
    glow: "rgba(167,139,250,0.15)",
    accent: "from-violet-400/60",
  },
];

const colorMap: Record<string, { icon: string; border: string; bg: string; text: string }> = {
  indigo: { icon: "text-indigo-400", border: "group-hover:border-indigo-500/20", bg: "bg-indigo-500/10", text: "text-indigo-300/70" },
  cyan: { icon: "text-cyan-400", border: "group-hover:border-cyan-500/20", bg: "bg-cyan-500/10", text: "text-cyan-300/70" },
  emerald: { icon: "text-emerald-400", border: "group-hover:border-emerald-500/20", bg: "bg-emerald-500/10", text: "text-emerald-300/70" },
  violet: { icon: "text-violet-400", border: "group-hover:border-violet-500/20", bg: "bg-violet-500/10", text: "text-violet-300/70" },
};

const highlights = [
  { icon: Zap, title: "Entrega por sprints", desc: "Resultados semanais. O negócio não para.", color: "text-indigo-400" },
  { icon: Brain, title: "IA com propósito", desc: "Automatizar o repetitivo, organizar dados.", color: "text-cyan-400" },
  { icon: Headphones, title: "Suporte real", desc: "Acompanhamento contínuo pós-implementação.", color: "text-emerald-400" },
];

function SolutionCard({ it }: { it: typeof items[number] }) {
  const c = colorMap[it.color];
  return (
    <div
      className={`group relative h-full overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] transition-all duration-500 hover:bg-white/[0.05] ${c.border}`}
    >
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: it.glow }}
      />
      <div className="relative h-full p-6 sm:p-7">
        <div className={`mb-5 inline-flex rounded-2xl ${c.bg} p-3.5 ring-1 ring-white/[0.06] transition-all duration-300 group-hover:scale-110 group-hover:ring-white/[0.1]`}>
          <it.icon size={22} className={c.icon} />
        </div>
        <h3 className="text-base font-semibold tracking-tight">{it.title}</h3>
        <p className="mt-2.5 text-sm leading-relaxed text-white/50 transition-colors duration-300 group-hover:text-white/65">
          {it.desc}
        </p>
        <div className={`mt-5 h-[2px] w-0 rounded-full bg-gradient-to-r ${it.accent} to-transparent transition-all duration-500 group-hover:w-12`} />
      </div>
    </div>
  );
}

export function Solution() {
  return (
    <Section
      id="solucao"
      eyebrow="O que fazemos"
      title="Software que resolve problemas reais"
      subtitle="De ERPs empresariais a apps para negócios locais, construímos soluções digitais que fazem a diferença."
    >
      {/* Desktop grid */}
      <div className="hidden sm:grid gap-4 sm:grid-cols-2">
        {items.map((it, idx) => (
          <Reveal key={it.title} delay={idx * 0.08} variant="blur-up">
            <TiltCard className="h-full">
              <SolutionCard it={it} />
            </TiltCard>
          </Reveal>
        ))}
      </div>

      {/* Mobile carousel */}
      <MobileCarousel className="sm:hidden" cardWidth={280} gap={12}>
        {items.map((it) => (
          <SolutionCard key={it.title} it={it} />
        ))}
      </MobileCarousel>

      {/* Highlights bar */}
      <Reveal delay={0.3} variant="fade">
        <div className="mt-12 grid gap-1 overflow-hidden rounded-2xl border border-white/[0.06] sm:grid-cols-3">
          {highlights.map((h, i) => (
            <div
              key={h.title}
              className={`group relative flex items-start gap-4 p-6 transition-colors duration-300 hover:bg-white/[0.03] ${
                i < highlights.length - 1 ? "sm:border-r sm:border-white/[0.06]" : ""
              }`}
            >
              <div className="shrink-0 rounded-xl bg-white/[0.04] p-2.5 ring-1 ring-white/[0.06] transition-all duration-300 group-hover:bg-white/[0.07]">
                <h.icon size={16} className={`${h.color} transition-transform duration-300 group-hover:scale-110`} />
              </div>
              <div>
                <div className="text-sm font-semibold">{h.title}</div>
                <p className="mt-1 text-[13px] leading-relaxed text-white/40 transition-colors duration-300 group-hover:text-white/55">
                  {h.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
