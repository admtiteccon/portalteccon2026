
import React, { useState, useEffect } from 'react';
import { RoadIcon } from './icons/RoadIcon';
import { HelpIcon } from './icons/HelpIcon';
import { Modal } from './Modal';
import { ThemeToggler } from './ThemeToggler';
import { useAuth } from '../hooks/useAuth';
import { LogoutIcon } from './icons/LogoutIcon';
import { APP_CONFIG } from '../constants';
import { RadioIcon } from './icons/RadioIcon';
import { PlayIcon } from './icons/PlayIcon';
import { PauseIcon } from './icons/PauseIcon';
import { VolumeIcon } from './icons/VolumeIcon';

const RadioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [playlist, setPlaylist] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        console.log('Fetching playlist from /api/get-playlist...');
        const response = await fetch('/api/get-playlist');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Playlist loaded:', data);

        if (Array.isArray(data) && data.length > 0) {
          setPlaylist(data);
        } else {
          console.warn('Playlist is empty or invalid format');
        }
      } catch (error) {
        console.error('Failed to load radio playlist from API:', error);
        // Fallback or retry logic can be added here
      }
    };
    fetchPlaylist();
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Playback failed:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleEnded = () => {
    if (playlist.length > 1) {
      const nextIndex = (currentIndex + 1) % playlist.length;
      setCurrentIndex(nextIndex);
      // Auto play next
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play();
          setIsPlaying(true);
        }
      }, 100);
    } else {
      setIsPlaying(false);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setVolume(value);
    if (audioRef.current) {
      audioRef.current.volume = value;
    }
  };

  const currentTrack = playlist[currentIndex];
  // Fallback para uma rádio de streaming real e estável
  const audioSrc = currentTrack?.url || "https://streaming.radio.co/s6c016928e/listen";


  return (
    <div className="flex items-center space-x-3 bg-slate-100 dark:bg-slate-700/50 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-600">
      <audio
        ref={audioRef}
        src={audioSrc}
        onEnded={handleEnded}
        onError={(e) => console.error("Audio error:", e)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        preload="auto"
      />

      <div className="flex items-center space-x-2">
        <button
          onClick={togglePlay}
          className="p-1.5 bg-primary text-white rounded-full hover:scale-105 transition-transform"
        >
          {isPlaying ? <PauseIcon className="h-4 w-4" /> : <PlayIcon className="h-4 w-4 ml-0.5" />}
        </button>

        <div className="hidden lg:flex flex-col">
          <a
            href="/radio-admin"
            onClick={(e) => {
              e.preventDefault();
              window.history.pushState({}, '', '/radio-admin');
              window.dispatchEvent(new Event('navigate'));
            }}
            className="text-[10px] font-bold text-primary animate-pulse uppercase hover:underline cursor-pointer"
          >
            Rádio Teccon
          </a>
          <div className="flex items-center space-x-0.5 h-3">
            {[1, 2, 3, 4].map(i => (
              <div
                key={i}
                className={`w-0.5 bg-primary rounded-full transition-all duration-300 ${isPlaying ? 'animate-bounce' : 'h-1'}`}
                style={{ height: isPlaying ? `${Math.random() * 100}%` : '4px', animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2 group">
        <VolumeIcon className="h-4 w-4 text-slate-400" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="w-16 h-1 bg-slate-200 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer accent-primary"
        />
      </div>
    </div>
  );
};

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
              className="text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-secondary transition-colors duration-200 mr-2"
              aria-label={`Sobre o ${APP_CONFIG.NAME}`}
            >
              <HelpIcon className="h-6 w-6" />
            </button>
            <div className="hidden md:block">
              <RadioPlayer />
            </div>
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
