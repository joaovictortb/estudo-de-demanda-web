"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Search, Sparkles } from "lucide-react";
import { AnalysisResult } from "@/components/analysis-result";

export function NicheAnalyzer() {
  const [niche, setNiche] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!niche.trim()) return;

    console.log("🚀 Iniciando análise para:", niche);
    setIsLoading(true);
    setAnalysis("");

    try {
      console.log("📡 Fazendo requisição para /api/analyze");
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ niche }),
      });

      console.log("📊 Status da resposta:", response.status);
      console.log(
        "📊 Headers da resposta:",
        Object.fromEntries(response.headers.entries())
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Erro na resposta:", errorText);
        throw new Error(`Erro na análise: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        console.error("❌ Stream não disponível");
        throw new Error("Stream não disponível");
      }

      console.log("📖 Iniciando leitura do stream");
      let chunkCount = 0;

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          console.log("✅ Stream finalizado");
          break;
        }

        chunkCount++;
        const chunk = decoder.decode(value);
        console.log(`📦 Chunk ${chunkCount}:`, chunk.substring(0, 100) + "...");

        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") {
              console.log("🏁 Recebido sinal de fim");
              continue;
            }

            try {
              const parsed = JSON.parse(data);
              if (parsed.content) {
                console.log(
                  "📝 Conteúdo recebido:",
                  parsed.content.substring(0, 50) + "..."
                );
                setAnalysis((prev) => prev + parsed.content);
              }
            } catch (e) {
              console.log("⚠️ Erro ao fazer parse:", e);
            }
          }
        }
      }
    } catch (error) {
      console.error("❌ Erro geral:", error);
      setAnalysis("Erro ao realizar análise. Tente novamente.");
    } finally {
      setIsLoading(false);
      console.log("🏁 Análise finalizada");
    }
  };

  return (
    <div className="space-y-8">
      <Card className="p-6 md:p-8 border-2 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 shadow-lg">
        <div className="space-y-6">
          {/* Header da seção */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Search className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">
                Pesquisar Nicho de Mercado
              </h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              Descubra oportunidades, dores do público e palavras-chave
              estratégicas com inteligência artificial
            </p>
          </div>

          {/* Input e botão */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Ex: terapeutas holísticos, marketing digital, e-commerce..."
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
                className="pl-10 h-12 text-base border-2 focus:border-primary transition-colors"
                disabled={isLoading}
              />
            </div>
            <Button
              onClick={handleAnalyze}
              disabled={isLoading || !niche.trim()}
              size="lg"
              className="h-12 px-8 gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg transition-all duration-200"
            >
              {isLoading ? (
                <>
                  <Spinner className="h-4 w-4" />
                  Analisando...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Analisar Nicho
                </>
              )}
            </Button>
          </div>

          {/* Exemplos de nichos */}
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground font-medium">
              Exemplos de nichos populares:
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "terapeutas holísticos",
                "marketing digital",
                "e-commerce",
                "coaches de vida",
                "fitness",
                "nutrição",
              ].map((example) => (
                <button
                  key={example}
                  onClick={() => setNiche(example)}
                  className="text-xs px-3 py-1 bg-muted hover:bg-muted/80 rounded-full text-muted-foreground hover:text-foreground transition-colors"
                  disabled={isLoading}
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {(analysis || isLoading) && (
        <AnalysisResult content={analysis} isLoading={isLoading} />
      )}
    </div>
  );
}
