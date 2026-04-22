import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Zap, ClipboardList, Sparkles, Send, ArrowLeft, Loader2, RotateCcw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const steps = [
  { icon: ClipboardList, number: "1", title: "Responda", desc: "Preencha o formulário com informações sobre seu trabalho." },
  { icon: Sparkles, number: "2", title: "Analise", desc: "Nossa IA analisa seu perfil e identifica oportunidades." },
  { icon: Send, number: "3", title: "Receba", desc: "Receba um plano personalizado de aplicação de IA no seu dia a dia." },
];

const areas = ["Vendas", "Customer Success", "Marketing", "Operações", "Jurídico", "Financeiro", "RH", "Produto/Tech"];
const setores = ["Tecnologia / SaaS", "Varejo / E-commerce", "Serviços Financeiros", "Saúde", "Educação", "Indústria", "Consultoria", "Outro"];
const cargos = ["Analista", "Coordenador", "Gerente", "Diretor", "VP / C-Level", "Fundador / Sócio"];
const tamanhos = ["1-10 pessoas", "11-50 pessoas", "51-200 pessoas", "201-1000 pessoas", "1000+ pessoas"];

function ChipGroup({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(value === opt ? "" : opt)}
          className={
            "px-3.5 py-2 rounded-full border text-sm transition-all " +
            (value === opt
              ? "border-primary bg-accent text-primary font-semibold"
              : "border-border bg-background text-foreground hover:border-primary/40 hover:bg-accent/50")
          }
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export default function Diagnostic() {
  const [area, setArea] = useState("");
  const [setor, setSetor] = useState("");
  const [cargo, setCargo] = useState("");
  const [tamanho, setTamanho] = useState("");
  const [descricao, setDescricao] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const resultRef = useRef<HTMLDivElement>(null);

  const canSubmit = area && setor && cargo && tamanho && descricao.trim().length > 10;
  const step = area && setor ? (cargo && tamanho ? 3 : 2) : 1;

  const handleSubmit = async () => {
    if (!canSubmit || loading) return;
    setLoading(true);
    setError("");
    setResult("");

    try {
      const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/diagnostic`;
      const resp = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ area, setor, cargo, tamanho, descricao }),
      });

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({ error: "Erro ao gerar diagnóstico." }));
        throw new Error(err.error || "Erro ao gerar diagnóstico.");
      }

      if (!resp.body) throw new Error("Streaming não suportado.");

      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth" }), 200);

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let fullText = "";
      let streamDone = false;

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") { streamDone = true; break; }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              fullText += content;
              setResult(fullText);
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      if (textBuffer.trim()) {
        for (let raw of textBuffer.split("\n")) {
          if (!raw) continue;
          if (raw.endsWith("\r")) raw = raw.slice(0, -1);
          if (raw.startsWith(":") || raw.trim() === "") continue;
          if (!raw.startsWith("data: ")) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === "[DONE]") continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              fullText += content;
              setResult(fullText);
            }
          } catch { /* ignore */ }
        }
      }

      if (fullText) {
        supabase.from("diagnostics").insert({
          area, setor, cargo, tamanho, descricao, resultado: fullText,
        }).then(({ error: dbErr }) => {
          if (dbErr) console.error("Failed to save diagnostic:", dbErr);
        });
      }
    } catch (e: any) {
      setError(e.message || "Erro ao gerar diagnóstico.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult("");
    setError("");
  };

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
            <div className="flex items-center justify-center gap-2 mt-4 flex-wrap animate-fade-in" style={{ animationDelay: "300ms", opacity: 0 }}>
              {["~5 minutos", "Gerado por IA", "Gratuito"].map((t) => (
                <span
                  key={t}
                  className="text-[11px] font-semibold text-primary-foreground/80 bg-primary-foreground/15 rounded-full px-3 py-1"
                >
                  {t}
                </span>
              ))}
            </div>
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
        {!result && (
          <div className="rounded-xl border border-border bg-card p-6 sm:p-8 animate-fade-in" style={{ animationDelay: "600ms", opacity: 0 }}>
            {/* Step progress */}
            <div className="flex items-center gap-2 mb-6">
              {([["1", "Perfil"], ["2", "Contexto"], ["3", "Enviar"]] as [string, string][]).map(([n, label], i) => {
                const done = step > i + 1;
                const active = step === i + 1;
                return (
                  <React.Fragment key={n}>
                    {i > 0 && <div className={"flex-1 h-0.5 " + (step > i ? "bg-primary" : "bg-border")} />}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <div className={"w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all " + (done ? "bg-primary border-primary text-primary-foreground" : active ? "border-foreground text-foreground" : "border-border text-muted-foreground")}>
                        {done ? "✓" : n}
                      </div>
                      <span className={"text-xs font-medium " + (active || done ? "text-foreground" : "text-muted-foreground")}>
                        {label}
                      </span>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>

            <h2 className="text-xl font-bold text-foreground mb-6">Conte sobre seu trabalho</h2>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Área de atuação</label>
                <ChipGroup options={areas} value={area} onChange={setArea} />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Setor da empresa</label>
                <ChipGroup options={setores} value={setor} onChange={setSetor} />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Cargo</label>
                <ChipGroup options={cargos} value={cargo} onChange={setCargo} />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Tamanho da empresa</label>
                <ChipGroup options={tamanhos} value={tamanho} onChange={setTamanho} />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Descreva seu dia a dia</label>
                <textarea
                  className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground min-h-[120px] resize-y focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                  placeholder="Conte brevemente sobre suas principais atividades, ferramentas que usa e desafios do dia a dia... (mínimo 10 caracteres)"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />
              </div>

              {error && (
                <div className="text-sm text-destructive bg-destructive/10 rounded-lg px-4 py-3">
                  {error}
                </div>
              )}

              <div className="pt-2">
                <button
                  onClick={handleSubmit}
                  disabled={!canSubmit || loading}
                  className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Gerando seu diagnóstico...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      Gerar meu diagnóstico
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Loading state */}
        {loading && !result && (
          <div className="text-center py-16" ref={resultRef}>
            <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Analisando seu perfil e gerando recomendações personalizadas...</p>
          </div>
        )}

        {/* Result */}
        {result && (
          <div ref={resultRef} className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">Seu Diagnóstico</h2>
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Refazer
              </button>
            </div>
            <div className="rounded-xl border border-border bg-card p-6 sm:p-8 prose prose-sm max-w-none dark:prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-li:text-muted-foreground">
              <MarkdownRenderer content={result} />
            </div>
            {loading && (
              <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Gerando...
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function MarkdownRenderer({ content }: { content: string }) {
  const lines = content.split("\n");
  const elements: JSX.Element[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      elements.push(<h2 key={i} className="text-lg font-bold mt-6 mb-3 first:mt-0">{line.slice(3)}</h2>);
    } else if (line.startsWith("### ")) {
      elements.push(<h3 key={i} className="text-base font-semibold mt-4 mb-2">{line.slice(4)}</h3>);
    } else if (line.startsWith("- **")) {
      elements.push(<li key={i} className="ml-4 mb-1"><InlineFormat text={line.slice(2)} /></li>);
    } else if (line.startsWith("- ")) {
      elements.push(<li key={i} className="ml-4 mb-1"><InlineFormat text={line.slice(2)} /></li>);
    } else if (line.startsWith("```")) {
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      elements.push(
        <pre key={`code-${i}`} className="bg-muted rounded-lg p-4 overflow-x-auto text-xs my-3">
          <code>{codeLines.join("\n")}</code>
        </pre>
      );
    } else if (line.trim() === "") {
      elements.push(<div key={i} className="h-2" />);
    } else {
      elements.push(<p key={i} className="mb-2"><InlineFormat text={line} /></p>);
    }
    i++;
  }

  return <>{elements}</>;
}

function InlineFormat({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={i} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith("`") && part.endsWith("`")) {
          return <code key={i} className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">{part.slice(1, -1)}</code>;
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}
