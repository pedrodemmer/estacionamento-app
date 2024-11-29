"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Input from "@/components/Input/content";
import Button from "@/components/Button/content";
import BackButton from "@/components/BackButton/content";

export default function EditVehicle() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const vehicleId = searchParams.get("id");

  const [placa, setPlaca] = useState("");
  const [apelido, setApelido] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Carregar os dados do veículo
  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await fetch(`/api/veiculos?id=${vehicleId}`);
        if (!response.ok) {
          throw new Error("Erro ao buscar veículo");
        }
        const data = await response.json();
        setPlaca(data.placa);
        setApelido(data.apelido);
      } catch (error) {
        console.error("Erro ao carregar veículo:", error);
      }
    };

    if (vehicleId) fetchVehicle();
  }, [vehicleId]);

  // Atualizar o veículo
  const handleUpdate = async () => {
    if (!placa || !apelido) {
      alert("Placa e Apelido são obrigatórios!");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`/api/veiculos?id=${vehicleId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ placa, apelido }),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar veículo");
      }
      alert("Veículo atualizado com sucesso!");
      router.push("/veiculos");
    } catch (error) {
      console.error("Erro ao atualizar veículo:", error);
      alert("Erro ao atualizar veículo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4 sm:px-0">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md text-center">
        <div className="flex items-baseline justify-center mb-6">
          <BackButton href="/veiculos" />
          <h1 className="text-3xl font-bold text-white ml-4">Editar Veículo</h1>
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
          <div className="flex items-center justify-center mb-6 gap-4">
            <Button
              id="confirm-button"
              label={isLoading ? "Salvando..." : "Confirmar"}
              color="bg-green-600"
              onClick={handleUpdate}
              disabled={isLoading}
            />
            <Button
              id="cancel-button"
              label="Cancelar"
              color="bg-red-600"
              href="/veiculos"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
