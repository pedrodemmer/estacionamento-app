"use client"

import { useState } from "react";
import Popup from "@/components/Popup/content";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const CadastroPage = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Email cadastrado:", email);
    };
  
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white p-10 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold mb-2">Acesse sua conta</h2>
          <p className="text-lg mb-4">Digite seu Email e Senha abaixo para entrar</p>
  
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full p-3 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition duration-300"
            >
              Entrar
            </button>
          </form>
  
          <div className="flex items-center justify-center my-4">
            <span className="text-gray-500">OU CONTINUE COM</span>
          </div>
          <button
            className="w-full p-3 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-700 transition duration-300"
          >
            <FontAwesomeIcon icon={faGithub} className="mr-2" />
            GitHub
          </button>
  
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Não tem uma conta?{" "}
              <a
                href="/cadastro"
                className="text-blue-500 hover:underline font-medium"
              >
                Registre-se
              </a>
            </p>
          </div>
  
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>
              Ao clicar em continuar, você concorda com nossos{" "}
              <a href="#" className="text-blue-500 hover:underline">
                Termos de Serviço
              </a>{" "}
              e{" "}
              <a href="#" className="text-blue-500 hover:underline">
                Politica de Privacidade
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  export default CadastroPage;