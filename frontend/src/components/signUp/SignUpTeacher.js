import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Container, Button, Typography, Paper, Box, CircularProgress, IconButton, InputAdornment } from '@mui/material';
import { Email, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { signUp } from '../../service/auth';
import PhoneIcon from '@mui/icons-material/Phone';
import MaskedTextField from './maskTextField';

export const SignUpTeacher = () => {
	const navigate = useNavigate();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [academic_formation, setAcademicFormation] = useState('');
	const [tecnic_especialization, setTecnicEspecialization] = useState('');
	const [password, setPassword] = useState('');
	const [cpf, setCpf] = useState('');
	const [phone_number, setPhoneNumber] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [showPassword, setShowPassword] = useState(true);

	const type = 'teacher';

	const handleSignUp = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		try {
			await signUp(name, email, password, cpf, phone_number, type, undefined, academic_formation, tecnic_especialization, undefined);
			navigate('/login')
		} catch (err) {
			setError('Falha no cadastro!' +err);
		} finally {
			setLoading(false);
		}
	}

	const isEmailValid = () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

	const passwordVisibility = () => {
		setShowPassword(!showPassword);
	};

	return (
		<Container component='main' maxWidth='sm'>
			<Paper elevation={3} sx={{ mt: 1, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
				<Typography component="h1" variant="h5" sx={{ mb: 2 }}>
						Cadastrar-se
				</Typography>
				<Box component="form" onSubmit={handleSignUp} sx={{ width: '100%' }}>
					<TextField
						fullWidth
						margin="normal"
						id="name"
						label="Nome Completo"
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>

					{/* Campo de Email */}
					<TextField
						fullWidth
						margin="normal"
						id="email"
						label="Email"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						error={!!email && !isEmailValid()}
						helperText={!!email && !isEmailValid() ? 'Email inválido' : ''}
						InputProps={{
								startAdornment: <Email sx={{ color: 'action.active', mr: 1 }} />,
						}}
					/>
					<MaskedTextField
						id="cpf"
						value={cpf}
						onChange={setCpf}
						mask="999.999.999-99"
						label="CPF"
					/>
					<MaskedTextField
						id="phone_number"
						value={phone_number}
						onChange={setPhoneNumber}
						mask="(99) 99999-9999"
						label="Número de Telefone"
						icon={<PhoneIcon sx={{ color: 'action.active', mr: 1 }} />}
						sx={{ mt: 2 }} 
					/>
					<TextField
						fullWidth
						margin="normal"
						id="FormacaoAcademica"
						label="Formação Acadêmica"
						type="text"
						value={academic_formation}
						onChange={(e) => setAcademicFormation(e.target.value)}
					/>
					<TextField
						fullWidth
						margin="normal"
						id="EspecializacaoTec"
						label="Especialização Técnica"
						type="text"
						value={tecnic_especialization}
						onChange={(e) => setTecnicEspecialization(e.target.value)}
					/>

					{/* Campo de Senha */}
					<TextField
						fullWidth
						margin="normal"
						id="password"
						label="Senha"
						type={showPassword ? 'password' : 'text'}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						InputProps={{
							startAdornment: <Lock sx={{ color: 'action.active', mr: 1 }} />,
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										onClick={passwordVisibility}
										edge="end"
									>
										{showPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							)
						}}
					/>

					{/* Exibição de Erro */}
					{error && (
						<Typography color="error" variant="body2" sx={{ mt: 1 }}>
							{error}
						</Typography>
					)}
					{/* Botão de Cadastro */}
					<Button
						type="submit"
						fullWidth
						variant="contained"
						disabled={loading || !isEmailValid() || !password}
						sx={{ mt: 3, mb: 2, bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.dark' } }}
					>
						{loading ? <CircularProgress size={24} /> : 'Cadastrar-se'}
					</Button>

					{/* Botão de ir para o login*/}
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
					</Box>
				</Box>
			</Paper>
		</Container>
	);
}

export default SignUpTeacher;