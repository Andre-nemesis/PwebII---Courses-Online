import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#0E133C", 
        color: "#FFFFFF",
      }}
    >
      <Container
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          py: 4,
        }}
      >
        <Typography
          variant="h1"
          sx={{ fontSize: { xs: "3rem", md: "6rem" }, fontWeight: "bold" }}
        >
          404
        </Typography>
        <Typography
          variant="h4"
          sx={{ mt: 2, mb: 4, color: "#FFFFFF" }}
        >
          Oops! Página não encontrada :/
        </Typography>
        <Typography
          variant="body1"
          sx={{ mb: 4, maxWidth: "600px", color: "#B0B0B0" }}
        >
          Parece que você se perdeu. A página que você está procurando não existe ou foi movida.
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#00BFFF",
            "&:hover": { backgroundColor: "#0099CC" },
            textTransform: "none",
            padding: "10px 20px",
          }}
          onClick={() => navigate("/")}
        >
          Voltar para a Página Inicial
        </Button>
      </Container>

      {/* Opcional: Footer */}
      <Box sx={{ py: 2, textAlign: "center", backgroundColor: "#080C2A" }}>
        <Typography variant="body2" sx={{ color: "#B0B0B0" }}>
          © {new Date().getFullYear()} Learnfy. Todos os direitos reservados.
        </Typography>
      </Box>
    </Box>
  );
};

export default NotFound;