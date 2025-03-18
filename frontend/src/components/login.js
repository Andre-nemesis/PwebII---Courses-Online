import React, { useState } from "react";
import { login } from '../service/auth';
import { TextField, Container, Button, Typography, Paper, Box, CircularProgress, IconButton, InputAdornment } from '@mui/material';
import { Email, Lock, Visibility, VisibilityOff } from '@mui/icons-material'; 
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); 
  const [showPassword, setShowPassword] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await login(email, password);
      onLogin();
    
    } catch (err) {
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

  const navigate = useNavigate();

  return (
    <Container component="main" maxWidth="xs">
      <Paper sx={{ mt: 8, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'start', backgroundColor: '#1E2951'}}>
        <Typography component="h1" variant="h5" sx={{ mb: 2, color: '#EAEFF7', fontWeight: 'bold' }}>
          Learnify
        </Typography>
        <Typography component="h2" variant="h5" sx={{ mb: 2, color: '#EAEFF7'}}>
          Bem-vindo novamente!
        </Typography>
        <Typography component="p" variant="body1" sx={{ mb: 1, color: '#C8D0DA'}}>
          Faça login para acessar sua conta ou crie uma nova na Learnify.
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%'}}>
          
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
              startAdornment: <Email sx={{ color: '#C8D0DA', mr: 1 }} />, // Ícone de email
              sx: { backgroundColor: '#040D33', color: '#C8D0DA' }, 
            }}

            InputLabelProps={{
              sx: { color: '#C8D0DA' }, // Cor do label para melhorar contraste
            }}
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
              sx: { backgroundColor: '#040D33', color: '#C8D0DA' },
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

            InputLabelProps={{
              sx: { color: '#C8D0DA' }, // Cor do label para melhorar contraste
            }}
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
            disabled={loading || !isEmailValid() || !password} // Desabilita o botão se estiver carregando ou os campos forem inválidos
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: '#2176FF',
              '&:hover': { bgcolor: '#185BDB' },
              '&.Mui-disabled': {
                backgroundColor: '#D2EAFF', // Cor de fundo quando desabilitado
                color: '#C8D0DA', // Cor do texto para melhor contraste
              }
            }}
          >
            {loading ? <CircularProgress size={24} /> : 'Entrar'} {/* Ícone de carregamento */}
          </Button>

          {/* Botão de ir para o cadastro*/}
          <Button
            type="button"
            fullWidth
            variant="outlined"
            onClick={() => navigate('/signUp-student')}
            sx={{
              borderColor: '#2176FF', // Cor da borda
              color: '#2176FF', // Cor da fonte
              '&:hover': {
                borderColor: '#185BDB', // Cor da borda no hover (ligeiramente mais escura)
                backgroundColor: '#1043B7', // Efeito leve de hover
              }
            }}
          >
            Criar Conta
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Login;