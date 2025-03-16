import React from 'react';
import { Link } from 'react-router-dom';

const Menu = ({ userRole }) => {
  console.log(userRole);
  return (
    <nav style={{ backgroundColor: '#f0f0f0', padding: '10px' }}>
      {/* O Menu já filtra as opções com base no userRole, e o UsersList verifica se o usuário é admin. */}
      <ul style={{ listStyle: 'none', display: 'flex', gap: '20px', margin: 0, padding: 0 }}>
        {userRole === 'admin' && (
          <>
          <li>
            <Link to="/teachers" style={{ textDecoration: 'none', color: '#333' }}>
              Porfessores
            </Link>
          </li>
          <li>
            <Link to="/students" style={{ textDecoration: 'none', color: '#333' }}>
              Estudantes
            </Link>
          </li>
          <li>
            <Link to="/admins" style={{ textDecoration: 'none', color: '#333' }}>
              Outros Administradores
            </Link>
          </li>
          </>
        )}
        {userRole === 'teacher' && (
          <>
            <li>
              <Link to="/categories" style={{ textDecoration: 'none', color: '#333' }}>
                Categorias
              </Link>
            </li>
            <li>
              <Link to="/products" style={{ textDecoration: 'none', color: '#333' }}>
                Produtos
              </Link>
            </li>
            <li>
              <Link to="/sales" style={{ textDecoration: 'none', color: '#333' }}>
                Vendas
              </Link>
            </li>
          </>
        )}
        {userRole === 'student' && (
          <>
            <li>
              <Link to="/subscribed-courses" style={{ textDecoration: 'none', color: '#333' }}>
                Cursos incritos
              </Link>
            </li>
            <li>
              <Link to="/courses" style={{ textDecoration: 'none', color: '#333' }}>
                Cursos
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Menu;