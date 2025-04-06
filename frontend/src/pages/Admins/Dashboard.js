import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  Card,
  CardContent,
  Button,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { ArrowForwardIos, ArrowBackIos } from '@mui/icons-material';
import Menu from '../../components/Menu';
import api from '../../service/api.js';

export default function DashboardPage() {
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [loadingTeachers, setLoadingTeachers] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get('/courses');
        setCourses(response.data);
      } catch (error) {
        console.error('Erro ao buscar cursos:', error);
      } finally {
        setLoadingCourses(false);
      }
    };

    const fetchTeachers = async () => {
      try {
        const response = await api.get('/teachers');
        setTeachers(response.data);
      } catch (error) {
        console.error('Erro ao buscar professores:', error);
      } finally {
        setLoadingTeachers(false);
      }
    };

    fetchCourses();
    fetchTeachers();
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Menu lateral */}
      <Menu userRole="admin" roleAdmin="content_manager" />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: '#1b2a4e',
          minHeight: '100vh',
        }}
      >
        <Typography variant="h5" sx={{ color: '#fff', mb: 2 }}>
          Página Inicial
        </Typography>

        {/* Cursos */}
        <Typography variant="h6" sx={{ color: '#fff', mb: 1 }}>
          Últimos cursos criados
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <IconButton sx={{ color: '#fff' }}>
            <ArrowBackIos />
          </IconButton>

          {loadingCourses ? (
            <CircularProgress sx={{ color: '#fff', mx: 2 }} />
          ) : (
            courses.slice(0, 3).map((course) => (
              <Card
                key={course.id}
                sx={{ backgroundColor: '#162447', color: '#fff', mx: 1, width: 200 }}
              >
                <CardContent>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {course.name}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    {course.status || 'Status desconhecido'}
                  </Typography>
                  <Typography variant="body2">
                    {course.qtd_hours || 'Duração indisponível'}
                  </Typography>
                  <Button
                    endIcon={<ArrowForwardIos />}
                    sx={{ mt: 1, color: '#00BFFF', textTransform: 'none' }}
                  >
                    Ver curso
                  </Button>
                </CardContent>
              </Card>
            ))
          )}

          <IconButton sx={{ color: '#fff' }}>
            <ArrowForwardIos />
          </IconButton>
        </Box>

        {/* Professores */}
        <Typography variant="h6" sx={{ color: '#fff', mb: 1 }}>
          Professores
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton sx={{ color: '#fff' }}>
            <ArrowBackIos />
          </IconButton>

          {loadingTeachers ? (
            <CircularProgress sx={{ color: '#fff', mx: 2 }} />
          ) : (
            teachers.slice(0, 3).map((teacher) => (
              <Card
                key={teacher.id}
                sx={{ backgroundColor: '#162447', color: '#fff', mx: 1, width: 200 }}
              >
                <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar
                    src="https://randomuser.me/api/portraits/lego/1.jpg"
                    alt={teacher.name}
                    sx={{ width: 40, height: 40, mr: 2 }}
                  />
                  <Box>
                    <Typography variant="subtitle2" fontWeight="bold">
                      {teacher.name}
                    </Typography>
                    <Typography variant="body2">
                      {teacher.specialty || 'Área desconhecida'}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            ))
          )}

          <IconButton sx={{ color: '#fff' }}>
            <ArrowForwardIos />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
