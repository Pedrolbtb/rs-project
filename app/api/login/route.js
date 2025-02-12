import connectDB from '@/lib/db';
import User from '@/models/user';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        await connectDB();

        const { email, senha } = await request.json();

        // Verifica se o usuário existe
        const userExistence = await User.findOne({ email });
        if (!userExistence) {
            return NextResponse.json({ error: "Usuário não existe" }, { status: 404 });
        }

        // Verifica se a senha está correta
        const checkPassword = await bcrypt.compare(senha, userExistence.senha);
        if (!checkPassword) {
            return NextResponse.json({ error: "Senha incorreta" }, { status: 401 });
        }

        // Retorna sucesso e o ID do usuário
        return NextResponse.json({ 
            success: true, 
            message: "Login feito com sucesso", 
            _id: userExistence._id.toString() 
        }, { status: 200 });

    } catch (err) {
        console.error("Erro no servidor:", err);
        return NextResponse.json({ error: "Erro no servidor" }, { status: 500 });
    }
}
