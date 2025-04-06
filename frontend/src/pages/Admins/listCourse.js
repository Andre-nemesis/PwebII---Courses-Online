import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import Menu from "../../components/Menu";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ListCourse() {
  const [busca, setBusca] = useState("");
  const [cursos, setCursos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [novoCurso, setNovoCurso] = useState({
    name: "",
    course_duration: "",
    num_hours: "",
    percent_complete: ""
  });

  const navigation = useNavigation();

  const fetchCursos = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const role = await AsyncStorage.getItem("role");
      setUserRole(role);
      const response = await axios.get("http://localhost:3001/cursos", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCursos(response.data);
    } catch (error) {
      console.error("Erro ao buscar cursos:", error.message);
    }
  };

  useEffect(() => {
    fetchCursos();
  }, []);

  const handleCriarCurso = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      await axios.post("http://localhost:3001/cursos", novoCurso, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setModalVisible(false);
      setNovoCurso({
        name: "",
        course_duration: "",
        num_hours: "",
        percent_complete: ""
      });
      fetchCursos();
    } catch (error) {
      console.error("Erro ao criar curso:", error.response?.data || error.message);
      Alert.alert("Erro", "Não foi possível criar o curso.");
    }
  };

  const renderCurso = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.titulo}>{item.name}</Text>
      <Text style={styles.subtitulo}>Iniciado</Text>
      <Text style={styles.horas}>{item.num_hours}h</Text>
      <TouchableOpacity style={styles.botao}>
        <Text style={styles.textoBotao}>Continuar</Text>
        <Icon name="arrow-right" size={16} color="#00BFFF" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Menu />
      <View style={styles.content}>
        <Text style={styles.tituloPagina}>Lista de Cursos</Text>

        <View style={styles.filtros}>
          <View style={styles.searchContainer}>
            <Icon name="search" size={16} color="#bbb" style={styles.iconSearch} />
            <TextInput
              style={styles.input}
              placeholder="Pesquisar curso"
              placeholderTextColor="#bbb"
              value={busca}
              onChangeText={setBusca}
            />
          </View>

          {userRole === 'admin' && (
            <TouchableOpacity style={styles.botaoCriar} onPress={() => setModalVisible(true)}>
              <Text style={styles.textoBotaoCriar}>Criar Novo Curso</Text>
              <Icon name="plus" size={16} color="#fff" />
            </TouchableOpacity>
          )}
        </View>

        <FlatList
          data={cursos.filter((curso) =>
            curso.name.toLowerCase().includes(busca.toLowerCase())
          )}
          renderItem={renderCurso}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          contentContainerStyle={styles.listaCursos}
        />

        <View style={styles.navButtons}>
          <TouchableOpacity>
            <Icon name="arrow-left" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="arrow-right" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitulo}>Novo Curso</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Nome do Curso"
              placeholderTextColor="#bbb"
              value={novoCurso.name}
              onChangeText={(text) => setNovoCurso({ ...novoCurso, name: text })}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Duração do Curso"
              placeholderTextColor="#bbb"
              value={novoCurso.course_duration}
              onChangeText={(text) => setNovoCurso({ ...novoCurso, course_duration: text })}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Horas"
              placeholderTextColor="#bbb"
              keyboardType="numeric"
              value={novoCurso.num_hours}
              onChangeText={(text) => setNovoCurso({ ...novoCurso, num_hours: text })}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="% Completo"
              placeholderTextColor="#bbb"
              keyboardType="numeric"
              value={novoCurso.percent_complete}
              onChangeText={(text) => setNovoCurso({ ...novoCurso, percent_complete: text })}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalBotaoCancelar} onPress={() => setModalVisible(false)}>
                <Text style={{ color: "#fff" }}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalBotaoSalvar} onPress={handleCriarCurso}>
                <Text style={{ color: "#fff" }}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );

}
const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: "row", backgroundColor: "#101D42" },
  content: { flex: 1, padding: 20 },
  tituloPagina: { fontSize: 22, fontWeight: "bold", color: "#fff", marginBottom: 15 },
  filtros: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E2A54",
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  iconSearch: { marginRight: 8 },
  input: { color: "#fff", flex: 1, height: 40 },
  botaoCriar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#00BFFF",
    padding: 10,
    borderRadius: 5,
  },
  textoBotaoCriar: { color: "#fff", fontWeight: "bold", marginRight: 5 },
  listaCursos: { justifyContent: "space-between" },
  card: {
    backgroundColor: "#162447",
    padding: 15,
    borderRadius: 10,
    margin: 5,
    width: "30%",
  },
  titulo: { fontSize: 16, fontWeight: "bold", color: "#fff" },
  subtitulo: { color: "#bbb", marginBottom: 5 },
  horas: { color: "#bbb", marginBottom: 10 },
  botao: { flexDirection: "row", alignItems: "center" },
  textoBotao: { color: "#00BFFF", marginRight: 5, fontWeight: "bold" },
  navButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "#e9f0fa",
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 15,
    color: "#000",
  },
  modalLabel: { marginTop: 10, fontWeight: "bold", color: "#000" },
  modalInput: {
    backgroundColor: "#1E2A54",
    borderRadius: 8,
    color: "#fff",
    padding: 10,
    marginTop: 5,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: "#FF3B30",
    padding: 10,
    borderRadius: 8,
    width: "48%",
    alignItems: "center",
  },
  saveButton: {
    backgroundColor: "#4CD0C9",
    padding: 10,
    borderRadius: 8,
    width: "48%",
    alignItems: "center",
  },
  cancelText: { color: "#fff", fontWeight: "bold" },
  saveText: { color: "#fff", fontWeight: "bold" },

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#1E2A54",
    borderRadius: 10,
    padding: 20,
  },
  modalTitulo: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalInput: {
    backgroundColor: "#162447",
    color: "#fff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
  modalBotaoCancelar: {
    padding: 10,
    backgroundColor: "#bbb",
    borderRadius: 5,
    marginRight: 10,
  },
  modalBotaoSalvar: {
    padding: 10,
    backgroundColor: "#00BFFF",
    borderRadius: 5,
  },
}

);
