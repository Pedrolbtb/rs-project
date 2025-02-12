import connectDB from '@/lib/db';
import User from '@/models/user';
import bcrypt from 'bcrypt';
import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        await connectDB();

        const { email, senha } = await request.json();

        // Verifica se o usuário já existe
        const userExistence = await User.findOne({ email });
        if (!userExistence) {
            return NextResponse.json({ error: "Usuário não existe" });
        }

        // Cria um novo usuário
        const checkPassword = await bcrypt.compare(senha, userExistence.senha);

        if (!checkPassword) {
            return NextResponse.json({ error: "Senha incorreta" }, { status: 404 });
        }

        return NextResponse.json({ message: "Login feito com sucesso" }, { status: 201 });
    } catch (err) {
        return NextResponse.json({ error: "Erro no servidor" }, { status: 500 });
    }
}