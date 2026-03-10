import { Check, Loader2 } from "lucide-react";
import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { submitLead } from "../lib/leads";
import type { LeadPayload } from "../lib/types";
import { cn } from "../lib/cn";

type Status = "idle" | "loading" | "success" | "error";

const employeesOptions = ["1–5", "6–15", "16–30", "31–80", "81–200", "200+"];

export function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");
  const [values, setValues] = useState({
    company: "",
    name: "",
    email: "",
    phone: "",
    employees: "",
    industry: "",
    message: "",
    consent: true,
  });

  const disabled = status === "loading" || status === "success";

  const canSubmit = useMemo(() => {
    const okEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim());
    return (
      values.company.trim().length >= 2 &&
      values.name.trim().length >= 2 &&
      okEmail &&
      values.consent
    );
  }, [values]);

  const onChange = (k: keyof typeof values) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (!canSubmit) {
      setError("Preencha empresa, nome e email (válido).");
      return;
    }

    setStatus("loading");

    const payload: LeadPayload = {
      company: values.company.trim(),
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim() || undefined,
      employees: values.employees || undefined,
      industry: values.industry.trim() || undefined,
      message: values.message.trim() || undefined,
      consent: Boolean(values.consent),
      source: "website",
      timestamp: new Date().toISOString(),
    };

    try {
      await submitLead(payload);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Algo falhou. Tenta novamente.");
    }
  }

  return (
    <div className="group/form relative overflow-hidden rounded-2xl border border-white/[0.08] bg-ink-900/60 p-5 shadow-glow backdrop-blur-2xl sm:p-6 lg:p-7">
        {/* Corner glow */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-cyan-500/[0.06] blur-3xl transition-opacity duration-500" />

        <div>
          <div className="flex items-center gap-2.5">
            <div className="h-5 w-1 rounded-full bg-gradient-to-b from-cyan-400 to-blue-500" />
            <div className="text-sm font-bold">Diagnóstico + Mapa (48h)</div>
          </div>
          <p className="mt-2 text-[13px] leading-relaxed text-white/55">
            Diz-nos o contexto. Respondemos com ganhos rápidos + proposta de sprint.
          </p>
        </div>

        <form className="mt-5 grid gap-3.5" onSubmit={onSubmit} aria-label="Formulário de lead">
          <div className="grid gap-x-4 gap-y-3 sm:grid-cols-2">
            <Field label="Empresa*" placeholder="Ex: Visão Consultores" value={values.company} onChange={onChange("company")} disabled={disabled} />
            <Field label="Nome*" placeholder="O teu nome" value={values.name} onChange={onChange("name")} disabled={disabled} />
          </div>

          <div className="grid gap-x-4 gap-y-3 sm:grid-cols-2">
            <Field label="Email*" type="email" placeholder="email@empresa.pt" value={values.email} onChange={onChange("email")} disabled={disabled} />
            <Field label="Telefone" placeholder="+351 ..." value={values.phone} onChange={onChange("phone")} disabled={disabled} />
          </div>

          <div className="grid gap-x-4 gap-y-3 sm:grid-cols-2">
            <SelectField
              label="Colaboradores"
              value={values.employees}
              onChange={onChange("employees")}
              disabled={disabled}
              options={employeesOptions}
              placeholder="Selecionar"
            />
            <Field label="Setor" placeholder="Ex: Distribuição / Serviços" value={values.industry} onChange={onChange("industry")} disabled={disabled} />
          </div>

          <TextArea
            label="Mensagem (opcional)"
            placeholder="Descreve o fluxo atual em 2–3 linhas."
            value={values.message}
            onChange={onChange("message")}
            disabled={disabled}
          />

          <label className={cn("mt-1 flex items-start gap-2.5 text-[11px] text-white/50", disabled && "opacity-70")}>
            <input
              type="checkbox"
              checked={values.consent}
              onChange={(e) => setValues((v) => ({ ...v, consent: e.target.checked }))}
              disabled={disabled}
              className="mt-[2px] h-3.5 w-3.5 rounded border-white/15 bg-white/10 accent-indigo-500"
            />
            Autorizo o contacto da NextOps AI para análise e proposta (sem spam).
          </label>

          {error && <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-200">{error}</div>}

          <button
            type="submit"
            disabled={disabled}
            className={cn(
              "group mt-2 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:shadow-cyan-500/30 hover:brightness-110 disabled:opacity-60 active:scale-[0.97]",
              !canSubmit && status === "idle" && "opacity-80"
            )}
          >
            {status === "loading" && <Loader2 className="animate-spin" size={16} />}
            {status === "success" && <Check size={16} />}
            {status === "success" ? "Pedido enviado ✓" : "Receber Mapa de Ganhos"}
          </button>

          <p className="text-[11px] text-white/35">
            Resposta em 48h úteis. Implementação por sprints.
          </p>
        </form>
      </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  disabled,
}: {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
}) {
  return (
    <label className="grid min-w-0 gap-1 text-[11px] font-medium text-white/50">
      <span className="truncate">{label}</span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className="h-10 min-w-0 rounded-lg border border-white/8 bg-white/[0.04] px-3 text-sm text-white placeholder:text-white/25 outline-none transition-all duration-300 focus:border-indigo-400/40 focus:bg-white/[0.06] focus:ring-1 focus:ring-indigo-400/20"
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder,
  disabled,
}: {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  placeholder: string;
  disabled?: boolean;
}) {
  return (
    <label className="grid gap-1 text-[11px] font-medium text-white/50">
      <span className="truncate">{label}</span>
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="h-10 min-w-0 w-full rounded-lg border border-white/8 bg-white/[0.04] px-3 text-sm text-white outline-none transition-all duration-300 focus:border-indigo-400/40 focus:ring-1 focus:ring-indigo-400/20"
      >
        <option value="" className="bg-ink-900">
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-ink-900">
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  placeholder,
  disabled,
}: {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  disabled?: boolean;
}) {
  return (
    <label className="grid gap-1 text-[11px] font-medium text-white/50">
      <span className="truncate">{label}</span>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        rows={2}
        className="min-h-[72px] resize-none rounded-lg border border-white/8 bg-white/[0.04] px-3 py-2.5 text-sm text-white placeholder:text-white/25 outline-none transition-all duration-300 focus:border-indigo-400/40 focus:bg-white/[0.06] focus:ring-1 focus:ring-indigo-400/20"
      />
    </label>
  );
}
