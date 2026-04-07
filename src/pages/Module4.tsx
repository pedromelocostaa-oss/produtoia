import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Copy, Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Prompt {
  area: string;
  title: string;
  prompt: string;
  tip: string;
}

const areaColors: Record<string, string> = {
  Vendas: "bg-blue-100 text-blue-700",
  CS: "bg-green-100 text-green-700",
  Marketing: "bg-purple-100 text-purple-700",
  Operações: "bg-orange-100 text-orange-700",
  Jurídico: "bg-red-100 text-red-700",
  Financeiro: "bg-yellow-100 text-yellow-700",
  Desenvolvimento: "bg-cyan-100 text-cyan-700",
  RH: "bg-pink-100 text-pink-700",
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
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("virada-visited");
    const arr: string[] = stored ? JSON.parse(stored) : [];
    if (!arr.includes("modulo-4")) {
      arr.push("modulo-4");
      localStorage.setItem("virada-visited", JSON.stringify(arr));
    }
  }, []);

  const filtered = filter === "Todos" ? prompts : prompts.filter((p) => p.area === filter);

  const copyPrompt = async (text: string, idx: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Header */}
      <div className="mb-8">
        <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Módulo 4</div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight mb-3">Prompts Prontos</h1>
        <p className="text-lg text-muted-foreground">
          20 prompts profissionais para copiar, colar e adaptar. Comece a usar hoje.
        </p>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-2 mb-8 pb-4 border-b border-border">
        {filterOptions.map((opt) => (
          <button
            key={opt}
            onClick={() => setFilter(opt)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
              filter === opt
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            {opt}
          </button>
        ))}
      </div>

      {/* Prompts */}
      <div className="space-y-4">
        {filtered.map((p, i) => (
          <div key={`${p.area}-${p.title}`} className="p-5 rounded-xl border border-border bg-card">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider", areaColors[p.area] || "bg-muted text-muted-foreground")}>
                  {p.area}
                </span>
                <h3 className="font-semibold text-foreground mt-2">{p.title}</h3>
              </div>
            </div>
            <div className="bg-surface rounded-lg p-4 mb-3 font-mono text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {p.prompt}
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground italic">💡 {p.tip}</p>
              <button
                onClick={() => copyPrompt(p.prompt, i)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors shrink-0"
              >
                {copiedIdx === i ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedIdx === i ? "Copiado!" : "Copiar prompt"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Next */}
      <div className="mt-8">
        <Link
          to="/diagnostico"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors"
        >
          Próximo: Diagnóstico IA
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
