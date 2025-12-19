import { NewsSource, NewsData } from "../types";

const MOCK_NEWS_DATA: Record<NewsSource, string> = {
    [NewsSource.GOINFRA]: "A GOINFRA anunciou hoje o início das obras de duplicação da GO-070 no trecho entre Itaberaí e a cidade de Goiás. O projeto, orçado em R$ 200 milhões, prevê a construção de três novos viadutos e a restauração completa do pavimento. A previsão de conclusão é de 24 meses.",
    [NewsSource.ANTT]: "A Agência Nacional de Transportes Terrestres publicou novas resoluções que alteram as regras para o transporte de cargas perigosas no país.",
    [NewsSource.MIN_TRANSPORTES]: "O Ministério dos Transportes, em parceria com o BNDES, lançou um novo programa de concessões de ferrovias, o 'Pro Trilhos 2'.",
    [NewsSource.DER]: "O Departamento de Estradas de Rodagem (DER) de São Paulo informa a interdição parcial da Rodovia dos Tamoios para obras de contenção de encostas.",
    [NewsSource.DNIT]: "O DNIT concluiu a pavimentação de 50km da BR-319, conectando Manaus a Porto Velho.",
    [NewsSource.INFRA_SA]: "A Infra S.A. divulgou o balanço do setor portuário de 2023, com recorde na movimentação de contêineres.",
    [NewsSource.CBIC]: "A CBIC aponta um crescimento de 2,5% no PIB da construção civil para o próximo ano.",
};

const RSS_FEEDS: Record<NewsSource, string> = {
    [NewsSource.GOINFRA]: "https://www.goinfra.go.gov.br/feed/",
    [NewsSource.ANTT]: "https://www.gov.br/antt/pt-br/assuntos/noticias/noticias/RSS",
    [NewsSource.MIN_TRANSPORTES]: "https://www.gov.br/transportes/pt-br/assuntos/noticias/RSS",
    [NewsSource.DER]: "https://www.der.sp.gov.br/WebSite/Noticias/Noticias.aspx",
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

            // Remove HTML tags for clean display
            const cleanText = (item.content || item.description || "").replace(/<[^>]*>?/gm, '');

            return {
                text: `${item.title}. ${cleanText}`,
                imageUrl: imageUrl
            };
        }
    } catch (error) {
        console.error(`Error fetching RSS for ${source}:`, error);
    }
    return { text: MOCK_NEWS_DATA[source] };
}

export const summarizeNews = async (source: NewsSource): Promise<NewsData> => {
    const { text: newsText, imageUrl } = await fetchLatestNews(source);

    // Retorna um resumo simples (os primeiros 280 caracteres) sem usar IA
    const summary = newsText.length > 280
        ? newsText.substring(0, 277) + "..."
        : newsText;

    return {
        summary: summary,
        imageUrl: imageUrl
    };
};