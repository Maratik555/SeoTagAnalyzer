import { extractDomain } from "@/lib/analyzer";
import { DEFAULT_TITLE, DEFAULT_DESCRIPTION, DEFAULT_IMAGE, DEFAULT_URL } from "@/lib/constants";
import { getStatusColor, getStatusIcon } from "@/lib/constants";

interface SocialPreviewTabProps {
  url: string;
  title?: string;
  description?: string;
  ogTags: Record<string, string | undefined>;
  twitterTags: Record<string, string | undefined>;
}

export default function SocialPreviewTab({ url, title, description, ogTags, twitterTags }: SocialPreviewTabProps) {
  const domain = extractDomain(url);
  
  // Facebook preview data
  const fbTitle = ogTags["og:title"] || title || DEFAULT_TITLE;
  const fbDescription = ogTags["og:description"] || description || DEFAULT_DESCRIPTION;
  const fbImage = ogTags["og:image"] || DEFAULT_IMAGE;
  
  // Twitter preview data
  const twTitle = twitterTags["twitter:title"] || ogTags["og:title"] || title || DEFAULT_TITLE;
  const twDescription = twitterTags["twitter:description"] || ogTags["og:description"] || description || DEFAULT_DESCRIPTION;
  const twImage = twitterTags["twitter:image"] || ogTags["og:image"];
  
  return (
    <div id="social-preview-tab" className="tab-panel">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="font-semibold text-gray-800 mb-6">Social Media Previews</h3>
        
        <div className="space-y-8">
          {/* Facebook Preview */}
          <div>
            <h4 className="font-medium text-gray-800 mb-3 flex items-center">
              <i className="material-icons mr-2 text-blue-600">facebook</i> Facebook Preview
            </h4>
            
            <div className="preview-card max-w-md border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <div className="h-52 bg-gray-200 flex items-center justify-center">
                {ogTags["og:image"] ? (
                  <img 
                    src={fbImage}
                    alt="Open Graph image"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <i className="material-icons text-gray-400 text-4xl">image_not_supported</i>
                    <p className="text-sm text-gray-500 mt-2">Изображение отсутствует</p>
                  </div>
                )}
              </div>
              <div className="p-3 bg-white">
                <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">{domain}</div>
                <h3 className="font-medium text-base mb-1">{fbTitle}</h3>
                <p className="text-sm text-gray-600">{fbDescription}</p>
              </div>
            </div>
            
            <div className="mt-4 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center">
                <div className="text-sm font-medium text-gray-700 sm:w-1/3">og:title</div>
                <div className="flex items-center">
                  <span className={`status-badge mr-2 ${getStatusColor(ogTags["og:title"] ? "success" : "warning")}`}>
                    <i className="material-icons">{getStatusIcon(ogTags["og:title"] ? "success" : "warning")}</i>
                  </span>
                  <span className="text-sm text-gray-800">{ogTags["og:title"] || "Отсутствует"}</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center">
                <div className="text-sm font-medium text-gray-700 sm:w-1/3">og:description</div>
                <div className="flex items-center">
                  <span className={`status-badge mr-2 ${getStatusColor(ogTags["og:description"] ? "success" : "warning")}`}>
                    <i className="material-icons">{getStatusIcon(ogTags["og:description"] ? "success" : "warning")}</i>
                  </span>
                  <span className="text-sm text-gray-800">{ogTags["og:description"] || "Отсутствует"}</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center">
                <div className="text-sm font-medium text-gray-700 sm:w-1/3">og:image</div>
                <div className="flex items-center">
                  <span className={`status-badge mr-2 ${getStatusColor(ogTags["og:image"] ? "success" : "error")}`}>
                    <i className="material-icons">{getStatusIcon(ogTags["og:image"] ? "success" : "error")}</i>
                  </span>
                  <span className="text-sm text-gray-800">
                    {ogTags["og:image"] ? "Присутствует" : "Отсутствует"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Twitter Preview */}
          <div>
            <h4 className="font-medium text-gray-800 mb-3 flex items-center">
              <i className="material-icons mr-2 text-blue-400">alternate_email</i> Twitter Preview
            </h4>
            
            <div className="preview-card max-w-md border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <div className="h-52 bg-gray-200 flex items-center justify-center">
                {twImage ? (
                  <img 
                    src={twImage}
                    alt="Twitter Card image"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <i className="material-icons text-gray-400 text-4xl">image_not_supported</i>
                    <p className="text-sm text-gray-500 mt-2">Изображение отсутствует</p>
                  </div>
                )}
              </div>
              <div className="p-3 bg-white">
                <h3 className="font-medium text-base mb-1">{twTitle}</h3>
                <p className="text-sm text-gray-600 mb-2">{twDescription}</p>
                <div className="text-xs text-gray-500">{domain}</div>
              </div>
            </div>
            
            <div className="mt-4 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center">
                <div className="text-sm font-medium text-gray-700 sm:w-1/3">twitter:card</div>
                <div className="flex items-center">
                  <span className={`status-badge mr-2 ${getStatusColor(twitterTags["twitter:card"] ? "success" : "warning")}`}>
                    <i className="material-icons">{getStatusIcon(twitterTags["twitter:card"] ? "success" : "warning")}</i>
                  </span>
                  <span className="text-sm text-gray-800">
                    {twitterTags["twitter:card"] || "Не определен (используется по умолчанию \"summary\")"}
                  </span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center">
                <div className="text-sm font-medium text-gray-700 sm:w-1/3">twitter:title</div>
                <div className="flex items-center">
                  <span className={`status-badge mr-2 ${getStatusColor(twitterTags["twitter:title"] ? "success" : (ogTags["og:title"] ? "warning" : "error"))}`}>
                    <i className="material-icons">{getStatusIcon(twitterTags["twitter:title"] ? "success" : (ogTags["og:title"] ? "warning" : "error"))}</i>
                  </span>
                  <span className="text-sm text-gray-800">
                    {twitterTags["twitter:title"] ? twitterTags["twitter:title"] : (ogTags["og:title"] ? "Использует og:title" : "Отсутствует")}
                  </span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center">
                <div className="text-sm font-medium text-gray-700 sm:w-1/3">twitter:image</div>
                <div className="flex items-center">
                  <span className={`status-badge mr-2 ${getStatusColor(twitterTags["twitter:image"] ? "success" : (ogTags["og:image"] ? "warning" : "error"))}`}>
                    <i className="material-icons">{getStatusIcon(twitterTags["twitter:image"] ? "success" : (ogTags["og:image"] ? "warning" : "error"))}</i>
                  </span>
                  <span className="text-sm text-gray-800">
                    {twitterTags["twitter:image"] ? "Присутствует" : (ogTags["og:image"] ? "Использует og:image" : "Отсутствует")}
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
