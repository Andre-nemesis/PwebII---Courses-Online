import React, { useEffect, useState } from 'react';
import { Container, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress, Box } from '@mui/material';
import api from '../../../service/api.js';
import Menu from '../Menu.js';

const AdminList = () => {
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAdmins = async () => {
            try {
                const response = await api.get('/admin/viewAdmins');
                setAdmins(response.data);
            } catch (err) {
                setError('Erro ao buscar os administradores'+err);
            } finally {
                setLoading(false);
            }
        };
        fetchAdmins();
    }, []);

    return (
        <Box sx={{ display: 'flex' }}>
            <Menu userRole="admin" />
            <Container component='main' maxWidth='md'>
            <Paper elevation={3} sx={{ mt: 2, p: 3 }}>
                <Typography component='h1' variant='h5' sx={{ mb: 2 }}>
                    Lista de Administradores
                </Typography>
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <CircularProgress />
                    </Box>
                ) : error ? (
                    <Typography color='error'>{error}</Typography>
                ) : (
                    <TableContainer>
                        <Table sx={{ minWidth: 650 }} aria-label='Tabela de Administradores'>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nome</TableCell>
                                    <TableCell align='right'>E-mail</TableCell>
                                    <TableCell align='right'>Telefone</TableCell>
                                    <TableCell align='right'>CPF</TableCell>
                                    <TableCell align='right'>Cargo</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {admins.map((admin) => (
                                    <TableRow key={admin.id}>
                                        <TableCell component='th' scope='row'>
                                            {admin.User && admin.User.name ? admin.User.name : 'Nome Indisponível'}
                                        </TableCell>
                                        <TableCell align='right'>{admin.User && admin.User.email ? admin.User.email : 'Email Indisponível'}</TableCell>
                                        <TableCell align='right'> {admin.User && admin.User.phone_number ? admin.User.phone_number : 'Número de Telefone Indisponível'}</TableCell>
                                        <TableCell align='right'> {admin.User && admin.User.cpf ? admin.User.cpf : 'CPF Indisponível'}</TableCell>
                                        <TableCell align='right'>{admin.role}</TableCell>
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

export default AdminList;