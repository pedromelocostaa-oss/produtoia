import { useState } from "react";
import { Star, Send, CheckCircle2, Loader2, MessageSquarePlus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const LABELS: Record<number, string> = {
  1: "Muito ruim",
  2: "Ruim",
  3: "Fraco",
  4: "Abaixo do esperado",
  5: "Regular",
  6: "Razoável",
  7: "Bom",
  8: "Muito bom",
  9: "Excelente",
  10: "Incrível! 🚀",
};

export default function Feedback() {
  const { user } = useAuth();
  const [rating, setRating] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const displayName =
    user?.user_metadata?.full_name || user?.email?.split("@")[0] || "";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!rating) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const { error } = await supabase.functions.invoke("feedback", {
        body: {
          rating,
          message: message.trim() || null,
          userName: displayName,
          userEmail: user?.email || null,
        },
      });

      if (error) throw new Error(error.message);
      setStatus("success");
    } catch (err) {
      console.error(err);
      setErrorMsg(
        err instanceof Error ? err.message : "Erro ao enviar. Tente novamente."
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-3">
            Obrigado pelo feedback!
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Sua avaliação foi enviada com sucesso. Ela vai nos ajudar a
            melhorar o produto para você e para os próximos alunos.
          </p>
          <button
            onClick={() => {
              setRating(null);
              setMessage("");
              setStatus("idle");
            }}
            className="text-sm text-primary font-medium hover:underline"
          >
            Enviar outro feedback
          </button>
        </div>
      </div>
    );
  }

  const active = hovered ?? rating ?? 0;

  return (
    <div className="max-w-xl mx-auto px-4 py-12 md:py-16">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-4 tracking-wide uppercase">
          <MessageSquarePlus className="w-3.5 h-3.5" />
          Feedback
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-foreground mb-2 tracking-tight">
          O que você achou do produto?
        </h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Sua opinião é essencial para continuarmos melhorando. Leva menos de
          1 minuto.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Rating */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <p className="text-sm font-semibold text-foreground mb-1">
            Nota geral do produto
          </p>
          <p className="text-xs text-muted-foreground mb-5">
            Toque no número que melhor representa sua experiência
          </p>

          {/* Number buttons */}
          <div className="flex gap-1.5 flex-wrap">
            {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => {
              const isSelected = rating === n;
              const isHighlighted = n <= active;
              return (
                <button
                  key={n}
                  type="button"
                  onClick={() => setRating(n)}
                  onMouseEnter={() => setHovered(n)}
                  onMouseLeave={() => setHovered(null)}
                  className={[
                    "w-10 h-10 rounded-xl text-sm font-bold transition-all duration-150 select-none",
                    isSelected
                      ? "bg-primary text-white shadow-md shadow-primary/30 scale-110"
                      : isHighlighted
                      ? "bg-primary/20 text-primary"
                      : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary",
                  ].join(" ")}
                >
                  {n}
                </button>
              );
            })}
          </div>

          {/* Label */}
          <div className="mt-4 h-5">
            {active > 0 && (
              <p className="text-sm font-semibold text-primary animate-fade-in">
                <Star className="inline w-3.5 h-3.5 mr-1 fill-primary" />
                {LABELS[active]}
              </p>
            )}
          </div>

          {/* Scale hint */}
          <div className="flex justify-between mt-2">
            <span className="text-[11px] text-muted-foreground">1 = Muito ruim</span>
            <span className="text-[11px] text-muted-foreground">10 = Incrível</span>
          </div>
        </div>

        {/* Message */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <label
            htmlFor="feedback-msg"
            className="block text-sm font-semibold text-foreground mb-1"
          >
            Comentário{" "}
            <span className="text-muted-foreground font-normal">(opcional)</span>
          </label>
          <p className="text-xs text-muted-foreground mb-4">
            O que mais gostou? O que poderia melhorar? Qualquer detalhe ajuda.
          </p>
          <textarea
            id="feedback-msg"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            maxLength={1000}
            placeholder="Ex: A seção de prompts prontos me salvou muito tempo. Sinto falta de mais exemplos para a área de RH…"
            className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none transition"
          />
          <p className="text-right text-[11px] text-muted-foreground mt-1">
            {message.length}/1000
          </p>
        </div>

        {/* Error */}
        {status === "error" && (
          <div className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3">
            <p className="text-sm text-destructive">{errorMsg}</p>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={!rating || status === "loading"}
          className={[
            "w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-sm transition-all",
            rating
              ? "bg-primary text-white hover:opacity-90 shadow-lg shadow-primary/25 active:scale-[0.98]"
              : "bg-muted text-muted-foreground cursor-not-allowed",
          ].join(" ")}
        >
          {status === "loading" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Enviando…
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Enviar feedback
            </>
          )}
        </button>

        {!rating && (
          <p className="text-center text-xs text-muted-foreground -mt-4">
            Selecione uma nota para continuar
          </p>
        )}
      </form>
    </div>
  );
}
