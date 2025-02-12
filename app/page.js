"use client";  
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import PoligonalElements from "./components/poligonalElements";
import "./styles/style.css";
import { useRouter } from 'next/navigation';  // Use a nova API de navegação
import axios from 'axios';

export default function Home() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [status, setStatus] = useState("");
    const router = useRouter();  // Hook do novo sistema de navegação

    
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('/api/login', { email, senha });
        router.push('/dashboard');
    } catch (error) {
        console.error("Erro na requisição:", error);
        setStatus("Erro ao criar conta, tente novamente.");
    }
  };


  return (
    <section className="min-h-screen w-full bg-bgLogin flex justify-center items-center font-[Lato]">
      <PoligonalElements />
      <div>
        <div className="flex justify-center items-center h-full">
          <div>
            <h1 className="text-primary font-bold text-center text-[6rem]">Login</h1>
            <h2 className="text-supText font-bold text-center text-[2rem]">
              não tem conta ainda?
            </h2>
            <Link href="/cadastro">
              <p className="border-text text-transparent font-bold text-center text-[6rem]">
                Cadastre-se
              </p>
            </Link>
          </div>
          <div className="mb-60">
            <form onSubmit={handleSubmit}>
            <div className="bg-white w-[35rem] h-[20rem] border border-primary p-10 rounded-[40] shadow-2xl justify-center items-center ms-20">
              <div>
                <label htmlFor="email" className="font-bold text-[1.5rem] ms-3 text-supText">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full p-3 mb-4 border border-primary rounded-[50px] shadow-lg focus:outline-none 
                  focus:shadow-[0_0_10px_rgba(0,0,0,0.5)] duration-500 focus:border-[#7431C1] text-primary"
                  placeholder="Digite seu email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="senha" className="font-bold text-[1.5rem] ms-3 text-supText">
                  Senha
                </label>
                <input
                  id="senha"
                  type="password"
                  className="w-full p-3 mb-4 border border-primary rounded-[50px] shadow-lg
                  focus:outline-none focus:shadow-[0_0_10px_rgba(0,0,0,0.5)] duration-500 focus:border-[#7431C1] text-primary"
                  placeholder="Digite sua senha"
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-72 h-16 py-2 bg-primary text-white rounded-[50px] mt-10 m-auto 
              flex justify-center items-center text-center font-bold text-[2rem] 
              hover:w-80 hover:bg-[#7431C1] transition-all duration-500 shadow-lg "
              >
                Entrar
              </button>
            </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
