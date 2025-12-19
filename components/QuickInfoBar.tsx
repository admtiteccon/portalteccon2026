import React, { useState, useEffect } from 'react';
import { fetchCurrencyRates } from '../services/currencyService';
import { CurrencyRates } from '../types';
import { DollarIcon } from './icons/DollarIcon';
import { EuroIcon } from './icons/EuroIcon';
import { HolidayCard } from './HolidayCard';

const InfoCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string | null;
  isLoading: boolean;
}> = ({ icon, label, value, isLoading }) => (
  <div className="flex items-center space-x-3 p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
    <div className="bg-primary/10 dark:bg-primary/20 p-2 rounded-full">
      {icon}
    </div>
    <div>
      <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
      {isLoading ? (
        <div className="h-6 w-20 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mt-1"></div>
      ) : (
        <p className="text-lg font-bold text-slate-900 dark:text-white">
          {value ? `R$ ${value}` : 'Erro'}
        </p>
      )}
    </div>
  </div>
);

export const QuickInfoBar: React.FC = () => {
  const [rates, setRates] = useState<CurrencyRates | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getRates = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const fetchedRates = await fetchCurrencyRates();
        setRates(fetchedRates);
      } catch (e: any) {
        setError(e.message || 'Ocorreu um erro desconhecido ao carregar as cotações.');
      } finally {
        setIsLoading(false);
      }
    };
    getRates();
  }, []);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3 text-slate-700 dark:text-slate-300">Informações Rápidas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <InfoCard
          icon={<DollarIcon className="h-6 w-6 text-primary" />}
          label="Dólar Americano"
          value={rates?.USD ? rates.USD.toFixed(2) : null}
          isLoading={isLoading}
        />
        <InfoCard
          icon={<EuroIcon className="h-6 w-6 text-primary" />}
          label="Euro"
          value={rates?.EUR ? rates.EUR.toFixed(2) : null}
          isLoading={isLoading}
        />
        <HolidayCard />
      </div>
      {error && (
        <div className="mt-4 p-4 bg-red-100 dark:bg-red-900/30 border-l-4 border-red-500 text-red-700 dark:text-red-200 rounded-md" role="alert">
          <p className="font-bold">Erro de Conexão</p>
          <p className="text-sm">{error}</p>
        </div>
      )}
    </div>
  );
};
