import { useState } from "react";
import { analyzeSeoMetaTags } from "@/lib/analyzer";
import { SeoAnalysisResponse } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

interface URLFormProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
  onAnalysisComplete: (result: SeoAnalysisResponse) => void;
  onAnalysisError: (error: Error) => void;
}

export default function URLForm({ 
  onSubmit, 
  isLoading, 
  onAnalysisComplete, 
  onAnalysisError 
}: URLFormProps) {
  const [url, setUrl] = useState("");
  const { toast } = useToast();

  const validateUrl = (input: string): boolean => {
    try {
      new URL(input);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate URL
    if (!url.trim()) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, введите URL сайта",
        variant: "destructive",
      });
      return;
    }

    // Add http:// prefix if missing
    let processedUrl = url.trim();
    if (!processedUrl.startsWith("http://") && !processedUrl.startsWith("https://")) {
      processedUrl = "https://" + processedUrl;
    }

    if (!validateUrl(processedUrl)) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, введите корректный URL сайта",
        variant: "destructive",
      });
      return;
    }

    // Call the onSubmit callback
    onSubmit(processedUrl);

    try {
      // Perform the analysis
      const result = await analyzeSeoMetaTags(processedUrl);
      onAnalysisComplete(result);
    } catch (error) {
      if (error instanceof Error) {
        onAnalysisError(error);
      } else {
        onAnalysisError(new Error("Произошла неизвестная ошибка"));
      }
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8 card-hover animate-fadeIn">
      <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-blue-500 to-primary text-transparent bg-clip-text">Анализ SEO метатегов</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <label htmlFor="website-url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              URL сайта
            </label>
            <div className="relative">
              <input
                type="text"
                id="website-url"
                name="website-url"
                placeholder="https://example.com"
                className="w-full px-4 py-3 h-12 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-md"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                disabled={isLoading}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                {url && <span className="material-icons animate-fadeIn">search</span>}
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 animate-fadeIn">
              Введите URL сайта для анализа его SEO метатегов и получения рекомендаций
            </p>
          </div>
          <div className="md:self-end mb-0.5">
            <button
              type="submit"
              className="w-full md:w-auto h-12 btn px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-md hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 shadow-md"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <span className="material-icons animate-spin text-sm mr-2">autorenew</span>
                  Анализ...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <span className="material-icons">analytics</span>
                  <span>Анализировать</span>
                </span>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
