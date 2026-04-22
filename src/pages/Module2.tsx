import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  MessageSquare, Brain, Users, Terminal, Search, Laptop,
  Heart, MousePointerClick, Workflow, Globe, BookOpenCheck,
  ArrowRight, ArrowLeft, Zap, CheckCircle2, Mic, Crown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getToolLogo } from "@/components/ToolLogos";

interface HowToStep {
  step: string;
  action: string;
}

interface BestForItem {
  taskIcon: string;
  task: string;
  why: string;
}

interface Pricing {
  freeTier: string;
  paid?: string;
  paidValue?: string;
}

interface Tool {
  id: string;
  name: string;
  icon: React.ElementType;
  tag: string;
  tagline: string;
  what: string;
  canDo: string[];
  howToStart: HowToStep[];
  starterPrompt?: string;
  bestFor?: BestForItem[];
  pricing?: Pricing;
  realExample: string;
  tip: string;
}

const tools: Tool[] = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    icon: MessageSquare,
    tag: "Assistente IA",
    tagline: "O assistente de IA mais usado do mundo",
    what: "O ChatGPT é um assistente de inteligência artificial que você acessa pelo navegador, sem instalar nada. Você escreve o que precisa — uma tarefa, uma pergunta, um pedido — e ele responde em segundos, como um colega extremamente capaz disponível a qualquer hora do dia.",
    canDo: [
      "Escrever e-mails profissionais com o tom certo para cada situação",
      "Resumir documentos longos nos pontos que realmente importam",
      "Preparar pauta e pontos-chave para qualquer reunião",
      "Responder dúvidas de qualquer área sem precisar pesquisar por horas",
      "Traduzir textos mantendo o contexto e tom profissional",
      "Criar roteiros, apresentações e conteúdos com estrutura clara",
    ],
    howToStart: [
      { step: "1", action: "Acesse chatgpt.com e crie sua conta gratuita — leva menos de 2 minutos" },
      { step: "2", action: "Na caixa de mensagem, escreva: 'Me ajude a escrever um e-mail profissional para [descreva sua situação]'" },
      { step: "3", action: "Leia a resposta, ajuste o que precisar e use — ou peça para ele melhorar: 'Deixe mais direto' ou 'Adicione um tom mais amigável'" },
    ],
    starterPrompt: "Preciso escrever um e-mail para [descreva o destinatário e a situação]. O objetivo é [o que você quer alcançar]. O tom deve ser [profissional / empático / direto]. Escreva o e-mail completo.",
    bestFor: [
      { taskIcon: "💬", task: "Chat geral e brainstorming", why: "Mais versátil, maior ecossistema de plugins e o melhor para explorar ideias livremente" },
      { taskIcon: "🎨", task: "Gerar imagens (DALL-E integrado)", why: "Gemini mais realista para fotos; DALL-E no ChatGPT mais versátil para arte e ilustrações" },
    ],
    pricing: { freeTier: "GPT-4o mini — ótimo para uso diário casual, sem limitações básicas", paid: "ChatGPT Plus — R$100/mês", paidValue: "Necessário para o modelo o4 e para plugins avançados como Code Interpreter" },
    realExample: "Imagina que você precisa mandar um e-mail difícil para um cliente que ficou insatisfeito com um prazo. Você não sabe como começar sem soar na defensiva. Você abre o ChatGPT, explica a situação em duas frases e pede um e-mail profissional e empático. Em menos de 1 minuto você tem o texto pronto. Você ajusta uma palavra, copia e envia. O que levaria 20 minutos de sofrimento levou 2 minutos — e ficou muito melhor do que você escreveria sozinho.",
    tip: "Comece hoje resumindo um documento que você recebeu. Cole o texto, escreva 'Resuma em 5 pontos principais' e veja o resultado. É o caso de uso mais rápido para sentir o poder da ferramenta.",
  },
  {
    id: "claude",
    name: "Claude",
    icon: Brain,
    tag: "Assistente IA",
    tagline: "Análise precisa e escrita de alto nível",
    what: "O Claude é um assistente de IA da empresa Anthropic, reconhecido pela profundidade de análise, precisão e capacidade de lidar com documentos muito longos sem perder o contexto. Se você precisa analisar algo com cuidado ou escrever com mais sofisticação, o Claude costuma ir mais fundo.",
    canDo: [
      "Analisar contratos e documentos extensos apontando riscos e oportunidades",
      "Escrever propostas, relatórios e comunicações de alto impacto",
      "Revisar textos mantendo o seu estilo de escrita",
      "Dar feedback detalhado sobre estratégias, planos e decisões",
      "Criar resumos executivos de materiais muito extensos",
      "Ajudar a estruturar argumentos para negociações ou apresentações",
    ],
    howToStart: [
      { step: "1", action: "Acesse claude.ai e crie sua conta gratuita" },
      { step: "2", action: "Cole um documento, relatório ou texto que você precisa analisar — pode ser longo" },
      { step: "3", action: "Pergunte: 'Quais são os 5 pontos mais importantes aqui?' ou 'O que eu deveria prestar atenção antes de assinar?'" },
    ],
    starterPrompt: "Você é um analista sênior da minha área. Vou te enviar um [documento / relatório / contrato] e preciso que você: (1) identifique os 5 pontos mais importantes, (2) aponte riscos ou inconsistências, (3) sugira o que devo responder ou decidir. Aqui está o conteúdo: [cole o texto]",
    bestFor: [
      { taskIcon: "📝", task: "Escrever textos longos e documentos", why: "Melhor raciocínio e coesão em textos extensos — mantém o contexto até o fim sem perder qualidade" },
      { taskIcon: "📋", task: "Analisar contratos e documentos", why: "Maior janela de contexto do mercado — analisa documentos inteiros com precisão" },
    ],
    pricing: { freeTier: "Claude Sonnet — melhor modelo gratuito de análise disponível hoje", paid: "Claude Pro — R$100/mês", paidValue: "Vale para uso intenso: mais mensagens, projetos e upload de arquivos extensos" },
    realExample: "Imagina que você recebeu um contrato de 40 páginas e tem reunião com o cliente amanhã. Você não vai conseguir ler tudo com atenção. Você cola o texto no Claude e pede: 'Liste os pontos que merecem atenção e as cláusulas que podem ser problemáticas.' Em 2 minutos você tem um mapa completo do documento, com os riscos em destaque. Você chega na reunião preparado — sem ter lido linha por linha.",
    tip: "Envie um e-mail ou relatório longo que está esperando sua atenção e pergunte: 'Qual é a mensagem principal aqui e o que preciso responder ou decidir?' Você vai cortar horas de leitura.",
  },
  {
    id: "claude-cowork",
    name: "Claude Cowork",
    icon: Users,
    tag: "Equipe IA",
    tagline: "Delegue projetos inteiros para múltiplos agentes de IA",
    what: "O Claude Cowork é um modo especial do Claude onde vários assistentes de IA trabalham em paralelo — cada um executando uma parte diferente de uma tarefa ao mesmo tempo. É como ter uma equipe extra que não cansa, não precisa de instrução detalhada e entrega tudo junto.",
    canDo: [
      "Pesquisar, analisar e criar relatórios sobre múltiplos temas simultaneamente",
      "Executar tarefas complexas de ponta a ponta sem você acompanhar cada etapa",
      "Comparar múltiplas opções, cenários ou concorrentes em paralelo",
      "Automatizar sequências de trabalho que hoje demoram meio dia",
      "Delegar projetos inteiros descrevendo apenas o resultado que você quer",
    ],
    howToStart: [
      { step: "1", action: "Acesse claude.ai, faça login e abra o modo de projetos" },
      { step: "2", action: "Descreva a tarefa completa que você quer delegar — quanto mais contexto, melhor" },
      { step: "3", action: "O Claude vai mostrar o plano de execução antes de começar — aprove e acompanhe o resultado" },
    ],
    bestFor: [
      { taskIcon: "🤝", task: "Delegação de tarefas complexas", why: "Múltiplos agentes trabalhando em paralelo — delega projetos inteiros e recebe de volta pronto" },
    ],
    realExample: "Imagina que você precisa de um relatório comparativo sobre três concorrentes: o que cada um oferece, os pontos fracos e as oportunidades para você. Normalmente isso levaria um dia de pesquisa. Com o Claude Cowork, você descreve o que precisa e três agentes trabalham em paralelo — um por concorrente. Em 15 minutos você tem o relatório completo, com os três comparados lado a lado, pronto para apresentar.",
    tip: "Tente delegar uma tarefa que normalmente tomaria meio período: 'Pesquise os 5 maiores concorrentes do mercado [X], liste seus produtos, preços e diferencial.' Você vai ver quanto tempo dá para recuperar.",
  },
  {
    id: "claude-code",
    name: "Claude Code",
    icon: Terminal,
    tag: "Criação de Sistemas",
    tagline: "A ferramenta de IA mais adotada no mercado — e menos de 1% das empresas usa",
    what: "O Claude Code é uma ferramenta que roda no terminal do seu computador e transforma o que você descreve em linguagem normal em sistemas, automações, scripts e integrações funcionais — sem você precisar saber programar. Mas mais do que uma ferramenta de criação, o Claude Code é uma nova forma de operar sua empresa. Em março de 2026, a SemiAnalysis publicou um artigo chamado 'Claude Code is the Inflection Point', argumentando que ele vai 'reprecificar a margem de toda empresa de informação que faz trabalho repetível'. Quem estiver na ponta certa dessa curva lucra. Quem estiver na errada fecha.",
    canDo: [
      "Criar formulários e sistemas internos sem depender do time de TI",
      "Automatizar relatórios que hoje você monta na mão toda semana",
      "Construir dashboards para acompanhar métricas do time",
      "Organizar e processar dados de planilhas automaticamente",
      "Conectar ferramentas que hoje não se conversam",
      "Cadastrar dezenas ou centenas de registros em plataformas sem tocar no teclado",
      "Executar tarefas repetitivas no navegador de forma completamente autônoma",
    ],
    howToStart: [
      { step: "1", action: "Instale o Claude Code: abra o terminal e execute 'npm install -g @anthropic-ai/claude-code'" },
      { step: "2", action: "Na pasta do seu projeto, execute 'claude' — ele abre um chat direto no terminal com contexto completo do que está naquela pasta" },
      { step: "3", action: "Descreva em português o que você quer criar ou automatizar. Ele vai perguntar, construir e testar. Você só aprova ou pede ajustes" },
    ],
    bestFor: [
      { taskIcon: "💻", task: "Código e sistemas sem equipe de TI", why: "Claude Code entende projetos inteiros e executa tarefas autônomas no navegador — além de criar scripts e automações" },
    ],
    realExample: "Imagina que você precisa cadastrar 70 pessoas numa plataforma. Antes disso levava horas: abrir a planilha com nome, CPF, e-mail, telefone e endereço de cada pessoa, copiar, colar no sistema, conferir. Com o Claude Code e a extensão do Chrome ativada, você descreve o processo uma única vez: 'Pega os dados da planilha e cadastra cada pessoa nessa plataforma'. Ele faz tudo sozinho — sem você precisar ficar na frente do computador, sem delegar para estagiário, sem erros de digitação.",
    tip: "Crie um arquivo CLAUDE.md na raiz do seu projeto. Esse arquivo é o 'contrato de trabalho' do agente: descreva sua empresa, seus processos, suas regras e o tom que ele deve usar. Toda vez que ele fizer algo errado, adicione a correção nesse arquivo. Ele aprende para sempre.",
  },
  {
    id: "gemini",
    name: "Gemini",
    icon: Search,
    tag: "Assistente IA",
    tagline: "IA do Google dentro das ferramentas que você já usa",
    what: "O Gemini é a IA do Google, e a grande diferença é que ele já está integrado às ferramentas que você provavelmente usa todo dia: Gmail, Google Docs, Google Sheets e Google Meet. Você não muda nada — a IA aparece dentro do que você já conhece.",
    canDo: [
      "Resumir threads longas de e-mail em pontos de ação claros",
      "Criar documentos e apresentações a partir de um briefing rápido",
      "Analisar planilhas e gerar insights sem precisar de fórmulas complexas",
      "Resumir reuniões do Google Meet com próximos passos e responsáveis",
      "Redigir respostas de e-mail com base no contexto da conversa",
    ],
    howToStart: [
      { step: "1", action: "Acesse gemini.google.com ou, se sua empresa usa Google Workspace, procure o ícone do Gemini no Gmail" },
      { step: "2", action: "Abra um e-mail longo ou um documento e clique em 'Resumir com Gemini'" },
      { step: "3", action: "Leia o resumo e peça o próximo passo: 'O que eu preciso responder aqui?' ou 'Crie um documento com os pontos principais'" },
    ],
    starterPrompt: "Abra o Gmail ou Google Docs, clique no ícone do Gemini e escreva: 'Resuma essa conversa e me diga o que precisa de resposta urgente.' Se ainda não tem acesso, acesse gemini.google.com e pergunte: 'Crie um e-mail profissional sobre [situação].'",
    bestFor: [
      { taskIcon: "📧", task: "E-mails e documentos no Google Workspace", why: "Integrado nativamente no Gmail, Docs, Sheets e Meet — sem copiar e colar nada" },
    ],
    pricing: { freeTier: "Gemini 2.0 Flash integrado no Google Workspace gratuitamente", paid: "Gemini Advanced — R$100/mês", paidValue: "Mais uso e integração avançada com Google Drive empresarial" },
    realExample: "Imagina que você chegou na segunda-feira com 47 e-mails na caixa. Com o Gemini ativo no Gmail, você seleciona as threads mais longas e pede um resumo de cada uma. Em 10 minutos você sabe o que realmente precisa de atenção, o que pode esperar e o que já foi resolvido — sem ler linha por linha. O que levaria uma hora de triagem virou 10 minutos de revisão.",
    tip: "Se você usa Google Workspace, ative o Gemini hoje. Comece pedindo para resumir o e-mail mais longo da sua caixa. Você vai economizar tempo todo dia.",
  },
  {
    id: "copilot",
    name: "Microsoft Copilot",
    icon: Laptop,
    tag: "Assistente IA",
    tagline: "IA dentro do Word, Excel, PowerPoint e Teams",
    what: "O Microsoft Copilot é a IA que fica dentro do Word, Excel, PowerPoint e Teams — tudo que provavelmente já está instalado no computador do seu trabalho. Você não precisa aprender nada novo: a IA aparece nas ferramentas que você já usa todo dia.",
    canDo: [
      "Criar apresentações de PowerPoint a partir de um briefing de texto",
      "Analisar planilhas do Excel e identificar padrões automaticamente",
      "Resumir reuniões do Teams com lista de decisões e próximos passos",
      "Redigir e revisar documentos no Word a partir de anotações brutas",
      "Criar e-mails no Outlook com base no contexto da situação",
    ],
    howToStart: [
      { step: "1", action: "Verifique com seu gestor ou TI se sua empresa tem licença do Microsoft 365 Copilot" },
      { step: "2", action: "Abra qualquer aplicativo Office e procure o ícone do Copilot na barra superior" },
      { step: "3", action: "Na próxima reunião do Teams, ative o Copilot e, ao final, peça: 'Gere um resumo com as decisões tomadas e os próximos passos'" },
    ],
    bestFor: [
      { taskIcon: "💼", task: "E-mails e documentos no Microsoft 365", why: "Integrado no Outlook, Word, Excel e Teams — aparece onde você já trabalha, sem mudar de ferramenta" },
    ],
    realExample: "Imagina que você precisa preparar uma apresentação para a diretoria até amanhã. Você abre o PowerPoint, aciona o Copilot e digita: 'Crie uma apresentação sobre os resultados do primeiro trimestre com os seguintes dados: [cola os números].' Em 3 minutos você tem slides estruturados, com títulos e blocos de conteúdo. Você ajusta o visual e está pronto para apresentar.",
    tip: "Na próxima reunião do Teams, ative o Copilot e peça um resumo ao final. Você nunca mais vai fazer ata de reunião manualmente.",
  },
  {
    id: "lovable",
    name: "Lovable",
    icon: Heart,
    tag: "Criação de Apps",
    tagline: "Da ideia ao sistema funcionando, sem escrever código",
    what: "O Lovable é uma plataforma onde você descreve em português o que quer criar — um formulário, um sistema, um site — e ela constrói a aplicação completa, com banco de dados e tudo. Da ideia ao produto funcionando, muitas vezes em menos de uma hora.",
    canDo: [
      "Criar sistemas de gestão internos sem depender de TI ou orçamento de dev",
      "Construir formulários de aprovação com notificações automáticas por e-mail",
      "Montar sites e landing pages para projetos e campanhas",
      "Criar painéis de acompanhamento de métricas para o time",
      "Desenvolver ferramentas de coleta de dados e feedbacks com visual profissional",
    ],
    howToStart: [
      { step: "1", action: "Acesse lovable.dev e crie sua conta gratuita" },
      { step: "2", action: "Na caixa de texto, descreva o que você quer: 'Quero um formulário de solicitação de férias que notifica o gestor por e-mail'" },
      { step: "3", action: "Acompanhe a construção ao vivo, peça ajustes em português e publique com um clique quando estiver pronto" },
    ],
    bestFor: [
      { taskIcon: "🚀", task: "Criar apps e sistemas sem código", why: "Do prompt ao app funcional com banco de dados — sem escrever uma linha de código" },
    ],
    pricing: { freeTier: "Créditos gratuitos para criar seus primeiros apps e protótipos", paid: "Planos a partir de R$100/mês", paidValue: "Para projetos em produção e apps com usuários reais que precisam de mais créditos" },
    realExample: "Imagina que seu time recebe pedidos de clientes pelo WhatsApp e e-mail, e muita coisa acaba se perdendo. Você abre o Lovable, descreve o sistema que você precisaria em 3 frases e em 40 minutos tem um sistema completo rodando: formulário de entrada, banco de dados e notificação automática para o responsável. Sem pagar developer, sem esperar a TI.",
    tip: "Comece descrevendo um formulário que seu time usa hoje no papel ou em uma planilha. Veja o Lovable construí-lo ao vivo. A partir daí, você vai enxergar o que mais é possível criar.",
  },
  {
    id: "cursor",
    name: "Cursor",
    icon: MousePointerClick,
    tag: "Criação de Apps",
    tagline: "Editor inteligente que entende o projeto inteiro",
    what: "O Cursor é um editor de código que tem IA integrada de forma profunda — você conversa com ele em linguagem normal e ele faz mudanças no projeto inteiro. A diferença dos outros é que ele entende o contexto completo do que já existe, não só um trecho isolado.",
    canDo: [
      "Criar ferramentas e scripts a partir de descrições em português",
      "Ajustar sistemas existentes sem precisar entender o código linha por linha",
      "Automatizar processos repetitivos com scripts personalizados",
      "Construir painéis de dados conectados a planilhas e outros sistemas",
      "Fazer modificações em múltiplas partes de um projeto com um único pedido",
    ],
    howToStart: [
      { step: "1", action: "Baixe o Cursor em cursor.com — é gratuito para começar" },
      { step: "2", action: "Abra uma pasta com arquivos do seu projeto e pressione Ctrl+I (ou Cmd+I no Mac)" },
      { step: "3", action: "Descreva o que você quer fazer em português e revise as mudanças antes de confirmar" },
    ],
    bestFor: [
      { taskIcon: "💻", task: "Código com IA dentro do editor", why: "Cursor integra IA direto no editor e entende o contexto de todo o projeto, não só um trecho" },
    ],
    realExample: "Imagina que você tem uma planilha enorme de dados de clientes e quer criar um relatório visual que atualiza automaticamente toda semana. Você abre o Cursor, descreve o que quer e ele cria o script. Você não precisa entender o código — só precisa entender o resultado. E quando quiser mudar algo, só pede em português: 'Adiciona um gráfico de barras aqui' e ele ajusta.",
    tip: "Baixe o Cursor e peça algo simples: 'Crie um script que lê um arquivo CSV e me mostra as 10 linhas com maior valor na coluna X.' Você vai ver como é diferente de qualquer ferramenta que já usou.",
  },
  {
    id: "n8n",
    name: "n8n",
    icon: Workflow,
    tag: "Automação",
    tagline: "Conecte suas ferramentas e elimine trabalho manual",
    what: "O n8n é uma plataforma visual de automação onde você conecta suas ferramentas — Gmail, Sheets, Slack, CRM, WhatsApp — e cria fluxos automáticos que rodam sozinhos. É o 'se isso acontecer, faça aquilo' em escala profissional, sem escrever código.",
    canDo: [
      "Registrar leads automaticamente no CRM assim que preencherem um formulário",
      "Enviar alertas no Slack quando metas forem atingidas ou clientes em risco",
      "Gerar relatórios semanais consolidando dados de várias fontes automaticamente",
      "Classificar e-mails por prioridade usando IA e encaminhar para a pessoa certa",
      "Sincronizar dados entre sistemas que não se conversam nativamente",
      "Criar notificações automáticas para o time baseadas em eventos do dia",
    ],
    howToStart: [
      { step: "1", action: "Acesse n8n.io e comece com a versão gratuita na nuvem — sem instalar nada" },
      { step: "2", action: "Na galeria de templates, procure pelo nome de uma ferramenta que você usa (ex: Gmail, Sheets, Slack)" },
      { step: "3", action: "Escolha um template pronto, conecte suas contas e ative — ele roda sozinho a partir daí" },
    ],
    bestFor: [
      { taskIcon: "⚙️", task: "Automação e integrações sem código", why: "Visual, poderoso e gratuito no self-hosted — conecta qualquer ferramenta sem escrever código" },
    ],
    pricing: { freeTier: "Self-hosted gratuito — instale no seu servidor e use sem nenhum limite", paid: "n8n Cloud — ~R$100/mês", paidValue: "Para quem não quer gerenciar servidor próprio e prefere a conveniência da nuvem" },
    realExample: "Imagina que cada vez que um lead preenche seu formulário de contato, alguém precisa abrir o formulário, copiar nome, e-mail e telefone, colar no CRM, mudar o status para 'novo', abrir o WhatsApp ou e-mail para mandar a mensagem de boas-vindas e depois avisar o vendedor responsável no Slack. São 6 cliques manuais, feitos várias vezes por dia, por pessoas que têm coisas mais importantes para fazer — e que às vezes esquecem, ou erram o dado, ou mandam a mensagem com atraso. O custo não é só de tempo: é de oportunidade perdida. Com o n8n, você configura esse fluxo uma vez — e ele executa automaticamente para sempre. Ninguém mais precisa lembrar, ninguém mais erra, nenhum lead esfria por falta de resposta rápida.",
    tip: "Escolha um processo que se repete toda semana de forma manual — muito provavelmente o n8n consegue automatizar. Comece pesquisando o template pela ferramenta que você usa: 'Gmail n8n template', 'Sheets n8n template'.",
  },
  {
    id: "perplexity",
    name: "Perplexity",
    icon: Globe,
    tag: "Pesquisa IA",
    tagline: "Pesquisa profissional com fontes verificadas em minutos",
    what: "O Perplexity é um motor de busca com inteligência artificial que, ao contrário do Google, não te dá uma lista de links — ele pesquisa, lê as fontes e entrega a resposta completa com as referências citadas. Pesquisa profissional que levaria horas, em poucos minutos.",
    canDo: [
      "Pesquisar concorrentes e mercado com dados atualizados e fontes confiáveis",
      "Levantar estatísticas e dados para relatórios sem vasculhar dezenas de sites",
      "Entender tendências do seu setor antes de reuniões ou apresentações",
      "Pesquisar legislações e regulamentações com as citações das fontes originais",
      "Comparar produtos, serviços ou soluções com uma análise estruturada",
    ],
    howToStart: [
      { step: "1", action: "Acesse perplexity.ai — não precisa criar conta para começar" },
      { step: "2", action: "Digite sua pergunta de forma direta: 'Quais são os principais desafios do mercado de [seu setor] em 2025?'" },
      { step: "3", action: "Leia a resposta e verifique as fontes clicando nas referências — use os dados com confiança" },
    ],
    starterPrompt: "Quais são as principais tendências, desafios e oportunidades do mercado de [seu setor] em 2025? Traga dados atualizados e cite as fontes.",
    bestFor: [
      { taskIcon: "🔍", task: "Pesquisa com fontes verificadas", why: "Cita fontes reais e atualizadas — não alucina tanto quanto os outros modelos" },
      { taskIcon: "⚡", task: "Pesquisa rápida antes de reuniões", why: "Respostas diretas com fontes — mais rápido e confiável que o Google para pesquisa profissional" },
    ],
    pricing: { freeTier: "5 pesquisas avançadas por dia — suficiente para uso casual", paid: "Perplexity Pro — ~R$100/mês", paidValue: "Vale para quem faz pesquisa de mercado, concorrentes ou legislação com alta frequência" },
    realExample: "Imagina que você tem uma reunião com um cliente novo em uma hora e quer chegar preparado sobre o setor dele. Você abre o Perplexity, digita o nome do setor e pede as principais tendências, desafios e oportunidades. Em 3 minutos você tem um briefing completo com fontes confiáveis citadas. Você chega na reunião parecendo que pesquisou o fim de semana todo — levou 5 minutos.",
    tip: "Antes da sua próxima reunião importante, pesquise no Perplexity sobre a empresa ou setor do cliente. Você vai impressionar com o nível de preparo — e levou só 5 minutos.",
  },
  {
    id: "notebooklm",
    name: "NotebookLM",
    icon: BookOpenCheck,
    tag: "Base de Conhecimento",
    tagline: "Seus documentos viram uma base que você pode interrogar",
    what: "O NotebookLM é uma ferramenta gratuita do Google onde você sobe seus próprios documentos — contratos, relatórios, atas, manuais — e passa a fazer perguntas sobre eles como se estivesse conversando com alguém que leu tudo com atenção e lembra de cada detalhe.",
    canDo: [
      "Fazer perguntas específicas sobre contratos sem precisar reler todo o documento",
      "Transformar atas de reunião em resumos com decisões e próximas ações",
      "Criar guias de onboarding a partir de documentos internos da empresa",
      "Estudar materiais extensos fazendo perguntas sobre o que não entendeu",
      "Comparar informações de vários documentos ao mesmo tempo",
      "Gerar um podcast de áudio que resume os seus documentos automaticamente",
    ],
    howToStart: [
      { step: "1", action: "Acesse notebooklm.google.com com sua conta Google — é gratuito" },
      { step: "2", action: "Crie um novo notebook e faça o upload de 1 a 5 documentos do seu trabalho (PDF, Docs, etc.)" },
      { step: "3", action: "Na caixa de chat, faça qualquer pergunta sobre os documentos que você subiu — ele responde com base no conteúdo" },
    ],
    starterPrompt: "Suba seus documentos e pergunte: 'Quais são as principais decisões tomadas nesses documentos? O que está pendente? Quem ficou responsável por cada ação?' — adapte para os seus arquivos.",
    bestFor: [
      { taskIcon: "📚", task: "Base de conhecimento dos seus documentos", why: "Faz perguntas sobre seus próprios docs — respostas com referência à fonte exata, não palpites" },
      { taskIcon: "📋", task: "Analisar múltiplos documentos em paralelo", why: "Ideal quando você tem 5+ arquivos e precisa cruzar informações entre eles rapidamente" },
    ],
    pricing: { freeTier: "100% gratuito — sem limites práticos para uso individual ou de pequenas equipes" },
    realExample: "Imagina que você precisa revisar 5 atas de reunião para preparar uma atualização sobre o andamento de um projeto. Normalmente você leria as 5 uma por uma para juntar as informações. Com o NotebookLM, você sobe todas as 5 e pergunta: 'Quais decisões foram tomadas? O que está atrasado? Quem ficou responsável pelo quê?' Em 2 minutos você tem o resumo completo de tudo — com referência para cada ata.",
    tip: "Suba os 3 documentos mais importantes do seu trabalho atual e faça a pergunta que você mais evita responder por preguiça de pesquisar. Você vai se surpreender com a qualidade e a precisão da resposta.",
  },
  {
    id: "transcricao",
    name: "Transcrição de Reuniões",
    icon: Mic,
    tag: "Transcrição",
    tagline: "Pare de tomar notas — deixa a IA registrar tudo",
    what: "Nunca mais perca uma decisão importante. Ferramentas como tl;dv, Fireflies.ai e Otter.ai entram nas suas reuniões como participantes silenciosos, transcrevem cada palavra em tempo real, geram resumos automáticos com os pontos principais e criam listas de ações com responsáveis — tudo sem você precisar tomar uma nota sequer.",
    canDo: [
      "Gravar e transcrever reuniões do Google Meet, Zoom e Teams automaticamente",
      "Gerar resumo executivo com decisões e próximos passos ao final de cada reunião",
      "Buscar qualquer trecho de uma reunião antiga por palavra-chave",
      "Compartilhar o resumo da reunião com quem não pôde participar",
      "Criar itens de ação com responsáveis a partir do que foi discutido",
    ],
    howToStart: [
      { step: "1", action: "Escolha uma ferramenta: tl;dv (tldv.io) para resumos automáticos, Fireflies.ai para arquivo pesquisável, ou Otter.ai para transcrição em tempo real" },
      { step: "2", action: "Crie sua conta gratuita e conecte com o Google Calendar — ele vai entrar automaticamente nas suas próximas reuniões" },
      { step: "3", action: "Na próxima reunião, o bot entra como participante, grava tudo e você recebe o resumo por e-mail quando ela terminar" },
    ],
    bestFor: [
      { taskIcon: "🎙️", task: "Transcrição automática de reuniões", why: "Entra nas reuniões como participante silencioso, transcreve tudo e entrega resumo com itens de ação" },
    ],
    pricing: { freeTier: "tl;dv: 10 reuniões/mês com resumo automático — suficiente para começar", paid: "tl;dv Pro — ~R$200/mês", paidValue: "Para equipes com alta frequência de reuniões ou que precisam de integração com CRM" },
    realExample: "Imagina que você tem 4 reuniões por dia e no final do expediente precisa lembrar de tudo que foi decidido para atualizar o time. Com o tl;dv ativo, cada reunião gera automaticamente um resumo com os highlights, as decisões tomadas e os itens de ação com responsáveis. Você recebe por e-mail antes de a reunião terminar. Nunca mais você vai sair de uma call sem saber o que ficou combinado.",
    tip: "Ative o tl;dv hoje e configure para entrar automaticamente em todas as suas reuniões do Google Meet. Na primeira semana você vai economizar horas de anotações e follow-ups. Use o tier gratuito — ele já é suficiente para quem tem até 10 reuniões por mês.",
  },
];

export default function Module2() {
  const [activeToolId, setActiveToolId] = useState(tools[0].id);
  const [animKey, setAnimKey] = useState(0);

  const activeTool = tools.find((t) => t.id === activeToolId)!;
  const currentIdx = tools.findIndex((t) => t.id === activeToolId);
  const nextTool = currentIdx < tools.length - 1 ? tools[currentIdx + 1] : null;
  const prevTool = currentIdx > 0 ? tools[currentIdx - 1] : null;

  useEffect(() => {
    const stored = localStorage.getItem("virada-visited");
    const arr: string[] = stored ? JSON.parse(stored) : [];
    if (!arr.includes("modulo-2")) {
      arr.push("modulo-2");
      localStorage.setItem("virada-visited", JSON.stringify(arr));
    }
  }, []);

  const goToTool = (id: string) => {
    setActiveToolId(id);
    setAnimKey((k) => k + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Breadcrumb */}
      <div className="mb-6 animate-fade-in">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Voltar ao início
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8 animate-fade-in" style={{ animationDelay: "50ms", opacity: 0 }}>
        <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">Módulo 2</div>
        <h1 className="text-3xl font-bold tracking-tight mb-3 bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent">
          As Ferramentas
        </h1>
        <p className="text-lg text-muted-foreground">
          As ferramentas que os profissionais mais valorizados já dominam — e como usar cada uma no seu trabalho.
        </p>
      </div>

      {/* Progress bar */}
      <div
        className="mb-6 animate-fade-in"
        style={{ animationDelay: "80ms", opacity: 0 }}
      >
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-muted-foreground font-medium">
            Ferramenta {currentIdx + 1} de {tools.length}
          </span>
        </div>
        <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-500"
            style={{ width: `${((currentIdx + 1) / tools.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Tab pills */}
      <div
        className="flex flex-wrap gap-1.5 mb-8 pb-6 border-b border-border animate-fade-in"
        style={{ animationDelay: "100ms", opacity: 0 }}
      >
        {tools.map((tool) => {
          const Logo = getToolLogo(tool.id);
          const isClaude = tool.id === "claude";
          const isActive = activeToolId === tool.id;
          return (
            <button
              key={tool.id}
              onClick={() => goToTool(tool.id)}
              className={cn(
                "flex items-center gap-1.5 rounded-lg font-semibold transition-all duration-200",
                isClaude
                  ? cn(
                      "px-4 py-2 text-sm ring-2 ring-offset-1",
                      isActive
                        ? "bg-blue-600 text-white shadow-md shadow-blue-300/40 ring-blue-400"
                        : "bg-blue-50 text-blue-700 hover:bg-blue-100 ring-blue-300 dark:bg-blue-950/40 dark:text-blue-300 dark:ring-blue-800 dark:hover:bg-blue-900/50"
                    )
                  : cn(
                      "px-3 py-1.5 text-xs",
                      isActive
                        ? "bg-blue-600 text-white shadow-sm shadow-blue-200"
                        : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
                    )
              )}
            >
              {Logo && <Logo className={isClaude ? "w-4 h-4" : "w-3.5 h-3.5"} />}
              {tool.name}
              {isClaude && !isActive && (
                <span className="ml-1 text-[9px] font-bold bg-blue-200 text-blue-700 px-1.5 py-0.5 rounded-full uppercase tracking-wider dark:bg-blue-800 dark:text-blue-200">
                  Principal
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tool content — key triggers re-animation on change */}
      <div key={`${activeTool.id}-${animKey}`} className="animate-fade-in">
        {/* Tool header */}
        <div className="flex items-start gap-4 mb-8 p-5 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
          <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center shrink-0">
            {(() => {
              const Logo = getToolLogo(activeTool.id);
              return Logo ? <Logo className="w-8 h-8" /> : <activeTool.icon className="w-7 h-7 text-accent-foreground" />;
            })()}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h2 className="text-2xl font-bold text-foreground">{activeTool.name}</h2>
              <span className="text-[10px] font-bold bg-blue-500/10 text-blue-600 px-2 py-0.5 rounded-full uppercase tracking-wider">
                {activeTool.tag}
              </span>
            </div>
            <p className="text-muted-foreground">{activeTool.tagline}</p>
          </div>
        </div>

        {/* O que é */}
        <section className="mb-8">
          <h3 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-blue-500/10 flex items-center justify-center text-xs text-blue-600 font-bold">1</span>
            O que é
          </h3>
          <p className="text-muted-foreground leading-relaxed">{activeTool.what}</p>
        </section>

        {/* O que você pode fazer */}
        <section className="mb-8">
          <h3 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-blue-500/10 flex items-center justify-center text-xs text-blue-600 font-bold">2</span>
            O que você pode fazer com ela
          </h3>
          <ul className="space-y-2">
            {activeTool.canDo.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Como começar agora */}
        <section className="mb-8">
          <h3 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-blue-500/10 flex items-center justify-center text-xs text-blue-600 font-bold">3</span>
            Como começar agora
          </h3>
          <div className="space-y-3">
            {activeTool.howToStart.map((s, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card hover:border-blue-500/20 hover:shadow-sm transition-all">
                <span className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                  {s.step}
                </span>
                <p className="text-sm text-foreground leading-relaxed">{s.action}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Prompt para começar agora */}
        {activeTool.starterPrompt && (
          <section className="mb-8">
            <h3 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-blue-500/10 flex items-center justify-center text-xs text-blue-600 font-bold">→</span>
              Prompt para começar agora
            </h3>
            <div className="rounded-xl border border-blue-500/20 bg-blue-50/50 dark:bg-blue-950/20 p-4">
              <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">Copie, cole e adapte</p>
              <p className="text-sm text-foreground leading-relaxed font-mono whitespace-pre-wrap">{activeTool.starterPrompt}</p>
            </div>
          </section>
        )}

        {/* Quando usar esta ferramenta */}
        {activeTool.bestFor && activeTool.bestFor.length > 0 && (
          <section className="mb-8">
            <h3 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-blue-500/10 flex items-center justify-center text-xs text-blue-600 font-bold">★</span>
              Quando usar esta ferramenta
            </h3>
            <div className="space-y-2">
              {activeTool.bestFor.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-blue-500/15 bg-blue-50/50 dark:bg-blue-950/20">
                  <span className="text-xl shrink-0">{item.taskIcon}</span>
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-0.5">{item.task}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.why}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Gratuito vs Pago */}
        {activeTool.pricing && (
          <section className="mb-8">
            <h3 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-blue-500/10 flex items-center justify-center text-xs text-blue-600 font-bold">$</span>
              Gratuito vs Pago
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-start gap-2.5 p-4 rounded-xl bg-emerald-50 border border-emerald-100 dark:bg-emerald-950/20 dark:border-emerald-900/30">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-1">Grátis</p>
                  <p className="text-xs text-foreground leading-relaxed">{activeTool.pricing.freeTier}</p>
                </div>
              </div>
              {activeTool.pricing.paid ? (
                <div className="flex items-start gap-2.5 p-4 rounded-xl bg-amber-50 border border-amber-100 dark:bg-amber-950/20 dark:border-amber-900/30">
                  <Crown className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] font-bold text-amber-600 uppercase tracking-wider mb-1">{activeTool.pricing.paid}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{activeTool.pricing.paidValue}</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-2.5 p-4 rounded-xl bg-muted/50 border border-border">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-foreground leading-relaxed">Sem plano pago necessário para uso individual</p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Lovable referral card + CTA */}
        {activeTool.id === "lovable" && (
          <section className="mb-8">
            <div className="p-5 rounded-xl border-2 border-primary/30 bg-primary/5">
              <h4 className="text-base font-bold text-foreground mb-2">Acesse o Lovable pelo link abaixo</h4>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Crie sua conta e ganhe créditos para começar a construir. Você não precisa saber programar — descreve o que quer em português e o Lovable constrói pra você.
              </p>
              <a
                href="https://lovable.dev/invite/FBXCYRR"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-primary hover:underline"
              >
                https://lovable.dev/invite/FBXCYRR
              </a>
            </div>
            <a
              href="https://lovable.dev/invite/FBXCYRR"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 hover:shadow-md hover:shadow-primary/20 transition-all"
            >
              Criar conta no Lovable
              <ArrowRight className="w-4 h-4" />
            </a>
          </section>
        )}

        {activeTool.id === "claude" && (
          <>
            {/* Bloco 1: Dado de mercado — o padrão invisível */}
            <section className="mb-8">
              <div className="p-6 rounded-2xl border border-border bg-card shadow-sm">
                <h3 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-amber-500/10 flex items-center justify-center text-xs text-amber-600 font-bold">!</span>
                  O padrão que poucos enxergam
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Existem <strong className="text-foreground">360 milhões de empresas no mundo</strong>. Menos de 1% usa IA para gestão de verdade. E menos de <strong className="text-foreground">0,04% opera com Claude Code</strong> — uma proporção tão pequena que, quando foram gerar um gráfico para visualizar, a bolinha vermelha que representava esse grupo sequer apareceu. Foram necessárias 2.500 bolinhas para que uma delas pudesse ser vermelha.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Isso significa que qualquer pessoa que comece a usar hoje já está à frente de praticamente todo o mercado brasileiro. Não é exagero — é aritmética.
                </p>
              </div>
            </section>

            {/* Bloco 2: MCP — o protocolo que mudou tudo */}
            <section className="mb-8">
              <h3 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-blue-500/10 flex items-center justify-center text-xs text-blue-600 font-bold">★</span>
                MCP: o "USB-C da era da IA"
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-5">
                O <strong className="text-foreground">MCP (Model Context Protocol)</strong> é um protocolo criado pela Anthropic que o mercado inteiro adotou como padrão. ChatGPT adotou. Google adotou. Cursor adotou. Na prática, é um conector universal que permite ao Claude Code entrar dentro das suas plataformas e executar por você.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-5">
                Antes, a API conectava plataforma A com plataforma B. Com MCP, a inteligência artificial conecta você com <strong className="text-foreground">todas as suas plataformas ao mesmo tempo</strong>. O Claude deixa de ser um chatbot isolado e se torna um funcionário com acesso real aos seus sistemas.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                {[
                  "Gmail", "Google Calendar", "Google Drive", "Notion",
                  "Slack", "Stripe", "Figma", "Canva",
                  "Meta Ads", "n8n", "Supabase", "GitHub",
                ].map((tool) => (
                  <div
                    key={tool}
                    className="px-3 py-2 rounded-lg border border-border bg-accent text-xs font-semibold text-foreground text-center"
                  >
                    {tool}
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                Mais de <strong>6.000 aplicativos</strong> já são plugáveis via MCP. Se a ferramenta que você usa ainda não tem integração, vai ter. E se não tiver, vai ser substituída por uma que tenha.
              </p>
            </section>

            {/* Bloco 3: Extensão do Chrome */}
            <section className="mb-8">
              <div className="p-6 rounded-2xl border border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/30">
                <h3 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-blue-500/10 flex items-center justify-center text-xs text-blue-600 font-bold">↗</span>
                  Claude no Chrome: o agente que navega por você
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  A extensão do Claude para o Google Chrome transforma o navegador em um ambiente onde o Claude age — não só responde. Você descreve o que precisa fazer e ele clica, preenche, navega e executa. Como se tivesse um assistente com acesso ao seu computador.
                </p>
                <div className="p-4 rounded-xl border border-blue-200 bg-white dark:bg-background dark:border-blue-800 mb-4">
                  <p className="text-sm font-semibold text-foreground mb-2">Caso real de uso:</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    "Eu precisava cadastrar mais de 70 pessoas em uma plataforma. Antes, pegava as informações da planilha — nome, CPF, e-mail, telefone, endereço — e copiava e colava campo por campo. Com o Claude no Chrome, descrevi onde ele pega os dados e como ele faz o cadastro. Depois disso, ele fez tudo sozinho. Não precisei gastar horas fazendo isso ou destinar meu estagiário para a tarefa."
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">
                  Disponível em <strong>claude.ai</strong> → instale a extensão no Chrome e conecte com sua conta.
                </p>
              </div>
            </section>

            {/* Bloco 4: Cases reais */}
            <section className="mb-8">
              <h3 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-emerald-500/10 flex items-center justify-center text-xs text-emerald-600 font-bold">✓</span>
                Quem já está usando — e o que aconteceu
              </h3>
              <div className="space-y-4">
                <div className="p-5 rounded-xl border border-border bg-card hover:border-blue-500/20 hover:shadow-sm transition-all">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0 text-sm font-bold text-blue-700">J</div>
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-1">Jaana Dogan — engenheira ex-Google</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Entregou ao Claude Code três parágrafos descrevendo um problema que o time dela trabalhou por <strong className="text-foreground">um ano inteiro</strong>. O Claude construiu o protótipo funcional <strong className="text-foreground">em uma hora</strong>. A frase dela: "Um ano contra uma hora."
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-xl border border-border bg-card hover:border-blue-500/20 hover:shadow-sm transition-all">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0 text-sm font-bold text-blue-700">E</div>
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-1">Epic Systems — o software que está em 1 de cada 3 hospitais dos EUA</p>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                        A Epic é uma das maiores empresas de software médico do mundo. Seu sistema, o MyChart, está presente em <strong className="text-foreground">mais de um terço de todos os hospitais dos Estados Unidos</strong> — são centenas de milhões de registros de pacientes gerenciados por eles.
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        A Epic revelou que <strong className="text-foreground">mais da metade do uso interno de Claude Code vem de áreas que não são de desenvolvimento</strong>: marketing, operações, produto, área clínica. Metade do uso não é de dev. Isso quebra o mito de que Claude Code é "só para programadores".
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* Transcrição — three sub-tools breakdown */}
        {activeTool.id === "transcricao" && (
          <section className="mb-8">
            <h3 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-blue-500/10 flex items-center justify-center text-xs text-blue-600 font-bold">★</span>
              As 3 ferramentas dessa categoria
            </h3>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                {
                  name: "tl;dv",
                  url: "tldv.io",
                  free: true,
                  desc: "Grava, transcreve e resume reuniões do Google Meet e Zoom. Gera itens de ação automáticos e highlights com timestamp. Melhor para quem quer o resumo pronto sem esforço.",
                },
                {
                  name: "Fireflies.ai",
                  url: "fireflies.ai",
                  free: true,
                  desc: "Entra como bot nas reuniões, transcreve tudo e cria um arquivo pesquisável. Ideal para equipes que precisam rever o que foi dito semanas depois.",
                },
                {
                  name: "Otter.ai",
                  url: "otter.ai",
                  free: true,
                  desc: "Transcrição em tempo real sincronizada com o calendário. Ótimo para reuniões presenciais e quem quer acompanhar ao vivo o que está sendo dito.",
                },
              ].map((tool) => (
                <div key={tool.name} className="p-4 rounded-xl border border-border bg-card hover:border-blue-500/20 hover:shadow-sm transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-foreground">{tool.name}</span>
                    {tool.free && (
                      <span className="text-[9px] font-bold bg-emerald-500/10 text-emerald-600 px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                        Grátis
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-2">{tool.desc}</p>
                  <a
                    href={`https://${tool.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 font-semibold hover:underline"
                  >
                    {tool.url} →
                  </a>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Exemplo real de uso */}
        <section className="mb-8">
          <h3 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-blue-500/10 flex items-center justify-center text-xs text-blue-600 font-bold">4</span>
            Exemplo real de uso
          </h3>
          <div className="relative p-5 rounded-xl bg-accent border-l-4 border-blue-500">
            <p className="text-sm text-foreground leading-relaxed italic">{activeTool.realExample}</p>
          </div>
        </section>

        {/* Dica rápida */}
        <section className="mb-8">
          <h3 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-blue-500/10 flex items-center justify-center text-xs text-blue-600 font-bold">+</span>
            Dica para o primeiro uso
          </h3>
          <div className="p-4 rounded-xl border border-blue-500/20 bg-accent">
            <p className="text-sm text-muted-foreground leading-relaxed">{activeTool.tip}</p>
          </div>
        </section>

        {/* "Só se aprende fazendo" block */}
        <section className="mb-10">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-600 text-white shadow-lg shadow-blue-500/20">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-base mb-2">Você só aprende de verdade quando começar a usar.</h4>
                <p className="text-white/85 text-sm leading-relaxed">
                  Estudar é o primeiro passo — mas é na prática, errando, tentando e ajustando, que a IA vira parte do seu trabalho. Não espere entender tudo antes de começar. <strong className="text-white">Abra agora, teste, erre, melhore.</strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA to Comparison page */}
        <section className="mb-10">
          <Link
            to="/comparativo"
            className="flex items-center gap-4 p-5 rounded-xl border border-blue-200 bg-blue-50 hover:bg-blue-100 hover:border-blue-300 transition-all group"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Search className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-blue-600 mb-0.5 uppercase tracking-wider">Recurso extra</p>
              <p className="text-sm font-semibold text-foreground">Não sabe qual ferramenta usar para cada tarefa?</p>
              <p className="text-xs text-muted-foreground mt-0.5">Veja o comparativo completo — Qual IA Usar?</p>
            </div>
            <ArrowRight className="w-4 h-4 text-blue-500 group-hover:translate-x-1 transition-transform shrink-0" />
          </Link>
        </section>

        {/* Navigation between tools */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          {prevTool ? (
            <button
              onClick={() => goToTool(prevTool.id)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all hover:-translate-x-0.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">{prevTool.name}</span>
              <span className="sm:hidden">Anterior</span>
            </button>
          ) : (
            <Link
              to="/modulo-1"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all hover:-translate-x-0.5"
            >
              <ArrowLeft className="w-4 h-4" />
              Módulo 1
            </Link>
          )}

          {nextTool ? (
            <button
              onClick={() => goToTool(nextTool.id)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 hover:shadow-md hover:shadow-blue-500/20 hover:translate-x-0.5 transition-all"
            >
              <span className="hidden sm:inline">{nextTool.name}</span>
              <span className="sm:hidden">Próxima</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <Link
              to="/modulo-3"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 hover:shadow-md hover:shadow-blue-500/20 hover:translate-x-0.5 transition-all"
            >
              Módulo 3
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
