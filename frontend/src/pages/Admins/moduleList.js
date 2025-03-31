import { useState } from "react";
import { FaSearch, FaFilter, FaArrowRight, FaArrowLeft } from "react-icons/fa";

const modulos = [
  { id: 1, nome: "Álgebra Linear", horas: "10h" },
  { id: 2, nome: "Sql básico", horas: "10h" },
  { id: 3, nome: "Redação", horas: "10h" },
];

export default function ListaModulos() {
  const [busca, setBusca] = useState("");
  const [pagina, setPagina] = useState(1);

  const modulosFiltrados = modulos.filter((modulo) =>
    modulo.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="bg-[#1a1e33] text-white min-h-screen p-6">
      <h1 className="text-2xl font-semibold mb-4">Lista de Módulos</h1>

      <div className="flex items-center space-x-2 mb-6">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Pesquisar módulo"
            className="w-full p-2 pl-10 bg-blue-500 text-white rounded-md focus:outline-none"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-3 text-white" />
        </div>
        <button className="flex items-center bg-blue-700 p-2 rounded-md">
          <FaFilter className="mr-2" />
          Filtros
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {modulosFiltrados.map((modulo) => (
          <div key={modulo.id} className="bg-[#14172b] p-4 rounded-md">
            <h2 className="text-lg font-semibold">{modulo.nome}</h2>
            <p>{modulo.horas}</p>
            <a href="#" className="text-blue-400 flex items-center mt-2">
              Ver módulo <FaArrowRight className="ml-2" />
            </a>
          </div>
        ))}
      </div>

 
      <div className="flex justify-between mt-6">
        <button className="p-2 bg-gray-700 rounded-full">
          <FaArrowLeft />
        </button>
        <button className="p-2 bg-gray-700 rounded-full">
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
}
