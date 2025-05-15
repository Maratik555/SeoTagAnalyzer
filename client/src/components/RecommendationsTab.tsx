import { Recommendation } from "@/lib/types";
import { getStatusColor, getStatusIcon } from "@/lib/constants";

interface RecommendationsTabProps {
  recommendations: Recommendation[];
}

export default function RecommendationsTab({ recommendations }: RecommendationsTabProps) {
  if (!recommendations || recommendations.length === 0) {
    return (
      <div id="recommendations-tab" className="tab-panel">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-6 animate-fadeIn">Рекомендации по улучшению</h3>
          
          <div className="border-l-4 border-success-500 dark:border-green-500 bg-success-50 dark:bg-green-900/20 p-6 rounded-lg shadow-sm animate-fadeInSlideUp">
            <div className="flex flex-col md:flex-row items-start md:items-center">
              <div className="mr-4 mb-3 md:mb-0">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-success-100 dark:bg-green-900/40 text-success-500 dark:text-green-400 animate-pulse">
                  <i className="material-icons text-3xl">check_circle</i>
                </div>
              </div>
              <div>
                <h4 className="text-xl font-medium text-success-700 dark:text-green-400 mb-2">Отличная работа!</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Все мета теги соответствуют рекомендациям. Ваша страница хорошо оптимизирована для поисковых систем и социальных сетей.
                </p>
                <div className="mt-4 p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                  <div className="flex items-center">
                    <i className="material-icons text-success-500 dark:text-green-400 mr-2">trending_up</i>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Хорошо оптимизированные мета-теги помогают увеличить видимость сайта в поисковой выдаче.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="recommendations-tab" className="tab-panel">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex items-center mb-6 animate-fadeIn">
          <i className="material-icons text-amber-600 dark:text-amber-400 mr-2 text-2xl">tips_and_updates</i>
          <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-xl">Рекомендации по улучшению</h3>
        </div>
        
        <div className="grid gap-6">
          {recommendations.map((rec, index) => {
            const isError = rec.type === "error";
            const isWarning = rec.type === "warning";
            const priorityLabel = isError ? "Высокий приоритет" : isWarning ? "Средний приоритет" : "Низкий приоритет";
            
            return (
              <div 
                key={index} 
                className={`border-l-4 ${
                  isError 
                    ? "border-error-500 dark:border-red-500 bg-error-50 dark:bg-red-900/20" 
                    : isWarning 
                      ? "border-warning-500 dark:border-yellow-500 bg-warning-50 dark:bg-yellow-900/20" 
                      : "border-success-500 dark:border-green-500 bg-success-50 dark:bg-green-900/20"
                } p-5 rounded-lg shadow-sm card-hover animate-fadeInSlideUp`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col md:flex-row">
                  <div className="mr-4 mb-3 md:mb-0 flex-shrink-0">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      isError 
                        ? "bg-error-100 dark:bg-red-900/40 text-error-500 dark:text-red-400" 
                        : isWarning 
                          ? "bg-warning-100 dark:bg-yellow-900/40 text-warning-500 dark:text-yellow-400" 
                          : "bg-success-100 dark:bg-green-900/40 text-success-500 dark:text-green-400"
                    }`}>
                      <i className="material-icons text-2xl">{getStatusIcon(rec.type)}</i>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <h4 className={`font-semibold text-lg ${
                        isError 
                          ? "text-error-700 dark:text-red-400" 
                          : isWarning 
                            ? "text-warning-700 dark:text-yellow-400" 
                            : "text-success-700 dark:text-green-400"
                      }`}>
                        {rec.title}
                      </h4>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 md:mt-0 ${
                        isError 
                          ? "bg-error-100 dark:bg-red-900/40 text-error-800 dark:text-red-300" 
                          : isWarning 
                            ? "bg-warning-100 dark:bg-yellow-900/40 text-warning-800 dark:text-yellow-300" 
                            : "bg-success-100 dark:bg-green-900/40 text-success-800 dark:text-green-300"
                      }`}>
                        <i className="material-icons text-xs mr-1">
                          {isError ? 'priority_high' : isWarning ? 'low_priority' : 'check_circle'}
                        </i>
                        {priorityLabel}
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-3">{rec.description}</p>
                    {rec.example && (
                      <div className="mt-3 animate-fadeIn">
                        <div className="flex items-center mb-1">
                          <i className="material-icons text-blue-500 dark:text-blue-400 text-sm mr-1">code</i>
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Пример реализации:</span>
                        </div>
                        <pre className="text-sm text-gray-800 dark:text-gray-200 mt-1 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg border border-gray-200 dark:border-gray-600 overflow-x-auto whitespace-pre-wrap break-words max-w-full">
                          {rec.example}
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
