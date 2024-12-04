"use client";

import { useState } from "react";
import Popup from "@/components/Popup/content";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const RegistroPage = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [cpf, setCpf] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const validatePassword = () => {
    const senhaValida = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return senhaValida.test(senha) && senha === confirmarSenha;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword()) {
      setError(
        "As senhas devem ter pelo menos 8 caracteres e incluir um caractere especial, e ambas precisam ser iguais."
      );
      return;
    }

    setError("");

    try {
      const response = await fetch("/api/cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, email, senha, cpf }),
      });

      if (response.ok) {
        router.push("/login");
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Erro ao registrar o usuário.");
      }
    } catch (err) {
      console.error("Erro ao enviar os dados:", err);
      setError("Ocorreu um erro inesperado. Tente novamente mais tarde.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl transform transition-all duration-300 hover:scale-105">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-4">Crie sua conta</h2>
        <p className="text-lg text-center text-gray-600 mb-6">Preencha os campos abaixo para se registrar</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>

          <div>
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Confirmar Senha"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              required
              className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div>
            <input
              type="text"
              placeholder="CPF"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              required
              className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>

          <button
            type="submit"
            className="w-full p-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Registrar
          </button>
        </form>

        <div className="flex items-center justify-center my-6">
          <span className="text-gray-500">OU SE REGISTRE COM</span>
        </div>
        <button
          className="w-full p-4 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition duration-300"
        >
          <FontAwesomeIcon icon={faGithub} className="mr-2" />
          GitHub
        </button>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Já tem uma conta?{" "}
            <a
              href="/login"
              className="text-blue-500 hover:underline font-medium"
            >
              Faça login
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
              Política de Privacidade
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistroPage;
