"use client";

import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Badge } from "@/components/ui/badge";
import ReactMarkdown from "react-markdown";
import {
  Search,
  TrendingUp,
  Target,
  Lightbulb,
  BarChart3,
  CheckCircle,
  AlertCircle,
  Star,
  Users,
  Zap,
} from "lucide-react";

interface AnalysisResultProps {
  content: string;
  isLoading: boolean;
}

export function AnalysisResult({ content, isLoading }: AnalysisResultProps) {
  return (
    <div className="space-y-6">
      {/* Header com título principal */}
      <Card className="p-6 md:p-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <Search className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-blue-900 dark:text-blue-100">
              Análise de Nicho Completa
            </h1>
            <p className="text-blue-700 dark:text-blue-300 text-sm">
              Relatório detalhado com insights estratégicos
            </p>
          </div>
        </div>
      </Card>

      {/* Conteúdo principal */}
      <Card className="p-6 md:p-8">
        <div className="prose prose-invert max-w-none prose-headings:mt-8 prose-headings:mb-4 prose-p:mb-4 prose-ul:mb-4 prose-ol:mb-4">
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Target className="h-5 w-5 text-primary" />
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground m-0">
                    {children}
                  </h1>
                </div>
              ),
              h2: ({ children }) => {
                const iconMap: { [key: string]: any } = {
                  "Visão geral": <Users className="h-5 w-5" />,
                  "Pesquisas reais": <Search className="h-5 w-5" />,
                  "Dores e desejos": <AlertCircle className="h-5 w-5" />,
                  "Palavras-chave": <BarChart3 className="h-5 w-5" />,
                  Oportunidades: <Lightbulb className="h-5 w-5" />,
                  Conclusão: <CheckCircle className="h-5 w-5" />,
                };

                const icon = Object.keys(iconMap).find((key) =>
                  children?.toString().toLowerCase().includes(key.toLowerCase())
                ) ? (
                  iconMap[
                    Object.keys(iconMap).find((key) =>
                      children
                        ?.toString()
                        .toLowerCase()
                        .includes(key.toLowerCase())
                    )!
                  ]
                ) : (
                  <Star className="h-5 w-5" />
                );

                return (
                  <div className="flex items-center gap-3 mt-8 mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg">{icon}</div>
                    <h2 className="text-xl md:text-2xl font-semibold text-foreground m-0">
                      {children}
                    </h2>
                  </div>
                );
              },
              h3: ({ children }) => (
                <h3 className="text-lg md:text-xl font-semibold mt-6 mb-3 text-foreground flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" />
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="text-base leading-relaxed mb-4 text-muted-foreground break-words">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <div className="bg-muted/30 rounded-lg p-4 mb-4 overflow-hidden">
                  <ul className="space-y-3 text-muted-foreground list-none pl-0">
                    {children}
                  </ul>
                </div>
              ),
              ol: ({ children }) => (
                <div className="bg-muted/30 rounded-lg p-4 mb-4 overflow-hidden">
                  <ol className="space-y-3 text-muted-foreground list-decimal pl-6">
                    {children}
                  </ol>
                </div>
              ),
              li: ({ children }) => (
                <li className="text-base leading-relaxed flex items-start gap-2 break-words">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span className="flex-1">{children}</span>
                </li>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-foreground bg-primary/10 px-2 py-1 rounded">
                  {children}
                </strong>
              ),
              code: ({ children }) => (
                <code className="bg-muted px-2 py-1 rounded text-sm font-mono text-accent border">
                  {children}
                </code>
              ),
            }}
          >
            {content}
          </ReactMarkdown>

          {isLoading && (
            <div className="flex items-center justify-center gap-3 text-muted-foreground mt-8 p-6 bg-muted/30 rounded-lg">
              <Spinner className="h-5 w-5" />
              <span className="text-base font-medium">
                Gerando análise completa...
              </span>
            </div>
          )}
        </div>
      </Card>

      {/* Footer com badges de status */}
      {!isLoading && content && (
        <Card className="p-4 bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
              <span className="text-green-800 dark:text-green-200 font-medium">
                Análise Concluída
              </span>
            </div>
            <div className="flex gap-2">
              <Badge
                variant="secondary"
                className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200"
              >
                <TrendingUp className="h-3 w-3 mr-1" />
                Insights Estratégicos
              </Badge>
              <Badge
                variant="secondary"
                className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200"
              >
                <BarChart3 className="h-3 w-3 mr-1" />
                Dados de Mercado
              </Badge>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
