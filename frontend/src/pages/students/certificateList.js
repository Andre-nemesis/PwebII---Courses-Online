import React, { useState, useEffect } from "react";
import {
  Box, Typography, IconButton,
  Grid, Card, CardContent, Button, Container,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import api from "../../service/api";
import Menu from "../../components/Menu";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/SearchBar";
import ErrorMessageModal from "../../components/ErrorMessageModal";

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [page, setPage] = useState(0);
  const [authenticated, setAuthenticated] = useState(true);
  const [role, setRole] = useState(null);
  const [id, setId] = useState(null);
  const [openError, setOpenError] = useState(false);
  const [errorInfo, setErrorInfo] = useState({ type: "error", message: "" });

  const navigate = useNavigate();
  const itemsPerPage = 6;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setRole(decoded.role);
        setId(decoded.id);
      } catch (err) {
        setErrorInfo({ type: "error", message: "Erro de autênticação" });
        setOpenError(true);
        setAuthenticated(false);
      }
    } else {
      setAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const response = await api.get(`/certificates/student/${id}`);
          console.log(response.data, id);
          setCertificates(response.data);
          setFiltered(response.data);
        } catch (err) {
          setErrorInfo({ type: "error", message: "Erro ao buscar certificados" });
          setOpenError(true);
        }
      };
      fetchData();
    }
  }, [id]);

  if (!authenticated) {
    navigate("/login");
    return null;
  }

  const handleCloseError = () => setOpenError(false);

  const paginated = filtered.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", overflowX: "hidden" }}>
      <Menu userRole={role} />
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
          <SearchBar onChange={(e) => setSearch(e.target.value)} />
          <Grid container spacing={2}>
            {paginated.map((cert, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Card sx={{ backgroundColor: "#0E133C", color: "white", minHeight: 140 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {cert.Course.name}
                    </Typography>
                    <Typography variant="body2">Concluído</Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Nota: {cert.final_score}
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
        <ErrorMessageModal open={openError} onClose={handleCloseError} type={errorInfo.type} message={errorInfo.message} />
      </Box>
    </Box>
  );
};

export default Certificates;