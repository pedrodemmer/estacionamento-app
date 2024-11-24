"use client";

import Input from "@/components/Input/content";
import Button from "@/components/Button/content";
import BackButton from "@/components/BackButton/content";

export default function AddVehicle() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4 sm:px-0">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md text-center">
        <div className="flex items-baseline justify-center mb-6">
          <BackButton href="/" />
          <h1 className="text-3xl font-bold text-white ml-4">Editar Veículo</h1>
        </div>

        <div className="space-y-4">
          <Input placeholder="Placa do Veículo" />
          <Input placeholder="Apelido do Veículo" />
          <div className="flex items-center justify-center mb-6 gap-4">
            <Button id="confirm-button" label="Confirmar" color="bg-green-600" />
            <Button id="cancel-button" label="Cancelar" color="bg-red-600" href="/" />
          </div>
        </div>
      </div>
    </div>
  );
}
