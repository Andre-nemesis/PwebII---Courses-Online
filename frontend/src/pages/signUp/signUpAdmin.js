import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Container, Button, Typography, Paper, Box, FormControl, FormHelperText, Select, MenuItem, CircularProgress, InputAdornment, IconButton } from '@mui/material';
import { Email, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { signUp } from '../../service/auth';
import PhoneIcon from '@mui/icons-material/Phone';
import MaskedTextField from '../../components/maskTextField';

export const SignUpAdmin = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpf, setCpf] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [role, setRole] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); // Adicionado para evitar erro
    const [showPassword, setShowPassword] = useState(true);

    const type = 'admin';

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await signUp(name, email, password, cpf, phone_number, type, role,undefined,undefined,undefined);
            navigate('/login');
        } catch (err) {
            setError('Falha na criação do Administrador!');
        } finally {
            setLoading(false);
        }
    }

    const isEmailValid = () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const passwordVisibility = () => {
        setShowPassword(!showPassword);
    };
    
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
            <Container component='main' maxWidth='sm'>
            <Paper elevation={3} 
                sx={{ 
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'start',
                    backgroundColor: '#040D33',
                    border: '1px solid rgba(200, 208, 218, 0.25)',
                    width: '100%', 
                }}>
                <Typography
                    variant="h4"
                    sx={{ mb: 2, color: '#EAEFF7', fontWeight: 'bold' }}
                >
                    Learnify
                </Typography>
                <Typography component="h1" variant="h5" sx={{ mb: 2, color: '#EAEFF7', fontWeight: 'bold' }}>
                    Criar Conta
                </Typography>

                <Typography
                    component="p"
                    variant="body1"
                    sx={{ mb: 1, color: '#EAEFF7' }}
                >
                    Crie sua conta na Learnify! Caso já possua uma, faça login.
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
                            startAdornment: <Email sx={{ color: '#C8D0DA', mr: 1 }} />,
                            sx: {
                                backgroundColor: '#1E2951',
                                color: '#EAEFF7',
                                border: '1px solid rgba(200, 208, 218, 0.25)',
                            },
                        }}
                        InputLabelProps={{ sx: { color: '#C8D0DA' } }}
                    />
                    <MaskedTextField
                        id="cpf"
                        value={cpf}
                        onChange={setCpf}
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
                    <MaskedTextField
                        id="phone_number"
                        value={phone_number}
                        onChange={setPhoneNumber}
                        mask="(99) 99999-9999"
                        label="Número de Telefone"
                        icon={<PhoneIcon sx={{ color: '#EAEFF7', mr: 1 }} />}
                        sx={{
                            mt: 3,
                            backgroundColor: '#1E2951',
                            color: '#EAEFF7',
                            '& .MuiInputBase-input': {
                              color: '#C8D0DA',
                            },
                          }}
                          InputProps={{
                            style: { 
                              border: '1px solid rgba(200, 208, 218, 0.25)', 
                              borderRadius: '4px', 
                              padding: '5px'
                            }
                          }}
                          InputLabelProps={{ sx: { color: '#C8D0DA' } }}
                    />

                    {/* Campo de tipo de administrador */}
                    <FormControl fullWidth margin="normal">
                        <FormHelperText id="role" sx={{ color: '#C8D0DA' }}>Tipo de Administrador</FormHelperText>
                        <Select
                            labelId="role"
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            sx={{
                                color: '#C8D0DA',
                                backgroundColor: '#1E2951',
                                '.MuiOutlinedInput-notchedOutline': {
                                  borderColor: 'rgba(200, 208, 218, 0.25)',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                  borderColor: 'rgba(200, 208, 218, 0.5)',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                  borderColor: 'rgba(200, 208, 218, 0.75)',
                                },
                                '.MuiSelect-icon': {
                                    color: '#C8D0DA',
                                }
                              }}
                              MenuProps={{
                                PaperProps: {
                                  sx: {
                                    backgroundColor: '#1E2951',
                                    color: '#C8D0DA',
                                  },
                                },
                              }}
                        >
                            <MenuItem value={'Admin'}>Admin</MenuItem>
                            <MenuItem value={'content_manager'}>Content Manager</MenuItem>
                        </Select>
                    </FormControl>

                    {/* Campo de Senha */}
                    <TextField
                        fullWidth
                        margin="normal"
                        id="password"
                        label="Senha"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                            startAdornment: <Lock sx={{ color: '#C8D0DA', mr: 1 }} />,
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton onClick={passwordVisibility} edge="end" sx={{ color: '#C8D0DA' }}>
                                  {showPassword ? <VisibilityOff /> : <Visibility />}
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
                        {loading ? <CircularProgress size={24} /> : 'Cadastrar'}
                    </Button>
                    <Button
                        type="button"
                        fullWidth
                        variant="outlined"
                        onClick={() => navigate('/login')}
				        sx={{ color: '#2176FF', '&:hover': { color: '#185BDB' } }}
                    >
                        Fazer Login 
                    </Button>
                </Box>
            </Paper>
            </Container>
        </Box>
    );
}

export default SignUpAdmin;
