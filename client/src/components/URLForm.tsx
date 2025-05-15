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
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <form className="flex flex-col sm:flex-row gap-4" onSubmit={handleSubmit}>
        <div className="flex-grow">
          <label htmlFor="website-url" className="block text-sm font-medium text-gray-700 mb-1">
            URL сайта
          </label>
          <input
            type="text"
            id="website-url"
            name="website-url"
            placeholder="https://example.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        <div className="flex items-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors shadow-md"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center">
                <span className="material-icons animate-spin text-sm mr-2">autorenew</span>
                Анализ...
              </span>
            ) : (
              "Анализировать"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
