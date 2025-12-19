import React, { useState, useEffect, useMemo } from 'react';
import { fetchHolidays } from '../services/holidayService';
import { Holiday } from '../types';
import { CalendarIcon } from './icons/CalendarIcon';

const HolidayInfo: React.FC<{ holidays: Holiday[] }> = ({ holidays }) => {
    if (holidays.length === 0) {
        return <p className="text-sm text-slate-500 dark:text-slate-400">Nenhum feriado encontrado.</p>;
    }

    return (
        <div className="space-y-1">
            {holidays.map(holiday => (
                <div key={holiday.date}>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">{holiday.name}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        {new Date(holiday.date.replace(/-/g, '/')).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' })}
                    </p>
                </div>
            ))}
        </div>
    );
};

const LoadingSkeleton = () => (
    <div>
        <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
        <div className="h-4 w-1/2 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mt-2"></div>
    </div>
);

export const HolidayCard: React.FC = () => {
    const [allHolidays, setAllHolidays] = useState<Holiday[]>([]);
    const [displayedHolidays, setDisplayedHolidays] = useState<Holiday[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchYear, setSearchYear] = useState(new Date().getFullYear().toString());
    const [searchMonth, setSearchMonth] = useState((new Date().getMonth() + 1).toString());

    const findNextHoliday = (holidays: Holiday[]) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalize to start of day
        return holidays.find(h => new Date(h.date.replace(/-/g, '/')) >= today);
    };

    const fetchAndSetInitialHoliday = async () => {
        try {
            setIsLoading(true);
            setError(null);
            let year = new Date().getFullYear();
            let holidays = await fetchHolidays(year);
            let nextHoliday = findNextHoliday(holidays);

            if (!nextHoliday) {
                // If no more holidays this year, check next year
                year++;
                holidays = [...holidays, ...await fetchHolidays(year)];
                nextHoliday = findNextHoliday(holidays);
            }
            
            setAllHolidays(holidays);
            setDisplayedHolidays(nextHoliday ? [nextHoliday] : []);
        } catch (e: any) {
            setError(e.message || 'Erro ao carregar feriados.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAndSetInitialHoliday();
    }, []);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            const yearHolidays = allHolidays.some(h => h.date.startsWith(searchYear)) 
                ? allHolidays.filter(h => h.date.startsWith(searchYear))
                : await fetchHolidays(parseInt(searchYear, 10));

            if (!allHolidays.some(h => h.date.startsWith(searchYear))) {
                setAllHolidays(prev => [...prev, ...yearHolidays]);
            }

            const month = searchMonth.padStart(2, '0');
            const filtered = yearHolidays.filter(h => h.date.split('-')[1] === month);
            setDisplayedHolidays(filtered);
        } catch (e: any) {
             setError(e.message || 'Erro ao buscar feriados.');
             setDisplayedHolidays([]);
        } finally {
            setIsLoading(false);
        }
    };
    
    const months = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
        value: (i + 1).toString(),
        label: new Date(0, i).toLocaleString('pt-BR', { month: 'long' })
    })), []);


    return (
        <div className="flex flex-col p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm space-y-4">
             <div className="flex items-center space-x-3">
                <div className="bg-primary/10 dark:bg-primary/20 p-2 rounded-full">
                   <CalendarIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Feriados Nacionais</p>
                    {isLoading ? <LoadingSkeleton /> : <HolidayInfo holidays={displayedHolidays} />}
                </div>
            </div>
            
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 items-end">
                <div className="flex-1 w-full">
                    <label htmlFor="month-select" className="text-xs font-medium text-slate-600 dark:text-slate-400">Mês</label>
                     <select 
                        id="month-select"
                        value={searchMonth} 
                        onChange={e => setSearchMonth(e.target.value)}
                        className="w-full mt-1 p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-sm focus:ring-2 focus:ring-primary focus:border-primary"
                    >
                        {months.map(m => <option key={m.value} value={m.value}>{m.label[0].toUpperCase() + m.label.slice(1)}</option>)}
                    </select>
                </div>
                <div className="flex-1 w-full sm:w-auto">
                    <label htmlFor="year-input" className="text-xs font-medium text-slate-600 dark:text-slate-400">Ano</label>
                    <input 
                        id="year-input"
                        type="number" 
                        value={searchYear} 
                        onChange={e => setSearchYear(e.target.value)}
                        className="w-full mt-1 p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-sm focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder="Ano"
                        min="1900"
                        max="2100"
                    />
                </div>
                <button type="submit" className="w-full sm:w-auto bg-primary text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-slate-800">
                    Buscar
                </button>
            </form>
            {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
        </div>
    );
};
