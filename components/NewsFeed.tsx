import React from 'react';
import { NewsSource } from '../types';
import { NewsCard } from './NewsCard';

const newsSources: NewsSource[] = [
  NewsSource.GOINFRA,
  NewsSource.ANTT,
  NewsSource.MIN_TRANSPORTES,
  NewsSource.DER,
  NewsSource.DNIT,
  NewsSource.INFRA_SA,
  NewsSource.CBIC,
];

const sourceBanners: Record<NewsSource, string> = {
  [NewsSource.GOINFRA]: 'https://images.unsplash.com/photo-1470219556762-1771e7f9427d?q=80&w=800&auto=format&fit=crop',
  [NewsSource.ANTT]: 'https://images.unsplash.com/photo-1565575313337-12c8a2c5a2a2?q=80&w=800&auto=format&fit=crop',
  [NewsSource.MIN_TRANSPORTES]: 'https://images.unsplash.com/photo-1559402996-85b8832a4920?q=80&w=800&auto=format&fit=crop',
  [NewsSource.DER]: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800&auto=format&fit=crop',
  [NewsSource.DNIT]: 'https://images.unsplash.com/photo-1589563639434-3f74a053b4ad?q=80&w=800&auto=format&fit=crop',
  [NewsSource.INFRA_SA]: 'https://images.unsplash.com/photo-1613109526013-35058583c34e?q=80&w=800&auto=format&fit=crop',
  [NewsSource.CBIC]: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop',
};

export const NewsFeed: React.FC = () => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-3 text-slate-700 dark:text-slate-300">Notícias do Setor</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {newsSources.map((source) => (
          <NewsCard 
            key={source} 
            source={source} 
            imageUrl={sourceBanners[source]} 
          />
        ))}
      </div>
    </div>
  );
};