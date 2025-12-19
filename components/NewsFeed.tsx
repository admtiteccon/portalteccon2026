import React from 'react';
import { NewsSource } from '../types';
import { NewsCard } from './NewsCard';

const newsSources: NewsSource[] = [
  NewsSource.GOINFRA,
  NewsSource.DNIT,
];

const sourceBanners: Partial<Record<NewsSource, string>> = {
  [NewsSource.GOINFRA]: 'https://images.unsplash.com/photo-1470219556762-1771e7f9427d?q=80&w=800&auto=format&fit=crop',
  [NewsSource.DNIT]: 'https://images.unsplash.com/photo-1589563639434-3f74a053b4ad?q=80&w=800&auto=format&fit=crop',
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