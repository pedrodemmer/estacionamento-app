"use client"
import { useState } from 'react';
import { Dropdown1 } from '@/components/Dropdown/content';

export default function Home() {
  const [number, setNumber] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setNumber(value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && number.trim() !== '') {
      setIsDropdownVisible(true);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-start bg-gray-100 pt-4 sm:pt-16">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center w-full max-w-md relative">
        <h1 className="text-3xl font-bold text-white mb-4">
          Apelido do Carro | Placa: XXX-126
        </h1>
        <p className="text-xl text-gray-300 mb-4">
          Estacionado no N° 48 | 00:00 Minutos Restantes
        </p>

        <div className="mb-6 relative">
          <label htmlFor="inputNumber" className="block text-gray-300 text-lg font-semibold mb-2">
            Digite um número:
          </label>
          <input
            type="number"
            id="inputNumber"
            value={number}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress} 
            className="px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
          />

          {/* Dropdown que aparece abaixo do input, centralizado */}
          {isDropdownVisible && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-full max-w-xs mt-2 z-10">
              <Dropdown1 />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
