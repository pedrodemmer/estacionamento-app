"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Para redirecionar o usuário
import Popup from "@/components/Popup/content"; // Mantive o Popup, caso você deseje usá-lo
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter(); // Hook para redirecionamento

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Requisição para a API de login
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      if (res.ok) {
        const data = await res.json();

        // Opcional: salvar o token no localStorage
        localStorage.setItem("token", data.token);

        // Redireciona o usuário para a página inicial
        router.push("/");
      } else {
        // Trata erros de login (e.g., credenciais inválidas)
        const { error } = await res.json();
        setError(error || "Erro ao fazer login. Tente novamente.");
      }
    } catch (err) {
      // Trata erros de rede ou inesperados
      setError("Erro ao conectar ao servidor. Tente novamente mais tarde.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl transform transition-all duration-300 hover:scale-105">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-4">
          Acesse sua conta
        </h2>
        <p className="text-lg text-center text-gray-600 mb-6">
          Preencha os campos abaixo para entrar
        </p>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
          <button
            type="submit"
            className="w-full p-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
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

export default LoginPage;
