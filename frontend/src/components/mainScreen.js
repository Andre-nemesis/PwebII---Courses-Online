import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../service/auth.js'; 

const MainScreen = ({ setAuthenticated }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(setAuthenticated);
        navigate('/login'); 
    };

    return (
        <div>
            <h1>Bem-vindo à Tela Principal</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default MainScreen;
