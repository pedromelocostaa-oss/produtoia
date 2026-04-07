import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  MessageSquare, Brain, Users, Terminal, Search, Laptop,
  Heart, MousePointerClick, Workflow, Globe, BookOpenCheck,
  ArrowRight, ArrowLeft, Play, Lightbulb, ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Tool {
  id: string;
  name: string;
  icon: React.ElementType;
  tag: string;
  tagline: string;
  what: string;
  why: string[];
  useCases: { title: string; desc: string }[];
  video: string;
  tip: string;
}

const tools: Tool[] = [
  {
    id: "chatgpt", name: "ChatGPT", icon: MessageSquare, tag: "Assistente IA",
    tagline: "O assistente de IA mais usado do mundo",
    what: "A maioria usa só para pesquisas simples — mas ele é capaz de muito mais. Escreve, analisa, resume, cria, responde e executa tarefas completas.",
    why: ["Funciona para qualquer área profissional", "Versão gratuita já entrega muito valor", "Interface intuitiva e conversa natural"],
    useCases: [
      { title: "E-mails profissionais", desc: "Rascunho de e-mails profissionais em segundos com tom e contexto adequados." },
      { title: "Análise de documentos", desc: "Análise de documentos e contratos destacando pontos críticos." },
      { title: "Preparação para reuniões", desc: "Preparação para reuniões e apresentações com pontos-chave estruturados." },
    ],
    video: "Como usar ChatGPT no trabalho — guia prático",
    tip: "Comece pedindo para o ChatGPT resumir um documento que você recebeu hoje. É o caso de uso mais rápido para sentir o poder da ferramenta.",
  },
  {
    id: "claude", name: "Claude", icon: Brain, tag: "Assistente IA",
    tagline: "Precisão e profundidade em análise de textos",
    what: "Modelo de IA da Anthropic, reconhecido pela precisão, clareza e capacidade de lidar com documentos longos.",
    why: ["Análise profunda de textos e documentos", "Escrita profissional de alto nível", "Raciocínio estruturado para decisões complexas"],
    useCases: [
      { title: "Revisão de contratos", desc: "Revisão e análise de contratos identificando riscos e oportunidades." },
      { title: "Síntese de relatórios", desc: "Síntese de relatórios extensos em resumos executivos." },
      { title: "Comunicações estratégicas", desc: "Escrita de propostas e comunicações estratégicas de alto impacto." },
    ],
    video: "Claude para profissionais — análise e escrita",
    tip: "Envie um relatório longo para o Claude e peça: 'Resuma em 5 pontos-chave e 3 ações recomendadas'. Você vai se impressionar.",
  },
  {
    id: "claude-cowork", name: "Claude Cowork", icon: Users, tag: "Equipe IA",
    tagline: "Múltiplos assistentes trabalhando em paralelo",
    what: "Modo do Claude que permite rodar múltiplos assistentes em paralelo, cada um executando uma tarefa diferente ao mesmo tempo.",
    why: ["Como ter uma equipe extra instantânea", "Executa tarefas de ponta a ponta", "Mostra o plano antes de executar para você aprovar"],
    useCases: [
      { title: "Análise de churn", desc: "Mapear clientes em risco de churn em paralelo com diferentes critérios." },
      { title: "Pesquisa consolidada", desc: "Pesquisar e consolidar dados de múltiplas fontes simultaneamente." },
      { title: "Delegação complexa", desc: "Delegar tarefas complexas que levariam horas para serem concluídas." },
    ],
    video: "Claude Cowork — como delegar para múltiplas IAs",
    tip: "Experimente pedir ao Claude Cowork para executar 3 tarefas ao mesmo tempo: pesquisar, analisar e recomendar — tudo em paralelo.",
  },
  {
    id: "claude-code", name: "Claude Code", icon: Terminal, tag: "Criação de Apps",
    tagline: "De linguagem natural a código funcional",
    what: "Ferramenta que transforma linguagem natural em código e sistemas funcionais — sem precisar saber programar.",
    why: ["Descreva o que precisa em português e ele executa", "Constrói, ajusta e corrige sistemas", "Ideal para criar ferramentas internas sem depender de TI"],
    useCases: [
      { title: "Painéis internos", desc: "Criar painéis internos de acompanhamento de métricas do time." },
      { title: "Relatórios automáticos", desc: "Automatizar relatórios recorrentes que hoje são feitos manualmente." },
      { title: "Formulários do zero", desc: "Construir formulários e sistemas simples do zero descrevendo o que precisa." },
    ],
    video: "Claude Code — crie sistemas sem programar",
    tip: "Descreva em português um problema do seu dia a dia e peça para o Claude Code criar uma solução. Comece simples: um formulário ou uma calculadora.",
  },
  {
    id: "gemini", name: "Gemini", icon: Search, tag: "Assistente IA",
    tagline: "IA do Google integrada ao workspace",
    what: "IA do Google integrada nativamente ao Gmail, Google Docs, Sheets e Meet.",
    why: ["Funciona dentro das ferramentas que você já usa", "Analisa planilhas e documentos do Drive", "Resume reuniões do Google Meet automaticamente"],
    useCases: [
      { title: "E-mails longos", desc: "Resumir threads longas de e-mail em pontos de ação claros." },
      { title: "Relatórios de planilhas", desc: "Gerar relatórios a partir de planilhas com gráficos e insights." },
      { title: "Documentos rápidos", desc: "Criar documentos e apresentações com um comando de voz." },
    ],
    video: "Gemini no Google Workspace — guia completo",
    tip: "Se você usa Google Workspace, ative o Gemini e peça para resumir sua caixa de entrada. Você vai economizar 30 minutos por dia.",
  },
  {
    id: "copilot", name: "Microsoft Copilot", icon: Laptop, tag: "Assistente IA",
    tagline: "IA dentro do pacote Office",
    what: "IA integrada ao pacote Office — Word, Excel, PowerPoint e Teams.",
    why: ["Funciona dentro do ambiente corporativo que você já conhece", "Gera apresentações, analisa dados e resume reuniões", "Ideal para quem vive no ecossistema Microsoft"],
    useCases: [
      { title: "PowerPoint automático", desc: "Criar apresentações do PowerPoint automaticamente a partir de um briefing." },
      { title: "Insights no Excel", desc: "Analisar planilhas do Excel e gerar insights visuais instantâneos." },
      { title: "Resumo do Teams", desc: "Resumir reuniões do Teams com action items e responsáveis." },
    ],
    video: "Microsoft Copilot para profissionais",
    tip: "Na próxima reunião do Teams, ative o Copilot e peça um resumo com action items ao final. Pronto — ata de reunião nunca mais.",
  },
  {
    id: "lovable", name: "Lovable", icon: Heart, tag: "Criação de Apps",
    tagline: "Da ideia ao app rodando em minutos",
    what: "Plataforma onde você descreve o que quer em português e ela cria a aplicação pronta — sem programar.",
    why: ["Da ideia ao app rodando em minutos", "Backend incluso: banco de dados, login, e-mails", "Publica com um clique"],
    useCases: [
      { title: "Sistema de pedidos", desc: "Criar sistema de gestão de pedidos internos completo." },
      { title: "Formulários inteligentes", desc: "Construir formulários de aprovação com notificações automáticas." },
      { title: "Painéis do time", desc: "Montar painéis de acompanhamento para o time com dados em tempo real." },
    ],
    video: "Lovable — crie apps sem código",
    tip: "Descreva em uma frase o que seu time precisa e veja o Lovable criar a aplicação. Teste agora com algo simples como um formulário de feedback.",
  },
  {
    id: "cursor", name: "Cursor", icon: MousePointerClick, tag: "Criação de Apps",
    tagline: "Editor inteligente com contexto total do projeto",
    what: "Editor inteligente que entende o contexto do seu projeto inteiro e executa mudanças quando você descreve o que precisa.",
    why: ["Você conversa em linguagem natural", "Entende todo o contexto do projeto", "Modo Agent faz mudanças em várias partes ao mesmo tempo"],
    useCases: [
      { title: "Painel de SLAs", desc: "Criar painel interno de acompanhamento de SLAs e métricas." },
      { title: "Ajustes sem dev", desc: "Ajustar sistemas existentes sem depender de desenvolvedor." },
      { title: "Scripts de automação", desc: "Construir scripts de automação descrevendo o que precisa em português." },
    ],
    video: "Cursor — programação com IA na prática",
    tip: "Abra o Cursor, selecione um trecho de código ou texto e peça uma melhoria. Veja como ele entende o contexto e sugere algo melhor.",
  },
  {
    id: "n8n", name: "n8n", icon: Workflow, tag: "Automação",
    tagline: "Automação visual sem código",
    what: "Plataforma visual de automação que conecta suas ferramentas e cria fluxos automáticos sem escrever código.",
    why: ["+400 integrações prontas com ferramentas populares", "Interface de arrastar e soltar intuitiva", "Pode usar IA dentro dos fluxos de automação"],
    useCases: [
      { title: "Lead → CRM automático", desc: "Quando lead preenche formulário → enriquecer perfil com IA → registrar no CRM → notificar vendedor." },
      { title: "Relatórios semanais", desc: "Automatizar geração de relatórios semanais consolidando dados de múltiplas fontes." },
      { title: "Classificação de e-mails", desc: "Classificar e-mails automaticamente por urgência e tipo usando IA." },
    ],
    video: "n8n — automação visual com IA",
    tip: "Crie seu primeiro fluxo: 'Quando receber um e-mail com assunto X → classificar com IA → enviar para o canal certo no Slack'. Leva 15 minutos.",
  },
  {
    id: "perplexity", name: "Perplexity", icon: Globe, tag: "Pesquisa IA",
    tagline: "Respostas completas com fontes verificadas",
    what: "Motor de busca com IA que entrega respostas completas com fontes verificadas — não apenas links.",
    why: ["Respostas com citações e fontes verificáveis", "Atualizado em tempo real com dados recentes", "Ideal para pesquisas profissionais rápidas"],
    useCases: [
      { title: "Pesquisa de concorrentes", desc: "Pesquisar concorrentes antes de uma reunião com dados atualizados." },
      { title: "Dados de mercado", desc: "Levantar dados de mercado com fontes confiáveis em minutos." },
      { title: "Legislação", desc: "Entender legislações e regulamentações rapidamente com referências." },
    ],
    video: "Perplexity — pesquisa profissional com IA",
    tip: "Antes da próxima reunião com um prospect, pesquise no Perplexity: 'Principais desafios do setor [X] em 2025'. Você vai impressionar.",
  },
  {
    id: "notebooklm", name: "NotebookLM", icon: BookOpenCheck, tag: "Base de Conhecimento",
    tagline: "Seus documentos viram uma base inteligente",
    what: "Ferramenta do Google que transforma seus documentos em uma base de conhecimento inteligente que você pode interrogar.",
    why: ["Faça perguntas sobre seus próprios arquivos", "Cria resumos, guias e podcasts a partir dos seus documentos", "Gratuito e poderoso"],
    useCases: [
      { title: "Perguntas sobre contratos", desc: "Fazer perguntas específicas sobre um contrato extenso e receber respostas precisas." },
      { title: "Resumos de reuniões", desc: "Transformar atas de reunião em resumos estruturados com ações." },
      { title: "Guias de estudo", desc: "Criar guia de estudo a partir de documentos internos da empresa." },
    ],
    video: "NotebookLM — sua base de conhecimento com IA",
    tip: "Envie 3 documentos importantes do seu trabalho para o NotebookLM e faça uma pergunta que normalmente levaria 1 hora para responder.",
  },
];

export default function Module2() {
  const [activeToolId, setActiveToolId] = useState(tools[0].id);
  const activeTool = tools.find((t) => t.id === activeToolId)!;

  useEffect(() => {
    const stored = localStorage.getItem("virada-visited");
    const arr: string[] = stored ? JSON.parse(stored) : [];
    if (!arr.includes("modulo-2")) {
      arr.push("modulo-2");
      localStorage.setItem("virada-visited", JSON.stringify(arr));
    }
  }, []);

  const currentIdx = tools.findIndex((t) => t.id === activeToolId);
  const nextTool = currentIdx < tools.length - 1 ? tools[currentIdx + 1] : null;
  const prevTool = currentIdx > 0 ? tools[currentIdx - 1] : null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Breadcrumb */}
      <div className="mb-6 animate-fade-in">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          Voltar ao início
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8 animate-fade-in" style={{ animationDelay: "50ms", opacity: 0 }}>
        <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Módulo 2</div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight mb-3">As Ferramentas</h1>
        <p className="text-lg text-muted-foreground">
          As ferramentas que os profissionais mais valorizados já dominam — e como usar cada uma no seu trabalho.
        </p>
      </div>

      {/* Tool counter */}
      <div className="flex items-center justify-between mb-3 animate-fade-in" style={{ animationDelay: "80ms", opacity: 0 }}>
        <span className="text-xs text-muted-foreground font-medium">{currentIdx + 1} de {tools.length} ferramentas</span>
        <div className="flex gap-1">
          {tools.map((_, i) => (
            <div key={i} className={cn("w-2 h-2 rounded-full transition-all", i === currentIdx ? "bg-primary scale-125" : "bg-border")} />
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 pb-4 border-b border-border animate-fade-in" style={{ animationDelay: "100ms", opacity: 0 }}>
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => setActiveToolId(tool.id)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200",
              activeToolId === tool.id
                ? "bg-primary text-primary-foreground shadow-sm scale-105"
                : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
            )}
          >
            {tool.name}
          </button>
        ))}
      </div>

      {/* Tool Content */}
      <div key={activeTool.id} className="animate-fade-in">
        {/* Tool header */}
        <div className="flex items-start gap-4 mb-8">
          <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center shrink-0">
            <activeTool.icon className="w-6 h-6 text-accent-foreground" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-2xl font-bold text-foreground">{activeTool.name}</h2>
              <span className="text-[10px] font-semibold bg-primary/10 text-primary px-2 py-0.5 rounded-full uppercase tracking-wider">
                {activeTool.tag}
              </span>
            </div>
            <p className="text-muted-foreground">{activeTool.tagline}</p>
          </div>
        </div>

        {/* What */}
        <section className="mb-8">
          <h3 className="text-lg font-bold text-foreground mb-3">O que é</h3>
          <p className="text-muted-foreground leading-relaxed">{activeTool.what}</p>
        </section>

        {/* Why */}
        <section className="mb-8">
          <h3 className="text-lg font-bold text-foreground mb-3">Por que importa para você</h3>
          <ul className="space-y-2">
            {activeTool.why.map((w, i) => (
              <li key={i} className="flex items-start gap-2 text-muted-foreground">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Use Cases */}
        <section className="mb-8">
          <h3 className="text-lg font-bold text-foreground mb-3">Como usar no trabalho</h3>
          <div className="grid gap-3">
            {activeTool.useCases.map((uc, i) => (
              <div key={i} className="p-4 rounded-lg border border-border bg-card hover:border-primary/20 hover:shadow-sm transition-all">
                <h4 className="font-semibold text-foreground text-sm mb-1">{uc.title}</h4>
                <p className="text-sm text-muted-foreground">{uc.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Video */}
        <section className="mb-8">
          <h3 className="text-lg font-bold text-foreground mb-3">Vídeo recomendado</h3>
          <div className="p-4 rounded-lg border border-border bg-card hover:shadow-sm transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-20 h-14 rounded-lg bg-muted flex items-center justify-center shrink-0 group cursor-pointer hover:bg-muted/80 transition-colors">
                <Play className="w-6 h-6 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-foreground text-sm mb-1 truncate">{activeTool.video}</h4>
                <a href="#" className="inline-flex items-center gap-1 text-xs text-primary font-medium hover:underline">
                  Assistir no YouTube <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Assista este vídeo para ver a ferramenta funcionando na prática.
            </p>
          </div>
        </section>

        {/* Tip */}
        <section className="mb-8">
          <div className="p-4 rounded-lg border border-primary/30 bg-accent">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-accent-foreground shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-accent-foreground text-sm mb-1">Dica rápida</h4>
                <p className="text-sm text-muted-foreground">{activeTool.tip}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation between tools */}
        <div className="flex items-center justify-between">
          {prevTool ? (
            <button
              onClick={() => setActiveToolId(prevTool.id)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              {prevTool.name}
            </button>
          ) : (
            <Link
              to="/modulo-1"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Módulo 1
            </Link>
          )}

          {nextTool ? (
            <button
              onClick={() => {
                setActiveToolId(nextTool.id);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 hover:shadow-md transition-all"
            >
              {nextTool.name}
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <Link
              to="/modulo-3"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 hover:shadow-md transition-all"
            >
              Módulo 3 — IA na Sua Área
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
