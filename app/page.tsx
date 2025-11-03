import { NicheAnalyzer } from "@/components/niche-analyzer";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="mx-auto max-w-6xl">
          {/* Hero Section */}
          <header className="mb-12 md:mb-16 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              Powered by AI
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
              Análise de Nicho com{" "}
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Inteligência Artificial
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed mb-8">
              Análise completa de nichos de mercado com inteligência artificial. 
              Descubra oportunidades, dores do público, palavras-chave, competidores, 
              tendências e estratégias de monetização com dados detalhados e acionáveis.
            </p>

            {/* Seções da análise */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8 max-w-5xl mx-auto text-xs">
              <div className="p-3 bg-card/50 rounded-lg border border-border/50 text-center">
                <div className="font-semibold text-primary mb-1">Visão Geral</div>
                <div className="text-muted-foreground text-[10px]">Mercado & Personas</div>
              </div>
              <div className="p-3 bg-card/50 rounded-lg border border-border/50 text-center">
                <div className="font-semibold text-primary mb-1">Pesquisas</div>
                <div className="text-muted-foreground text-[10px]">15-20 buscas reais</div>
              </div>
              <div className="p-3 bg-card/50 rounded-lg border border-border/50 text-center">
                <div className="font-semibold text-primary mb-1">Dores/Desejos</div>
                <div className="text-muted-foreground text-[10px]">7-10 de cada</div>
              </div>
              <div className="p-3 bg-card/50 rounded-lg border border-border/50 text-center">
                <div className="font-semibold text-primary mb-1">Competição</div>
                <div className="text-muted-foreground text-[10px]">Análise completa</div>
              </div>
              <div className="p-3 bg-card/50 rounded-lg border border-border/50 text-center">
                <div className="font-semibold text-primary mb-1">Oportunidades</div>
                <div className="text-muted-foreground text-[10px]">Estratégias & Ideias</div>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 max-w-4xl mx-auto">
              <div className="flex items-center gap-3 p-4 bg-card/50 rounded-lg border">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <svg
                    className="h-5 w-5 text-blue-600 dark:text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="font-semibold text-sm">10 Seções Detalhadas</div>
                  <div className="text-xs text-muted-foreground">
                    Visão geral, pesquisas, dores, palavras-chave, competição, canais, tendências, oportunidades, estatísticas e recomendações
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-card/50 rounded-lg border">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <svg
                    className="h-5 w-5 text-green-600 dark:text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="font-semibold text-sm">Tempo Real</div>
                  <div className="text-xs text-muted-foreground">
                    Resultados instantâneos
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-card/50 rounded-lg border">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <svg
                    className="h-5 w-5 text-purple-600 dark:text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="font-semibold text-sm">
                    Dados Completos
                  </div>
                  <div className="text-xs text-muted-foreground">
                    20-25 palavras-chave, 5 oportunidades de negócio, 10 títulos virais, estatísticas e métricas
                  </div>
                </div>
              </div>
            </div>
          </header>

          <NicheAnalyzer />
        </div>
      </div>
    </main>
  );
}
