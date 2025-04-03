import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Menu from '../../components/Menu';

const courses = [
  { id: '1', title: 'Front-end', status: 'Iniciado', duration: '2h' },
  { id: '2', title: 'Front-end', status: 'Iniciado', duration: '2h' },
  { id: '3', title: 'Front-end', status: 'Iniciado', duration: '2h' },
];

const professors = [
  { id: '1', name: 'Alice Ocean', role: 'Professor(a) de Front-end', image: 'https://via.placeholder.com/50' },
  { id: '2', name: 'Alice Ocean', role: 'Professor(a) de Front-end', image: 'https://via.placeholder.com/50' },
  { id: '3', name: 'Alice Ocean', role: 'Professor(a) de Front-end', image: 'https://via.placeholder.com/50' },
];

const Dashboard = () => {
  return (
    <View style={styles.container}>
      <Menu />
      <View style={styles.content}>
        <Text style={styles.title}>Página Inicial</Text>
        <Text style={styles.subtitle}>Últimos cursos criados</Text>
        <FlatList
          horizontal
          data={courses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.courseCard}>
              <Text style={styles.courseTitle}>{item.title}</Text>
              <Text style={styles.courseInfo}>{item.status}</Text>
              <Text style={styles.courseInfo}>{item.duration}</Text>
              <TouchableOpacity>
                <Text style={styles.link}>Ver curso →</Text>
              </TouchableOpacity>
            </View>
          )}
        />
        <Text style={styles.subtitle}>Professores</Text>
        <FlatList
          horizontal
          data={professors}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.professorCard}>
              <Image source={{ uri: item.image }} style={styles.professorImage} />
              <Text style={styles.professorName}>{item.name}</Text>
              <Text style={styles.professorRole}>{item.role}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'row', backgroundColor: '#1e2a47' },
  content: { flex: 1, padding: 20 },
  title: { fontSize: 24, color: '#fff', marginBottom: 10 },
  subtitle: { fontSize: 18, color: '#fff', marginBottom: 10 },
  courseCard: { backgroundColor: '#16213e', padding: 15, marginRight: 10, borderRadius: 10 },
  courseTitle: { fontSize: 16, color: '#fff' },
  courseInfo: { fontSize: 14, color: '#ccc' },
  link: { color: '#1abc9c', marginTop: 5 },
  professorCard: { backgroundColor: '#16213e', padding: 15, marginRight: 10, borderRadius: 10, alignItems: 'center' },
  professorImage: { width: 50, height: 50, borderRadius: 25 },
  professorName: { fontSize: 16, color: '#fff', marginTop: 5 },
  professorRole: { fontSize: 14, color: '#ccc' },
});

export default Dashboard;