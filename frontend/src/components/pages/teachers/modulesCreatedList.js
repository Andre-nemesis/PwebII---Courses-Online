import React, { useEffect, useState } from 'react';
import { Container, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress, Box } from '@mui/material';
import api from '../../../service/api.js';
import { jwtDecode } from 'jwt-decode';

const ModulesTeacherList = () => {
    const [modules, setModules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
        const fetchModules = async () => {
            try {
                const userId = getUserIdFromToken();
                console.log(`id: ${userId}`);
                const response = await api.get('/teachers/module/view/teacher/'+userId);
                setModules(response.data);
            } catch (err) {
                setError('Erro ao buscar os modules do professor!'+err);
            } finally {
                setLoading(false);
            }
        };
        fetchModules();
    }, []);

    return (
        <Container component='main' maxWidth='md'>
            <Paper elevation={3} sx={{ mt: 2, p: 3 }}>
                <Typography component='h1' variant='h5' sx={{ mb: 2 }}>
                    Lista de Modulos criado pelo Professor
                </Typography>
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <CircularProgress />
                    </Box>
                ) : error ? (
                    <Typography color='error'>{error}</Typography>
                ) : (
                    <TableContainer>
                        <Table sx={{ minWidth: 650 }} aria-label='Tabela de Modulos'>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nome</TableCell>
                                    <TableCell align='right'>Quantidade de Horas</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {modules.map((module) => (
                                    <TableRow key={module.id}>
                                        <TableCell component='th' scope='row'>
                                            { module.name ? module.name : 'Nome do modulo Indisponível'}
                                        </TableCell>
                                        <TableCell align='right'>{module.qtd_hours ? module.qtd_hours : 'Quantidade de Horas Indisponível'}</TableCell>
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

export default ModulesTeacherList;