import { TextField, Container, Button, Typography, Paper, Box, CircularProgress, IconButton, InputAdornment } from '@mui/material';
import { Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../service/api';
import SuccessMessageModal from '../components/SuccessMessageModal';
import ErrorMessageModal from '../components/ErrorMessageModal';

const NewPassword = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(true);
    const [showConfirmPassword, setShowConfirmPassword] = useState(true);
    const [openMessage, setOpenMessage] = useState(false);
    const [messageInfo, setMessageInfo] = useState({ type: "success", message: "" });
    const [openError, setOpenError] = useState(false);
    const [errorInfo, setErrorInfo] = useState({ type: "error", message: "" });

    const handleValidEmail = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            api.post('/users/restet-password', { id, password });
            setMessageInfo({ type: "success", message: "Senha redefinida com sucesso!" });
            setOpenMessage(true);
        } catch (err) {
            setError('Falha ao redefinir senha!');
            setErrorInfo({ type: "error", message: err.message });
            setOpenError(true);
        } finally {
            setLoading(false);
        }
    }

    const passwordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const passwordVisibilityConfirm = () => {
        setShowConfirmPassword(!confirmPassword);
    };

    const passwordValid = () => {
        return password === confirmPassword;
    }

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
                        component="p"
                        variant="body1"
                        sx={{ mb: 1, color: '#EAEFF7' }}
                    >
                        Informe o e-mail para enviar o link para modificar a senha.
                    </Typography>

                    <Box component="form" onSubmit={handleValidEmail} sx={{ width: '100%' }}>
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

                        <TextField
                            fullWidth
                            margin="normal"
                            id="password"
                            label="Confirmar Senha"
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            InputProps={{
                                startAdornment: <Lock sx={{ color: '#C8D0DA', mr: 1 }} />,
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={passwordVisibilityConfirm} edge="end" sx={{ color: '#C8D0DA' }}>
                                            {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
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
                            disabled={loading || !passwordValid()}
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
                            {loading ? <CircularProgress size={24} /> : 'Redefinir Senha'}
                        </Button>

                        {/* Redirecionamento para Login */}
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography variant="body1" sx={{ color: '#C8D0DA' }}>Voltar par ao login?</Typography>
                            <Button
                                type="button"
                                variant="text"
                                onClick={() => navigate('/login')}
                                sx={{ color: '#2176FF', '&:hover': { color: '#185BDB' } }}
                            >
                                Voltar
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


export default NewPassword;