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
import CardModule from "../../components/CardModule.js";

const ModulesList = ({ userRole, adminRole }) => {
  const [modules, setModules] = useState([]);
  const [filteredModules, setFilteredModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [role, setRole] = useState(null);
  const [roleAdmin, setRoleAdmin] = useState(null);
  const [authenticated, setAuthenticated] = useState(true);
  const [isSearch, setSearch] = useState(false);
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

  const handleSearchChange = async (e) => {
    const value = e.target.value.trim();
    setSearchTerm(value);

    if (!value) {
      setFilteredModules(modules);
      setSearch(false);
      return;
    }

    const modulesByTerm = await modulesByTerm(value);
    if (modulesByTerm && modulesByTerm.length > 0) {
      setFilteredModules(modulesByTerm);
      setSearch(true);
    } else {
      setFilteredModules([]);
      setSearch(true);
    }
  }; 

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

            <SearchBar onChange={handleSearchChange} />

            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress color="primary" />
              </Box>
            ) : error ? (
              <Typography color="error">{error}</Typography>
            ) : filteredModules.length === 0 ? (
              <Typography color="white">Nenhum módulo encontrado</Typography>
            ) : (
              <Grid container spacing={3}>
                {filteredModules.map((mod, index) => (
                  <Grid item xs={12} sm={6} md={4} key={mod.id || index}  marginTop="25px">
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
            <Typography variant="h4" sx={{ color: "white", mb: 2 }}>
              Lista de Módulos
            </Typography>

            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
                mb: 3,
              }}
            >
              <SearchBar onChange={handleSearchChange} />

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

              <>
                {/* Meus Módulos */}
                <Typography variant="h5" sx={{ color: "white", mt: 4, mb: 2 }}>
                  Meus Módulos
                </Typography>
                <Grid container spacing={3}>
                  {filteredModules.map((mod, index) => (
                    <Grid item sx={{mb:2}} xs={4} sm={2} md={4} key={mod.id || index}>
                      {/* ...card do módulo... */}

                      <CardModule 
                        title={mod.name || "Nome Indisponível"} 
                        description={
                          mod.qtd_hours 
                            ? `${mod.qtd_hours} h • ${mod.topics?.length || 0} tópicos` 
                            : "Horas Indisponíveis"
                        }
                      />
                    </Grid>
                  ))}
                </Grid>

                  <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
                    <IconButton sx={{ color: "white" }}>
                      <ArrowBackIos />
                    </IconButton>
                    <IconButton sx={{ color: "white" }}>
                      <ArrowForwardIos />
                    </IconButton>
                  </Box>

                {/* Módulos Gerais */}
                <Typography variant="h5" sx={{ color: "white", mt: 6, mb: 2 }}>
                  Módulos Gerais
                </Typography>
                <Grid container spacing={3}>
                  {filteredModules.map((mod, index) => (
                    <Grid item sx={{ mb: 4 }} xs={12} sm={6} md={4} key={mod.id || index}>
                      {/* ...card do módulo... */}

                      <CardModule 
                        title={mod.name || "Nome Indisponível"} 
                        description={
                          mod.qtd_hours 
                            ? `${mod.qtd_hours} h • ${mod.topics?.length || 0} tópicos` 
                            : "Horas Indisponíveis"
                        }
                      />
                      
                    </Grid>
                  ))}
                </Grid>
              </>
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

export default ModulesList;