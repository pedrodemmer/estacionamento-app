'use client';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHistory, faCar, faCarSide, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { usePathname } from 'next/navigation'; // Importando o hook usePathname

export default function Navbar() {
  const pathname = usePathname(); // Obtendo a URL atual

  // Condicional para verificar se estamos na página de login ou cadastro
  if (pathname === '/login' || pathname === '/cadastro') {
    return null; // Não renderiza a Navbar nessas páginas
  }

  return (
    <div>
      {/* Navbar versão desktop */}
      <header className="bg-gray-800 text-white w-full h-auto p-4 relative sm:block hidden">
        <div className="flex justify-between items-center">
          <a href="http://localhost:3000">
            <div className="text-2xl font-bold">Logo</div>
          </a>

          {/* Menu de navegação para Desktop */}
          <nav className="flex space-x-4 items-center">
            <Link
              href="/historico"
              className="flex items-center space-x-2 text-white hover:text-gray-300"
            >
              <FontAwesomeIcon icon={faHistory} />
              <span>Histórico</span>
            </Link>
            <Link
              href="/veiculos"
              className="flex items-center space-x-2 text-white hover:text-gray-300"
            >
              <FontAwesomeIcon icon={faCarSide} />
              <span>Meus Veículos</span>
            </Link>
            <Link
              href="/login"
              className="flex items-center space-x-2 text-white hover:text-gray-300"
            >
              <FontAwesomeIcon icon={faSignInAlt} />
              <span>Sair</span>
            </Link>
          </nav>
        </div>
      </header>

      {/* Navbar versão mobile */}
      <nav className="sm:hidden fixed bottom-0 left-0 w-full bg-gray-800 text-white flex justify-around py-3 shadow-lg z-50">
        <Link
          href="/historico"
          className="flex flex-col items-center space-y-1 text-white hover:text-gray-300"
        >
          <FontAwesomeIcon icon={faHistory} className="w-6 h-6" />
          <span className="text-xs">Histórico</span>
        </Link>
        <Link
          href="/adicionar-veiculo"
          className="flex flex-col items-center space-y-1 text-white hover:text-gray-300"
        >
          <FontAwesomeIcon icon={faCar} className="w-6 h-6" />
          <span className="text-xs">Adicionar</span>
        </Link>
        <Link
          href="/veiculos"
          className="flex flex-col items-center space-y-1 text-white hover:text-gray-300"
        >
          <FontAwesomeIcon icon={faCarSide} className="w-6 h-6" />
          <span className="text-xs">Veículos</span>
        </Link>
        <Link
          href="/sair"
          className="flex flex-col items-center space-y-1 text-white hover:text-gray-300"
        >
          <FontAwesomeIcon icon={faSignInAlt} className="w-6 h-6" />
          <span className="text-xs">Sair</span>
        </Link>
      </nav>
    </div>
  );
}
