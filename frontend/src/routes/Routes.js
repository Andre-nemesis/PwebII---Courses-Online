import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { SignUpAdmin } from '../components/signUp/signUpAdmin.js';
import { Hello } from '../components/HelloReact';
import MainScreen from '../components/mainScreen.js';
import Login from '../components/login.js';


  const AppRoutes = ({ isAuthenticated, setAuthenticated }) => {
    const handleLogin = () => {
      setAuthenticated(true);
    };

    return (
      <Routes>
        <Route path="/signUp" element={<SignUpAdmin />} />
        <Route path="/Hello" element={<Hello />} />
        <Route path="/login" element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/mainScreen" />} />
        <Route path="/mainScreen" element={<MainScreen />} />

        <Route path="/*"
          element = {
            isAuthenticated ? (
              <MainScreen setAuthenticated = {setAuthenticated} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    );
  };


export default AppRoutes;