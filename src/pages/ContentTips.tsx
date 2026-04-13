import { Link } from "react-router-dom";
import { ArrowLeft, Play, FileText, BookOpen, Download, ExternalLink } from "lucide-react";

const videos = [
  { title: "Como a IA vai mudar sua carreira nos próximos 12 meses", source: "YouTube", duration: "18 min", category: "Introdução" },
  { title: "ChatGPT para profissionais: do zero ao avançado", source: "YouTube", duration: "45 min", category: "Ferramentas" },
  { title: "Automação com IA: eliminando trabalho repetitivo", source: "YouTube", duration: "22 min", category: "Automação" },
  { title: "Prompts que realmente funcionam no trabalho", source: "YouTube", duration: "15 min", category: "Prompts" },
];

const articles = [
  { title: "O profissional AI-First: como se posicionar no mercado", source: "Blog", readTime: "8 min de leitura", category: "Carreira" },
  { title: "Guia prático: IA para times de vendas e CS", source: "Artigo", readTime: "12 min de leitura", category: "Aplicação" },
  { title: "Como criar prompts eficazes para qualquer situação", source: "Guia", readTime: "10 min de leitura", category: "Prompts" },
  { title: "Riscos reais do uso de IA no trabalho (e como mitigar)", source: "Artigo", readTime: "6 min de leitura", category: "Segurança" },
];

const books = [
  { title: "Co-Intelligence", author: "Ethan Mollick", desc: "Como viver e trabalhar com IA — referência essencial para profissionais." },
  { title: "The AI-First Company", author: "Ash Fontana", desc: "Estratégias para empresas que querem liderar com inteligência artificial." },
  { title: "Humanocracy", author: "Gary Hamel & Michele Zanini", desc: "Como criar organizações tão incríveis quanto as pessoas que fazem parte delas." },
  { title: "Exponential Organizations 2.0", author: "Salim Ismail", desc: "O framework para escalar organizações com tecnologia exponencial." },
];

const extras = [
  { title: "Template de prompts profissionais", type: "Notion", icon: Download },
  { title: "Checklist de ferramentas de IA por área", type: "PDF", icon: Download },
  { title: "Mapa mental: IA no ambiente corporativo", type: "Imagem", icon: Download },
  { title: "Newsletter semanal sobre IA aplicada", type: "E-mail", icon: ExternalLink },
];

export default function ContentTips() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Breadcrumb */}
      <div className="mb-6 animate-fade-in">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          Voltar ao início
        </Link>
      </div>

      {/* Header */}
      <div className="mb-10 animate-fade-in" style={{ animationDelay: "50ms", opacity: 0 }}>
        <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Material Complementar</div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight mb-3">Dicas de Conteúdo</h1>
        <p className="text-lg text-muted-foreground">
          Vídeos, artigos, livros e materiais para aprofundar seu conhecimento em IA.
        </p>
      </div>

      {/* Vídeos */}
      <section className="mb-12 animate-fade-in" style={{ animationDelay: "100ms", opacity: 0 }}>
        <div className="flex items-center gap-2 mb-5">
          <Play className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold text-foreground">Vídeos</h2>
        </div>
        <div className="space-y-3">
          {videos.map((v, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:border-primary/20 hover:shadow-sm transition-all group cursor-pointer">
              <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0">
                <Play className="w-5 h-5 text-red-500" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">{v.title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{v.source} · {v.duration}</p>
              </div>
              <span className="text-[10px] font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0">
                {v.category}
              </span>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-3 italic">Em breve: links diretos para cada vídeo.</p>
      </section>

      {/* Artigos */}
      <section className="mb-12 animate-fade-in" style={{ animationDelay: "150ms", opacity: 0 }}>
        <div className="flex items-center gap-2 mb-5">
          <FileText className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold text-foreground">Artigos</h2>
        </div>
        <div className="space-y-3">
          {articles.map((a, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:border-primary/20 hover:shadow-sm transition-all group cursor-pointer">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">{a.title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{a.source} · {a.readTime}</p>
              </div>
              <span className="text-[10px] font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0">
                {a.category}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Livros */}
      <section className="mb-12 animate-fade-in" style={{ animationDelay: "200ms", opacity: 0 }}>
        <div className="flex items-center gap-2 mb-5">
          <BookOpen className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold text-foreground">Livros Recomendados</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {books.map((b, i) => (
            <div key={i} className="p-5 rounded-xl border border-border bg-card hover:border-primary/20 hover:shadow-md transition-all">
              <h3 className="font-bold text-foreground text-sm mb-1">{b.title}</h3>
              <p className="text-xs text-primary font-medium mb-2">{b.author}</p>
              <p className="text-sm text-muted-foreground">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Materiais Extras */}
      <section className="mb-12 animate-fade-in" style={{ animationDelay: "250ms", opacity: 0 }}>
        <div className="flex items-center gap-2 mb-5">
          <Download className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold text-foreground">Materiais Complementares</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {extras.map((e, i) => (
            <div key={i} className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary/20 hover:shadow-sm transition-all cursor-pointer group">
              <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center shrink-0">
                <e.icon className="w-4 h-4 text-accent-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors truncate">{e.title}</h3>
                <p className="text-xs text-muted-foreground">{e.type}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-3 italic">Em breve: links de download para cada material.</p>
      </section>
    </div>
  );
}
