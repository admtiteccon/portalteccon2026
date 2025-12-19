
import React from 'react';
import { AppLink } from '../types';
import { BuildingIcon } from './icons/BuildingIcon';
import { CalendarIcon } from './icons/CalendarIcon';
import { DocIcon } from './icons/DocIcon';
import { MapIcon } from './icons/MapIcon';
import { useAuth } from '../hooks/useAuth';

const appLinks: AppLink[] = [
  { name: "InventárioTI", icon: BuildingIcon, url: "#" },
  { name: "App Meeting", icon: CalendarIcon, url: "#" },
  { name: "NotebookLM", icon: DocIcon, url: "#" },
  { name: "Mapas e Rotas", icon: MapIcon, url: "https://www.infraestrutura.pi.gov.br/wp-content/uploads/2021/04/MAPA-RODOVIARIO-PI-2021.pdf" },
];

interface AppCardProps {
  link: AppLink;
  onClick: () => void;
}

const AppCard: React.FC<AppCardProps> = ({ link, onClick }) => (
  <button
    onClick={onClick}
    className="group bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center w-full"
    aria-label={`Acessar ${link.name}`}
  >
    <div className="bg-secondary/10 dark:bg-secondary/20 p-4 rounded-full mb-4 group-hover:bg-secondary/20 dark:group-hover:bg-secondary/30 transition-colors">
      <link.icon className="h-8 w-8 text-secondary" />
    </div>
    <p className="font-semibold text-slate-700 dark:text-slate-200">{link.name}</p>
    <p className="text-sm text-slate-500 dark:text-slate-400">Acessar sistema</p>
  </button>
);

interface AppGridProps {
  openLoginModal: () => void;
}

export const AppGrid: React.FC<AppGridProps> = ({ openLoginModal }) => {
  const { user } = useAuth();

  const handleAppClick = (link: AppLink) => {
    if (user) {
      // If user is logged in, you can navigate or perform an action
      // For now, links are "#", so this is just a placeholder action.
      alert(`Acessando ${link.name}... (Funcionalidade a ser implementada)`);
      // In a real app, you would navigate:
      // window.location.href = link.url;
    } else {
      // If not logged in, open the login modal
      openLoginModal();
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3 text-slate-700 dark:text-slate-300">Aplicações</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {appLinks.map((link) => (
          <AppCard key={link.name} link={link} onClick={() => handleAppClick(link)} />
        ))}
      </div>
    </div>
  );
};
