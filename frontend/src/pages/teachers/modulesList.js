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
        let fetchedModules = response.data;

        while (fetchedModules.length < 12) {
          fetchedModules = [...fetchedModules, ...response.data];
        }
        setModules(fetchedModules.slice(0, 12));
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
      <Menu userRole={"teacher"} />

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
            sx={{ ml: 2, flex: 1, color: "#C8D0DA", backgroundColor: "#1E2951", border: "1px solid #C8D0DA" }}
            placeholder="Pesquisar módulo..."
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
        ) : (
          <Grid container spacing={2}>
            {filteredModules.map((mod, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper
                  sx={{
                    p: 2,
                    backgroundColor: "#0F172A",
                    color: "white",
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="h6">{mod.name || "Nome Indisponível"}</Typography>
                  <Typography variant="body2">{mod.qtd_hours ? `${mod.qtd_hours} h` : "Horas Indisponíveis"}</Typography>

                  {mod.topics && mod.topics.length > 0 && (
                    <List dense sx={{ mt: 1 }}>
                      {mod.topics.map((topic, idx) => (
                        <ListItem key={idx} sx={{ py: 0 }}>
                          <ListItemText primary={`• ${topic}`} />
                        </ListItem>
                      ))}
                    </List>
                  )}

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
