"use client";

import Chart from "@/components/Chart/content";
import Card from "@/components/Card/content";
import BackButton from "@/components/BackButton/content";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const dataFicticia = {
    gastos: {
      atual: 1200,
      anterior: 950,
    },
    bairros: [
      { nome: "Centro", quantidade: 15 },
      { nome: "Jardins", quantidade: 10 },
      { nome: "Mooca", quantidade: 8 },
    ],
    tempoEstacionado: {
      atual: 130,
      anterior: 110,
    },
  };

  const labels = ["Mês 1", "Mês 2", "Mês 3"];
  const valoresGastos = [450, 400, 350];
  const valoresTempo = [40, 45, 50];

  const dataPie = {
    labels: dataFicticia.bairros.map((b) => b.nome),
    datasets: [
      {
        data: dataFicticia.bairros.map((b) => b.quantidade),
        backgroundColor: ["#4A90E2", "#50E3C2", "#F5A623"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen pt-16 sm:pt-20 bg-gray-100 px-4 sm:px-8">
      <div className="w-full max-w-5xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg text-white">
        <div className="flex items-baseline justify-center mb-6">
          <BackButton href="/historico" />
          <h1 className="text-3xl font-bold text-white ml-4">Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <Card
              title="Gastos (R$)"
              value={`R$ ${dataFicticia.gastos.atual}`}
              comparison={`Anterior: R$ ${dataFicticia.gastos.anterior}`}
            />
           <Card
              title="Tempo Estacionado (h)"
              value={`${dataFicticia.tempoEstacionado.atual}h`}
              comparison={`Anterior: ${dataFicticia.tempoEstacionado.anterior}h`}
            />
          <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
            <h2 className="text-lg text-black font-semibold mb-4 text-center">
              Bairros Mais Estacionados
            </h2>
            <Pie data={dataPie} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <Chart
            title="Gastos nos Últimos Meses"
            data={valoresGastos}
            labels={labels}
          />
          <Chart
            title="Tempo Estacionado nos Últimos Meses"
            data={valoresTempo}
            labels={labels}
          />
        </div>
      </div>
    </div>
  );
}
