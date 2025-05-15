import { TABS } from "@/lib/constants";
import { TabType } from "@/lib/types";

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const getTabColor = (tabId: TabType) => {
    switch(tabId) {
      case 'meta-tags':
        return 'blue';
      case 'google-preview':
        return 'green';
      case 'social-preview':
        return 'purple';
      case 'recommendations':
        return 'amber';
      default:
        return 'gray';
    }
  };

  return (
    <div className="tabs-container border-b border-gray-200 dark:border-gray-700 mb-6">
      <div className="flex flex-wrap md:flex-nowrap gap-2 md:gap-4 overflow-x-auto hide-scrollbar">
        {TABS.map(tab => {
          const color = getTabColor(tab.id);
          return (
            <button
              key={tab.id}
              className={`relative flex items-center py-3 px-4 font-medium rounded-t-lg transition-all duration-200 ${
                activeTab === tab.id 
                  ? `bg-${color}-100 dark:bg-${color}-900/40 text-${color}-700 dark:text-${color}-300 border-b-2 border-${color}-500` 
                  : `text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50`
              }`}
              onClick={() => onTabChange(tab.id)}
            >
              <i className={`material-icons mr-2 ${activeTab === tab.id ? `text-${color}-600 dark:text-${color}-400` : 'text-gray-500 dark:text-gray-400'}`}>
                {tab.icon}
              </i> 
              <span>{tab.label}</span>
              {activeTab === tab.id && (
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-${color}-500 dark:bg-${color}-400 animate-fadeIn`}></span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
