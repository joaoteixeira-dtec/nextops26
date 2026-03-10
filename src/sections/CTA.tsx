import { Clock, HeartHandshake, IterationCcw, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "../components/Container";
import { LeadForm } from "../components/LeadForm";

const perks = [
  {
    icon: Clock,
    t: "Resposta em 48h",
    d: "Análise rápida do teu caso",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
  {
    icon: HeartHandshake,
    t: "Sem compromisso",
    d: "Proposta clara e transparente",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    icon: IterationCcw,
    t: "Implementação por sprints",
    d: "Entregas iterativas e rápidas",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },
  {
    icon: Rocket,
    t: "Suporte contínuo",
    d: "Apoio durante e depois",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
];

export function CTA() {
  return (
    <section id="form" className="relative scroll-mt-24 py-16 sm:py-24">
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          {/* Left — messaging */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-center"
          >
            <div className="mb-3 inline-flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-white/50">
              <span className="h-[1px] w-10 bg-gradient-to-r from-cyan-400/60 to-transparent" />
              Vamos conversar
            </div>
            <h2 className="text-balance text-2xl font-bold leading-tight tracking-tight sm:text-3xl lg:text-4xl">
              Conta-nos o que precisas.
              <br />
              <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">
                Nós construímos.
              </span>
            </h2>
            <p className="mt-4 max-w-md text-pretty text-base leading-relaxed text-white/55">
              Diagnóstico gratuito em 48h. Analisamos o teu fluxo e propomos uma solução concreta, sem compromisso.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {perks.map((item) => (
                <div key={item.t} className="group flex gap-3">
                  <div className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${item.bg} transition-transform duration-300 group-hover:scale-110`}>
                    <item.icon size={14} className={item.color} />
                  </div>
                  <div>
                    <div className="text-sm font-medium">{item.t}</div>
                    <div className="text-xs text-white/40">{item.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <LeadForm />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
