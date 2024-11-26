'use client';

import { useState } from 'react';
import Button from '@/components/Button/content';

export default function HistoricoPage() {
    const historicoData = [
        { vaga: "1318", periodo: "1 hora", endereco: "Rua Abobrinha, 455", valor: "R$ 6,80", data: "22/10/2024", apelido: "Fiat" },
        { vaga: "1318", periodo: "3 horas", endereco: "Rua Abobrinha, 455", valor: "R$ 20,40", data: "16/08/2024", apelido: "Uno" },
        { vaga: "1318", periodo: "4 horas", endereco: "Rua Abobrinha, 455", valor: "R$ 27,20", data: "02/07/2024", apelido: "Landrover" },
        { vaga: "1319", periodo: "2 horas", endereco: "Rua Laranja, 100", valor: "R$ 10,00", data: "30/06/2024", apelido: "Fusquinha" },
        { vaga: "1320", periodo: "5 horas", endereco: "Rua Maçã, 200", valor: "R$ 35,00", data: "01/06/2024", apelido: "Civicão" },
        { vaga: "1321", periodo: "1 hora", endereco: "Rua Melancia, 300", valor: "R$ 8,00", data: "15/05/2024", apelido: "Kwid" },
        { vaga: "1322", periodo: "3 horas", endereco: "Rua Uva, 400", valor: "R$ 25,00", data: "10/05/2024", apelido: "Golzinho" },
        { vaga: "1323", periodo: "4 horas", endereco: "Rua Abacaxi, 500", valor: "R$ 30,00", data: "05/05/2024", apelido: "Santana" },
        { vaga: "1324", periodo: "6 horas", endereco: "Rua Manga, 600", valor: "R$ 40,00", data: "01/05/2024", apelido: "Corcel" },
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
        <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
            <div className="w-full max-w-4xl bg-gray-800 shadow-lg rounded-lg p-6 overflow-x-auto">
                <div className="flex items-baseline justify-center mb-6">
                    <h1 className="text-2xl font-bold text-white">Histórico</h1>
                </div>
                <table className="table-auto bg-white w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-2 text-left text-gray-700">N° Vaga</th>
                            <th className="p-2 text-left text-gray-700">Apelido</th>
                            <th className="p-2 text-left text-gray-700">Período</th>
                            <th className="p-2 text-left text-gray-700">Endereço</th>
                            <th className="p-2 text-left text-gray-700">Valor Total</th>
                            <th className="p-2 text-left text-gray-700">Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((item, index) => (
                            <tr key={index} className="border-t">
                                <td className="p-2 text-gray-700">{item.vaga}</td>
                                <td className="p-2 text-gray-700">{item.apelido}</td>
                                <td className="p-2 text-gray-700">{item.periodo}</td>
                                <td className="p-2 text-gray-700">{item.endereco}</td>
                                <td className="p-2 text-gray-700">{item.valor}</td>
                                <td className="p-2 text-gray-700">{item.data}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-between mt-6 flex-wrap gap-4 sm:gap-6">
                    <Button label="Anterior" onClick={handlePrevious} />
                    <Button label="Próximo" onClick={handleNext} />
                </div>
                <p className="text-center mt-4 text-gray-200">
                    Página {currentPage} de {totalPages}
                </p>
            </div>
        </div>
    );
}
