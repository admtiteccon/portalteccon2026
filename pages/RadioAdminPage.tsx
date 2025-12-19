
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
                        <h2 className="text-xl font-semibold mb-6 text-primary">Configuração da Rádio</h2>

                        <div className="p-6 bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 rounded-xl">
                            <p className="font-bold text-amber-700 dark:text-amber-400 mb-2">Sistema em Transição</p>
                            <p className="text-sm text-amber-600 dark:text-amber-300">
                                A integração anterior com o Google Drive foi removida conforme solicitado.
                                O portal agora está aguardando a configuração de uma nova forma de armazenamento ou streaming independente.
                            </p>
                        </div>

                        <div className="mt-8 grid md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h3 className="font-semibold text-slate-700 dark:text-slate-300">Próximos Passos:</h3>
                                <ul className="text-sm list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2">
                                    <li>Definir novo provedor de mídia (Local, S3, Dropbox, etc).</li>
                                    <li>Configurar URLs de streaming direto.</li>
                                    <li>Adaptar o player para o novo formato de arquivos.</li>
                                </ul>
                            </div>

                            <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
                                <p className="text-xs text-slate-500 italic">
                                    "A rádio continua funcional com um player de áudio resiliente, aguardando apenas o apontamento para os novos arquivos digitais."
                                </p>
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
