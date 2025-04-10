import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress, Box, Button, IconButton } from '@mui/material';
import api from '../../service/api';
import Menu from '../../components/Menu';
import SearchBar from '../../components/SearchBar.js';
import { Delete, } from "@mui/icons-material";
import DeleteConfirmationDialog from '../../components/DeleteConfirmationDialog';
import ErrorMessageModal from "../../components/ErrorMessageModal";

const StudentsList = () => {
	const [students, setStudents] = useState([]);
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [openDialog, setOpenDialog] = useState(false);
	const [filteredUsers, setFilteredUsers] = useState([]);
	const [isSearch, setSearch] = useState(false);
	const [searchValue, setSearchValue] = useState('');
	const [studentToDelete, setStudentToDelete] = useState(null);
	const [openError, setOpenError] = useState(false);
	const [errorInfo, setErrorInfo] = useState({ type: "error", message: "" });

	useEffect(() => {
		const fetchStudents = async () => {
			try {
				const response = await api.get('/admin/viewStudent');
				setStudents(response.data);
				setFilteredUsers(response.data);
			} catch (err) {
				setError('Erro ao buscar estudantes' + err);
				setErrorInfo({ message: err.message });
				setOpenError(true);
			} finally {
				setLoading(false);
			}
		};
		fetchStudents();
	}, []);

	const fetchUsersByTermo = async (termo) => {
		try {
			const response = await api.get(`/students/search/${encodeURI(termo)}`);
			if (!response.data) {
				throw new Error('Erro ao buscar usuários por termo.');
			}
			return response.data;
		} catch (error) {
			setErrorInfo({ message: "Erro ao buscar por termo" });
			setOpenError(true);
			return null;
		}
	};

	const handleSearchChange = async (e) => {
		const value = e.target.value.trim();
		setSearchValue(value);

		if (!value) {
			setFilteredUsers(students);
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
				setErrorInfo({ message: "Erro ao excluir estudante" });
				setOpenError(true);
			}
		}
	};

	const handleCloseError = () => setOpenError(false);

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column' }}>
			<Menu userRole="admin" roleAdmin={"admin"} />
			<Container component='section' maxWidth='md' sx={{ ml: { md: '240px', lg: '240px' } }}>
				<Typography component='h1' variant='h5' sx={{ color: '#FFFFFF', mb: 2, mt: 5 }}>
					Pesquisar Aluno
				</Typography>
			</Container>

			<Container component="div" maxWidth="md"
				sx={{
					display: 'flex',
					flexDirection: { xs: 'column', sm: 'row' },
					gap: 4,
					ml: { md: '240px' },
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
			</Container>
			<Container component="main" sx={{
				width: {
					xs: "100%",
					sm: "100%",
					md: "calc(100% - 240px)",
					lg: "calc(100% - 240px)"
				},
				ml: { lg: "240px", md: "240px" }
			}}>
				<Paper elevation={3} sx={{ mt: 2, p: 3, bgcolor: '#1E2951' }}>
					<Typography component="h1" variant="h5" sx={{ mb: 2, color: '#FFFFFF' }}>
						Lista de Estudantes
					</Typography>
					{loading ? (
						<Box sx={{ display: 'flex', justifyContent: 'center' }}>
							<CircularProgress />
						</Box>
					) : error ? (
						<Typography color="error">{error}</Typography>
					) : (
						isSearch ? (
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
										{filteredUsers.map((student) => (
											<TableRow key={student.id}>
												<TableCell component="th" scope="row">
													{student.User && student.User.name ? student.User.name : 'Nome Indisponível'}
												</TableCell>
												<TableCell align="right">{student.User && student.User.email ? student.User.email : 'Email Indisponível'}</TableCell>
												<TableCell align="right">{student.User && student.User.phone_number ? student.User.phone_number : 'Número de Telefone Indisponível'}</TableCell>
												<TableCell align="right">{student.User && student.User.cpf ? student.User.cpf : 'CPF Indisponível'}</TableCell>
												<TableCell align="right">{student.city ? student.city : 'Cidade Indisponível'}</TableCell>
												<TableCell align="right">
													<IconButton color="error" onClick={() => handleOpenDialog(student)}>
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
													<IconButton color="error" onClick={() => handleOpenDialog(student)}>
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
				title={'Excluir Aluno'}
				message={'Deseja excluir o usuário'}
				onConfirm={handleDelete}
				studentName={studentToDelete ? studentToDelete.User.name : ''}
			/>

			<ErrorMessageModal
				open={openError}
				onClose={handleCloseError}
				type={errorInfo.type}
				message={errorInfo.message}
			/>
		</Box>
	);
};


export default StudentsList;
