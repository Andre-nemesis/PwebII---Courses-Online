import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, CircularProgress, Box, FormControl, Select, FormHelperText, MenuItem } from '@mui/material';
import api from '../service/api';
import { signUp } from '../service/auth';
import MaskedTextField from '../components/maskTextField';

const EditAdminModal = ({ open, onClose, adminToEdit, onUpdate }) => {
    const [admin, setAdmin] = useState({
        name: '',
        email: '',
        phone_number: '',
        cpf: '',
        role: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (adminToEdit) {
            setAdmin({
                name: adminToEdit.User.name || '',
                email: adminToEdit.User.email || '',
                phone_number: adminToEdit.User.phone_number || '',
                cpf: adminToEdit.User.cpf || '',
                role: adminToEdit.role || ''
            });
        }
    }, [adminToEdit]);

    const handleInputChange = (e) => {
        setAdmin({ ...admin, [e.target.name]: e.target.value });
    };

    const resetForm = () => {
        setAdmin({
            name: '',
            email: '',
            phone_number: '',
            cpf: '',
            role: ''
        });
    }

    const close = ()=>{
        resetForm();
        onClose();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (adminToEdit) {
            try {
                await api.put(`/admin/${adminToEdit.id}`, admin);
                onUpdate(admin);
                resetForm();
                onClose();
            } catch (err) {
                setError('Erro ao atualizar o administrador');
            } finally {
                setLoading(false);
            }
        } else {
            try {
                await signUp(admin.name, admin.email, "12345678", admin.cpf, admin.phone_number, "admin", admin.role, undefined, undefined, undefined);
                onUpdate(admin);
                resetForm();
                onClose();
            } catch (err) {
                setError('Erro ao cadastrar administrador');
            } finally {
                setLoading(false);
            }
        }

    };

    return (
        <Dialog open={open} onClose={onClose}>

            {adminToEdit ? (
                <DialogTitle>Editar Administrador</DialogTitle>
            ) : (
                <DialogTitle>Cadastrar Administrador</DialogTitle>
            )}
            <DialogContent>
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <form onSubmit={handleSubmit}>
                        {error && <Box sx={{ color: 'red', marginBottom: 2 }}>{error}</Box>}
                        <TextField className='custom-textfield'
                            label="Nome"
                            name="name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={admin.name}
                            onChange={handleInputChange}
                            required
                        />
                        <TextField className='custom-textfield'
                            label="E-mail"
                            name="email"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={admin.email}
                            onChange={handleInputChange}
                            required
                        />
                        <MaskedTextField
                            className='custom-textfield'
                            id="phone_number"
                            name="phone_number"
                            value={admin.phone_number}
                            onChange={handleInputChange}
                            mask="(99) 99999-9999"
                            label="Telefone"
                            margin="normal"
                            required
                        />
                        <MaskedTextField
                            className='custom-textfield'
                            id="cpf"
                            name="cpf"
                            value={admin.cpf}
                            onChange={handleInputChange}
                            mask="999.999.999-99"
                            label="CPF"
                            margin="normal"
                            required
                        />
                        <FormControl fullWidth className="custom-form-control">
                            <FormHelperText id="role" className="custom-form-helper-text">
                                Cargo
                            </FormHelperText>
                            <Select
                                labelId="role"
                                id="role"
                                value={admin.role}
                                onChange={handleInputChange}
                                name="role"
                                className="custom-select"
                            >
                                <MenuItem value={'admin'} className="custom-menu-item">
                                    Admin
                                </MenuItem>
                                <MenuItem value={'content_manager'} className="custom-menu-item">
                                    Content Manager
                                </MenuItem>
                            </Select>
                        </FormControl>
                        <DialogActions>
                            <Button onClick={close} color="secondary">Cancelar</Button>
                            <Button type="submit" color="primary" variant="contained">
                                Salvar
                            </Button>
                        </DialogActions>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default EditAdminModal;
