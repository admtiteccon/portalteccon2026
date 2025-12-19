import { GoogleGenAI } from "@google/genai";
import { NewsSource } from "../types";

const MOCK_NEWS_DATA: Record<NewsSource, string> = {
    [NewsSource.GOINFRA]: "A GOINFRA anunciou hoje o início das obras de duplicação da GO-070 no trecho entre Itaberaí e a cidade de Goiás. O projeto, orçado em R$ 200 milhões, prevê a construção de três novos viadutos e a restauração completa do pavimento. A previsão de conclusão é de 24 meses. Adicionalmente, foi aberta licitação para a manutenção de rodovias na região nordeste do estado.",
    [NewsSource.ANTT]: "A Agência Nacional de Transportes Terrestres publicou novas resoluções que alteram as regras para o transporte de cargas perigosas no país. As mudanças visam aumentar a segurança e alinhar as normas brasileiras com acordos internacionais. As empresas terão um prazo de 180 dias para se adequarem. Também foi divulgado o novo piso mínimo do frete rodoviário, com reajuste médio de 4,5%.",
    [NewsSource.MIN_TRANSPORTES]: "O Ministério dos Transportes, em parceria com o BNDES, lançou um novo programa de concessões de ferrovias, o 'Pro Trilhos 2'. O pacote inclui mais de 5.000 km de novos trechos e a modernização de linhas existentes. O objetivo é equilibrar a matriz de transportes do Brasil, aumentando a participação do modal ferroviário. O primeiro leilão está previsto para o primeiro trimestre do próximo ano.",
    [NewsSource.DER]: "O Departamento de Estradas de Rodagem (DER) de São Paulo informa a interdição parcial da Rodovia dos Tamoios para obras de contenção de encostas. Os bloqueios ocorrerão durante a noite, das 22h às 5h, pelos próximos 30 dias. O DER recomenda rotas alternativas e pede atenção redobrada aos motoristas. Foi também anunciado um novo sistema de pedágio 'free flow' a ser implementado na Rodovia Rio-Santos.",
    [NewsSource.DNIT]: "O DNIT concluiu a pavimentação de 50km da BR-319, conectando Manaus a Porto Velho. A obra é um marco para a integração da Amazônia, reduzindo o tempo de viagem e os custos de transporte na região. Estudos de impacto ambiental continuam para os próximos trechos.",
    [NewsSource.INFRA_SA]: "A Infra S.A. divulgou o balanço do setor portuário de 2023, com recorde na movimentação de contêineres. A empresa planeja investimentos de R$ 10 bilhões em automação e dragagem dos principais portos do país para aumentar a competitividade no mercado internacional.",
    [NewsSource.CBIC]: "A CBIC aponta um crescimento de 2,5% no PIB da construção civil para o próximo ano. A projeção é impulsionada por novos projetos do programa 'Minha Casa, Minha Vida' e pela queda da taxa de juros, que estimula o financiamento imobiliário e de obras de infraestrutura.",
};

export const summarizeNews = async (source: NewsSource): Promise<string> => {
    if (!process.env.API_KEY) {
        console.error("API_KEY not found.");
        // Return mock data if API key is not set for local development
        return new Promise(resolve => setTimeout(() => resolve(`Resumo para ${source} estaria aqui. Configure sua API_KEY do Gemini.`), 1000));
    }

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const newsText = MOCK_NEWS_DATA[source];
        
        const prompt = `Você é um analista sênior especializado em infraestrutura e transportes no Brasil. Sua tarefa é resumir a seguinte notícia da ${source} de forma clara e objetiva para profissionais do setor. Comece com uma frase de impacto que capture a essência da notícia. Em seguida, liste os 3 pontos-chave em formato de bullet points (usando '-'). Seja conciso e direto. Notícia: '${newsText}'`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return response.text.trim();
    } catch (error) {
        console.error(`Error summarizing news for ${source}:`, error);
        throw new Error("Não foi possível gerar o resumo. Tente novamente mais tarde.");
    }
};