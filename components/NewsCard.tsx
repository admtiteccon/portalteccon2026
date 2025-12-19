
import React, { useState, useEffect } from 'react';
import { summarizeNews } from '../services/geminiService';
import { NewsSource } from '../types';
import { ShareIcon } from './icons/ShareIcon';
import { APP_CONFIG } from '../constants';

const LoadingSkeleton: React.FC = () => (
    <div className="space-y-3">
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
    </div>
);

export const NewsCard: React.FC<{ source: NewsSource; imageUrl: string }> = ({ source, imageUrl }) => {
  const [summary, setSummary] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [shareFeedback, setShareFeedback] = useState('Compartilhar');

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const result = await summarizeNews(source);
        setSummary(result);
      } catch (e: any) {
        setError(e.message || 'An unknown error occurred.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchSummary();
  }, [source]);

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  const handleShare = async () => {
    const shareData = {
      title: `${APP_CONFIG.NAME}: Notícia de ${source}`,
      text: summary,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Erro ao compartilhar:', err);
      }
    } else if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(summary);
        setShareFeedback('Copiado!');
        setTimeout(() => setShareFeedback('Compartilhar'), 2000);
      } catch (err) {
        console.error('Falha ao copiar texto: ', err);
        alert('Falha ao copiar o texto.');
      }
    } else {
      alert('Funcionalidade de compartilhamento não suportada neste navegador.');
    }
  };
  
  const isLongSummary = summary.length > 150;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm flex flex-col overflow-hidden transition-shadow hover:shadow-md">
      <img 
        src={imageUrl} 
        alt={`Notícia sobre ${source}`} 
        className="w-full h-32 object-cover" 
        loading="lazy"
        decoding="async"
      />
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-md font-bold text-primary dark:text-secondary mb-3">{source}</h3>
        <div className="flex-grow text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
          {isLoading && <LoadingSkeleton />}
          {!isLoading && error && <p className="text-red-500">{error}</p>}
          {!isLoading && !error && (
             <p className={`whitespace-pre-wrap ${!isExpanded && isLongSummary ? 'line-clamp-3' : ''}`}>
               {summary}
             </p>
          )}
        </div>
        {!isLoading && !error && (
          <div className="mt-4 flex items-center space-x-4">
            {isLongSummary && (
              <button 
                onClick={toggleExpanded}
                className="text-primary dark:text-secondary font-semibold text-sm hover:underline focus:outline-none"
                aria-expanded={isExpanded}
              >
                {isExpanded ? 'Ler menos' : 'Ler mais'}
              </button>
            )}
            <button
              onClick={handleShare}
              className="flex items-center space-x-1 text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-secondary transition-colors duration-200 focus:outline-none disabled:opacity-50"
              aria-label="Compartilhar notícia"
              disabled={shareFeedback === 'Copiado!'}
            >
              <ShareIcon className="h-4 w-4" />
              <span className="text-sm font-semibold">{shareFeedback}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
