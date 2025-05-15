import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import URLForm from "./URLForm";
import ResultsContainer from "./ResultsContainer";
import ThemeSwitcher from "./ThemeSwitcher";
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
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto px-4 py-8 max-w-6xl dark:bg-gray-900 flex-grow">
        <header className="mb-8 flex justify-between items-center">
          <div className="animate-fadeIn">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-500 text-transparent bg-clip-text animate-pulse">
              Анализатор SEO метатегов
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Проверьте SEO и мета теги любого сайта для оптимизации видимости в поисковых системах
            </p>
          </div>
          <ThemeSwitcher />
        </header>

        <div className="animate-slideInFromBottom">
          <URLForm 
            onSubmit={(url) => setIsLoading(true)}
            isLoading={isLoading}
            onAnalysisComplete={handleAnalysisComplete}
            onAnalysisError={handleAnalysisError}
          />
        </div>

        {analysisResult && (
          <div className="animate-fadeInSlideUp">
            <ResultsContainer result={analysisResult} />
          </div>
        )}
      </div>
      
      <footer className="bg-gray-100 dark:bg-gray-800 py-6 mt-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-600 dark:text-gray-300">&copy; {new Date().getFullYear()} Марат Ахатов. Все права защищены.</p>
            </div>
            <div className="flex flex-wrap justify-center space-x-4">
              <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-primary transition-colors">
                Политика конфиденциальности
              </a>
              <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-primary transition-colors">
                Условия использования
              </a>
              <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-primary transition-colors">
                О проекте
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
