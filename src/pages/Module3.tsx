import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  TrendingUp, Users, Megaphone, Settings, Scale, DollarSign,
  UserCheck, Cpu, AlertTriangle, ArrowRight, ArrowLeft, CheckCircle2, Share2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Tool {
  name: string;
  useCase: string;
  example: string;
}

interface Area {
  id: string;
  name: string;
  icon: React.ElementType;
  subtitle: string;
  bottlenecks: string[];
  before: string[];
  after: string[];
  automations: { title: string; desc: string }[];
  tools: Tool[];
  caseStudy: { title: string; desc: string; result: string };
}

const TOOL_COLORS: Record<string, string> = {
  ChatGPT: "bg-emerald-100 text-emerald-700",
  Claude: "bg-orange-100 text-orange-700",
  n8n: "bg-red-100 text-red-700",
  Lovable: "bg-purple-100 text-purple-700",
  Perplexity: "bg-blue-100 text-blue-700",
  NotebookLM: "bg-yellow-100 text-yellow-700",
  Gemini: "bg-sky-100 text-sky-700",
  Cursor: "bg-slate-100 text-slate-700",
};

const areas: Area[] = [
  {
    id: "vendas",
    name: "Vendas",
    icon: TrendingUp,
    subtitle: "Venda mais em menos tempo com IA",
    bottlenecks: [
      "Prospecção manual e demorada",
      "Propostas que levam horas para preparar",
      "Follow-ups esquecidos e inconsistentes",
    ],
    before: [
      "Pesquisa manual de prospects no LinkedIn e Google",
      "Propostas genéricas escritas do zero",
      "Follow-ups dependem da memória do vendedor",
    ],
    after: [
      "IA pesquisa, qualifica e prioriza leads automaticamente",
      "Propostas personalizadas geradas em 10 minutos",
      "Sequências automáticas de follow-up com IA",
    ],
    automations: [
      { title: "Enriquecimento de leads", desc: "IA pesquisa dados do prospect e gera briefing pré-reunião automaticamente." },
      { title: "Geração de propostas", desc: "Insira dados básicos e a IA monta a proposta completa personalizada." },
      { title: "Follow-up inteligente", desc: "IA sugere o melhor momento e mensagem para cada follow-up." },
    ],
    tools: [
      {
        name: "ChatGPT",
        useCase: "Escrever e-mails de prospecção personalizados em segundos",
        example: "\"Crie um e-mail para o diretor de TI da [empresa] que usa SAP e tem 200 funcionários, falando sobre nossa solução de integração\"",
      },
      {
        name: "n8n",
        useCase: "Automatizar follow-up: lead sem resposta em 3 dias dispara e-mail gerado por IA automaticamente",
        example: "Fluxo: CRM detecta lead parado → n8n aciona ChatGPT → gera mensagem personalizada → envia pelo Gmail",
      },
      {
        name: "Lovable",
        useCase: "Criar landing pages de proposta comercial personalizadas por cliente — sem precisar de dev",
        example: "Página interativa com calculadora de ROI, depoimentos e CTA direto para o WhatsApp do vendedor",
      },
      {
        name: "Perplexity",
        useCase: "Pesquisar o prospect antes da reunião: notícias, concorrentes, desafios do setor",
        example: "\"Quais são os principais desafios de empresas de logística com 500+ funcionários no Brasil em 2024?\"",
      },
    ],
    caseStudy: {
      title: "Empresa de SaaS B2B",
      desc: "Implementou IA na geração de propostas comerciais e follow-ups.",
      result: "Redução de 75% no tempo de proposta e aumento de 35% na taxa de conversão em 3 meses.",
    },
  },
  {
    id: "cs",
    name: "Customer Success",
    icon: Users,
    subtitle: "Retenção proativa com inteligência artificial",
    bottlenecks: [
      "Identificação tardia de clientes em risco",
      "Onboarding inconsistente entre CSMs",
      "Health score subjetivo e desatualizado",
    ],
    before: [
      "Análise manual de engajamento",
      "Playbooks genéricos para todos os clientes",
      "QBR preparada manualmente em horas",
    ],
    after: [
      "Score de saúde calculado por IA em tempo real",
      "Playbooks personalizados por perfil do cliente",
      "QBR gerada automaticamente com insights da IA",
    ],
    automations: [
      { title: "Detecção de churn", desc: "IA analisa sinais de uso e alerta sobre clientes em risco antes que seja tarde." },
      { title: "Onboarding automático", desc: "Fluxo personalizado de onboarding adaptado ao perfil de cada cliente." },
      { title: "QBR automatizada", desc: "IA consolida métricas, insights e recomendações para a reunião trimestral." },
    ],
    tools: [
      {
        name: "ChatGPT",
        useCase: "Gerar QBR personalizada para cada cliente em minutos com base nos dados de uso",
        example: "\"Com base nesses dados de uso [cole os dados], crie um relatório trimestral destacando conquistas, riscos e próximos passos para o cliente [nome]\"",
      },
      {
        name: "n8n",
        useCase: "Fluxo de alerta de churn: cliente sem login há 7 dias aciona alerta automático para o CSM",
        example: "n8n verifica engajamento diário → detecta inatividade → ChatGPT sugere abordagem → CSM recebe no Slack com contexto pronto",
      },
      {
        name: "NotebookLM",
        useCase: "Analisar centenas de respostas de NPS e agrupar temas recorrentes em minutos",
        example: "Carregue o export do NPS e pergunte: \"Quais os 5 principais motivos de insatisfação? Quais clientes têm risco de churn?\"",
      },
      {
        name: "Lovable",
        useCase: "Criar portais de sucesso do cliente com métricas em tempo real — sem código",
        example: "Dashboard para o cliente acompanhar o próprio uso, metas e histórico de atendimento",
      },
    ],
    caseStudy: {
      title: "Plataforma de educação",
      desc: "Implementou detecção de churn com IA e onboarding automatizado.",
      result: "Redução de 40% no churn dos primeiros 90 dias e NPS subiu de 42 para 67.",
    },
  },
  {
    id: "marketing",
    name: "Marketing",
    icon: Megaphone,
    subtitle: "Criação e análise em escala com IA",
    bottlenecks: [
      "Criação de conteúdo lenta e cara",
      "Análise de campanhas reativa",
      "Personalização limitada pela equipe",
    ],
    before: [
      "Briefing → agência → revisões → publicação (semanas)",
      "Relatórios manuais no final do mês",
      "Mesmo e-mail marketing para toda a base",
    ],
    after: [
      "Conteúdo criado e adaptado por IA em horas",
      "Dashboards com insights em tempo real",
      "Hiperpersonalização por segmento com IA",
    ],
    automations: [
      { title: "Geração de conteúdo", desc: "IA cria posts, artigos e copies adaptados para cada canal e persona." },
      { title: "Análise de performance", desc: "IA identifica padrões e sugere otimizações em campanhas ativas." },
      { title: "E-mails personalizados", desc: "IA segmenta e personaliza comunicações em escala." },
    ],
    tools: [
      {
        name: "ChatGPT",
        useCase: "Adaptar um post para 5 canais diferentes em uma única prompt",
        example: "\"Adapte esse conteúdo [cole o texto] para LinkedIn (formal), Instagram (descontraído), Twitter (curto), e-mail (direto) e WhatsApp (casual)\"",
      },
      {
        name: "n8n",
        useCase: "Pipeline automático: artigo publicado no blog → gera versões para redes sociais → agenda nos canais",
        example: "Webhook do CMS → n8n → ChatGPT gera 5 variações → agenda no Buffer → notifica equipe no Slack",
      },
      {
        name: "Lovable",
        useCase: "Criar landing pages e páginas de captura de leads sem precisar de desenvolvedor",
        example: "Página de webinar pronta em 30 minutos: formulário, countdown, integração com RD Station",
      },
      {
        name: "NotebookLM",
        useCase: "Analisar pesquisas de mercado, relatórios de competitors e extrair insights estratégicos",
        example: "Carregue 10 relatórios do setor e pergunte: \"Quais tendências se repetem? O que nossos concorrentes não estão fazendo?\"",
      },
    ],
    caseStudy: {
      title: "E-commerce de moda",
      desc: "Adotou IA para criação de conteúdo e personalização de e-mails.",
      result: "Produção de conteúdo 5x mais rápida e taxa de abertura de e-mails subiu 28%.",
    },
  },
  {
    id: "operacoes",
    name: "Operações",
    icon: Settings,
    subtitle: "Eficiência operacional com automação inteligente",
    bottlenecks: [
      "Processos manuais e repetitivos",
      "Falta de visibilidade em tempo real",
      "Dependência de planilhas para tudo",
    ],
    before: [
      "Relatórios consolidados manualmente toda semana",
      "Processos dependem de e-mail e memória",
      "Dashboards desatualizados e estáticos",
    ],
    after: [
      "Relatórios gerados automaticamente por IA",
      "Fluxos automatizados com alertas inteligentes",
      "Dashboards vivos com previsões da IA",
    ],
    automations: [
      { title: "Relatórios automáticos", desc: "IA consolida dados de múltiplas fontes e gera relatórios semanais." },
      { title: "Alertas proativos", desc: "IA monitora KPIs e alerta quando algo sai do esperado." },
      { title: "Otimização de processos", desc: "IA analisa fluxos e sugere melhorias baseadas em dados." },
    ],
    tools: [
      {
        name: "n8n",
        useCase: "Automatizar fluxos de aprovação, alertas de SLA e integrações entre sistemas sem código",
        example: "Fluxo de compras: solicitação no formulário → aprovação por e-mail → lança no ERP → notifica fornecedor — tudo automático",
      },
      {
        name: "ChatGPT",
        useCase: "Documentar processos e criar SOPs completos em minutos",
        example: "\"Com base nessa gravação de tela [ou descrição], crie um SOP passo a passo com prints, responsáveis e tempo estimado\"",
      },
      {
        name: "Lovable",
        useCase: "Criar dashboards operacionais internos com dados em tempo real — sem dev",
        example: "Painel de acompanhamento de SLA, tickets abertos e performance de fornecedores acessível pelo celular",
      },
      {
        name: "Gemini",
        useCase: "Analisar planilhas enormes do Google Sheets diretamente com perguntas em linguagem natural",
        example: "\"Qual fornecedor teve mais atrasos no último trimestre? Qual o custo médio por categoria?\" — sem precisar de fórmulas",
      },
    ],
    caseStudy: {
      title: "Empresa de logística",
      desc: "Automatizou relatórios operacionais e monitoramento de KPIs com IA.",
      result: "Economia de 12 horas semanais e redução de 60% nos atrasos de entrega.",
    },
  },
  {
    id: "juridico",
    name: "Jurídico",
    icon: Scale,
    subtitle: "Análise jurídica em minutos, não em dias",
    bottlenecks: [
      "Revisão de contratos lenta e cara",
      "Pesquisa jurisprudencial demorada",
      "Volume crescente de compliance",
    ],
    before: [
      "Contratos revisados manualmente linha por linha",
      "Pesquisa de jurisprudência em bases desatualizadas",
      "Checklists de compliance em planilhas",
    ],
    after: [
      "IA destaca cláusulas de risco e sugere alterações",
      "Pesquisa inteligente com resumos automáticos",
      "Compliance automatizado com alertas de IA",
    ],
    automations: [
      { title: "Revisão de contratos", desc: "IA analisa contratos e destaca cláusulas de risco em minutos." },
      { title: "Pesquisa jurídica", desc: "IA pesquisa jurisprudência e legislação relevante automaticamente." },
      { title: "Compliance automático", desc: "IA monitora mudanças regulatórias e alerta sobre impactos." },
    ],
    tools: [
      {
        name: "Claude",
        useCase: "Revisar contratos longos e identificar cláusulas abusivas, ambíguas ou de risco",
        example: "\"Revise esse contrato de prestação de serviços, destaque cláusulas que favorecem o contratante em detrimento do contratado e sugira redações alternativas\"",
      },
      {
        name: "Perplexity",
        useCase: "Pesquisar jurisprudência atualizada com fontes verificadas e links para os acórdãos",
        example: "\"Quais são os precedentes do STJ sobre rescisão indireta por falta de pagamento de salário nos últimos 2 anos?\"",
      },
      {
        name: "ChatGPT",
        useCase: "Redigir minutas de contratos simples, NDAs e termos de uso rapidamente",
        example: "\"Crie um NDA entre duas empresas para compartilhamento de dados de clientes, com vigência de 2 anos e foro em São Paulo\"",
      },
      {
        name: "NotebookLM",
        useCase: "Analisar legislação, regulamentos e normas internas para responder dúvidas de compliance",
        example: "Carregue a LGPD, as normas internas e os contratos → pergunte: \"Nossa política de dados está em conformidade?\"",
      },
    ],
    caseStudy: {
      title: "Escritório de advocacia",
      desc: "Adotou IA para revisão de contratos e pesquisa jurisprudencial.",
      result: "Tempo de revisão caiu 70% e capacidade de atendimento dobrou sem contratar.",
    },
  },
  {
    id: "financeiro",
    name: "Financeiro",
    icon: DollarSign,
    subtitle: "Análises financeiras precisas e rápidas",
    bottlenecks: [
      "Conciliação manual demorada",
      "Previsões baseadas em intuição",
      "Relatórios que demoram dias",
    ],
    before: [
      "Conciliação bancária feita em planilhas",
      "Forecast baseado em médias simples",
      "Relatórios financeiros montados manualmente",
    ],
    after: [
      "Conciliação automatizada com IA",
      "Previsões com machine learning e múltiplas variáveis",
      "Relatórios gerados automaticamente com insights",
    ],
    automations: [
      { title: "Conciliação automática", desc: "IA cruza dados bancários com lançamentos e identifica divergências." },
      { title: "Forecast inteligente", desc: "IA analisa histórico e variáveis externas para previsões precisas." },
      { title: "Relatórios automáticos", desc: "IA gera relatórios financeiros com análise de variações e tendências." },
    ],
    tools: [
      {
        name: "ChatGPT",
        useCase: "Analisar planilhas financeiras e gerar narrativa executiva para relatórios",
        example: "\"Analise esses dados financeiros [cole a tabela] e escreva um comentário executivo de 3 parágrafos explicando variações, riscos e recomendações\"",
      },
      {
        name: "n8n",
        useCase: "Automatizar relatórios: coleta dados do ERP → consolida → envia PDF por e-mail toda segunda-feira",
        example: "Trigger semanal → n8n puxa dados do sistema → monta relatório → converte em PDF → envia para diretoria automaticamente",
      },
      {
        name: "NotebookLM",
        useCase: "Analisar relatórios de mercado, balanços de concorrentes e gerar análise comparativa",
        example: "Carregue os balanços dos últimos 3 anos e pergunte: \"Quais indicadores pioraram? Onde estão as maiores oportunidades de melhoria?\"",
      },
      {
        name: "Gemini",
        useCase: "Analisar grandes volumes de dados no Google Sheets com perguntas em linguagem natural",
        example: "\"Qual centro de custo teve maior desvio do orçado? Quais despesas cresceram mais que a receita?\" — sem fórmulas complexas",
      },
    ],
    caseStudy: {
      title: "Rede de varejo",
      desc: "Implementou IA para forecast de vendas e conciliação.",
      result: "Precisão do forecast subiu de 72% para 94% e conciliação que levava 2 dias agora leva 2 horas.",
    },
  },
  {
    id: "rh",
    name: "RH",
    icon: UserCheck,
    subtitle: "Gestão de pessoas potencializada por IA",
    bottlenecks: [
      "Triagem de currículos manual",
      "Engajamento difícil de medir",
      "Processos burocráticos consomem o time",
    ],
    before: [
      "RH lê centenas de currículos manualmente",
      "Pesquisa de clima anual e genérica",
      "Onboarding com checklist em papel",
    ],
    after: [
      "IA faz triagem e ranking de candidatos",
      "Análise contínua de engajamento por IA",
      "Onboarding automatizado e personalizado",
    ],
    automations: [
      { title: "Triagem inteligente", desc: "IA analisa currículos e ranqueia candidatos por aderência à vaga." },
      { title: "Análise de engajamento", desc: "IA monitora sinais de engajamento e alerta sobre riscos de turnover." },
      { title: "Onboarding automático", desc: "IA personaliza o onboarding baseado no cargo e perfil do novo colaborador." },
    ],
    tools: [
      {
        name: "ChatGPT",
        useCase: "Criar descrições de vagas atraentes e analisar currículos por aderência ao perfil",
        example: "\"Analise esses 10 currículos [cole os textos] e ranqueie os candidatos para a vaga de [cargo], justificando os pontos fortes e fracos de cada um\"",
      },
      {
        name: "n8n",
        useCase: "Fluxo de onboarding automático: novo colaborador no sistema dispara toda a sequência de boas-vindas",
        example: "Admissão no RH → n8n envia e-mail de boas-vindas → agenda reuniões → cria acessos → envia kit onboarding — sem intervenção manual",
      },
      {
        name: "NotebookLM",
        useCase: "Analisar pesquisas de clima e eNPS para extrair padrões e temas recorrentes",
        example: "Carregue todas as respostas da pesquisa e pergunte: \"Quais os 5 principais motivos de insatisfação por área? O que os colaboradores mais elogiam?\"",
      },
      {
        name: "Lovable",
        useCase: "Criar portal do colaborador com informações de benefícios, políticas e onboarding",
        example: "Hub interno com guia de benefícios, organograma, calendário de eventos e FAQ de RH — sem precisar de TI",
      },
    ],
    caseStudy: {
      title: "Empresa de tecnologia",
      desc: "Adotou IA na triagem de currículos e análise de engajamento.",
      result: "Tempo de contratação caiu 45% e turnover nos primeiros 6 meses reduziu 30%.",
    },
  },
  {
    id: "produto",
    name: "Produto/Tech",
    icon: Cpu,
    subtitle: "Desenvolvimento e produto acelerados por IA",
    bottlenecks: [
      "Backlog gigante e priorização difícil",
      "Documentação sempre desatualizada",
      "Debug e code review demorados",
    ],
    before: [
      "Priorização por intuição e pressão política",
      "Docs escritas manualmente (quando escritas)",
      "Code review humano para cada PR",
    ],
    after: [
      "IA analisa dados de uso para priorizar features",
      "Documentação gerada automaticamente por IA",
      "Code review assistido por IA com sugestões",
    ],
    automations: [
      { title: "Priorização por dados", desc: "IA analisa métricas de produto e sugere priorização baseada em impacto." },
      { title: "Docs automáticas", desc: "IA gera e atualiza documentação técnica automaticamente." },
      { title: "Code review com IA", desc: "IA revisa código, identifica bugs e sugere melhorias antes do merge." },
    ],
    tools: [
      {
        name: "Cursor",
        useCase: "Escrever código, debugar e refatorar com IA inline no próprio editor — como ter um sênior ao lado",
        example: "Seleciona o código com bug → Ctrl+K → \"Por que esse código está quebrando? Corrija e explique o que mudou\" — recebe a correção em segundos",
      },
      {
        name: "Lovable",
        useCase: "Criar protótipos funcionais de novas features em horas — sem escrever código",
        example: "\"Crie uma tela de dashboard com gráfico de receita mensal, tabela de usuários ativos e filtro por período\" — protótipo navegável em 20 minutos",
      },
      {
        name: "ChatGPT",
        useCase: "Gerar documentação técnica, user stories e critérios de aceitação a partir de descrições",
        example: "\"Transforme esse rascunho de feature [descreva] em user stories no formato Gherkin com critérios de aceite e edge cases\"",
      },
      {
        name: "n8n",
        useCase: "Automatizar pipelines: PR merged → roda testes → notifica Slack → cria task no Jira",
        example: "PR aprovado no GitHub → n8n aciona CI → se testes passarem, abre task de deploy no Jira → avisa o time no Slack automaticamente",
      },
    ],
    caseStudy: {
      title: "Startup de fintech",
      desc: "Implementou IA para priorização de backlog e code review.",
      result: "Velocidade de entrega subiu 40% e bugs em produção caíram 55%.",
    },
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

      {/* Social Media Banner */}
      {(activeAreaId === "marketing" || activeAreaId === "cs") && (
        <div className="mb-6 animate-fade-in">
          <div className="p-5 rounded-xl border-2 border-primary/30 bg-gradient-to-r from-violet-50 to-sky-50">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Share2 className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-foreground mb-1">
                  Você trabalha com Social Media ou Marketing de Conteúdo?
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Preparamos um guia específico com as ferramentas certas para a sua rotina.
                </p>
                <Link
                  to="/social-media"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all hover:shadow-sm"
                >
                  Ver guia para Social Media →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

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

        {/* Tools in Practice */}
        <section className="mb-8">
          <h3 className="text-lg font-bold text-foreground mb-1">Ferramentas na prática</h3>
          <p className="text-sm text-muted-foreground mb-4">
            O que você pode fazer agora, com exemplos reais de prompts e fluxos.
          </p>
          <div className="grid gap-3">
            {activeArea.tools.map((tool, i) => (
              <div
                key={i}
                className="p-4 rounded-lg border border-border bg-card hover:border-primary/20 hover:shadow-sm transition-all"
              >
                <div className="flex items-start gap-3">
                  <span
                    className={cn(
                      "px-2.5 py-1 rounded-full text-[11px] font-bold shrink-0 mt-0.5",
                      TOOL_COLORS[tool.name] || "bg-muted text-muted-foreground"
                    )}
                  >
                    {tool.name}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground mb-1.5">{tool.useCase}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed italic">{tool.example}</p>
                  </div>
                </div>
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
