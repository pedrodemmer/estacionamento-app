// "use client";
 
// import { useState } from "react";
// import Link from "next/link";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
// import Popup from "@/components/Popup/content";
// import BackButton from "@/components/BackButton/content";
 
// export default function Veiculos() {
//   const [showPopup, setShowPopup] = useState(false);
//   const [selectedVehicle, setSelectedVehicle] = useState(null);
 
//   const vehicles = [
//     { id: 1, plate: "ABC-1234", nickname: "Carro 1" },
//     { id: 2, plate: "DEF-5678", nickname: "Carro 2" },
//     { id: 3, plate: "GHI-9012", nickname: "Carro 3" },
//   ];
 
//   const handleDelete = (id) => {
//     setSelectedVehicle(id);
//     setShowPopup(true);
//   };
 
//   const confirmDelete = () => {
//     console.log(`Veículo com ID ${selectedVehicle} excluído.`);
//     setShowPopup(false);
//   };
 
//   return (
//     <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
//       <div className="w-full max-w-4xl bg-gray-800 shadow-lg rounded-lg p-4 overflow-auto">
//         <div className="flex items-baseline justify-center mb-6">
//           <BackButton href="/" />
//           <h1 className="text-3xl font-bold text-white ml-4">
//             Meus Veículos
//           </h1>
//         </div>
//         <table className="table-auto bg-white w-full border-collapse">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="p-2 text-left text-gray-700">ID</th>
//               <th className="p-2 text-left text-gray-700">Placa</th>
//               <th className="p-2 text-left text-gray-700">Apelido</th>
//               <th className="p-2 text-center text-gray-700">Ações</th>
//             </tr>
//           </thead>
//           <tbody>
//             {vehicles.map((vehicle) => (
//               <tr key={vehicle.id} className="border-t">
//                 <td className="p-2 text-gray-700">{vehicle.id}</td>
//                 <td className="p-2 text-gray-700">{vehicle.plate}</td>
//                 <td className="p-2 text-gray-700">{vehicle.nickname}</td>
//                 <td className="p-2 text-center">
//                   <Link
//                     href={`/editar-veiculo?id=${vehicle.id}`}
//                     className="text-blue-500 hover:text-blue-700 mr-4"
//                   >
//                     <FontAwesomeIcon icon={faEdit} className="text-lg" />
//                   </Link>
//                   <button
//                     onClick={() => handleDelete(vehicle.id)}
//                     className="text-red-500 hover:text-red-700"
//                   >
//                     <FontAwesomeIcon icon={faTrashAlt} className="text-lg" />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       {showPopup && (
//         <Popup
//           message="Tem certeza que deseja excluir este veículo?"
//           onConfirm={confirmDelete}
//           onCancel={() => setShowPopup(false)}
//         />
//       )}
//     </div>
//   );
// }

// "use client";
// import { useRouter } from "next/navigation"; // Para navegação
// import { useState } from "react";
// import Input from "@/components/Input/content";

// export default function Home() {
//   const [number, setNumber] = useState("");
//   const router = useRouter();

//   const handleInputChange = (e) => {
//     setNumber(e.target.value);
//   };

//   const handleSearch = () => {
//     if (number.trim() !== "") {
//       router.push(`/vaga?numero=${number}`); // Redireciona com query string
//     }
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center">
//       <div className="p-4 bg-gray-800 rounded-lg text-white">
//         <h1 className="text-2xl mb-4">Buscar Vaga</h1>
//         <Input
//           type="text"
//           placeholder="Digite o número da vaga"
//           value={number}
//           onChange={handleInputChange}
//         />
//         <button
//           onClick={handleSearch}
//           className="mt-4 px-4 py-2 bg-green-600 rounded"
//         >
//           Buscar Vaga
//         </button>
//       </div>
//     </div>
//   );
// }
