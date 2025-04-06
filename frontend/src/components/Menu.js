import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Drawer, List, ListItemIcon, ListItemText, Divider, ListItemButton, Typography, IconButton, AppBar, Toolbar, Dialog, DialogContent, DialogActions, Button, Box } from '@mui/material';
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
import { useMediaQuery } from '@mui/material';
import { logout } from '../service/auth';

const Menu = ({ userRole, roleAdmin }) => {
  const [isAuthenticated,setAuthenticated] = useState(null);
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const navigate = useNavigate();

  const isMobile = useMediaQuery('(max-width:900px)');

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleOpenConfirmDialog = () => {
    setOpenConfirmDialog(true);
  };

  const handleLogout = () => {
    let result = logout(setAuthenticated);
    if(result) {
      window.location.assign("/login");
    }
    
  };

  const selectedOption = (path) => ({
    backgroundColor: location.pathname === path ? "#2176FF" : "inherit",
  });

  useEffect(() => {
    const username = localStorage.getItem('username');
    setUser(username);
  }, []);

  if (!user) {
    return null;
  }


  const drawerContent = (
    <List>
      <Typography variant="h5" fontWeight={600} sx={{ color: "#fff", textAlign: "center", marginTop: "18px" }}>
        Learnify
      </Typography>
      <Typography variant="subtitle1" sx={{ color: "white", marginTop: "28px", textAlign: "center" }}>
        Bem vindo(a), {user}!
      </Typography>

      <Divider sx={{ backgroundColor: "white", marginTop: "15px" }} /> {/* Linha divisória */}

      {/* Opções para admin */}
      {userRole === 'admin' && roleAdmin === 'admin' && (
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
          <ListItemButton component={Link} to="/admin/settings"
            sx={{
              color: "white",
              "&:hover": {
                backgroundColor: "#05134E"
              },
              ...selectedOption('/admin/settings')
            }}>
            <ListItemIcon sx={{ color: "white" }}>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Configurações" />
          </ListItemButton>
        </>
      )}

      {/* Outro admin */}
      {userRole === 'admin' && roleAdmin === 'content_manager' && (
        <>
          <ListItemButton component={Link} to="/manager/mainScreen"
            sx={{
              color: "white",
              marginTop: "15px",
              "&:hover": {
                backgroundColor: "#05134E"
              },
              ...selectedOption('/manager/mainScreen')
            }}>
            <ListItemIcon sx={{ color: "inherit" }}>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Página Inicial" />
          </ListItemButton>

          <ListItemButton component={Link} to="/manager/module/view"
            sx={{
              color: "white",
              "&:hover": {
                backgroundColor: "#05134E"
              },
              ...selectedOption('/manager/module/view')
            }}>
            <ListItemIcon sx={{ color: "white" }}>
              <ModulesIcon />
            </ListItemIcon>
            <ListItemText primary="Módulos" />
          </ListItemButton>

          <ListItemButton component={Link} to="/manager/courses"
            sx={{
              color: "white",
              "&:hover": {
                backgroundColor: "#05134E"
              },
              ...selectedOption('/manager/courses')
            }}>
            <ListItemIcon sx={{ color: "white" }}>
              <CoursesIcon />
            </ListItemIcon>
            <ListItemText primary="Cursos" />
          </ListItemButton>

          <ListItemButton component={Link} to="/manager/settings"
            sx={{
              color: "white",
              "&:hover": {
                backgroundColor: "#05134E"
              },
              ...selectedOption('/manager/settings')
            }}>
            <ListItemIcon sx={{ color: "white" }}>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Configurações" />
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
          <ListItemButton component={Link} to="/teacher/module/view"
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
          <ListItemButton component={Link} to="/teacher/course/view"
            sx={{
              color: "white",
              "&:hover": {
                backgroundColor: "#05134E"
              },
              ...selectedOption('/teacher/course/view')
            }}>
            <ListItemIcon sx={{ color: "white" }}>
              <CoursesIcon />
            </ListItemIcon>
            <ListItemText primary="Cursos" />
          </ListItemButton>
          <ListItemButton component={Link} to="/teacher/settings"
            sx={{
              color: "white",
              "&:hover": {
                backgroundColor: "#05134E"
              },
              ...selectedOption('/teacher/settings')
            }}>
            <ListItemIcon sx={{ color: "white" }}>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Perfil" />
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
          <ListItemButton component={Link} to="/student/settings"
            sx={{
              color: "white",
              "&:hover": {
                backgroundColor: "#05134E"
              },
              ...selectedOption('/student/settings')
            }}>
            <ListItemIcon sx={{ color: "white" }}>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Configurações" />
          </ListItemButton>
        </>
      )}

      {/* Sair */}
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
          <AppBar position='fixed' sx={{ backgroundColor: "#040D33", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
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
          <Box
            sx={{
              marginLeft: mobileOpen ? '240px' : '0',
              transition: 'margin-left 0.3s ease',
              padding: '20px',
              flexGrow: 1,
            }}
          >
          </Box>
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
        <DialogContent sx={{ textAlign: "center", width: "390px" }}>
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