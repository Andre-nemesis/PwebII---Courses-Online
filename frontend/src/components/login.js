import React, { useState } from "react";
import { login, isTokenExpired } from '../service/auth';
import { TextField, Container, Button, Typography, Paper, Box, CircularProgress, IconButton, InputAdornment } from '@mui/material';
import { Email, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import SuccessMessageModal from '../components/SuccessMessageModal';
import ErrorMessageModal from '../components/ErrorMessageModal';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [openMessage, setOpenMessage] = useState(false);
  const [messageInfo, setMessageInfo] = useState({ type: "success", message: "" });
  const [openError, setOpenError] = useState(false);
  const [errorInfo, setErrorInfo] = useState({ type: "error", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await login(email, password);
      setMessageInfo({ type: "success", message: "Login efetuado com sucesso!" });
      setOpenMessage(true);
      onLogin();
    } catch (err) {
      setErrorInfo({ type: "error", message: "Falha no login" });
      setError('E-mail ou senha inválida!');

    } finally {
      setLoading(false);
    }
  };

  const isEmailValid = () => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const passwordVisibility = () => {
    setShowPassword(!showPassword);
  };
  if (isTokenExpired) {
    localStorage.removeItem('token');
  }

  const navigate = useNavigate();

  const handleCloseMessage = () => setOpenMessage(false);
  const handleCloseError = () => setOpenError(false);

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#040D33', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Container component="main" maxWidth="xs">
        <Paper
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            backgroundColor: '#040D33',
            border: '1px solid rgba(200, 208, 218, 0.25)'
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mb: 2, color: '#EAEFF7', fontWeight: 'bold' }}>
            Learnify
          </Typography>
          <Typography component="h2" variant="h5" sx={{ mb: 2, color: '#EAEFF7' }}>
            Bem-vindo novamente!
          </Typography>
          <Typography component="p" variant="body1" sx={{ mb: 1, color: '#C8D0DA' }}>
            Faça login para acessar sua conta ou crie uma nova na Learnify.
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
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
              helperText={!!email && !isEmailValid() ? 'Email ou senha inválida' : ''}
              InputProps={{
                startAdornment: <Email sx={{ color: '#C8D0DA', mr: 1 }} />,
                sx: { backgroundColor: '#1E2951', color: '#C8D0DA', border: '1px solid rgba(200, 208, 218, 0.25)' }
              }}
              InputLabelProps={{ sx: { color: '#C8D0DA' } }}
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
                startAdornment: <Lock sx={{ color: '#C8D0DA', mr: 1 }} />,
                sx: { backgroundColor: '#1E2951', color: '#C8D0DA', border: '1px solid rgba(200, 208, 218, 0.25)' },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={passwordVisibility}
                      edge="end"
                      sx={{ color: '#C8D0DA' }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              InputLabelProps={{ sx: { color: '#C8D0DA' } }}
            />

            {/* Exibição de Erro */}
            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}

            {/* Botão de Login */}
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
                }
              }}
            >
              {loading ? <CircularProgress size={24} /> : 'Entrar'}
            </Button>

            {/* Botão de ir para o cadastro*/}
            <Button
              type="button"
              fullWidth
              variant="outlined"
              onClick={() => navigate('/signUp-student')}
              sx={{
                borderColor: '#2176FF',
                color: '#2176FF',
                '&:hover': {
                  borderColor: '#185BDB',
                  backgroundColor: '#1043B7',
                }
              }}
            >
              Criar Conta
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '18px' }}>
              <Typography sx={{ color: '#C8D0DA', fontSize: '14px' }}>Esqueceu a senha?</Typography>
              <Button
                type="button"
                variant="text"
                onClick={() => navigate('/verify-email')}
                sx={{ color: '#2176FF', '&:hover': { color: '#185BDB', fontSize: '14px' } }}
              >
                Recuperar Senha
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

export default Login;