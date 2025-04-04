import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Menu from './Menu.js';

const MainScreen = ({ setAuthenticated,userRole, roleAdm}) => {

  return (
    <div>
      {roleAdm ? (
        <Menu userRole={userRole} roleAdmin={roleAdm} />
      ):(
        <Menu userRole={userRole} />
      )}
      
      <Outlet context={{ userRole }} /> {/* Passa o userRole para as rotas filhas */}
    </div>
  );
};

export default MainScreen;