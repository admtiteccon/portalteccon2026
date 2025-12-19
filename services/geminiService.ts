import { GoogleGenerativeAI } from "@google/generative-ai";
import { NewsSource, NewsData } from "../types";

const MOCK_NEWS_DATA: Record<NewsSource, string> = {
    [NewsSource.GOINFRA]: "A GOINFRA anunciou hoje o início das obras de duplicação da GO-070 no trecho entre Itaberaí e a cidade de Goiás. O projeto, orçado em R$ 200 milhões, prevê a construção de três novos viadutos e a restauração completa do pavimento. A previsão de conclusão é de 24 meses. Adicionalmente, foi aberta licitação para a manutenção de rodovias na região nordeste do estado.",
    [NewsSource.ANTT]: "A Agência Nacional de Transportes Terrestres publicou novas resoluções que alteram as regras para o transporte de cargas perigosas no país. As mudanças visam aumentar a segurança e alinhar as normas brasileiras com acordos internacionais. As empresas terão um prazo de 180 dias para se adequarem. Também foi divulgado o novo piso mínimo do frete rodoviário, com reajuste médio de 4,5%.",
    [NewsSource.MIN_TRANSPORTES]: "O Ministério dos Transportes, em parceria com o BNDES, lançou um novo programa de concessões de ferrovias, o 'Pro Trilhos 2'. O pacote inclui mais de 5.000 km de novos trechos e a modernização de linhas existentes. O objetivo é equilibrar a matriz de transportes do Brasil, aumentando a participação do modal ferroviário. O primeiro leilão está previsto para o primeiro trimestre do próximo ano.",
    [NewsSource.DER]: "O Departamento de Estradas de Rodagem (DER) de São Paulo informa a interdição parcial da Rodovia dos Tamoios para obras de contenção de encostas. Os bloqueios ocorrerão durante a noite, das 22h às 5h, pelos próximos 30 dias. O DER recomenda rotas alternativas e pede atenção redobrada aos motoristas. Foi também anunciado um novo sistema de pedágio 'free flow' a ser implementado na Rodovia Rio-Santos.",
    [NewsSource.DNIT]: "O DNIT concluiu a pavimentação de 50km da BR-319, conectando Manaus a Porto Velho. A obra é um marco para a integração da Amazônia, reduzindo o tempo de viagem e os custos de transporte na região. Estudos de impacto ambiental continuam para os próximos trechos.",
    [NewsSource.INFRA_SA]: "A Infra S.A. divulgou o balanço do setor portuário de 2023, com recorde na movimentação de contêineres. A empresa planeja investimentos de R$ 10 bilhões em automação e dragagem dos principais portos do país para aumentar a competitividade no mercado internacional.",
    [NewsSource.CBIC]: "A CBIC aponta um crescimento de 2,5% no PIB da construção civil para o próximo ano. A projeção é impulsionada por novos projetos do programa 'Minha Casa, Minha Vida' e pela queda da taxa de juros, que estimula o financiamento imobiliário e de obras de infraestrutura.",
};

const RSS_FEEDS: Record<NewsSource, string> = {
    [NewsSource.GOINFRA]: "https://www.goinfra.go.gov.br/feed/",
    [NewsSource.ANTT]: "https://www.gov.br/antt/pt-br/assuntos/noticias/noticias/RSS",
    [NewsSource.MIN_TRANSPORTES]: "https://www.gov.br/transportes/pt-br/assuntos/noticias/RSS",
    [NewsSource.DER]: "https://www.der.sp.gov.br/WebSite/Noticias/Noticias.aspx", // Placeholder as DER usually doesn't have clean RSS
    [NewsSource.DNIT]: "https://www.gov.br/dnit/pt-br/assuntos/noticias/RSS",
    [NewsSource.INFRA_SA]: "https://www.infrasa.gov.br/noticias?format=feed&type=rss",
    [NewsSource.CBIC]: "https://cbic.org.br/feed/",
};

async function fetchLatestNews(source: NewsSource): Promise<{ text: string; imageUrl?: string }> {
    try {
        const feedUrl = RSS_FEEDS[source];
        if (!feedUrl || feedUrl.includes(".aspx")) return { text: MOCK_NEWS_DATA[source] };

        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`);
        const data = await response.json();

        if (data.status === 'ok' && data.items && data.items.length > 0) {
            const item = data.items[0];
            let imageUrl = item.thumbnail || item.enclosure?.link;

            if (!imageUrl && item.content) {
                const imgMatch = item.content.match(/<img[^>]+src="([^">]+)"/);
                if (imgMatch) imageUrl = imgMatch[1];
            }

            return {
                text: `${item.title}. ${item.content || item.description || ""}`,
                imageUrl: imageUrl
            };
        }
    } catch (error) {
        console.error(`Error fetching RSS for ${source}:`, error);
    }
    return { text: MOCK_NEWS_DATA[source] };
}

export const summarizeNews = async (source: NewsSource): Promise<NewsData> => {
    const apiKey = typeof process !== 'undefined' ? process.env.API_KEY : undefined;

    const { text: newsText, imageUrl } = await fetchLatestNews(source);

    if (!apiKey) {
        console.warn("API_KEY not found. Using fallback summary.");
        // If no API key, return a simple summary of the fetched text or mock
        return {
            summary: `[Resumo Simulado] ${newsText.substring(0, 150)}... (Configure o Gemini para resumos reais)`,
            imageUrl: imageUrl
        };
    }

    try {
        const genAI = new GoogleGenerativeAI(apiKey);

        const prompt = `Você é um analista sênior especializado em infraestrutura e transportes no Brasil. Sua tarefa é resumir a seguinte notícia da ${source} de forma clara e objetiva para profissionais do setor. Comece com uma frase de impacto que capture a essência da notícia. Em seguida, liste os 3 pontos-chave em formato de bullet points (usando '-'). Seja conciso e direto. Notícia: '${newsText}'`;

        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return {
            summary: response.text().trim(),
            imageUrl: imageUrl
        };
    } catch (error) {
        console.error(`Error summarizing news for ${source}:`, error);
        return {
            summary: newsText.substring(0, 160) + "...",
            imageUrl: imageUrl
        };
    }
};