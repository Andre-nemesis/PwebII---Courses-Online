import { React, useState } from "react";
import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CreateModuleModal from "./CreateModuleModal";

const CardModule = ({ title, description, typeUser, id }) => {
  const [openModal, setOpenModal] = useState(false);
  
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  return (
    <Card sx={{ backgroundColor: "#0A0F29", color: "white", padding: 2, borderRadius: 2, width: 280 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold">
          <strong>{title}</strong>
        </Typography>
        <Typography variant="body2" color="gray" sx={{ marginBottom: 1 }}>
          {description}
        </Typography>
        {typeUser ? (
          <Box display="flex" alignItems="center">
            <Button onClick={handleOpen} sx={{ color: "#00AEEF", fontWeight: "bold" }}>
              Editar Módulo
            </Button>
            <ArrowForwardIosIcon sx={{ color: "#00AEEF", fontSize: 16, marginLeft: 0.5 }} />
          </Box>
        ) : null}

      </CardContent>
      <CreateModuleModal open={openModal} onClose={handleClose} id={id} data={{ name: title, qtd_hours: description.replace(" h","") }} />
    </Card>
  );
};

export default CardModule;
