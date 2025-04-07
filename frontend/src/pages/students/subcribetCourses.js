import React, { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Box,
  Button,
} from "@mui/material";
import { ArrowRight } from "@mui/icons-material";
import api from "../../service/api.js";
import { jwtDecode } from "jwt-decode";
import Menu from "../../components/Menu.js";
import ErrorMessageModal from "../../components/ErrorMessageModal";
import { useNavigate } from "react-router-dom";

const SubscribedCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [noCourses, setNoCourses] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [errorInfo, setErrorInfo] = useState({ type: "error", message: "" });
  const navigate = useNavigate();

  const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const decoded = jwtDecode(token);
      return decoded.id;
    } catch (error) {
      setErrorInfo({ type: "error", message: error.message });
      setOpenError(true);
      return null;
    }
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const userId = getUserIdFromToken();
        if (!userId) {
          throw new Error("Usuário não autenticado.");
        }

        const response = await api.get(`/students/subcribed-courses/${userId}`);

        if (response.data.message === "Não há inscrições em cursos para este aluno!") {
          setNoCourses(true);
        } else {
          const formattedCourses = response.data.studentCourses.map((studentCourse) => ({
            id: studentCourse.Course.id,
            name: studentCourse.Course.name,
            qtd_hours: studentCourse.Course.qtd_hours,
            percent_complet: studentCourse.percent_complet,
          }));
          setCourses(formattedCourses);
        }
      } catch (err) {
        const errorMessage =
          err.response?.data?.message || "Erro ao buscar cursos. Tente novamente mais tarde.";
        setErrorInfo({ type: "error", message: errorMessage });
        setOpenError(true);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleCloseError = () => setOpenError(false);

  const handleContinueCourse = (courseId) => {
    navigate(`/student/courses/${courseId}/modules`); 
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Menu userRole="student" />

      <Container
        component="main"
        sx={{
          width: {
            xs: "100%",
            sm: "100%",
            md: "calc(100% - 240px)",
            lg: "calc(100% - 240px)",
          },
          p: 3,
        }}
      >
        <Paper elevation={3} sx={{ mt: 2, p: 3, bgcolor: "#1E2951" }}>
          <Typography component="h1" variant="h5" sx={{ mb: 2, color: "#FFFFFF" }}>
            Lista de Cursos Inscritos
          </Typography>

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : noCourses ? (
            <Typography sx={{ textAlign: "center", color: "gray" }}>
              Não há inscrições feitas.
            </Typography>
          ) : (
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="Tabela de Cursos">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: "#FFFFFF" }}>Nome do Curso</TableCell>
                    <TableCell sx={{ color: "#FFFFFF" }} align="right">
                      Carga Horária
                    </TableCell>
                    <TableCell sx={{ color: "#FFFFFF" }} align="right">
                      Progresso (%)
                    </TableCell>
                    <TableCell sx={{ color: "#FFFFFF" }} align="right">
                      Ações
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {courses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell component="th" scope="row" sx={{ color: "#FFFFFF" }}>
                        {course.name}
                      </TableCell>
                      <TableCell align="right" sx={{ color: "#FFFFFF" }}>
                        {course.qtd_hours} h
                      </TableCell>
                      <TableCell align="right" sx={{ color: "#FFFFFF" }}>
                        {course.percent_complet}%
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          color="primary"
                          onClick={() => handleContinueCourse(course.id)}
                          endIcon={<ArrowRight />}
                          sx={{ color: "#00BFFF", textTransform: "none" }}
                        >
                          Continuar Curso
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>
      </Container>
      <ErrorMessageModal
        open={openError}
        onClose={handleCloseError}
        type={errorInfo.type}
        message={errorInfo.message}
      />
    </Box>
  );
};

export default SubscribedCourses;