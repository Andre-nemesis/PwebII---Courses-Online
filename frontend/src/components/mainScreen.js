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
      <div style={styles.container}>
          <h1 style={styles.title}>Bem-vindo(a) à Learnify!</h1>
          <button onClick={handleLogout}>Logout</button>
      </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
    padding: '20px',
  },
  title: {
    fontSize: '2.5rem',
    color: '#333',
  },
  text: {
    fontSize: '1.2rem',
    color: '#555',
  },
};

export default MainScreen;