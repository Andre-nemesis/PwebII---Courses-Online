import React from "react";
import { Box, Button, Container, Grid, Paper, TextField, Typography, Avatar } from "@mui/material";
import { Email, Phone, Assignment, Work, Lock } from "@mui/icons-material";
import Menu from "../../components/Menu";

const ProfileSettings = ({userRole}) => {
  return (
    <Box display="flex" height="100vh" bgcolor="#1d2951" color="white">
      <Menu userRole={userRole} />
      <Container sx={{ flex: 1, py: 5 }}>
        <Grid container spacing={4}>
          {/* Seção de perfil */}
          <Grid item xs={12} md={4} textAlign="center">
            <Paper sx={{ p: 4, bgcolor: "#2a3b67", color: "white" }}>
              <Avatar sx={{ width: 120, height: 120, margin: "0 auto", border: "2px solid white" }} />
              <Typography variant="h5" sx={{ mt: 2 }}>
                Nome do usuário
              </Typography>
              <Button variant="contained" color="success" fullWidth sx={{ mt: 2 }}>
                7 Cursos Criados
              </Button>
              <Button variant="contained" color="error" fullWidth sx={{ mt: 2 }}>
                Top 3 Cursos mais vistos
              </Button>
            </Paper>
          </Grid>

          {/* Seção de formulário */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 4, bgcolor: "white", color: "black" }}>
              <form>
                {[
                  { label: "E-mail", icon: <Email /> },
                  { label: "Telefone", icon: <Phone /> },
                  { label: "CPF", icon: <Assignment /> },
                  { label: "Cargo", icon: <Work /> },
                  { label: "Senha", icon: <Lock />, type: "password" },
                ].map(({ label, icon, type = "text" }) => (
                  <TextField
                    key={label}
                    fullWidth
                    margin="normal"
                    label={label}
                    variant="outlined"
                    type={type}
                    InputProps={{
                      startAdornment: <Box sx={{ mr: 1 }}>{icon}</Box>,
                    }}
                    sx={{ bgcolor: "white", borderRadius: 1 }}
                  />
                ))}
                <Button variant="contained" color="success" fullWidth sx={{ mt: 3 }}>
                  Salvar
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProfileSettings;
