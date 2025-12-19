
import React from 'react';
import { APP_CONFIG } from '../constants';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-800 mt-8">
      <div className="container mx-auto px-4 md:px-6 py-4 text-center text-sm text-slate-500 dark:text-slate-400">
        <p>&copy; {new Date().getFullYear()} {APP_CONFIG.NAME}. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};
