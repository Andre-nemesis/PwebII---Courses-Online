import React, { useEffect, useState } from 'react';
import { Container, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress, Box } from '@mui/material';
import api from '../../../service/api.js';
import Menu from '../Menu.js';

const StudentsList = () => {
	const [students, setStudents] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchStudents = async () => {
			try {
				const response = await api.get('/admin/viewStudent');
				setStudents(response.data);
			} catch (err) {
				setError('Erro ao buscar estudantes'+err);
			} finally {
				setLoading(false);
			}
		};
		fetchStudents();
	}, []);

	return (
		<Box sx={{ display: 'flex' }}>
			<Menu userRole="admin"/>
			<Container component='main' maxWidth='md'>
			<Paper elevation={3} sx={{ mt: 2, p: 3 }}>
				<Typography component='h1' variant='h5' sx={{ mb: 2 }}>
					Lista de Estudantes
				</Typography>
				{loading ? (
					<Box sx={{ display: 'flex', justifyContent: 'center' }}>
						<CircularProgress />
					</Box>
				) : error ? (
					<Typography color='error'>{error}</Typography>
				) : (
					<TableContainer>
						<Table sx={{ minWidth: 650 }} aria-label='Tabela de Estudantes'>
							<TableHead>
								<TableRow>
									<TableCell>Nome</TableCell>
									<TableCell align='right'>E-mail</TableCell>
									<TableCell align='right'>Telefone</TableCell>
									<TableCell align='right'>CPF</TableCell>
									<TableCell align='right'>Cidade</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{students.map((student) => (
									<TableRow key={student.id}>
										<TableCell component='th' scope='row'>
											{student.User && student.User.name ? student.User.name : 'Nome Indisponível'}
										</TableCell>
										<TableCell align='right'>{student.User && student.User.email ? student.User.email : 'Email Indisponível'}</TableCell>
										<TableCell align='right'> {student.User && student.User.phone_number ? student.User.phone_number : 'Número de Telefone Indisponível'}</TableCell>
										<TableCell align='right'> {student.User && student.User.cpf ? student.User.cpf : 'CPF Indisponível'}</TableCell>
										<TableCell align='right'>{student.city}</TableCell>
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

export default StudentsList;