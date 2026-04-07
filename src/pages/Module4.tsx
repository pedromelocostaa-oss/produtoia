import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Copy, Check, ArrowRight, ArrowLeft, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface Prompt {
  area: string;
  title: string;
  prompt: string;
  tip: string;
}

const areaColors: Record<string, string> = {
  Vendas: "bg-primary/10 text-primary",
  CS: "bg-emerald-500/10 text-emerald-600",
  Marketing: "bg-violet-500/10 text-violet-600",
  Operações: "bg-amber-500/10 text-amber-600",
  Jurídico: "bg-destructive/10 text-destructive",
  Financeiro: "bg-yellow-500/10 text-yellow-700",
  Desenvolvimento: "bg-cyan-500/10 text-cyan-600",
  RH: "bg-pink-500/10 text-pink-600",
};

const prompts: Prompt[] = [
  { area: "Vendas", title: "Pesquisa de prospect pré-reunião", prompt: "Aja como um analista de vendas B2B. Pesquise a empresa [NOME DA EMPRESA] e me forneça: 1) O que a empresa faz e seu mercado; 2) Principais desafios do setor; 3) Possíveis dores que nosso produto ([DESCREVA SEU PRODUTO]) pode resolver; 4) Sugestão de abordagem para a primeira reunião. Seja direto e prático.", tip: "Substitua os campos entre colchetes com informações reais. Quanto mais contexto, melhor o resultado." },
  { area: "Vendas", title: "Geração de proposta comercial", prompt: "Crie uma proposta comercial para [NOME DO CLIENTE], empresa do setor [SETOR], com [NÚMERO] funcionários. Nosso produto é [DESCRIÇÃO]. A proposta deve conter: resumo executivo, problemas identificados, solução proposta, benefícios esperados, investimento e próximos passos. Tom profissional e persuasivo.", tip: "Inclua dados reais do cliente para uma proposta mais personalizada." },
  { area: "Vendas", title: "E-mail de follow-up pós-reunião", prompt: "Escreva um e-mail de follow-up profissional para [NOME DO CONTATO] após nossa reunião sobre [ASSUNTO]. Pontos discutidos: [LISTE 3 PONTOS]. Próximo passo combinado: [DESCREVA]. Tom cordial, objetivo e que demonstre valor sem ser insistente. Máximo 150 palavras.", tip: "Envie no mesmo dia da reunião para maior impacto." },
  { area: "CS", title: "Análise de risco de churn", prompt: "Analise o seguinte cenário de cliente e avalie o risco de churn: Empresa: [NOME], Tempo de contrato: [X meses], Uso da plataforma: [ALTO/MÉDIO/BAIXO], Último contato: [DATA], Tickets abertos: [NÚMERO], NPS: [NOTA]. Classifique o risco (alto/médio/baixo), explique os sinais de alerta e sugira 3 ações imediatas de retenção.", tip: "Use dados reais do seu CRM para uma análise precisa." },
  { area: "CS", title: "Roteiro de QBR", prompt: "Crie um roteiro de QBR (Quarterly Business Review) para o cliente [NOME]. Dados: faturamento gerado pela plataforma: [R$X], features mais usadas: [LISTE], ROI estimado: [X%]. Estruture em: 1) Resultados do trimestre; 2) Valor entregue; 3) Oportunidades identificadas; 4) Roadmap relevante; 5) Próximos passos. Tom consultivo.", tip: "Personalize com métricas reais do cliente." },
  { area: "Marketing", title: "Criação de post para LinkedIn", prompt: "Crie um post para LinkedIn sobre [TEMA] para o perfil de [CARGO/NOME]. O post deve: começar com um gancho forte, contar uma história ou insight prático, ter entre 150-200 palavras, incluir uma pergunta de engajamento no final. Tom: profissional mas acessível. Não use emojis em excesso. Inclua sugestão de hashtags.", tip: "Posts com histórias pessoais ou dados surpreendentes performam melhor." },
  { area: "Marketing", title: "Briefing de campanha", prompt: "Crie um briefing de campanha de marketing para [PRODUTO/SERVIÇO]. Público-alvo: [DESCREVA]. Objetivo: [AWARENESS/LEADS/VENDAS]. Orçamento: [R$X]. Canais disponíveis: [LISTE]. Inclua: mensagem principal, 3 variações de headline, sugestão de CTA, métricas de sucesso e cronograma sugerido.", tip: "Quanto mais detalhado o público-alvo, melhor a segmentação." },
  { area: "Marketing", title: "Análise de concorrência", prompt: "Analise a estratégia de marketing digital dos seguintes concorrentes: [LISTE 3 CONCORRENTES]. Para cada um, identifique: posicionamento, canais principais, tipo de conteúdo, pontos fortes e fracos. Ao final, sugira 3 oportunidades de diferenciação para [SUA EMPRESA]. Base sua análise em padrões públicos observáveis.", tip: "Combine com pesquisa no Perplexity para dados mais atualizados." },
  { area: "Operações", title: "Mapeamento de processos", prompt: "Mapeie o processo de [NOME DO PROCESSO] da minha empresa. Etapas atuais: [DESCREVA]. Pessoas envolvidas: [LISTE]. Tempo médio atual: [X horas/dias]. Identifique: gargalos, etapas que podem ser automatizadas, riscos e sugestões de melhoria. Apresente em formato de fluxo simplificado.", tip: "Seja detalhista na descrição das etapas atuais." },
  { area: "Operações", title: "Dashboard de KPIs", prompt: "Defina um dashboard de KPIs operacionais para [ÁREA/DEPARTAMENTO]. Objetivo principal: [DESCREVA]. Sugira: 6-8 KPIs relevantes com meta sugerida, frequência de atualização, fonte de dados provável e formato de visualização ideal (gráfico, número, tabela). Priorize métricas acionáveis.", tip: "Comece com 4-5 KPIs e evolua conforme a maturidade." },
  { area: "Jurídico", title: "Revisão de cláusulas", prompt: "Revise as seguintes cláusulas contratuais e identifique: 1) Riscos potenciais para [MINHA EMPRESA]; 2) Cláusulas abusivas ou desequilibradas; 3) Pontos que precisam de esclarecimento; 4) Sugestões de alteração com justificativa. Cláusulas: [COLE AS CLÁUSULAS]. Nota: esta análise é preliminar e não substitui parecer jurídico formal.", tip: "Sempre valide com seu jurídico. A IA ajuda a priorizar o que revisar." },
  { area: "Jurídico", title: "Resumo de legislação", prompt: "Resuma a [NOME DA LEI/REGULAMENTAÇÃO] em linguagem acessível para profissionais não-jurídicos. Inclua: 1) Objetivo da lei; 2) A quem se aplica; 3) Principais obrigações; 4) Penalidades por descumprimento; 5) Pontos de atenção para empresas de [SETOR]. Máximo 500 palavras.", tip: "Use para onboarding de compliance em equipes não-jurídicas." },
  { area: "Financeiro", title: "Análise de variação orçamentária", prompt: "Analise a seguinte variação orçamentária: Orçado: [R$X] | Realizado: [R$Y] | Variação: [X%]. Categorias com maior desvio: [LISTE]. Para cada categoria, sugira: possíveis causas da variação, ações corretivas e impacto no resultado do trimestre. Tom analítico e direto.", tip: "Inclua o contexto do mercado para análises mais relevantes." },
  { area: "Financeiro", title: "Projeção de fluxo de caixa", prompt: "Com base nos seguintes dados, projete o fluxo de caixa para os próximos 3 meses: Receita recorrente: [R$X/mês], Custos fixos: [R$Y/mês], Custos variáveis: [~R$Z/mês], Contas a receber: [R$W], Contas a pagar: [R$V]. Cenários: otimista, realista e pessimista. Inclua premissas de cada cenário.", tip: "Atualize semanalmente para maior precisão." },
  { area: "Desenvolvimento", title: "Code review com contexto", prompt: "Revise o seguinte código considerando: 1) Bugs potenciais; 2) Performance; 3) Segurança; 4) Legibilidade; 5) Boas práticas de [LINGUAGEM/FRAMEWORK]. Código: [COLE O CÓDIGO]. Para cada problema encontrado, explique o risco e sugira a correção. Priorize por severidade.", tip: "Cole trechos específicos, não arquivos inteiros." },
  { area: "Desenvolvimento", title: "Documentação de API", prompt: "Gere documentação para a seguinte API: Endpoint: [URL], Método: [GET/POST/etc], Parâmetros: [LISTE], Autenticação: [TIPO]. Inclua: descrição do endpoint, parâmetros com tipo e obrigatoriedade, exemplos de request e response, códigos de erro possíveis e notas de uso.", tip: "Mantenha atualizado a cada release." },
  { area: "Desenvolvimento", title: "Plano de testes", prompt: "Crie um plano de testes para a feature [NOME DA FEATURE]. Descrição: [DESCREVA A FEATURE]. Cenários principais: [LISTE]. Inclua: casos de teste positivos e negativos, edge cases, critérios de aceitação e priorização por risco. Formato de tabela com: ID, cenário, entrada, resultado esperado, prioridade.", tip: "Foque nos cenários de maior risco primeiro." },
  { area: "RH", title: "Descrição de vaga", prompt: "Crie uma descrição de vaga para [CARGO] na empresa [NOME]. Sobre a empresa: [BREVE DESCRIÇÃO]. Nível: [JÚNIOR/PLENO/SÊNIOR]. Modalidade: [REMOTO/HÍBRIDO/PRESENCIAL]. Inclua: sobre a posição, responsabilidades (6-8), requisitos obrigatórios e desejáveis, benefícios e cultura. Tom que atraia os melhores candidatos.", tip: "Seja específico sobre o dia a dia real da posição." },
  { area: "RH", title: "Roteiro de entrevista", prompt: "Crie um roteiro de entrevista para a vaga de [CARGO]. Competências-chave a avaliar: [LISTE 4-5]. Inclua: 3 perguntas comportamentais (STAR), 2 perguntas situacionais, 1 case prático, critérios de avaliação para cada pergunta e red flags a observar. Duração estimada: 45 minutos.", tip: "Adapte as perguntas ao nível de senioridade da vaga." },
  { area: "RH", title: "Plano de onboarding", prompt: "Crie um plano de onboarding de 30 dias para [CARGO] no departamento de [ÁREA]. Estruture em: Semana 1 (integração e cultura), Semana 2 (treinamento técnico), Semana 3 (acompanhamento prático), Semana 4 (autonomia e feedback). Para cada semana: atividades, responsáveis, materiais necessários e checkpoint de validação.", tip: "Personalize por cargo para um onboarding mais efetivo." },
];

const filterOptions = ["Todos", "Vendas", "CS", "Marketing", "Operações", "Jurídico", "Financeiro", "Desenvolvimento", "RH"];

export default function Module4() {
  const [filter, setFilter] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("virada-visited");
    const arr: string[] = stored ? JSON.parse(stored) : [];
    if (!arr.includes("modulo-4")) {
      arr.push("modulo-4");
      localStorage.setItem("virada-visited", JSON.stringify(arr));
    }
  }, []);

  const filtered = prompts
    .filter((p) => filter === "Todos" || p.area === filter)
    .filter((p) => !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.prompt.toLowerCase().includes(searchQuery.toLowerCase()));

  const copyPrompt = async (text: string, idx: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

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
      <div className="mb-6 animate-fade-in" style={{ animationDelay: "50ms", opacity: 0 }}>
        <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Módulo 4</div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight mb-3">Prompts Prontos</h1>
        <p className="text-lg text-muted-foreground">
          20 prompts profissionais para copiar, colar e adaptar. Comece a usar hoje.
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-4 animate-fade-in" style={{ animationDelay: "80ms", opacity: 0 }}>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Buscar prompts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
        />
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-2 mb-6 pb-4 border-b border-border animate-fade-in" style={{ animationDelay: "100ms", opacity: 0 }}>
        {filterOptions.map((opt) => (
          <button
            key={opt}
            onClick={() => setFilter(opt)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200",
              filter === opt
                ? "bg-primary text-primary-foreground shadow-sm scale-105"
                : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
            )}
          >
            {opt}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-xs text-muted-foreground mb-4">
        {filtered.length} prompt{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
      </p>

      {/* Prompts */}
      <div className="space-y-4">
        {filtered.map((p, i) => (
          <div
            key={`${p.area}-${p.title}`}
            className="p-5 rounded-xl border border-border bg-card hover:border-primary/15 hover:shadow-sm transition-all duration-200 animate-fade-in"
            style={{ animationDelay: `${150 + i * 40}ms`, opacity: 0 }}
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider", areaColors[p.area] || "bg-muted text-muted-foreground")}>
                  {p.area}
                </span>
                <h3 className="font-semibold text-foreground mt-2">{p.title}</h3>
              </div>
              <button
                onClick={() => copyPrompt(p.prompt, i)}
                className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0",
                  copiedIdx === i
                    ? "bg-emerald-500/10 text-emerald-600"
                    : "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-sm"
                )}
              >
                {copiedIdx === i ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedIdx === i ? "Copiado!" : "Copiar"}
              </button>
            </div>
            <div className="bg-surface rounded-lg p-4 mb-3 font-mono text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap border border-border/50">
              {p.prompt}
            </div>
            <p className="text-xs text-muted-foreground italic flex items-start gap-1.5">
              <span className="shrink-0">💡</span>
              {p.tip}
            </p>
          </div>
        ))}
      </div>

      {/* No results */}
      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Nenhum prompt encontrado para esta busca.</p>
          <button onClick={() => { setFilter("Todos"); setSearchQuery(""); }} className="mt-2 text-sm text-primary hover:underline">
            Limpar filtros
          </button>
        </div>
      )}

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-between">
        <Link
          to="/modulo-3"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Módulo 3
        </Link>
        <Link
          to="/diagnostico"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 hover:shadow-md transition-all"
        >
          Diagnóstico IA
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
