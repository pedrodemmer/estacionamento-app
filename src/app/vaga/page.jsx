"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Button from "@/components/Button/content";

export default function Vaga() {
  const searchParams = useSearchParams();
  const numero = searchParams.get("numero");  // Pega o número da vaga da query string
  const [vagaData, setVagaData] = useState(null);
  const [preco, setPreco] = useState("R$ 5,00");
  const [valoresId, setValoresId] = useState(1); // Exemplo de ID para o valor

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

  // Função para mudar o tempo e ajustar o preço
  const handleTempoChange = (e) => {
    const valor = e.target.value;
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

  // Função para salvar o registro na API
  const salvarRegistro = async () => {
    const data = {
      veiculo_id: 1,  // ID do veículo, por exemplo
      vaga_id: vagaData?.id,  // ID da vaga
      valores_id: valoresId,  // ID do valor selecionado
      data: new Date().toISOString(),  // Data e hora atual
    };

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
        console.log(result); // Exibe o registro salvo
      } else {
        alert("Erro ao salvar o registro.");
      }
    } catch (err) {
      console.error("Erro ao salvar registro:", err);
      alert("Erro ao salvar o registro.");
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
              <td className="p-3 text-gray-700">{vagaData?.numero || "Não especificado"}</td>
            </tr>
            <tr className="border-t">
              <td className="p-3 text-gray-700 font-medium">Selecione o Tempo</td>
              <td className="p-3">
                <select
                  value="30m"
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
              <td className="p-3 text-gray-700">{vagaData?.endereco || "Não especificado"}</td>
            </tr>
            <tr className="border-t">
              <td className="p-3 text-gray-700 font-medium">Preço</td>
              <td className="p-3 text-gray-700">{preco}</td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-center mt-6">
          <Button
            label="Confirmar"
            color="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow-md"
            onClick={salvarRegistro} // Chama a função para salvar o registro ao clicar no botão
          />
        </div>
      </div>
    </div>
  );
}



// "use client";
// import { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";

// export default function Vaga() {
//   const searchParams = useSearchParams();
//   const numero = searchParams.get("numero"); // Pega o número da vaga da query string
//   const [vagaData, setVagaData] = useState(null);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (numero) {
//       Busca os dados da vaga ao carregar a página
//       const fetchData = async () => {
//         try {
//           const response = await fetch(`/api/vaga/${numero}`);
//           if (response.ok) {
//             const data = await response.json();
//             setVagaData(data);
//           } else {
//             setError("Vaga não encontrada.");
//           }
//         } catch (err) {
//           console.error(err);
//           setError("Erro ao buscar os dados da vaga.");
//         }
//       };

//       fetchData();
//     }
//   }, [numero]);

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-100">
//       <div className="p-6 bg-gray-800 text-white rounded-lg">
//         <h1 className="text-2xl mb-4">Detalhes da Vaga</h1>
//         {error && <p className="text-red-500">{error}</p>}
//         {vagaData ? (
//           <div>
//             <p><strong>Número:</strong> {vagaData.numero}</p>
//             <p><strong>Endereço:</strong> {vagaData.endereco}</p>
//             <p><strong>Status:</strong> {vagaData.status ? "Disponível" : "Ocupada"}</p>
//           </div>
//         ) : (
//           !error && <p>Carregando...</p>
//         )}
//       </div>
//     </div>
//   );
// }
