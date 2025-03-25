import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, CircularProgress, Box, FormControl, Select, FormHelperText, MenuItem } from '@mui/material';
import api from '../service/api';

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.put(`/admin/updateStudent/${adminToEdit.id}`, admin);
            onUpdate(admin);
            onClose();
        } catch (err) {
            setError('Erro ao atualizar estudante');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Editar Administrador</DialogTitle>
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
                        <TextField className='custom-textfield'
                            label="Telefone"
                            name="phone_number"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={admin.phone_number}
                            onChange={handleInputChange}
                            required
                        />
                        <TextField className='custom-textfield'
                            label="CPF"
                            name="cpf"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={admin.cpf}
                            onChange={handleInputChange}
                            required
                        />
                        <FormControl fullWidth >
                            <FormHelperText id="role">Cargo</FormHelperText>
                            <Select
                                labelId="role"
                                id="role"
                                value={admin.role}
                                onChange={handleInputChange}
                                name="role"
                            >
                                <MenuItem value={'admin'}>Admin</MenuItem>
                                <MenuItem value={'content_manager'}>Content Manager</MenuItem>
                            </Select>
                        </FormControl>
                        <DialogActions>
                            <Button onClick={onClose} color="secondary">Cancelar</Button>
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
