
import React, { useState, useEffect } from 'react';
import { useAuth } from './hooks/useAuth';
import DashboardPage from './pages/DashboardPage';
import RadioAdminPage from './pages/RadioAdminPage';

const LoadingScreen: React.FC = () => (
  <div className="min-h-screen flex justify-center items-center bg-slate-100 dark:bg-slate-900">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
  </div>
);

const App: React.FC = () => {
  const { isLoading } = useAuth();
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);

    // Custom event for internal navigation
    window.addEventListener('navigate', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('navigate', handleLocationChange);
    };
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  // Simple Router
  if (currentPath === '/radio-admin') {
    return <RadioAdminPage />;
  }

  return <DashboardPage />;
};

export default App;
