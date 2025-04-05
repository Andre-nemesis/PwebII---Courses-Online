import api from "../../service/api";
import React, { useState } from "react";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Menu from "../../components/Menu";
import { Box, Typography, Card, CardContent, Avatar, IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const HomePageTeacher = ({userRole }) => {


  const [modules, setModules] = useState(null);
  const [teacher, setTeacher] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
        let response;
        try {
            response = await api.get('/modules/view/modules-by-teacher');
            console.log("Módulos criados", response.data);
            setModules(response.data);

            response = await api.get('/teachers/view/teacher-by-id');
            console.log("Professores cadastrados", response.data);
            setTeacher(response.data);
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", color: "white" }}>
        {/* Menu lateral */}
        <Box sx={{ width: 250, flexShrink: 0 }}>
            <Menu userRole={userRole} />
        </Box>

        {/* Conteúdo principal */}
        <Box sx={{ flexGrow: 1, padding: 3 }}>
            <Typography variant="h5" fontWeight="bold">Página Inicial</Typography>

            {/* Módulos Criados */}
            <Typography variant="h6" mt={3}>Últimos módulos criados</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
                <IconButton sx={{ color: "white" }}>
                    <ArrowBackIosNewIcon />
                </IconButton>
                {modules.map((mod, index) => (
                    <Card key={index} sx={{ backgroundColor: "#1e293b", color: "white", width: 200 }}>
                        <CardContent>
                            <Typography variant="h6">{mod.title}</Typography>
                            <Typography variant="body2">{mod.duration}</Typography>
                            <Typography variant="body2" sx={{ color: "#38bdf8", cursor: "pointer" }}>Ver módulo →</Typography>
                        </CardContent>
                    </Card>
                ))}
                <IconButton sx={{ color: "white" }}>
                    <ArrowForwardIosIcon />
                </IconButton>
            </Box>

            {/* Professores */}
            <Typography variant="h6" mt={4}>Professores</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
                <IconButton sx={{ color: "white" }}>
                    <ArrowBackIosNewIcon />
                </IconButton>
                {teacher.map((prof, index) => (
                    <Card key={index} sx={{ backgroundColor: "#1e293b", color: "white", width: 200, display: "flex", alignItems: "center", padding: 1 }}>
                        <Avatar sx={{ width: 40, height: 40, marginRight: 1 }} />
                        <Box>
                            <Typography variant="body1">{prof.name}</Typography>
                            <Typography variant="body2">{prof.role}</Typography>
                        </Box>
                    </Card>
                ))}
                <IconButton sx={{ color: "white" }}>
                    <ArrowForwardIosIcon />
                </IconButton>
            </Box>
        </Box>
    </Box>
  );
}
export default HomePageTeacher;
