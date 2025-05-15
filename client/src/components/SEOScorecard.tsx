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
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-primary-600">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3 sm:mb-0">Общий SEO рейтинг</h2>
        
        <div className="flex flex-col sm:flex-row items-center">
          <div className="rounded-full h-24 w-24 flex items-center justify-center mb-2 sm:mb-0 sm:mr-4 border-4 border-primary-600 dark:border-blue-500">
            <div className="text-3xl font-bold text-primary-600 dark:text-blue-400">{score}</div>
          </div>
          
          <div className="flex flex-col items-center sm:items-start">
            <div className={`status-badge px-3 py-1 text-sm mb-1 ${statusColor}`}>
              <i className="material-icons align-middle mr-1">{getStatusIcon(scoreColor)}</i> {scoreLabel}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Максимальная оценка: 100
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border-l-3 border-success-500 dark:border-green-500 flex flex-col sm:flex-row sm:items-center">
          <div className="flex items-center mb-2 sm:mb-0 sm:mr-3">
            <i className="material-icons text-success-500 dark:text-green-400 text-3xl">check_circle</i>
          </div>
          <div>
            <h3 className="font-medium text-gray-800 dark:text-gray-100 mb-1">Успешно</h3>
            <div className="flex items-baseline">
              <div className="text-2xl font-bold text-success-500 dark:text-green-400 mr-2">{success}</div>
              <p className="text-sm text-gray-600 dark:text-gray-300">тегов соответствуют требованиям</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border-l-3 border-warning-500 dark:border-yellow-500 flex flex-col sm:flex-row sm:items-center">
          <div className="flex items-center mb-2 sm:mb-0 sm:mr-3">
            <i className="material-icons text-warning-500 dark:text-yellow-400 text-3xl">warning</i>
          </div>
          <div>
            <h3 className="font-medium text-gray-800 dark:text-gray-100 mb-1">Предупреждения</h3>
            <div className="flex items-baseline">
              <div className="text-2xl font-bold text-warning-500 dark:text-yellow-400 mr-2">{warnings}</div>
              <p className="text-sm text-gray-600 dark:text-gray-300">тегов требуют улучшения</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border-l-3 border-error-500 dark:border-red-500 flex flex-col sm:flex-row sm:items-center">
          <div className="flex items-center mb-2 sm:mb-0 sm:mr-3">
            <i className="material-icons text-error-500 dark:text-red-400 text-3xl">error</i>
          </div>
          <div>
            <h3 className="font-medium text-gray-800 dark:text-gray-100 mb-1">Проблемы</h3>
            <div className="flex items-baseline">
              <div className="text-2xl font-bold text-error-500 dark:text-red-400 mr-2">{errors}</div>
              <p className="text-sm text-gray-600 dark:text-gray-300">тегов требуют исправления</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
