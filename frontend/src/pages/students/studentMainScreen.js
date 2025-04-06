import { useState, useEffect } from "react";

import {
  Box, Container, Typography,
  IconButton, useTheme, useMediaQuery,
  CircularProgress,
} from "@mui/material";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Menu from "../../components/Menu";
import CardStatiticsAdmin from "../../components/cardStatiticsAdmin";
import api from "../../service/api";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

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
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const cardsPerPage = isXs ? 1 : isSm ? 2 : 3;
  const cardWidth = isXs ? "90%" : isSm ? "45%" : "30%";
  const gapPx = 16;
  const cardWidthPx = isXs
    ? (90 * window.innerWidth) / 100
    : isSm
    ? window.innerWidth * 0.45
    : (window.innerWidth - 240) * 0.3;

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setRole(decoded.role);
        setRoleAdmin(decoded.role_adm || null);
      } catch (err) {
        console.error("Erro ao decodificar o token:", err);
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
        setError("Erro ao carregar cursos de lançamento");
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
    setIndex(Math.max(0, index - cardsPerPage));
  };
  
  const handleNext = (index, setIndex, total) => {
    const maxIndex = Math.max(0, total - cardsPerPage);
    setIndex(Math.min(index + cardsPerPage, maxIndex));
  };

  const CarouselSection = ({ title, data, index, setIndex }) => {
    const totalItems = data.length;
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
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
                <CircularProgress color="primary" />
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  transform: `translateX(-${index * (cardWidthPx + gapPx)}px)`,
                  transition: "transform 0.3s ease-in-out",
                }}
              >
                {data.map((item, i) => (
                  <CardStatiticsAdmin
                  key={i}
                  title={item.name || item.title}
                  description="Disponível"
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
    </Box>
  );
};

export default HomePage;
