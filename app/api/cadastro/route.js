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
        if (userExistence) {
            return NextResponse.json({ error: "Email já cadastrado" }, { status: 400 });
        }

        // Cria um novo usuário
        const hashedPassword = await bcrypt.hash(senha, 10);
        const newUser = new User({ email, senha: hashedPassword });
        await newUser.save();

        return NextResponse.json({ message: "Conta criada com sucesso!" }, { status: 201 });
    } catch (err) {
        return NextResponse.json({ error: "Erro no servidor" }, { status: 500 });
    }
}