import { getScoreColor, getScoreLabel } from "@/lib/analyzer";
import { getStatusColor, getStatusIcon } from "@/lib/constants";

interface SEOScorecardProps {
  score: number;
  success: number;
  warnings: number;
  errors: number;
}

export default function SEOScorecard({ score, success, warnings, errors }: SEOScorecardProps) {
  const scoreColor = getScoreColor(score);
  const scoreLabel = getScoreLabel(score);
  const statusColor = getStatusColor(scoreColor);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-primary-600">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Общий SEO рейтинг</h2>
        <div className="flex items-center mt-2 sm:mt-0">
          <div className="text-2xl font-bold text-primary-600 mr-2">{score}</div>
          <div className="text-sm text-gray-500">/ 100</div>
          <div className={`ml-3 status-badge ${statusColor}`}>
            <i className="material-icons">{getStatusIcon(scoreColor)}</i> {scoreLabel}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <i className="material-icons text-success-500 mr-2">check_circle</i>
            <h3 className="font-medium text-gray-800">Успешно</h3>
          </div>
          <div className="text-2xl font-bold text-success-500">{success}</div>
          <p className="text-sm text-gray-600 mt-1">тегов соответствуют требованиям</p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <i className="material-icons text-warning-500 mr-2">warning</i>
            <h3 className="font-medium text-gray-800">Предупреждения</h3>
          </div>
          <div className="text-2xl font-bold text-warning-500">{warnings}</div>
          <p className="text-sm text-gray-600 mt-1">тегов требуют улучшения</p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <i className="material-icons text-error-500 mr-2">error</i>
            <h3 className="font-medium text-gray-800">Проблемы</h3>
          </div>
          <div className="text-2xl font-bold text-error-500">{errors}</div>
          <p className="text-sm text-gray-600 mt-1">тегов требуют исправления</p>
        </div>
      </div>
    </div>
  );
}
