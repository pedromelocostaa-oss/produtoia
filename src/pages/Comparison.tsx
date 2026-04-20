import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2, Crown, Star, DollarSign, Users, Zap } from "lucide-react";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

// ─── Section 1: Por Tipo de Tarefa ───────────────────────────────────────────

interface TaskRow {
  task: string;
  taskIcon: string;
  best: string;
  bestColor: string;
  why: string;
  runnerUp?: string;
}

const taskRows: TaskRow[] = [
  {
    task: "Escrever textos longos / documentos",
    taskIcon: "📝",
    best: "Claude",
    bestColor: "bg-orange-100 text-orange-700 border-orange-200",
    why: "Melhor raciocínio e coesão em textos extensos — mantém o contexto até o fim",
    runnerUp: "ChatGPT",
  },
  {
    task: "Pesquisa com fontes verificadas",
    taskIcon: "🔍",
    best: "Perplexity",
    bestColor: "bg-blue-100 text-blue-700 border-blue-200",
    why: "Cita fontes reais e atualizadas — não alucina tanto quanto os outros",
    runnerUp: "Claude",
  },
  {
    task: "E-mails e documentos no Google",
    taskIcon: "📧",
    best: "Gemini",
    bestColor: "bg-sky-100 text-sky-700 border-sky-200",
    why: "Integrado nativamente no Gmail, Docs, Sheets e Meet — sem copiar e colar",
    runnerUp: "ChatGPT",
  },
  {
    task: "E-mails e documentos no Microsoft",
    taskIcon: "💼",
    best: "Copilot",
    bestColor: "bg-indigo-100 text-indigo-700 border-indigo-200",
    why: "Integrado no Outlook, Word, Excel e Teams — aparece onde você já trabalha",
    runnerUp: "ChatGPT",
  },
  {
    task: "Analisar contratos e documentos",
    taskIcon: "📋",
    best: "Claude",
    bestColor: "bg-orange-100 text-orange-700 border-orange-200",
    why: "Maior janela de contexto do mercado — analisa documentos inteiros com precisão",
    runnerUp: "NotebookLM",
  },
  {
    task: "Gerar imagens",
    taskIcon: "🎨",
    best: "Gemini Imagen / DALL-E",
    bestColor: "bg-pink-100 text-pink-700 border-pink-200",
    why: "Gemini mais realista para fotos; DALL-E (no ChatGPT) mais versátil para arte",
    runnerUp: "–",
  },
  {
    task: "Criar apresentações",
    taskIcon: "📊",
    best: "Gamma.app",
    bestColor: "bg-purple-100 text-purple-700 border-purple-200",
    why: "Gera slides completos com design profissional a partir de um briefing — melhor da categoria",
    runnerUp: "Copilot",
  },
  {
    task: "Automação e integrações",
    taskIcon: "⚙️",
    best: "n8n",
    bestColor: "bg-red-100 text-red-700 border-red-200",
    why: "Visual, poderoso e gratuito no self-hosted — conecta qualquer ferramenta sem código",
    runnerUp: "Zapier",
  },
  {
    task: "Código e sistemas",
    taskIcon: "💻",
    best: "Claude Code / Cursor",
    bestColor: "bg-slate-100 text-slate-700 border-slate-200",
    why: "Claude Code entende projetos inteiros; Cursor integra IA direto no editor de código",
    runnerUp: "ChatGPT",
  },
  {
    task: "Criar apps sem código",
    taskIcon: "🚀",
    best: "Lovable",
    bestColor: "bg-rose-100 text-rose-700 border-rose-200",
    why: "Do prompt ao app funcional com banco de dados — sem escrever uma linha de código",
    runnerUp: "Bolt",
  },
  {
    task: "Base de conhecimento dos seus docs",
    taskIcon: "📚",
    best: "NotebookLM",
    bestColor: "bg-emerald-100 text-emerald-700 border-emerald-200",
    why: "Faz perguntas sobre seus próprios documentos — respostas com referência à fonte exata",
    runnerUp: "Claude",
  },
  {
    task: "Transcrição de reuniões",
    taskIcon: "🎙️",
    best: "tl;dv / Fireflies",
    bestColor: "bg-teal-100 text-teal-700 border-teal-200",
    why: "Entra nas reuniões, transcreve tudo e entrega resumo automático com itens de ação",
    runnerUp: "Otter.ai",
  },
  {
    task: "Chat geral e brainstorming",
    taskIcon: "💬",
    best: "ChatGPT",
    bestColor: "bg-green-100 text-green-700 border-green-200",
    why: "Mais versátil, maior ecossistema de plugins e o melhor para explorar ideias livremente",
    runnerUp: "Claude",
  },
  {
    task: "Perguntas rápidas e pesquisa",
    taskIcon: "⚡",
    best: "Perplexity",
    bestColor: "bg-blue-100 text-blue-700 border-blue-200",
    why: "Respostas diretas com fontes — mais rápido e confiável que o Google para pesquisa",
    runnerUp: "ChatGPT",
  },
  {
    task: "Delegação de tarefas complexas",
    taskIcon: "🤝",
    best: "Claude Cowork",
    bestColor: "bg-amber-100 text-amber-700 border-amber-200",
    why: "Múltiplos agentes trabalhando em paralelo — delega projetos inteiros e recebe de volta pronto",
    runnerUp: "ChatGPT",
  },
];

// ─── Section 2: Por Perfil Profissional ───────────────────────────────────────

interface ProfileCard {
  role: string;
  roleIcon: string;
  color: string;
  stack: string[];
  primaryUse: string;
}

const profiles: ProfileCard[] = [
  {
    role: "Analista / Coordenador",
    roleIcon: "📊",
    color: "border-blue-200 bg-blue-50",
    stack: ["ChatGPT", "Perplexity", "NotebookLM"],
    primaryUse: "Pesquisa rápida, resumo de documentos e análise de dados",
  },
  {
    role: "Gerente / Diretor",
    roleIcon: "🎯",
    color: "border-violet-200 bg-violet-50",
    stack: ["Claude", "n8n", "Lovable", "tl;dv"],
    primaryUse: "Documentos estratégicos, automações e reuniões sem perder decisões",
  },
  {
    role: "Vendas",
    roleIcon: "💰",
    color: "border-green-200 bg-green-50",
    stack: ["ChatGPT", "Perplexity", "n8n"],
    primaryUse: "Pesquisa de prospects, propostas e automação de follow-ups",
  },
  {
    role: "Marketing",
    roleIcon: "📣",
    color: "border-pink-200 bg-pink-50",
    stack: ["ChatGPT", "Gemini", "Gamma", "Fireflies"],
    primaryUse: "Conteúdo, campanhas, apresentações e resumo de reuniões de briefing",
  },
  {
    role: "Jurídico",
    roleIcon: "⚖️",
    color: "border-slate-200 bg-slate-50",
    stack: ["Claude", "Perplexity", "NotebookLM"],
    primaryUse: "Análise de contratos, pesquisa de legislação e base de conhecimento",
  },
  {
    role: "Tech / Produto",
    roleIcon: "💻",
    color: "border-cyan-200 bg-cyan-50",
    stack: ["Claude Code", "Cursor", "n8n"],
    primaryUse: "Código, automações e especificações técnicas",
  },
  {
    role: "RH",
    roleIcon: "👥",
    color: "border-rose-200 bg-rose-50",
    stack: ["ChatGPT", "NotebookLM", "n8n"],
    primaryUse: "Vagas, onboarding, PDIs e automação de processos repetitivos",
  },
];

// ─── Section 3: Gratuito vs Pago ─────────────────────────────────────────────

interface FreeRow {
  tool: string;
  color: string;
  freeTier: string;
  paid?: string;
  paidValue?: string;
}

const freeVsPaid: FreeRow[] = [
  {
    tool: "ChatGPT",
    color: "bg-green-500",
    freeTier: "GPT-4o mini — ótimo para uso diário casual",
    paid: "ChatGPT Plus — R$100/mês",
    paidValue: "Necessário para o4 e plugins avançados",
  },
  {
    tool: "Claude",
    color: "bg-orange-500",
    freeTier: "Claude 3.5 Sonnet — melhor modelo gratuito de análise",
    paid: "Claude Pro — R$100/mês",
    paidValue: "Vale para uso intenso: mais mensagens, projetos e upload de arquivos",
  },
  {
    tool: "Gemini",
    color: "bg-sky-500",
    freeTier: "Gemini 2.0 Flash — integrado no Google Workspace",
    paid: "Gemini Advanced — R$100/mês",
    paidValue: "Mais uso e integração com Drive empresarial",
  },
  {
    tool: "Perplexity",
    color: "bg-blue-600",
    freeTier: "5 pesquisas por dia com fontes básicas",
    paid: "Perplexity Pro — ~R$100/mês",
    paidValue: "Vale para quem faz pesquisa intensa de mercado ou competidores",
  },
  {
    tool: "NotebookLM",
    color: "bg-emerald-600",
    freeTier: "100% gratuito — sem limites práticos para uso individual",
    paid: undefined,
    paidValue: undefined,
  },
  {
    tool: "tl;dv",
    color: "bg-teal-600",
    freeTier: "10 reuniões/mês com resumo automático — suficiente para começar",
    paid: "tl;dv Pro — ~R$200/mês",
    paidValue: "Para equipes com muitas reuniões ou que precisam de CRM integration",
  },
  {
    tool: "n8n",
    color: "bg-red-600",
    freeTier: "Self-hosted gratuito — instale no seu servidor e use sem limite",
    paid: "n8n Cloud — ~R$100/mês",
    paidValue: "Para quem não quer gerenciar servidor próprio",
  },
  {
    tool: "Lovable",
    color: "bg-rose-600",
    freeTier: "Créditos gratuitos para criar seus primeiros apps",
    paid: "Planos a partir de R$100/mês",
    paidValue: "Para projetos em produção e apps com usuários reais",
  },
];

export default function Comparison() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Breadcrumb */}
      <div className="mb-6 animate-fade-in">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          Voltar ao início
        </Link>
      </div>

      {/* Header */}
      <div className="mb-10 animate-fade-in" style={{ animationDelay: "50ms", opacity: 0 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wider mb-4">
          <Star className="w-3 h-3" />
          Guia de Referência
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 bg-gradient-to-r from-purple-600 via-violet-600 to-blue-600 bg-clip-text text-transparent">
          Qual IA Usar para Cada Tarefa?
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
          Pare de adivinhar — saiba exatamente qual ferramenta escolher para cada situação do seu trabalho.
        </p>
      </div>

      {/* ── SECTION 1: Por Tipo de Tarefa ─────────────────────────────────── */}
      <section className="mb-14 animate-fade-in" style={{ animationDelay: "100ms", opacity: 0 }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-xl bg-purple-100 flex items-center justify-center">
            <Zap className="w-4 h-4 text-purple-600" />
          </div>
          <h2 className="text-xl font-bold text-foreground">Por Tipo de Tarefa</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-6 ml-11">
          Encontre a ferramenta certa para o que você precisa fazer agora.
        </p>

        {/* Desktop table */}
        <div className="hidden sm:block rounded-2xl border border-border overflow-hidden shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-5 py-3.5 text-xs font-bold text-muted-foreground uppercase tracking-wider w-[40%]">Tarefa</th>
                <th className="text-left px-5 py-3.5 text-xs font-bold text-muted-foreground uppercase tracking-wider w-[15%]">Melhor opção</th>
                <th className="text-left px-5 py-3.5 text-xs font-bold text-muted-foreground uppercase tracking-wider">Por quê</th>
                <th className="text-left px-5 py-3.5 text-xs font-bold text-muted-foreground uppercase tracking-wider w-[12%]">2ª opção</th>
              </tr>
            </thead>
            <tbody>
              {taskRows.map((row, i) => (
                <tr
                  key={i}
                  className={cn(
                    "border-b border-border/50 hover:bg-muted/20 transition-colors",
                    i === taskRows.length - 1 && "border-b-0"
                  )}
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg">{row.taskIcon}</span>
                      <span className="text-sm font-medium text-foreground">{row.task}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={cn("text-xs font-bold px-2.5 py-1 rounded-full border", row.bestColor)}>
                      {row.best}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">{row.why}</p>
                  </td>
                  <td className="px-5 py-4">
                    {row.runnerUp && row.runnerUp !== "–" && (
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md font-medium">
                        {row.runnerUp}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="sm:hidden space-y-3">
          {taskRows.map((row, i) => (
            <div key={i} className="p-4 rounded-xl border border-border bg-card">
              <div className="flex items-start gap-3 mb-3">
                <span className="text-xl">{row.taskIcon}</span>
                <p className="text-sm font-semibold text-foreground leading-snug">{row.task}</p>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Crown className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span className={cn("text-xs font-bold px-2 py-0.5 rounded-full border", row.bestColor)}>{row.best}</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{row.why}</p>
              {row.runnerUp && row.runnerUp !== "–" && (
                <p className="text-xs text-muted-foreground mt-2">2ª opção: <span className="font-medium text-foreground">{row.runnerUp}</span></p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 2: Por Perfil Profissional ────────────────────────────── */}
      <section className="mb-14 animate-fade-in" style={{ animationDelay: "150ms", opacity: 0 }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-xl bg-violet-100 flex items-center justify-center">
            <Users className="w-4 h-4 text-violet-600" />
          </div>
          <h2 className="text-xl font-bold text-foreground">Por Perfil Profissional</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-6 ml-11">
          O stack recomendado para cada função — comece pelas ferramentas da sua área.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {profiles.map((profile, i) => (
            <div
              key={i}
              className={cn(
                "p-5 rounded-2xl border-2 hover:shadow-md transition-all duration-200",
                profile.color
              )}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{profile.roleIcon}</span>
                <h3 className="font-bold text-foreground text-sm">{profile.role}</h3>
              </div>

              <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{profile.primaryUse}</p>

              <div className="space-y-1.5">
                {profile.stack.map((tool, j) => (
                  <div key={j} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />
                    <span className="text-sm font-medium text-foreground">{tool}</span>
                    {j === 0 && (
                      <span className="text-[9px] font-bold bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full uppercase tracking-wider ml-auto">
                        Principal
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 3: Gratuito vs Pago ───────────────────────────────────── */}
      <section className="mb-14 animate-fade-in" style={{ animationDelay: "200ms", opacity: 0 }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center">
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <h2 className="text-xl font-bold text-foreground">Gratuito vs Pago</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-6 ml-11">
          A maioria entrega enorme valor de graça. Pague só o que você usar todo dia.
        </p>

        {/* Summary banner */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 mb-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <p className="font-bold text-foreground mb-1">Estratégia recomendada</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Comece grátis com todas as ferramentas. Use por 2-3 semanas e identifique <strong className="text-foreground">qual você abre todos os dias</strong>. Só então pague. A maioria dos profissionais precisa pagar no máximo 1 ou 2 ferramentas.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {freeVsPaid.map((row, i) => (
            <div
              key={i}
              className="p-4 rounded-xl border border-border bg-card hover:border-purple-200 hover:shadow-sm transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={cn("w-2.5 h-2.5 rounded-full", row.color)} />
                <span className="font-bold text-foreground">{row.tool}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Free tier */}
                <div className="flex items-start gap-2.5 p-3 rounded-lg bg-emerald-50 border border-emerald-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-0.5">Grátis</p>
                    <p className="text-xs text-foreground leading-relaxed">{row.freeTier}</p>
                  </div>
                </div>
                {/* Paid tier */}
                {row.paid ? (
                  <div className="flex items-start gap-2.5 p-3 rounded-lg bg-amber-50 border border-amber-100">
                    <Crown className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] font-bold text-amber-600 uppercase tracking-wider mb-0.5">{row.paid}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{row.paidValue}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-2.5 p-3 rounded-lg bg-muted/50 border border-border">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-muted-foreground leading-relaxed">Sem plano pago necessário para uso individual</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Paid tiers summary */}
        <div className="mt-6 p-5 rounded-2xl border-2 border-amber-200 bg-amber-50">
          <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
            <Crown className="w-4 h-4 text-amber-500" />
            Quando realmente vale pagar
          </h3>
          <div className="space-y-2.5">
            {[
              { tool: "Claude Pro — R$100/mês", desc: "Se você usa Claude todos os dias para documentos longos, contratos ou relatórios" },
              { tool: "ChatGPT Plus — R$100/mês", desc: "Se você precisa do modelo o4 ou usa plugins avançados como Code Interpreter" },
              { tool: "Perplexity Pro — ~R$100/mês", desc: "Se você faz pesquisa de mercado, competidores ou legislação com frequência alta" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                <div>
                  <span className="text-sm font-semibold text-foreground">{item.tool}</span>
                  <span className="text-sm text-muted-foreground"> — {item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ────────────────────────────────────────────────────── */}
      <section className="animate-fade-in" style={{ animationDelay: "250ms", opacity: 0 }}>
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-purple-600 via-violet-600 to-blue-600 text-white shadow-xl shadow-purple-500/20">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-14 h-14 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
              <Zap className="w-7 h-7" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">Pronto para colocar em prática?</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                Agora que você sabe qual ferramenta usar, explore os prompts prontos para cada situação profissional.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                to="/modulo-4"
                className="flex items-center gap-2 bg-white text-purple-700 px-5 py-2.5 rounded-xl font-semibold text-sm hover:shadow-md hover:scale-[1.02] transition-all"
              >
                Ver Prompts Prontos
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/modulo-2"
                className="flex items-center gap-2 bg-white/15 text-white border border-white/20 px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-white/25 transition-all"
              >
                Explorar Ferramentas
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <Link
            to="/modulo-2"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Módulo 2 — Ferramentas
          </Link>
          <Link
            to="/modulo-4"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-purple-600 text-white font-semibold text-sm hover:bg-purple-700 transition-all"
          >
            Módulo 4 — Prompts
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
