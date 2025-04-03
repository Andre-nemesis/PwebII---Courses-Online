import React, { useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import Menu from "../../components/Menu"; 

const cursos = [
  { id: "1", titulo: "Fundamentos de Front-end", horas: "30h" },
  { id: "2", titulo: "Fundamentos da Ciência de dados", horas: "35h" },
  { id: "3", titulo: "Introdução à Lógica de Programação", horas: "20h" },
  { id: "4", titulo: "Fundamentos de Front-end", horas: "30h" },
  { id: "5", titulo: "Fundamentos da Ciência de dados", horas: "35h" },
  { id: "6", titulo: "Introdução à Lógica de Programação", horas: "20h" },
];

export default function listCourse() {
  const [busca, setBusca] = useState("");
  const navigation = useNavigation();

  const renderCurso = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.titulo}>{item.titulo}</Text>
      <Text style={styles.subtitulo}>Iniciado</Text>
      <Text style={styles.horas}>{item.horas}</Text>
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

        {/* Barra de Pesquisa e Filtros */}
        <View style={styles.filtros}>
          <TextInput
            style={styles.input}
            placeholder="Pesquisar curso"
            placeholderTextColor="#bbb"
            value={busca}
            onChangeText={setBusca}
          />
          <TouchableOpacity style={styles.botaoFiltro}>
            <Icon name="filter" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.botaoCriar}>
            <Text style={styles.textoBotaoCriar}>Criar Novo Curso</Text>
            <Icon name="plus" size={16} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Lista de Cursos */}
        <FlatList
          data={cursos}
          renderItem={renderCurso}
          keyExtractor={(item) => item.id}
          numColumns={3} 
          contentContainerStyle={styles.listaCursos}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: "row", backgroundColor: "#101D42" },
  content: { flex: 1, padding: 20 },
  tituloPagina: { fontSize: 22, fontWeight: "bold", color: "#fff", marginBottom: 15 },
  filtros: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  input: {
    flex: 1,
    backgroundColor: "#1E2A54",
    color: "#fff",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  botaoFiltro: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
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
});

