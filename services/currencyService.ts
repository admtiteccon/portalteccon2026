import { CurrencyRates } from '../types';

const API_URL = 'https://api.frankfurter.app/latest?from=BRL&to=USD,EUR';

export const fetchCurrencyRates = async (): Promise<CurrencyRates> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`A resposta da rede não foi bem-sucedida (status: ${response.status}).`);
    }
    const data = await response.json();
    if (!data.rates || !data.rates.USD || !data.rates.EUR) {
        throw new Error('A API de cotação retornou dados em um formato inesperado.');
    }
    // A API retorna o valor de 1 BRL em outras moedas (ex: 1 BRL = 0.19 USD).
    // Para exibir o valor de 1 USD/EUR em BRL, precisamos calcular o inverso.
    return {
      USD: 1 / data.rates.USD,
      EUR: 1 / data.rates.EUR,
    };
  } catch (error) {
    console.error('Falha ao buscar cotações:', error);
    if (error instanceof Error) {
        // Re-lança o erro com uma mensagem mais amigável para a UI
        throw new Error(error.message);
    }
    throw new Error('Não foi possível conectar ao serviço de cotações.');
  }
};
