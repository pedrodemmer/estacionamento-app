'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faFileAlt } from "@fortawesome/free-solid-svg-icons";
import Popup from "@/components/Popup/content";
import BackButton from "@/components/BackButton/content";
import Button from "@/components/Button/content";
import { jsPDF } from 'jspdf';
import jwt from 'jsonwebtoken';

function decodeJwtId(token) {
    const decoded = jwt.decode(token);
    return decoded.id;
}

export default function Veiculos() {
  const [vehicles, setVehicles] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const userToken = localStorage.getItem('token');
        const userId = decodeJwtId(userToken);

        const response = await fetch(`/api/veiculos?usuario_id=${userId}`);
        if (!response.ok) {
          throw new Error('Erro ao buscar veículos');
        }
        const data = await response.json();
        setVehicles(data);
      } catch (error) {
        console.error("Erro ao carregar veículos:", error.message);
        alert("Houve um erro ao carregar os veículos. Por favor, tente novamente mais tarde.");
      }
    };
        
    fetchVehicles();
  }, []);

  const handleDelete = (id) => {
    setSelectedVehicle(id);
    setShowPopup(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`/api/veiculos?id=${selectedVehicle}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao excluir veículo");
      }

      setVehicles((prevVehicles) =>
        prevVehicles.filter((vehicle) => vehicle.id !== selectedVehicle)
      );
      setShowPopup(false);
    } catch (error) {
      console.error("Erro ao excluir veículo:", error);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Lista de Veículos", 20, 20);

    doc.setFontSize(12);
    doc.text("ID", 20, 30);
    doc.text("Placa", 60, 30);
    doc.text("Apelido", 120, 30);

    let y = 40;
    vehicles.forEach(vehicle => {
      doc.text(vehicle.id.toString(), 20, y);
      doc.text(vehicle.placa, 60, y);
      doc.text(vehicle.apelido, 120, y);
      y += 10;
    });

    doc.save("veiculos.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="w-full max-w-4xl bg-gray-800 shadow-lg rounded-lg p-4 overflow-auto">
        <div className="flex items-baseline justify-center mb-6">
          <BackButton href="/" />
          <h1 className="text-3xl font-bold text-white ml-4">Meus Veículos</h1>
          <button
            className="p-2 rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300"
            onClick={generatePDF}
          >
            <FontAwesomeIcon icon={faFileAlt} color="white" />
          </button>
        </div>
        <table className="table-auto bg-white w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left text-gray-700">ID</th>
              <th className="p-2 text-left text-gray-700">Placa</th>
              <th className="p-2 text-left text-gray-700">Apelido</th>
              <th className="p-2 text-center text-gray-700">Ações</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle.id} className="border-t">
                <td className="p-2 text-gray-700">{vehicle.id}</td>
                <td className="p-2 text-gray-700">{vehicle.placa}</td>
                <td className="p-2 text-gray-700">{vehicle.apelido}</td>
                <td className="p-2 text-center">
                  <Link
                    href={`/editar-veiculo?id=${vehicle.id}`}
                    className="text-blue-500 hover:text-blue-700 mr-4"
                  >
                    <FontAwesomeIcon icon={faEdit} className="text-lg" />
                  </Link>
                  <button
                    onClick={() => handleDelete(vehicle.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FontAwesomeIcon icon={faTrashAlt} className="text-lg" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center mt-4">
          <Button
            id="add-vehicle-button"
            label="Adicionar Veículo"
            color="bg-green-600"
            href="/adicionar-veiculo"
          />
        </div>
      </div>
      {showPopup && (
        <Popup
          message="Tem certeza que deseja excluir este veículo?"
          onConfirm={confirmDelete}
          onCancel={() => setShowPopup(false)}
        />
      )}
    </div>
  );
}
