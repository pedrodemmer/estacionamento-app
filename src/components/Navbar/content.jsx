import Button from '@/components/Button/content';

export default function Navbar() {
    return (
        <header className="flex justify-between items-center bg-gray-800 text-white w-full h-auto p-4">
            <div className="text-2xl font-bold">Logo</div> {/* Logo */}

            <nav className="flex space-x-4">
                <Button label="Histórico" />
                <Button label="Adicionar Veículo" />
                <Button label="Meus Veículos" />
                <Button label="Login" />
                <Button label="Registro" />
            </nav>
        </header>
    );
}
