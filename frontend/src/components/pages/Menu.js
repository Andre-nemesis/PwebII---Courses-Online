import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Drawer, List, ListItemIcon, ListItemText, Divider, ListItemButton, Typography } from '@mui/material';
import {
  Home as HomeIcon,
  School as CoursesIcon,
  Assignment as SubscriptionsIcon,
  CardMembership as CertificatesIcon,
  Settings as SettingsIcon,
  ExitToApp as LogoutIcon,
  People as TeachersIcon,
  Group as StudentsIcon,
  SupervisorAccount as AdminsIcon,
  ViewList as ModulesIcon,
} from '@mui/icons-material';

const Menu = ({ userRole }) => {
  const location = useLocation(); // pegar a rota atual

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove o token
    window.location.href = '/login';
  };

  const selectedOption = (path) => ({
    backgroundColor: location.pathname === path ? '#2176FF' : 'inherit',
  });

  return (
    <Drawer
      variant="permanent" 
      sx={{
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          backgroundColor: '#040D33', 
        },
      }}
    >
      <List>
        <Typography variant="h5" fontWeight={600} sx={{ color: "#fff", textAlign: "center", marginTop: "18px" }}>
          Learnify
        </Typography>
        <Typography variant="subtitle1" sx={{ color: 'white', marginTop: "28px", textAlign: "center" }}>
            Bem vindo(a), !
          </Typography>
        
        <Divider sx={{ backgroundColor: 'white', marginTop: "15px" }} /> {/* Linha divisória */}
        
        {/* Opções comuns */}
        <ListItemButton component={Link} to="/mainScreen" 
          sx={{ 
            color: 'white', 
            marginTop: "15px",
            '&:hover': { 
              backgroundColor: '#05134E'
            },
            ...selectedOption('/mainScreen')
          }}>
          <ListItemIcon sx={{ color: 'inherit' }}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Página Inicial" />
        </ListItemButton>
        <ListItemButton component={Link} to="/courses" 
          sx={{ 
            color: "white", 
            "&:hover": { 
              backgroundColor: "#05134E"
            },
            ...selectedOption('/courses')
          }}>
          <ListItemIcon sx={{ color: 'white' }}>
            <CoursesIcon />
          </ListItemIcon>
          <ListItemText primary="Cursos" />
        </ListItemButton>

        {/* Opções para admin */}
        {userRole === 'admin' && (
          <>
            <ListItemButton component={Link} to="/teachers" 
              sx={{ 
                color: "white", 
                "&:hover": { 
                  backgroundColor: "#05134E"
                },
                ...selectedOption('/teachers')
              }}>
              <ListItemIcon sx={{ color: 'white' }}>
                <TeachersIcon />
              </ListItemIcon>
              <ListItemText primary="Professores" />
            </ListItemButton>
            <ListItemButton component={Link} to="/students" 
              sx={{ 
                color: "white", 
                "&:hover": { 
                  backgroundColor: "#05134E"
                },
                ...selectedOption('/students')
              }}>
              <ListItemIcon sx={{ color: 'white' }}>
                <StudentsIcon />
              </ListItemIcon>
              <ListItemText primary="Estudantes" />
            </ListItemButton>
            <ListItemButton component={Link} to="/admins" 
              sx={{ 
                color: "white", 
                "&:hover": { 
                  backgroundColor: "#05134E"
                },
                ...selectedOption('/admins')
              }}>
              <ListItemIcon sx={{ color: 'white' }}>
                <AdminsIcon />
              </ListItemIcon>
              <ListItemText primary="Outros Administradores" />
            </ListItemButton>
          </>
        )}

        {/* Opções para professor */}
        {userRole === 'teacher' && (
          <>
            <ListItemButton component={Link} to="/module/view" 
              sx={{ 
                color: "white", 
                "&:hover": { 
                  backgroundColor: "#05134E"
                },
                ...selectedOption('/module/view')
              }}>
              <ListItemIcon sx={{ color: 'white' }}>
                <ModulesIcon />
              </ListItemIcon>
              <ListItemText primary="Módulos Criados" />
            </ListItemButton>
            <ListItemButton component={Link} to="/module/view/all" 
              sx={{ 
                color: "white", 
                "&:hover": { 
                  backgroundColor: "#05134E"
                },
                ...selectedOption('/module/view/all')
              }}>
              <ListItemIcon sx={{ color: "white" }}>
                <ModulesIcon />
              </ListItemIcon>
              <ListItemText primary="Lista de Módulos" />
            </ListItemButton>
          </>
        )}

        {/* Opções para estudante */}
        {userRole === 'student' && (
          <>
            <ListItemButton component={Link} to="/subscribed-courses" 
              sx={{ 
                color: "white", 
                "&:hover": { 
                  backgroundColor: "#05134E"
                },
                ...selectedOption('/subscribed-courses')
              }}>
              <ListItemIcon sx={{ color: "white" }}>
                <SubscriptionsIcon />
              </ListItemIcon>
              <ListItemText primary="Inscrições" />
            </ListItemButton>
            <ListItemButton component={Link} to="/certificates" 
              sx={{ 
                color: "white", 
                "&:hover": { 
                  backgroundColor: "#05134E"
                }, 
                ...selectedOption('/certificates')
              }}>
              <ListItemIcon sx={{ color: 'white' }}>
                <CertificatesIcon />
              </ListItemIcon>
              <ListItemText primary="Certificados" />
            </ListItemButton>
          </>
        )}

        {/* Configurações e Sair */}
        <ListItemButton component={Link} to="/settings" 
          sx={{ 
            color: "white", 
            "&:hover": { 
              backgroundColor: "#05134E"
            },
            ...selectedOption('/settings')
          }}>
          <ListItemIcon sx={{ color: 'white' }}>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Configurações" />
        </ListItemButton>
        <ListItemButton onClick={handleLogout} 
          sx={{ 
            color: "white", 
            "&:hover": { 
              backgroundColor: "#05134E"
            }
          }}>
          <ListItemIcon sx={{ color: 'white' }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Sair" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Menu;