import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Folder,
  Chrome,
  Terminal,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Tool {
  id: string;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  title: string;
  badge: string;
  whatIs: string;
  whatYouDo: string[];
  howToStart: { step: number; text: string }[];
  requires: string;
  example: string;
  callToAction: string;
}

const tools: Tool[] = [
  {
    id: "projects",
    icon: Folder,
    iconColor: "text-violet-600",
    iconBg: "bg-violet-100",
    title: "Claude Projects",
    badge: "Plano pago",
    whatIs:
      "Um espaço dentro do Claude onde você coloca tudo sobre um cliente — briefing, tom de voz, pilares de conteúdo, brand book — e o Claude nunca esquece. É como ter um assistente que conhece cada cliente tão bem quanto você.",
    whatYouDo: [
      "Cria um projeto separado para cada cliente",
      "Sobe o brand book, calendário editorial, referências de conteúdo",
      "Escreve legendas, captions e roteiros já no tom certo do cliente, sem precisar explicar tudo do zero a cada vez",
      "Gera ideias de pauta com contexto real da marca",
      "Cria variações de um mesmo post para testar diferentes abordagens",
    ],
    howToStart: [
      {
        step: 1,
        text: 'Acesse claude.ai → clique em "Projects" na sidebar esquerda',
      },
      {
        step: 2,
        text: 'Crie um projeto com o nome do cliente (ex: "Social Media — Cliente X")',
      },
      {
        step: 3,
        text: 'Em "Project instructions" cole: nome da marca, tom de voz, pilares de conteúdo, o que pode e o que não pode falar. Faça upload dos arquivos: brand book, calendário, referências (PDF, DOCX, CSV — até 30MB por arquivo). A partir daí, todo chat dentro desse projeto já conhece o cliente.',
      },
    ],
    requires:
      "Plano pago do Claude (Pro, Max, Team ou Enterprise). O plano gratuito não inclui Projects com base de conhecimento.",
    example:
      "Imagina que você tem 6 clientes diferentes. Toda vez que ia criar conteúdo, perdia 15 minutos relembrando o Claude sobre cada um. Com Projects, criei um espaço para cada cliente, subi o briefing e o brand book, e agora chego lá e já peço direto: 'Cria 5 ideias de post para o dia dos pais no tom da marca'. Em 30 segundos tenho o que precisa.",
    callToAction:
      "Você só vai entender o poder disso quando criar o primeiro projeto. Pega um cliente, sobe o briefing, e manda o Claude criar uma semana de pautas. Não leia mais sobre isso — faça agora.",
  },
  {
    id: "cowork",
    icon: Chrome,
    iconColor: "text-sky-600",
    iconBg: "bg-sky-100",
    title: "Claude Cowork",
    badge: "Extensão Chrome",
    whatIs:
      "Uma extensão para o Chrome que deixa o Claude operar seu computador de forma autônoma. Você dá uma tarefa — ele pesquisa, abre abas, analisa arquivos, organiza informações — enquanto você faz outra coisa.",
    whatYouDo: [
      "Pede para pesquisar tendências de um nicho e te entregar um resumo",
      "Manda analisar uma planilha de resultados e extrair os melhores horários para postar",
      "Pede para organizar ideias de pauta por tema e data",
      "Gera roteiros de Reels baseados em referências que você indicou",
      "Pesquisa o que os concorrentes do seu cliente estão fazendo",
    ],
    howToStart: [
      { step: 1, text: "Tenha uma conta Claude paga (Pro ou superior)" },
      {
        step: 2,
        text: 'Busque "Claude" na Chrome Web Store e instale a extensão oficial da Anthropic',
      },
      {
        step: 3,
        text: "Abra a extensão, conecte sua conta e dê a primeira tarefa: \"Pesquisa as 5 tendências de conteúdo para [nicho do cliente] nesse mês e me entrega um resumo com ideias de post\"",
      },
    ],
    requires: "Plano pago do Claude (Pro, Max, Team ou Enterprise).",
    example:
      "Tinha um cliente novo no nicho de gastronomia saudável. Pedi para o Cowork pesquisar tendências de conteúdo desse nicho, analisar os perfis mais engajados e me entregar um relatório com ideias de pauta. Em 10 minutos tinha material para uma reunião de planejamento inteira — sem abrir uma aba sequer.",
    callToAction:
      "A maioria das pessoas lê sobre isso e acha incrível, mas não instala. Instale agora, abra a extensão e dê uma tarefa real. O aprendizado acontece no uso, não na leitura.",
  },
  {
    id: "code",
    icon: Terminal,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-100",
    title: "Claude Code",
    badge: "Terminal",
    whatIs:
      "Uma ferramenta que roda no terminal do seu computador e constrói sistemas e aplicações quando você descreve o que precisa em português. Você não precisa saber programar — você descreve, ele constrói.",
    whatYouDo: [
      "Constrói um gestor de conteúdo personalizado para seus clientes (com campos de aprovação, calendário, status de cada post)",
      "Cria um sistema de aprovação onde o cliente recebe o conteúdo e aprova com um clique",
      "Gera um dashboard com os resultados de cada cliente em um lugar só",
      "Automatiza a organização de arquivos de mídia por cliente e data",
      "Cria um gerador de posts que já formata o conteúdo no padrão de cada rede social",
    ],
    howToStart: [
      {
        step: 1,
        text: "Tenha uma conta Claude paga (Pro ou superior — o plano gratuito não inclui acesso)",
      },
      {
        step: 2,
        text: "No terminal do seu Mac ou PC, rode: curl -fsSL https://claude.ai/install.sh | sh",
      },
      {
        step: 3,
        text: "Autentique com sua conta Claude e digite em português o que você quer construir: \"Cria um sistema simples onde eu consigo cadastrar clientes, adicionar posts para aprovação e marcar o status de cada um\"",
      },
    ],
    requires:
      "Plano pago (Pro, Max, Team ou Enterprise) + terminal (Mac, Linux ou Windows com WSL).",
    example:
      "Eu gerenciava 8 clientes em planilhas diferentes e estava perdendo o controle. Abri o Claude Code, descrevi em português que precisava de um sistema com lista de clientes, calendário de posts e status de aprovação. Em 20 minutos tinha um sistema funcionando no meu navegador — sem escrever uma linha de código.",
    callToAction:
      "Essa é a ferramenta que parece mais intimidadora — e é exatamente por isso que a maioria não usa. Mas se você descreve o que precisa em português, ele constrói. A única forma de acreditar nisso é testar. Abre o terminal e tenta.",
  },
  {
    id: "gemini-image",
    icon: Zap,
    iconColor: "text-amber-600",
    iconBg: "bg-amber-100",
    title: "Gemini — Geração e Edição de Imagens",
    badge: "Gratuito",
    whatIs:
      "O Gemini do Google tem o melhor modelo de geração e edição de imagens disponível hoje. Ele entende o contexto da imagem e faz edições precisas: melhora iluminação, troca cores, remove fundos, ajusta qualidade — tudo a partir de uma instrução em português. Para social media, é a ferramenta mais poderosa que existe para criar e ajustar imagens sem precisar de Photoshop.",
    whatYouDo: [
      "Melhora a iluminação e qualidade de fotos que o cliente mandou com pouca luz ou resolução baixa",
      "Troca a cor de roupas, objetos ou fundos em fotos de produto",
      "Remove fundos e cria composições profissionais para posts",
      "Gera imagens do zero a partir de descrições (ex: 'foto flat lay de café com notebook em mesa de madeira')",
      "Cria variações de uma mesma imagem para testes A/B em anúncios",
      "Ajusta fotos para manter a identidade visual do feed (filtros, tons, contraste)",
    ],
    howToStart: [
      {
        step: 1,
        text: "Acesse gemini.google.com e faça login com sua conta Google (é gratuito)",
      },
      {
        step: 2,
        text: "Para editar uma imagem: faça upload da foto e escreva o que quer mudar. Ex: 'Melhore a iluminação dessa foto e aumente o contraste' ou 'Troque a cor da camiseta para azul marinho'",
      },
      {
        step: 3,
        text: "Para gerar uma imagem nova: descreva em detalhes o que você precisa. Ex: 'Crie uma foto profissional de um smoothie verde em um copo de vidro, com fundo clean e iluminação suave, estilo food photography'",
      },
    ],
    requires:
      "Conta Google (gratuita). O modelo de geração de imagens está disponível sem custo no Gemini.",
    example:
      "Um cliente mandou fotos dos produtos tiradas com celular, com iluminação péssima e fundo bagunçado. Antes eu gastava 30 minutos no Photoshop ajustando cada uma. Agora mando pro Gemini com 'Melhore a iluminação, deixe o fundo branco limpo e aumente a nitidez'. Em 10 segundos tenho a foto pronta para o post — e o resultado é melhor do que eu fazia manualmente.",
    callToAction:
      "Pega aquela foto problemática que você tem aí — aquela que o cliente mandou escura, torta ou com fundo feio. Sobe no Gemini e pede para ele arrumar. Você vai se surpreender com o resultado. Depois tenta gerar uma imagem do zero. Essa ferramenta muda completamente seu fluxo de criação visual.",
  },
];

function ToolCard({ tool }: { tool: Tool }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-4 p-5 text-left hover:bg-muted/40 transition-colors"
      >
        <div
          className={cn(
            "w-11 h-11 rounded-xl flex items-center justify-center shrink-0",
            tool.iconBg
          )}
        >
          <tool.icon className={cn("w-5 h-5", tool.iconColor)} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-bold text-foreground text-base">{tool.title}</h3>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
              {tool.badge}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-0.5 line-clamp-1">
            {tool.whatIs.slice(0, 80)}…
          </p>
        </div>
        {open ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
        )}
      </button>

      {/* Expanded content */}
      {open && (
        <div className="px-5 pb-6 space-y-6 border-t border-border">
          {/* O que é */}
          <div className="pt-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
              O que é
            </h4>
            <p className="text-sm text-foreground leading-relaxed">{tool.whatIs}</p>
          </div>

          {/* O que você faz */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
              O que você faz com ele como social media
            </h4>
            <ul className="space-y-2">
              {tool.whatYouDo.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Como começar */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
              Como começar agora
            </h4>
            <div className="space-y-3">
              {tool.howToStart.map((s) => (
                <div key={s.step} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[11px] font-bold text-primary">{s.step}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.text}</p>
                </div>
              ))}
            </div>

            {/* Requer */}
            <div className="mt-3 flex items-start gap-2 p-3 rounded-lg bg-amber-50 border border-amber-200">
              <span className="text-amber-500 text-base leading-none mt-0.5">⚠️</span>
              <p className="text-xs text-amber-800 leading-relaxed">
                <strong>Requer:</strong> {tool.requires}
              </p>
            </div>
          </div>

          {/* Exemplo real */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
              Exemplo real
            </h4>
            <blockquote className="p-4 rounded-lg bg-surface border border-border text-sm text-muted-foreground leading-relaxed italic">
              "{tool.example}"
            </blockquote>
          </div>

          {/* Só se aprende fazendo */}
          <div className={cn("p-4 rounded-xl border-2", tool.iconBg, "border-transparent")}>
            <div className="flex items-start gap-3">
              <Zap className={cn("w-4 h-4 shrink-0 mt-0.5", tool.iconColor)} />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider mb-1.5 opacity-60">
                  Só se aprende fazendo
                </p>
                <p className="text-sm font-medium text-foreground leading-relaxed">
                  {tool.callToAction}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SocialMedia() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Breadcrumb */}
      <div className="mb-6 animate-fade-in">
        <Link
          to="/modulo-3"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Voltar ao Módulo 3
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8 animate-fade-in" style={{ animationDelay: "50ms", opacity: 0 }}>
        <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
          Guia Especial
        </div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight mb-3">
          IA para Social Media
        </h1>
        <p className="text-xl font-semibold text-primary mb-4">
          Trabalhe 3x mais rápido e entregue mais valor para seus clientes
        </p>
        <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
          Você não precisa saber programar. Não precisa entender de tecnologia. Você só precisa
          saber o que quer — e a IA executa. Veja como organizar sua operação, criar conteúdo em
          escala e impressionar seus clientes com ferramentas que qualquer pessoa consegue usar
          hoje.
        </p>
      </div>

      {/* Banner de destaque */}
      <div
        className="mb-8 p-5 rounded-xl bg-gradient-to-r from-violet-50 to-sky-50 border border-violet-200 animate-fade-in"
        style={{ animationDelay: "100ms", opacity: 0 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <span className="text-lg">📱</span>
          <h2 className="font-bold text-foreground">3 ferramentas, uma operação transformada</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          Cada ferramenta abaixo resolve um problema real do dia a dia de quem gerencia conteúdo
          para múltiplos clientes. Clique em cada uma para expandir e ver como usar agora.
        </p>
      </div>

      {/* Tool cards */}
      <div className="space-y-4 animate-fade-in" style={{ animationDelay: "150ms", opacity: 0 }}>
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>

      {/* CTA final */}
      <div
        className="mt-10 p-6 rounded-xl bg-primary text-primary-foreground text-center animate-fade-in"
        style={{ animationDelay: "200ms", opacity: 0 }}
      >
        <h3 className="text-lg font-bold mb-2">Comece pelo mais fácil</h3>
        <p className="text-primary-foreground/80 text-sm mb-4">
          Se você nunca usou Claude antes, comece pelo Claude Projects. É o que vai mudar mais
          rápido a sua rotina com clientes.
        </p>
        <Link
          to="/modulo-2"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary-foreground text-primary font-semibold text-sm hover:opacity-90 transition-opacity"
        >
          Ver todas as ferramentas no Módulo 2 →
        </Link>
      </div>
    </div>
  );
}
