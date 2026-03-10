import { Building2, Car, PackageSearch, Scissors, UtensilsCrossed, Wrench } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { Section } from "../components/Section";
import { TiltCard } from "../components/TiltCard";
import { MobileCarousel } from "../components/MobileCarousel";
import type { LucideIcon } from "lucide-react";

interface UseCase {
  icon: LucideIcon;
  title: string;
  desc: string;
  bullets: string[];
  color: string;
  bg: string;
  glow: string;
  border: string;
  dot: string;
}

const cases: UseCase[] = [
  {
    icon: PackageSearch,
    title: "Distribuição & Logística",
    desc: "Controlo total da cadeia de entrega.",
    bullets: ["Gestão de encomendas e stock", "Rotas otimizadas", "Alertas de rutura automáticos"],
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    glow: "rgba(59,130,246,0.12)",
    border: "hover:border-blue-500/20",
    dot: "bg-blue-400",
  },
  {
    icon: UtensilsCrossed,
    title: "Restaurantes & Cafés",
    desc: "Reservas, ementas e operação integrada.",
    bullets: ["Reservas online automáticas", "Ementa digital para clientes", "Gestão de mesas e pedidos"],
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    glow: "rgba(251,191,36,0.12)",
    border: "hover:border-amber-500/20",
    dot: "bg-amber-400",
  },
  {
    icon: Scissors,
    title: "Cabeleireiros & Clínicas",
    desc: "Agendamentos e ficha de cliente digital.",
    bullets: ["Marcações online 24/7", "Histórico e preferências", "Lembretes automáticos"],
    color: "text-fuchsia-400",
    bg: "bg-fuchsia-500/10",
    glow: "rgba(232,121,249,0.12)",
    border: "hover:border-fuchsia-500/20",
    dot: "bg-fuchsia-400",
  },
  {
    icon: Wrench,
    title: "Oficinas & Serviços",
    desc: "Orçamentos, tarefas e reporting automático.",
    bullets: ["Pipeline de trabalhos", "Histórico por cliente e viatura", "Relatórios de produtividade"],
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    glow: "rgba(52,211,153,0.12)",
    border: "hover:border-emerald-500/20",
    dot: "bg-emerald-400",
  },
  {
    icon: Car,
    title: "Frotas & Terreno",
    desc: "Visibilidade total das operações externas.",
    bullets: ["Checklists digitais", "Registo de danos e documentos", "Alertas e estados em tempo real"],
    color: "text-sky-400",
    bg: "bg-sky-500/10",
    glow: "rgba(56,189,248,0.12)",
    border: "hover:border-sky-500/20",
    dot: "bg-sky-400",
  },
  {
    icon: Building2,
    title: "Backoffice & Gestão",
    desc: "Processos internos sem papel nem confusão.",
    bullets: ["Aprovações e workflows", "Menos erros manuais", "Dashboards com KPIs reais"],
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    glow: "rgba(167,139,250,0.12)",
    border: "hover:border-violet-500/20",
    dot: "bg-violet-400",
  },
];

function CaseCard({ c }: { c: UseCase }) {
  return (
    <div
      className={`group relative h-full overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] transition-all duration-500 hover:bg-white/[0.05] ${c.border}`}
    >
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: c.glow }}
      />
      <div className="relative p-6">
        <div className={`mb-4 inline-flex rounded-xl ${c.bg} p-3 ring-1 ring-white/[0.06] transition-all duration-300 group-hover:scale-110 group-hover:ring-white/[0.1]`}>
          <c.icon size={20} className={c.color} />
        </div>
        <h3 className="text-[15px] font-semibold">{c.title}</h3>
        <p className="mt-1.5 text-[13px] text-white/40">{c.desc}</p>
        <ul className="mt-4 grid gap-2 text-[13px] text-white/50">
          {c.bullets.map((b) => (
            <li key={b} className="flex items-start gap-2.5 transition-colors duration-300 group-hover:text-white/65">
              <span className={`mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full ${c.dot} opacity-50`} />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function UseCases() {
  return (
    <Section
      id="casos"
      eyebrow="Para quem é"
      title="Soluções para cada tipo de negócio"
      subtitle="De empresas com operações complexas a negócios locais que querem digitalizar, criamos a ferramenta certa."
    >
      {/* Desktop grid */}
      <div className="hidden sm:grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cases.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.07} variant="blur-up">
            <TiltCard className="h-full">
              <CaseCard c={c} />
            </TiltCard>
          </Reveal>
        ))}
      </div>

      {/* Mobile carousel */}
      <MobileCarousel className="sm:hidden" cardWidth={280} gap={12}>
        {cases.map((c) => (
          <CaseCard key={c.title} c={c} />
        ))}
      </MobileCarousel>
    </Section>
  );
}
