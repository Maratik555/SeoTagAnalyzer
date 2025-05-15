import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Этот эффект нужен, чтобы избежать гидратации при рендеринге
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Избегаем рендеринга компонента до клиентской гидратации
  }

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label={theme === 'light' ? 'Переключить на темную тему' : 'Переключить на светлую тему'}
    >
      {theme === 'light' ? (
        <span className="material-icons text-lg">dark_mode</span>
      ) : (
        <span className="material-icons text-lg text-gray-300">light_mode</span>
      )}
    </button>
  );
}