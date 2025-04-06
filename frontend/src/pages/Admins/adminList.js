import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, Table, TableBody, TableCell, Button, TableContainer, TableHead, TableRow, CircularProgress, Box, IconButton } from '@mui/material';
import api from '../../service/api.js';
import Menu from '../../components/Menu.js';
import SearchBar from '../../components/SearchBar.js';
import { Delete, Edit, Add } from "@mui/icons-material";
import EditAdminModal from '../../components/EditAdminModal.js';
import DeleteConfirmationDialog from '../../components/DeleteConfirmationDialog';
import SuccessMessageModal from '../../components/SuccessMessageModal';
import ErrorMessageModal from '../../components/ErrorMessageModal';

const AdminList = () => {
    const navigate = useNavigate();
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [isSearch, setSearch] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [adminToDelete, setAdminToDelete] = useState(null);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [adminToEdit, setAdminToEdit] = useState(null);
    const [openMessage, setOpenMessage] = useState(false);
    const [messageInfo, setMessageInfo] = useState({ type: "success", message: "" });
    const [openError, setOpenError] = useState(false);
    const [errorInfo, setErrorInfo] = useState({ type: "error", message: "" });

    useEffect(() => {
        const fetchAdmins = async () => {
            try {
                const response = await api.get('/admin/viewAdmins');
                setAdmins(response.data);
                setFilteredUsers(response.data);
            } catch (err) {
                setErrorInfo({ message: err.message });
                setOpenError(true);
                setError('Erro ao buscar os administradores' + err);
            } finally {
                setLoading(false);
            }
        };
        fetchAdmins();
    }, []);

    const fetchUsersByTermo = async (termo) => {
        try {
            const response = await api.get(`/admin/search/${encodeURI(termo)}`);
            if (!response.data) {
                throw new Error('Erro ao buscar usuários por termo.');
            }
            return response.data;
        } catch (error) {
            setErrorInfo({ message: error.message });
            setOpenError(true);
            return null;
        }
    };

    const handleSearchChange = async (e) => {
        const value = e.target.value.trim();
        setSearchValue(value);
        console.log(searchValue);

        if (!value) {
            setFilteredUsers(admins);
            setSearch(false);
            return;
        }

        const usersByTermo = await fetchUsersByTermo(value);
        if (usersByTermo && usersByTermo.length > 0) {
            setFilteredUsers(usersByTermo);
            setSearch(true);
            return;
        } else {
            setFilteredUsers([]);
            setSearch(true);
        }


    };

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
                setMessageInfo({ type: "success", message: "Administrador excluído com sucesso!" });
                setOpenMessage(true);
            } catch (err) {
                setErrorInfo({ message: err.message });
                setOpenError(true);
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

    const handleUpdateAdmin = async (updatedAdmin) => {
        try {
            const response = await api.get('/admin/viewAdmins');
            setAdmins(response.data);
            setFilteredUsers(response.data);
        } catch (err) {
            setErrorInfo({ message: err.message });
            setOpenError(true);
        } finally {
            setLoading(false);
        }
    };

    const handleCloseMessage = () => setOpenMessage(false);

    const handleCloseError = () => setOpenError(false);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Menu userRole="admin" roleAdmin={"admin"} />
            <Container component='section' maxWidth='md' sx={{ ml: { md: '240px', lg: '240px' } }}>
                <Typography component='h1' variant='h5' sx={{ color: '#FFFFFF', mb: 2, mt: 5 }}>
                    Pesquisar Administrador
                </Typography>
            </Container>

            <Container component="div" maxWidth="md"
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: 4,
                    ml: { md: '240px' }
                }}
            >
                <SearchBar
                    value={searchValue}
                    onChange={handleSearchChange}
                    sx={{
                        flexGrow: 1,
                        width: { xs: '100%', sm: '60%' },
                        '& .MuiInputBase-root': {
                            height: '40px',
                            fontSize: '0.875rem',
                        },
                    }}
                />

                <Button
                    variant="contained"
                    sx={{
                        bgcolor: '#60BFBF',
                        '&:hover': { bgcolor: '#43DBF9' },
                        width: { xs: '100%', sm: 'auto' },
                        px: 2,
                        height: '40px',
                        fontSize: '0.875rem',
                        textTransform: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        color: '#040D33',
                    }}
                    endIcon={<Add sx={{ color: '#040D33' }} />}
                    onClick={() => setOpenEditModal(true)}
                >
                    Cadastrar Administrador
                </Button>
            </Container>


            {/* Container da lista de administradores */}
            <Container component='main' sx={{
                width: {
                    xs: "100%",
                    sm: "100%",
                    md: "calc(100% - 240px)",
                    lg: "calc(100% - 240px)"
                },
                ml: { lg: "240px", md: "240px" }
            }}>
                <Paper elevation={3} sx={{ mt: 2, p: 3, bgcolor: '#1E2951' }}>
                    <Typography component='h1' variant='h5' sx={{ mb: 2, color: "#F8F9FA" }}>
                        Lista de Administradores
                    </Typography>
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <CircularProgress />
                        </Box>
                    ) : error ? (
                        <Typography color='error'>{error}</Typography>
                    ) : (
                        isSearch ? (
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
                                        {filteredUsers.map((admin) => (
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
                                                    <IconButton onClick={() => handleOpenEditModal(admin)} sx={{ color: "#60BFBF" }}>
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
                        )
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
            {adminToEdit ? (
                <EditAdminModal
                    open={openEditModal}
                    onClose={handleCloseEditModal}
                    adminToEdit={adminToEdit}
                    onUpdate={handleUpdateAdmin}
                />
            ) : (
                <EditAdminModal
                    open={openEditModal}
                    onClose={handleCloseEditModal}
                    adminToEdit={null}
                    onUpdate={handleUpdateAdmin}
                />
            )}

            <SuccessMessageModal open={openMessage} onClose={handleCloseMessage} type={messageInfo.type} message={messageInfo.message} />
            <ErrorMessageModal open={openError} onClose={handleCloseError} type={errorInfo.type} message={errorInfo.message} />
        </Box>
    );

};

export default AdminList;