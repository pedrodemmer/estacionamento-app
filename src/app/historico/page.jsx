"use client"
import { useState } from 'react';
import Button from '@/components/Button/content';

export default function HistoricoPage() {
    const historicoData = [
        { vaga: "1318", periodo: "1 hora", endereco: "Rua Abobrinha, 455", valor: "R$ 6,80", data: "22/10/2024" },
        { vaga: "1318", periodo: "3 horas", endereco: "Rua Abobrinha, 455", valor: "R$ 20,40", data: "16/08/2024" },
        { vaga: "1318", periodo: "4 horas", endereco: "Rua Abobrinha, 455", valor: "R$ 27,20", data: "02/07/2024" },
        { vaga: "1319", periodo: "2 horas", endereco: "Rua Laranja, 100", valor: "R$ 10,00", data: "30/06/2024" },
        { vaga: "1320", periodo: "5 horas", endereco: "Rua Maçã, 200", valor: "R$ 35,00", data: "01/06/2024" },
        { vaga: "1321", periodo: "1 hora", endereco: "Rua Melancia, 300", valor: "R$ 8,00", data: "15/05/2024" },
        { vaga: "1322", periodo: "3 horas", endereco: "Rua Uva, 400", valor: "R$ 25,00", data: "10/05/2024" },
        { vaga: "1323", periodo: "4 horas", endereco: "Rua Abacaxi, 500", valor: "R$ 30,00", data: "05/05/2024" },
        { vaga: "1324", periodo: "6 horas", endereco: "Rua Manga, 600", valor: "R$ 40,00", data: "01/05/2024" },
    ];

    const itemsPerPage = 3;
    const totalPages = Math.ceil(historicoData.length / itemsPerPage);
    const [currentPage, setCurrentPage] = useState(1);

    const handlePrevious = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = historicoData.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-4xl">
                <h2 className="text-center text-xl font-bold text-white mb-4">&lt; Histórico</h2>
                <table className="w-full border-collapse border border-blue-700 text-sm text-left">
                    <thead>
                        <tr className="bg-blue-700 text-white sticky top-0">
                            <th className="px-4 py-2 border">N° Vaga</th>
                            <th className="px-4 py-2 border">Período</th>
                            <th className="px-4 py-2 border">Endereço</th>
                            <th className="px-4 py-2 border">Valor Total</th>
                            <th className="px-4 py-2 border">Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((item, index) => (
                            <tr key={index} className="odd:bg-blue-100 even:bg-white">
                                <td className="px-4 py-2 border">{item.vaga}</td>
                                <td className="px-4 py-2 border">{item.periodo}</td>
                                <td className="px-4 py-2 border">{item.endereco}</td>
                                <td className="px-4 py-2 border">{item.valor}</td>
                                <td className="px-4 py-2 border">{item.data}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-between mt-4">
                    <Button label="Anterior" onClick={handlePrevious} />
                    <Button label="Próximo" onClick={handleNext} />
                </div>
                <p className="text-center mt-2 text-white">Página {currentPage} de {totalPages}</p>
            </div>
        </div>
    );
}
