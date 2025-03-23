import React, { useEffect, useState } from 'react';
import { Container, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress, Box, useMediaQuery, Stack, IconButton } from '@mui/material';
import api from '../../service/api.js';
import Menu from '../../components/Menu.js';
import { Delete, Edit } from "@mui/icons-material";
import EditAdminModal from '../../components/EditAdminModal.js';
import DeleteConfirmationDialog from '../../components/DeleteConfirmationDialog';

const AdminList = () => {
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [adminToDelete, setAdminToDelete] = useState(null);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [adminToEdit, setAdminToEdit] = useState(null);
    const isMobile = useMediaQuery('(max-width:600px)');

    useEffect(() => {
        const fetchAdmins = async () => {
            try {
                const response = await api.get('/admin/viewAdmins');
                setAdmins(response.data);
            } catch (err) {
                setError('Erro ao buscar os administradores' + err);
            } finally {
                setLoading(false);
            }
        };
        fetchAdmins();
    }, []);


    const handleOpenDialog = (admin) => {
        setAdminToDelete(admin);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setAdminToDelete(null);
    };

    const handleDelete = async () => {
        if (adminToDelete) {
            try {
                await api.delete(`/admin/deleteStudent/${adminToDelete.id}`);
                setAdmins(admins.filter(admin => admin.id !== adminToDelete.id));
                handleCloseDialog();
            } catch (err) {
                setError('Erro ao excluir estudante' + err);
            }
        }
    };

    const handleOpenEditModal = (admin) => {
        setAdminToEdit(admin);
        setOpenEditModal(true);
    };

    const handleCloseEditModal = () => {
        setOpenEditModal(false);
        setAdminToEdit(null);
    };

    const handleUpdateAdmin = (updatedAdmin) => {
        setAdmins((prevAdmins) =>
            prevAdmins.map((admin) =>
                admin.id === updatedAdmin.id ? updatedAdmin : admin
            )
        );
    };

    if (isMobile) {
        return (
            <Stack spacing={1} sx={{ width: '100%' }}>
                {admins.map((admin) => (
                    <Paper key={admin.id} sx={{ p: 1 }}>
                        <Stack spacing={0.5}>
                            <Typography><strong>Nome:</strong> {admin.User && admin.User.name ? admin.User.name : 'Nome indisponível'}</Typography>
                            <Typography><strong>E-mail:</strong> {admin.User && admin.User.email ? admin.User.email : 'E-mail indisponível'}</Typography>
                            <Typography><strong>Telefone:</strong> {admin.User && admin.User.phone_number ? admin.User.phone_number : 'Telefone indisponível'}</Typography>
                            <Typography><strong>CPF:</strong> {admin.User && admin.User.cpf ? admin.User.cpf : 'CPF indisponível'}</Typography>
                            <Typography><strong>Cargo:</strong> {admin.role ? admin.role : 'Cargo indisponível'}</Typography>
                            <Stack direction="row" spacing={1} justifyContent="center">
                                <IconButton color="primary" onClick={() => handleOpenEditModal(admin)}>
                                    <Edit />
                                </IconButton>
                                <IconButton color="error" onClick={() => handleOpenDialog(admin)}>
                                    <Delete />
                                </IconButton>
                            </Stack>
                        </Stack>
                    </Paper>
                ))}

                {/* Dialog de confirmação de exclusão */}
                <DeleteConfirmationDialog
                    open={openDialog}
                    onClose={handleCloseDialog}
                    title={'Deseja excluir o Administrador?'}
                    message={'Ao excluir o Administrador '}
                    onConfirm={handleDelete}
                    studentName={adminToDelete ? adminToDelete.User.name : ''}
                />

                {/* Modal de edição */}
                {adminToEdit && (
                    <EditAdminModal
                        open={openEditModal}
                        onClose={handleCloseEditModal}
                        adminToEdit={adminToEdit}
                        onUpdate={handleUpdateAdmin}
                    />
                )}
            </Stack>
        );
    }

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
                                        <TableCell align='right'>Opções</TableCell>
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
                                            <TableCell align='right'>
                                                <IconButton color='primary' onClick={() => handleOpenEditModal(admin)}>
                                                    <Edit />
                                                </IconButton>
                                                <IconButton color='error' onClick={() => handleOpenDialog(admin)}>
                                                    <Delete />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </Paper>
            </Container>
            {/* Dialog de confirmação de exclusão */}
            <DeleteConfirmationDialog
                open={openDialog}
                onClose={handleCloseDialog}
                title={'Excluir Administrador?'}
                message={'Deseja excluir o administrador'}
                onConfirm={handleDelete}
                studentName={adminToDelete ? adminToDelete.User.name : ''}
            />

            {/* Modal de edição */}
            {adminToEdit && (
                <EditAdminModal
                    open={openEditModal}
                    onClose={handleCloseEditModal}
                    adminToEdit={adminToEdit}
                    onUpdate={handleUpdateAdmin}
                />
            )}
        </Box>
    );
};

export default AdminList;