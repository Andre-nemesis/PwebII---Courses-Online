import React from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";

import { Close, Title, AccessTime } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#F8FAFC",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const CreateModuleModal = ({ open, handleClose }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" fontWeight="bold" textAlign="center" mb={2}>
          Módulo
        </Typography>
        <TextField
          fullWidth
          label="Nome"
          variant="filled"
          sx={{ mb: 2, backgroundColor: "#0A0F29", color: "white", borderRadius: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Title sx={{ color: "white" }} />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          label="Quantidade de Horas"
          variant="filled"
          type="number"
          sx={{ mb: 3, backgroundColor: "#0A0F29", color: "white", borderRadius: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccessTime sx={{ color: "white" }} />
              </InputAdornment>
            ),
          }}
        />
        <Box display="flex" justifyContent="space-between">
          <Button variant="contained" sx={{ bgcolor: "#F44336" }} onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="contained" sx={{ bgcolor: "#26C6DA" }}>
            Salvar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateModuleModal;
