import React, { useState,useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Drawer, List, ListItemIcon, ListItemText, Divider, ListItemButton, Typography, IconButton, AppBar, Toolbar, Dialog, DialogContent, DialogActions, Button } from '@mui/material';
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
  Menu as MenuIcon
} from '@mui/icons-material';
import { useMediaQuery,CircularProgress } from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import api from '../../service/api';

const Menu = ({ setAuthenticated, userRole }) => {
  const location = useLocation();
  const token = localStorage.getItem('token');
  const [user,setUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const isMobile = useMediaQuery('(max-width:900px)');

  const handleDrawerToggle = () => {
    // Controlando quando o drawer será aberto ou fechado
    setMobileOpen((prevState) => !prevState);
  };

  const handleOpenConfirmDialog = () => {
    // Abrindo o dialog de confirmação de logout
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    // Fechando o dialog de confirmação de logout
    setOpenConfirmDialog(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove o token
    window.location.href = '/login';
  };

  const selectedOption = (path) => ({
    backgroundColor: location.pathname === path ? "#2176FF" : "inherit",
  });

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      const type = decoded.role;
      
      const fetchUserData = async () => {
        try {
          let userData;
          if (type === 'admin') {
            userData = await api.get('/admin/view/' + decoded.id);
          } else if (type === 'student') {
            userData = await api.get('/student/' + decoded.id);
          } else if (type === 'teacher') {
            userData = await api.get('/teacher/' + decoded.id);
          }
          
          setUser(userData.data); 

        } catch (error) {
          console.error("Erro ao carregar dados do usuário", error);
          console.log(token);
        }
      };

      fetchUserData(); 
    }
  }, [token]);

  if (!user) {
    return <CircularProgress size={24} />; 
  }


  const drawerContent = (
    <List>
      <Typography variant="h5" fontWeight={600} sx={{ color: "#fff", textAlign: "center", marginTop: "18px" }}>
        Learnify
      </Typography>
      <Typography variant="subtitle1" sx={{ color: "white", marginTop: "28px", textAlign: "center" }}>
        Bem vindo(a), {user.User.name} !
      </Typography>

      <Divider sx={{ backgroundColor: "white", marginTop: "15px" }} /> {/* Linha divisória */}

      {/* Opções para admin */}
      {userRole === 'admin' && (
        <>
          <ListItemButton component={Link} to="/admin/mainScreen"
            sx={{
              color: "white",
              marginTop: "15px",
              "&:hover": {
                backgroundColor: "#05134E"
              },
              ...selectedOption('/admin/mainScreen')
            }}>
            <ListItemIcon sx={{ color: "inherit" }}>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Página Inicial" />
          </ListItemButton>
          <ListItemButton component={Link} to="/admin/courses"
            sx={{
              color: "white",
              "&:hover": {
                backgroundColor: "#05134E"
              },
              ...selectedOption('/admin/courses')
            }}>
            <ListItemIcon sx={{ color: "white" }}>
              <CoursesIcon />
            </ListItemIcon>
            <ListItemText primary="Cursos" />
          </ListItemButton>

          <ListItemButton component={Link} to="/admin/module/view/all"
            sx={{
              color: "white",
              "&:hover": {
                backgroundColor: "#05134E"
              },
              ...selectedOption('/admin/module/view/all')
            }}>
            <ListItemIcon sx={{ color: "white" }}>
              <ModulesIcon />
            </ListItemIcon>
            <ListItemText primary="Módulos" />
          </ListItemButton>
          <ListItemButton component={Link} to="/admin/teachers"
            sx={{
              color: "white",
              "&:hover": {
                backgroundColor: "#05134E"
              },
              ...selectedOption('/admin/teachers')
            }}>
            <ListItemIcon sx={{ color: "white" }}>
              <TeachersIcon />
            </ListItemIcon>
            <ListItemText primary="Professores" />
          </ListItemButton>
          <ListItemButton component={Link} to="/admin/students"
            sx={{
              color: "white",
              "&:hover": {
                backgroundColor: "#05134E"
              },
              ...selectedOption('/admin/students')
            }}>
            <ListItemIcon sx={{ color: "white" }}>
              <StudentsIcon />
            </ListItemIcon>
            <ListItemText primary="Estudantes" />
          </ListItemButton>
          <ListItemButton component={Link} to="/admin/admins"
            sx={{
              color: "white",
              "&:hover": {
                backgroundColor: "#05134E"
              },
              ...selectedOption('/admin/admins')
            }}>
            <ListItemIcon sx={{ color: "white" }}>
              <AdminsIcon />
            </ListItemIcon>
            <ListItemText primary="Outros Administradores" />
          </ListItemButton>
        </>
      )}

      {/* Opções para professor */}
      {userRole === 'teacher' && (
        <>
          <ListItemButton component={Link} to="/teacher/mainScreen"
            sx={{
              color: "white",
              marginTop: "15px",
              "&:hover": {
                backgroundColor: "#05134E"
              },
              ...selectedOption('/teacher/mainScreen')
            }}>
            <ListItemIcon sx={{ color: "inherit" }}>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Página Inicial" />
          </ListItemButton>
          <ListItemButton component={Link} to="admin/module/view"
            sx={{
              color: "white",
              "&:hover": {
                backgroundColor: "#05134E"
              },
              ...selectedOption('/teacher/module/view')
            }}>
            <ListItemIcon sx={{ color: "white" }}>
              <ModulesIcon />
            </ListItemIcon>
            <ListItemText primary="Módulos" />
          </ListItemButton>
        </>
      )}

      {/* Opções para estudante */}
      {userRole === 'student' && (
        <>
          <ListItemButton component={Link} to="/student/mainScreen"
            sx={{
              color: "white",
              marginTop: "15px",
              "&:hover": {
                backgroundColor: "#05134E"
              },
              ...selectedOption('/student/mainScreen')
            }}>
            <ListItemIcon sx={{ color: "inherit" }}>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Página Inicial" />
          </ListItemButton>
          <ListItemButton component={Link} to="/student/courses"
            sx={{
              color: "white",
              "&:hover": {
                backgroundColor: "#05134E"
              },
              ...selectedOption('/student/courses')
            }}>
            <ListItemIcon sx={{ color: "white" }}>
              <CoursesIcon />
            </ListItemIcon>
            <ListItemText primary="Cursos" />
          </ListItemButton>

          <ListItemButton component={Link} to="/student/subscribed-courses"
            sx={{
              color: "white",
              "&:hover": {
                backgroundColor: "#05134E"
              },
              ...selectedOption('/student/subscribed-courses')
            }}>
            <ListItemIcon sx={{ color: "white" }}>
              <SubscriptionsIcon />
            </ListItemIcon>
            <ListItemText primary="Inscrições" />
          </ListItemButton>
          <ListItemButton component={Link} to="/student/certificates"
            sx={{
              color: "white",
              "&:hover": {
                backgroundColor: "#05134E"
              },
              ...selectedOption('/student/certificates')
            }}>
            <ListItemIcon sx={{ color: "white" }}>
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
        <ListItemIcon sx={{ color: "white" }}>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Configurações" />
      </ListItemButton>
      <ListItemButton onClick={handleOpenConfirmDialog}
        sx={{
          color: "white",
          "&:hover": {
            backgroundColor: "#05134E"
          }
        }}>
        <LogoutIcon sx={{ mr: 4 }} />
        <ListItemText primary="Sair" />
      </ListItemButton>
    </List>
  )

  return (
    <>
      {isMobile ? (
        <>
          <AppBar position='fixed' sx={{ backgroundColor: "#040D33" }}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap>
                Learnify
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer variant='temporary' open={mobileOpen} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true }}
            sx={{
              '& .MuiDrawer-paper': {
                width: 240,
                backgroundColor: '#040D33',
                color: 'white',
              },
            }}
          >
            {drawerContent}
          </Drawer>
        </>
      ) : (
        <Drawer variant='permanent'
          sx={{
            width: 220,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 240,
              backgroundColor: '#040D33',
              color: 'white',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}

      <Dialog open={openConfirmDialog} onClose={handleCloseConfirmDialog} color="#EAEFF7">
        <DialogContent sx={{ textAlign: "center" }}>
          <Typography sx={{ fontSize: "1.3rem", fontWeight: "bold", paddingTop: "5px" }}>
            Logout
          </Typography>
          <Typography sx={{ fontSize: "1rem", paddingTop: "15px" }}>
            Você deseja sair do sistema? Ao sair será
            <br />necessário realizar o login novamente.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", gap: 2, padding: "23px 70px", marginTop: "-20px" }}>
          <Button onClick={handleLogout}
            sx={{
              color: "white",
              backgroundColor: "#FF342D",
              padding: "5px 25px",
              "&:hover": { backgroundColor: "#FF170F" }
            }}
          >
            Sair
          </Button>
          <Button onClick={handleCloseConfirmDialog}
            sx={{
              color: "black",
              backgroundColor: "#60BFBF",
              padding: "5px 30px",
              "&:hover": { backgroundColor: "#50B7B7" }
            }}
          >
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>

    </>
  );
};

export default Menu;
