import api from "../../service/api";
import { useState, useEffect } from "react";
import Menu from "../../components/Menu";
import { Box, Container, Typography, IconButton } from "@mui/material";
import ErrorMessageModal from "../../components/ErrorMessageModal";
import CardStatiticsAdmin from "../../components/cardStatiticsAdmin";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { jwtDecode } from "jwt-decode";

const MainScreenTeacher = () => {
  const [modules, setModules] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [openError, setOpenError] = useState(false);
  const [errorInfo, setErrorInfo] = useState({ type: "error", message: "" });

  const [modulesIndex, setModulesIndex] = useState(0);
  const [teachersIndex, setTeachersIndex] = useState(0);

  const cardsPerPage = 3; 
  const cardWidth = "30%"; 

  const handleCloseError = () => setOpenError(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = jwtDecode(localStorage.getItem("token"));
        const modulesResponse = await api.get(`/modules/leatest/${token.id}`);
        setModules(modulesResponse.data);

        const teachersResponse = await api.get("/teachers/");
        const sortedTeachers = teachersResponse.data.sort((a, b) =>
          a.User.name.localeCompare(b.User.name)
        );
        setTeachers(sortedTeachers);
      } catch (error) {
        setOpenError(true);
        setErrorInfo({ type: "error", message: "Falha ao carregar dados." });
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handlePrev = (currentIndex, setIndex, totalItems) => {
    if (currentIndex > 0) {
      setIndex(currentIndex - 1);
    }
  };

  const handleNext = (currentIndex, setIndex, totalItems) => {
    if (currentIndex + cardsPerPage < totalItems) {
      setIndex(currentIndex + 1);
    }
  };

  const CarouselSection = ({ title, data, index, setIndex, titleField, valueField, description }) => {
    const totalItems = data?.length || 0;
    const visibleItems = data?.slice(index, index + cardsPerPage) || [];

    return (
      <Container sx={{ py: 2, px: 0, maxWidth: "100%", overflow: "hidden" }}>
        <Typography variant="h6" sx={{ color: "#FFFFFF", mb: 2, px: 2 }}>
          {title}
        </Typography>
        {totalItems > 0 ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, px: 2 }}>
            <IconButton
              onClick={() => handlePrev(index, setIndex, totalItems)}
              disabled={index === 0}
              sx={{ color: "#FFFFFF", "&:disabled": { color: "gray" } }}
            >
              <ArrowBackIosIcon />
            </IconButton>
            <Box sx={{ overflow: "hidden", flex: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  transition: "transform 0.3s ease-in-out",
                }}
              >
                {visibleItems.map((item) => (
                  <CardStatiticsAdmin
                    key={item.id}
                    title={titleField === "User.name" ? item.User.name : item[titleField]}
                    description={description}
                    value={valueField === "academic_formation" ? item[valueField] : item[valueField]}
                    sx={{ width: cardWidth, minWidth: cardWidth, maxWidth: cardWidth }}
                  />
                ))}
              </Box>
            </Box>
            <IconButton
              onClick={() => handleNext(index, setIndex, totalItems)}
              disabled={index + cardsPerPage >= totalItems}
              sx={{ color: "#FFFFFF", "&:disabled": { color: "gray" } }}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
        ) : (
          <Typography sx={{ color: "#C8D0DA", px: 2 }}>Nenhum dado disponível.</Typography>
        )}
      </Container>
    );
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", overflowX: "hidden" }}>
      <Box>
        <Menu userRole={"teacher"} roleAdmin={"teacher"} />
      </Box>

      <Box sx={{ flex: 1, minHeight: "100vh", padding: 2, overflowX: "hidden" }}>
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
          title="Últimos módulos criados"
          data={modules}
          index={modulesIndex}
          setIndex={setModulesIndex}
          titleField="name"
          valueField="qtd_hours"
          description="Quantidade de horas"
        />

        <CarouselSection
          title="Professores"
          data={teachers}
          index={teachersIndex}
          setIndex={setTeachersIndex}
          titleField="User.name"
          valueField="academic_formation"
          description="Formação acadêmica"
        />

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

export default MainScreenTeacher;