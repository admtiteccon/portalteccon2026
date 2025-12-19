
import React from 'react';
import { useAuth } from './hooks/useAuth';
import DashboardPage from './pages/DashboardPage';

const LoadingScreen: React.FC = () => (
  <div className="min-h-screen flex justify-center items-center bg-slate-100 dark:bg-slate-900">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
  </div>
);

const App: React.FC = () => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  // Always render the Dashboard. The Dashboard itself will handle
  // prompting for login when necessary.
  return <DashboardPage />;
};

export default App;
