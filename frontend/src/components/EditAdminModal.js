import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, Typography, InputAdornment, DialogTitle, TextField, Button, CircularProgress, Box, FormControl, Select, FormHelperText, MenuItem } from '@mui/material';
import { Person, Email, Phone, Description, Draw, TrackChanges } from "@mui/icons-material";import api from '../service/api';
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
        } else {
            resetForm();
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

                        <Typography variant="subtitle1" sx={{  color: '#000'  }}>
                            Nome:
                        </Typography>
                        <TextField className='custom-textfield'
                            name="name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={admin.name}
                            onChange={handleInputChange}
                            required
                            sx={{ mb: 1.5, marginTop: '-1px' }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Person style={{ color: "#F8F9FA" }} />
                                    </InputAdornment>
                                ),
                                sx: {
                                    backgroundColor: '#1E2951',
                                    color: '#EAEFF7',
                                    border: '1px solid rgba(200, 208, 218, 0.25)',
                                },
                            }}
                        />

                        <Typography variant="subtitle1" sx={{  color: '#000'  }}>
                            E-mail:
                        </Typography>
                        <TextField className='custom-textfield'
                            name="email"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={admin.email}
                            onChange={handleInputChange}
                            required
                            sx={{ mb: 1.5, marginTop: '-1px' }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Email style={{ color: "#F8F9FA" }} />
                                    </InputAdornment>
                                ),
                                sx: {
                                    backgroundColor: '#1E2951',
                                    color: '#EAEFF7',
                                    border: '1px solid rgba(200, 208, 218, 0.25)',
                                },
                            }}
                        />

                        <Typography variant="subtitle1" sx={{  color: '#000'  }}>
                            Telefone:
                        </Typography>
                        <MaskedTextField
                            className='custom-textfield'
                            id="phone_number"
                            name="phone_number"
                            value={admin.phone_number}
                            onChange={handleInputChange}
                            mask="(99) 99999-9999"
                            margin="normal"
                            required
                            sx={{ mb: 1.5, marginTop: '-1px' }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Phone style={{ color: "#F8F9FA" }} />
                                    </InputAdornment>
                                ),
                                sx: {
                                    backgroundColor: '#1E2951',
                                    color: '#EAEFF7',
                                    border: '1px solid rgba(200, 208, 218, 0.25)',
                                },
                            }}
                        />

                        <Typography variant="subtitle1" sx={{  color: '#000'  }}>
                            CPF:
                        </Typography>
                        <MaskedTextField
                            className='custom-textfield'
                            id="cpf"
                            name="cpf"
                            value={admin.cpf}
                            onChange={handleInputChange}
                            mask="999.999.999-99"
                            margin="normal"
                            required
                            sx={{ mb: 1.5, marginTop: '-1px' }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Description style={{ color: "#F8F9FA" }} />
                                    </InputAdornment>
                                ),
                                sx: {
                                    backgroundColor: '#1E2951',
                                    color: '#EAEFF7',
                                    border: '1px solid rgba(200, 208, 218, 0.25)',
                                },
                            }}
                        />

                        <FormControl fullWidth className="custom-form-control">
                            <Typography variant="subtitle1" sx={{  color: '#000'  }}>
                                Cargo:
                            </Typography>
                            <Select
                                labelId="role"
                                id="role"
                                value={admin.role}
                                onChange={handleInputChange}
                                name="role"
                                className="custom-select"
                            >
                                <MenuItem value={'admin'} className="custom-menu-item" backgroundColor="#1E2951">
                                    Admin
                                </MenuItem>
                                <MenuItem value={'content_manager'} className="custom-menu-item">
                                    Content Manager
                                </MenuItem>
                            </Select>
                        </FormControl>
                        <DialogActions
                            sx={{
                                justifyContent: 'center',
                                gap: 2, 
                                padding: '10px 24px',
                                marginTop: '18px'
                            }}
                        >
                            <Button onClick={onClose} variant="contained"
                                sx={{
                                    backgroundColor: '#FF342D',
                                    color: '#fff',
                                    '&:hover': {
                                        backgroundColor: '#FF2018',
                                    },
                                    padding: '6px 30px'
                                }}
                            >
                                Cancelar
                            </Button>
                            <Button type="submit" color="primary" variant="contained"
                                sx={{
                                    padding: '6px 35px'
                                }}
                            >
                                {adminToEdit ? "Salvar" : "Cadastrar"}
                            </Button>
                        </DialogActions>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default EditAdminModal;
