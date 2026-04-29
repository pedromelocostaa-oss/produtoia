import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { rating, message, userName, userEmail } = await req.json();

    if (!rating || rating < 1 || rating > 10) {
      return new Response(
        JSON.stringify({ error: "Nota inválida. Informe um valor entre 1 e 10." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY not configured");

    const stars = "⭐".repeat(rating) + (rating < 10 ? "☆".repeat(10 - rating) : "");
    const ratingLabel =
      rating >= 9 ? "Excelente 🚀" :
      rating >= 7 ? "Muito bom 👍" :
      rating >= 5 ? "Regular 😐" :
      "Precisa melhorar ⚠️";

    const html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f4f6f9;font-family:'Segoe UI',Arial,sans-serif;">
  <div style="max-width:560px;margin:32px auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">
    <!-- Header -->
    <div style="background:linear-gradient(135deg,#1E3A8A 0%,#2563EB 100%);padding:32px 32px 24px;">
      <p style="margin:0 0 4px;color:rgba(255,255,255,0.7);font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;">Novo Feedback</p>
      <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;">Virada Profissional</h1>
    </div>

    <!-- Rating block -->
    <div style="padding:28px 32px 0;">
      <div style="background:#f8faff;border:1px solid #e2e8f0;border-radius:10px;padding:20px 24px;text-align:center;">
        <p style="margin:0 0 6px;font-size:28px;letter-spacing:2px;">${stars}</p>
        <p style="margin:0;font-size:36px;font-weight:800;color:#1E3A8A;">${rating}<span style="font-size:18px;color:#64748b;font-weight:400;">/10</span></p>
        <p style="margin:6px 0 0;font-size:14px;font-weight:600;color:#2563EB;">${ratingLabel}</p>
      </div>
    </div>

    <!-- Message -->
    <div style="padding:24px 32px;">
      <p style="margin:0 0 8px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1px;color:#94a3b8;">Comentário</p>
      ${message
        ? `<div style="background:#f8faff;border-left:3px solid #2563EB;border-radius:0 8px 8px 0;padding:14px 18px;"><p style="margin:0;font-size:15px;line-height:1.6;color:#1e293b;">${message.replace(/\n/g, "<br>")}</p></div>`
        : `<p style="margin:0;font-size:14px;color:#94a3b8;font-style:italic;">Nenhum comentário adicional.</p>`
      }
    </div>

    <!-- User info -->
    <div style="padding:0 32px 28px;">
      <p style="margin:0 0 8px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1px;color:#94a3b8;">Aluno</p>
      <div style="display:flex;align-items:center;gap:12px;">
        <div style="width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg,#3b82f6,#1d4ed8);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:16px;">
          ${(userName || userEmail || "?")[0].toUpperCase()}
        </div>
        <div>
          <p style="margin:0;font-size:14px;font-weight:600;color:#1e293b;">${userName || "Não informado"}</p>
          <p style="margin:0;font-size:13px;color:#64748b;">${userEmail || "email não disponível"}</p>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div style="background:#f8faff;border-top:1px solid #e2e8f0;padding:16px 32px;text-align:center;">
      <p style="margin:0;font-size:12px;color:#94a3b8;">Enviado via <strong>Virada Profissional</strong> · ${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}</p>
    </div>
  </div>
</body>
</html>`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Virada Profissional <onboarding@resend.dev>",
        to: ["pedromelocostaa@gmail.com"],
        subject: `⭐ Feedback ${rating}/10 — ${userName || userEmail || "Aluno"}`,
        html,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Resend error:", res.status, err);
      return new Response(
        JSON.stringify({ error: "Falha ao enviar email. Tente novamente." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("feedback error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Erro desconhecido" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
