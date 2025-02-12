"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from 'axios';

export default function OrdersComponent() {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const [tokenData, setTokenData] = useState(null);
    const params = useParams();

    // const getAccessToken = async () => {
    //     try {
    //         const response = await axios.post('/api/getToken');
    //         const data = response.data;
    //         console.log('error', data)
    //         const tokenInfo = {
    //             accessToken: data.accessToken,
    //             tokenType: data.tokenType || 'Bearer',
    //             expiresIn: data.expiresIn
    //         };
    //         setTokenData(tokenInfo);
    //         return tokenInfo;

    //     } catch (error) {
    //         setError(`Erro na autenticação: ${error.message}`);
    //         return null;
    //     }
    // };

    const fetchOrders = async () => {
        try {
            // const tokenInfo = await getAccessToken();
            // console.log(tokenInfo)
            
            // if (!tokenInfo?.accessToken) {
            //     throw new Error('Autenticação falhou: Token não disponível');
            // }

            const initialUpdatedAt = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
            const finalUpdatedAt = new Date().toISOString();

            const response = await fetch(
                `/api/orders?initialUpdatedAt=${initialUpdatedAt}&finalUpdatedAt=${finalUpdatedAt}`
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Erro ao buscar pedidos');
            }

            const data = await response.json();
            setOrders(data);

        } catch (err) {
            setError(`Erro ao buscar pedidos: ${err.message}`);
        }
    };

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