import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  TrendingUp, Users, Megaphone, Settings, Scale, DollarSign,
  UserCheck, Cpu, AlertTriangle, ArrowRight, ArrowLeft, CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Area {
  id: string;
  name: string;
  icon: React.ElementType;
  subtitle: string;
  bottlenecks: string[];
  before: string[];
  after: string[];
  automations: { title: string; desc: string }[];
  caseStudy: { title: string; desc: string; result: string };
}

const areas: Area[] = [
  {
    id: "vendas", name: "Vendas", icon: TrendingUp, subtitle: "Venda mais em menos tempo com IA",
    bottlenecks: ["Prospecção manual e demorada", "Propostas que levam horas para preparar", "Follow-ups esquecidos e inconsistentes"],
    before: ["Pesquisa manual de prospects no LinkedIn e Google", "Propostas genéricas escritas do zero", "Follow-ups dependem da memória do vendedor"],
    after: ["IA pesquisa, qualifica e prioriza leads automaticamente", "Propostas personalizadas geradas em 10 minutos", "Sequências automáticas de follow-up com IA"],
    automations: [
      { title: "Enriquecimento de leads", desc: "IA pesquisa dados do prospect e gera briefing pré-reunião automaticamente." },
      { title: "Geração de propostas", desc: "Insira dados básicos e a IA monta a proposta completa personalizada." },
      { title: "Follow-up inteligente", desc: "IA sugere o melhor momento e mensagem para cada follow-up." },
    ],
    caseStudy: { title: "Empresa de SaaS B2B", desc: "Implementou IA na geração de propostas comerciais e follow-ups.", result: "Redução de 75% no tempo de proposta e aumento de 35% na taxa de conversão em 3 meses." },
  },
  {
    id: "cs", name: "Customer Success", icon: Users, subtitle: "Retenção proativa com inteligência artificial",
    bottlenecks: ["Identificação tardia de clientes em risco", "Onboarding inconsistente entre CSMs", "Health score subjetivo e desatualizado"],
    before: ["Análise manual de engajamento", "Playbooks genéricos para todos os clientes", "QBR preparada manualmente em horas"],
    after: ["Score de saúde calculado por IA em tempo real", "Playbooks personalizados por perfil do cliente", "QBR gerada automaticamente com insights da IA"],
    automations: [
      { title: "Detecção de churn", desc: "IA analisa sinais de uso e alerta sobre clientes em risco antes que seja tarde." },
      { title: "Onboarding automático", desc: "Fluxo personalizado de onboarding adaptado ao perfil de cada cliente." },
      { title: "QBR automatizada", desc: "IA consolida métricas, insights e recomendações para a reunião trimestral." },
    ],
    caseStudy: { title: "Plataforma de educação", desc: "Implementou detecção de churn com IA e onboarding automatizado.", result: "Redução de 40% no churn dos primeiros 90 dias e NPS subiu de 42 para 67." },
  },
  {
    id: "marketing", name: "Marketing", icon: Megaphone, subtitle: "Criação e análise em escala com IA",
    bottlenecks: ["Criação de conteúdo lenta e cara", "Análise de campanhas reativa", "Personalização limitada pela equipe"],
    before: ["Briefing → agência → revisões → publicação (semanas)", "Relatórios manuais no final do mês", "Mesmo e-mail marketing para toda a base"],
    after: ["Conteúdo criado e adaptado por IA em horas", "Dashboards com insights em tempo real", "Hiperpersonalização por segmento com IA"],
    automations: [
      { title: "Geração de conteúdo", desc: "IA cria posts, artigos e copies adaptados para cada canal e persona." },
      { title: "Análise de performance", desc: "IA identifica padrões e sugere otimizações em campanhas ativas." },
      { title: "E-mails personalizados", desc: "IA segmenta e personaliza comunicações em escala." },
    ],
    caseStudy: { title: "E-commerce de moda", desc: "Adotou IA para criação de conteúdo e personalização de e-mails.", result: "Produção de conteúdo 5x mais rápida e taxa de abertura de e-mails subiu 28%." },
  },
  {
    id: "operacoes", name: "Operações", icon: Settings, subtitle: "Eficiência operacional com automação inteligente",
    bottlenecks: ["Processos manuais e repetitivos", "Falta de visibilidade em tempo real", "Dependência de planilhas para tudo"],
    before: ["Relatórios consolidados manualmente toda semana", "Processos dependem de e-mail e memória", "Dashboards desatualizados e estáticos"],
    after: ["Relatórios gerados automaticamente por IA", "Fluxos automatizados com alertas inteligentes", "Dashboards vivos com previsões da IA"],
    automations: [
      { title: "Relatórios automáticos", desc: "IA consolida dados de múltiplas fontes e gera relatórios semanais." },
      { title: "Alertas proativos", desc: "IA monitora KPIs e alerta quando algo sai do esperado." },
      { title: "Otimização de processos", desc: "IA analisa fluxos e sugere melhorias baseadas em dados." },
    ],
    caseStudy: { title: "Empresa de logística", desc: "Automatizou relatórios operacionais e monitoramento de KPIs com IA.", result: "Economia de 12 horas semanais e redução de 60% nos atrasos de entrega." },
  },
  {
    id: "juridico", name: "Jurídico", icon: Scale, subtitle: "Análise jurídica em minutos, não em dias",
    bottlenecks: ["Revisão de contratos lenta e cara", "Pesquisa jurisprudencial demorada", "Volume crescente de compliance"],
    before: ["Contratos revisados manualmente linha por linha", "Pesquisa de jurisprudência em bases desatualizadas", "Checklists de compliance em planilhas"],
    after: ["IA destaca cláusulas de risco e sugere alterações", "Pesquisa inteligente com resumos automáticos", "Compliance automatizado com alertas de IA"],
    automations: [
      { title: "Revisão de contratos", desc: "IA analisa contratos e destaca cláusulas de risco em minutos." },
      { title: "Pesquisa jurídica", desc: "IA pesquisa jurisprudência e legislação relevante automaticamente." },
      { title: "Compliance automático", desc: "IA monitora mudanças regulatórias e alerta sobre impactos." },
    ],
    caseStudy: { title: "Escritório de advocacia", desc: "Adotou IA para revisão de contratos e pesquisa jurisprudencial.", result: "Tempo de revisão caiu 70% e capacidade de atendimento dobrou sem contratar." },
  },
  {
    id: "financeiro", name: "Financeiro", icon: DollarSign, subtitle: "Análises financeiras precisas e rápidas",
    bottlenecks: ["Conciliação manual demorada", "Previsões baseadas em intuição", "Relatórios que demoram dias"],
    before: ["Conciliação bancária feita em planilhas", "Forecast baseado em médias simples", "Relatórios financeiros montados manualmente"],
    after: ["Conciliação automatizada com IA", "Previsões com machine learning e múltiplas variáveis", "Relatórios gerados automaticamente com insights"],
    automations: [
      { title: "Conciliação automática", desc: "IA cruza dados bancários com lançamentos e identifica divergências." },
      { title: "Forecast inteligente", desc: "IA analisa histórico e variáveis externas para previsões precisas." },
      { title: "Relatórios automáticos", desc: "IA gera relatórios financeiros com análise de variações e tendências." },
    ],
    caseStudy: { title: "Rede de varejo", desc: "Implementou IA para forecast de vendas e conciliação.", result: "Precisão do forecast subiu de 72% para 94% e conciliação que levava 2 dias agora leva 2 horas." },
  },
  {
    id: "rh", name: "RH", icon: UserCheck, subtitle: "Gestão de pessoas potencializada por IA",
    bottlenecks: ["Triagem de currículos manual", "Engajamento difícil de medir", "Processos burocráticos consomem o time"],
    before: ["RH lê centenas de currículos manualmente", "Pesquisa de clima anual e genérica", "Onboarding com checklist em papel"],
    after: ["IA faz triagem e ranking de candidatos", "Análise contínua de engajamento por IA", "Onboarding automatizado e personalizado"],
    automations: [
      { title: "Triagem inteligente", desc: "IA analisa currículos e ranqueia candidatos por aderência à vaga." },
      { title: "Análise de engajamento", desc: "IA monitora sinais de engajamento e alerta sobre riscos de turnover." },
      { title: "Onboarding automático", desc: "IA personaliza o onboarding baseado no cargo e perfil do novo colaborador." },
    ],
    caseStudy: { title: "Empresa de tecnologia", desc: "Adotou IA na triagem de currículos e análise de engajamento.", result: "Tempo de contratação caiu 45% e turnover nos primeiros 6 meses reduziu 30%." },
  },
  {
    id: "produto", name: "Produto/Tech", icon: Cpu, subtitle: "Desenvolvimento e produto acelerados por IA",
    bottlenecks: ["Backlog gigante e priorização difícil", "Documentação sempre desatualizada", "Debug e code review demorados"],
    before: ["Priorização por intuição e pressão política", "Docs escritas manualmente (quando escritas)", "Code review humano para cada PR"],
    after: ["IA analisa dados de uso para priorizar features", "Documentação gerada automaticamente por IA", "Code review assistido por IA com sugestões"],
    automations: [
      { title: "Priorização por dados", desc: "IA analisa métricas de produto e sugere priorização baseada em impacto." },
      { title: "Docs automáticas", desc: "IA gera e atualiza documentação técnica automaticamente." },
      { title: "Code review com IA", desc: "IA revisa código, identifica bugs e sugere melhorias antes do merge." },
    ],
    caseStudy: { title: "Startup de fintech", desc: "Implementou IA para priorização de backlog e code review.", result: "Velocidade de entrega subiu 40% e bugs em produção caíram 55%." },
  },
];

export default function Module3() {
  const [activeAreaId, setActiveAreaId] = useState(areas[0].id);
  const activeArea = areas.find((a) => a.id === activeAreaId)!;

  useEffect(() => {
    const stored = localStorage.getItem("virada-visited");
    const arr: string[] = stored ? JSON.parse(stored) : [];
    if (!arr.includes("modulo-3")) {
      arr.push("modulo-3");
      localStorage.setItem("virada-visited", JSON.stringify(arr));
    }
  }, []);

  const currentIdx = areas.findIndex((a) => a.id === activeAreaId);

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
        <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Módulo 3</div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight mb-3">IA na Sua Área</h1>
        <p className="text-lg text-muted-foreground">
          Aplicações práticas e fluxos de trabalho transformados para cada função profissional.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 pb-4 border-b border-border animate-fade-in" style={{ animationDelay: "100ms", opacity: 0 }}>
        {areas.map((area) => (
          <button
            key={area.id}
            onClick={() => setActiveAreaId(area.id)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200",
              activeAreaId === area.id
                ? "bg-primary text-primary-foreground shadow-sm scale-105"
                : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
            )}
          >
            {area.name}
          </button>
        ))}
      </div>

      {/* Area Content */}
      <div key={activeArea.id} className="animate-fade-in">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center shrink-0">
            <activeArea.icon className="w-6 h-6 text-accent-foreground" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">{activeArea.name}</h2>
            <p className="text-muted-foreground">{activeArea.subtitle}</p>
          </div>
        </div>

        {/* Bottlenecks */}
        <section className="mb-8">
          <h3 className="text-lg font-bold text-foreground mb-3">Gargalos atuais</h3>
          <div className="space-y-2">
            {activeArea.bottlenecks.map((b, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg border border-border bg-card hover:border-destructive/20 transition-colors">
                <AlertTriangle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">{b}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Before / After */}
        <section className="mb-8">
          <h3 className="text-lg font-bold text-foreground mb-3">Antes e depois</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg border border-border bg-card">
              <h4 className="text-sm font-semibold text-destructive mb-3">❌ Sem IA</h4>
              <ul className="space-y-2">
                {activeArea.before.map((b, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="shrink-0">•</span>{b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-4 rounded-lg border border-primary/20 bg-accent">
              <h4 className="text-sm font-semibold text-primary mb-3">✅ Com IA</h4>
              <ul className="space-y-2">
                {activeArea.after.map((a, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />{a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Automations */}
        <section className="mb-8">
          <h3 className="text-lg font-bold text-foreground mb-3">3 automações práticas</h3>
          <div className="grid gap-3">
            {activeArea.automations.map((a, i) => (
              <div key={i} className="p-4 rounded-lg border border-border bg-card hover:border-primary/20 hover:shadow-sm transition-all">
                <h4 className="font-semibold text-foreground text-sm mb-1">{a.title}</h4>
                <p className="text-sm text-muted-foreground">{a.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Case Study */}
        <section className="mb-8">
          <h3 className="text-lg font-bold text-foreground mb-3">Caso prático real</h3>
          <div className="p-5 rounded-lg bg-surface border border-border">
            <h4 className="font-semibold text-foreground mb-2">{activeArea.caseStudy.title}</h4>
            <p className="text-sm text-muted-foreground mb-3">{activeArea.caseStudy.desc}</p>
            <div className="flex items-start gap-2 p-3 rounded-md bg-accent">
              <TrendingUp className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <p className="text-sm font-medium text-foreground">{activeArea.caseStudy.result}</p>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Link
            to="/modulo-2"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Módulo 2
          </Link>
          <Link
            to="/modulo-4"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 hover:shadow-md transition-all"
          >
            Módulo 4 — Prompts Prontos
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
