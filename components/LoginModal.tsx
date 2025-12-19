
import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Modal } from './Modal';
import { RoadIcon } from './icons/RoadIcon';
import { APP_CONFIG } from '../constants';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
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
      onClose(); // Close modal on successful login
    } catch (err: any)
    {
      setError(err.message || 'Ocorreu um erro desconhecido.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Reset form state when modal is closed
  useEffect(() => {
    if (!isOpen) {
        setTimeout(() => {
            setEmail('');
            setPassword('');
            setError(null);
            setIsLoggingIn(false);
        }, 300); // Delay to allow modal close animation
    }
  }, [isOpen]);


  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Acesso às Aplicações">
      <div className="w-full">
        <div className="flex justify-center items-center mb-4">
            <RoadIcon className="h-8 w-8 text-primary" />
            <h1 className="ml-3 text-2xl font-bold text-slate-800 dark:text-white">
                {APP_CONFIG.NAME}
            </h1>
        </div>
        <p className="text-center text-slate-600 dark:text-slate-300 mb-6">
            Faça login para acessar as ferramentas e sistemas exclusivos.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label 
              htmlFor="modal-email" 
              className="block text-sm font-medium text-slate-600 dark:text-slate-300"
            >
              Email
            </label>
            <input
              id="modal-email"
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
              htmlFor="modal-password" 
              className="block text-sm font-medium text-slate-600 dark:text-slate-300"
            >
              Senha
            </label>
            <input
              id="modal-password"
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
         <div className="mt-6 text-center text-sm space-x-2">
            <a href="#" className="font-medium text-primary hover:underline dark:text-secondary">
              Esqueceu a senha?
            </a>
            <span className="text-slate-400 dark:text-slate-500">&bull;</span>
            <a href="#" className="font-medium text-primary hover:underline dark:text-secondary">
              Crie uma conta
            </a>
        </div>
      </div>
    </Modal>
  );
};
