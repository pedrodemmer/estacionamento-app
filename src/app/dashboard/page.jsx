"use client";

import Chart from "@/components/Chart/content";
import Card from "@/components/Card/content";

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

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4 sm:px-0">
      <div className="w-full max-w-5xl bg-gray-800 p-6 rounded-lg shadow-lg text-white">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        {/* Cards Resumo */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
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
          <Card
            title="Bairros Mais Estacionados"
            value={`${dataFicticia.bairros[0].nome}`}
            comparison={`Total: ${dataFicticia.bairros.reduce(
              (acc, b) => acc + b.quantidade,
              0
            )}`}
          />
        </div>

        {/* Gráficos */}
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
