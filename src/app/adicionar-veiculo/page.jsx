"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/Input/content";
import Button from "@/components/Button/content";
import BackButton from "@/components/BackButton/content";
import jwt from 'jsonwebtoken';

export default function AddVehicle() {
  const router = useRouter();
  const [placa, setPlaca] = useState("");
  const [apelido, setApelido] = useState("");

  const handleSubmit = async () => {
    if (!placa || !apelido) {
      alert("Por favor, preencha todos os campos!");
      return;
    }
  
    const token = localStorage.getItem('token'); 
 
    const decoded = jwt.decode(token);
    const usuario_id = decoded.id;
  
    try {
      const response = await fetch("/api/veiculos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          placa,
          apelido,
          usuario_id,
        }),
      });
  
      if (response.ok) {
        router.push("/veiculos");
        setPlaca("");
        setApelido("");
      } else {
        const errorData = await response.json();
        alert(`Erro: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      alert("Erro ao adicionar veículo.");
    }
  };
  

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4 sm:px-0">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md text-center">
        <div className="flex items-baseline justify-center mb-6">
          <BackButton href="/veiculos" />
          <h1 className="text-3xl font-bold text-white ml-4">
            Adicionar Veículo
          </h1>
        </div>

        <div className="space-y-4">
          <Input
            placeholder="Placa do Veículo"
            value={placa}
            onChange={(e) => setPlaca(e.target.value)}
          />
          <Input
            placeholder="Apelido do Veículo"
            value={apelido}
            onChange={(e) => setApelido(e.target.value)}
          />
          <Button
            id="confirm-button"
            label="Confirmar"
            color="bg-green-600"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
