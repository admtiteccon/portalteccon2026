import React, { useEffect, useRef } from 'react';
import { XIcon } from './icons/XIcon';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 dark:bg-opacity-75 z-50 flex justify-center items-center p-4 transition-opacity duration-300"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        ref={modalRef} 
        className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-lg overflow-hidden transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale"
        style={{ animation: 'fade-in-scale 0.3s forwards cubic-bezier(0.165, 0.84, 0.44, 1)' }}
      >
        <div className="flex justify-between items-center p-4 border-b border-slate-200 dark:border-slate-700">
          <h2 id="modal-title" className="text-lg font-semibold text-slate-800 dark:text-white">
            {title}
          </h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-700 transition-colors"
            aria-label="Fechar modal"
          >
            <XIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="p-6 text-sm md:text-base">
          {children}
        </div>
      </div>
      <style>{`
        @keyframes fade-in-scale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in-scale {
          animation-fill-mode: forwards;
        }
      `}</style>
    </div>
  );
};
