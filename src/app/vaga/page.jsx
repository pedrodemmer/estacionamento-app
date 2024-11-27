'use client'
import Popup from "@/components/Popup/content";
import { useState } from "react";
import Button from "@/components/Button/content";

export default function Vaga() {
  const [tempo, setTempo] = useState("30m");
  const [preco, setPreco] = useState("R$ 5,00");

  const handleTempoChange = (e) => {
    const valor = e.target.value;
    setTempo(valor);

    switch (valor) {
      case "30m":
        setPreco("R$ 5,00");
        break;
      case "1h":
        setPreco("R$ 10,00");
        break;
      case "2h":
        setPreco("R$ 18,00");
        break;
      case "4h":
        setPreco("R$ 35,00");
        break;
      default:
        setPreco("R$ 0,00");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="w-full max-w-2xl bg-gray-800 shadow-lg rounded-lg p-6">
        <div className="flex items-baseline justify-center mb-6">
          <h1 className="text-3xl font-bold text-white">Detalhes da Vaga</h1>
        </div>
        <table className="table-auto bg-white w-full border-collapse rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left text-gray-700">Informação</th>
              <th className="p-3 text-left text-gray-700">Detalhes</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="p-3 text-gray-700 font-medium">Número da Vaga</td>
              <td className="p-3 text-gray-700">12</td>
            </tr>
            <tr className="border-t">
              <td className="p-3 text-gray-700 font-medium">Selecione o Tempo</td>
              <td className="p-3">
                <select
                  value={tempo}
                  onChange={handleTempoChange}
                  className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-green-500 focus:outline-none"
                >
                  <option value="30m">30 minutos</option>
                  <option value="1h">1 hora</option>
                  <option value="2h">2 horas</option>
                  <option value="4h">4 horas</option>
                </select>
              </td>
            </tr>
            <tr className="border-t">
              <td className="p-3 text-gray-700 font-medium">Endereço</td>
              <td className="p-3 text-gray-700">Rua Abobrinha, 455</td>
            </tr>
            <tr className="border-t">
              <td className="p-3 text-gray-700 font-medium">Preço</td>
              <td className="p-3 text-gray-700">{preco}</td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-center mt-6">
          <Button
            onClick={"#"}
            label="Confirmar"
            color="bg-green-600"
          />
        </div>
      </div>
    </div>
  );
}