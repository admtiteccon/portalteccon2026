
import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { QuickInfoBar } from '../components/QuickInfoBar';
import { AppGrid } from '../components/AppGrid';
import { NewsFeed } from '../components/NewsFeed';
import { Footer } from '../components/Footer';
import { LoginModal } from '../components/LoginModal';

type Theme = 'light' | 'dark';

const DashboardPage: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedTheme = window.localStorage.getItem('theme') as Theme;
      if (savedTheme) return savedTheme;

      const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      return userPrefersDark ? 'dark' : 'light';
    }
    return 'light';
  });

  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'light' ? 'dark' : 'light');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const openLoginModal = () => setLoginModalOpen(true);
  const closeLoginModal = () => setLoginModalOpen(false);

  return (
    <div className="min-h-screen flex flex-col text-slate-800 dark:text-slate-200">
      <Header 
        toggleTheme={toggleTheme} 
        currentTheme={theme} 
        openLoginModal={openLoginModal} 
      />
      <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8 space-y-8">
        <QuickInfoBar />
        <AppGrid openLoginModal={openLoginModal} />
        <NewsFeed />
      </main>
      <Footer />
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </div>
  );
};

export default DashboardPage;
