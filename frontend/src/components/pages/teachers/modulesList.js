import React, { useEffect, useState } from 'react';
import { Container, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress, Box } from '@mui/material';
import api from '../../../service/api.js';

const ModulesList = () => {
    const [modules, setModules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchModules = async () => {
            try {
                const response = await api.get('/teachers/module/view');
                setModules(response.data);
            } catch (err) {
                setError('Erro ao buscar os modulos' + err);
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
                    Lista de Modulos Cadastrados
                </Typography>
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <CircularProgress />
                    </Box>
                ) : error ? (
                    <Typography color='error'>{error}</Typography>
                ) : (
                    <TableContainer>
                        <Table sx={{ minWidth: 650 }} aria-label='Tabela de modulos'>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nome</TableCell>
                                    <TableCell align='right'>Quantidade de Horas</TableCell>
                                    <TableCell align='right'>Autor</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {modules.map((module) => (
                                    <TableRow key={module.id}>
                                        <TableCell component='th' scope='row'>
                                            {module.name ? module.name : 'Nome do módulo Indisponível'}
                                        </TableCell>
                                        <TableCell align='right'>{module.qtd_hours ? module.qtd_hours : 'Quantidade de horas do módulos Indisponível'}</TableCell>
                                        <TableCell align='right'> {module.Author && module.Author.User ? module.Author.User.name : 'Nome do autor do módulo Indisponível'}</TableCell>
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

export default ModulesList;