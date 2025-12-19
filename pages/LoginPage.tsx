
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { RoadIcon } from '../components/icons/RoadIcon';
import { APP_CONFIG } from '../constants';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoggingIn(true);
    try {
      await login({ email, password });
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro desconhecido.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-slate-100 dark:bg-slate-900 p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center items-center mb-6">
          <RoadIcon className="h-10 w-10 text-primary" />
          <h1 className="ml-3 text-3xl font-bold text-slate-800 dark:text-white">
            {APP_CONFIG.NAME}
          </h1>
        </div>
        <div className="bg-white dark:bg-slate-800 shadow-xl rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-center text-slate-700 dark:text-slate-200 mb-6">Acesso ao Portal</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-slate-600 dark:text-slate-300"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-primary focus:border-primary"
                placeholder={`seu${APP_CONFIG.EMAIL_DOMAIN}`}
                autoComplete="email"
              />
            </div>
            
            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-slate-600 dark:text-slate-300"
              >
                Senha
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="********"
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div className="bg-red-100 dark:bg-red-900/30 border-l-4 border-red-500 text-red-700 dark:text-red-200 p-3 rounded-md text-sm">
                <p>{error}</p>
              </div>
            )}
            
            <div>
              <button 
                type="submit"
                disabled={isLoggingIn}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed dark:focus:ring-offset-slate-800"
              >
                {isLoggingIn ? 'Entrando...' : 'Entrar'}
              </button>
            </div>
          </form>
           <div className="mt-6 text-center">
              <a href="#" className="text-sm text-primary hover:underline dark:text-secondary">
                Esqueceu a senha?
              </a>
          </div>
        </div>
        <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
            Não tem uma conta? <a href="#" className="font-medium text-primary hover:underline dark:text-secondary">Crie uma agora</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
