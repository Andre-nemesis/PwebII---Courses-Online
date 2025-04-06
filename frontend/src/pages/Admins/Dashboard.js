import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Typography, Avatar, Card, CardContent, Button, IconButton } from '@mui/material';
import { Home, ViewModule, MenuBook, Settings, ExitToApp, ArrowForwardIos, ArrowBackIos } from '@mui/icons-material';

const drawerWidth = 240;

export default function DashboardPage() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#0F2C59',
            color: '#fff',
          },
        }}
      >
        <Box sx={{ p: 2, borderBottom: '1px solid #ccc' }}>
          <Typography variant="h6" sx={{ color: '#fff' }}>Learnify</Typography>
          <Typography variant="body2" sx={{ color: '#fff' }}>Bem vindo [Usuário]</Typography>
        </Box>
        <List>
          <ListItem button selected sx={{ bgcolor: '#101D42', color: '#fff' }}>
            <ListItemIcon sx={{ color: '#fff' }}><Home /></ListItemIcon>
            <ListItemText primary="Página Inicial" />
          </ListItem>
          <ListItem button sx={{ color: '#fff', '&:hover': { backgroundColor: '#0095cc' } }}>
            <ListItemIcon sx={{ color: '#fff' }}><ViewModule /></ListItemIcon>
            <ListItemText primary="Módulos" />
          </ListItem>
          <ListItem button sx={{ color: '#fff', '&:hover': { backgroundColor: '#0095cc' } }}>
            <ListItemIcon sx={{ color: '#fff' }}><MenuBook /></ListItemIcon>
            <ListItemText primary="Cursos" />
          </ListItem>
          <ListItem button sx={{ color: '#fff', '&:hover': { backgroundColor: '#0095cc' } }}>
            <ListItemIcon sx={{ color: '#fff' }}><Settings /></ListItemIcon>
            <ListItemText primary="Configurações" />
          </ListItem>
          <ListItem button sx={{ color: '#fff', '&:hover': { backgroundColor: '#0095cc' } }}>
            <ListItemIcon sx={{ color: '#fff' }}><ExitToApp /></ListItemIcon>
            <ListItemText primary="Sair" />
          </ListItem>
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: '#1b2a4e', minHeight: '100vh' }}>
        <Typography variant="h5" sx={{ color: '#fff', mb: 2 }}>Página Inicial</Typography>

        <Typography variant="h6" sx={{ color: '#fff', mb: 1 }}>Últimos cursos criados</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <IconButton sx={{ color: '#fff' }}><ArrowBackIos /></IconButton>

          {[1, 2, 3].map((_, i) => (
            <Card key={i} sx={{ backgroundColor: '#162447', color: '#fff', mx: 1, width: 200 }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight="bold">Front-end</Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>Iniciado</Typography>
                <Typography variant="body2">2h</Typography>
                <Button endIcon={<ArrowForwardIos />} sx={{ mt: 1, color: '#00BFFF', textTransform: 'none' }}>Ver curso</Button>
              </CardContent>
            </Card>
          ))}

          <IconButton sx={{ color: '#fff' }}><ArrowForwardIos /></IconButton>
        </Box>

        <Typography variant="h6" sx={{ color: '#fff', mb: 1 }}>Professores</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton sx={{ color: '#fff' }}><ArrowBackIos /></IconButton>

          {[1, 2, 3].map((_, i) => (
            <Card key={i} sx={{ backgroundColor: '#162447', color: '#fff', mx: 1, width: 200 }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  alt="Alice Ocean"
                  sx={{ width: 40, height: 40, mr: 2 }}
                />
                <Box>
                  <Typography variant="subtitle2" fontWeight="bold">Alice Ocean</Typography>
                  <Typography variant="body2">Professor(a) de Front-end</Typography>
                </Box>
              </CardContent>
            </Card>
          ))}

          <IconButton sx={{ color: '#fff' }}><ArrowForwardIos /></IconButton>
        </Box>
      </Box>
    </Box>
  );
}
