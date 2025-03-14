import api from './api';

export const login = async (email, password) => {
    try {
        const response = await api.post('/auth/login', { email, password });
        const { token } = response.data;
        localStorage.setItem('token', token);
        return token;
    } catch (error) {
        throw new Error('Falha na autenticação');
    }
};

export const signUp = async (name, email, cpf, phone_number, type, role, academic_formation, tecnic_especialization) => {
    try {
        const response = await api.post('/auth/createAccount', { name, email, cpf, phone_number, type, role, academic_formation, tecnic_especialization });
        return response.data;
    } catch (error) {
        throw new Error('Falha na criação de conta');
    }
};

export const logout = (setAuthenticated) => {
    localStorage.removeItem('token');
    setAuthenticated(false);
};