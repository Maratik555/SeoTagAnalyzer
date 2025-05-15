import { SeoAnalysisResponse, TabType } from "@/lib/types";
import MetaTagsTab from "./MetaTagsTab";
import GooglePreviewTab from "./GooglePreviewTab";
import SocialPreviewTab from "./SocialPreviewTab";
import RecommendationsTab from "./RecommendationsTab";

interface TabContentProps {
  activeTab: TabType;
  result: SeoAnalysisResponse;
}

export default function TabContent({ activeTab, result }: TabContentProps) {
  return (
    <div id="tab-content">
      {activeTab === "meta-tags" && (
        <MetaTagsTab metaTags={result.metaTags} />
      )}
      
      {activeTab === "google-preview" && (
        <GooglePreviewTab
          url={result.url}
          title={result.title}
          description={result.description}
          metaTags={result.metaTags}
        />
      )}
      
      {activeTab === "social-preview" && (
        <SocialPreviewTab
          url={result.url}
          title={result.title}
          description={result.description}
          ogTags={result.ogTags}
          twitterTags={result.twitterTags}
        />
      )}
      
      {activeTab === "recommendations" && (
        <RecommendationsTab recommendations={result.recommendations} />
      )}
    </div>
  );
}
