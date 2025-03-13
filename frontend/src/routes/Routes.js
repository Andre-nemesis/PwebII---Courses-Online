import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { SignUpAdmin } from '../components/signUp/signUpAdmin.js';
import { Hello } from '../components/HelloReact';


  const AppRoutes = () => {
    return (
      <Routes>
        <Route path="/signUp" element={<SignUpAdmin />} />
        <Route path="/Hello" element={<Hello />} />
      </Routes>
    );
  };


export default AppRoutes;