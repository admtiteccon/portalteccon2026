
import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useAuth } from '../hooks/useAuth';
import { RadioIcon } from '../components/icons/RadioIcon';

const RadioAdminPage: React.FC = () => {
    const { user } = useAuth();
    const folderId = "1JxtQ372m40Ue4dTXsxS_r5yYI2wkIrsN";
    const folderLink = "https://drive.google.com/drive/folders/1JxtQ372m40Ue4dTXsxS_r5yYI2wkIrsN";

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
                <p className="text-xl text-slate-600">Por favor, faça login para acessar esta página.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
            <Header toggleTheme={() => { }} currentTheme="dark" openLoginModal={() => { }} />

            <main className="flex-grow container mx-auto p-4 md:p-8">
                <div className="max-w-4xl mx-auto space-y-8">
                    <div className="flex items-center space-x-4 mb-8">
                        <div className="bg-primary/20 p-3 rounded-xl">
                            <RadioIcon className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold">Gerenciamento da Rádio (Google Drive)</h1>
                            <p className="text-slate-500">Sua rádio é alimentada automaticamente por uma pasta no Drive.</p>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700">
                        <h2 className="text-xl font-semibold mb-6 text-primary">Status da Integração</h2>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <div className="p-4 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 rounded">
                                    <p className="font-bold text-green-700 dark:text-green-400">Pasta Conectada:</p>
                                    <p className="text-xs break-all text-green-600 dark:text-green-300 opacity-70 mb-2">ID: {folderId}</p>
                                    <a
                                        href={folderLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center text-sm font-semibold text-primary hover:underline"
                                    >
                                        Abrir no Google Drive ↗
                                    </a>
                                </div>

                                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded">
                                    <p className="font-bold text-blue-700 dark:text-blue-400">Como funciona:</p>
                                    <ul className="text-sm list-disc list-inside text-blue-600 dark:text-blue-300 space-y-2 mt-2">
                                        <li>Arraste arquivos MP3, WAV ou OGG para a pasta.</li>
                                        <li>O portal detecta novos arquivos automaticamente.</li>
                                        <li>A programação toca as músicas em sequência.</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="font-bold text-slate-700 dark:text-slate-300">⚠️ Configuração Importante:</h3>
                                <p className="text-sm text-slate-500 leading-relaxed">
                                    Para que o portal consiga ler as músicas, a pasta no Google Drive <strong>deve estar configurada como pública</strong>:
                                </p>
                                <ol className="text-sm list-decimal list-inside space-y-2 text-slate-600 dark:text-slate-400">
                                    <li>Clique com botão direito na pasta no Drive.</li>
                                    <li>Escolha "Compartilhar".</li>
                                    <li>Em "Acesso Geral", mude para <strong>"Qualquer pessoa com o link"</strong>.</li>
                                    <li>Certifique-se de que está como <strong>"Leitor"</strong>.</li>
                                </ol>
                                <div className="pt-4">
                                    <img
                                        src="https://www.google.com/help/hc/images/drive_share_dialog.png"
                                        alt="Exemplo Compartilhamento"
                                        className="rounded-lg shadow-sm border border-slate-200 dark:border-slate-600 opacity-50 grayscale"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-center pt-8">
                        <a
                            href="/"
                            className="text-primary hover:underline font-medium"
                        >
                            ← Voltar para o Portal
                        </a>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default RadioAdminPage;
