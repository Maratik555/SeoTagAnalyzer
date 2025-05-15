import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import URLForm from "./URLForm";
import ResultsContainer from "./ResultsContainer";
import { SeoAnalysisResponse } from "@/lib/types";

export default function SEOAnalyzer() {
  const [analysisResult, setAnalysisResult] = useState<SeoAnalysisResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAnalysisComplete = (result: SeoAnalysisResponse) => {
    setAnalysisResult(result);
    setIsLoading(false);
  };

  const handleAnalysisError = (error: Error) => {
    setIsLoading(false);
    toast({
      title: "Ошибка анализа",
      description: error.message,
      variant: "destructive",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">SEO Meta Tag Analyzer</h1>
        <p className="text-gray-600 mt-2">
          Проверьте SEO и мета теги любого сайта для оптимизации видимости в поисковых системах
        </p>
      </header>

      <URLForm 
        onSubmit={(url) => setIsLoading(true)}
        isLoading={isLoading}
        onAnalysisComplete={handleAnalysisComplete}
        onAnalysisError={handleAnalysisError}
      />

      {analysisResult && (
        <ResultsContainer result={analysisResult} />
      )}

      <div className="mt-12 text-center">
        <p className="text-sm text-gray-600">
          SEO Meta Tag Analyzer © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
