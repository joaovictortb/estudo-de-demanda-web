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
  Globe,
  TrendingDown,
  DollarSign,
  MessageSquare,
  Calendar,
  Shield,
  Rocket,
  Brain,
  PieChart,
  FileText,
  Video,
  Instagram,
  Youtube,
  Building2,
  ArrowUpRight,
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
                  "visão geral": <Users className="h-5 w-5" />,
                  "pesquisas reais": <Search className="h-5 w-5" />,
                  "comportamento de busca": <Search className="h-5 w-5" />,
                  "dores e desejos": <AlertCircle className="h-5 w-5" />,
                  "palavras-chave": <BarChart3 className="h-5 w-5" />,
                  "volume de busca": <TrendingUp className="h-5 w-5" />,
                  "competição": <Shield className="h-5 w-5" />,
                  "análise de competição": <Shield className="h-5 w-5" />,
                  "canais": <Globe className="h-5 w-5" />,
                  "plataformas": <Globe className="h-5 w-5" />,
                  "canais e plataformas": <Globe className="h-5 w-5" />,
                  "tendências": <TrendingUp className="h-5 w-5" />,
                  "futuro": <Rocket className="h-5 w-5" />,
                  "tendências e futuro": <TrendingUp className="h-5 w-5" />,
                  "oportunidades": <Lightbulb className="h-5 w-5" />,
                  "oportunidades estratégicas": <Lightbulb className="h-5 w-5" />,
                  "estatísticas": <PieChart className="h-5 w-5" />,
                  "métricas": <BarChart3 className="h-5 w-5" />,
                  "estatísticas e métricas": <PieChart className="h-5 w-5" />,
                  "conclusão": <CheckCircle className="h-5 w-5" />,
                  "recomendações": <FileText className="h-5 w-5" />,
                  "conclusão e recomendações": <CheckCircle className="h-5 w-5" />,
                };

                const text = children?.toString().toLowerCase() || "";
                const iconKey = Object.keys(iconMap).find((key) =>
                  text.includes(key.toLowerCase())
                );
                const icon = iconKey ? iconMap[iconKey] : <Star className="h-5 w-5" />;

                return (
                  <div className="flex items-center gap-3 mt-10 mb-6 pb-3 border-b border-border/50">
                    <div className="p-2.5 bg-primary/10 rounded-lg border border-primary/20">
                      {icon}
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-foreground m-0">
                      {children}
                    </h2>
                  </div>
                );
              },
              h3: ({ children }) => {
                const text = children?.toString().toLowerCase() || "";
                let icon = <Zap className="h-4 w-4 text-primary" />;
                
                if (text.includes("alta demanda") || text.includes("🔥")) {
                  icon = <TrendingUp className="h-4 w-4 text-red-500" />;
                } else if (text.includes("média demanda") || text.includes("💡")) {
                  icon = <BarChart3 className="h-4 w-4 text-yellow-500" />;
                } else if (text.includes("baixa demanda") || text.includes("🌱")) {
                  icon = <ArrowUpRight className="h-4 w-4 text-green-500" />;
                } else if (text.includes("youtube")) {
                  icon = <Youtube className="h-4 w-4 text-red-500" />;
                } else if (text.includes("blog") || text.includes("artigo")) {
                  icon = <FileText className="h-4 w-4 text-blue-500" />;
                } else if (text.includes("instagram") || text.includes("tiktok")) {
                  icon = <Instagram className="h-4 w-4 text-pink-500" />;
                } else if (text.includes("produto") || text.includes("serviço")) {
                  icon = <DollarSign className="h-4 w-4 text-green-500" />;
                }

                return (
                  <h3 className="text-lg md:text-xl font-semibold mt-6 mb-4 text-foreground flex items-center gap-2">
                    {icon}
                    {children}
                  </h3>
                );
              },
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
              strong: ({ children }) => {
                const text = children?.toString().toLowerCase() || "";
                let bgColor = "bg-primary/10";
                
                if (text.includes("alta") || text.includes("🔥")) {
                  bgColor = "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200";
                } else if (text.includes("média") || text.includes("💡")) {
                  bgColor = "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200";
                } else if (text.includes("baixa") || text.includes("🌱")) {
                  bgColor = "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200";
                }
                
                return (
                  <strong className={`font-semibold ${bgColor} px-2 py-1 rounded inline-block`}>
                    {children}
                  </strong>
                );
              },
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

      {/* Footer com badges de status e métricas */}
      {!isLoading && content && (
        <div className="space-y-4">
          <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <div className="text-green-800 dark:text-green-200 font-bold text-lg">
                    Análise Completa Finalizada
                  </div>
                  <div className="text-green-700 dark:text-green-300 text-sm">
                    Relatório completo com todas as seções analisadas
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant="secondary"
                  className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 border-green-200 dark:border-green-700"
                >
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Insights Estratégicos
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-700"
                >
                  <BarChart3 className="h-3 w-3 mr-1" />
                  Dados de Mercado
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 border-purple-200 dark:border-purple-700"
                >
                  <Brain className="h-3 w-3 mr-1" />
                  Análise Profunda
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 border-orange-200 dark:border-orange-700"
                >
                  <Lightbulb className="h-3 w-3 mr-1" />
                  Oportunidades
                </Badge>
              </div>
            </div>
          </Card>
          
          {/* Card de informações adicionais */}
          <Card className="p-4 bg-muted/50 border-dashed">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MessageSquare className="h-4 w-4" />
              <span>
                Esta análise inclui: Visão Geral, Pesquisas, Dores/Desejos, Palavras-chave, Competição, Canais, Tendências, Oportunidades, Estatísticas e Recomendações
              </span>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
