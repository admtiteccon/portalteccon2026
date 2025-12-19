
import React, { useState } from 'react';
import { RoadIcon } from './icons/RoadIcon';
import { HelpIcon } from './icons/HelpIcon';
import { Modal } from './Modal';
import { ThemeToggler } from './ThemeToggler';
import { useAuth } from '../hooks/useAuth';
import { LogoutIcon } from './icons/LogoutIcon';
import { APP_CONFIG } from '../constants';

interface HeaderProps {
  toggleTheme: () => void;
  currentTheme: 'light' | 'dark';
  openLoginModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ toggleTheme, currentTheme, openLoginModal }) => {
  const [isHelpModalOpen, setHelpModalOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <>
      <header className="bg-white dark:bg-slate-800 shadow-md">
        <div className="container mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <RoadIcon className="h-8 w-8 text-primary" />
            <h1 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white">
              {APP_CONFIG.NAME}
            </h1>
            <button
              onClick={() => setHelpModalOpen(true)}
              className="text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-secondary transition-colors duration-200"
              aria-label={`Sobre o ${APP_CONFIG.NAME}`}
            >
              <HelpIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="flex items-center space-x-4">
             {user ? (
                <div className="flex items-center space-x-4">
                    <div className="text-right hidden sm:block">
                        <p className="font-semibold text-slate-700 dark:text-slate-300">Bem-vindo(a)!</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{user.name}</p>
                    </div>
                    <button
                        onClick={logout}
                        className="p-2 rounded-full text-slate-500 hover:text-red-500 dark:text-slate-400 dark:hover:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200"
                        aria-label="Sair"
                    >
                        <LogoutIcon className="h-5 w-5" />
                    </button>
                </div>
             ) : (
                <button
                    onClick={openLoginModal}
                    className="px-4 py-2 bg-primary text-white rounded-md text-sm font-semibold hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-slate-800"
                    aria-label="Fazer login"
                >
                    Entrar
                </button>
             )}
            <ThemeToggler theme={currentTheme} toggleTheme={toggleTheme} />
          </div>
        </div>
      </header>
      <Modal 
        isOpen={isHelpModalOpen} 
        onClose={() => setHelpModalOpen(false)} 
        title={`Sobre o ${APP_CONFIG.NAME}`}
      >
        <div className="space-y-4 text-slate-600 dark:text-slate-300">
          <p>
            O <strong>{APP_CONFIG.NAME}</strong> é um portal de acesso centralizado a aplicativos e informações úteis para profissionais do setor de construção civil e transportes.
          </p>
          <p>
            Nosso objetivo é agilizar o dia a dia, oferecendo ferramentas como cotações de moedas em tempo real e resumos de notícias dos principais órgãos do setor, gerados por Inteligência Artificial para uma leitura rápida e eficiente.
          </p>
          <div>
            <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-2">Contato</h3>
            <p><strong>Email:</strong> {APP_CONFIG.CONTACT_EMAIL}</p>
            <p><strong>Telefone:</strong> {APP_CONFIG.CONTACT_PHONE}</p>
          </div>
        </div>
      </Modal>
    </>
  );
};
