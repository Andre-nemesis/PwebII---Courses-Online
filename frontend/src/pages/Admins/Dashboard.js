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
import { useNavigate } from 'react-router-dom';

export default function DashboardPage() {
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [loadingTeachers, setLoadingTeachers] = useState(true);
  const [courseIndex, setCourseIndex] = useState(0);
  const [teacherIndex, setTeacherIndex] = useState(0);
  const cardsPerPage = 4;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get('/courses/');
        console.log(response.data);
        setCourses(response.data);
      } catch (error) {
        console.error('Erro ao buscar cursos:', error);
      } finally {
        setLoadingCourses(false);
      }
    };

    const fetchTeachers = async () => {
      try {
        const response = await api.get('/teachers/');
        console.log(response.data);
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

  const handleNextCourses = () => {
    if (courseIndex + cardsPerPage < courses.length) {
      setCourseIndex(courseIndex + 1);
    }
  };

  const handlePrevCourses = () => {
    if (courseIndex > 0) {
      setCourseIndex(courseIndex - 1);
    }
  };

  const handleNextTeachers = () => {
    if (teacherIndex + cardsPerPage < teachers.length) {
      setTeacherIndex(teacherIndex + 1);
    }
  };

  const handlePrevTeachers = () => {
    if (teacherIndex > 0) {
      setTeacherIndex(teacherIndex - 1);
    }
  };

  return (
    <Box sx={{ display: 'flex', m: 2 }}>
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
          <IconButton 
            onClick={handlePrevCourses} 
            sx={{ color: '#fff' }}
            disabled={courseIndex === 0}
          >
            <ArrowBackIos />
          </IconButton>

          {loadingCourses ? (
            <CircularProgress sx={{ color: '#fff', mx: 2 }} />
          ) : (
            courses
              .slice(courseIndex, courseIndex + cardsPerPage)
              .map((course) => (
                <Card
                  key={course.id}
                  sx={{ backgroundColor: '#162447', color: '#fff', mx: 1, width: 200 }}
                >
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {course.name}
                    </Typography>
                    <Typography variant="body2">
                      {course.qtd_hours || 'Duração indisponível'}
                    </Typography>
                    <Button
                      endIcon={<ArrowForwardIos />}
                      sx={{ mt: 1, color: '#00BFFF', textTransform: 'none' }}
                      onClick={() => {
                        navigate(`/manager/courses/${course.id}/modules`);
                      }}
                    >
                      Ver curso
                    </Button>
                  </CardContent>
                </Card>
              ))
          )}

          <IconButton 
            onClick={handleNextCourses} 
            sx={{ color: '#fff' }}
            disabled={courseIndex + cardsPerPage >= courses.length}
          >
            <ArrowForwardIos />
          </IconButton>
        </Box>

        {/* Professores */}
        <Typography variant="h6" sx={{ color: '#fff', mb: 1 }}>
          Professores
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton 
            onClick={handlePrevTeachers} 
            sx={{ color: '#fff' }}
            disabled={teacherIndex === 0}
          >
            <ArrowBackIos />
          </IconButton>

          {loadingTeachers ? (
            <CircularProgress sx={{ color: '#fff', mx: 2 }} />
          ) : (
            teachers
              .slice(teacherIndex, teacherIndex + cardsPerPage)
              .map((teacher) => (
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
                        {teacher.User.name}
                      </Typography>
                      <Typography variant="body2">
                        {teacher.academic_formation || 'Área desconhecida'}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              ))
          )}

          <IconButton 
            onClick={handleNextTeachers} 
            sx={{ color: '#fff' }}
            disabled={teacherIndex + cardsPerPage >= teachers.length}
          >
            <ArrowForwardIos />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}