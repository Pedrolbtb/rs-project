export async function POST() {
    try {
        console.log('[POST] Iniciando solicitação de token...');
        
        // Acessa variáveis de ambiente (corrigido o nome das variáveis)
        const CLIENT_ID = process.env.CLIENT_ID;
        const CLIENT_SECRET = process.env.CLIENT_SECRET;

        console.log('[POST] Variáveis de ambiente carregadas:', { 
            CLIENT_ID: CLIENT_ID ? '*** (presente)' : 'ausente',
            CLIENT_SECRET: CLIENT_SECRET ? '*** (presente)' : 'ausente'
        });

        // Verifica primeiro se as variáveis existem antes de usá-las
        if (!CLIENT_ID || !CLIENT_SECRET) {
            throw new Error('Credenciais não configuradas no .env');
        }

        // Corrigido o nome das variáveis (case-sensitive)
        const basicAuth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`);
        console.log('[POST] Basic Auth gerado');

        const apiUrl = 'https://integration.plataformaseru.com.br/v1/oauth/token';
        console.log('[POST] Enviando requisição para:', apiUrl);

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded', // Corrigido o header
                'Authorization': `Basic ${basicAuth}`,
            },
            body: new URLSearchParams({ grant_type: 'client_credentials' }), 
        });

        console.log(`[POST] Resposta recebida - Status: ${response.status}`);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('[POST] Erro na resposta:', errorText);
            throw new Error(`Erro na API: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        console.log('[POST] Token recebido com sucesso');

        if (!data.access_token?.trim()) {
            console.error('[POST] Token vazio recebido:', data);
            throw new Error('Token vazio recebido da API');
        }

        console.log('[POST] Retornando resposta bem-sucedida');
        return new Response(
            `Token gerado com sucesso!\n\n` +
            `Tipo: ${data.token_type}\n` +
            `Token de Acesso: ${data.access_token}\n` +
            `Expira em: ${data.expires_in} segundos\n` +
            `Escopo: ${data.scope || 'não informado'}\n` +
            `Data de Criação: ${new Date(data.created_at * 1000).toLocaleString()}`,
            { 
                status: 200,
                headers: { 'Content-Type': 'text/plain; charset=utf-8' }
            }
        );

    } catch (error) {
        console.error('[POST] Erro durante o processo:', error);
        return new Response(`ERRO: ${error.message}`, { 
            status: 500,
            headers: { 'Content-Type': 'text/plain; charset=utf-8' }
        });
    }
}