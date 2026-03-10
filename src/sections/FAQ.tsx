import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Reveal } from "../components/Reveal";
import { Section } from "../components/Section";

const faqs = [
  {
    q: "Isto é software de prateleira?",
    a: "Não. Cada solução é construída à medida do teu negócio. Partimos de uma base modular para ganhar velocidade e adaptamos tudo: campos, regras, permissões, relatórios.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    glow: "rgba(34,211,238,0.06)",
  },
  {
    q: "A IA vai inventar coisas?",
    a: "Não. A IA é aplicada com regras claras: extrair dados, resumir, classificar e sugerir. Toda a lógica crítica é validada, sem surpresas.",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    glow: "rgba(167,139,250,0.06)",
  },
  {
    q: "Quanto tempo demora até ter algo a funcionar?",
    a: "Depende da complexidade. Normalmente: 1 semana de diagnóstico + 2–4 semanas para a plataforma core. Trabalhamos por sprints com entregas visíveis a cada semana.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    glow: "rgba(52,211,153,0.06)",
  },
  {
    q: "Funciona para negócios pequenos?",
    a: "Sim. Restaurantes, cabeleireiros, oficinas, clínicas. Criamos apps simples com reservas, agendamentos, ementas digitais ou gestão de clientes, acessíveis em qualquer dispositivo.",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    glow: "rgba(251,191,36,0.06)",
  },
  {
    q: "Integram com ferramentas que já uso?",
    a: "Sim. Email, CRMs, pagamentos, APIs existentes. No diagnóstico identificamos o que integrar primeiro para ter impacto rápido.",
    color: "text-fuchsia-400",
    bg: "bg-fuchsia-500/10",
    border: "border-fuchsia-500/20",
    glow: "rgba(232,121,249,0.06)",
  },
  {
    q: "E depois do lançamento, tenho suporte?",
    a: "Sempre. Oferecemos sprints de evolução contínua, suporte dedicado e novas funcionalidades. Sem contratos longos, cancelas quando quiseres.",
    color: "text-sky-400",
    bg: "bg-sky-500/10",
    border: "border-sky-500/20",
    glow: "rgba(56,189,248,0.06)",
  },
];

export function FAQ() {
  return (
    <Section
      id="faq"
      eyebrow="FAQ"
      title="Perguntas frequentes"
      subtitle="Dúvida que não está aqui? Pede o diagnóstico e respondemos."
    >
      <div className="mx-auto max-w-3xl grid gap-3">
        {faqs.map((f, i) => (
          <Reveal key={f.q} delay={i * 0.04} variant="blur-up">
            <AccordionItem {...f} index={i} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function AccordionItem({
  q,
  a,
  index,
  color,
  bg,
  border,
  glow,
}: {
  q: string;
  a: string;
  index: number;
  color: string;
  bg: string;
  border: string;
  glow: string;
}) {
  const [open, setOpen] = useState(false);
  const num = String(index + 1).padStart(2, "0");

  return (
    <div
      className={`group relative overflow-hidden rounded-xl border transition-all duration-300 ${
        open ? `${border} bg-white/[0.03]` : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.1]"
      }`}
    >
      {/* Glow when open */}
      {open && (
        <div
          className="pointer-events-none absolute -left-10 -top-10 h-24 w-24 rounded-full blur-3xl"
          style={{ background: glow }}
        />
      )}

      <button
        className="relative flex w-full items-center gap-4 px-5 py-4 text-left"
        onClick={() => setOpen((v) => !v)}
      >
        {/* Number */}
        <span
          className={`shrink-0 text-[12px] font-bold transition-colors duration-300 ${
            open ? color : "text-white/20"
          }`}
        >
          {num}
        </span>

        <span className="flex-1 text-sm font-semibold">{q}</span>

        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        >
          <ChevronDown
            size={16}
            className={`transition-colors duration-300 ${open ? color : "text-white/40"}`}
          />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="flex gap-4 px-5 pb-4">
              {/* Accent line */}
              <div className={`ml-[3px] w-0.5 shrink-0 rounded-full ${bg}`} />
              <p className="text-[13px] leading-relaxed text-white/55">{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
