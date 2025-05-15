import { MetaTag } from "@/lib/types";
import { getStatusColor, getStatusText, getStatusIcon } from "@/lib/constants";

interface MetaTagsTabProps {
  metaTags: MetaTag[];
}

export default function MetaTagsTab({ metaTags }: MetaTagsTabProps) {
  return (
    <div id="meta-tags-tab" className="tab-panel">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <h3 className="font-semibold text-gray-800">Detected Meta Tags</h3>
          <p className="text-sm text-gray-600">
            Найдено и проанализировано {metaTags.length} мета тегов
          </p>
        </div>
        
        <ul className="divide-y divide-gray-200">
          {metaTags.map((tag, index) => (
            <li key={index} className="meta-tag-item p-4">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between">
                <div className="flex-grow mr-4">
                  <div className="flex items-center mb-2">
                    <span className={`status-badge mr-2 ${getStatusColor(tag.status)}`}>
                      <i className="material-icons">{getStatusIcon(tag.status)}</i> {getStatusText(tag.status)}
                    </span>
                    <h4 className="font-medium text-gray-800">{tag.name}</h4>
                  </div>
                  <div className="text-sm bg-gray-50 p-2 rounded font-mono mb-2">
                    {tag.value || "Отсутствует"}
                  </div>
                  <p className="text-sm text-gray-600">
                    {tag.description}
                  </p>
                </div>
                {tag.lengthCurrent !== undefined && tag.lengthMax !== undefined && (
                  <div className="mt-2 sm:mt-0 text-right">
                    <div className="text-xs text-gray-500">Длина</div>
                    <div className="flex items-center justify-end mt-1">
                      <div className="w-16 h-2 bg-gray-200 rounded-full mr-2">
                        <div 
                          className={`h-2 ${
                            tag.status === "success" 
                              ? "bg-success-500" 
                              : tag.status === "warning" 
                                ? "bg-warning-500" 
                                : "bg-error-500"
                          } rounded-full`}
                          style={{ width: `${Math.min(100, (tag.lengthCurrent / tag.lengthMax) * 100)}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-gray-800">
                        {tag.lengthCurrent}/{tag.lengthMax}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
