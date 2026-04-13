import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ArrowRight, ArrowLeft, AlertTriangle, TrendingDown, TrendingUp, Clock, CheckSquare,
  Brain, Bot, Cpu, Lightbulb, Briefcase, Layers, ShieldAlert, Rocket,
  Search, BarChart3, PenTool, Image, Code, MessageSquare, Link2, Settings, Users,
  Sparkles, ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ═══════════════════════════════════════════
   STEP 1 — INTRODUÇÃO À IA (9 sub-sections)
   ═══════════════════════════════════════════ */

const introSections = [
  { id: "what-is-ai", title: "O que é IA?", icon: Brain },
  { id: "assistant-vs-agent", title: "Assistente vs Agente", icon: Bot },
  { id: "what-is-model", title: "O que é um Modelo?", icon: Cpu },
  { id: "myths", title: "Os 4 Mitos da IA", icon: AlertTriangle },
  { id: "practice", title: "Como usar na prática", icon: Lightbulb },
  { id: "work-types", title: "5 Tipos de Trabalho", icon: Briefcase },
  { id: "tool-categories", title: "Categorias de Ferramentas", icon: Layers },
  { id: "risks", title: "Riscos Reais", icon: ShieldAlert },
  { id: "start", title: "Por onde começar?", icon: Rocket },
];

/* ═══════════════════════════════════════════
   STEP 2 — A NOVA ERA PROFISSIONAL (existing)
   ═══════════════════════════════════════════ */

const comparisons = [
  { task: "Proposta Comercial", before: "2-4 horas manual", after: "10 minutos com IA" },
  { task: "Onboarding de clientes", before: "Artesanal e inconsistente", after: "Padronizado e automático" },
  { task: "Atendimento", before: "Reativo, 4-8h de resposta", after: "Proativo, classificação automática" },
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

/* ═══════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════ */

export default function Module1() {
  const [step, setStep] = useState<1 | 2>(1);
  const [introIndex, setIntroIndex] = useState(0);
  const [introCompleted, setIntroCompleted] = useState<Set<number>>(() => {
    const stored = localStorage.getItem("virada-intro-completed");
    return stored ? new Set(JSON.parse(stored)) : new Set<number>();
  });

  const [checked, setChecked] = useState<boolean[]>(() => {
    const stored = localStorage.getItem("virada-checklist-1");
    return stored ? JSON.parse(stored) : new Array(checklist.length).fill(false);
  });

  useEffect(() => {
    const stored = localStorage.getItem("virada-visited");
    const arr: string[] = stored ? JSON.parse(stored) : [];
    if (!arr.includes("modulo-1")) {
      arr.push("modulo-1");
      localStorage.setItem("virada-visited", JSON.stringify(arr));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("virada-intro-completed", JSON.stringify([...introCompleted]));
  }, [introCompleted]);

  const toggleCheck = (i: number) => {
    setChecked((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      localStorage.setItem("virada-checklist-1", JSON.stringify(next));
      return next;
    });
  };

  const checkedCount = checked.filter(Boolean).length;

  const goNextIntro = () => {
    setIntroCompleted((prev) => new Set(prev).add(introIndex));
    if (introIndex < introSections.length - 1) {
      setIntroIndex(introIndex + 1);
    } else {
      setStep(2);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Breadcrumb */}
      <div className="mb-6 animate-fade-in">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          Voltar ao início
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8 animate-fade-in" style={{ animationDelay: "50ms", opacity: 0 }}>
        <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Módulo 1</div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight mb-3">A Nova Era Profissional</h1>
        <p className="text-lg text-muted-foreground">
          Entenda por que dominar IA não é opcional — e como isso muda sua carreira.
        </p>
      </div>

      {/* Step Tabs */}
      <div className="flex gap-2 mb-8 animate-fade-in" style={{ animationDelay: "80ms", opacity: 0 }}>
        <button
          onClick={() => setStep(1)}
          className={cn(
            "flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all border",
            step === 1
              ? "bg-primary text-primary-foreground border-primary shadow-md"
              : "bg-card text-muted-foreground border-border hover:bg-muted hover:text-foreground"
          )}
        >
          <span className="block text-xs opacity-70 mb-0.5">Parte 1</span>
          Introdução à IA
        </button>
        <button
          onClick={() => setStep(2)}
          className={cn(
            "flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all border",
            step === 2
              ? "bg-primary text-primary-foreground border-primary shadow-md"
              : "bg-card text-muted-foreground border-border hover:bg-muted hover:text-foreground"
          )}
        >
          <span className="block text-xs opacity-70 mb-0.5">Parte 2</span>
          A Nova Era Profissional
        </button>
      </div>

      {/* ──── STEP 1: Introdução ──── */}
      {step === 1 && (
        <div className="animate-fade-in">
          {/* Intro sub-navigation */}
          <div className="flex flex-wrap gap-1.5 mb-8 p-3 rounded-xl bg-surface border border-border">
            {introSections.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setIntroIndex(i)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                  introIndex === i
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : introCompleted.has(i)
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <s.icon className="w-3 h-3" />
                <span className="hidden sm:inline">{s.title}</span>
                <span className="sm:hidden">{i + 1}</span>
              </button>
            ))}
          </div>

          {/* Progress */}
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-6">
            <span>{introCompleted.size}/{introSections.length} concluídas</span>
            <div className="w-32 h-1.5 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${(introCompleted.size / introSections.length) * 100}%` }} />
            </div>
          </div>

          {/* Section header */}
          <div className="flex items-center gap-3 mb-2">
            {(() => { const Icon = introSections[introIndex].icon; return <Icon className="w-5 h-5 text-primary" />; })()}
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">
              Seção {introIndex + 1} de {introSections.length}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-6 tracking-tight">{introSections[introIndex].title}</h2>

          {/* Section content */}
          {introIndex === 0 && <Intro1 />}
          {introIndex === 1 && <Intro2 />}
          {introIndex === 2 && <Intro3 />}
          {introIndex === 3 && <Intro4 />}
          {introIndex === 4 && <Intro5 />}
          {introIndex === 5 && <Intro6 />}
          {introIndex === 6 && <Intro7 />}
          {introIndex === 7 && <Intro8 />}
          {introIndex === 8 && <Intro9 />}

          {/* Next button */}
          <div className="mt-10 pt-6 border-t border-border">
            <button
              onClick={goNextIntro}
              className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              {introIndex < introSections.length - 1 ? (
                <>Próxima seção <ArrowRight className="w-4 h-4" /></>
              ) : (
                <>Avançar para Parte 2 <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </div>
        </div>
      )}

      {/* ──── STEP 2: Nova Era Profissional ──── */}
      {step === 2 && (
        <div className="animate-fade-in">
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
                <div key={i} className="grid grid-cols-3 border-t border-border text-sm group hover:bg-muted/50 transition-colors">
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
                <div key={i} className="p-4 rounded-xl bg-surface border border-border text-center hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
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
                <div key={i} className="flex gap-3 p-4 rounded-lg border border-border bg-card hover:border-destructive/20 transition-colors">
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
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-foreground">1.5 — Checklist Diário de IA</h2>
              <span className="text-xs font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
                {checkedCount}/{checklist.length}
              </span>
            </div>
            <div className="rounded-xl border border-border bg-card p-4 sm:p-6 space-y-3">
              <div className="w-full h-1 bg-muted rounded-full overflow-hidden mb-2">
                <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: `${(checkedCount / checklist.length) * 100}%` }} />
              </div>
              {checklist.map((item, i) => (
                <label
                  key={i}
                  className="flex items-start gap-3 cursor-pointer group p-2 -mx-2 rounded-lg hover:bg-muted/50 transition-colors"
                  onClick={() => toggleCheck(i)}
                >
                  <div className={`w-5 h-5 mt-0.5 rounded border-2 flex items-center justify-center shrink-0 transition-all duration-200 ${
                    checked[i] ? "bg-primary border-primary scale-110" : "border-border group-hover:border-primary/50"
                  }`}>
                    {checked[i] && <CheckSquare className="w-3.5 h-3.5 text-primary-foreground" />}
                  </div>
                  <span className={`text-sm transition-all duration-200 ${
                    checked[i] ? "text-muted-foreground line-through" : "text-foreground"
                  }`}>
                    {item}
                  </span>
                </label>
              ))}
            </div>
          </section>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => { setStep(1); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Parte 1
            </button>
            <Link
              to="/modulo-2"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 hover:shadow-md transition-all"
            >
              Módulo 2 — As Ferramentas
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   REUSABLE CARD
   ═══════════════════════════════════════════ */
function InfoCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-xl border border-border bg-card p-5", className)}>
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════
   INTRO SECTIONS
   ═══════════════════════════════════════════ */

function Intro1() {
  const examples = [
    { icon: "📝", text: "Você faz uma pergunta → ela te dá um resumo" },
    { icon: "📄", text: "Você dá instruções → ele redige um memorando" },
    { icon: "📊", text: "Você fornece uma planilha → ela encontra padrões" },
    { icon: "🖼️", text: "Você dá um comando → ele cria uma imagem" },
    { icon: "🎯", text: "Você define um objetivo → ela descobre os passos" },
  ];
  return (
    <div className="space-y-4">
      <InfoCard className="border-primary/30 bg-accent">
        <p className="text-lg font-medium text-foreground leading-relaxed">
          "A Inteligência Artificial (IA) é um software capaz de receber uma <span className="text-primary font-semibold">entrada</span> e gerar uma <span className="text-primary font-semibold">saída</span> que normalmente exigiria esforço humano."
        </p>
      </InfoCard>
      <div className="grid gap-3">
        {examples.map((e, i) => (
          <InfoCard key={i} className="flex items-center gap-4 py-4">
            <span className="text-2xl">{e.icon}</span>
            <span className="text-muted-foreground text-sm">{e.text}</span>
          </InfoCard>
        ))}
      </div>
    </div>
  );
}

function Intro2() {
  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <InfoCard className="border-primary/30">
          <div className="flex items-center gap-2 mb-3">
            <Bot className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-foreground">Assistente</h3>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">Você diz exatamente o que quer, passo a passo. A IA executa cada instrução como um co-piloto obediente.</p>
        </InfoCard>
        <InfoCard className="border-primary/30">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-foreground">Agente</h3>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">Você define o objetivo e a IA descobre como chegar lá. Ela planeja, decide e executa com autonomia.</p>
        </InfoCard>
      </div>
      <InfoCard className="bg-surface text-center">
        <p className="text-muted-foreground text-sm italic">
          "É como a diferença entre <span className="text-primary font-medium">ajudar a cozinhar</span> vs <span className="text-primary font-medium">pedir para alguém fazer o jantar inteiro</span>."
        </p>
      </InfoCard>
    </div>
  );
}

function Intro3() {
  const models = [
    { icon: PenTool, label: "Escrever", desc: "Textos, e-mails, propostas" },
    { icon: Code, label: "Programar", desc: "Código, automações, sistemas" },
    { icon: Search, label: "Pesquisar", desc: "Dados, fontes, tendências" },
    { icon: Image, label: "Gerar imagens", desc: "Visuais, diagramas, arte" },
  ];
  return (
    <div className="space-y-4">
      <InfoCard className="border-primary/30 bg-accent">
        <p className="text-muted-foreground text-sm leading-relaxed">
          O <span className="text-primary font-semibold">modelo</span> é o motor (cérebro) por trás do sistema de IA. Diferentes modelos são otimizados para diferentes tarefas.
        </p>
      </InfoCard>
      <div className="grid grid-cols-2 gap-3">
        {models.map((m, i) => (
          <InfoCard key={i} className="text-center py-6">
            <m.icon className="w-8 h-8 text-primary mx-auto mb-3" />
            <h4 className="font-bold text-foreground text-sm mb-1">{m.label}</h4>
            <p className="text-muted-foreground text-xs">{m.desc}</p>
          </InfoCard>
        ))}
      </div>
      <InfoCard className="border-destructive/30 bg-destructive/5">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
          <p className="text-muted-foreground text-sm">O problema geralmente não é a IA — é usar a <span className="text-destructive font-semibold">ferramenta errada</span>, com o <span className="text-destructive font-semibold">modelo errado</span>, para a <span className="text-destructive font-semibold">tarefa errada</span>.</p>
        </div>
      </InfoCard>
    </div>
  );
}

function Intro4() {
  const myths = [
    { myth: "A IA não é tão boa assim", reality: "A IA muda rápido. Julgamentos antigos estão desatualizados. O que não funcionava há 6 meses pode ser incrível hoje." },
    { myth: "Dá pra saber quando foi feito por IA", reality: "Hoje é muito menos confiável detectar isso. A qualidade do output melhora a cada semana." },
    { myth: "Mas a IA tem alucinações", reality: "É real, mas gerenciável com uso correto. Peça fontes, verifique e use como ponto de partida." },
    { myth: "Você precisa ser expert em prompts", reality: "Você precisa de clareza, não de fórmulas secretas. Contexto claro > prompt elaborado." },
  ];
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {myths.map((m, i) => (
        <InfoCard key={i}>
          <span className="inline-flex w-7 h-7 rounded-full bg-primary/10 text-primary font-bold text-sm items-center justify-center mb-3">{i + 1}</span>
          <p className="text-foreground font-semibold text-sm mb-2">"{m.myth}"</p>
          <p className="text-muted-foreground text-sm leading-relaxed">{m.reality}</p>
        </InfoCard>
      ))}
    </div>
  );
}

function Intro5() {
  const steps = ["Você pergunta", "Ele responde", "Você corrige", "Ele ajusta", "Você esclarece", "Melhora"];
  return (
    <div className="space-y-4">
      <InfoCard className="border-primary/30 bg-accent text-center">
        <p className="text-foreground font-semibold text-lg">"Pare de tratar a IA como máquina de venda automática."</p>
      </InfoCard>
      <InfoCard>
        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-4">Ciclo iterativo</p>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className={cn(
                "px-3 py-1.5 rounded-full text-xs font-semibold",
                i % 2 === 0 ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
              )}>{s}</span>
              {i < steps.length - 1 && <ChevronRight className="w-3 h-3 text-muted-foreground" />}
            </div>
          ))}
        </div>
      </InfoCard>
      <InfoCard className="bg-surface">
        <p className="text-muted-foreground text-sm leading-relaxed">
          A IA funciona melhor quando <span className="text-primary font-semibold">sabe mais</span>. Dê contexto: seus objetivos, seu público, seu tom, suas restrições.
        </p>
      </InfoCard>
    </div>
  );
}

function Intro6() {
  const types = [
    { icon: Search, title: "Pesquisa", desc: "Investigar tópicos que importam para você" },
    { icon: BarChart3, title: "Análise", desc: "Encontrar padrões em dados e documentos" },
    { icon: Brain, title: "Estratégia", desc: "Estruturar compensações e testar hipóteses" },
    { icon: PenTool, title: "Escrita", desc: "Esboços, reescritas, edições, mudanças de tom" },
    { icon: Image, title: "Imagens", desc: "Diagramas, infográficos, visualizações conceituais" },
  ];
  return (
    <div className="grid gap-3">
      {types.map((t, i) => (
        <InfoCard key={i} className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center shrink-0">
            <t.icon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h4 className="font-bold text-foreground text-sm">{t.title}</h4>
            <p className="text-muted-foreground text-xs">{t.desc}</p>
          </div>
        </InfoCard>
      ))}
    </div>
  );
}

function Intro7() {
  const categories = [
    { icon: MessageSquare, title: "Chatbots", desc: "ChatGPT, Claude, Gemini, Grok" },
    { icon: Link2, title: "IA integrada", desc: "Notion, Gmail, Figma, Slack..." },
    { icon: Sparkles, title: "Especializadas", desc: "Imagem, vídeo, voz, música" },
    { icon: Settings, title: "Automação", desc: "Conectar fluxos de trabalho repetitivos" },
    { icon: Code, title: "Codificação com IA", desc: "Criar software em linguagem natural" },
    { icon: Users, title: "Agentes", desc: "Autonomia para definir e executar objetivos" },
  ];
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      {categories.map((c, i) => (
        <InfoCard key={i} className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center shrink-0 mt-0.5">
            <c.icon className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h4 className="font-bold text-foreground text-sm">{c.title}</h4>
            <p className="text-muted-foreground text-xs">{c.desc}</p>
          </div>
        </InfoCard>
      ))}
    </div>
  );
}

function Intro8() {
  const risks = [
    { title: "Absurdo confiante", desc: "Fluência não é garantia de acerto. A IA pode errar com muita convicção." },
    { title: "Bajulação", desc: "A IA concorda demais. Peça contra-argumentos e perspectivas opostas." },
    { title: "Capacidade de direção", desc: "Você pode induzir a resposta que queria ouvir sem perceber." },
    { title: "Terceirização de julgamento", desc: "Não deixe os padrões de qualidade caírem silenciosamente." },
    { title: "Vício", desc: "O ciclo de feedback é rápido e gratificante. Use com consciência." },
  ];
  return (
    <div className="grid gap-3">
      {risks.map((r, i) => (
        <InfoCard key={i} className="border-destructive/20">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-foreground text-sm mb-1">{r.title}</h4>
              <p className="text-muted-foreground text-sm">{r.desc}</p>
            </div>
          </div>
        </InfoCard>
      ))}
    </div>
  );
}

function Intro9() {
  const actions = [
    "Escolha um tema para pesquisar",
    "Faça o upload de um documento para analisar",
    "Peça ajuda para refletir estrategicamente",
    "Use para escrever um rascunho",
    "Construa algo pequeno",
  ];
  return (
    <div className="space-y-4">
      <InfoCard className="border-primary/30 bg-accent text-center">
        <p className="text-foreground font-semibold text-lg">"Não comece memorizando jargões. Comece com seu <span className="text-primary">trabalho real</span>."</p>
      </InfoCard>
      <InfoCard>
        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-4">Ações práticas para hoje</p>
        <div className="space-y-3">
          {actions.map((a, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</div>
              <span className="text-muted-foreground text-sm">{a}</span>
            </div>
          ))}
        </div>
      </InfoCard>
    </div>
  );
}
