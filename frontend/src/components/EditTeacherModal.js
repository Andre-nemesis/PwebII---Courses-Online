import React, { useState, useEffect } from 'react';
import { Dialog, Typography, DialogActions, DialogContent, DialogTitle, TextField, Button, CircularProgress, Box, InputAdornment } from '@mui/material';
import { Person, Email, Phone, Description, Draw, TrackChanges } from "@mui/icons-material";
import api from '../service/api';
import MaskedTextField from './maskTextField';

const EditTeacherModal = ({ open, onClose, teacherToEdit, onUpdate }) => {
	const [teacher, setTeacher] = useState({
		name: '',
		email: '',
		phone_number: '',
		cpf: '',
		academic_formation: '',
		tecnic_especialization: ''
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
    if (teacherToEdit) {
			setTeacher({
				name: teacherToEdit.User.name || '',
				email: teacherToEdit.User.email || '',
				phone_number: teacherToEdit.User.phone_number || '',
				cpf: teacherToEdit.User.cpf || '',
				academic_formation: teacherToEdit.academic_formation || '',
				tecnic_especialization: teacherToEdit.tecnic_especialization || '',
			});
    } else {
			setTeacher({
				name: '',
				email: '',
				phone_number: '',
				cpf: '',
				academic_formation: '',
				tecnic_especialization: ''
			});
		}
	}, [teacherToEdit, open]);

	const handleInputChange = (e) => {
		setTeacher({ ...teacher, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
			let response;
			const payload = {
				name: teacher.name,
				email: teacher.email,
				phone_number: teacher.phone_number,
				cpf: teacher.cpf,
				type: 'teacher',
				academic_formation: teacher.academic_formation,
				tecnic_especialization: teacher.tecnic_especialization
			};
			

			if (teacherToEdit) {
					response = await api.put(`/teachers/${teacherToEdit.id}`, payload);
			} else {
					response = await api.post(`/teachers`, payload);
			}

			onUpdate(response.data);
			onClose();

    } catch (err) {
        setError(err.response?.data?.message || 'Erro ao salvar professor: ' + err.message);
    } finally {
        setLoading(false);
    }
	};


	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>
				{teacherToEdit ? "Editar Professor" : "Cadastrar Professor"}
			</DialogTitle>
			<DialogContent>
				{loading ? (
					<Box>
						<CircularProgress />
					</Box>
				) : (
					<form onSubmit={handleSubmit}>
						{error && <Box sx={{ color: 'red', marginBottom: 2 }}>{error}</Box>}
						<Typography variant="subtitle1" sx={{  color: '#000'  }}>
							Nome:
						</Typography>
						<TextField className="custom-textfield"
							name="name"
							variant="outlined"
							fullWidth
							margin="normal"
							value={teacher.name}
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
						<TextField className="custom-textfield"
							name="email"
							variant="outlined"
							fullWidth
							margin="normal"
							value={teacher.email}
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
						<MaskedTextField className="custom-textfield"
							name="phone_number"
							variant="outlined"
							fullWidth
							margin="normal"
							value={teacher.phone_number}
							onChange={handleInputChange}
							mask="(99) 99999-9999" 
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
						<MaskedTextField className="custom-textfield"
							name="cpf"
							variant="outlined"
							fullWidth
							margin="normal"
							value={teacher.cpf}
							onChange={handleInputChange}
							mask="999.999.999-99"
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

						<Typography variant="subtitle1" sx={{  color: '#000'  }}>
							Formação Acadêmica:
						</Typography>
						<TextField className="custom-textfield"
							name="academic_formation"
							variant="outlined"
							fullWidth
							margin="normal"
							value={teacher.academic_formation}
							onChange={handleInputChange}
							required
							sx={{ mb: 1.5, marginTop: '-1px' }}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<Draw style={{ color: "#F8F9FA" }} />
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
							Especialização Técnica:
						</Typography>
						<TextField className="custom-textfield"
							name="tecnic_especialization"
							variant="outlined"
							fullWidth
							margin="normal"
							value={teacher.tecnic_especialization}
							onChange={handleInputChange}
							required
							sx={{ mb: 1.5, marginTop: '-1px' }}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<TrackChanges style={{ color: "#F8F9FA" }} />
									</InputAdornment>
								),
								sx: {
									backgroundColor: '#1E2951',
									color: '#EAEFF7',
									border: '1px solid rgba(200, 208, 218, 0.25)',
								},
							}}
						/>
						<DialogActions
							sx={{
								justifyContent: 'center',
								gap: 2, 
								padding: '10px 24px',
								marginTop: '8px'
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
								{teacherToEdit ? "Salvar" : "Cadastrar"}
							</Button>
						</DialogActions>
					</form>
				)}
			</DialogContent>
		</Dialog>
	);
};

export default EditTeacherModal;
