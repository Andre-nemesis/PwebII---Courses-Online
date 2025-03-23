// components/TeachersList.js
import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress, Box } from '@mui/material';
import api from '../../../service/api';
import Menu from '../Menu';

const TeachersList = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeachers = async () => {
      setLoading(true);
      try {
        const response = await api.get('/admin/viewTeacher');
				setTeachers(response.data);
    
      } catch (err) {
        setError('Erro ao buscar professores'+err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <Menu userRole="admin"/>

      <Container component='main' maxWidth='md'>
      <Paper elevation={3} sx={{ mt: 2, p: 3 }}>
        <Typography component='h1' variant='h5' sx={{ mb: 2 }}>
          Lista de Professores
        </Typography>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color='error'>{error}</Typography>
        ) : (
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label='Tabela de Professores'>
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell align='right'>E-mail</TableCell>
									<TableCell align='right'>Telefone</TableCell>
									<TableCell align='right'>CPF</TableCell>
                  <TableCell align='right'>Formação Acadêmica</TableCell>
									<TableCell align='right'>Especialização Técnica</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {teachers.map((teacher) => (
                  <TableRow key={teacher.id}>
                    <TableCell component='th' scope='row'>
                      {teacher.User.name || 'Sem nome'}
                    </TableCell>
                    <TableCell align='right'>{teacher.User.email}</TableCell>
                    <TableCell align='right'>{teacher.User.phone_number}</TableCell>
										<TableCell align='right'>{teacher.User.cpf}</TableCell>
										<TableCell align='right'>{teacher.academic_formation}</TableCell>
										<TableCell align='right'>{teacher.tecnic_especialization}</TableCell>
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

export default TeachersList;