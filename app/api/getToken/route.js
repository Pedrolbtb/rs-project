export async function POST() {
    try {
        console.log('Solicitação de token recebida');
        const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

        const response = await fetch('https://integration.plataformaseru.com.br/v1/oauth/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${basicAuth}`,
            },
            body: new URLSearchParams({ grant_type: 'client_credentials' }), 
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Erro na API: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        
        // Verifica se o token está vazio
        if (!data.access_token || data.access_token.trim() === '') {
            throw new Error('Token vazio recebido da API');
        }

        // Formata os dados do token em texto
        const responseText = `Token gerado com sucesso!\n\n
        Tipo: ${data.token_type}\n
        Token de Acesso: ${data.access_token}\n
        Expira em: ${data.expires_in} segundos\n
        Escopo: ${data.scope || 'não informado'}\n
        Data de Criação: ${new Date(data.created_at * 1000).toLocaleString()}`;

        return new Response(responseText, { 
            status: 200,
            headers: { 'Content-Type': 'text/plain; charset=utf-8' }
        });

    } catch (error) {
        console.log('Erro:', error);
        return new Response(`ERRO: ${error.message}`, { 
            status: 500,
            headers: { 'Content-Type': 'text/plain; charset=utf-8' }
        });
    }
}