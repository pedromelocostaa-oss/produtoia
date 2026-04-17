import { Link } from "react-router-dom";
import { BookOpen, Wrench, Target, MessageSquare, Zap, ArrowRight, CheckCircle2, Users } from "lucide-react";
import { useState, useEffect } from "react";

const modules = [
  {
    title: "Módulo 1",
    subtitle: "A Nova Era Profissional",
    description: "Entenda por que dominar IA não é opcional — e como isso muda sua carreira.",
    icon: BookOpen,
    path: "/modulo-1",
    key: "modulo-1",
  },
  {
    title: "Módulo 2",
    subtitle: "As Ferramentas",
    description: "As ferramentas que os profissionais mais valorizados já dominam.",
    icon: Wrench,
    path: "/modulo-2",
    key: "modulo-2",
  },
  {
    title: "Módulo 3",
    subtitle: "IA na Sua Área",
    description: "Aplicações práticas para cada função profissional.",
    icon: Target,
    path: "/modulo-3",
    key: "modulo-3",
  },
  {
    title: "Módulo 4",
    subtitle: "Prompts Prontos",
    description: "20 prompts profissionais para copiar, colar e adaptar.",
    icon: MessageSquare,
    path: "/modulo-4",
    key: "modulo-4",
  },
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
            className="h-full bg-primary rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-1.5">
          {visited.length === 0
            ? "Comece pelo Módulo 1 para iniciar sua jornada"
            : visited.length === 4
              ? "🎉 Todos os módulos concluídos! Faça seu Diagnóstico IA"
              : `${visited.length} de 4 módulos concluídos`}
        </p>
      </div>

      {/* Welcome */}
      <div className="mb-10 animate-fade-in" style={{ animationDelay: "100ms", opacity: 0 }}>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-3">
          Bem-vindo ao Virada Profissional.
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
          Você está a alguns passos de se tornar o profissional mais valioso da sua equipe.
        </p>
        <p className="mt-4 text-muted-foreground leading-relaxed max-w-2xl">
          Comece pelo <strong className="text-foreground">Módulo 1</strong> para entender a revolução da IA no ambiente de trabalho.
          Avance pelos módulos no seu ritmo e finalize com o <strong className="text-foreground">Diagnóstico IA</strong> —
          seu plano personalizado para aplicar inteligência artificial na sua rotina.
        </p>
      </div>

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
              className="group p-5 rounded-xl border border-border bg-card hover:shadow-md hover:border-primary/20 hover:-translate-y-0.5 transition-all duration-200 animate-fade-in relative"
              style={{ animationDelay: `${200 + i * 80}ms`, opacity: 0 }}
            >
              {isVisited && (
                <div className="absolute top-3 right-3">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                </div>
              )}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center shrink-0 group-hover:bg-primary/10 group-hover:scale-105 transition-all">
                  <mod.icon className="w-5 h-5 text-accent-foreground" />
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

      {/* Community CTA */}
      <Link
        to="/comunidade"
        className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-6 mb-4 rounded-xl border border-border bg-card hover:shadow-md hover:border-primary/20 hover:-translate-y-0.5 transition-all group animate-fade-in"
        style={{ animationDelay: "530ms", opacity: 0 }}
      >
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
          <Users className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground mb-1">Veja o que outros profissionais já construíram</h3>
          <p className="text-sm text-muted-foreground">
            Inspire-se com cases reais de quem já colocou a IA para trabalhar
          </p>
        </div>
        <div className="flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all shrink-0">
          Acessar a Comunidade →
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </Link>

      {/* Diagnostic CTA */}
      <Link
        to="/diagnostico"
        className="block p-6 sm:p-8 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 group animate-fade-in"
        style={{ animationDelay: "550ms", opacity: 0 }}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-primary-foreground/15 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <Zap className="w-7 h-7" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-1">Faça seu Diagnóstico IA</h3>
            <p className="text-primary-foreground/80 text-sm">
              Descubra exatamente como aplicar IA no seu trabalho — personalizado para você.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-primary-foreground text-primary px-5 py-2.5 rounded-lg font-semibold text-sm group-hover:shadow-md group-hover:scale-[1.02] transition-all shrink-0">
            Fazer meu diagnóstico agora
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </Link>
    </div>
  );
}
