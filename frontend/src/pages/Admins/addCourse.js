import Menu from "../components/Menu";

const courses = [
  { title: "Fundamentos de Front-end", hours: "30h" },
  { title: "Fundamentos da Ciência de dados", hours: "35h" },
  { title: "Introdução a Lógica de Programação", hours: "20h" },
  { title: "Fundamentos de Front-end", hours: "30h" },
  { title: "Fundamentos da Ciência de dados", hours: "35h" },
  { title: "Introdução a Lógica de Programação", hours: "20h" },
];

const CoursesList = () => {
  return (
    <div className="flex h-screen bg-[#1D2951] text-white">
      <Menu />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold">Lista de Cursos</h1>

        {/* Barra de Pesquisa e Filtros */}
        <div className="flex items-center space-x-4 mt-4">
          <input
            type="text"
            placeholder="Pesquisar curso"
            className="p-2 w-1/3 bg-blue-600 text-white rounded"
          />
          <button className="bg-gray-600 p-2 rounded flex items-center">
            Filtros <span className="ml-2">🔽</span>
          </button>
          <button className="bg-blue-400 p-2 rounded flex items-center">
            Criar Novo Curso <span className="ml-2">➕</span>
          </button>
        </div>

        {/* Grid de Cursos */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          {courses.map((course, index) => (
            <div key={index} className="bg-gray-900 p-4 rounded">
              <h2 className="text-lg font-semibold">{course.title}</h2>
              <p className="text-sm text-gray-400">Iniciado</p>
              <p className="text-sm">{course.hours}</p>
              <button className="text-blue-400 mt-2 flex items-center">
                Continuar <span className="ml-1">➡</span>
              </button>
            </div>
          ))}
        </div>

        {/* Ícones de Navegação */}
        <div className="flex justify-between mt-6">
          <button className="text-2xl">⬅</button>
          <button className="text-2xl">➡</button>
        </div>
      </div>
    </div>
  );
};

export default CoursesList;
