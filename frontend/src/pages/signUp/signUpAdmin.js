import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Container, Button, Typography, Paper, Box, FormControl, FormHelperText, Select, MenuItem, CircularProgress } from '@mui/material';
import { Email, Lock } from '@mui/icons-material';
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

    return (
        <Container component='main' maxWidth='sm'>
            <Paper elevation={3} sx={{ mt: 1, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
                    Cadastrar Administrador
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

                    <FormControl fullWidth margin="normal">
                        <FormHelperText id="role">Tipo de Administrador</FormHelperText>
                        <Select
                            labelId="role"
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
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
                            startAdornment: <Lock sx={{ color: 'action.active', mr: 1 }} />,
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
                        {loading ? <CircularProgress size={24} /> : 'Cadastrar'}
                    </Button>
                    <Button
                        type="button"
                        fullWidth
                        variant="outlined"
                    >
                        Voltar 
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}

export default SignUpAdmin;
