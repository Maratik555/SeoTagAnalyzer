import { useState } from "react";
import { SeoAnalysisResponse, TabType } from "@/lib/types";
import SEOScorecard from "./SEOScorecard";
import TabNavigation from "./TabNavigation";
import TabContent from "./TabContent";

interface ResultsContainerProps {
  result: SeoAnalysisResponse;
}

export default function ResultsContainer({ result }: ResultsContainerProps) {
  const [activeTab, setActiveTab] = useState<TabType>("meta-tags");

  return (
    <div className="space-y-8">
      <SEOScorecard
        score={result.score}
        success={result.success}
        warnings={result.warnings}
        errors={result.errors}
      />
      
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <TabContent activeTab={activeTab} result={result} />
    </div>
  );
}
