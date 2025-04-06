import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Container, Button, Typography, Paper, Box, CircularProgress, IconButton, InputAdornment } from '@mui/material';
import { Email, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { signUp } from '../../service/auth';
import PhoneIcon from '@mui/icons-material/Phone';
import MaskedTextField from '../../components/maskTextField';
import SuccessMessageModal from '../../components/SuccessMessageModal';
import ErrorMessageModal from '../../components/ErrorMessageModal';

export const SignUpStudent = () => {
	const navigate = useNavigate();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [city, setCity] = useState('');
	const [password, setPassword] = useState('');
	const [cpf, setCpf] = useState('');
	const [phone_number, setPhoneNumber] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [showPassword, setShowPassword] = useState(true);
	const [openMessage, setOpenMessage] = useState(false);
	const [messageInfo, setMessageInfo] = useState({ type: "success", message: "" });
	const [openError, setOpenError] = useState(false);
	const [errorInfo, setErrorInfo] = useState({ type: "error", message: "" });

	const type = 'student';

	const handleSignUp = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		try {
			await signUp(name, email, password, cpf, phone_number, type, undefined, undefined, undefined, city);
			setOpenMessage(true);
			setMessageInfo({ type: "success", message: "Cadastro realizado com sucesso!" });
		} catch (err) {
			setErrorInfo({ type: "error", message: err.message });
            setOpenError(true);
		} finally {
			setLoading(false);
		}
	}

	const isEmailValid = () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

	const passwordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const handleCloseMessage = () => {
        setOpenMessage(false);
        navigate('/login');
    }
    const handleCloseError = () => setOpenError(false);

	return (
		<Box
			sx={{
				minHeight: '100vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: '#040D33',
			}}
		>
			<Container component="main" maxWidth="sm">
				<Paper
					elevation={3}
					sx={{
						p: 4,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'start',
						backgroundColor: '#040D33',
						border: '1px solid rgba(200, 208, 218, 0.25)',
						width: '100%',
					}}
				>
					<Typography
						variant="h4"
						sx={{ mb: 2, color: '#EAEFF7', fontWeight: 'bold' }}
					>
						Learnify
					</Typography>
					<Typography
						component="h1"
						variant="h5"
						sx={{ mb: 2, color: '#EAEFF7', fontWeight: 'bold' }}
					>
						Criar conta
					</Typography>

					<Typography
						component="p"
						variant="body1"
						sx={{ mb: 1, color: '#EAEFF7' }}
					>
						Crie sua conta na Learnify! Caso já possua uma, faça login.
					</Typography>

					<Box component="form" onSubmit={handleSignUp} sx={{ width: '100%' }}>
						{/* Campo Nome */}
						<TextField
							fullWidth
							margin="normal"
							id="name"
							label="Nome Completo"
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							InputProps={{
								sx: {
									backgroundColor: '#1E2951',
									color: '#EAEFF7',
									border: '1px solid rgba(200, 208, 218, 0.25)',
								},
							}}
							InputLabelProps={{
								sx: { color: '#C8D0DA' },
							}}
						/>

						{/* Campo Email */}
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
								startAdornment: <Email sx={{ color: '#C8D0DA', mr: 1 }} />,
								sx: {
									backgroundColor: '#1E2951',
									color: '#EAEFF7',
									border: '1px solid rgba(200, 208, 218, 0.25)',
								},
							}}
							InputLabelProps={{ sx: { color: '#C8D0DA' } }}
						/>

						{/* Campo CPF */}
						<MaskedTextField
							id="cpf"
							value={cpf}
							onChange={(e) => setCpf(e.target.value)}
							mask="999.999.999-99"
							label="CPF"
							sx={{
								backgroundColor: '#1E2951',
								color: '#EAEFF7',
								border: '1px solid rgba(200, 208, 218, 0.25)',
								mt: 2,
								'& .MuiInputBase-input': {
									color: '#C8D0DA',
								},
							}}
							InputLabelProps={{
								sx: { color: '#C8D0DA' },
							}}
						/>

						{/* Campo Cidade */}
						<TextField
							fullWidth
							margin="normal"
							id="city"
							label="Cidade"
							type="text"
							value={city}
							onChange={(e) => setCity(e.target.value)}
							InputProps={{
								sx: {
									backgroundColor: '#1E2951',
									color: '#EAEFF7',
									border: '1px solid rgba(200, 208, 218, 0.25)',
								},
							}}
							InputLabelProps={{
								sx: { color: '#C8D0DA' },
							}}
						/>

						{/* Campo Telefone */}
						<MaskedTextField
							id="phone_number"
							value={phone_number}
							onChange={(e) => setPhoneNumber(e.target.value)}
							mask="(99) 99999-9999"
							label="Número de Telefone"
							icon={<PhoneIcon sx={{ color: '#C8D0DA', mr: 1 }} />}
							sx={{
								mt: 2,
								backgroundColor: '#1E2951',
								color: '#EAEFF7',
								border: '1px solid rgba(200, 208, 218, 0.25)',
								'& .MuiInputBase-input': {
									color: '#C8D0DA',
								},
							}}
							InputLabelProps={{ sx: { color: '#C8D0DA' } }}
						/>

						{/* Campo Senha */}
						<TextField
							fullWidth
							margin="normal"
							id="password"
							label="Senha"
							type={showPassword ? 'text' : 'password'}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							InputProps={{
								startAdornment: <Lock sx={{ color: '#C8D0DA', mr: 1 }} />,
								endAdornment: (
									<InputAdornment position="end">
										<IconButton onClick={passwordVisibility} edge="end" sx={{ color: '#C8D0DA' }}>
											{showPassword ? <Visibility /> : <VisibilityOff />}
										</IconButton>
									</InputAdornment>
								),
								sx: {
									backgroundColor: '#1E2951',
									color: '#EAEFF7',
									border: '1px solid rgba(200, 208, 218, 0.25)',
								},
							}}
							InputLabelProps={{ sx: { color: '#C8D0DA' } }}
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
							sx={{
								mt: 3,
								mb: 2,
								backgroundColor: '#2176FF',
								'&:hover': { bgcolor: '#185BDB' },
								'&.Mui-disabled': {
									backgroundColor: '#283C84',
									color: '#566FC1',
								},
							}}
						>
							{loading ? <CircularProgress size={24} /> : 'Cadastrar-se'}
						</Button>

						{/* Redirecionamento para Login */}
						<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
							<Typography variant="body1" sx={{ color: '#C8D0DA' }}>Já tem conta?</Typography>
							<Button
								type="button"
								variant="text"
								onClick={() => navigate('/login')}
								sx={{ color: '#2176FF', '&:hover': { color: '#185BDB' } }}
							>
								Fazer Login
							</Button>
						</Box>
					</Box>
				</Paper>
			</Container>
			<SuccessMessageModal open={openMessage} onClose={handleCloseMessage} type={messageInfo.type} message={messageInfo.message} />
						<ErrorMessageModal open={openError} onClose={handleCloseError} type={errorInfo.type} message={errorInfo.message} />
		</Box>
	);
}

export default SignUpStudent;
