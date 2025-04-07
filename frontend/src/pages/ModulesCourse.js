import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Container, Box, Button } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import Menu from "../components/Menu";
import api from "../service/api";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import ErrorMessageModal from "../components/ErrorMessageModal";

const CourseDetails = () => {
  const { id } = useParams();
  const [modules, setModules] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);
  const [roleAdmin, setRoleAdmin] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(null);
  const [hasCertificate, setHasCertificate] = useState(null);
  const [authenticated, setAuthenticated] = useState(null);
  const navigate = useNavigate();
  const [openError, setOpenError] = useState(false);
  const [errorInfo, setErrorInfo] = useState({ type: "error", message: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setAuthenticated(false);
      navigate("/login");
      return;
    }

    let decoded;
    try {
      decoded = jwtDecode(token);
      setRole(decoded.role);
      setRoleAdmin(decoded.role_adm || null);
      setUserId(decoded.id);
      setAuthenticated(true);
    } catch (err) {
      setAuthenticated(false);
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const modulesResponse = await api.get(`/courses/${id}/modules`);
        setCourseName(modulesResponse.data.courseName);
        setModules(modulesResponse.data.modules || []);

        if (decoded.role === "student" && decoded.id) {
          const subscribeResponse = await api.post(`/students/course/verify/${id}/user/${decoded.id}`);
          const certificateResponse = await api.get(`/certificates/verify/${id}/${decoded.id}`);

          setIsSubscribed(subscribeResponse.data.result);
          setHasCertificate(certificateResponse.data.result);
        }
      } catch (error) {
        setErrorInfo({ type: "error", message: error.message || "Erro ao carregar dados do curso." });
        setOpenError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, navigate]);

  const createCertificate = async () => {
    try {
      const certificateCode = uuidv4();
      const downloadLink = `${window.location.origin}/certificates/download/${certificateCode}`;
      const certificateData = {
        course_id: id,
        student_id: userId,
        certificate_code: certificateCode,
        status: "Aprovado",
        final_score: 10,
        download_link: downloadLink,
      };
      await api.post("/certificates/", certificateData);
      setErrorInfo({ type: "success", message: "Curso concluído com sucesso!" });
      setOpenError(true);
      setHasCertificate(true);
    } catch (error) {
      setErrorInfo({ type: "error", message: error.message || "Erro ao gerar certificado." });
      setOpenError(true);
    }
  };

  const handleSubscribeCourse = async () => {
    try {
      await api.post(`/students/course/subscribe/${id}/user/${userId}`);
      setErrorInfo({ type: "success", message: "Matrícula realizada com sucesso!" });
      setOpenError(true);
      setIsSubscribed(true);
    } catch (error) {
      setErrorInfo({ type: "error", message: "Erro ao matricular-se no curso." });
      setOpenError(true);
    }
  };

  const handleCloseError = () => setOpenError(false);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Typography>Carregando...</Typography>
      </Box>
    );
  }

  if (!authenticated) {
    return null;
  }

  return (
    <Container
      sx={{
        color: "white",
        padding: 4,
        marginTop: "20px",
        width: { xs: "100%", sm: "100%", md: "calc(100% - 240px)", lg: "calc(100% - 240px)" },
        ml: { lg: "240px", md: "240px" },
      }}
    >
      <Menu userRole={role} roleAdmin={roleAdmin} />

      <Typography variant="h4" gutterBottom>
        Módulos do Curso: {courseName}
      </Typography>

      {modules.length > 0 ? (
        modules.map((module) => (
          <Box key={module.id} sx={{ mb: 3, p: 2, backgroundColor: "#0A0F29", borderRadius: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {module.name}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {module.description}
            </Typography>
          </Box>
        ))
      ) : (
        <Typography>Nenhum módulo encontrado para este curso.</Typography>
      )}

      {role === "student" && isSubscribed === false && (
        <Button variant="contained" onClick={handleSubscribeCourse} sx={{ mt: 2 }}>
          Matricular-se
        </Button>
      )}

      {role === "student" && isSubscribed === true && hasCertificate === false && (
        <Button variant="contained" onClick={createCertificate} sx={{ mt: 2 }}>
          Concluir Curso
        </Button>
      )}

      {role === "student" && isSubscribed === true && hasCertificate === true && (
        <Button variant="contained" onClick={() => navigate('/student/certificates')} sx={{ mt: 2 }}>
          Ver Certificado
        </Button>
      )}

      <ErrorMessageModal
        open={openError}
        onClose={handleCloseError}
        type={errorInfo.type}
        message={errorInfo.message}
      />
    </Container>
  );
};

export default CourseDetails;