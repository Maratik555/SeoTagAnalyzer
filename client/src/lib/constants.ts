import { TabType } from "./types";

// Tab options for the analyzer
export const TABS: { id: TabType; label: string; icon: string }[] = [
  {
    id: "meta-tags",
    label: "Мета теги",
    icon: "code",
  },
  {
    id: "google-preview",
    label: "Google Preview",
    icon: "search",
  },
  {
    id: "social-preview",
    label: "Social Media Preview",
    icon: "share",
  },
  {
    id: "recommendations",
    label: "Рекомендации",
    icon: "lightbulb",
  },
];

// Default placeholder values for previews when data is missing
export const DEFAULT_TITLE = "Untitled Page";
export const DEFAULT_DESCRIPTION = "No description provided";
export const DEFAULT_URL = "example.com";
export const DEFAULT_IMAGE = "https://via.placeholder.com/1200x630?text=No+Image+Provided";

// Helper function to get the status color
export const getStatusColor = (status: string): string => {
  switch (status) {
    case "success":
      return "bg-success-50 text-success-700";
    case "warning":
      return "bg-warning-50 text-warning-700";
    case "error":
      return "bg-error-50 text-error-700";
    default:
      return "bg-gray-50 text-gray-700";
  }
};

// Helper function to get status text
export const getStatusText = (status: string): string => {
  switch (status) {
    case "success":
      return "Хорошо";
    case "warning":
      return "Улучшить";
    case "error":
      return "Исправить";
    default:
      return "Неизвестно";
  }
};

// Helper function to get status icon
export const getStatusIcon = (status: string): string => {
  switch (status) {
    case "success":
      return "check_circle";
    case "warning":
      return "warning";
    case "error":
      return "error";
    default:
      return "help";
  }
};
