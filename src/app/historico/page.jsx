'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/Button/content';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { jsPDF } from 'jspdf';

export default function HistoricoPage() {
    const [historicoData, setHistoricoData] = useState([]);
    const itemsPerPage = 3;
    const [currentPage, setCurrentPage] = useState(1);

    // Função para fazer a requisição GET ao backend
    useEffect(() => {
        const fetchHistoricoData = async () => {
            try {
                const response = await fetch('/api/historico'); // A URL do endpoint da API
                if (response.ok) {
                    const data = await response.json();
                    setHistoricoData(data);
                } else {
                    console.error('Erro ao buscar os dados do histórico');
                }
            } catch (error) {
                console.error('Erro ao conectar com a API:', error);
            }
        };

        fetchHistoricoData();
    }, []);

    const totalPages = Math.ceil(historicoData.length / itemsPerPage);

    const handlePrevious = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = historicoData.slice(startIndex, startIndex + itemsPerPage);

    // Função para formatar o período (tempo)
    const formatPeriodo = (tempo) => {
        const [hours, minutes, seconds] = tempo.split(':');
        if (parseInt(hours) > 0) {
            return `${parseInt(hours)} Hora${parseInt(hours) > 1 ? 's' : ''}`;
        } else if (parseInt(minutes) > 0) {
            return `${parseInt(minutes)} Minuto${parseInt(minutes) > 1 ? 's' : ''}`;
        } else if (parseInt(seconds) > 0) {
            return `${parseInt(seconds)} Segundo${parseInt(seconds) > 1 ? 's' : ''}`;
        }
        return 'Menos de 1 Minuto';
    };

    // Função para formatar a data
    const formatData = (data) => {
        const date = new Date(data);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    // Função para formatar o valor como moeda
    const formatValor = (valor) => {
        const numericValue = parseFloat(valor);
        if (isNaN(numericValue)) return 'R$ 0,00';
        return `R$ ${numericValue.toFixed(2).replace('.', ',')}`;
    };

    // Função para gerar o PDF
    const generatePDF = () => {
        const doc = new jsPDF();
        doc.setFont('Arial', 'normal');
        doc.setFontSize(12);

        // Adicionar título
        doc.text('Histórico de Registro', 10, 10);

        // Adicionar dados
        let yOffset = 20;
        currentItems.forEach((item, index) => {
            doc.text(`N° Vaga: ${item.vaga}`, 10, yOffset);
            yOffset += 10;
            doc.text(`Apelido: ${item.apelido}`, 10, yOffset);
            yOffset += 10;
            doc.text(`Período: ${formatPeriodo(item.periodo)}`, 10, yOffset);
            yOffset += 10;
            doc.text(`Endereço: ${item.rua}, ${item.endereco_numero}`, 10, yOffset);
            yOffset += 10;
            doc.text(`Valor Total: ${formatValor(item.valor)}`, 10, yOffset);
            yOffset += 10;
            doc.text(`Data: ${formatData(item.data)}`, 10, yOffset);
            yOffset += 20;
        });

        // Gerar o PDF
        doc.save('historico.pdf');
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
            <div className="w-full max-w-full bg-gray-800 shadow-lg rounded-lg p-4 sm:p-6">
                <div className="flex items-baseline justify-center mb-4 sm:mb-6">
                    <h1 className="text-xl sm:text-2xl font-bold text-white">Histórico</h1>
                    <button
                        className="p-2 rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300"
                        onClick={generatePDF}
                    >
                        <FontAwesomeIcon icon={faFileAlt} color="white" />
                    </button>
                </div>

                {/* Contêiner rolável para a tabela */}
                <div className="overflow-x-auto">
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
                                    <td className="p-2 text-gray-700">{formatPeriodo(item.periodo)}</td>
                                    <td className="p-2 text-gray-700">{item.rua}, {item.endereco_numero}</td>
                                    <td className="p-2 text-gray-700">{formatValor(item.valor)}</td>
                                    <td className="p-2 text-gray-700">{formatData(item.data)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-between mt-4 sm:mt-6 flex-wrap gap-4 sm:gap-6">
                    <Button color="bg-green-600" label="Anterior" onClick={handlePrevious} />
                    <Button color="bg-green-600" label="Próximo" onClick={handleNext} />
                </div>

                <p className="text-center mt-4 text-gray-200">
                    Página {currentPage} de {totalPages}
                </p>
            </div>
        </div>
    );
}
