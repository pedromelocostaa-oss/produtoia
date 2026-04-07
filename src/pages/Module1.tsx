import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  Clock,
  CheckSquare,
} from "lucide-react";

const comparisons = [
  {
    task: "Proposta Comercial",
    before: "2-4 horas manual",
    after: "10 minutos com IA",
  },
  {
    task: "Onboarding de clientes",
    before: "Artesanal e inconsistente",
    after: "Padronizado e automático",
  },
  {
    task: "Atendimento",
    before: "Reativo, 4-8h de resposta",
    after: "Proativo, classificação automática",
  },
];

const metrics = [
  { value: "-75%", label: "no tempo de proposta comercial", icon: TrendingDown },
  { value: "+35%", label: "na taxa de conversão", icon: TrendingUp },
  { value: "-40%", label: "no churn dos primeiros 90 dias", icon: TrendingDown },
  { value: "8-12h", label: "economizadas por semana por pessoa", icon: Clock },
];

const errors = [
  { title: "Tratar a IA como Google 2.0", desc: "A IA não é um buscador. É uma assistente que precisa de contexto e direção clara." },
  { title: "Confiança cega no output sem revisar", desc: "A IA pode alucinar. Sempre revise dados, números e citações antes de enviar." },
  { title: "Inserir dados confidenciais em ferramentas públicas", desc: "Cuidado com informações sensíveis em ferramentas sem garantia de privacidade." },
  { title: "Usar prompts vagos de menos de 30 palavras", desc: "Quanto mais contexto você dá, melhor o resultado. Prompts curtos = respostas genéricas." },
  { title: "Ficar só na fase da lua de mel", desc: "Experimentar é bom, mas sem integrar na rotina diária, o impacto desaparece." },
];

const checklist = [
  "Iniciar o dia pedindo à IA um resumo das prioridades",
  "Usar IA para rascunhar e-mails importantes",
  "Revisar pelo menos um documento com ajuda da IA",
  "Pedir à IA para preparar pontos-chave antes de uma reunião",
  "Usar IA para analisar dados ou métricas do dia",
  "Criar um prompt estruturado para uma tarefa recorrente",
  "Testar uma ferramenta nova por pelo menos 10 minutos",
  "Registrar o que funcionou e o que precisa ajustar",
];

export default function Module1() {
  const [checked, setChecked] = useState<boolean[]>(new Array(checklist.length).fill(false));

  useEffect(() => {
    const stored = localStorage.getItem("virada-visited");
    const arr: string[] = stored ? JSON.parse(stored) : [];
    if (!arr.includes("modulo-1")) {
      arr.push("modulo-1");
      localStorage.setItem("virada-visited", JSON.stringify(arr));
    }
  }, []);

  const toggleCheck = (i: number) => {
    setChecked((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Header */}
      <div className="mb-10">
        <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Módulo 1</div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight mb-3">A Nova Era Profissional</h1>
        <p className="text-lg text-muted-foreground">
          Entenda por que dominar IA não é opcional — e como isso muda sua carreira.
        </p>
      </div>

      {/* 1.1 */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-foreground mb-4">1.1 — De Digital-First para AI-First</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          As empresas mais competitivas do mundo já mudaram a pergunta fundamental. A primeira pergunta ao 
          enfrentar qualquer desafio não é mais <em>"quem vai fazer isso?"</em> mas sim <strong className="text-foreground">"como a IA pode resolver 80% disso agora?"</strong>.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Essa mentalidade inverte a lógica de alocação de recursos. Em vez de começar com horas humanas, 
          você começa com inteligência artificial — e usa pessoas para os 20% que realmente precisam de 
          julgamento humano, criatividade e relacionamento.
        </p>
      </section>

      {/* 1.2 */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-foreground mb-4">1.2 — Empresa Tradicional vs AI-First</h2>
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="grid grid-cols-3 bg-muted text-sm font-semibold text-foreground">
            <div className="p-3 sm:p-4">Tarefa</div>
            <div className="p-3 sm:p-4">Tradicional</div>
            <div className="p-3 sm:p-4">AI-First</div>
          </div>
          {comparisons.map((c, i) => (
            <div key={i} className="grid grid-cols-3 border-t border-border text-sm">
              <div className="p-3 sm:p-4 font-medium text-foreground">{c.task}</div>
              <div className="p-3 sm:p-4 text-muted-foreground">{c.before}</div>
              <div className="p-3 sm:p-4 text-primary font-medium">{c.after}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 1.3 */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-foreground mb-4">1.3 — Resultados Reais</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {metrics.map((m, i) => (
            <div key={i} className="p-4 rounded-xl bg-surface border border-border text-center">
              <m.icon className="w-5 h-5 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground mb-1">{m.value}</div>
              <div className="text-xs text-muted-foreground">{m.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 1.4 */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-foreground mb-4">1.4 — Erros Comuns ao Usar IA</h2>
        <div className="space-y-3">
          {errors.map((e, i) => (
            <div key={i} className="flex gap-3 p-4 rounded-lg border border-border bg-card">
              <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-foreground text-sm mb-1">{e.title}</h3>
                <p className="text-sm text-muted-foreground">{e.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 1.5 */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-foreground mb-4">1.5 — Checklist Diário de IA</h2>
        <div className="rounded-xl border border-border bg-card p-4 sm:p-6 space-y-3">
          {checklist.map((item, i) => (
            <label
              key={i}
              className="flex items-start gap-3 cursor-pointer group"
              onClick={() => toggleCheck(i)}
            >
              <div className={`w-5 h-5 mt-0.5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                checked[i] ? "bg-primary border-primary" : "border-border group-hover:border-primary/50"
              }`}>
                {checked[i] && <CheckSquare className="w-3.5 h-3.5 text-primary-foreground" />}
              </div>
              <span className={`text-sm transition-colors ${
                checked[i] ? "text-muted-foreground line-through" : "text-foreground"
              }`}>
                {item}
              </span>
            </label>
          ))}
        </div>
      </section>

      {/* Next */}
      <Link
        to="/modulo-2"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors"
      >
        Próximo: Módulo 2 — As Ferramentas
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
