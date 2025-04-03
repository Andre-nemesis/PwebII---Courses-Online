import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import RNPickerSelect from "react-native-picker-select";

export default function ModalCourse({ visible, onClose, onSave }) {
  const [nome, setNome] = useState("");
  const [horas, setHoras] = useState("");
  const [modulo, setModulo] = useState(null);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.titulo}>Curso</Text>

          {/* Campo Nome */}
          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            value={nome}
            onChangeText={setNome}
            placeholder="Digite o nome do curso"
            placeholderTextColor="#bbb"
          />

          {/* Campo Quantidade de Horas */}
          <Text style={styles.label}>Quantidade de Horas</Text>
          <View style={styles.inputIcon}>
            <Icon name="clock-o" size={18} color="#bbb" style={styles.icone} />
            <TextInput
              style={styles.inputComIcone}
              value={horas}
              onChangeText={setHoras}
              keyboardType="numeric"
              placeholder="Horas"
              placeholderTextColor="#bbb"
            />
          </View>

          {/* Campo Módulos */}
          <Text style={styles.label}>Módulos</Text>
          <View style={styles.pickerContainer}>
            <RNPickerSelect
              onValueChange={(value) => setModulo(value)}
              items={[
                { label: "Módulo 1", value: "modulo1" },
                { label: "Módulo 2", value: "modulo2" },
                { label: "Módulo 3", value: "modulo3" },
              ]}
              placeholder={{ label: "Selecione um módulo...", value: null }}
              style={pickerSelectStyles}
            />
          </View>

          {/* Botões */}
          <View style={styles.botoes}>
            <TouchableOpacity style={styles.botaoCancelar} onPress={onClose}>
              <Text style={styles.textoCancelar}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.botaoSalvar}
              onPress={() => onSave({ nome, horas, modulo })}
            >
              <Text style={styles.textoSalvar}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)", justifyContent: "center", alignItems: "center" },
  modal: { backgroundColor: "#F0F4FA", padding: 20, borderRadius: 10, width: "80%" },
  titulo: { fontSize: 20, fontWeight: "bold", textAlign: "center", marginBottom: 15 },
  label: { fontSize: 14, fontWeight: "bold", marginTop: 10 },
  input: { backgroundColor: "#1E2A54", color: "#fff", padding: 10, borderRadius: 5 },
  inputIcon: { flexDirection: "row", alignItems: "center", backgroundColor: "#1E2A54", borderRadius: 5, padding: 10 },
  icone: { marginRight: 10 },
  inputComIcone: { flex: 1, color: "#fff" },
  pickerContainer: { backgroundColor: "#1E2A54", borderRadius: 5, padding: 10 },
  botoes: { flexDirection: "row", justifyContent: "space-between", marginTop: 20 },
  botaoCancelar: { backgroundColor: "#E63946", padding: 10, borderRadius: 5, flex: 1, marginRight: 10 },
  botaoSalvar: { backgroundColor: "#2A9D8F", padding: 10, borderRadius: 5, flex: 1 },
  textoCancelar: { color: "#fff", textAlign: "center", fontWeight: "bold" },
  textoSalvar: { color: "#fff", textAlign: "center", fontWeight: "bold" },
});

const pickerSelectStyles = {
  inputIOS: { color: "#fff", padding: 10 },
  inputAndroid: { color: "#fff", padding: 10 },
};

