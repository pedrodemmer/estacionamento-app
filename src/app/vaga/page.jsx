"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Button from "@/components/Button/content";

export default function Vaga() {
  const searchParams = useSearchParams();
  const numero = searchParams.get("numero"); // Pega o número da vaga da query string
  const [vagaData, setVagaData] = useState(null);
  const [preco, setPreco] = useState("R$ 5,00");
  const [valoresId, setValoresId] = useState(1); // ID do valor padrão
  const [loading, setLoading] = useState(false);

  // Busca os dados da vaga assim que o componente é montado
  useEffect(() => {
    if (numero) {
      const fetchData = async () => {
        try {
          const response = await fetch(`/api/vaga/${numero}`);
          if (response.ok) {
            const data = await response.json();
            setVagaData(data);
          } else {
            console.error("Vaga não encontrada.");
          }
        } catch (err) {
          console.error("Erro ao buscar os dados da vaga:", err);
        }
      };
      fetchData();
    }
  }, [numero]);

  // Atualiza o preço conforme o tempo selecionado
  const handleTempoChange = (e) => {
    const valor = e.target.value;
    switch (valor) {
      case "30m":
        setPreco("R$ 5,00");
        setValoresId(1); // ID correspondente no banco de dados
        break;
      case "1h":
        setPreco("R$ 10,00");
        setValoresId(2);
        break;
      case "2h":
        setPreco("R$ 18,00");
        setValoresId(3);
        break;
      case "4h":
        setPreco("R$ 35,00");
        setValoresId(4);
        break;
      default:
        setPreco("R$ 0,00");
    }
  };

  // Salva o registro no banco de dados
  const salvarRegistro = async () => {
    if (!vagaData?.id) {
      alert("Os dados da vaga ainda não foram carregados.");
      return;
    }

    const data = {
      veiculo_id: 1, // Substituir pelo ID do veículo correto
      vaga_id: vagaData.id,
      valores_id: valoresId,
      data: new Date().toISOString(),
    };

    setLoading(true);
    try {
      const response = await fetch("/api/salvar-registro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        alert("Registro salvo com sucesso!");
        console.log("Registro salvo:", result);
      } else {
        alert("Erro ao salvar o registro.");
      }
    } catch (err) {
      console.error("Erro ao salvar registro:", err);
      alert("Erro ao salvar o registro.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="w-full max-w-2xl bg-gray-800 shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-white text-center mb-6">Detalhes da Vaga</h1>
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
              <td className="p-3 text-gray-700">{vagaData?.numero || "Carregando..."}</td>
            </tr>
            <tr className="border-t">
              <td className="p-3 text-gray-700 font-medium">Selecione o Tempo</td>
              <td className="p-3">
                <select
                  defaultValue="30m"
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
              <td className="p-3 text-gray-700">{vagaData?.endereco || "Carregando..."}</td>
            </tr>
            <tr className="border-t">
              <td className="p-3 text-gray-700 font-medium">Preço</td>
              <td className="p-3 text-gray-700">{preco}</td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-center mt-6">
          <Button
            label={loading ? "Salvando..." : "Confirmar"}
            color="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow-md"
            onClick={salvarRegistro}
            disabled={loading}
          />
        </div>
      </div>
    </div>
  );
}
