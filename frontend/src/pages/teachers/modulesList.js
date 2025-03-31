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
} from "@mui/material";
import { Search, Tune, ArrowForwardIos, ArrowBackIos } from "@mui/icons-material";
import api from "../../service/api.js";
import Menu from "../../components/Menu.js";

const ModulesList = () => {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await api.get("/modules/");
        setModules(response.data);
      } catch (err) {
        setError("Erro ao buscar os módulos: " + err);
      } finally {
        setLoading(false);
      }
    };
    fetchModules();
  }, []);

  const filteredModules = modules.filter((mod) =>
    mod.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#1E2951" }}>
      <Menu userRole={"admin"} />

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
            sx={{ ml: 2, flex: 1, color: "white" }}
            placeholder="Pesquisar módulo"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <IconButton sx={{ color: "white" }}>
            <Search />
          </IconButton>
          <Button
            startIcon={<Tune />}
            sx={{
              color: "white",
              borderRadius: 2,
              backgroundColor: "#2E4A7B",
              "&:hover": { backgroundColor: "#375A91" },
              ml: 1,
              p: 1,
            }}
          >
            Filtros
          </Button>
        </Paper>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress color="primary" />
          </Box>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <Grid container spacing={2}>
            {filteredModules.map((mod) => (
              <Grid item xs={12} sm={6} md={4} key={mod.id}>
                <Paper
                  sx={{
                    p: 2,
                    backgroundColor: "#0F172A",
                    color: "white",
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="h6">{mod.name || "Nome Indisponível"}</Typography>
                  <Typography variant="body2">{mod.qtd_hours || "Horas Indisponíveis"}</Typography>
                  <Typography variant="body2">
                    {mod.Author?.User?.name || "Autor Indisponível"}
                  </Typography>
                  <Button
                    sx={{
                      mt: 1,
                      color: "#00C2FF",
                      textTransform: "none",
                      fontWeight: "bold",
                    }}
                    endIcon={<ArrowForwardIos />}
                  >
                    Ver módulo
                  </Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}

        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <IconButton sx={{ color: "white" }}>
            <ArrowBackIos />
          </IconButton>
          <IconButton sx={{ color: "white" }}>
            <ArrowForwardIos />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
};

export default ModulesList;
