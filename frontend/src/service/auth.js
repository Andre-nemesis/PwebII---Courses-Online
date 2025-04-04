import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import api from './api';

export const login = async (email, password) => {
    try {
        const response = await api.post('/auth/login', { email, password });
        const { token, username } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        return token;
    } catch (error) {
        throw new Error('Falha na autenticação');
    }
};

export const signUp = async (name, email, password, cpf, phone_number, type, role, academic_formation, tecnic_especialization, city) => {

    try {
        const response = await api.post('/auth/createAccount', { name, email, cpf, phone_number, password, type, role, academic_formation, tecnic_especialization, city });
        return response.data;
    } catch (error) {
        throw new Error('Falha na criação de conta');
    }
};

export const logout = (setAuthenticated) => {
    try {
        localStorage.removeItem('token');
        setAuthenticated(false);
        return true;
    }catch(error) {
        console.error(error);
        return false;
    }
    
};

export const isTokenExpired = () => {
    try {
        const token = localStorage.getItem('token');

        const decode = jwtDecode(token);

        const exp = decode.exp;

        const now = Math.floor(Date.now() / 1000);

        return exp < now;
    } catch (error) {
        console.error("Erro ao verificar o token:", error);
        return true;
    }
}
