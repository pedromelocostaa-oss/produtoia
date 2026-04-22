import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Copy, Check, ArrowRight, ArrowLeft, Search, Lightbulb, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface Prompt {
  area: string;
  title: string;
  prompt: string;
  porqueFunciona: string;
  exemploOutput: string;
  tip: string;
}

const areaColors: Record<string, string> = {
  Vendas: "bg-primary/10 text-primary",
  CS: "bg-emerald-500/10 text-emerald-600",
  Marketing: "bg-violet-500/10 text-blue-600",
  Operações: "bg-amber-500/10 text-amber-600",
  Jurídico: "bg-destructive/10 text-destructive",
  Financeiro: "bg-yellow-500/10 text-yellow-700",
  Desenvolvimento: "bg-cyan-500/10 text-cyan-600",
  RH: "bg-pink-500/10 text-pink-600",
};

const areaIntros: Record<string, string> = {
  Vendas: "Feche mais negócios com menos esforço — esses prompts transformam horas de preparação em minutos de impacto.",
  CS: "Retenha mais clientes e entregue mais valor — use IA para antecipar problemas antes que virem churn.",
  Marketing: "Crie campanhas, conteúdos e análises em fração do tempo — com a qualidade de uma agência.",
  Operações: "Elimine gargalos, documente processos e tome decisões baseadas em dados — sem consultoria cara.",
  Jurídico: "Analise riscos mais rápido, resuma legislações e prepare documentos com mais precisão.",
  Financeiro: "Do fluxo de caixa ao relatório de variação — transforme números em decisões com clareza.",
  Desenvolvimento: "Code review, documentação e planejamento de testes — IA como parceiro técnico de verdade.",
  RH: "Contrate melhor, integre mais rápido e desenvolva talentos com estratégia e dados.",
};

const prompts: Prompt[] = [
  // VENDAS
  {
    area: "Vendas",
    title: "Pesquisa de prospect pré-reunião",
    prompt: "Aja como um analista de vendas B2B. Pesquise a empresa [NOME DA EMPRESA] e me forneça: 1) O que a empresa faz e seu mercado; 2) Principais desafios do setor; 3) Possíveis dores que nosso produto ([DESCREVA SEU PRODUTO]) pode resolver; 4) Sugestão de abordagem para a primeira reunião. Seja direto e prático.",
    porqueFunciona: "Ao definir o papel de analista B2B, o modelo adota um framework consultivo — não genérico. O resultado é orientado a vendas, não a informações turísticas sobre a empresa.",
    exemploOutput: "Empresa: Logtech S.A. | Setor: logística de última milha. Desafio principal: ineficiência no rastreamento de entregas. Dor potencial: seu produto resolve rastreamento em tempo real. Abordagem sugerida: começar com o custo operacional de devoluções.",
    tip: "Combine com uma pesquisa no Perplexity sobre o setor para dados de mercado mais atualizados.",
  },
  {
    area: "Vendas",
    title: "Reunião de descoberta B2B",
    prompt: "Você é um especialista em vendas consultivas B2B. Preciso preparar uma reunião de descoberta com [NOME DA EMPRESA], que atua no setor de [SETOR] e tem [TAMANHO] funcionários. Com base nisso: 1) Liste os 5 principais desafios que esse perfil de empresa geralmente enfrenta; 2) Sugira 3 perguntas de descoberta poderosas para cada desafio; 3) Indique qual posicionamento de valor devo usar. Tom: consultivo, não vendedor.",
    porqueFunciona: "Perguntas de descoberta abertas revelam dores que o cliente não sabia nomear. Esse prompt gera um arsenal completo de perguntas baseado no perfil do comprador — não em suposições genéricas.",
    exemploOutput: "Desafio 1: escalabilidade operacional. Pergunta: 'Como vocês lidam hoje quando a demanda dobra em 2 semanas?' Posicionamento: foco em previsibilidade, não em custo.",
    tip: "Leve as perguntas impressas. Usar papel numa reunião de vendas transmite preparo — diferente de ficar olhando para a tela.",
  },
  {
    area: "Vendas",
    title: "Geração de proposta comercial",
    prompt: "Crie uma proposta comercial para [NOME DO CLIENTE], empresa do setor [SETOR], com [NÚMERO] funcionários. Nosso produto é [DESCRIÇÃO]. A proposta deve conter: resumo executivo, problemas identificados, solução proposta, benefícios esperados, investimento e próximos passos. Tom profissional e persuasivo.",
    porqueFunciona: "Uma estrutura orientada a problemas antes de soluções cria identificação emocional. O cliente lê 'seus problemas' antes de ver o preço — o que muda completamente o enquadramento da proposta.",
    exemploOutput: "Resumo: A [CLIENTE] enfrenta X e Y. Nossa solução endereça isso com Z. ROI estimado em 6 meses: 3x o investimento. Próximo passo: reunião de validação em [DATA].",
    tip: "Inclua dados reais do cliente para uma proposta mais personalizada. Uma proposta genérica perde para o concorrente que personalizou.",
  },
  {
    area: "Vendas",
    title: "E-mail de follow-up pós-reunião",
    prompt: "Escreva um e-mail de follow-up profissional para [NOME DO CONTATO] após nossa reunião sobre [ASSUNTO]. Pontos discutidos: [LISTE 3 PONTOS]. Próximo passo combinado: [DESCREVA]. Tom cordial, objetivo e que demonstre valor sem ser insistente. Máximo 150 palavras.",
    porqueFunciona: "O follow-up que chega no mesmo dia com um resumo preciso diferencia o vendedor consultivo do que só quer fechar. Demonstra atenção e organização — dois atributos que constroem confiança.",
    exemploOutput: "Assunto: Nossa conversa de hoje — próximos passos. Corpo: Pedro, obrigado pela troca de hoje. Saio com clareza sobre [X]. Conforme combinamos, envio a proposta até quinta. Fico à disposição para dúvidas.",
    tip: "Envie no mesmo dia da reunião. Cada hora que passa reduz o impacto.",
  },
  {
    area: "Vendas",
    title: "Objeções de vendas",
    prompt: "Aja como um coach de vendas experiente. Liste as 5 objeções mais comuns que um cliente do setor [SETOR] costuma dar para não comprar [TIPO DE PRODUTO/SERVIÇO]. Para cada objeção: 1) A forma exata como o cliente costuma verbalizar; 2) O que está por trás da objeção (medo real); 3) A resposta ideal do vendedor; 4) Como redirecionar para o valor. Tom: direto, sem floreios.",
    porqueFunciona: "Objeções são medos disfarçados de lógica. Ao revelar o medo por trás de cada objeção, o vendedor responde ao problema real — não ao argumento superficial — o que aumenta muito a taxa de conversão.",
    exemploOutput: "Objeção: 'Preciso pensar.' Medo real: 'Tenho medo de errar a escolha.' Resposta: 'Faz sentido. O que exatamente você precisa avaliar para ter certeza?' Redirecionamento: identifique o critério de decisão real.",
    tip: "Pratique as respostas em voz alta antes da reunião. Saber o que dizer não é suficiente — você precisa soar natural.",
  },

  // CS
  {
    area: "CS",
    title: "Análise de risco de churn",
    prompt: "Analise o seguinte cenário de cliente e avalie o risco de churn: Empresa: [NOME], Tempo de contrato: [X meses], Uso da plataforma: [ALTO/MÉDIO/BAIXO], Último contato: [DATA], Tickets abertos: [NÚMERO], NPS: [NOTA]. Classifique o risco (alto/médio/baixo), explique os sinais de alerta e sugira 3 ações imediatas de retenção.",
    porqueFunciona: "Quantificar o risco de churn obriga o modelo a ponderar múltiplos sinais ao mesmo tempo — o que um humano fazendo triagem manual costuma errar por excesso de informação ou viés de recency.",
    exemploOutput: "Risco: ALTO. Sinais: baixo uso + ticket aberto há 12 dias sem resposta + NPS 6. Ações: 1) QBR emergencial esta semana; 2) resolver ticket hoje; 3) oferecer onboarding extra gratuito.",
    tip: "Use dados reais do seu CRM para uma análise precisa. A IA é tão boa quanto os dados que você fornece.",
  },
  {
    area: "CS",
    title: "Roteiro de QBR",
    prompt: "Crie um roteiro de QBR (Quarterly Business Review) para o cliente [NOME]. Dados: faturamento gerado pela plataforma: [R$X], features mais usadas: [LISTE], ROI estimado: [X%]. Estruture em: 1) Resultados do trimestre; 2) Valor entregue; 3) Oportunidades identificadas; 4) Roadmap relevante; 5) Próximos passos. Tom consultivo.",
    porqueFunciona: "Começar com resultados antes do roadmap inverte a narrativa: o cliente vê o que já ganhou antes de ouvir o que vem por aí. Isso aumenta predisposição para renovação e upsell.",
    exemploOutput: "Abertura: 'No último trimestre, você processou 3.200 pedidos via plataforma — 40% a mais que o trimestre anterior.' Oportunidade identificada: integração com ERP pode reduzir 2h de trabalho manual/dia.",
    tip: "Personalize com métricas reais do cliente. Um QBR com dados genéricos é pior do que não ter QBR.",
  },
  {
    area: "CS",
    title: "Plano de sucesso do cliente",
    prompt: "Crie um Plano de Sucesso do Cliente (CSP) para [NOME DA EMPRESA], que contratou [PRODUTO/SERVIÇO] há [X semanas]. Objetivo do cliente: [DESCREVA]. Situação atual: [DESCREVA]. Estruture o plano em: marcos dos primeiros 90 dias, métricas de sucesso, reuniões de acompanhamento, riscos identificados e plano de mitigação.",
    porqueFunciona: "Documentar o plano de sucesso cria um contrato implícito de parceria. Quando o cliente assina (mesmo metaforicamente) o que define sucesso, ele para de medir resultado de forma subjetiva.",
    exemploOutput: "Marco 30 dias: onboarding completo, 80% dos usuários ativos. Marco 60 dias: primeiro relatório de ROI gerado. Marco 90 dias: expansão para segundo departamento ou renovação confirmada.",
    tip: "Apresente o CSP na reunião de kickoff. Clientes que entendem o caminho até o sucesso têm 3x mais probabilidade de renovar.",
  },
  {
    area: "CS",
    title: "E-mail de reativação de cliente inativo",
    prompt: "Escreva um e-mail de reativação para o cliente [NOME], que não usa a plataforma há [X dias] e cujo último acesso foi em [DATA]. Contexto: ele contratou para resolver [DOR ORIGINAL]. O e-mail deve: reconhecer o silêncio sem culpar, relembrar o valor do produto, oferecer suporte proativo e abrir espaço para conversa. Tom: humano, não automático.",
    porqueFunciona: "Clientes inativos normalmente pararam por um obstáculo não resolvido, não por falta de interesse. Um e-mail que reconhece isso sem pressionar tem taxa de resposta muito superior ao 'sentimos sua falta'.",
    exemploOutput: "Assunto: Tudo bem por aí? Corpo: Oi [NOME], percebi que faz um tempo que não nos falamos. Às vezes a correria do dia a dia deixa algumas ferramentas de lado. Se algo não está funcionando como esperado, quero ajudar — pode responder aqui mesmo.",
    tip: "Personalize com o objetivo original do cliente. Mostrar que você lembra por que ele contratou é o maior diferencial.",
  },

  // MARKETING
  {
    area: "Marketing",
    title: "Criação de post para LinkedIn",
    prompt: "Crie um post para LinkedIn sobre [TEMA] para o perfil de [CARGO/NOME]. O post deve: começar com um gancho forte, contar uma história ou insight prático, ter entre 150-200 palavras, incluir uma pergunta de engajamento no final. Tom: profissional mas acessível. Não use emojis em excesso. Inclua sugestão de hashtags.",
    porqueFunciona: "Posts de LinkedIn que começam com uma história ou dado surpreendente têm taxa de engajamento 3x maior que posts informativos diretos. O gancho nos primeiros 2 segundos decide se a pessoa continua lendo.",
    exemploOutput: "Gancho: 'Perdi uma conta de R$300k por não fazer uma pergunta simples.' Corpo: história de 3 parágrafos com lição. Encerramento: 'Você já passou por isso? Conta nos comentários.'",
    tip: "Posts com histórias pessoais ou dados surpreendentes performam melhor. Coloque a parte mais interessante na primeira linha.",
  },
  {
    area: "Marketing",
    title: "Briefing de campanha",
    prompt: "Crie um briefing de campanha de marketing para [PRODUTO/SERVIÇO]. Público-alvo: [DESCREVA]. Objetivo: [AWARENESS/LEADS/VENDAS]. Orçamento: [R$X]. Canais disponíveis: [LISTE]. Inclua: mensagem principal, 3 variações de headline, sugestão de CTA, métricas de sucesso e cronograma sugerido.",
    porqueFunciona: "Um briefing bem estruturado reduz retrabalho em 70%. Ao definir público, objetivo e métricas antes de criar, você evita o ciclo interminável de revisões baseadas em opinião.",
    exemploOutput: "Mensagem principal: 'Você já perdeu tempo demais fazendo X na mão.' Headlines: A) 'Automatize X em 5 minutos'; B) 'X sem planilha'; C) 'Chega de fazer X manualmente'. CTA: 'Teste grátis por 14 dias'.",
    tip: "Quanto mais detalhado o público-alvo, melhor a segmentação. Descreva o dia a dia do seu cliente ideal, não só dados demográficos.",
  },
  {
    area: "Marketing",
    title: "Análise de concorrência",
    prompt: "Analise a estratégia de marketing digital dos seguintes concorrentes: [LISTE 3 CONCORRENTES]. Para cada um, identifique: posicionamento, canais principais, tipo de conteúdo, pontos fortes e fracos. Ao final, sugira 3 oportunidades de diferenciação para [SUA EMPRESA]. Base sua análise em padrões públicos observáveis.",
    porqueFunciona: "Comparar três concorrentes em paralelo revela padrões de categoria que nenhuma análise individual consegue mostrar. A diferenciação real vem de ver o que todos fazem igual — e fazer diferente.",
    exemploOutput: "Padrão da categoria: todos usam prova social com métricas. Oportunidade: ser o único que mostra o processo, não só o resultado. Diferenciação sugerida: série de conteúdo 'por dentro de como fazemos X'.",
    tip: "Combine com pesquisa no Perplexity para dados mais atualizados. Acrescente seus próprios dados de performance para uma análise ainda mais precisa.",
  },
  {
    area: "Marketing",
    title: "Sequência de e-mails de nutrição",
    prompt: "Crie uma sequência de 5 e-mails de nutrição para leads que baixaram [MATERIAL/ISCA DIGITAL] relacionado a [TEMA]. Objetivo: mover o lead de 'curioso' para 'pronto para comprar [PRODUTO]'. Para cada e-mail: assunto, objetivo do e-mail, estrutura do conteúdo, CTA e timing de envio. Tom: educativo e consultivo.",
    porqueFunciona: "Uma sequência orientada à jornada do comprador converte mais porque entrega o conteúdo certo no momento certo. O lead que entendeu o problema antes de ver a solução já está metade convencido.",
    exemploOutput: "E-mail 1 (dia 0): Entrega + gancho do problema. E-mail 2 (dia 2): Por que a solução óbvia não funciona. E-mail 3 (dia 5): O que realmente funciona (sem vender). E-mail 4 (dia 8): Caso de uso real. E-mail 5 (dia 11): Oferta + urgência.",
    tip: "Escreva todos os e-mails de uma vez para garantir coerência de narrativa entre eles.",
  },

  // OPERAÇÕES
  {
    area: "Operações",
    title: "Mapeamento de processos",
    prompt: "Mapeie o processo de [NOME DO PROCESSO] da minha empresa. Etapas atuais: [DESCREVA]. Pessoas envolvidas: [LISTE]. Tempo médio atual: [X horas/dias]. Identifique: gargalos, etapas que podem ser automatizadas, riscos e sugestões de melhoria. Apresente em formato de fluxo simplificado.",
    porqueFunciona: "Descrever um processo em texto força a explicitação de premissas implícitas que todo mundo 'sabe' mas ninguém documentou. Frequentemente o gargalo fica óbvio no momento de escrever.",
    exemploOutput: "Gargalo identificado: aprovação manual na etapa 3 que depende de 1 pessoa. Automação possível: notificação automática quando prazo passa de 24h. Risco: sem backup se a pessoa responsável sair.",
    tip: "Seja detalhista na descrição das etapas atuais. Processos vagos geram análises vagas.",
  },
  {
    area: "Operações",
    title: "Dashboard de KPIs",
    prompt: "Defina um dashboard de KPIs operacionais para [ÁREA/DEPARTAMENTO]. Objetivo principal: [DESCREVA]. Sugira: 6-8 KPIs relevantes com meta sugerida, frequência de atualização, fonte de dados provável e formato de visualização ideal (gráfico, número, tabela). Priorize métricas acionáveis.",
    porqueFunciona: "KPIs acionáveis são aqueles que, quando mudam, geram uma resposta clara de quem vê. Pedir ao modelo que justifique a acionabilidade de cada métrica elimina KPIs de vaidade.",
    exemploOutput: "KPI 1: Tempo médio de resolução de tickets. Meta: < 24h. Frequência: diária. Fonte: Zendesk. Visualização: linha do tempo. Ação se piorar: escalar para gerente.",
    tip: "Comece com 4-5 KPIs e evolua conforme a maturidade. Um dashboard de 20 métricas que ninguém olha é pior do que 5 que geram ação.",
  },
  {
    area: "Operações",
    title: "Análise de causa-raiz",
    prompt: "Aja como um especialista em melhoria contínua (metodologia 5 Porquês + Ishikawa). Preciso investigar o seguinte problema operacional: [DESCREVA O PROBLEMA]. Impacto: [DESCREVA]. Frequência: [X vezes por semana/mês]. Aplique a análise de causa-raiz estruturada, identifique as causas mais prováveis (pessoas, processo, tecnologia, ambiente) e sugira 3 ações corretivas com responsável sugerido.",
    porqueFunciona: "A metodologia 5 Porquês força o modelo a ir além do sintoma. Problemas operacionais recorrentes quase sempre têm causa-raiz no processo, não nas pessoas — e essa análise estruturada revela isso com clareza.",
    exemploOutput: "Problema: entregas atrasando. Por quê 1: falta de matéria-prima. Por quê 2: pedidos feitos tarde. Por quê 3: não há alerta automático de estoque mínimo. Causa-raiz: ausência de sistema de gestão de estoque. Ação: configurar alerta no ERP.",
    tip: "Valide a análise com quem está na operação. A IA identifica padrões, mas quem está no campo sabe nuances que não aparecem nos dados.",
  },
  {
    area: "Operações",
    title: "SOP — Procedimento Operacional Padrão",
    prompt: "Escreva um SOP (Standard Operating Procedure) para o processo de [NOME DO PROCESSO]. Contexto: [DESCREVA BREVEMENTE]. Estruture em: 1) Objetivo; 2) Escopo (quem faz, quando); 3) Materiais/sistemas necessários; 4) Passo a passo detalhado; 5) Exceções e como tratá-las; 6) Métricas de qualidade; 7) Responsável pelo documento. Linguagem clara e direta.",
    porqueFunciona: "Um SOP bem estruturado reduz variabilidade e tempo de onboarding. Ao incluir exceções e métricas de qualidade, o documento deixa de ser 'o jeito ideal' e passa a ser 'o jeito real' — o que aumenta adesão.",
    exemploOutput: "Objetivo: garantir que todo novo lead seja registrado no CRM em até 2h. Escopo: SDR responsável. Passo 1: acessar CRM. Passo 2: criar conta com campos obrigatórios. Exceção: se sistema fora do ar, registrar em planilha de contingência.",
    tip: "Inclua capturas de tela nos processos mais críticos. Texto mais imagem tem adesão 40% maior que texto puro.",
  },

  // JURÍDICO
  {
    area: "Jurídico",
    title: "Revisão de cláusulas",
    prompt: "Revise as seguintes cláusulas contratuais e identifique: 1) Riscos potenciais para [MINHA EMPRESA]; 2) Cláusulas abusivas ou desequilibradas; 3) Pontos que precisam de esclarecimento; 4) Sugestões de alteração com justificativa. Cláusulas: [COLE AS CLÁUSULAS]. Nota: esta análise é preliminar e não substitui parecer jurídico formal.",
    porqueFunciona: "A IA não substitui o advogado, mas reduz o tempo dele em 60-70%. Ao fazer uma análise prévia, você chega para o jurídico já sabendo onde focar — o que corta custos e acelera o processo.",
    exemploOutput: "Risco encontrado: cláusula 7.3 não define prazo para rescisão — juridicamente favorece a outra parte. Sugestão: adicionar 'com prazo mínimo de 30 dias de antecedência por escrito'. Prioridade: alta.",
    tip: "Sempre valide com seu jurídico. A IA ajuda a priorizar o que revisar — o advogado decide o que negociar.",
  },
  {
    area: "Jurídico",
    title: "Resumo de legislação",
    prompt: "Resuma a [NOME DA LEI/REGULAMENTAÇÃO] em linguagem acessível para profissionais não-jurídicos. Inclua: 1) Objetivo da lei; 2) A quem se aplica; 3) Principais obrigações; 4) Penalidades por descumprimento; 5) Pontos de atenção para empresas de [SETOR]. Máximo 500 palavras.",
    porqueFunciona: "Traduzir legislação para linguagem de negócios é uma das tarefas mais demoradas do jurídico. Ao fazer esse briefing primeiro, a equipe consegue fazer perguntas mais qualificadas para os advogados — economizando horas de consultoria.",
    exemploOutput: "LGPD em 5 pontos: 1) Protege dados pessoais de brasileiros. 2) Aplica-se a qualquer empresa que processa esses dados. 3) Obriga consentimento explícito. 4) Multa de até 2% do faturamento. 5) Atenção: e-commerce precisa revisar cadastro.",
    tip: "Use para onboarding de compliance em equipes não-jurídicas. Um briefing de 500 palavras vale mais do que um manual de 80 páginas que ninguém lê.",
  },
  {
    area: "Jurídico",
    title: "Checklist de due diligence",
    prompt: "Crie um checklist de due diligence jurídica para [TIPO DE OPERAÇÃO: compra de empresa / parceria / contratação de fornecedor]. Setor da empresa avaliada: [SETOR]. Inclua: documentos societários, trabalhistas, fiscais, contratos relevantes, passivos ocultos potenciais e red flags específicos do setor. Priorize por risco.",
    porqueFunciona: "Um checklist orientado a risco garante que as verificações mais críticas não sejam puladas por falta de tempo. Ao especificar o setor, o modelo identifica riscos regulatórios específicos que checklist genérico não captura.",
    exemploOutput: "Alta prioridade: certidão negativa de débitos trabalhistas (setor com histórico de passivos), contratos de exclusividade com fornecedores-chave. Média: contratos de locação (cláusula de cessão). Red flag setorial: licença ambiental vigente.",
    tip: "Adapte o checklist a cada operação. Due diligence de startup tech é diferente de due diligence de empresa de varejo.",
  },
  {
    area: "Jurídico",
    title: "Resposta a notificação extrajudicial",
    prompt: "Preciso redigir uma resposta à seguinte notificação extrajudicial recebida: [COLE O TEXTO DA NOTIFICAÇÃO]. Nossa posição: [DESCREVA BREVEMENTE]. Pontos que queremos contestar: [LISTE]. A resposta deve ser: profissional, objetiva, sem admitir responsabilidade implícita e abrir espaço para resolução amigável. Nota: para revisão final pelo jurídico.",
    porqueFunciona: "Notificações extrajudiciais frequentemente têm prazo curto. Um rascunho estruturado permite que o jurídico revise e ajuste em vez de criar do zero — o que acelera muito a resposta dentro do prazo.",
    exemploOutput: "Referente à notificação recebida em [DATA]: Agradecemos a comunicação. Com relação ao ponto X, contestamos pelos seguintes fundamentos: [ARGUMENTOS]. Estamos à disposição para resolver esta situação amigavelmente dentro de [PRAZO].",
    tip: "Nunca envie sem revisão do jurídico. Use esse rascunho para briefar seu advogado de forma mais eficiente.",
  },

  // FINANCEIRO
  {
    area: "Financeiro",
    title: "Análise de variação orçamentária",
    prompt: "Analise a seguinte variação orçamentária: Orçado: [R$X] | Realizado: [R$Y] | Variação: [X%]. Categorias com maior desvio: [LISTE]. Para cada categoria, sugira: possíveis causas da variação, ações corretivas e impacto no resultado do trimestre. Tom analítico e direto.",
    porqueFunciona: "Ao forçar a análise por categoria com causas e ações por cada uma, o modelo evita o problema clássico de relatórios financeiros: identificar a variação mas não saber o que fazer com ela.",
    exemploOutput: "Categoria pessoal: +22% sobre orçado. Causa provável: contratações antecipadas para pico de demanda. Ação: reverificar projeção de headcount Q3. Impacto no trimestre: redução de -3% na margem EBITDA.",
    tip: "Inclua o contexto do mercado para análises mais relevantes. Variação por sazonalidade é diferente de variação por ineficiência.",
  },
  {
    area: "Financeiro",
    title: "Projeção de fluxo de caixa",
    prompt: "Com base nos seguintes dados, projete o fluxo de caixa para os próximos 3 meses: Receita recorrente: [R$X/mês], Custos fixos: [R$Y/mês], Custos variáveis: [~R$Z/mês], Contas a receber: [R$W], Contas a pagar: [R$V]. Cenários: otimista, realista e pessimista. Inclua premissas de cada cenário.",
    porqueFunciona: "Três cenários simultâneos forçam reflexão sobre qual premissa mais impacta o caixa. Frequentemente a empresa descobre que um único cliente representa 40% da receita — um risco não visível na média.",
    exemploOutput: "Cenário realista: caixa positivo nos 3 meses, com pico de tensão em agosto (R$80k de contas a pagar concentrados). Premissa: recebimentos dentro do prazo. Risco: atraso de [CLIENTE X] pode comprometer pagamento de fornecedores em agosto.",
    tip: "Atualize semanalmente para maior precisão. Fluxo de caixa desatualizado é pior do que não ter — gera falsa segurança.",
  },
  {
    area: "Financeiro",
    title: "Análise de viabilidade de projeto",
    prompt: "Faça uma análise de viabilidade financeira para o projeto [NOME]. Investimento inicial: [R$X]. Receita esperada: [R$Y/mês a partir do mês Z]. Custos operacionais: [R$W/mês]. Calcule: payback, VPL (taxa de desconto: [X%]), TIR e ponto de equilíbrio. Identifique as principais premissas e riscos de cada uma.",
    porqueFunciona: "Calcular VPL, TIR e payback juntos permite comparar projetos com perfis de retorno diferentes. O mais importante é identificar qual premissa, se errada, inviabiliza o projeto — e focar análise nela.",
    exemploOutput: "Payback: 14 meses. VPL a 12%: R$180k positivo. TIR: 28%. Premissa crítica: atingir 200 clientes no mês 6. Se esse número for 120 (40% menor), o payback vai para 22 meses e o VPL cai para R$60k.",
    tip: "Faça análise de sensibilidade na premissa mais incerta. Uma análise financeira sem análise de sensibilidade é incompleta.",
  },
  {
    area: "Financeiro",
    title: "Relatório executivo de resultados",
    prompt: "Transforme os seguintes dados financeiros em um relatório executivo para a diretoria: Receita: [R$X] vs meta [R$Y]. EBITDA: [R$W] vs meta [R$V]. Principais drivers positivos: [LISTE]. Principais detratores: [LISTE]. Outlook Q+1: [DESCREVA]. O relatório deve ter: resumo em 3 bullets, análise narrativa, e recomendações estratégicas. Tom: executivo, sem jargão excessivo.",
    porqueFunciona: "Diretores tomam decisões com base em narrativa, não em tabelas. Transformar números em história de causa e efeito aumenta a qualidade das decisões e reduz reuniões de explicação posteriores.",
    exemploOutput: "Bullet 1: Receita 8% acima da meta, puxada por [PRODUTO X]. Bullet 2: EBITDA pressionado por aumento de 22% em pessoal. Bullet 3: Q3 com perspectiva de retorno às margens históricas após redução de custos extraordinários.",
    tip: "Comece sempre pelo que mais importa para quem vai ler — resultado vs meta — antes de qualquer explicação.",
  },

  // DESENVOLVIMENTO
  {
    area: "Desenvolvimento",
    title: "Code review com contexto",
    prompt: "Revise o seguinte código considerando: 1) Bugs potenciais; 2) Performance; 3) Segurança; 4) Legibilidade; 5) Boas práticas de [LINGUAGEM/FRAMEWORK]. Código: [COLE O CÓDIGO]. Para cada problema encontrado, explique o risco e sugira a correção. Priorize por severidade.",
    porqueFunciona: "Priorizar por severidade transforma a lista de problemas em um plano de ação. Um code review sem priorização faz o dev perder tempo com nitpicks de formatação antes de resolver vulnerabilidades críticas.",
    exemploOutput: "CRÍTICO: SQL injection na linha 47 — input não sanitizado. Correção: usar query parametrizada. MODERADO: função com 200 linhas dificulta manutenção. Sugestão: quebrar em 3 funções menores. BAIXO: variáveis com nomes pouco descritivos.",
    tip: "Cole trechos específicos, não arquivos inteiros. 100 linhas de contexto relevante vale mais que 2.000 linhas irrelevantes.",
  },
  {
    area: "Desenvolvimento",
    title: "Documentação de API",
    prompt: "Gere documentação para a seguinte API: Endpoint: [URL], Método: [GET/POST/etc], Parâmetros: [LISTE], Autenticação: [TIPO]. Inclua: descrição do endpoint, parâmetros com tipo e obrigatoriedade, exemplos de request e response, códigos de erro possíveis e notas de uso.",
    porqueFunciona: "Documentação com exemplos reais de request/response reduz em 80% as perguntas de integração. Desenvolvedor que tem exemplo funcional integra em horas — sem exemplo pode levar dias.",
    exemploOutput: "POST /api/v1/leads. Autenticação: Bearer token. Body: {email: string (required), name: string (required), source: string (optional)}. Response 200: {id: uuid, created_at: timestamp}. Erro 422: campo obrigatório ausente.",
    tip: "Mantenha atualizado a cada release. Documentação desatualizada é pior do que não ter — gera bugs em produção.",
  },
  {
    area: "Desenvolvimento",
    title: "Plano de testes",
    prompt: "Crie um plano de testes para a feature [NOME DA FEATURE]. Descrição: [DESCREVA A FEATURE]. Cenários principais: [LISTE]. Inclua: casos de teste positivos e negativos, edge cases, critérios de aceitação e priorização por risco. Formato de tabela com: ID, cenário, entrada, resultado esperado, prioridade.",
    porqueFunciona: "Edge cases são onde a maioria dos bugs vive. Ao pedir explicitamente cenários negativos e de borda, o modelo mapeia situações que o desenvolvimento não considerou — mas o usuário real vai encontrar.",
    exemploOutput: "TC001 | Login com e-mail válido | email@email.com + senha correta | Redireciona para dashboard | Alta. TC002 | Login com senha incorreta | email@email.com + senha errada | Mensagem de erro genérica | Alta. TC003 | Login com e-mail com espaço no início | ' email@email.com' | Sistema deve tratar espaço ou retornar erro claro | Média.",
    tip: "Foque nos cenários de maior risco primeiro. Testar o caminho feliz é necessário — testar o que o usuário vai errar é o que evita bugs em produção.",
  },
  {
    area: "Desenvolvimento",
    title: "Especificação técnica de feature",
    prompt: "Escreva uma especificação técnica para a feature [NOME]. Objetivo de negócio: [DESCREVA]. Comportamento esperado: [DESCREVA EM DETALHE]. Inclua: decisões de design (com trade-offs), modelos de dados necessários, integrações externas, edge cases, critérios de aceite e estimativa de complexidade (S/M/L/XL com justificativa).",
    porqueFunciona: "Documentar trade-offs de design evita a síndrome do 'por que foi feito assim?'. Uma especificação que explica o que foi descartado é tão valiosa quanto o que foi escolhido — especialmente para times que crescem.",
    exemploOutput: "Decisão de design: usar webhook em vez de polling. Trade-off descartado: polling era mais simples de implementar mas geraria 50k requests/dia desnecessários. Complexidade: M (3-5 dias). Edge case: webhook falhar — sistema precisa de retry com backoff exponencial.",
    tip: "Inclua os trade-offs descartados. Código que não documenta alternativas rejeitadas vai gerar debates repetidos a cada novo desenvolvedor.",
  },

  // RH
  {
    area: "RH",
    title: "Descrição de vaga",
    prompt: "Crie uma descrição de vaga para [CARGO] na empresa [NOME]. Sobre a empresa: [BREVE DESCRIÇÃO]. Nível: [JÚNIOR/PLENO/SÊNIOR]. Modalidade: [REMOTO/HÍBRIDO/PRESENCIAL]. Inclua: sobre a posição, responsabilidades (6-8), requisitos obrigatórios e desejáveis, benefícios e cultura. Tom que atraia os melhores candidatos.",
    porqueFunciona: "Descrições de vaga que descrevem impacto real (não só responsabilidades) atraem candidatos mais qualificados. A pergunta 'o que você vai realizar nesta posição' é mais persuasiva que 'o que você vai fazer'.",
    exemploOutput: "Sobre a posição: como [CARGO], você vai liderar a migração do nosso sistema de X para Y — uma decisão que vai impactar 500 clientes. Responsabilidades: [LISTA DE IMPACTO, não de tarefas]. Requisito obrigatório: experiência com Y por 3+ anos.",
    tip: "Seja específico sobre o dia a dia real da posição. Candidatos valorizam honestidade sobre desafios — reduz turnover no primeiro ano.",
  },
  {
    area: "RH",
    title: "Roteiro de entrevista",
    prompt: "Crie um roteiro de entrevista para a vaga de [CARGO]. Competências-chave a avaliar: [LISTE 4-5]. Inclua: 3 perguntas comportamentais (STAR), 2 perguntas situacionais, 1 case prático, critérios de avaliação para cada pergunta e red flags a observar. Duração estimada: 45 minutos.",
    porqueFunciona: "Perguntas comportamentais no formato STAR (Situação, Tarefa, Ação, Resultado) reduzem o viés de impressão. Definir critérios de avaliação antes da entrevista garante que todos os candidatos sejam avaliados com o mesmo padrão.",
    exemploOutput: "Pergunta STAR: 'Conte uma situação em que você discordou de uma decisão do seu gestor. O que você fez?' Red flag: resposta que culpa o gestor sem mencionar como resolveu. Critério ideal: mostra iniciativa, comunicação assertiva e foco em resultado.",
    tip: "Adapte as perguntas ao nível de senioridade da vaga. Para sênior, espere reflexão sobre impacto; para júnior, espere potencial e aprendizado.",
  },
  {
    area: "RH",
    title: "Plano de onboarding",
    prompt: "Crie um plano de onboarding de 30 dias para [CARGO] no departamento de [ÁREA]. Estruture em: Semana 1 (integração e cultura), Semana 2 (treinamento técnico), Semana 3 (acompanhamento prático), Semana 4 (autonomia e feedback). Para cada semana: atividades, responsáveis, materiais necessários e checkpoint de validação.",
    porqueFunciona: "Um onboarding estruturado reduz o tempo até a produtividade plena em 40%. Definir checkpoints semanais cria ciclos de feedback cedo — o que permite correções antes de 90 dias, quando a maioria dos problemas de fit se manifestam.",
    exemploOutput: "Semana 1, D1: reunião com todos os times (30 min cada). D3: acesso a todos os sistemas configurado. D5: checkpoint com gestor — o que está claro? o que não está? Responsável: RH + gestor direto. Material: manual de cultura + organograma.",
    tip: "Personalize por cargo para um onboarding mais efetivo. Onboarding genérico é melhor do que nada — onboarding específico retém talentos.",
  },
  {
    area: "RH",
    title: "Plano de desenvolvimento individual (PDI)",
    prompt: "Crie um PDI (Plano de Desenvolvimento Individual) para [NOME/CARGO], com base no seguinte feedback de performance: [DESCREVA PONTOS FORTES E PONTOS DE DESENVOLVIMENTO]. Objetivo do colaborador: [DESCREVA]. Horizonte: 6 meses. Estruture em: competências a desenvolver (máx 3), ações concretas para cada uma, recursos necessários, marcos de acompanhamento e como medir evolução.",
    porqueFunciona: "PDIs eficazes focam em 3 competências no máximo — não em 10. Ao limitar o escopo e vincular cada ação a um resultado mensurável, o colaborador tem clareza do que fazer e o gestor tem como acompanhar.",
    exemploOutput: "Competência 1: comunicação executiva. Ação: apresentar resultados mensalmente para a diretoria (começa no mês 2). Recurso: curso de storytelling com dados (R$500). Marco: feedback positivo do diretor na primeira apresentação.",
    tip: "Construa o PDI junto com o colaborador, não para ele. PDIs impostos têm taxa de adesão muito menor do que os co-criados.",
  },
];

const filterOptions = ["Todos", "Vendas", "CS", "Marketing", "Operações", "Jurídico", "Financeiro", "Desenvolvimento", "RH"];

export default function Module4() {
  const [filter, setFilter] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

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

  const toggleExpand = (idx: number) => {
    setExpandedIdx(expandedIdx === idx ? null : idx);
  };

  // Group filtered prompts by area for section headers
  const areas = filter === "Todos"
    ? filterOptions.filter((o) => o !== "Todos")
    : [filter];

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
        <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">Módulo 4</div>
        <h1 className="text-3xl font-bold tracking-tight mb-3 bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
          Prompts Prontos
        </h1>
        <p className="text-lg text-muted-foreground">
          {prompts.length} prompts profissionais para copiar, colar e adaptar. Com explicação de por que cada um funciona.
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-4 animate-fade-in" style={{ animationDelay: "80ms", opacity: 0 }}>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Buscar prompts por título ou conteúdo..."
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
                ? "bg-blue-600 text-white shadow-sm scale-105"
                : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
            )}
          >
            {opt}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-xs text-muted-foreground mb-6">
        {filtered.length} prompt{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
        {searchQuery && ` para "${searchQuery}"`}
      </p>

      {/* Prompts — grouped by area when showing all */}
      {searchQuery || filter !== "Todos" ? (
        <div className="space-y-4">
          {filtered.map((p, i) => (
            <PromptCard
              key={`${p.area}-${p.title}`}
              prompt={p}
              idx={i}
              copiedIdx={copiedIdx}
              expandedIdx={expandedIdx}
              onCopy={copyPrompt}
              onToggle={toggleExpand}
              delay={150 + i * 30}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-10">
          {areas.map((area) => {
            const areaPrompts = filtered.filter((p) => p.area === area);
            if (areaPrompts.length === 0) return null;
            const startIdx = filtered.indexOf(areaPrompts[0]);
            return (
              <div key={area}>
                <div className="mb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={cn("text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider", areaColors[area] || "bg-muted text-muted-foreground")}>
                      {area}
                    </span>
                    <span className="text-xs text-muted-foreground">{areaPrompts.length} prompts</span>
                  </div>
                  {areaIntros[area] && (
                    <p className="text-sm text-muted-foreground italic">{areaIntros[area]}</p>
                  )}
                </div>
                <div className="space-y-3">
                  {areaPrompts.map((p, i) => (
                    <PromptCard
                      key={`${p.area}-${p.title}`}
                      prompt={p}
                      idx={startIdx + i}
                      copiedIdx={copiedIdx}
                      expandedIdx={expandedIdx}
                      onCopy={copyPrompt}
                      onToggle={toggleExpand}
                      delay={100 + i * 40}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* No results */}
      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Nenhum prompt encontrado para esta busca.</p>
          <button onClick={() => { setFilter("Todos"); setSearchQuery(""); }} className="mt-2 text-sm text-blue-600 hover:underline">
            Limpar filtros
          </button>
        </div>
      )}

      {/* Navigation */}
      <div className="mt-10 flex items-center justify-between border-t border-border pt-6">
        <Link
          to="/modulo-3"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Módulo 3
        </Link>
        <Link
          to="/diagnostico"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 hover:shadow-md transition-all"
        >
          Diagnóstico IA
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

interface PromptCardProps {
  prompt: Prompt;
  idx: number;
  copiedIdx: number | null;
  expandedIdx: number | null;
  onCopy: (text: string, idx: number) => void;
  onToggle: (idx: number) => void;
  delay: number;
}

function PromptCard({ prompt: p, idx, copiedIdx, expandedIdx, onCopy, onToggle, delay }: PromptCardProps) {
  const isExpanded = expandedIdx === idx;
  return (
    <div
      className="rounded-xl border border-border bg-card hover:border-blue-500/20 hover:shadow-sm transition-all duration-200 animate-fade-in overflow-hidden"
      style={{ animationDelay: `${delay}ms`, opacity: 0 }}
    >
      {/* Card header */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider", areaColors[p.area] || "bg-muted text-muted-foreground")}>
              {p.area}
            </span>
            <h3 className="font-semibold text-foreground mt-2">{p.title}</h3>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onToggle(idx)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all"
              title={isExpanded ? "Recolher" : "Ver detalhes"}
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isExpanded ? "Menos" : "Detalhes"}</span>
            </button>
            <button
              onClick={() => onCopy(p.prompt, idx)}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                copiedIdx === idx
                  ? "bg-emerald-500/10 text-emerald-600"
                  : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-sm"
              )}
            >
              {copiedIdx === idx ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedIdx === idx ? "Copiado!" : "Copiar"}
            </button>
          </div>
        </div>

        {/* Prompt text */}
        <div className="bg-surface rounded-lg p-4 font-mono text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap border border-border/50">
          {p.prompt}
        </div>
      </div>

      {/* Expanded details */}
      {isExpanded && (
        <div className="border-t border-border bg-accent/30 p-5 space-y-4">
          {/* Por que funciona */}
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Por que funciona</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{p.porqueFunciona}</p>
          </div>

          {/* Exemplo de output */}
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Exemplo de output</span>
            </div>
            <div className="p-3 rounded-lg border border-blue-200 bg-blue-50 text-sm text-foreground leading-relaxed italic">
              {p.exemploOutput}
            </div>
          </div>

          {/* Dica prática */}
          <div>
            <p className="text-xs text-muted-foreground italic flex items-start gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
              <span>{p.tip}</span>
            </p>
          </div>
        </div>
      )}

      {/* Collapsed tip */}
      {!isExpanded && (
        <div className="px-5 pb-4">
          <p className="text-xs text-muted-foreground italic flex items-start gap-1.5">
            <span className="shrink-0">💡</span>
            {p.tip}
          </p>
        </div>
      )}
    </div>
  );
}
