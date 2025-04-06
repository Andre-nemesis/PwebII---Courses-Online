import React, { useState, useEffect } from "react";
import {
  Box, Typography, TextField, IconButton,
  Grid, Card, CardContent, Button, Container,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos, Search } from "@mui/icons-material";

import api from "../../service/api";
import Menu from "../../components/Menu";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [page, setPage] = useState(0);
  const [authenticated, setAuthenticated] = useState(true);
  const [role, setRole] = useState(null);
  const [roleAdmin, setRoleAdmin] = useState(null);

  const navigate = useNavigate();
  const itemsPerPage = 6;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setRole(decoded.role);
        setRoleAdmin(decoded.role_adm || null);
      } catch (err) {
        console.error("Erro ao decodificar token:", err);
        setAuthenticated(false);
      }
    } else {
      setAuthenticated(false);
    }

    const fetchData = async () => {
      try {
        const response = await api.get("/certificates/");
        setCertificates(response.data);
        setFiltered(response.data);
      } catch (err) {
        console.error("Erro ao buscar certificados:", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const term = search.toLowerCase();
    const filtered = certificates.filter(cert =>
      cert.courseName.toLowerCase().includes(term)
    );
    setFiltered(filtered);
    setPage(0);
  }, [search, certificates]);

  if (!authenticated) {
    navigate("/login");
    return null;
  }

  const paginated = filtered.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", overflowX: "hidden" }}>
      <Menu userRole={role} roleAdmin={roleAdmin} />

      <Box sx={{ flex: 1, padding: 2 }}>
        <Container sx={{ maxWidth: "100%", px: 0 }}>
          <Typography
            component="h1"
            variant="h5"
            sx={{ color: "#FFFFFF", mb: 3, mt: { xs: 7, md: 4 }, px: 2 }}
          >
            Certificados
          </Typography>
        </Container>

        <Container sx={{ maxWidth: "100%", px: 2 }}>
          <TextField
            fullWidth
            placeholder="Pesquisar certificado"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              endAdornment: <Search sx={{ color: "white" }} />,
              style: { backgroundColor: "#1E3A8A", color: "white" },
            }}
            sx={{ mb: 4 }}
          />

          <Grid container spacing={2}>
            {paginated.map((cert, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Card sx={{ backgroundColor: "#0E133C", color: "white", minHeight: 140 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {cert.courseName}
                    </Typography>
                    <Typography variant="body2">Concluído</Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Nota: {cert.grade}
                    </Typography>
                    <Button
                      variant="text"
                      sx={{ color: "#00BFFF", mt: 1 }}
                      endIcon={<ArrowForwardIos />}
                      onClick={() => window.open(cert.url, "_blank")}
                    >
                      Ver Certificado
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            <IconButton
              disabled={page === 0}
              onClick={() => setPage(page - 1)}
              sx={{ color: "white" }}
            >
              <ArrowBackIos />
            </IconButton>
            <IconButton
              disabled={(page + 1) * itemsPerPage >= filtered.length}
              onClick={() => setPage(page + 1)}
              sx={{ color: "white" }}
            >
              <ArrowForwardIos />
            </IconButton>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Certificates;
