
import React from 'react';
import { SunIcon } from './icons/SunIcon';
import { MoonIcon } from './icons/MoonIcon';

interface ThemeTogglerProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const ThemeToggler: React.FC<ThemeTogglerProps> = ({ theme, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-secondary hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200"
      aria-label={`Mudar para tema ${theme === 'light' ? 'escuro' : 'claro'}`}
    >
      {theme === 'light' ? (
        <MoonIcon className="h-5 w-5" />
      ) : (
        <SunIcon className="h-5 w-5" />
      )}
    </button>
  );
};
