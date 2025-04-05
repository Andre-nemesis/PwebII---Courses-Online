import api from "../../service/api";
import { useState, useEffect } from "react";
import Menu from "../../components/Menu";
import { Box, Container, Typography, IconButton, useTheme, useMediaQuery } from "@mui/material";
import ErrorMessageModal from "../../components/ErrorMessageModal";
import CardStatiticsAdmin from "../../components/cardStatiticsAdmin";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const mainScreen = () => {
  const [coursesModules, setCoursesModules] = useState(null);
  const [coursesStudents, setCoursesStudents] = useState(null);
  const [modulesTeachers, setModulesTeachers] = useState(null);
  const [adminCourse, setAdminCourse] = useState(null);
  const [openError, setOpenError] = useState(false);
  const [errorInfo, setErrorInfo] = useState({ type: "error", message: "" });

  const [studentsIndex, setStudentsIndex] = useState(0);
  const [adminIndex, setAdminIndex] = useState(0);
  const [modulesIndex, setModulesIndex] = useState(0);
  const [teachersIndex, setTeachersIndex] = useState(0);

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm")); // Até 600px
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md")); // 600px a 960px
  const isMd = useMediaQuery(theme.breakpoints.between("md", "lg")); // 960px a 1280px
  const isLg = useMediaQuery(theme.breakpoints.up("lg")); // Acima de 1280px

  // Ajuste dinâmico do número de cartões e largura
  const cardsPerPage = isXs ? 1 : isSm ? 2 : 3;
  const cardWidth = isXs ? "90%" : isSm ? "45%" : "30%"; // Ajustado para 30% em telas grandes para caber 3 cartões

  const handleCloseError = () => setOpenError(false);

  useEffect(() => {
    const fetchData = async () => {
      let response;
      try {
        response = await api.get('/courses/view/student-by-course');
        console.log("Estudantes por Curso:", response.data);
        setCoursesStudents(response.data);

        response = await api.get('/courses/view/course-by-admin');
        console.log("Cursos por Admin:", response.data);
        setAdminCourse(response.data);

        response = await api.get('/courses/view/modules-by-course');
        console.log("Módulos por Curso:", response.data);
        setCoursesModules(response.data);

        response = await api.get('/modules/view/modules-by-teacher');
        console.log("Módulos por Professor:", response.data);
        setModulesTeachers(response.data);
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
      setIndex(currentIndex - cardsPerPage);
    }
  };

  const handleNext = (currentIndex, setIndex, totalItems) => {
    if (currentIndex + cardsPerPage < totalItems) {
      setIndex(currentIndex + cardsPerPage);
    }
  };

  const CarouselSection = ({ title, data, index, setIndex, dataKey, titleField, valueField, description }) => {
    const totalItems = data?.[dataKey]?.length || 0;
    // Calcula a largura do cartão em pixels para o translateX
    const cardWidthPx = isXs
      ? (90 * window.innerWidth) / 100
      : isSm
      ? window.innerWidth * 0.45
      : (window.innerWidth - 240) * 0.3;
    const gapPx = 16;

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
                  transform: `translateX(-${index * (cardWidthPx + gapPx)}px)`,
                  transition: "transform 0.3s ease-in-out",
                }}
              >
                {data?.[dataKey]?.map((item) => (
                  <CardStatiticsAdmin
                    key={item[titleField]}
                    title={item[titleField]}
                    description={description}
                    value={item[valueField]}
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
      {/* Menu Lateral */}
      <Box>
        <Menu userRole={"admin"} roleAdmin={"admin"} />
      </Box>

      {/* Conteúdo Principal */}
      <Box
        sx={{
          flex: 1,
          minHeight: "100vh",
          padding: 2,
          overflowX: "hidden"
        }}
      >
        <Container sx={{ maxWidth: "100%", px: 0 }}>
          <Typography component="h1" variant="h5" sx={{ color: "#FFFFFF", mb: 2, mt: { xs: 7, md: 4 }, px: { xs: 1, sm: 2, md: 4 }, px: 2 }}>
            Página Inicial
          </Typography>
        </Container>

        <CarouselSection
          title="Estudantes por Curso"
          data={coursesStudents}
          index={studentsIndex}
          setIndex={setStudentsIndex}
          dataKey="courses"
          titleField="courseName"
          valueField="studentCount"
          description="Número de estudantes inscritos"
        />

        <CarouselSection
          title="Cursos por Administrador"
          data={adminCourse}
          index={adminIndex}
          setIndex={setAdminIndex}
          dataKey="countCourses"
          titleField="userName"
          valueField="courseCount"
          description="Número de cursos criados"
        />

        <CarouselSection
          title="Módulos por Curso"
          data={coursesModules}
          index={modulesIndex}
          setIndex={setModulesIndex}
          dataKey="courses"
          titleField="courseName"
          valueField="moduleCount"
          description="Número de módulos associados"
        />

        <CarouselSection
          title="Módulos por Professor"
          data={modulesTeachers}
          index={teachersIndex}
          setIndex={setTeachersIndex}
          dataKey="teachers"
          titleField="userName"
          valueField="moduleCount"
          description="Número de módulos lecionados"
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

export default mainScreen;