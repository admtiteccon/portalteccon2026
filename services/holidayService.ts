import { Holiday } from '../types';

const API_BASE_URL = 'https://brasilapi.com.br/api/feriados/v1';

export const fetchHolidays = async (year: number): Promise<Holiday[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${year}`);
    if (!response.ok) {
      throw new Error(`A resposta da rede não foi bem-sucedida (status: ${response.status}).`);
    }
    const data: Holiday[] = await response.json();
    return data;
  } catch (error) {
    console.error(`Falha ao buscar feriados para o ano ${year}:`, error);
    throw new Error('Não foi possível conectar ao serviço de feriados.');
  }
};
