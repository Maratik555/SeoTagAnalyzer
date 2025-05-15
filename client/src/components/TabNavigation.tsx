import { TABS } from "@/lib/constants";
import { TabType } from "@/lib/types";

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="tabs-container border-b border-gray-200 dark:border-gray-700">
      <div className="flex space-x-6 overflow-x-auto hide-scrollbar">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`tab py-3 px-1 font-medium ${
              activeTab === tab.id 
                ? "active text-gray-800 dark:text-gray-100" 
                : "text-gray-500 dark:text-gray-400"
            }`}
            onClick={() => onTabChange(tab.id)}
          >
            <i className="material-icons align-middle mr-1">{tab.icon}</i> {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
