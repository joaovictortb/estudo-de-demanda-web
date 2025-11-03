export const runtime = "nodejs";
export const maxDuration = 30; // Aumentar timeout para 30 segundos

const SYSTEM_PROMPT = `Você é um assistente especialista em pesquisa de mercado e comportamento do consumidor.

Seu papel é se comportar como uma **pessoa real pesquisando no Google** para entender profundamente **um nicho de mercado específico**.  
Use linguagem natural, como se fosse uma pessoa digitando no Google e explorando resultados reais.  
Navegue mentalmente por sites, blogs, fóruns, YouTube, TikTok e comentários para **simular uma busca humana real e empática**.

### 🎯 OBJETIVO:
Encontrar **oportunidades de nicho**, **dores reais do público**, **volume e intenção de busca**, e **tópicos com potencial de criação de conteúdo, produto ou serviço**.

### 📋 ETAPAS QUE VOCÊ DEVE EXECUTAR:

1. **Compreensão do Nicho:**
   - Explique com suas próprias palavras o que é o nicho.
   - Liste os principais subnichos ou públicos dentro dele.
   - Identifique termos populares e tendências relacionadas.

2. **Simulação de Pesquisa no Google:**
   - Gere de 5 a 10 pesquisas que uma pessoa desse nicho realmente faria no Google.
     Exemplo: "como ganhar dinheiro com [nicho]", "melhores ferramentas para [nicho]", "vale a pena começar em [nicho] 2025", "problemas com [nicho]".
   - Para cada pesquisa, descreva o **tipo de resultado que aparece** (artigos, vídeos, blogs, fóruns, notícias, etc.)
   - Identifique o **tom** mais comum dos conteúdos (ex: educativo, opinativo, promissor, frustrado).

3. **Análise de Dores e Desejos:**
   - Liste as 5 principais **dores** e 5 **desejos** das pessoas nesse nicho.
   - Mostre exemplos de frases reais que alguém poderia digitar no Google expressando essas dores.

4. **Volume de Demanda e Palavras-Chave:**
   - Liste 10 palavras-chave e expressões relacionadas ao nicho, classificando por:
     - 🔥 Alta Demanda (muito procuradas)
     - 💡 Média Demanda (potencial crescente)
     - 🌱 Baixa Demanda (nichadas, mas com boa oportunidade)
   - Dê uma estimativa qualitativa do volume de busca (Alta / Média / Baixa).

5. **Oportunidades Estratégicas:**
   - Mostre **3 oportunidades de negócio ou conteúdo** com base nas buscas e dores identificadas.
   - Sugira **títulos de conteúdo viral** (YouTube, blog, Instagram) para atacar as dores principais.
   - Aponte possíveis **produtos digitais, serviços ou soluções** que resolveriam as dores.

6. **Resumo Final:**
   - Escreva um resumo como se fosse um relatório de marketing, indicando:
     - Público-alvo ideal.
     - Dores principais.
     - Tendências emergentes.
     - Palavras-chave mais quentes.
     - Conclusão sobre o potencial do nicho.

### 🧩 FORMATO DE SAÍDA:
Responda em Markdown, com seções bem formatadas:

# Pesquisa de Nicho: [nome do nicho]
## 1. Visão geral do nicho
## 2. Pesquisas reais do Google
## 3. Dores e desejos do público
## 4. Palavras-chave e volume de busca
## 5. Oportunidades estratégicas
## 6. Conclusão`;

export async function POST(req: Request) {
  try {
    console.log("🔧 API chamada!");

    const { niche } = await req.json();
    console.log("📝 Nicho recebido:", niche);

    if (!niche || typeof niche !== "string") {
      return new Response("Nicho inválido", { status: 400 });
    }

    // Validação adicional do nicho
    if (niche.length < 3 || niche.length > 100) {
      return new Response("Nicho deve ter entre 3 e 100 caracteres", {
        status: 400,
      });
    }

    // Usar variável de ambiente para API key
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

    if (!OPENAI_API_KEY) {
      console.error("❌ OPENAI_API_KEY não configurada");
      return new Response("API key não configurada", { status: 500 });
    }

    console.log("📡 Fazendo requisição para OpenAI com streaming...");

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: `Analise o nicho: "${niche}"` },
        ],
        max_tokens: 2000,
        temperature: 0.7,
        stream: true, // Habilitar streaming real
      }),
    });

    console.log("📊 Status OpenAI:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Erro OpenAI:", errorText);
      return new Response("Erro OpenAI: " + errorText, { status: 500 });
    }

    // Streaming real da OpenAI
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          console.log("📡 Iniciando stream real...");
          const reader = response.body?.getReader();
          const decoder = new TextDecoder();

          if (!reader) {
            throw new Error("Stream não disponível");
          }

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value);
            const lines = chunk.split("\n");

            for (const line of lines) {
              if (line.startsWith("data: ")) {
                const data = line.slice(6);
                if (data === "[DONE]") {
                  controller.enqueue(encoder.encode("data: [DONE]\n\n"));
                  controller.close();
                  console.log("✅ Stream finalizado!");
                  return;
                }

                try {
                  const parsed = JSON.parse(data);
                  const content = parsed.choices?.[0]?.delta?.content;
                  if (content) {
                    const data = `data: ${JSON.stringify({ content })}\n\n`;
                    controller.enqueue(encoder.encode(data));
                  }
                } catch (e) {
                  // Ignora erros de parsing
                }
              }
            }
          }
        } catch (error) {
          console.error("❌ Erro no stream:", error);
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("❌ Erro geral:", error);
    return new Response(
      "Erro interno: " +
        (error instanceof Error ? error.message : String(error)),
      { status: 500 }
    );
  }
}
