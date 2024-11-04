"use client"
import { useState } from 'react';
import Button from '@/components/Button/content';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="flex justify-between items-center bg-gray-800 text-white w-full h-auto p-4">
            <div className="text-2xl font-bold">Logo</div>

            <button 
                className="sm:hidden text-white focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                <svg 
                    className="w-6 h-6" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
                    />
                </svg>
            </button>

            <nav className={`flex-col sm:flex-row sm:flex space-x-4 items-center ${isOpen ? 'flex' : 'hidden'} sm:block`}>
                <Button label="Histórico" />
                <Button label="Adicionar Veículo" />
                <Button label="Meus Veículos" />
                <Button label="Login" />
                <Button label="Registro" />
            </nav>
        </header>
    );
}
