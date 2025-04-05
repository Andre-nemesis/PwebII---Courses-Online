import React, { useState, useEffect } from "react";
import { Container, Grid, Typography, Box, IconButton } from "@mui/material";
import CardCourse from "../../components/CardCourse.js";
import api from "../../service/api.js";
import Menu from "../../components/Menu.js";
import SearchBar from "../../components/SearchBar.js";
import { ArrowBackIos, ArrowForwardIos  }  from "@mui/icons-material";
import CircularProgress from '@mui/material/CircularProgress';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const CoursesList = ({ userRole, adminRole }) => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [role, setRole] = useState(null);
  const [roleAdmin, setRoleAdmin] = useState(null);
  const [authenticated, setAuthenticated] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log('Token decodificado:', decoded);

        setRole(decoded.role);
        setRoleAdmin(decoded.role_adm || null);

      } catch (err) {
        console.error('Erro ao decodificar o token:', err);
        setError('Token inválido');
        setAuthenticated(false);
      }
    } else {
      setAuthenticated(false);
    }

    const fetchCourses = async () => {
      try {
        const response = await api.get('/courses/');
        setFilteredCourses(response.data);

      } catch (err) {
        setError(`Erro ao carregar os cursos: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (!value) {
      setFilteredCourses(courses);

    } else {
      const filtered = courses.filter((course) =>
        course.name?.toLowerCase().includes(value)
      );
      setFilteredCourses(filtered);
    }
  };

  if (!authenticated) {
    navigate('/login');
    return null;
  }

  console.log("userRole:", userRole, "adminRole:", adminRole);
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}> 
      {roleAdmin ? (
        <>
        {/* Para Administrador Geral*/ }
          <Menu userRole={role} roleAdmin={roleAdmin} />
          
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              ml: { md: "240px" },
              width: { xs: "100%", md: "calc(100% - 240px)" },
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Container maxWidth="lg" sx={{ py: 4 }}>
              <Typography variant="h5" sx={{ color: "white", mb: 3 }}>
                Cursos Disponíveis
              </Typography>

              <SearchBar onChange={handleSearchChange} />

              {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress color="primary" />
              </Box>
              ) : error ? (
                <Typography color="error" sx={{ textAlign: "center" }}>{error}</Typography>
              ) : filteredCourses.length === 0 ? (
                <Typography sx={{ color: "white", textAlign: "center" }}>
                  Nenhum curso encontrado
                </Typography>
              ) : (
                <Grid container spacing={4} marginTop="2px">
                  {filteredCourses.map((course) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={course.id} sx={{ display: "flex", justifyContent: "center" }}>
                      <CardCourse
                        id={course.id}
                        title={course.name || "Nome Indisponível"}
                        description={course.qtd_hours ? `${course.qtd_hours} horas` : "Horas Indisponíveis"}
                      />
                    </Grid>
                  ))}
                </Grid>
              )}
              <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <IconButton sx={{ color: "white" }}>
                  <ArrowBackIos />
                </IconButton>
                <IconButton sx={{ color: "white" }}>
                  <ArrowForwardIos />
                </IconButton>
              </Box>
            </Container>
          </Box>
        </>
      ) : (
        <>
        {/* Para Estudante*/ }
          <Menu userRole={role} />

          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              ml: { md: "240px" },
              width: { xs: "100%", md: "calc(100% - 240px)" },
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Container maxWidth="lg" sx={{ py: 4 }}>
              <Typography variant="h5" sx={{ color: "white", mb: 3 }}>
                Cursos Disponíveis
              </Typography>

              <SearchBar onChange={handleSearchChange} />

              {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress color="primary" />
              </Box>
              ) : error ? (
                <Typography color="error" sx={{ textAlign: "center" }}>{error}</Typography>
              ) : filteredCourses.length === 0 ? (
                <Typography sx={{ color: "white", textAlign: "center" }}>
                  Nenhum curso encontrado
                </Typography>
              ) : (
                <Grid container spacing={4} marginTop="2px">
                  {filteredCourses.map((course) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={course.id} sx={{ display: "flex", justifyContent: "center" }}>
                      <CardCourse
                        id={course.id}
                        title={course.name || "Nome Indisponível"}
                        description={course.qtd_hours ? `${course.qtd_hours} horas` : "Horas Indisponíveis"}
                      />
                    </Grid>
                  ))}
                </Grid>
              )}
              <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <IconButton sx={{ color: "white" }}>
                  <ArrowBackIos />
                </IconButton>
                <IconButton sx={{ color: "white" }}>
                  <ArrowForwardIos />
                </IconButton>
              </Box>
            </Container>
          </Box>
        </>
      )}
    </Box>
  );
};

export default CoursesList;