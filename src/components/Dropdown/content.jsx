"use client";

import { useState } from 'react';
import Button from '@/components/Button/content';

export function Dropdown1({ disponibilidade, endereco }) {
    return (
      <div className="absolute mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
        <div className="px-4 py-2 border-b border-gray-200">
          <p className="text-gray-700 font-medium">Disponibilidade:</p>
          <p className={disponibilidade === "Disponível" ? "text-green-600" : "text-red-600"}>
            {disponibilidade}
          </p>
        </div>
        <div className="px-4 py-2 border-b border-gray-200">
          <p className="text-gray-700 font-medium">Endereço:</p>
          <p>{endereco}</p>
        </div>
        <div className="px-4 py-2">
          <a href="/vaga">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600">
              Tarifas e Períodos
            </button>
          </a>
        </div>
      </div>
    );
  }
  

export function Dropdown2() {
    const [isOpen, setIsOpen] = useState(false);
    const meses = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    const toggleDropdown = () => {
        setIsOpen(!isOpen); 
    };

    return (
        <div className="relative inline-block text-left">
            <button 
                onClick={toggleDropdown} 
                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Selecione o Mês
            </button>
            {isOpen && ( 
                <div className="absolute mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-40 overflow-y-auto">
                    {meses.map((mes, index) => (
                        <button 
                            key={index} 
                            className="block w-full text-center px-4 py-2 text-gray-700 hover:bg-blue-100 focus:outline-none"
                            onClick={() => setIsOpen(false)} 
                        >
                            {mes}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
