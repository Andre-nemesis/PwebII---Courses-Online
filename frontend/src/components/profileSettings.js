import React, { useState, useEffect } from "react";
import { Box, Button, Container, Grid, Paper, TextField, Typography, Avatar, FormControl, Select, MenuItem, FormHelperText } from "@mui/material";
import { Email, Phone, Assignment, Work, Lock, Class,Draw, TrackChanges } from "@mui/icons-material";
import { jwtDecode } from "jwt-decode";
import api from "../service/api";
import Menu from "./Menu";
import MaskedTextField from "../components/maskTextField"; 

const AdminSettings = ({ userRole, roleAdmin, adminData, setAdminData, onSave }) => {
  const handleInputChange = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(adminData, userRole);
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={4} textAlign="center">
        <Paper sx={{ p: 4, bgcolor: "#2a3b67", color: "white" }}>
          <Avatar sx={{ width: 120, height: 120, margin: "0 auto", border: "2px solid white" }} />
          <Typography variant="h5" sx={{ mt: 2 }}>
            {adminData.name || "Nome do Admin"}
          </Typography>
          <Button variant="contained" color="success" fullWidth sx={{ mt: 2 }}>
            {roleAdmin === "admin" ? "Gerenciar Sistema" : "Gerenciar Conteúdo"}
          </Button>
          <Button variant="contained" color="info" fullWidth sx={{ mt: 2 }}>
            {roleAdmin === "admin" ? "Todos os Usuários" : "Cursos Criados"}
          </Button>
        </Paper>
      </Grid>
      <Grid item xs={12} md={8}>
        <Paper sx={{ p: 4, bgcolor: "white", color: "black" }}>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="E-mail"
              name="email"
              variant="outlined"
              value={adminData.email}
              onChange={handleInputChange}
              InputProps={{ startAdornment: <Box sx={{ mr: 1 }}><Email /></Box> }}
              sx={{ bgcolor: "white", borderRadius: 1 }}
            />
            <MaskedTextField
              fullWidth
              margin="normal"
              label="Telefone"
              name="phone_number"
              value={adminData.phone_number}
              onChange={handleInputChange}
              mask="(99) 99999-9999"
              InputProps={{ startAdornment: <Box sx={{ mr: 1 }}><Phone /></Box> }}
              sx={{ bgcolor: "white", borderRadius: 1 }}
            />
            <MaskedTextField
              fullWidth
              margin="normal"
              label="CPF"
              name="cpf"
              value={adminData.cpf}
              onChange={handleInputChange}
              mask="999.999.999-99"
              InputProps={{ startAdornment: <Box sx={{ mr: 1 }}><Assignment /></Box> }}
              sx={{ bgcolor: "white", borderRadius: 1 }}
            />
            {roleAdmin === "admin" ? (
              <FormControl fullWidth>
                <FormHelperText>Cargo</FormHelperText>
                <Select
                  name="role"
                  value={adminData.role || ""}
                  onChange={handleInputChange}
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="content_manager">Content Manager</MenuItem>
                </Select>
              </FormControl>
            ) : (
              <TextField
                fullWidth
                margin="normal"
                label="Cargo"
                name="role"
                variant="outlined"
                value={adminData.role || "Gerente de Conteúdo"}
                InputProps={{ startAdornment: <Box sx={{ mr: 1 }}><Work /></Box> }}
                sx={{ bgcolor: "white", borderRadius: 1 }}
                disabled
              />
            )}
            <TextField
              fullWidth
              margin="normal"
              label="Senha"
              name="password"
              type="password"
              value={adminData.password || ""}
              onChange={handleInputChange}
              InputProps={{ startAdornment: <Box sx={{ mr: 1 }}><Lock /></Box> }}
              sx={{ bgcolor: "white", borderRadius: 1 }}
            />
            <Button variant="contained" color="success" fullWidth sx={{ mt: 3 }} type="submit">
              Salvar
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

const TeacherSettings = ({ userRole, teacherData, setTeacherData, onSave }) => {
  const handleInputChange = (e) => {
    setTeacherData({ ...teacherData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(teacherData, userRole);
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={4} textAlign="center">
        <Paper sx={{ p: 4, bgcolor: "#2a3b67", color: "white" }}>
          <Avatar sx={{ width: 120, height: 120, margin: "0 auto", border: "2px solid white" }} />
          <Typography variant="h5" sx={{ mt: 2 }}>
            {teacherData.name || "Nome do Professor"}
          </Typography>
          <Button variant="contained" color="success" fullWidth sx={{ mt: 2 }}>
            7 Cursos Criados
          </Button>
          <Button variant="contained" color="error" fullWidth sx={{ mt: 2 }}>
            Top 3 Cursos Mais Vistos
          </Button>
        </Paper>
      </Grid>
      <Grid item xs={12} md={8}>
        <Paper sx={{ p: 4, bgcolor: "white", color: "black" }}>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="E-mail"
              name="email"
              variant="outlined"
              value={teacherData.email}
              onChange={handleInputChange}
              InputProps={{ startAdornment: <Box sx={{ mr: 1 }}><Email /></Box> }}
              sx={{ bgcolor: "white", borderRadius: 1 }}
            />
            <MaskedTextField
              fullWidth
              margin="normal"
              label="Telefone"
              name="phone_number"
              value={teacherData.phone_number}
              onChange={handleInputChange}
              mask="(99) 99999-9999"
              InputProps={{ startAdornment: <Box sx={{ mr: 1 }}><Phone /></Box> }}
              sx={{ bgcolor: "white", borderRadius: 1 }}
            />
            <MaskedTextField
              fullWidth
              margin="normal"
              label="CPF"
              name="cpf"
              value={teacherData.cpf}
              onChange={handleInputChange}
              mask="999.999.999-99"
              InputProps={{ startAdornment: <Box sx={{ mr: 1 }}><Assignment /></Box> }}
              sx={{ bgcolor: "white", borderRadius: 1 }}
            />
             <TextField
              fullWidth
              margin="normal"
              label="Formação Acadêmica"
              name="academic_formation"
              type="text"
              value={teacherData.academic_formation || ""}
              onChange={handleInputChange}
              InputProps={{ startAdornment: <Box sx={{ mr: 1 }}><Draw /></Box> }}
              sx={{ bgcolor: "white", borderRadius: 1 }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Especialização Técnica"
              name="tecnic_especialization"
              type="text"
              value={teacherData.tecnic_especialization || ""}
              onChange={handleInputChange}
              InputProps={{ startAdornment: <Box sx={{ mr: 1 }}><TrackChanges /></Box> }}
              sx={{ bgcolor: "white", borderRadius: 1 }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Senha"
              name="password"
              type="password"
              value={teacherData.password || ""}
              onChange={handleInputChange}
              InputProps={{ startAdornment: <Box sx={{ mr: 1 }}><Lock /></Box> }}
              sx={{ bgcolor: "white", borderRadius: 1 }}
            />
            <Button variant="contained" color="success" fullWidth sx={{ mt: 3 }} type="submit">
              Salvar
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

const StudentSettings = ({ userRole, studentData, setStudentData, onSave }) => {
  const handleInputChange = (e) => {
    setStudentData({ ...studentData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(studentData, userRole);
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={4} textAlign="center">
        <Paper sx={{ p: 4, bgcolor: "#2a3b67", color: "white" }}>
          <Avatar sx={{ width: 120, height: 120, margin: "0 auto", border: "2px solid white" }} />
          <Typography variant="h5" sx={{ mt: 2 }}>
            {studentData.name || "Nome do Estudante"}
          </Typography>
          <Button variant="contained" color="success" fullWidth sx={{ mt: 2 }}>
            5 Cursos Inscritos
          </Button>
          <Button variant="contained" color="warning" fullWidth sx={{ mt: 2 }}>
            Progresso Geral
          </Button>
        </Paper>
      </Grid>
      <Grid item xs={12} md={8}>
        <Paper sx={{ p: 4, bgcolor: "white", color: "black" }}>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="E-mail"
              name="email"
              variant="outlined"
              value={studentData.email}
              onChange={handleInputChange}
              InputProps={{ startAdornment: <Box sx={{ mr: 1 }}><Email /></Box> }}
              sx={{ bgcolor: "white", borderRadius: 1 }}
            />
            <MaskedTextField
              fullWidth
              margin="normal"
              label="Telefone"
              name="phone_number"
              value={studentData.phone_number}
              onChange={handleInputChange}
              mask="(99) 99999-9999"
              InputProps={{ startAdornment: <Box sx={{ mr: 1 }}><Phone /></Box> }}
              sx={{ bgcolor: "white", borderRadius: 1 }}
            />
            <MaskedTextField
              fullWidth
              margin="normal"
              label="CPF"
              name="cpf"
              value={studentData.cpf}
              onChange={handleInputChange}
              mask="999.999.999-99"
              InputProps={{ startAdornment: <Box sx={{ mr: 1 }}><Assignment /></Box> }}
              sx={{ bgcolor: "white", borderRadius: 1 }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Cidade"
              name="main_course"
              variant="outlined"
              value={studentData.city || ""}
              onChange={handleInputChange}
              InputProps={{ startAdornment: <Box sx={{ mr: 1 }}><Class /></Box> }}
              sx={{ bgcolor: "white", borderRadius: 1 }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Senha"
              name="password"
              type="password"
              value={studentData.password || ""}
              onChange={handleInputChange}
              InputProps={{ startAdornment: <Box sx={{ mr: 1 }}><Lock /></Box> }}
              sx={{ bgcolor: "white", borderRadius: 1 }}
            />
            <Button variant="contained" color="success" fullWidth sx={{ mt: 3 }} type="submit">
              Salvar
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

const ProfileSettings = ({ userRole, roleAdmin }) => {
  
  const [adminData, setAdminData] = useState({ name: '', email: '', phone_number: '', cpf: '', role: '', password: '' });
  const [teacherData, setTeacherData] = useState({ name: '', email: '', phone_number: '', cpf: '',academic_formation:'', tecnic_especialization: '', password: '' });
  const [studentData, setStudentData] = useState({ name: '', email: '', phone_number: '', cpf: '', city: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const decoded = jwtDecode(token);
        const id = decoded.id;
        let response;

        setLoading(true);
        switch (userRole) {
          case "admin":
            response = await api.get(`/admin/view/${id}`);
            setAdminData({
              name: response.data.User.name || "",
              email: response.data.User.email || "",
              phone_number: response.data.User.phone_number || "",
              cpf: response.data.User.cpf || "",
              role: response.data.role || roleAdmin,
              password: ""
            });
            break;
          case "teacher":
            response = await api.get(`/teachers/${id}`);
            setTeacherData({
              name: response.data.User.name || "",
              email: response.data.User.email || "",
              phone_number: response.data.User.phone_number || "",
              cpf: response.data.User.cpf || "",
              academic_formation: response.data.academic_formation || "",
              tecnic_especialization: response.data.tecnic_especialization || "",
              password: ""
            });
            break;
          case "student":
            response = await api.get(`/students/${id}`);
            setStudentData({
              name: response.data.User.name || "",
              email: response.data.User.email || "",
              phone_number: response.data.User.phone_number || "",
              cpf: response.data.User.cpf || "",
              city: response.data.city || "",
              password: ""
            });
            break;
          default:
            console.error("Tipo de usuário não reconhecido");
        }
      } catch (err) {
        setError("Erro ao carregar dados do usuário");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userRole, roleAdmin]);

  // Função para salvar os dados
  const handleSave = async (data, role) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      const id = decoded.id;

      switch (role) {
        case "admin":
          await api.put(`/admin/${id}`, data);
          break;
        case "teacher":
          await api.put(`/teachers/${id}`, data);
          break;
        case "student":
          await api.put(`/students/${id}`, data);
          break;
        default:
          throw new Error("Tipo de usuário inválido");
      }
      alert("Dados salvos com sucesso!");
    } catch (err) {
      setError("Erro ao salvar os dados");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const renderSettingsContent = () => {
    if (loading) return <Typography>Carregando...</Typography>;
    if (error) return <Typography color="error">{error}</Typography>;

    switch (userRole) {
      case "admin":
        return <AdminSettings userRole={userRole} roleAdmin={roleAdmin} adminData={adminData} setAdminData={setAdminData} onSave={handleSave} />;
      case "teacher":
        return <TeacherSettings userRole={userRole} teacherData={teacherData} setTeacherData={setTeacherData} onSave={handleSave} />;
      case "student":
        return <StudentSettings userRole={userRole} studentData={studentData} setStudentData={setStudentData} onSave={handleSave} />;
      default:
        return <Typography variant="h6" color="error">Tipo de usuário não reconhecido</Typography>;
    }
  };

  return (
    <Box display="flex" height="100vh" bgcolor="#1d2951" color="white">
      {roleAdmin ? (
        <Menu userRole={userRole} roleAdmin={roleAdmin} />
      ) : (
        <Menu userRole={userRole} />
      )}
      <Container sx={{ flex: 1, py: 5 }}>
        {renderSettingsContent()}
      </Container>
    </Box>
  );
};

export default ProfileSettings;