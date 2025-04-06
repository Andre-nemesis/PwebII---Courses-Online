import React, { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  CircularProgress,
  Box,
  InputBase,
  IconButton,
  Grid,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Search, Tune, ArrowForwardIos, ArrowBackIos, Add } from "@mui/icons-material";
import api from "../../service/api.js";
import Menu from "../../components/Menu.js";
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/SearchBar.js";
import CreateModuleModal from "../../components/CreateModuleModal.js";
import CoursesList from "../students/coursesList.js";

const CoursesList = ({ userRole, adminRole }) => {
  const [modules, setModules] = useState([]);
  const [filteredModules, setFilteredModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [role, setRole] = useState(null);
  const [roleAdmin, setRoleAdmin] = useState(null);
  const [authenticated, setAuthenticated] = useState(true);
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decoded = jwtDecode(token);
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
  }, []);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await api.get("/modules/");
        setModules(response.data);
        setFilteredModules(response.data);
      } catch (err) {
        setError("Erro ao buscar os módulos: " + err.message);
      } finally {
        setLoading(false);
      }
    };
    
    if (authenticated) {
      fetchModules();
    }
  }, [authenticated]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredModules(modules);
    } else {
      const filtered = modules.filter((mod) =>
        mod.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredModules(filtered);
    }
  }, [searchTerm, modules]);

  if (!authenticated) {
    navigate('/login');
    return null;
  }

  return (
    <Box sx={{ 
      display: "flex", 
      minHeight: "100vh", 
      backgroundColor: "#1E2951", 
      marginTop: "32px",
      width: {
        xs: "100%",
        sm: "100%",
      },
      ml: { lg: "10px", md: "10px" }
    }}>
      {roleAdmin ? (
        <>
          {/* Para Administrador Geral*/}
          <Menu userRole={role} roleAdmin={roleAdmin} />

          <Container sx={{ flexGrow: 1, p: 3 }}>
            <Typography variant="h4" sx={{ color: "white", mb: 3 }}>
              Lista de Módulos
            </Typography>

            <Paper
              component="form"
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#2A3A66",
                borderRadius: 2,
                mb: 3,
                p: 1,
              }}
            >
              <InputBase
                sx={{ 
                  ml: 2, 
                  flex: 1, 
                  color: "#C8D0DA", 
                  backgroundColor: "#1E2951", 
                  border: "1px solid #C8D0DA",
                  p: 1
                }}
                placeholder="Pesquisar módulo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <IconButton sx={{ color: "#C8D0DA" }}>
                <Search />
              </IconButton>

              <Button
                startIcon={<Tune />}
                sx={{
                  color: "#2176FF",
                  borderRadius: 2,
                  backgroundColor: "#040D33",
                  border: "1px solid #2176FF",
                  "&:hover": { backgroundColor: "#2176FF", color: "#EAEFF7" },
                  ml: 1,
                  p: 1,
                }}
              >
                Filtrar
              </Button>
            </Paper>

            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress color="primary" />
              </Box>
            ) : error ? (
              <Typography color="error">{error}</Typography>
            ) : filteredModules.length === 0 ? (
              <Typography color="white">Nenhum módulo encontrado</Typography>
            ) : (
              <Grid container spacing={2}>
                {filteredModules.map((mod, index) => (
                  <Grid item xs={12} sm={6} md={4} key={mod.id || index}>
                    <Paper
                      sx={{
                        p: 2,
                        backgroundColor: "#0F172A",
                        color: "white",
                        borderRadius: 2,
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Typography variant="h6">{mod.name || "Nome Indisponível"}</Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        {mod.qtd_hours ? `${mod.qtd_hours} h` : "Horas Indisponíveis"}
                      </Typography>

                      {mod.topics && mod.topics.length > 0 && (
                        <List dense sx={{ mt: 1, flexGrow: 1 }}>
                          {mod.topics.slice(0, 3).map((topic, idx) => (
                            <ListItem key={idx} sx={{ py: 0 }}>
                              <ListItemText primary={`• ${topic}`} />
                            </ListItem>
                          ))}
                          {mod.topics.length > 3 && (
                            <Typography variant="caption">+ {mod.topics.length - 3} tópicos...</Typography>
                          )}
                        </List>
                      )}

                      <Button
                        sx={{
                          mt: 2,
                          color: "#00C2FF",
                          textTransform: "none",
                          fontWeight: "bold",
                          alignSelf: "flex-start",
                        }}
                        endIcon={<ArrowForwardIos />}
                        onClick={() => navigate(`/modules/${mod.id}`)}
                      >
                        Ver módulo
                      </Button>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            )}

            <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
              <IconButton sx={{ color: "white" }}>
                <ArrowBackIos />
              </IconButton>
              <IconButton sx={{ color: "white" }}>
                <ArrowForwardIos />
              </IconButton>
            </Box>
          </Container>
        </>
      ) : (
        <>
          {/* Para Professor */}
          <Menu userRole={role} />

          <Container sx={{ flexGrow: 1, p: 3, alignItems: "center" }}>
            <Typography variant="h4" sx={{ color: "white", mb: 3 }}>
              Lista de Módulos
            </Typography>

            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
                mb: 3,
                alignItems: 'center'
              }}
            >
              <SearchBar 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ flexGrow: 1 }}
              />

              <Button
                startIcon={<Tune />}
                sx={{
                  color: "#2176FF",
                  backgroundColor: "#040D33",
                  border: "1px solid #2176FF",
                  "&:hover": { backgroundColor: "#2176FF", color: "#EAEFF7" },
                  height: "40px",
                  minWidth: "120px",
                }}
              >
                Filtrar
              </Button>

              <Button 
                variant="contained"
                sx={{
                  bgcolor: '#60BFBF',
                  '&:hover': { bgcolor: '#48A3A3' },
                  px: 2,
                  height: '40px',
                  fontSize: '0.875rem',
                  textTransform: 'none',
                  color: '#040D33',
                  minWidth: '200px'
                }}
                endIcon={<Add sx={{ color: '#040D33' }} />}
                // onClick={() => navigate('../../components/CreateModuleModal.js')}
                onClick={handleOpen}
              >
                Cadastrar Módulo
              </Button>
              <CreateModuleModal open={openModal} onClose={handleClose} />
            </Box>

            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress color="primary" />
              </Box>
            ) : error ? (
              <Typography color="error">{error}</Typography>
            ) : filteredModules.length === 0 ? (
              <Typography color="white">Nenhum módulo encontrado</Typography>
            ) : (
              <Grid container spacing={2}>
                {filteredModules.map((mod, index) => (
                  <Grid item xs={12} sm={6} md={4} key={mod.id || index}>
                    <Paper
                      sx={{
                        p: 2,
                        backgroundColor: "#0F172A",
                        color: "white",
                        borderRadius: 2,
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Typography variant="h6">{mod.name || "Nome Indisponível"}</Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        {mod.qtd_hours ? `${mod.qtd_hours} h` : "Horas Indisponíveis"}
                      </Typography>

                      {mod.topics && mod.topics.length > 0 && (
                        <List dense sx={{ mt: 1, flexGrow: 1 }}>
                          {mod.topics.slice(0, 3).map((topic, idx) => (
                            <ListItem key={idx} sx={{ py: 0 }}>
                              <ListItemText primary={`• ${topic}`} />
                            </ListItem>
                          ))}
                          {mod.topics.length > 3 && (
                            <Typography variant="caption">+ {mod.topics.length - 3} tópicos...</Typography>
                          )}
                        </List>
                      )}

                      <Button
                        sx={{
                          mt: 2,
                          color: "#00C2FF",
                          textTransform: "none",
                          fontWeight: "bold",
                          alignSelf: "flex-start",
                        }}
                        endIcon={<ArrowForwardIos />}
                        onClick={() => navigate(`/modules/${mod.id}`)}
                      >
                        Ver módulo
                      </Button>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            )}

            <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
              <IconButton sx={{ color: "white" }}>
                <ArrowBackIos />
              </IconButton>
              <IconButton sx={{ color: "white" }}>
                <ArrowForwardIos />
              </IconButton>
            </Box>
          </Container>
        </>
      )}
    </Box>
  );
};

export default CoursesList;