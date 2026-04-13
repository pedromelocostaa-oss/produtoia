import { useState, useEffect, useRef } from "react";
import {
  Brain, Bot, Cpu, AlertTriangle, Lightbulb, Briefcase, Layers, ShieldAlert, Rocket,
  ArrowRight, CheckCircle2, Search, BarChart3, Target, PenTool, Image, MessageSquare,
  Link2, Sparkles, Settings, Code, Users, ChevronRight, PartyPopper,
} from "lucide-react";
import { cn } from "@/lib/utils";

const sections = [
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

export default function CourseIA() {
  const [activeSection, setActiveSection] = useState(0);
  const [completed, setCompleted] = useState<Set<number>>(() => {
    const stored = localStorage.getItem("course-ia-completed");
    return stored ? new Set(JSON.parse(stored)) : new Set<number>();
  });
  const [showConfetti, setShowConfetti] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem("course-ia-completed", JSON.stringify([...completed]));
  }, [completed]);

  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeSection]);

  const markComplete = () => {
    setCompleted((prev) => new Set(prev).add(activeSection));
  };

  const goNext = () => {
    markComplete();
    if (activeSection < sections.length - 1) {
      setActiveSection(activeSection + 1);
    }
  };

  const handleFinish = () => {
    markComplete();
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center">
            <Brain className="w-4 h-4 text-black" />
          </div>
          <span className="text-base font-bold text-white tracking-tight">Curso de IA</span>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {sections.map((s, i) => (
          <button
            key={s.id}
            onClick={() => { setActiveSection(i); setMobileSidebarOpen(false); }}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 text-left",
              activeSection === i
                ? "bg-white/10 text-white border-l-[3px] border-amber-500"
                : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
            )}
          >
            <s.icon className="w-4 h-4 shrink-0" />
            <span className="truncate flex-1">{s.title}</span>
            {completed.has(i) && (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            )}
          </button>
        ))}
      </nav>

      <div className="px-4 pb-4">
        <div className="flex items-center justify-between text-[10px] text-zinc-500 mb-1.5">
          <span>Progresso</span>
          <span className="font-semibold text-zinc-400">{completed.size}/{sections.length} concluídas</span>
        </div>
        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-amber-500 rounded-full transition-all duration-500"
            style={{ width: `${(completed.size / sections.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-100 overflow-hidden -mt-14 lg:mt-0">
      {/* Mobile trigger */}
      <button
        onClick={() => setMobileSidebarOpen(true)}
        className="fixed top-4 right-4 z-[60] lg:hidden p-2 rounded-lg bg-zinc-900 border border-zinc-800 shadow-lg"
        aria-label="Menu do curso"
      >
        <Layers className="w-5 h-5 text-amber-500" />
      </button>

      {/* Mobile sidebar overlay */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileSidebarOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-zinc-900 border-r border-zinc-800 shadow-2xl animate-slide-in-right">
            {sidebarContent}
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:shrink-0 border-r border-zinc-800 bg-zinc-900 h-full">
        {sidebarContent}
      </aside>

      {/* Main content */}
      <div ref={contentRef} className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 sm:px-8 py-10 sm:py-16">
          <SectionContent
            index={activeSection}
            onNext={goNext}
            onFinish={handleFinish}
            isLast={activeSection === sections.length - 1}
          />
        </div>
      </div>

      {/* Confetti overlay */}
      {showConfetti && <ConfettiOverlay />}
    </div>
  );
}

/* ───── Section Content ───── */

function SectionContent({ index, onNext, onFinish, isLast }: { index: number; onNext: () => void; onFinish: () => void; isLast: boolean }) {
  const section = sections[index];

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-3 mb-2">
        <section.icon className="w-6 h-6 text-amber-500" />
        <span className="text-xs font-semibold text-amber-500 uppercase tracking-wider">Seção {index + 1} de {sections.length}</span>
      </div>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-8 tracking-tight">{section.title}</h1>

      {index === 0 && <Section1 />}
      {index === 1 && <Section2 />}
      {index === 2 && <Section3 />}
      {index === 3 && <Section4 />}
      {index === 4 && <Section5 />}
      {index === 5 && <Section6 />}
      {index === 6 && <Section7 />}
      {index === 7 && <Section8 />}
      {index === 8 && <Section9 onFinish={onFinish} />}

      <div className="mt-12 pt-6 border-t border-zinc-800">
        {isLast ? (
          <button
            onClick={onFinish}
            className="w-full py-4 rounded-xl bg-amber-500 text-black font-bold text-lg hover:bg-amber-400 transition-colors flex items-center justify-center gap-2"
          >
            <PartyPopper className="w-5 h-5" /> Começar agora →
          </button>
        ) : (
          <button
            onClick={onNext}
            className="w-full py-3.5 rounded-xl bg-amber-500 text-black font-bold hover:bg-amber-400 transition-colors flex items-center justify-center gap-2"
          >
            Próxima seção <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

/* ───── Reusable card ───── */
function DarkCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-xl border border-zinc-800 bg-zinc-900/80 p-5", className)}>
      {children}
    </div>
  );
}

/* ───── Section 1 ───── */
function Section1() {
  const examples = [
    { icon: "📝", text: "Você faz uma pergunta → ela te dá um resumo" },
    { icon: "📄", text: "Você dá instruções → ele redige um memorando" },
    { icon: "📊", text: "Você fornece uma planilha → ela encontra padrões" },
    { icon: "🖼️", text: "Você dá um comando → ele cria uma imagem" },
    { icon: "🎯", text: "Você define um objetivo → ela descobre os passos" },
  ];
  return (
    <div className="space-y-6">
      <DarkCard className="border-amber-500/30 bg-amber-500/5">
        <p className="text-lg sm:text-xl font-medium text-white leading-relaxed">
          "A Inteligência Artificial (IA) é um software capaz de receber uma <span className="text-amber-400 font-semibold">entrada</span> e gerar uma <span className="text-amber-400 font-semibold">saída</span> que normalmente exigiria esforço humano."
        </p>
      </DarkCard>
      <div className="grid gap-3">
        {examples.map((e, i) => (
          <DarkCard key={i} className="flex items-center gap-4 py-4">
            <span className="text-2xl">{e.icon}</span>
            <span className="text-zinc-300 text-sm">{e.text}</span>
          </DarkCard>
        ))}
      </div>
    </div>
  );
}

/* ───── Section 2 ───── */
function Section2() {
  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <DarkCard className="border-amber-500/30">
          <div className="flex items-center gap-2 mb-3">
            <Bot className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold text-white">Assistente</h3>
          </div>
          <p className="text-zinc-400 text-sm leading-relaxed">Você diz exatamente o que quer, passo a passo. A IA executa cada instrução como um co-piloto obediente.</p>
        </DarkCard>
        <DarkCard className="border-amber-500/30">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold text-white">Agente</h3>
          </div>
          <p className="text-zinc-400 text-sm leading-relaxed">Você define o objetivo e a IA descobre como chegar lá. Ela planeja, decide e executa com autonomia.</p>
        </DarkCard>
      </div>
      <DarkCard className="bg-zinc-800/50 text-center">
        <p className="text-zinc-300 text-sm italic">
          "É como a diferença entre <span className="text-amber-400 font-medium">ajudar a cozinhar</span> vs <span className="text-amber-400 font-medium">pedir para alguém fazer o jantar inteiro</span>."
        </p>
      </DarkCard>
    </div>
  );
}

/* ───── Section 3 ───── */
function Section3() {
  const models = [
    { icon: PenTool, label: "Escrever", desc: "Textos, e-mails, propostas" },
    { icon: Code, label: "Programar", desc: "Código, automações, sistemas" },
    { icon: Search, label: "Pesquisar", desc: "Dados, fontes, tendências" },
    { icon: Image, label: "Gerar imagens", desc: "Visuais, diagramas, arte" },
  ];
  return (
    <div className="space-y-6">
      <DarkCard className="border-amber-500/30 bg-amber-500/5">
        <p className="text-zinc-200 text-sm leading-relaxed">
          O <span className="text-amber-400 font-semibold">modelo</span> é o motor (cérebro) por trás do sistema de IA. Diferentes modelos são otimizados para diferentes tarefas.
        </p>
      </DarkCard>
      <div className="grid grid-cols-2 gap-3">
        {models.map((m, i) => (
          <DarkCard key={i} className="text-center py-6">
            <m.icon className="w-8 h-8 text-amber-500 mx-auto mb-3" />
            <h4 className="font-bold text-white text-sm mb-1">{m.label}</h4>
            <p className="text-zinc-500 text-xs">{m.desc}</p>
          </DarkCard>
        ))}
      </div>
      <DarkCard className="border-orange-500/40 bg-orange-500/5">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
          <p className="text-zinc-300 text-sm">O problema geralmente não é a IA — é usar a <span className="text-orange-400 font-semibold">ferramenta errada</span>, com o <span className="text-orange-400 font-semibold">modelo errado</span>, para a <span className="text-orange-400 font-semibold">tarefa errada</span>.</p>
        </div>
      </DarkCard>
    </div>
  );
}

/* ───── Section 4 ───── */
function Section4() {
  const myths = [
    { myth: "A IA não é tão boa assim", reality: "A IA muda rápido. Julgamentos antigos estão desatualizados. O que não funcionava há 6 meses pode ser incrível hoje." },
    { myth: "Dá pra saber quando foi feito por IA", reality: "Hoje é muito menos confiável detectar isso. A qualidade do output melhora a cada semana." },
    { myth: "Mas a IA tem alucinações", reality: "É real, mas gerenciável com uso correto. Peça fontes, verifique e use como ponto de partida." },
    { myth: "Você precisa ser expert em prompts", reality: "Você precisa de clareza, não de fórmulas secretas. Contexto claro > prompt elaborado." },
  ];
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {myths.map((m, i) => (
        <DarkCard key={i}>
          <span className="inline-block w-7 h-7 rounded-full bg-amber-500/20 text-amber-500 font-bold text-sm flex items-center justify-center mb-3">{i + 1}</span>
          <p className="text-white font-semibold text-sm mb-2">"{m.myth}"</p>
          <p className="text-zinc-400 text-sm leading-relaxed">{m.reality}</p>
        </DarkCard>
      ))}
    </div>
  );
}

/* ───── Section 5 ───── */
function Section5() {
  const steps = ["Você pergunta", "Ele responde", "Você corrige", "Ele ajusta", "Você esclarece", "Melhora"];
  return (
    <div className="space-y-6">
      <DarkCard className="border-amber-500/30 bg-amber-500/5 text-center">
        <p className="text-white font-semibold text-lg">"Pare de tratar a IA como máquina de venda automática."</p>
      </DarkCard>

      <DarkCard>
        <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold mb-4">Ciclo iterativo</p>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className={cn(
                "px-3 py-1.5 rounded-full text-xs font-semibold",
                i % 2 === 0 ? "bg-amber-500/20 text-amber-400" : "bg-zinc-800 text-zinc-300"
              )}>{s}</span>
              {i < steps.length - 1 && <ChevronRight className="w-3 h-3 text-zinc-600" />}
            </div>
          ))}
        </div>
      </DarkCard>

      <DarkCard className="bg-zinc-800/50">
        <p className="text-zinc-300 text-sm leading-relaxed">
          A IA funciona melhor quando <span className="text-amber-400 font-semibold">sabe mais</span>. Dê contexto: seus objetivos, seu público, seu tom, suas restrições.
        </p>
      </DarkCard>
    </div>
  );
}

/* ───── Section 6 ───── */
function Section6() {
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
        <DarkCard key={i} className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-amber-500/15 flex items-center justify-center shrink-0">
            <t.icon className="w-5 h-5 text-amber-500" />
          </div>
          <div>
            <h4 className="font-bold text-white text-sm">{t.title}</h4>
            <p className="text-zinc-400 text-xs">{t.desc}</p>
          </div>
        </DarkCard>
      ))}
    </div>
  );
}

/* ───── Section 7 ───── */
function Section7() {
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
        <DarkCard key={i} className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-amber-500/15 flex items-center justify-center shrink-0 mt-0.5">
            <c.icon className="w-4 h-4 text-amber-500" />
          </div>
          <div>
            <h4 className="font-bold text-white text-sm">{c.title}</h4>
            <p className="text-zinc-500 text-xs">{c.desc}</p>
          </div>
        </DarkCard>
      ))}
    </div>
  );
}

/* ───── Section 8 ───── */
function Section8() {
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
        <DarkCard key={i} className="border-orange-500/30">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-white text-sm mb-1">{r.title}</h4>
              <p className="text-zinc-400 text-sm">{r.desc}</p>
            </div>
          </div>
        </DarkCard>
      ))}
    </div>
  );
}

/* ───── Section 9 ───── */
function Section9({ onFinish }: { onFinish: () => void }) {
  const actions = [
    "Escolha um tema para pesquisar",
    "Faça o upload de um documento para analisar",
    "Peça ajuda para refletir estrategicamente",
    "Use para escrever um rascunho",
    "Construa algo pequeno",
  ];
  return (
    <div className="space-y-6">
      <DarkCard className="border-amber-500/30 bg-amber-500/5 text-center">
        <p className="text-white font-semibold text-lg">"Não comece memorizando jargões. Comece com seu <span className="text-amber-400">trabalho real</span>."</p>
      </DarkCard>
      <DarkCard>
        <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold mb-4">Ações práticas para hoje</p>
        <div className="space-y-3">
          {actions.map((a, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</div>
              <span className="text-zinc-300 text-sm">{a}</span>
            </div>
          ))}
        </div>
      </DarkCard>
    </div>
  );
}

/* ───── Confetti ───── */
function ConfettiOverlay() {
  return (
    <div className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center">
      <div className="text-center animate-scale-in">
        <div className="text-6xl mb-4">🎉</div>
        <p className="text-2xl font-bold text-white">Parabéns!</p>
        <p className="text-zinc-400 mt-1">Você concluiu o curso de Introdução à IA</p>
      </div>
      {Array.from({ length: 40 }).map((_, i) => (
        <span
          key={i}
          className="absolute w-2 h-2 rounded-full animate-bounce"
          style={{
            backgroundColor: ["#f59e0b", "#ef4444", "#3b82f6", "#10b981", "#a855f7", "#f97316"][i % 6],
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${1 + Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
}
