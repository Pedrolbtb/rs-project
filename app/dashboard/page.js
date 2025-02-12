"use client";
import { useState, useEffect } from "react";

export default function OrdersComponent() {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);

    // Função para obter o token de acesso
    const getAccessToken = async () => {
        try {
            const clientId = '5d083833efaea3d487cf189a201e861db29d8d3a';
            const clientSecret = 'eae0e6b53ff8fd8169046d4f53a406c51a5d044dd45110fe4b172f33b38bbe87b3c9cea542f296332701ee43c491884ab30170b6c532ef5c779857b51794eb58d89a40472d4a449170b1fe98467705d2c9b6af932c6afccdf106f243fcebaadaf322a3e57113037e69585e2aeed972e34ecb6d75e2f6243d811cd2dd08b1a3b46b83ff50cafc41c210452a8b49cf05138bd32f2acf80ad86a2bbd9663184244240a40113363f9dbff6e3049e833fa04ce41ded6b6d0f1ef823a97be081a5a61b0e95832d26dc3b518c6c552a93747ec6b172992778f5400798f6233d7d0cbdbada5ed545fd97e3ef04c23685c63b19901f1ec4cb5610a7c290172be26bc0fe7f';

            // Codifica clientId e clientSecret em Base64
            const basicAuth = btoa(`${clientId}:${clientSecret}`);

            console.log("Enviando requisição para obter o token...");

            const response = await fetch('https://integration.plataformaserv.com.br/v1/oauth/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${basicAuth}`,
                },
                body: JSON.stringify({
                    grantType: 'client_credentials', // Campo "grantType" conforme a documentação
                }),
            });

            console.log("Resposta da API de token:", response);

            if (!response.ok) {
                const errorResponse = await response.json();
                console.error("Erro na resposta da API de token:", errorResponse);
                throw new Error(`Erro ao obter o token de acesso: ${response.statusText}`);
            }

            const data = await response.json();
            console.log("Dados da resposta da API de token:", data);

            if (!data.accessToken) {
                throw new Error('Token de acesso não encontrado na resposta da API');
            }

            return data.accessToken; // Retorna o token de acesso
        } catch (error) {
            console.error('Erro ao obter o token de acesso:', error);
            setError(`Erro ao obter o token: ${error.message}`);
            return null;
        }
    };

    // Função para buscar os pedidos
    const fetchOrders = async () => {
        try {
            const accessToken = await getAccessToken();

            if (!accessToken) {
                throw new Error('Token de acesso não disponível');
            }

            // Define as datas de atualização
            const initialUpdatedAt = '2025-10-01T00:00:00Z'; // Exemplo de data inicial
            const finalUpdatedAt = '2025-10-01T06:00:00Z'; // Exemplo de data final

            const response = await fetch(
                `https://integration.plataformaserv.com.br/v1/orders?initialUpdatedAt=${initialUpdatedAt}&finalUpdatedAt=${finalUpdatedAt}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`Erro ao buscar os dados da API: ${response.statusText}`);
            }

            const data = await response.json();
            console.log("Dados da API de pedidos:", data);
            setOrders(data);
        } catch (err) {
            console.error("Erro ao buscar pedidos:", err);
            setError(`Erro ao buscar pedidos: ${err.message}`);
        }
    };

    // useEffect para chamar fetchOrders quando o componente é montado
    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div>
            <h1>Pedidos</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {orders.map((order) => (
                    <li key={order.id}>{order.id} - {order.status}</li>
                ))}
            </ul>
        </div>
    );
}