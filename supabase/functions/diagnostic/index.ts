import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const thoughtLeaders: Record<string, string> = {
  Marketing: "Seth Godin (Permission Marketing, Purple Cow), Philip Kotler (Marketing Management), Gary Vaynerchuk (Jab Jab Jab Right Hook), Ann Handley (Everybody Writes)",
  Vendas: "Aaron Ross (Predictable Revenue), Jeb Blount (Fanatical Prospecting), Daniel Pink (To Sell Is Human), Neil Rackham (SPIN Selling), Zig Ziglar",
  "Customer Success": "Lincoln Murphy (Sixteen Ventures), Nick Mehta & Dan Steinman (Customer Success), Joey Coleman (Never Lose a Customer Again)",
  Operações: "Eliyahu Goldratt (A Meta / The Goal), Taiichi Ohno (Toyota Production System), James Womack (Lean Thinking), W. Edwards Deming",
  Jurídico: "Richard Susskind (Tomorrow's Lawyers, The End of Lawyers), Mark Cohen (Legal Mosaic), Casey Flaherty (Legal Operations)",
  Financeiro: "Aswath Damodaran (Valuation), Ray Dalio (Principles), Benjamin Graham (The Intelligent Investor), Nassim Taleb (Antifragile)",
  RH: "Dave Ulrich (HR Champions), Laszlo Bock (Work Rules! - Google), Adam Grant (Give and Take), Josh Bersin",
  "Produto/Tech": "Marty Cagan (Inspired, Empowered), Eric Ries (Lean Startup), Teresa Torres (Continuous Discovery Habits), Melissa Perri (Escaping the Build Trap)",
};

const sectorContext: Record<string, string> = {
  "Tecnologia / SaaS": "métricas SaaS (MRR, churn, LTV, CAC), ciclos de produto ágeis, PLG (Product-Led Growth)",
  "Varejo / E-commerce": "jornada omnichannel, gestão de estoque, experiência do consumidor, personalização",
  "Serviços Financeiros": "compliance regulatório, gestão de risco, open banking, experiência digital do cliente",
  Saúde: "regulamentações sanitárias, prontuário eletrônico, telemedicina, experiência do paciente",
  Educação: "metodologias ativas, EdTech, engajamento do aluno, microlearning",
  Indústria: "Indústria 4.0, manutenção preditiva, supply chain, lean manufacturing",
  Consultoria: "gestão de conhecimento, entrega de projetos, relacionamento com clientes, thought leadership",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { area, setor, cargo, tamanho, descricao } = await req.json();

    if (!area || !setor || !cargo || !tamanho || !descricao) {
      return new Response(
        JSON.stringify({ error: "Todos os campos são obrigatórios." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const leaders = thoughtLeaders[area] || "principais referências da área";
    const sector = sectorContext[setor] || "melhores práticas do setor";

    const systemPrompt = `Você é um consultor especialista em aplicação de Inteligência Artificial no ambiente corporativo. 
Seu papel é gerar um diagnóstico personalizado e acionável para profissionais que querem usar IA no dia a dia.

REGRAS:
- Seja específico e prático. Nada genérico.
- Baseie suas recomendações nas melhores práticas e frameworks de thought leaders da área do profissional.
- Para a área de ${area}, referencie: ${leaders}.
- Considere o contexto do setor (${setor}): ${sector}.
- Adapte a complexidade ao cargo (${cargo}) e tamanho da empresa (${tamanho}).
- Use exemplos concretos de como a IA pode ser aplicada nas atividades descritas.
- Sempre que possível, mencione ferramentas reais de IA (ChatGPT, Claude, Gemini, Copilot, ferramentas específicas do setor).

FORMATO DA RESPOSTA (use exatamente estes headers em markdown):

## 🎯 Perfil Profissional
Breve resumo do perfil analisado.

## 📚 Referências e Frameworks
Explique quais frameworks e metodologias dos thought leaders da área se aplicam ao contexto do profissional e como a IA potencializa esses frameworks. Seja específico sobre qual conceito de qual autor se aplica.

## 🔍 Oportunidades de IA no Seu Dia a Dia
Liste 4-6 oportunidades concretas de aplicação de IA nas atividades descritas. Para cada uma:
- **O que**: Descreva a aplicação
- **Como**: Passo a passo simplificado
- **Ferramenta sugerida**: Nome da ferramenta e por que ela é ideal
- **Impacto esperado**: Estimativa de ganho (tempo, qualidade, etc.)

## 🚀 Plano de Ação (Próximos 30 dias)
Plano semanal com ações concretas:
- **Semana 1**: Quick wins - ações que dão resultado imediato
- **Semana 2**: Aprofundamento - aprender e aplicar
- **Semana 3**: Automação - criar fluxos recorrentes
- **Semana 4**: Escala - expandir para o time/área

## ⚡ Prompt Starter Kit
Forneça 3-4 prompts prontos para usar que sejam específicos para as atividades do profissional. Cada prompt deve ser prático e copiável.

## 💡 Dica Final
Uma recomendação personalizada baseada no perfil.`;

    const userPrompt = `Gere um diagnóstico de IA para o seguinte profissional:

- Área de atuação: ${area}
- Setor da empresa: ${setor}
- Cargo: ${cargo}
- Tamanho da empresa: ${tamanho}
- Descrição do dia a dia: ${descricao}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Muitas requisições. Tente novamente em alguns segundos." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Créditos insuficientes." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "Erro ao gerar diagnóstico." }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("diagnostic error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Erro desconhecido" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
