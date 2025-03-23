import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, CircularProgress, Box } from '@mui/material';
import api from '../service/api';

const EditStudentModal = ({ open, onClose, studentToEdit, onUpdate }) => {
  const [student, setStudent] = useState({
    name: '',
    email: '',
    phone_number: '',
    cpf: '',
    city: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (studentToEdit) {
      setStudent({
        name: studentToEdit.User.name || '',
        email: studentToEdit.User.email || '',
        phone_number: studentToEdit.User.phone_number || '',
        cpf: studentToEdit.User.cpf || '',
        city: studentToEdit.city || ''
      });
    }
  }, [studentToEdit]);

  const handleInputChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put(`/admin/updateStudent/${studentToEdit.id}`, student);
      onUpdate(student); 
      onClose(); 
    } catch (err) {
      setError('Erro ao atualizar estudante');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Editar Estudante</DialogTitle>
      <DialogContent>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        ) : (
          <form onSubmit={handleSubmit}>
            {error && <Box sx={{ color: 'red', marginBottom: 2 }}>{error}</Box>}
            <TextField
              label="Nome"
              name="name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={student.name}
              onChange={handleInputChange}
              required
            />
            <TextField
              label="E-mail"
              name="email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={student.email}
              onChange={handleInputChange}
              required
            />
            <TextField
              label="Telefone"
              name="phone_number"
              variant="outlined"
              fullWidth
              margin="normal"
              value={student.phone_number}
              onChange={handleInputChange}
              required
            />
            <TextField
              label="CPF"
              name="cpf"
              variant="outlined"
              fullWidth
              margin="normal"
              value={student.cpf}
              onChange={handleInputChange}
              required
            />
            <TextField
              label="Cidade"
              name="city"
              variant="outlined"
              fullWidth
              margin="normal"
              value={student.city}
              onChange={handleInputChange}
              required
            />
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

export default EditStudentModal;
