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
    className="relative w-16 h-8 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-300 ease-in-out"
    aria-label={theme === 'light' ? 'Переключить на темную тему' : 'Переключить на светлую тему'}
  >
    <div className="absolute inset-1 flex justify-between items-center px-1">
      <span className="material-icons text-amber-400 text-sm transform transition-transform duration-300 ease-in-out">
        light_mode
      </span>
      <span className="material-icons text-gray-300 text-sm transform transition-transform duration-300 ease-in-out">
        dark_mode
      </span>
    </div>
    <div 
      className={`absolute w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 ease-in-out ${
        theme === 'dark' ? 'translate-x-8' : 'translate-x-1'
      } top-1`}
    />
  </button>
  );
}