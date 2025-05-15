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
        <header className="mb-8 flex flex-col md:flex-row justify-between items-center">
          <div className="animate-fadeIn text-center md:text-left mb-4 md:mb-0">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-500 text-transparent bg-clip-text animate-pulse">
              Анализатор SEO метатегов
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">
              Проверьте SEO и мета теги любого сайта для оптимизации видимости в поисковых системах
            </p>
            <div className="hidden md:flex mt-4 space-x-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                <i className="material-icons text-sm mr-1">title</i> Title
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                <i className="material-icons text-sm mr-1">description</i> Meta Description
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                <i className="material-icons text-sm mr-1">share</i> Open Graph
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200">
                <i className="material-icons text-sm mr-1">smart_display</i> Превью
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <ThemeSwitcher />
            <div className="mt-3 text-sm text-gray-500 dark:text-gray-400 animate-fadeIn">
              Переключить тему
            </div>
          </div>
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
            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-100 dark:border-blue-800 shadow-sm">
              <div className="flex items-center mb-2">
                <i className="material-icons text-blue-500 dark:text-blue-400 mr-2">info</i>
                <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300">Краткая информация</h3>
              </div>
              <p className="text-blue-700 dark:text-blue-300">
                Проанализирован сайт: <span className="font-semibold">{analysisResult.url}</span>
              </p>
              <p className="text-blue-700 dark:text-blue-300 mt-1">
                Найдено: <span className="font-semibold">{analysisResult.metaTags.length}</span> мета-тегов, 
                <span className="text-green-600 dark:text-green-400 mx-1">{analysisResult.success}</span> успешно, 
                <span className="text-yellow-600 dark:text-yellow-400 mx-1">{analysisResult.warnings}</span> предупреждений, 
                <span className="text-red-600 dark:text-red-400 mx-1">{analysisResult.errors}</span> ошибок
              </p>
            </div>
            <ResultsContainer result={analysisResult} />
          </div>
        )}
      </div>
      
      <footer className="bg-gray-100 dark:bg-gray-800 py-6 mt-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-600 dark:text-gray-300">&copy; {new Date().getFullYear()} Марат Ахатов. Все права защищены.</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Профессиональный анализ SEO метатегов для улучшения видимости сайта</p>
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
