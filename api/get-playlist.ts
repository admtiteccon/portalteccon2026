
import axios from 'axios';

// Utilizando a API Key do Gemini (esperando que o Drive API esteja habilitado no mesmo projeto)
// Ou o usuário pode adicionar GOOGLE_DRIVE_API_KEY no Vercel
const API_KEY = process.env.API_KEY || process.env.GEMINI_API_KEY;
console.log('API_KEY present:', !!API_KEY);
const FOLDER_ID = '1JxtQ372m40Ue4dTXsxS_r5yYI2wkIrsN';

export default async function handler(req: any, res: any) {
    try {
        if (!API_KEY) {
            return res.status(500).json({ error: 'Google API Key not configured' });
        }

        // Listar arquivos da pasta pública do Google Drive
        const response = await axios.get(
            `https://www.googleapis.com/drive/v3/files`,
            {
                params: {
                    q: `'${FOLDER_ID}' in parents and trashed = false and mimeType contains 'audio/'`,
                    fields: 'files(id, name, webContentLink, mimeType, size)',
                    key: API_KEY,
                }
            }
        );

        const files = response.data.files || [];

        // Formatar para o frontend
        const playlist = files.map((file: any) => ({
            id: file.id,
            name: file.name,
            // URL de stream direto mais confiável
            url: `https://drive.google.com/uc?export=download&id=${file.id}`,
            mimeType: file.mimeType
        }));

        return res.status(200).json(playlist);
    } catch (error: any) {
        console.error('Error fetching Google Drive playlist:', error.response?.data || error.message);
        return res.status(500).json({
            error: 'Failed to fetch playlist',
            details: error.response?.data?.error?.message || error.message
        });
    }
}
