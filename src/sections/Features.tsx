import {
  Boxes,
  ClipboardList,
  FileBarChart2,
  FolderKanban,
  GitBranch,
  MessagesSquare,
  Route,
  UsersRound,
  Wand2,
} from "lucide-react";
import { Reveal } from "../components/Reveal";
import { Section } from "../components/Section";
import { MobileCarousel } from "../components/MobileCarousel";
import type { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  desc: string;
  color: string;
  bg: string;
  glow: string;
  border: string;
}

/* Top 3 — larger, highlighted */
const hero: Feature[] = [
  {
    icon: FolderKanban,
    title: "Pipeline & tarefas",
    desc: "Gerir projetos, definir prioridades e acompanhar o estado em tempo real.",
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
    glow: "rgba(99,102,241,0.12)",
    border: "hover:border-indigo-500/20",
  },
  {
    icon: Wand2,
    title: "IA Gemini",
    desc: "Resumos automáticos, extração de dados e sugestões inteligentes integradas no fluxo.",
    color: "text-fuchsia-400",
    bg: "bg-fuchsia-500/10",
    glow: "rgba(232,121,249,0.12)",
    border: "hover:border-fuchsia-500/20",
  },
  {
    icon: FileBarChart2,
    title: "Dashboards",
    desc: "KPIs personalizados para tomares decisões com base em dados reais.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    glow: "rgba(34,211,238,0.12)",
    border: "hover:border-cyan-500/20",
  },
];

/* Grid — supporting modules */
const grid: Feature[] = [
  {
    icon: Boxes,
    title: "Produtos & stock",
    desc: "Controlo de inventário, ruturas e reposição automática.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    glow: "rgba(52,211,153,0.1)",
    border: "hover:border-emerald-500/20",
  },
  {
    icon: ClipboardList,
    title: "Encomendas",
    desc: "Ciclo completo do pedido à entrega com automações.",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    glow: "rgba(251,191,36,0.1)",
    border: "hover:border-amber-500/20",
  },
  {
    icon: UsersRound,
    title: "Clientes & equipas",
    desc: "Perfis, permissões e rastreio de ações.",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    glow: "rgba(167,139,250,0.1)",
    border: "hover:border-violet-500/20",
  },
  {
    icon: Route,
    title: "Rotas & operações",
    desc: "Planeamento e confirmação no terreno.",
    color: "text-sky-400",
    bg: "bg-sky-500/10",
    glow: "rgba(56,189,248,0.1)",
    border: "hover:border-sky-500/20",
  },
  {
    icon: MessagesSquare,
    title: "Suporte & tickets",
    desc: "Triagem assistida por IA com priorização automática.",
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    glow: "rgba(251,113,133,0.1)",
    border: "hover:border-rose-500/20",
  },
  {
    icon: GitBranch,
    title: "Integrações",
    desc: "APIs, webhooks, email e CRMs ligados ao teu fluxo.",
    color: "text-teal-400",
    bg: "bg-teal-500/10",
    glow: "rgba(45,212,191,0.1)",
    border: "hover:border-teal-500/20",
  },
];

function FeatureCard({ f, large = false }: { f: Feature; large?: boolean }) {
  return (
    <div
      className={`group relative h-full overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] transition-all duration-500 hover:bg-white/[0.05] ${f.border}`}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
      }}
    >
      {/* Spotlight glow follows cursor */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(500px circle at var(--mx, 50%) var(--my, 50%), ${f.glow}, transparent 40%)` }}
      />

      {/* Corner glow */}
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: f.glow }}
      />

      <div className={`relative ${large ? "p-7" : "p-5"}`}>
        {/* Icon */}
        <div className={`${large ? "mb-5" : "mb-4"} inline-flex rounded-xl ${f.bg} ${large ? "p-3.5" : "p-2.5"} ring-1 ring-white/[0.06] transition-all duration-300 group-hover:scale-110 group-hover:ring-white/[0.1]`}>
          <f.icon size={large ? 22 : 16} className={`${f.color} transition-transform duration-300`} />
        </div>

        {/* Title */}
        <h3 className={`${large ? "text-base" : "text-sm"} font-semibold tracking-tight`}>{f.title}</h3>

        {/* Desc */}
        <p className={`${large ? "mt-2.5" : "mt-2"} text-[13px] leading-relaxed text-white/45 transition-colors duration-300 group-hover:text-white/60`}>
          {f.desc}
        </p>
      </div>
    </div>
  );
}

export function Features() {
  const allModules = [...hero, ...grid];

  return (
    <Section
      id="features"
      eyebrow="Módulos"
      title="Módulos que encaixam no teu processo"
      subtitle="Escolhe o core e evoluímos por sprints. Simplicidade operacional e visibilidade total."
    >
      {/* Desktop: hero row + grid */}
      <div className="hidden sm:block">
        <div className="grid gap-4 lg:grid-cols-3">
          {hero.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08} variant="blur-up">
              <FeatureCard f={f} large />
            </Reveal>
          ))}
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {grid.map((f, i) => (
            <Reveal key={f.title} delay={0.2 + i * 0.05} variant="blur-up">
              <FeatureCard f={f} />
            </Reveal>
          ))}
        </div>
      </div>

      {/* Mobile carousel — all modules in one swipeable row */}
      <MobileCarousel className="sm:hidden" cardWidth={260} gap={12}>
        {allModules.map((f) => (
          <FeatureCard key={f.title} f={f} />
        ))}
      </MobileCarousel>
    </Section>
  );
}
