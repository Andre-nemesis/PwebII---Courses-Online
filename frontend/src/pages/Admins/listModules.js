import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  IconButton,
  Card,
  CardContent,
  Button
} from '@mui/material';
import {
  Home,
  ViewModule,
  MenuBook,
  Settings,
  ExitToApp,
  ArrowForwardIos,
  ArrowBackIos,
  Search
} from '@mui/icons-material';

const drawerWidth = 240;

export default function ListModules() {
  const [modules, setModules] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get('/api/modules', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        setModules(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar módulos:', error);
      });
  }, []);

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
          <ListItem button sx={{ color: '#fff' }}>
            <ListItemIcon sx={{ color: '#fff' }}><Home /></ListItemIcon>
            <ListItemText primary="Página Inicial" />
          </ListItem>
          <ListItem button selected sx={{ bgcolor: '#101D42', color: '#fff' }}>
            <ListItemIcon sx={{ color: '#fff' }}><ViewModule /></ListItemIcon>
            <ListItemText primary="Módulos" />
          </ListItem>
          <ListItem button sx={{ color: '#fff' }}>
            <ListItemIcon sx={{ color: '#fff' }}><MenuBook /></ListItemIcon>
            <ListItemText primary="Cursos" />
          </ListItem>
          <ListItem button sx={{ color: '#fff' }}>
            <ListItemIcon sx={{ color: '#fff' }}><Settings /></ListItemIcon>
            <ListItemText primary="Configurações" />
          </ListItem>
          <ListItem button sx={{ color: '#fff' }}>
            <ListItemIcon sx={{ color: '#fff' }}><ExitToApp /></ListItemIcon>
            <ListItemText primary="Sair" />
          </ListItem>
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: '#1b2a4e', minHeight: '100vh' }}>
        <Typography variant="h5" sx={{ color: '#fff', mb: 2 }}>Lista de Módulos</Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
          <TextField
            placeholder="Pesquisar módulo"
            variant="filled"
            size="small"
            InputProps={{
              startAdornment: <Search sx={{ color: '#fff', mr: 1 }} />,
              disableUnderline: true,
              style: { backgroundColor: '#1E2A54', color: '#fff', borderRadius: 4 }
            }}
            InputLabelProps={{ style: { color: '#bbb' } }}
            sx={{ flex: 1 }}
          />
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {modules.map((mod, i) => (
            <Card key={i} sx={{ backgroundColor: '#162447', color: '#fff', width: '30%', minWidth: 200 }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight="bold">{mod.name}</Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>10h</Typography>
                <Button endIcon={<ArrowForwardIos />} sx={{ mt: 1, color: '#00BFFF', textTransform: 'none' }}>Ver módulo</Button>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
          <IconButton sx={{ color: '#fff' }}><ArrowBackIos /></IconButton>
          <IconButton sx={{ color: '#fff' }}><ArrowForwardIos /></IconButton>
        </Box>
      </Box>
    </Box>
  );
}
