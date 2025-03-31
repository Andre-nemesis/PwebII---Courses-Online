import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Menu from './Menu.js';

const MainScreen = () => {
  

  return (
    <div>
      <Menu userRole={userRole} />
      <Outlet context={{ userRole }} /> {/* Passa o userRole para as rotas filhas */}
    </div>
  );
};

export default MainScreen;