import Menu from "../components/Menu";

const ProfileSettings = () => {
  return (
    <div className="flex h-screen bg-[#1D2951] text-white">
      <Menu />
      <div className="flex flex-1 p-8">
        <div className="w-1/3 flex flex-col items-center">
          <div className="w-32 h-32 rounded-full border-2 border-white"></div>
          <h2 className="mt-4 text-lg">Nome do usuário</h2>
          <button className="mt-4 bg-green-600 px-4 py-2 rounded">
            7 Cursos Criados
          </button>
          <button className="mt-2 bg-gray-300 text-black px-4 py-2 rounded">
            Top 3 Cursos mais vistos
          </button>
        </div>
        <div className="w-2/3 px-8">
          <form className="space-y-4">
            {[
              { label: "E-mail", icon: "📧" },
              { label: "Telefone", icon: "📞" },
              { label: "CPF", icon: "📄" },
              { label: "Cargo", icon: "🎯" },
              { label: "Senha", icon: "🔒" },
            ].map(({ label, icon }) => (
              <div key={label} className="flex items-center space-x-2">
                <span className="text-lg">{icon}</span>
                <input
                  type={label === "Senha" ? "password" : "text"}
                  placeholder={label}
                  className="w-full p-2 rounded bg-gray-300 text-black"
                />
              </div>
            ))}
            <button className="w-full bg-green-500 p-2 rounded text-black font-bold">
              Salvar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
