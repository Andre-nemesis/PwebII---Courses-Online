import React, { useEffect, useState } from 'react';
import {
    Container, Paper, Typography, Table, TableBody,
    TableCell, TableContainer, TableHead, TableRow,
    CircularProgress, Box
} from '@mui/material';
import api from '../../../service/api.js';
import { jwtDecode } from 'jwt-decode';


const SubscribedCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [noCourses, setNoCourses] = useState(false);

    const getUserIdFromToken = () => {
        const token = localStorage.getItem('token');
        if (!token) return null;
        try {
            const decoded = jwtDecode(token);
            return decoded.id;
        } catch (error) {
            console.error('Erro ao decodificar o token:', error);
            return null;
        }
    };

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const userId = getUserIdFromToken();
                const response = await api.get(`/students/courses/view/student/${userId}`);

                if (response.data.message === "Não há inscrições em cursos para este aluno!") {
                    setNoCourses(true);
                } else {
                    setCourses(response.data);
                }
            } catch (err) {
                const errorMessage = err.response?.data?.message || 'Erro ao buscar cursos. Tente novamente mais tarde.';
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    return (
        <Container component='main' maxWidth='md'>
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
                ) : noCourses ? ( 
                    <Typography sx={{ textAlign: 'center', color: 'gray' }}>
                        Não há inscrições feitas.
                    </Typography>
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
    );
};

export default SubscribedCourses;
