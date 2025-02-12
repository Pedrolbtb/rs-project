export async function GET(request) {
    try {
      // Obter token
      const tokenResponse = await fetch(`${process.env.NEXTAUTH_URL}/api/getToken`);
      if (!tokenResponse.ok) throw new Error('Falha ao obter token');
      const { access_token, token_type } = await tokenResponse.json();
  
      // Extrair parâmetros da URL
      const { searchParams } = new URL(request.url);
      const initialUpdatedAt = searchParams.get('initialUpdatedAt');
      const finalUpdatedAt = searchParams.get('finalUpdatedAt');
  
      // Buscar pedidos
      const ordersResponse = await fetch(
        `https://integration.plataformaseru.com.br/v1/orders?initialUpdatedAt=${initialUpdatedAt}&finalUpdatedAt=${finalUpdatedAt}`,
        { headers: { Authorization: `${token_type} ${access_token}` } }
      );
  
      if (!ordersResponse.ok) {
        const errorText = await ordersResponse.text();
        throw new Error(`Erro na API: ${ordersResponse.status} - ${errorText}`);
      }
  
      const ordersData = await ordersResponse.json();
      return new Response(JSON.stringify(ordersData.orders || ordersData), { status: 200 });
  
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
  }