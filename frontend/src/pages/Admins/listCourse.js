import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import Menu from "../../components/Menu";
import axios from "axios";

export default function ListCourse() {
  const [busca, setBusca] = useState("");
  const [cursos, setCursos] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await axios.get("http://<SEU_IP>:<PORTA>/cursos");
        setCursos(response.data);
      } catch (error) {
        console.error("Erro ao buscar cursos:", error.message);
      }
    };

    fetchCursos();
  }, []);

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

          <TouchableOpacity style={styles.botaoCriar}>
            <Text style={styles.textoBotaoCriar}>Criar Novo Curso</Text>
            <Icon name="plus" size={16} color="#fff" />
          </TouchableOpacity>
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
  iconSearch: {
    marginRight: 8,
  },
  input: {
    color: "#fff",
    flex: 1,
    height: 40,
  },
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
});
