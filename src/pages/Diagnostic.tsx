import { Link } from "react-router-dom";
import { Zap, ClipboardList, Sparkles, Send, ArrowLeft } from "lucide-react";

const steps = [
  { icon: ClipboardList, number: "1", title: "Responda", desc: "Preencha o formulário com informações sobre seu trabalho." },
  { icon: Sparkles, number: "2", title: "Analise", desc: "Nossa IA analisa seu perfil e identifica oportunidades." },
  { icon: Send, number: "3", title: "Receba", desc: "Receba um plano personalizado de aplicação de IA no seu dia a dia." },
];

export default function Diagnostic() {
  return (
    <div>
      {/* Hero */}
      <div className="bg-primary px-4 sm:px-6 py-12 sm:py-16">
        <div className="max-w-3xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors mb-8">
            <ArrowLeft className="w-3.5 h-3.5" />
            Voltar ao início
          </Link>
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary-foreground/15 flex items-center justify-center mx-auto mb-6 animate-scale-in">
              <Zap className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-primary-foreground tracking-tight mb-4 animate-fade-in" style={{ animationDelay: "100ms", opacity: 0 }}>
              Diagnóstico IA
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-xl mx-auto animate-fade-in" style={{ animationDelay: "200ms", opacity: 0 }}>
              Seu plano personalizado de IA. Para a sua área. Para o seu dia a dia.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {steps.map((s, i) => (
            <div key={s.number} className="text-center animate-fade-in" style={{ animationDelay: `${300 + i * 100}ms`, opacity: 0 }}>
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mx-auto mb-3">
                <s.icon className="w-6 h-6 text-accent-foreground" />
              </div>
              <div className="text-2xl font-bold text-primary mb-1">{s.number}</div>
              <h3 className="font-semibold text-foreground mb-1">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="rounded-xl border border-border bg-card p-6 sm:p-8 animate-fade-in" style={{ animationDelay: "600ms", opacity: 0 }}>
          <h2 className="text-xl font-bold text-foreground mb-6">Conte sobre seu trabalho</h2>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Área de atuação</label>
              <select className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow">
                <option>Selecione sua área</option>
                <option>Vendas</option>
                <option>Customer Success</option>
                <option>Marketing</option>
                <option>Operações</option>
                <option>Jurídico</option>
                <option>Financeiro</option>
                <option>RH</option>
                <option>Produto/Tech</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Setor da empresa</label>
              <select className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow">
                <option>Selecione o setor</option>
                <option>Tecnologia / SaaS</option>
                <option>Varejo / E-commerce</option>
                <option>Serviços Financeiros</option>
                <option>Saúde</option>
                <option>Educação</option>
                <option>Indústria</option>
                <option>Consultoria</option>
                <option>Outro</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Cargo</label>
              <select className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow">
                <option>Selecione seu cargo</option>
                <option>Analista</option>
                <option>Coordenador</option>
                <option>Gerente</option>
                <option>Diretor</option>
                <option>VP / C-Level</option>
                <option>Fundador / Sócio</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Tamanho da empresa</label>
              <select className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow">
                <option>Selecione o tamanho</option>
                <option>1-10 pessoas</option>
                <option>11-50 pessoas</option>
                <option>51-200 pessoas</option>
                <option>201-1000 pessoas</option>
                <option>1000+ pessoas</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Descreva seu dia a dia</label>
              <textarea
                className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground min-h-[120px] resize-y focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                placeholder="Conte brevemente sobre suas principais atividades, ferramentas que usa e desafios do dia a dia..."
              />
            </div>

            <div className="pt-2">
              <button
                className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4" />
                Gerar meu diagnóstico
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
