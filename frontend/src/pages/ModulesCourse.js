import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Container, Box } from "@mui/material";
import Menu from "../components/Menu";
import api from "../service/api";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const CourseDetails = () => {
  const { id } = useParams();
  const [modules, setModules] = useState([]);
  const [courseName, setCourseName] = useState('');
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);
  const [roleAdmin, setRoleAdmin] = useState(null);
  const [authenticated, setAuthenticated] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setRole(decoded.role);
        setRoleAdmin(decoded.role_adm || null);
        
      } catch (err) {
        console.error('Erro ao decodificar o token:', err);
        setAuthenticated(false);
        navigate('/login');
      }
    } else {
      setAuthenticated(false);
      navigate('/login');
    }

    const fetchModules = async () => {
      try {
        const response = await api.get(`/courses/${id}/modules`);
        console.log('Resposta da API:', response.data);
        setCourseName(response.data.courseName);
        setModules(response.data.modules || []);

      } catch (error) {
        console.error("Erro ao buscar módulos:", error);
        setError("Erro ao carregar módulos do curso");
      } finally {
        setLoading(false);
      }
    };

    fetchModules();
  }, [id, navigate]);


  return (
    <Container 
        sx={{ 
            color: "white", 
            padding: 4, 
            marginTop: "20px", 
            width: {
            xs: "100%",
            sm: "100%",
            md: "calc(100% - 240px)", 
            lg: "calc(100% - 240px)" 
            },
            ml: { lg: "240px", md: "240px" }
        }}>
      <Menu userRole={role} roleAdmin={roleAdmin} setAuthenticated={setAuthenticated} />

      <Typography variant="h4" gutterBottom>Módulos do Curso: {courseName}</Typography>
      {modules.length > 0 ? (
        modules.map((module) => (
          <Box key={module.id} sx={{ mb: 3, p: 2, backgroundColor: '#0A0F29', borderRadius: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{module.name}</Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>{module.description}</Typography>
          </Box>
        ))
      ) : (
        <Typography>Nenhum módulo encontrado para este curso.</Typography>
      )}
    </Container>
  );
};

export default CourseDetails;