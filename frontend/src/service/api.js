import axios from 'axios';
import { logout } from './auth';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', 
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


api.interceptors.response.use(
  async response => {
  return response;
}, function (error) {

    const { response: { data, status } } = error;

    //verifica se o código de resposta é 401 (não autorizado ou 500 (erro interno no servidor)
    if (status === 401) {
      logout();
      window.location.href = '/sign-in';
      return false;
    } else if (status === 500) {
      //loadAlert('error', 'Erro interno no servidor da API.');
      //logout();
      //window.location.href = '/sign-in';
      return false;
    }
});

export default api;