import React, { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  CircularProgress,
  Box,
  Grid,
  Button,
  IconButton,
} from "@mui/material";
import { Search, ArrowForwardIos, ArrowBackIos, Add } from "@mui/icons-material";
import api from "../../service/api.js";
import Menu from "../../components/Menu.js";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/SearchBar.js";
import CreateModuleModal from "../../components/CreateModuleModal.js";
import CardModule from "../../components/CardModule.js";

const ModulesList = () => {
  const [modules, setModules] = useState([]);
  const [myModules, setMyModules] = useState([]);
  const [filteredModules, setFilteredModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [role, setRole] = useState(null);
  const [roleAdmin, setRoleAdmin] = useState(null);
  const [id, setId] = useState(null);
  const [authenticated, setAuthenticated] = useState(true);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  const [myModulesIndex, setMyModulesIndex] = useState(0);
  const [filteredModulesIndex, setFilteredModulesIndex] = useState(0);
  const cardsPerPage = 3;

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setRole(decoded.role);
        setRoleAdmin(decoded.role_adm || null);
        setId(decoded.id);
      } catch (err) {
        console.error("Erro ao decodificar o token:", err);
        setError("Token inválido");
        setAuthenticated(false);
      }
    } else {
      setAuthenticated(false);
    }
  }, []);

  const fetchModulesData = async () => {
    if (!authenticated || !id) return;

    setLoading(true);

    try {
      const modulesResponse = await api.get("/modules/");
      setModules(modulesResponse.data);
      setFilteredModules(modulesResponse.data);
      if (role !== "admin") {
        const myModulesResponse = await api.get(`/modules/teacher/${id}`);
        setMyModules(myModulesResponse.data);
      }

    } catch (err) {
      setError("Erro ao buscar os módulos: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModulesData();
  }, [authenticated, id, role]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredModules(modules);
    } else {
      const filtered = modules.filter((mod) =>
        mod.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredModules(filtered);
      setFilteredModulesIndex(0);
    }
  }, [searchTerm, modules]);

  const handleSearchChange = (e) => {
    const value = e.target.value.trim();
    setSearchTerm(value);
  };

  const handleNextMyModules = () => {
    if (myModulesIndex + cardsPerPage < myModules.length) {
      setMyModulesIndex(myModulesIndex + 1);
    }
  };

  const handlePrevMyModules = () => {
    if (myModulesIndex > 0) {
      setMyModulesIndex(myModulesIndex - 1);
    }
  };

  const handleNextFilteredModules = () => {
    if (filteredModulesIndex + cardsPerPage < filteredModules.length) {
      setFilteredModulesIndex(filteredModulesIndex + 1);
    }
  };

  const handlePrevFilteredModules = () => {
    if (filteredModulesIndex > 0) {
      setFilteredModulesIndex(filteredModulesIndex - 1);
    }
  };

  const handleModuleChange = () => {
    fetchModulesData();
    handleClose();
  };

  if (!authenticated) {
    navigate("/login");
    return null;
  }

  const visibleMyModules = myModules.slice(myModulesIndex, myModulesIndex + cardsPerPage);
  const visibleFilteredModules = filteredModules.slice(filteredModulesIndex, filteredModulesIndex + cardsPerPage);

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#1E2951",
        marginTop: "32px",
        width: { xs: "100%", sm: "100%" },
        ml: { lg: "10px", md: "10px" },
      }}
    >
      {roleAdmin ? (
        <>
          {/* Para Administrador Geral */}
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
                {visibleFilteredModules.map((mod, index) => (
                  <Grid item xs={12} sm={6} md={4} key={mod.id || index} marginTop="25px">
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
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            )}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
              <IconButton
                sx={{ color: "white" }}
                onClick={handlePrevFilteredModules}
                disabled={filteredModulesIndex === 0}
              >
                <ArrowBackIos />
              </IconButton>
              <IconButton
                sx={{ color: "white" }}
                onClick={handleNextFilteredModules}
                disabled={filteredModulesIndex + cardsPerPage >= filteredModules.length}
              >
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
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
                mb: 3,
              }}
            >
              <SearchBar onChange={handleSearchChange} />
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#60BFBF",
                  "&:hover": { bgcolor: "#48A3A3" },
                  px: 2,
                  height: "40px",
                  fontSize: "0.875rem",
                  textTransform: "none",
                  color: "#040D33",
                  minWidth: "200px",
                }}
                endIcon={<Add sx={{ color: "#040D33" }} />}
                onClick={handleOpen}
              >
                Cadastrar Módulo
              </Button>
              <CreateModuleModal open={openModal} onClose={handleModuleChange} />
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
                  {visibleMyModules.map((mod, index) => (
                    <Grid item sx={{ mb: 2 }} xs={12} sm={6} md={4} key={mod.id || index}>
                      <CardModule
                        title={mod.name || "Nome Indisponível"}
                        description={
                          mod.qtd_hours ? `${mod.qtd_hours} h` : "Horas Indisponíveis"
                        }
                        typeUser={"teacher"}
                        id={mod.id}
                      />
                    </Grid>
                  ))}
                </Grid>
                <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
                  <IconButton
                    sx={{ color: "white" }}
                    onClick={handlePrevMyModules}
                    disabled={myModulesIndex === 0}
                  >
                    <ArrowBackIos />
                  </IconButton>
                  <IconButton
                    sx={{ color: "white" }}
                    onClick={handleNextMyModules}
                    disabled={myModulesIndex + cardsPerPage >= myModules.length}
                  >
                    <ArrowForwardIos />
                  </IconButton>
                </Box>

                {/* Módulos Gerais */}
                <Typography variant="h5" sx={{ color: "white", mt: 6, mb: 2 }}>
                  Módulos Gerais
                </Typography>
                <Grid container spacing={3}>
                  {visibleFilteredModules.map((mod, index) => (
                    <Grid item sx={{ mb: 4 }} xs={12} sm={6} md={4} key={mod.id || index}>
                      <CardModule
                        title={mod.name || "Nome Indisponível"}
                        description={
                          mod.qtd_hours ? `${mod.qtd_hours} h` : "Horas Indisponíveis"
                        }
                      />
                    </Grid>
                  ))}
                </Grid>
                <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
                  <IconButton
                    sx={{ color: "white" }}
                    onClick={handlePrevFilteredModules}
                    disabled={filteredModulesIndex === 0}
                  >
                    <ArrowBackIos />
                  </IconButton>
                  <IconButton
                    sx={{ color: "white" }}
                    onClick={handleNextFilteredModules}
                    disabled={filteredModulesIndex + cardsPerPage >= filteredModules.length}
                  >
                    <ArrowForwardIos />
                  </IconButton>
                </Box>
              </>
            )}
          </Container>
        </>
      )}
    </Box>
  );
};

export default ModulesList;