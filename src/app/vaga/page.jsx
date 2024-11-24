import Button from '@/components/Button/content';

export default function vaga() {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
            <ul className="flex space-x-6 bg-white p-4 rounded-lg shadow-lg mb-4">
                <li className="text-lg font-semibold">N° Vaga</li>
                <li className="text-lg font-semibold">30 minutos</li>
                <li className="text-lg font-semibold">Rua Abobrinha, 455</li>
                <li className="text-lg font-semibold">R$ 00.00</li>
            </ul>

            <Button label="Confirmar" color="bg-green-600" />
        </div>
    );
}
