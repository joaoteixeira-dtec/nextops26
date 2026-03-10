import { motion } from "framer-motion";
import { Reveal } from "../components/Reveal";
import { Section } from "../components/Section";
import { MobileCarousel } from "../components/MobileCarousel";

interface Testimonial {
  quote: string;
  role: string;
  sector: string;
  color: string;
  bg: string;
  glow: string;
  border: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "Passámos de 'ninguém sabe o estado' para visibilidade total. O tempo em confirmações caiu a pique.",
    role: "Direção Operacional",
    sector: "Serviços",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    glow: "rgba(59,130,246,0.10)",
    border: "hover:border-blue-500/20",
  },
  {
    quote: "A leitura automática de documentos e triagem por IA pouparam horas por semana. Game changer.",
    role: "Gestão",
    sector: "Distribuição",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    glow: "rgba(52,211,153,0.10)",
    border: "hover:border-emerald-500/20",
  },
  {
    quote: "Os clientes marcam sozinhos, recebemos lembretes e o dia já está organizado antes de chegarmos.",
    role: "Gerente",
    sector: "Cabeleireiro",
    color: "text-fuchsia-400",
    bg: "bg-fuchsia-500/10",
    glow: "rgba(232,121,249,0.10)",
    border: "hover:border-fuchsia-500/20",
  },
  {
    quote: "O modelo por sprints foi decisivo. Entregas rápidas, sem surpresas, prioridades claras.",
    role: "Administração",
    sector: "Backoffice",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    glow: "rgba(167,139,250,0.10)",
    border: "hover:border-violet-500/20",
  },
  {
    quote: "Reservas online e ementa digital num só sítio. Os clientes adoram e nós poupamos tempo ao telefone.",
    role: "Proprietário",
    sector: "Restauração",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    glow: "rgba(251,191,36,0.10)",
    border: "hover:border-amber-500/20",
  },
  {
    quote: "Checklists, estados e alertas automáticos. Toda a equipa no terreno sabe o que fazer sem ligar.",
    role: "Coordenador",
    sector: "Frotas",
    color: "text-sky-400",
    bg: "bg-sky-500/10",
    glow: "rgba(56,189,248,0.10)",
    border: "hover:border-sky-500/20",
  },
];

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div
      className={`group relative h-full overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-500 hover:bg-white/[0.05] ${t.border}`}
    >
      <div
        className="pointer-events-none absolute -left-12 -top-12 h-28 w-28 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: t.glow }}
      />
      <div className="relative flex items-center justify-between">
        <span className={`text-3xl font-serif leading-none ${t.color} opacity-30 select-none`}>
          &ldquo;
        </span>
        <span className={`rounded-full ${t.bg} px-2.5 py-0.5 text-[11px] font-medium ${t.color}`}>
          {t.sector}
        </span>
      </div>
      <p className="relative mt-3 text-sm leading-relaxed text-white/55 transition-colors duration-300 group-hover:text-white/75">
        {t.quote}
      </p>
      <div className="mt-5 flex items-center gap-3">
        <div className={`h-px w-6 ${t.bg.replace('/10', '/30')} transition-all duration-300 group-hover:w-10`} />
        <span className="text-[13px] font-semibold text-white/70">{t.role}</span>
      </div>
    </div>
  );
}

export function Testimonials() {
  return (
    <Section
      id="resultados"
      eyebrow="Resultados"
      title="Impacto real, sem conversa"
      subtitle="O que as equipas sentem depois de centralizar e automatizar."
    >
      {/* Desktop grid */}
      <div className="hidden sm:grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal key={t.sector} delay={i * 0.06} variant="blur-up">
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="h-full"
            >
              <TestimonialCard t={t} />
            </motion.div>
          </Reveal>
        ))}
      </div>

      {/* Mobile carousel */}
      <MobileCarousel className="sm:hidden" cardWidth={290} gap={12}>
        {testimonials.map((t) => (
          <TestimonialCard key={t.sector} t={t} />
        ))}
      </MobileCarousel>
    </Section>
  );
}
