import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  IconButton,
  Button,
  Modal,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Checkbox,
  ListItemText,
} from "@mui/material";
import CardCourse from "../../components/CardCourse.js";
import api from "../../service/api.js";
import Menu from "../../components/Menu.js";
import SearchBar from "../../components/SearchBar.js";
import { ArrowBackIos, ArrowForwardIos, Add } from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import SuccessMessageModal from "../../components/SuccessMessageModal";
import ErrorMessageModal from "../../components/ErrorMessageModal";

const CoursesList = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [role, setRole] = useState(null);
  const [roleAdmin, setRoleAdmin] = useState(null);
  const [authenticated, setAuthenticated] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearch, setSearch] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modules, setModules] = useState([]);
  const [admin_id, setId] = useState(null);
  const [courseIndex, setCourseIndex] = useState(0);
  const [filteredCourseIndex, setFilteredCourseIndex] = useState(0);
  const cardsPerPage = 3; // Ajustado para 3 cards por página
  const [newCourse, setNewCourse] = useState({
    admin_id: "",
    name: "",
    qtd_hours: "",
    module: [],
  });
  const navigate = useNavigate();
  const [openMessage, setOpenMessage] = useState(false);
  const [messageInfo, setMessageInfo] = useState({ type: "success", message: "" });
  const [openError, setOpenError] = useState(false);
  const [errorInfo, setErrorInfo] = useState({ type: "error", message: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setRole(decoded.role);
        setId(decoded.id);
        setRoleAdmin(decoded.role_adm || null);
      } catch (err) {
        setError("Token inválido");
        setErrorInfo({ type: "error", message: err.message });
        setOpenError(true);
        setAuthenticated(false);
      }
    } else {
      setAuthenticated(false);
    }
  }, []);

  const fetchCoursesData = async () => {
    try {
      setLoading(true);
      const response = await api.get("/courses/");
      setCourses(response.data);
      setFilteredCourses(response.data);
      setCourseIndex(0); // Resetar índice ao atualizar
      setFilteredCourseIndex(0);
    } catch (err) {
      setErrorInfo({ type: "error", message: err.message });
      setOpenError(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchModules = async () => {
    try {
      const response = await api.get("/modules/");
      setModules(response.data);
    } catch (err) {
      setErrorInfo({ type: "error", message: err.message });
      setOpenError(true);
    }
  };

  useEffect(() => {
    if (authenticated) {
      fetchCoursesData();
      if (role !== "student") {
        fetchModules();
      }
    }
  }, [authenticated, role]);

  const fetchCoursesByTermo = async (termo) => {
    try {
      const response = await api.get(`/courses/search/${encodeURI(termo)}`);
      if (!response.data) {
        throw new Error("Erro ao buscar cursos por termo.");
      }
      return response.data;
    } catch (error) {
      setErrorInfo({ type: "error", message: error.message });
      setOpenError(true);
      return null;
    }
  };

  const handleSearchChange = async (e) => {
    const value = e.target.value.trim();
    setSearchTerm(value);
    setFilteredCourseIndex(0);

    if (!value) {
      setFilteredCourses(courses);
      setSearch(false);
      return;
    }

    const coursesByTerm = await fetchCoursesByTermo(value);
    if (coursesByTerm && coursesByTerm.length > 0) {
      setFilteredCourses(coursesByTerm);
      setSearch(true);
    } else {
      setFilteredCourses([]);
      setSearch(true);
    }
  };

  const handleNextCourses = () => {
    if (isSearch) {
      if (filteredCourseIndex + cardsPerPage < filteredCourses.length) {
        setFilteredCourseIndex(filteredCourseIndex + 1);
      }
    } else {
      if (courseIndex + cardsPerPage < courses.length) {
        setCourseIndex(courseIndex + 1);
      }
    }
  };

  const handlePrevCourses = () => {
    if (isSearch) {
      if (filteredCourseIndex > 0) {
        setFilteredCourseIndex(filteredCourseIndex - 1);
      }
    } else {
      if (courseIndex > 0) {
        setCourseIndex(courseIndex - 1);
      }
    }
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setNewCourse({ admin_id: "", name: "", qtd_hours: "", module: [] }); // Resetar o formulário
  };

  const handleCourseCreated = () => {
    fetchCoursesData(); // Atualizar o carrossel
    handleCloseModal();
    setMessageInfo({ type: "success", message: "Curso cadastrado com sucesso!" });
    setOpenMessage(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse((prev) => ({ ...prev, [name]: value }));
  };

  const handleModuleChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewCourse((prev) => ({
      ...prev,
      module: typeof value === "string" ? value.split(",") : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const courseData = { ...newCourse, admin_id }; 
      await api.post("/courses/", courseData);
      handleCourseCreated(); 
    } catch (err) {
      setErrorInfo({ type: "error", message: err.message });
      setOpenError(true);
    }
  };

  if (!authenticated) {
    navigate("/login");
    return null;
  }

  const handleCloseMessage = () => setOpenMessage(false);
  const handleCloseError = () => setOpenError(false);

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };

  const visibleCourses = isSearch
    ? filteredCourses.slice(filteredCourseIndex, filteredCourseIndex + cardsPerPage)
    : courses.slice(courseIndex, courseIndex + cardsPerPage);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {roleAdmin ? (
        roleAdmin !== "content_manager" ? (
          <>
            <Menu userRole={role} roleAdmin={roleAdmin} />
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                p: 3,
                ml: { md: "240px" },
                width: { xs: "100%", md: "calc(100% - 240px)" },
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Container maxWidth="lg" sx={{ py: 4 }}>
                <Typography variant="h5" sx={{ color: "white", mb: 3 }}>
                  Cursos Disponíveis
                </Typography>

                <SearchBar onChange={handleSearchChange} />

                {loading ? (
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <CircularProgress color="primary" />
                  </Box>
                ) : error ? (
                  <Typography color="error" sx={{ textAlign: "center" }}>
                    {error}
                  </Typography>
                ) : filteredCourses.length === 0 ? (
                  <Typography sx={{ color: "white", textAlign: "center" }}>
                    Nenhum curso encontrado
                  </Typography>
                ) : (
                  <Grid container spacing={4} marginTop="2px">
                    {visibleCourses.map((course) => (
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        key={course.id}
                        sx={{ display: "flex", justifyContent: "center" }}
                      >
                        <CardCourse
                          id={course.id}
                          title={course.name || "Nome Indisponível"}
                          description={
                            course.qtd_hours
                              ? `${course.qtd_hours} horas`
                              : "Horas Indisponíveis"
                          }
                          type={role}
                          role={roleAdmin}
                        />
                      </Grid>
                    ))}
                  </Grid>
                )}

                <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                  <IconButton
                    onClick={handlePrevCourses}
                    sx={{ color: "white" }}
                    disabled={isSearch ? filteredCourseIndex === 0 : courseIndex === 0}
                  >
                    <ArrowBackIos />
                  </IconButton>
                  <IconButton
                    onClick={handleNextCourses}
                    sx={{ color: "white" }}
                    disabled={
                      isSearch
                        ? filteredCourseIndex + cardsPerPage >= filteredCourses.length
                        : courseIndex + cardsPerPage >= courses.length
                    }
                  >
                    <ArrowForwardIos />
                  </IconButton>
                </Box>
              </Container>
            </Box>
          </>
        ) : (
          <>
            <Menu userRole={role} roleAdmin={roleAdmin} />
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                p: 3,
                ml: { md: "240px" },
                width: { xs: "100%", md: "calc(100% - 240px)" },
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Container maxWidth="lg" sx={{ py: 4 }}>
                <Typography variant="h5" sx={{ color: "white", mb: 3 }}>
                  Cursos Disponíveis
                </Typography>

                <SearchBar value={searchTerm} onChange={handleSearchChange} />

                <Button
                  variant="contained"
                  startIcon={<Add />}
                  sx={{
                    backgroundColor: "#00BFFF",
                    "&:hover": { backgroundColor: "#0099cc" },
                    ml: 10,
                    mt: 0.1,
                  }}
                  onClick={handleOpenModal}
                >
                  Adicionar Curso
                </Button>

                {loading ? (
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <CircularProgress color="primary" />
                  </Box>
                ) : error ? (
                  <Typography color="error" sx={{ textAlign: "center" }}>
                    {error}
                  </Typography>
                ) : filteredCourses.length === 0 ? (
                  <Typography sx={{ color: "white", textAlign: "center" }}>
                    Nenhum curso encontrado
                  </Typography>
                ) : (
                  <Grid container spacing={4} marginTop="2px">
                    {visibleCourses.map((course) => (
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        key={course.id}
                        sx={{ display: "flex", justifyContent: "center" }}
                      >
                        <CardCourse
                          id={course.id}
                          title={course.name || "Nome Indisponível"}
                          description={
                            course.qtd_hours
                              ? `${course.qtd_hours} horas`
                              : "Horas Indisponíveis"
                          }
                          type={role}
                          role={roleAdmin}
                        />
                      </Grid>
                    ))}
                  </Grid>
                )}

                <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                  <IconButton
                    onClick={handlePrevCourses}
                    sx={{ color: "white" }}
                    disabled={isSearch ? filteredCourseIndex === 0 : courseIndex === 0}
                  >
                    <ArrowBackIos />
                  </IconButton>
                  <IconButton
                    onClick={handleNextCourses}
                    sx={{ color: "white" }}
                    disabled={
                      isSearch
                        ? filteredCourseIndex + cardsPerPage >= filteredCourses.length
                        : courseIndex + cardsPerPage >= courses.length
                    }
                  >
                    <ArrowForwardIos />
                  </IconButton>
                </Box>
              </Container>
            </Box>

            <Modal
              open={openModal}
              onClose={handleCloseModal}
              aria-labelledby="modal-title"
            >
              <Box sx={modalStyle}>
                <Typography id="modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
                  Adicionar Novo Curso
                </Typography>
                <TextField
                  fullWidth
                  label="Nome do Curso"
                  name="name"
                  value={newCourse.name}
                  onChange={handleInputChange}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Quantidade de Horas"
                  name="qtd_hours"
                  type="number"
                  value={newCourse.qtd_hours}
                  onChange={handleInputChange}
                  sx={{ mb: 2 }}
                />
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Módulos</InputLabel>
                  <Select
                    multiple
                    name="module"
                    value={newCourse.module}
                    onChange={handleModuleChange}
                    label="Módulos"
                    renderValue={(selected) =>
                      selected
                        .map((id) => modules.find((m) => m.id === id)?.name)
                        .join(", ")
                    }
                  >
                    {modules.map((module) => (
                      <MenuItem key={module.id} value={module.id}>
                        <Checkbox checked={newCourse.module.indexOf(module.id) > -1} />
                        <ListItemText primary={module.name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                  <Button onClick={handleCloseModal}>Cancelar</Button>
                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    sx={{ backgroundColor: "#00BFFF" }}
                  >
                    Salvar
                  </Button>
                </Box>
              </Box>
            </Modal>
          </>
        )
      ) : (
        <>
          <Menu userRole={role} />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              ml: { md: "240px" },
              width: { xs: "100%", md: "calc(100% - 240px)" },
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Container maxWidth="lg" sx={{ py: 4 }}>
              <Typography variant="h5" sx={{ color: "white", mb: 3 }}>
                Cursos Disponíveis
              </Typography>

              <SearchBar onChange={handleSearchChange} />

              {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <CircularProgress color="primary" />
                </Box>
              ) : error ? (
                <Typography color="error" sx={{ textAlign: "center" }}>
                  {error}
                </Typography>
              ) : filteredCourses.length === 0 ? (
                <Typography sx={{ color: "white", textAlign: "center" }}>
                  Nenhum curso encontrado
                </Typography>
              ) : (
                <Grid container spacing={4} marginTop="2px">
                  {visibleCourses.map((course) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      key={course.id}
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      <CardCourse
                        id={course.id}
                        title={course.name || "Nome Indisponível"}
                        description={
                          course.qtd_hours
                            ? `${course.qtd_hours} horas`
                            : "Horas Indisponíveis"
                        }
                        type={role}
                      />
                    </Grid>
                  ))}
                </Grid>
              )}

              <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <IconButton
                  onClick={handlePrevCourses}
                  sx={{ color: "white" }}
                  disabled={isSearch ? filteredCourseIndex === 0 : courseIndex === 0}
                >
                  <ArrowBackIos />
                </IconButton>
                <IconButton
                  onClick={handleNextCourses}
                  sx={{ color: "white" }}
                  disabled={
                    isSearch
                      ? filteredCourseIndex + cardsPerPage >= filteredCourses.length
                      : courseIndex + cardsPerPage >= courses.length
                  }
                >
                  <ArrowForwardIos />
                </IconButton>
              </Box>
            </Container>
          </Box>
        </>
      )}
      <SuccessMessageModal
        open={openMessage}
        onClose={handleCloseMessage}
        type={messageInfo.type}
        message={messageInfo.message}
      />
      <ErrorMessageModal
        open={openError}
        onClose={handleCloseError}
        type={errorInfo.type}
        message={errorInfo.message}
      />
    </Box>
  );
};

export default CoursesList;