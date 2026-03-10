import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "./Container";
import { Logo } from "./Logo";

const nav = {
  Soluções: [
    { label: "ERP à medida", href: "#solucao" },
    { label: "Apps para negócios locais", href: "#solucao" },
    { label: "Automação com IA", href: "#solucao" },
    { label: "Módulos", href: "#modulos" },
  ],
  Empresa: [
    { label: "Como trabalhamos", href: "#processo" },
    { label: "Casos de uso", href: "#casos" },
    { label: "Resultados", href: "#resultados" },
    { label: "FAQ", href: "#faq" },
  ],
  Oferta: [
    { label: "Diagnóstico gratuito", href: "#form" },
    { label: "Implementação", href: "#oferta" },
    { label: "Evolução contínua", href: "#oferta" },
    { label: "Contactar", href: "#form" },
  ],
  Legal: [
    { label: "Política de Privacidade", href: "#" },
    { label: "Termos de Serviço", href: "#" },
    { label: "RGPD", href: "#" },
  ],
};

const industries = [
  "Distribuição",
  "Restauração",
  "Cabeleireiros",
  "Oficinas",
  "Clínicas",
  "Serviços",
  "Frotas",
  "Backoffice",
];

function scrollTo(href: string) {
  return (e: React.MouseEvent) => {
    if (href.startsWith("#") && href.length > 1) {
      e.preventDefault();
      document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth" });
    }
  };
}

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.04]">
      {/* Top accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

      <Container>
        {/* Main grid */}
        <div className="grid gap-10 pb-10 pt-14 lg:grid-cols-[1.4fr_2fr]">
          {/* Left — Brand */}
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <Logo className="h-9 w-auto opacity-90" />
              <div>
                <div className="text-base font-bold">NextOps AI</div>
                <div className="text-[12px] text-white/40">Tecnologia que move o teu negócio.</div>
              </div>
            </div>

            <p className="mt-5 text-[13px] leading-relaxed text-white/45">
              Criamos software à medida, ERPs inteligentes e apps para negócios locais. 
              Do diagnóstico à implementação por sprints, com IA integrada.
            </p>

            {/* Contact info */}
            <div className="mt-6 grid gap-2.5">
              <a
                href="mailto:geral@nextops.ai"
                className="group flex items-center gap-2.5 text-[13px] text-white/40 transition-colors duration-300 hover:text-white/70"
              >
                <Mail size={14} className="text-cyan-400/50 transition-colors duration-300 group-hover:text-cyan-400" />
                geral@nextops.ai
              </a>
              <a
                href="tel:+351900000000"
                className="group flex items-center gap-2.5 text-[13px] text-white/40 transition-colors duration-300 hover:text-white/70"
              >
                <Phone size={14} className="text-cyan-400/50 transition-colors duration-300 group-hover:text-cyan-400" />
                +351 900 000 000
              </a>
              <div className="flex items-center gap-2.5 text-[13px] text-white/40">
                <MapPin size={14} className="text-cyan-400/50" />
                Portugal
              </div>
            </div>

            {/* CTA mini */}
            <a
              href="#form"
              onClick={scrollTo("#form")}
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 text-[13px] font-semibold text-white shadow-lg shadow-cyan-500/15 transition-all duration-300 hover:shadow-cyan-500/25 hover:brightness-110 active:scale-[0.97]"
            >
              Pedir diagnóstico gratuito
              <ArrowUpRight size={14} />
            </a>
          </div>

          {/* Right — Nav columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {Object.entries(nav).map(([heading, links]) => (
              <div key={heading}>
                <div className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/30">
                  {heading}
                </div>
                <ul className="mt-3 grid gap-2">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        onClick={scrollTo(link.href)}
                        className="text-[13px] text-white/45 transition-colors duration-300 hover:text-white/80"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Industries bar */}
        <div className="border-t border-white/[0.04] py-5">
          <div className="flex flex-wrap items-center gap-x-1.5 gap-y-2">
            <span className="mr-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/25">
              Setores
            </span>
            {industries.map((ind) => (
              <span
                key={ind}
                className="rounded-full border border-white/[0.06] bg-white/[0.02] px-2.5 py-0.5 text-[11px] text-white/35 transition-colors duration-300 hover:border-white/[0.12] hover:text-white/55"
              >
                {ind}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/[0.04] py-6 sm:flex-row">
          <div className="text-[11px] text-white/30">
            © {new Date().getFullYear()} NextOps AI. Todos os direitos reservados.
          </div>
          <div className="flex items-center gap-1 text-[11px] text-white/25">
            <span className="mr-1">Feito com</span>
            <span className="inline-block animate-pulse text-red-400">♥</span>
            <span className="ml-1">em Portugal</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
