import React, { useEffect, useState } from 'react';
import { Container, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress, Box } from '@mui/material';
import api from '../../service/api.js';
import Menu from '../../components/Menu.js';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const CoursesList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [role, setRole] = useState(null);
  const [roleAdmin, setRoleAdmin] = useState(null);
  const [authenticated, setAuthenticated] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);

        setRole(decoded.role);
        setRoleAdmin(decoded.role_adm || null);

      } catch (err) {
        console.error('Erro ao decodificar o token:', err);
        setError('Token inválido');
        setAuthenticated(false);
      }
    } else {
      setAuthenticated(false);
    }

    const fetchCourses = async () => {
      try {
        const response = await api.get('/courses/');
        setCourses(response.data);
      } catch (err) {
        setError('Erro ao buscar cursos');
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (!authenticated) {
    navigate('/login');
    return null;
  }

  return (
    <Box sx={{ display: 'flex' }}> 
      <Menu userRole={role} roleAdmin={roleAdmin} setAuthenticated={setAuthenticated} />

      <Container component='main' maxWidth='md' sx={{ flexGrow: 1, p: 3 }}>
        <Paper elevation={3} sx={{ mt: 2, p: 3 }}>
          <Typography component='h1' variant='h5' sx={{ mb: 2 }}>
            Lista de Cursos
          </Typography>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Typography color='error'>{error}</Typography>
          ) : (
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label='Tabela de Cursos'>
                <TableHead>
                  <TableRow>
                    <TableCell>Nome do Curso</TableCell>
                    <TableCell align='right'>Carga Horária</TableCell>
                    <TableCell align='right'>Progresso (%)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {courses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell component='th' scope='row'>
                        {course.name}
                      </TableCell>
                      <TableCell align='right'>{course.qtd_hours}</TableCell>
                      <TableCell align='right'>{course.percent_complet}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default CoursesList;