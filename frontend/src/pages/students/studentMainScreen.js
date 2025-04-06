import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Menu from "../../components/Menu";
import CardStatiticsAdmin from "../../components/cardStatiticsAdmin";
import api from "../../service/api";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import ErrorMessageModal from '../../components/ErrorMessageModal';

const coursesViewed = [
  { title: "Fundamentos de Front-end", status: "Iniciado", hours: "30", action: "Continuar" },
  { title: "Fundamentos da Ciência de dados", status: "Iniciado", hours: "35", action: "Continuar" },
  { title: "Introdução a Lógica de Programação", status: "Iniciado", hours: "20", action: "Continuar" },
];

const HomePage = () => {
  const [launchCourses, setLaunchCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [launchIndex, setLaunchIndex] = useState(0);
  const [viewedIndex, setViewedIndex] = useState(0);
  const [role, setRole] = useState(null);
  const [roleAdmin, setRoleAdmin] = useState(null);
  const [authenticated, setAuthenticated] = useState(true);
  const navigate = useNavigate();
  const [openError, setOpenError] = useState(false);
  const [errorInfo, setErrorInfo] = useState({ type: "error", message: "" });

  const cardsPerPage = 3; 
  const cardWidth = "30%"; 

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setRole(decoded.role);
        setRoleAdmin(decoded.role_adm || null);
      } catch (err) {
        setErrorInfo({ message: err.message });
        setOpenError(true);
        setAuthenticated(false);
      }
    } else {
      setAuthenticated(false);
    }

    const fetchCourses = async () => {
      try {
        const response = await api.get("/courses/");
        setLaunchCourses(response.data);
      } catch (err) {
        setErrorInfo({ message: err.message });
        setOpenError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (!authenticated) {
    navigate("/login");
    return null;
  }

  const handlePrev = (index, setIndex) => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const handleNext = (index, setIndex, total) => {
    if (index + cardsPerPage < total) {
      setIndex(index + 1);
    }
  };

  const handleCloseError = () => setOpenError(false);

  const CarouselSection = ({ title, data, index, setIndex }) => {
    const totalItems = data.length;
    const visibleItems = data.slice(index, index + cardsPerPage);

    return (
      <Container sx={{ py: 2, px: 0, maxWidth: "100%", overflow: "hidden" }}>
        <Typography variant="h6" sx={{ color: "#FFFFFF", mb: 2, px: 2 }}>{title}</Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, px: 2 }}>
          <IconButton
            onClick={() => handlePrev(index, setIndex)}
            disabled={index === 0}
            sx={{ color: "#FFFFFF", "&:disabled": { color: "gray" } }}
          >
            <ArrowBackIosIcon />
          </IconButton>
          <Box sx={{ overflow: "hidden", flex: 1 }}>
            {loading && title === "Lançamentos" ? (
              <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
                <CircularProgress color="primary" />
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  transition: "transform 0.3s ease-in-out",
                }}
              >
                {visibleItems.map((item, i) => (
                  <CardStatiticsAdmin
                    key={i}
                    title={item.name || item.title}
                    description={item.status ? item.status: "Disponivel"}
                    value={`${item.qtd_hours || item.hours || "0"}h`}
                    action={item.action || "Ver curso"}
                    sx={{
                      width: cardWidth,
                      minWidth: cardWidth,
                      maxWidth: cardWidth,
                    }}
                  />
                ))}
              </Box>
            )}
          </Box>
          <IconButton
            onClick={() => handleNext(index, setIndex, totalItems)}
            disabled={index + cardsPerPage >= totalItems}
            sx={{ color: "#FFFFFF", "&:disabled": { color: "gray" } }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      </Container>
    );
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", overflowX: "hidden" }}>
      <Menu userRole={role} roleAdmin={roleAdmin} />
      <Box sx={{ flex: 1, minHeight: "100vh", padding: 2 }}>
        <Container sx={{ maxWidth: "100%", px: 0 }}>
          <Typography
            component="h1"
            variant="h5"
            sx={{ color: "#FFFFFF", mb: 2, mt: { xs: 7, md: 4 }, px: 2 }}
          >
            Página Inicial
          </Typography>
        </Container>

        <CarouselSection
          title="Lançamentos"
          data={launchCourses}
          index={launchIndex}
          setIndex={setLaunchIndex}
        />
        <CarouselSection
          title="Recentemente visto"
          data={coursesViewed}
          index={viewedIndex}
          setIndex={setViewedIndex}
        />
      </Box>
      <ErrorMessageModal open={openError} onClose={handleCloseError} type={errorInfo.type} message={errorInfo.message} />
    </Box>
  );
};

export default HomePage;