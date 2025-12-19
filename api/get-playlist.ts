
export default async function handler(req: any, res: any) {
    try {
        // Playlist manual com o link direto fornecido
        const playlist: any[] = [
            {
                id: '1',
                name: 'Goiás saltou 11 posições em rodovias',
                url: 'https://inventario.tiserver.sbs/Goiás_saltou_11_posições_em_rodovias.m4a',
                mimeType: 'audio/mp4'
            }
        ];

        return res.status(200).json(playlist);
    } catch (error: any) {
        return res.status(500).json({ error: 'Erro ao carregar playlist' });
    }
}
