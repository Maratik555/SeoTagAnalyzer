import { MetaTag } from "@/lib/types";
import { DEFAULT_TITLE, DEFAULT_DESCRIPTION } from "@/lib/constants";
import { formatUrlForDisplay } from "@/lib/analyzer";
import { getStatusColor, getStatusIcon, getStatusText } from "@/lib/constants";

interface GooglePreviewTabProps {
  url: string;
  title?: string;
  description?: string;
  metaTags: MetaTag[];
}

export default function GooglePreviewTab({ url, title, description, metaTags }: GooglePreviewTabProps) {
  const titleTag = metaTags.find(tag => tag.name === "Title");
  const descriptionTag = metaTags.find(tag => tag.name === "Description");
  
  const displayTitle = title || DEFAULT_TITLE;
  const displayDescription = description || DEFAULT_DESCRIPTION;
  const displayUrl = formatUrlForDisplay(url);
  
  return (
    <div id="google-preview-tab" className="tab-panel">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
        <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-4">Предпросмотр в Google</h3>
        
        <div className="preview-card p-4 sm:p-6 border border-gray-200 dark:border-gray-600 rounded-lg max-w-xl dark:bg-gray-700">
          <div className="flex items-start mb-1">
            <div className="flex-grow">
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">{displayUrl}</div>
              <a href="#" className="text-[#1a0dab] dark:text-blue-400 text-xl font-medium hover:underline">
                {displayTitle}
              </a>
            </div>
          </div>
          <div className="text-sm text-gray-700 dark:text-gray-300 mb-1">
            {displayDescription}
          </div>
          <div className="flex flex-wrap mt-1 text-xs gap-1">
            <span className="text-gray-600 dark:text-gray-400">{new Date().toLocaleDateString('ru-RU')} — </span>
            <span className="text-gray-600 dark:text-gray-400">Дополнительная информация о странице...</span>
          </div>
        </div>
        
        <div className="mt-6 space-y-4">
          {(titleTag?.status === "warning" || descriptionTag?.status === "warning" || 
           titleTag?.status === "error" || descriptionTag?.status === "error") && (
            <div className={`border-l-4 ${
              titleTag?.status === "error" || descriptionTag?.status === "error"
                ? "border-error-500 bg-error-50 dark:bg-gray-700"
                : "border-warning-500 bg-warning-50 dark:bg-gray-700"
            } p-4 rounded-r-lg`}>
              <h4 className={`font-medium ${
                titleTag?.status === "error" || descriptionTag?.status === "error"
                  ? "text-error-700 dark:text-red-400"
                  : "text-warning-700 dark:text-yellow-400"
              } mb-1`}>Рекомендация по улучшению</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {titleTag?.status !== "success" && titleTag?.description}
                {titleTag?.status !== "success" && descriptionTag?.status !== "success" && <br />}
                {descriptionTag?.status !== "success" && descriptionTag?.description}
              </p>
            </div>
          )}
          
          <div className="flex flex-col md:flex-row gap-6 mt-6">
            <div className="md:w-1/2">
              <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Тег Title</h4>
              <div className="text-sm">
                <div className="flex flex-wrap items-center mb-2">
                  <span className={`status-badge mr-2 mb-1 ${getStatusColor(titleTag?.status || "error")}`}>
                    <i className="material-icons">{getStatusIcon(titleTag?.status || "error")}</i> {getStatusText(titleTag?.status || "error")}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {titleTag?.lengthCurrent || 0}/{titleTag?.lengthMax || 60} символов
                  </span>
                </div>
                <p className="text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 p-2 rounded">{displayTitle}</p>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Мета-тег Description</h4>
              <div className="text-sm">
                <div className="flex flex-wrap items-center mb-2">
                  <span className={`status-badge mr-2 mb-1 ${getStatusColor(descriptionTag?.status || "error")}`}>
                    <i className="material-icons">{getStatusIcon(descriptionTag?.status || "error")}</i> {getStatusText(descriptionTag?.status || "error")}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {descriptionTag?.lengthCurrent || 0}/{descriptionTag?.lengthMax || 160} символов
                  </span>
                </div>
                <p className="text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 p-2 rounded">{displayDescription}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
