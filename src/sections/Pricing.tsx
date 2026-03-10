import { Check, Rocket, Shield, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Reveal } from "../components/Reveal";
import { Section } from "../components/Section";
import { MobileCarousel } from "../components/MobileCarousel";
import type { LucideIcon } from "lucide-react";

interface Plan {
  icon: LucideIcon;
  title: string;
  price: string;
  desc: string;
  bullets: string[];
  cta: string;
  highlight?: boolean;
  color: string;
  bg: string;
  glow: string;
  border: string;
  dot: string;
  gradient: string;
}

const plans: Plan[] = [
  {
    icon: Zap,
    title: "Diagnóstico",
    price: "Gratuito",
    desc: "Analisamos o teu negócio e mostramos por onde começar.",
    bullets: [
      "Mapa de ganhos rápidos",
      "3 gargalos + 3 automações",
      "Proposta de sprint personalizada",
      "Sem compromisso",
    ],
    cta: "Pedir diagnóstico",
    highlight: true,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    glow: "rgba(34,211,238,0.08)",
    border: "border-cyan-400/20",
    dot: "bg-cyan-400",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    icon: Rocket,
    title: "Implementação",
    price: "2–4 semanas",
    desc: "A plataforma à medida, pronta a usar pela equipa.",
    bullets: [
      "App ou ERP personalizado",
      "Módulos que o negócio precisa",
      "Permissões e dashboards",
      "Formação incluída",
    ],
    cta: "Saber mais",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    glow: "rgba(167,139,250,0.08)",
    border: "hover:border-violet-500/20",
    dot: "bg-violet-400",
    gradient: "from-violet-500 to-fuchsia-500",
  },
  {
    icon: Shield,
    title: "Evolução contínua",
    price: "Sprints mensais",
    desc: "Novas funcionalidades, IA e suporte dedicado.",
    bullets: [
      "Automação com IA integrada",
      "Novos módulos por sprint",
      "Suporte prioritário",
      "Sem contratos longos",
    ],
    cta: "Falar connosco",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    glow: "rgba(52,211,153,0.08)",
    border: "hover:border-emerald-500/20",
    dot: "bg-emerald-400",
    gradient: "from-emerald-500 to-teal-500",
  },
];

function scrollToForm(e: React.MouseEvent) {
  e.preventDefault();
  document.getElementById("form")?.scrollIntoView({ behavior: "smooth" });
}

function PlanCard({ p }: { p: Plan }) {
  return (
    <div
      className={[
        "group relative flex h-full flex-col rounded-2xl border p-6 transition-all duration-500",
        p.highlight
          ? `${p.border} bg-gradient-to-b from-cyan-500/[0.06] to-transparent`
          : `border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] ${p.border}`,
      ].join(" ")}
    >
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: p.glow }}
      />
      {p.highlight && (
        <div className={`absolute -top-3 right-4 rounded-full bg-gradient-to-r ${p.gradient} px-3 py-0.5 text-[11px] font-semibold text-white`}>
          Comece por aqui
        </div>
      )}
      <div className={`inline-flex w-fit rounded-xl ${p.bg} p-3 ring-1 ring-white/[0.06] transition-all duration-300 group-hover:scale-110 group-hover:ring-white/[0.1]`}>
        <p.icon size={18} className={p.color} />
      </div>
      <div className="mt-4 text-sm font-medium text-white/60">{p.title}</div>
      <div className="mt-1 text-2xl font-bold tracking-tight">{p.price}</div>
      <p className="mt-2 text-[13px] text-white/40 transition-colors duration-300 group-hover:text-white/55">{p.desc}</p>
      <div className="my-5 h-px w-full bg-white/[0.06]" />
      <ul className="grid gap-2.5 text-[13px] text-white/50">
        {p.bullets.map((b) => (
          <li key={b} className="flex items-start gap-2.5 transition-colors duration-300 group-hover:text-white/65">
            <Check size={14} className={`mt-[2px] shrink-0 ${p.color} opacity-50`} />
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-6">
        <a
          href="#form"
          onClick={scrollToForm}
          className={[
            "inline-flex h-11 w-full items-center justify-center rounded-xl text-sm font-semibold transition-all duration-300 active:scale-[0.97]",
            p.highlight
              ? `bg-gradient-to-r ${p.gradient} text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 hover:brightness-110`
              : "border border-white/[0.08] bg-white/[0.04] text-white hover:bg-white/[0.08]",
          ].join(" ")}
        >
          {p.cta}
        </a>
      </div>
    </div>
  );
}

export function Pricing() {
  return (
    <Section
      id="oferta"
      eyebrow="Oferta"
      title="Começa simples. Evolui rápido."
      subtitle="A porta de entrada é o diagnóstico. Implementamos por sprints, sem surpresas."
    >
      {/* Desktop grid */}
      <div className="hidden sm:grid gap-5 pt-4 lg:grid-cols-3">
        {plans.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.07} variant="blur-up">
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="h-full"
            >
              <PlanCard p={p} />
            </motion.div>
          </Reveal>
        ))}
      </div>

      {/* Mobile carousel */}
      <MobileCarousel className="sm:hidden" cardWidth={280} gap={12}>
        {plans.map((p) => (
          <PlanCard key={p.title} p={p} />
        ))}
      </MobileCarousel>

      <p className="mt-6 text-[11px] text-white/30">
        *Prazos variam conforme complexidade. A proposta final é definida no diagnóstico.
      </p>
    </Section>
  );
}
