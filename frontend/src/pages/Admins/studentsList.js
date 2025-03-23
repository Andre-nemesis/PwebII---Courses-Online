import React, { useEffect, useState } from 'react';
import { Container, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress, Box, useMediaQuery, Stack, IconButton } from '@mui/material';
import api from '../../service/api';
import Menu from '../../components/Menu';
import { Delete, Edit } from "@mui/icons-material";
import EditStudentModal from '../../components/EditStudentModal';
import DeleteConfirmationDialog from '../../components/DeleteConfirmationDialog';

const StudentsList = () => {
	const [students, setStudents] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [openDialog, setOpenDialog] = useState(false);
	const [studentToDelete, setStudentToDelete] = useState(null);
	const [openEditModal, setOpenEditModal] = useState(false);
	const [studentToEdit, setStudentToEdit] = useState(null);
	const isMobile = useMediaQuery('(max-width:600px)');

	useEffect(() => {
		const fetchStudents = async () => {
			try {
				const response = await api.get('/admin/viewStudent');
				setStudents(response.data);
			} catch (err) {
				setError('Erro ao buscar estudantes' + err);
			} finally {
				setLoading(false);
			}
		};
		fetchStudents();
	}, []);


	const handleOpenDialog = (student) => {
		setStudentToDelete(student);
		setOpenDialog(true);
	};


	const handleCloseDialog = () => {
		setOpenDialog(false);
		setStudentToDelete(null);
	};


	const handleDelete = async () => {
		if (studentToDelete) {
			try {
				await api.delete(`/admin/deleteStudent/${studentToDelete.id}`); // Chamada para excluir o estudante
				setStudents(students.filter(student => student.id !== studentToDelete.id)); // Remove o estudante da lista
				handleCloseDialog();
			} catch (err) {
				setError('Erro ao excluir estudante' + err);
			}
		}
	};


	const handleOpenEditModal = (student) => {
		setStudentToEdit(student);
		setOpenEditModal(true);
	}


	const handleCloseEditModal = () => {
		setOpenEditModal(false);
		setStudentToEdit(null);
	};

	const handleUpdateStudent = (updatedStudent) => {
		setStudents((prevStudents) =>
			prevStudents.map((student) =>
				student.id === updatedStudent.id ? updatedStudent : student
			)
		);
	};

	if (isMobile) {
		return (
			<Stack spacing={1} sx={{ width: '100%' }}>
				{students.map((student) => (
					<Paper key={student.id} sx={{ p: 1 }}>
						<Stack spacing={0.5}>
							<Typography><strong>Nome:</strong> {student.User && student.User.name ? student.User.name : 'Nome indisponível'}</Typography>
							<Typography><strong>E-mail:</strong> {student.User && student.User.email ? student.User.email : 'E-mail indisponível'}</Typography>
							<Typography><strong>Telefone:</strong> {student.User && student.User.phone_number ? student.User.phone_number : 'Telefone indisponível'}</Typography>
							<Typography><strong>CPF:</strong> {student.User && student.User.cpf ? student.User.cpf : 'CPF indisponível'}</Typography>
							<Typography><strong>Cidade:</strong> {student.city ? student.city : 'Cidade indisponível'}</Typography>
							<Stack direction="row" spacing={1} justifyContent="center">
								<IconButton color="primary" onClick={() => handleOpenEditModal(student)}>
									<Edit />
								</IconButton>
								<IconButton color="error" onClick={() => handleOpenDialog(student)}>
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
					title={'Deseja excluir o usuário?'}
					message={'Deseja excluir o usuário'}
					onConfirm={handleDelete}
					studentName={studentToDelete ? studentToDelete.User.name : ''}
				/>

				{/* Modal de edição */}
				{studentToEdit && (
					<EditStudentModal
						open={openEditModal}
						onClose={handleCloseEditModal}
						studentToEdit={studentToEdit}
						onUpdate={handleUpdateStudent}
					/>
				)}
			</Stack>
		);
	}

	return (
		<Box sx={{ display: 'flex' }}>
			<Menu userRole="admin" />
			<Container component="main" maxWidth="md">
				<Paper elevation={3} sx={{ mt: 2, p: 3 }}>
					<Typography component="h1" variant="h5" sx={{ mb: 2 }}>
						Lista de Estudantes
					</Typography>
					{loading ? (
						<Box sx={{ display: 'flex', justifyContent: 'center' }}>
							<CircularProgress />
						</Box>
					) : error ? (
						<Typography color="error">{error}</Typography>
					) : (
						<TableContainer>
							<Table sx={{ minWidth: 650 }} aria-label="Tabela de Estudantes">
								<TableHead>
									<TableRow>
										<TableCell>Nome</TableCell>
										<TableCell align="right">E-mail</TableCell>
										<TableCell align="right">Telefone</TableCell>
										<TableCell align="right">CPF</TableCell>
										<TableCell align="right">Cidade</TableCell>
										<TableCell align="right">Ações</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{students.map((student) => (
										<TableRow key={student.id}>
											<TableCell component="th" scope="row">
												{student.User && student.User.name ? student.User.name : 'Nome Indisponível'}
											</TableCell>
											<TableCell align="right">{student.User && student.User.email ? student.User.email : 'Email Indisponível'}</TableCell>
											<TableCell align="right">{student.User && student.User.phone_number ? student.User.phone_number : 'Número de Telefone Indisponível'}</TableCell>
											<TableCell align="right">{student.User && student.User.cpf ? student.User.cpf : 'CPF Indisponível'}</TableCell>
											<TableCell align="right">{student.city ? student.city : 'Cidade Indisponível'}</TableCell>
											<TableCell align="right">
												<IconButton color="primary" onClick={() => handleOpenEditModal(student)}>
													<Edit />
												</IconButton>
												<IconButton color="error" onClick={() => handleOpenDialog(student)}>
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
				title={'Excluir Aluno'}
				message={'Deseja excluir o usuário'}
				onConfirm={handleDelete}
				studentName={studentToDelete ? studentToDelete.User.name : ''}
			/>

			{/* Modal de edição */}
			{studentToEdit && (
				<EditStudentModal
					open={openEditModal}
					onClose={handleCloseEditModal}
					studentToEdit={studentToEdit}
					onUpdate={handleUpdateStudent}
				/>
			)}
		</Box>
	);
};


export default StudentsList;
