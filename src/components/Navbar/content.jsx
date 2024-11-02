import { Aside } from '@/components/Aside'

export default function Navbar() {
    return (
        <header>
            <div>
                <Aside />
                <ul>
                    <li>Histórico</li>
                    <li>Adicionar Veículo</li>
                    <li>Meus Veículos</li>
                    <li>Login</li>
                    <li>Registro</li>
                </ul>
            </div>
        </header>
    );
}