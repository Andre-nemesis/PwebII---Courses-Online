import React, { useState, useEffect } from 'react';
import AppRoutes from './routes/Routes';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { jwtDecode } from 'jwt-decode';

function App() {
  const token = localStorage.getItem('token');
  const [isAuthenticated, setAuthenticated] = useState(!!token);
  const [type, setType] = useState(null);

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setType(decoded.role);  
    }
  }, [token]); 

  return (
    <ThemeProvider theme={theme}>
      <AppRoutes
        isAuthenticated={isAuthenticated}
        setAuthenticated={setAuthenticated}
        type={type}
        setType={setType}
      />
    </ThemeProvider>
  );

}

export default App;
