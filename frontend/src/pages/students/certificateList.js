import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  Grid,
  Card,
  CardContent,
  Button,
  Container,
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
  const itemsPerPage = 3; // Ajustado para 3 cards por página

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setRole(decoded.role);
        setId(decoded.id);
      } catch (err) {
        setErrorInfo({ type: "error", message: "Erro de autenticação" });
        setOpenError(true);
        setAuthenticated(false);
      }
    } else {
      setAuthenticated(false);
    }
  }, []);

  const fetchCertificatesByStudent = async (studentId) => {
    try {
      const response = await api.get(`/certificates/student/${studentId}`);
      return response.data;
    } catch (err) {
      throw new Error("Erro ao buscar certificados");
    }
  };

  useEffect(() => {
    if (id) {
      const getCertificates = async () => {
        try {
          const data = await fetchCertificatesByStudent(id);
          setCertificates(data);
          setFiltered(data);
        } catch (error) {
          setErrorInfo({ type: "error", message: error.message });
          setOpenError(true);
        }
      };
      getCertificates();
    }
  }, [id]);

  useEffect(() => {
    // Filtrar certificados com base na busca
    if (search) {
      const filteredCertificates = certificates.filter((cert) =>
        cert.Course.name.toLowerCase().includes(search.toLowerCase())
      );
      setFiltered(filteredCertificates);
      setPage(0); // Resetar a página ao filtrar
    } else {
      setFiltered(certificates);
    }
  }, [search, certificates]);

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
                    {cert.final_score < 7 ? (
                      <Typography variant="body2" color="error">
                        Reprovado
                      </Typography>
                    ) : (
                      <Typography variant="body2" color="success">
                        Concluído
                      </Typography>
                    )}
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Nota: {cert.final_score}
                    </Typography>
                    {cert.final_score < 7 ? (
                      <Button
                        variant="text"
                        sx={{ color: "#00BFFF", mt: 1 }}
                        endIcon={<ArrowForwardIos />}
                        onClick={() => window.open(cert.url, "_blank")}
                      >
                        Refazer Prova
                      </Button>
                    ) : (
                      <Button
                        variant="text"
                        sx={{ color: "#00BFFF", mt: 1 }}
                        endIcon={<ArrowForwardIos />}
                        onClick={() => window.open(cert.download_link, "_blank")} // Ajustado para download_link
                      >
                        Ver Certificado
                      </Button>
                    )}
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
        <ErrorMessageModal
          open={openError}
          onClose={handleCloseError}
          type={errorInfo.type}
          message={errorInfo.message}
        />
      </Box>
    </Box>
  );
};

export default Certificates;
