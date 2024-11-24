"use client"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHistory, faCar, faCarSide, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
    return (
        <div>

            <header className="bg-gray-800 text-white w-full h-auto p-4 relative sm:block hidden">
                {/* Versão Desktop - Logo e Menu */}
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <a href="http://localhost:3000"><div className="text-2xl font-bold">Logo</div></a>

                    {/* Menu de navegação para Desktop */}
                    <nav className="flex space-x-4 items-center">
                        <button className="flex items-center space-x-2 text-white">
                            <FontAwesomeIcon icon={faHistory} />
                            <span>Histórico</span>
                        </button>
                        <button className="flex items-center space-x-2 text-white">
                            <FontAwesomeIcon icon={faCar} />
                            <span>Adicionar Veículo</span>
                        </button>
                        <button className="flex items-center space-x-2 text-white">
                            <FontAwesomeIcon icon={faCarSide} />
                            <span>Meus Veículos</span>
                        </button>
                        <button className="flex items-center space-x-2 text-white">
                            <FontAwesomeIcon icon={faSignInAlt} />
                            <span>Sair</span>
                        </button>
                    </nav>
                </div>
            </header>

            <nav className="sm:hidden fixed bottom-0 left-0 w-full bg-gray-800 text-white flex justify-around py-3 shadow-lg z-50">
                <button className="flex flex-col items-center space-y-1 text-white focus:outline-none">
                    <FontAwesomeIcon icon={faHistory} className="w-6 h-6" />
                    <span className="text-xs">Histórico</span>
                </button>
                <button className="flex flex-col items-center space-y-1 text-white focus:outline-none">
                    <FontAwesomeIcon icon={faCar} className="w-6 h-6" />
                    <span className="text-xs">Adicionar</span>
                </button>
                <button className="flex flex-col items-center space-y-1 text-white focus:outline-none">
                    <FontAwesomeIcon icon={faCarSide} className="w-6 h-6" />
                    <span className="text-xs">Veículos</span>
                </button>
                <button className="flex flex-col items-center space-y-1 text-white focus:outline-none">
                    <FontAwesomeIcon icon={faSignInAlt} className="w-6 h-6" />
                    <span className="text-xs">Sair</span>
                </button>
            </nav>
        </div>
    );
}
