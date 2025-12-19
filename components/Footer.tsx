
import React from 'react';
import { APP_CONFIG } from '../constants';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { MapIcon } from './icons/MapIcon';
import { SpotifyIcon } from './icons/SpotifyIcon';
import { GraduationCapIcon } from './icons/GraduationCapIcon';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-800 mt-8 border-t border-slate-200 dark:border-slate-700">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-slate-600 dark:text-slate-300">

          {/* Suporte TI e Localização */}
          <div className="space-y-4">
            <h3 className="font-bold text-slate-800 dark:text-white uppercase tracking-wider text-sm">Suporte TI TECCON</h3>
            <div className="flex flex-col space-y-3">
              <a
                href="https://wa.me/5562000000000" // Placeholder, adjust as needed
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 border border-green-500/30 bg-green-500/5 p-3 rounded-lg hover:bg-green-500/10 transition-colors group"
              >
                <WhatsAppIcon className="h-5 w-5 text-green-500 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">WhatsApp TI</span>
              </a>
              <a
                href="https://share.google/yLTEc5mopobx71OgR"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 border border-blue-500/30 bg-blue-500/5 p-3 rounded-lg hover:bg-blue-500/10 transition-colors group"
              >
                <MapIcon className="h-5 w-5 text-blue-500 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">Nossa Localização</span>
              </a>
            </div>
          </div>

          {/* Institucionais */}
          <div className="space-y-4">
            <h3 className="font-bold text-slate-800 dark:text-white uppercase tracking-wider text-sm">Institucionais</h3>
            <div className="flex items-center space-x-6">
              <a href="https://www.goinfra.go.gov.br/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                <img src="https://www.goinfra.go.gov.br/wp-content/themes/goinfra/images/logo_goinfra.png" alt="Goinfra" className="h-10 object-contain brightness-0 dark:brightness-100" />
              </a>
              <a href="https://www.gov.br/dnit/pt-br" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                <img src="https://www.gov.br/dnit/pt-br/@@site-logo/logo.png" alt="DNIT" className="h-8 object-contain brightness-0 dark:brightness-100" />
              </a>
            </div>
          </div>

          {/* Links e Mídia */}
          <div className="space-y-4">
            <h3 className="font-bold text-slate-800 dark:text-white uppercase tracking-wider text-sm">Links e Mídia</h3>
            <div className="flex flex-col space-y-3">
              <a
                href="#" // Spotify Link placeholder
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:text-primary transition-colors group"
              >
                <SpotifyIcon className="h-5 w-5 text-[#1DB954] group-hover:scale-110 transition-transform" />
                <span className="text-sm">Spotify Teccon</span>
              </a>
              <a
                href="#" // EAD Link placeholder
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:text-primary transition-colors group"
              >
                <GraduationCapIcon className="h-5 w-5 text-slate-500 group-hover:scale-110 transition-transform" />
                <span className="text-sm">EAD Teccon</span>
              </a>
            </div>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700 text-center text-sm text-slate-400">
          <p>&copy; {new Date().getFullYear()} {APP_CONFIG.NAME}. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
