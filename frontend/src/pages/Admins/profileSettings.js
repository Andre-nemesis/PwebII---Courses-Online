import Menu from "../../components/Menu";

const ProfileSettings = () => {
  return (
    <div style={styles.container}>
      <Menu />
      <div style={styles.content}>
        <div style={styles.profileSection}>
          <div style={styles.profilePic}></div>
          <h2 style={styles.title}>Nome do usuário</h2>
          <button style={{ ...styles.btn, ...styles.green }}>7 Cursos Criados</button>
          <button style={{ ...styles.btn, ...styles.gray }}>Top 3 Cursos mais vistos</button>
        </div>
        <div style={styles.formSection}>
          <form>
            {[
              { label: "E-mail", icon: "📧" },
              { label: "Telefone", icon: "📞" },
              { label: "CPF", icon: "📄" },
              { label: "Cargo", icon: "🎯" },
              { label: "Senha", icon: "🔒" },
            ].map(({ label, icon }) => (
              <div key={label} style={styles.inputGroup}>
                <span style={styles.icon}>{icon}</span>
                <input
                  type={label === "Senha" ? "password" : "text"}
                  placeholder={label}
                  style={styles.input}
                />
              </div>
            ))}
            <button style={{ ...styles.btn, ...styles.save }}>Salvar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    backgroundColor: "#1d2951",
    color: "white",
  },
  content: {
    flex: 1,
    display: "flex",
    padding: "40px",
  },
  profileSection: {
    width: "30%",
    textAlign: "center",
  },
  profilePic: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    border: "2px solid white",
    margin: "0 auto",
  },
  title: {
    margin: "20px 0",
  },
  btn: {
    display: "block",
    width: "80%",
    padding: "10px",
    borderRadius: "5px",
    margin: "10px auto",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
  },
  green: {
    backgroundColor: "#4caf50",
    color: "white",
  },
  gray: {
    backgroundColor: "#ccc",
    color: "black",
  },
  formSection: {
    width: "70%",
    paddingLeft: "40px",
  },
  inputGroup: {
    display: "flex",
    alignItems: "center",
    background: "#ccc",
    padding: "10px",
    borderRadius: "5px",
    marginBottom: "15px",
  },
  icon: {
    marginRight: "10px",
    fontSize: "18px",
  },
  input: {
    flex: 1,
    border: "none",
    outline: "none",
    background: "none",
    fontSize: "16px",
  },
  save: {
    backgroundColor: "#8bc34a",
    color: "black",
    width: "100%",
    fontWeight: "bold",
  },
};

export default ProfileSettings;