import { Recommendation } from "@/lib/types";
import { getStatusColor, getStatusIcon } from "@/lib/constants";

interface RecommendationsTabProps {
  recommendations: Recommendation[];
}

export default function RecommendationsTab({ recommendations }: RecommendationsTabProps) {
  if (!recommendations || recommendations.length === 0) {
    return (
      <div id="recommendations-tab" className="tab-panel">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="font-semibold text-gray-800 mb-6">Рекомендации по улучшению</h3>
          
          <div className="border-l-4 border-success-500 bg-success-50 p-4 rounded-r-lg">
            <div className="flex">
              <div className="mr-4">
                <i className="material-icons text-success-700">check_circle</i>
              </div>
              <div>
                <h4 className="font-medium text-success-700 mb-1">Отличная работа!</h4>
                <p className="text-sm text-gray-700">
                  Все мета теги соответствуют рекомендациям. Ваша страница хорошо оптимизирована для поисковых систем.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="recommendations-tab" className="tab-panel">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="font-semibold text-gray-800 mb-6">Рекомендации по улучшению</h3>
        
        <div className="space-y-6">
          {recommendations.map((rec, index) => (
            <div 
              key={index} 
              className={`flex border-l-4 ${
                rec.type === "error" 
                  ? "border-error-500 bg-error-50" 
                  : rec.type === "warning" 
                    ? "border-warning-500 bg-warning-50" 
                    : "border-success-500 bg-success-50"
              } p-4 rounded-r-lg`}
            >
              <div className="mr-4">
                <i className={`material-icons ${
                  rec.type === "error" 
                    ? "text-error-700" 
                    : rec.type === "warning" 
                      ? "text-warning-700" 
                      : "text-success-700"
                }`}>
                  {getStatusIcon(rec.type)}
                </i>
              </div>
              <div>
                <h4 className={`font-medium ${
                  rec.type === "error" 
                    ? "text-error-700" 
                    : rec.type === "warning" 
                      ? "text-warning-700" 
                      : "text-success-700"
                } mb-1`}>
                  {rec.title}
                </h4>
                <p className="text-sm text-gray-700">{rec.description}</p>
                {rec.example && (
                  <div className="mt-2">
                    <span className="text-xs font-medium text-gray-600">Пример:</span>
                    <pre className="text-sm text-gray-800 mt-1 bg-white p-2 rounded border border-gray-200 overflow-x-auto">
                      {rec.example}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
