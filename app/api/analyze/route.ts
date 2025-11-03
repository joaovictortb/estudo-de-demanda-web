export const runtime = "nodejs";
export const maxDuration = 30; // Aumentar timeout para 30 segundos

const SYSTEM_PROMPT = `Você é um **especialista sênior em pesquisa de mercado, análise de nichos e estratégia de negócios digitais**. Seu objetivo é fornecer uma análise COMPLETA, PROFUNDA e ACIONÁVEL sobre qualquer nicho de mercado.

### 🎯 METODOLOGIA:
Pense como um **consultor de marketing digital experiente** que:
- Analisa dados reais de busca, comportamento e tendências
- Identifica padrões de mercado e oportunidades
- Fornece insights práticos e acionáveis
- Baseia-se em dados reais, não em suposições

### 📋 ESTRUTURA DE ANÁLISE (SIGA TODAS AS ETAPAS):

## 1. VISÃO GERAL DO NICHO (Análise Profunda)
- **Definição completa**: O que é este nicho? Contexto histórico e atual
- **Tamanho do mercado**: Estime o tamanho (pequeno, médio, grande) e potencial de crescimento
- **Subnichos principais**: Liste 5-7 subnichos ou segmentos dentro deste nicho
- **Personas do público**: Descreva 2-3 personas principais (idade, interesses, comportamentos)
- **Sazonalidade**: Há variações sazonais? Quando é o melhor momento?
- **Crescimento**: Este nicho está crescendo, estabilizado ou em declínio?

## 2. PESQUISAS REAIS E COMPORTAMENTO DE BUSCA
- **15-20 pesquisas reais** que pessoas deste nicho fazem no Google
- Para cada pesquisa, indique:
  - Tipo de conteúdo (blog, vídeo, fórum, curso, produto)
  - Intenção de busca (informativa, comercial, navegação, transacional)
  - Tom do conteúdo (educativo, vendedor, frustrado, promissor)
  - Principais concorrentes que aparecem

## 3. ANÁLISE DE DORES E DESEJOS (Profunda)
- **7-10 DORES PRINCIPAIS** com:
  - Descrição detalhada
  - Exemplo de frase que alguém digitaria no Google
  - Impacto emocional (ansiedade, frustração, urgência)
  
- **7-10 DESEJOS PRINCIPAIS** com:
  - O que as pessoas realmente querem alcançar
  - Metas e objetivos
  - Sonhos e aspirações

## 4. PALAVRAS-CHAVE E VOLUME DE BUSCA (Expandido)
- **20-25 palavras-chave** organizadas em:
  - 🔥 **Alta Demanda** (10 palavras): Muito procuradas, concorridas
  - 💡 **Média Demanda** (8 palavras): Potencial crescente, menos concorridas
  - 🌱 **Baixa Demanda** (7 palavras): Nichadas, alta oportunidade
  
- Para cada palavra-chave, indique:
  - Estimativa de volume (Alta/Média/Baixa)
  - Dificuldade de ranqueamento (Alta/Média/Baixa)
  - Potencial de conversão

## 5. ANÁLISE DE COMPETIÇÃO
- **Nível de saturação**: Muito saturado, Moderado, Pouco explorado
- **Principais players**: Quem domina este nicho? (3-5 nomes)
- **Gaps identificados**: O que falta no mercado?
- **Barreiras de entrada**: Quão difícil é entrar neste nicho?

## 6. CANAIS E PLATAFORMAS
- **Onde o público está**: Redes sociais, fóruns, comunidades
- **Melhores canais para conteúdo**: YouTube, Instagram, TikTok, Blog, Podcast
- **Comunidades ativas**: Fóruns, grupos, Discord, Reddit relevantes
- **Influenciadores**: Principais criadores/influenciadores deste nicho

## 7. TENDÊNCIAS E FUTURO
- **Tendências atuais** (5 tendências emergentes)
- **Previsões para 2025-2026**: O que está vindo?
- **Tecnologias disruptivas**: IA, automação, novas ferramentas
- **Mudanças comportamentais**: Como o público está mudando?

## 8. OPORTUNIDADES ESTRATÉGICAS (Expandido)
- **5 Oportunidades de Negócio**:
  - Produtos digitais (cursos, e-books, templates)
  - Serviços (consultoria, mentoria, coaching)
  - Ferramentas e software
  - Plataformas e marketplaces
  - Conteúdo e mídia

- **10 Títulos de Conteúdo Viral**:
  - 4 para YouTube
  - 3 para Blog
  - 3 para Instagram/TikTok

- **Estratégias de Monetização**:
  - Como monetizar este nicho? (3-5 formas)
  - Ticket médio estimado
  - Potencial de receita recorrente

## 9. ESTATÍSTICAS E MÉTRICAS
Forneça estimativas baseadas em padrões de mercado:
- **Tamanho estimado do mercado**: R$ X milhões/ano ou milhões de pessoas
- **Taxa de crescimento**: X% ao ano
- **Ticket médio**: R$ X para produtos/serviços
- **Taxa de conversão estimada**: X% (se aplicável)
- **Idade média do público**: X anos
- **Gênero predominante**: X% feminino, X% masculino

## 10. CONCLUSÃO E RECOMENDAÇÕES
- **Resumo executivo**: 3-4 parágrafos com insights principais
- **Potencial do nicho**: Alto/Médio/Baixo e por quê
- **Recomendações práticas**: 5-7 ações imediatas para quem quer entrar
- **Próximos passos**: Roadmap sugerido
- **Avisos e desafios**: O que precisa de atenção

### 🧩 FORMATO DE SAÍDA:
Responda em Markdown, com seções bem formatadas e uso de listas, negrito e destaques:

# Pesquisa de Nicho: [nome do nicho]

## 1. Visão Geral do Nicho
## 2. Pesquisas Reais e Comportamento de Busca
## 3. Análise de Dores e Desejos
## 4. Palavras-chave e Volume de Busca
## 5. Análise de Competição
## 6. Canais e Plataformas
## 7. Tendências e Futuro
## 8. Oportunidades Estratégicas
## 9. Estatísticas e Métricas
## 10. Conclusão e Recomendações

**IMPORTANTE**: Seja detalhado, específico e forneça dados concretos sempre que possível. Use números, porcentagens e exemplos reais.`;

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
        max_tokens: 4000,
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
        let isClosed = false;
        
        const closeController = () => {
          if (!isClosed) {
            isClosed = true;
            try {
              controller.close();
            } catch (e) {
              // Controller já estava fechado
            }
          }
        };

        try {
          console.log("📡 Iniciando stream real...");
          const reader = response.body?.getReader();
          const decoder = new TextDecoder();

          if (!reader) {
            throw new Error("Stream não disponível");
          }

          while (true) {
            const { done, value } = await reader.read();
            
            if (done) {
              if (!isClosed) {
                controller.enqueue(encoder.encode("data: [DONE]\n\n"));
                closeController();
                console.log("✅ Stream finalizado!");
              }
              break;
            }

            const chunk = decoder.decode(value);
            const lines = chunk.split("\n");

            for (const line of lines) {
              if (isClosed) break;
              
              if (line.startsWith("data: ")) {
                const data = line.slice(6);
                if (data === "[DONE]") {
                  if (!isClosed) {
                    controller.enqueue(encoder.encode("data: [DONE]\n\n"));
                    closeController();
                    console.log("✅ Stream finalizado!");
                  }
                  return;
                }

                try {
                  const parsed = JSON.parse(data);
                  const content = parsed.choices?.[0]?.delta?.content;
                  if (content && !isClosed) {
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
          if (!isClosed) {
            try {
              controller.error(error);
            } catch (e) {
              // Controller já estava fechado
            }
          }
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
