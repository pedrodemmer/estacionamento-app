"use client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHistory,
  faHouse,
  faCarSide,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const hiddenPaths = ["/login", "/cadastro"];
  const shouldHideNavbar = hiddenPaths.includes(pathname);

  if (shouldHideNavbar) {
    return null;
  }

  return (
    <div>
      <header className="bg-gray-800 text-white w-full h-auto p-4 relative sm:block hidden">
        <div className="flex justify-between items-center">
          <a href="/">
            <div className="text-2xl font-bold">CityPark</div>
          </a>

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

      <nav className="sm:hidden fixed bottom-0 left-0 w-full bg-gray-800 text-white flex justify-around py-3 shadow-lg z-50">
        <Link
          href="/"
          className="flex flex-col items-center space-y-1 text-white hover:text-gray-300"
        >
          <FontAwesomeIcon icon={faHouse} className="w-6 h-6" />
          <span className="text-xs">Início</span>
        </Link>
        <Link
          href="/historico"
          className="flex flex-col items-center space-y-1 text-white hover:text-gray-300"
        >
          <FontAwesomeIcon icon={faHistory} className="w-6 h-6" />
          <span className="text-xs">Histórico</span>
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
