import { Link } from "react-router-dom";
import { BookOpen, Wrench, Target, MessageSquare, Zap, ArrowRight, CheckCircle2, BarChart3, Clock, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

const modules = [
  {
    title: "Módulo 1",
    subtitle: "A Nova Era Profissional",
    description: "Entenda por que dominar IA não é opcional — e como isso muda sua carreira.",
    icon: BookOpen,
    path: "/modulo-1",
    key: "modulo-1",
    accentClass: "bg-blue-500/10 text-blue-600",
    borderClass: "hover:border-blue-500/20",
  },
  {
    title: "Módulo 2",
    subtitle: "As Ferramentas",
    description: "As 12 ferramentas que os profissionais mais valorizados já dominam.",
    icon: Wrench,
    path: "/modulo-2",
    key: "modulo-2",
    accentClass: "bg-blue-500/10 text-blue-600",
    borderClass: "hover:border-blue-500/20",
  },
  {
    title: "Módulo 3",
    subtitle: "IA na Sua Área",
    description: "Aplicações práticas para cada função profissional.",
    icon: Target,
    path: "/modulo-3",
    key: "modulo-3",
    accentClass: "bg-blue-500/10 text-blue-600",
    borderClass: "hover:border-blue-500/20",
  },
  {
    title: "Módulo 4",
    subtitle: "Prompts Prontos",
    description: "40 prompts profissionais para copiar, colar e adaptar agora.",
    icon: MessageSquare,
    path: "/modulo-4",
    key: "modulo-4",
    accentClass: "bg-blue-500/10 text-blue-600",
    borderClass: "hover:border-blue-500/20",
  },
];

const quickWins = [
  { icon: Clock, label: "Na primeira hora", desc: "Resuma qualquer documento com ChatGPT em 2 minutos" },
  { icon: BarChart3, label: "No primeiro dia", desc: "Gere uma análise de concorrentes com Perplexity antes da reunião" },
  { icon: Sparkles, label: "Na primeira semana", desc: "Automatize um processo repetitivo com n8n — sem código" },
];

export default function Index() {
  const [visited, setVisited] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("virada-visited");
    if (stored) setVisited(JSON.parse(stored));
  }, []);

  const progress = Math.round((visited.length / 4) * 100);
  const nextModule = modules.find((m) => !visited.includes(m.key));

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Progress bar */}
      <div className="mb-8 animate-fade-in" style={{ animationDelay: "0ms" }}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">Seu progresso</span>
          <span className="text-sm font-semibold text-foreground">{progress}%</span>
        </div>
        <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-1.5">
          {visited.length === 0
            ? "Comece pelo Módulo 1 para iniciar sua jornada"
            : visited.length === 4
              ? "Todos os módulos concluídos! Faça seu Diagnóstico IA"
              : `${visited.length} de 4 módulos concluídos`}
        </p>
      </div>

      {/* Welcome */}
      <div className="mb-8 animate-fade-in" style={{ animationDelay: "100ms", opacity: 0 }}>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-3">
          Bem-vindo ao Virada Profissional.
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
          Em 4 módulos você vai dominar as ferramentas de IA que os profissionais mais requisitados já usam no dia a dia.
        </p>
        <p className="mt-3 text-muted-foreground leading-relaxed max-w-2xl">
          Comece pelo <strong className="text-foreground">Módulo 1</strong> para entender a revolução em curso.
          Avance no seu ritmo e finalize com o <strong className="text-foreground">Diagnóstico IA</strong> —
          seu plano personalizado.
        </p>
      </div>

      {/* Quick Wins section */}
      <div className="mb-8 animate-fade-in" style={{ animationDelay: "130ms", opacity: 0 }}>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">O que você consegue fazer esta semana</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {quickWins.map((win, i) => (
            <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card hover:shadow-sm transition-all">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <win.icon className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-xs font-bold text-primary mb-0.5">{win.label}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{win.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Diagnóstico IA — hero card */}
      <Link
        to="/diagnostico"
        className="block mb-6 rounded-xl overflow-hidden group animate-fade-in hover:-translate-y-0.5 transition-all duration-200"
        style={{ animationDelay: "140ms", opacity: 0 }}
      >
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center gap-5 p-6"
          style={{ background: "linear-gradient(135deg, #1E3A8A 0%, #1D4ED8 60%, #2563EB 100%)" }}
        >
          <div className="w-13 h-13 rounded-xl bg-white/15 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <Zap className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest mb-1">
              Diferencial exclusivo
            </p>
            <h3 className="text-xl font-extrabold text-white tracking-tight mb-1">
              Diagnóstico IA Personalizado
            </h3>
            <p className="text-sm text-white/75 leading-relaxed">
              Descubra exatamente como aplicar IA no seu trabalho — plano feito para a sua área e cargo.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white text-blue-700 px-5 py-2.5 rounded-lg font-bold text-sm group-hover:shadow-md group-hover:scale-[1.02] transition-all shrink-0">
            Fazer diagnóstico
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
        <div className="flex gap-2 px-6 py-3 flex-wrap" style={{ background: "rgba(0,0,0,0.18)" }}>
          {["Personalizado por área", "Plano de ação prático", "Gerado por IA", "~5 minutos"].map((t) => (
            <span key={t} className="text-[11px] font-semibold text-white bg-white/20 rounded-full px-3 py-1">
              {t}
            </span>
          ))}
        </div>
      </Link>

      {/* Quick action: Continue where you left off */}
      {nextModule && visited.length > 0 && (
        <Link
          to={nextModule.path}
          className="flex items-center gap-3 p-4 mb-6 rounded-xl border border-primary/20 bg-accent hover:bg-accent/80 transition-all group animate-fade-in"
          style={{ animationDelay: "150ms", opacity: 0 }}
        >
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <nextModule.icon className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium text-primary mb-0.5">Continuar de onde parou</p>
            <p className="text-sm font-semibold text-foreground">{nextModule.title}: {nextModule.subtitle}</p>
          </div>
          <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
        </Link>
      )}

      {/* Module cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {modules.map((mod, i) => {
          const isVisited = visited.includes(mod.key);
          return (
            <Link
              key={mod.path}
              to={mod.path}
              className={`group p-5 rounded-xl border border-border bg-card hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 animate-fade-in relative ${mod.borderClass}`}
              style={{ animationDelay: `${200 + i * 80}ms`, opacity: 0 }}
            >
              {isVisited && (
                <div className="absolute top-3 right-3">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                </div>
              )}
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-105 transition-all ${mod.accentClass}`}>
                  <mod.icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                    {mod.title}
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{mod.subtitle}</h3>
                  <p className="text-sm text-muted-foreground">{mod.description}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
