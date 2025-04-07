import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import { Title, AccessTime } from "@mui/icons-material";
import api from "../service/api";
import { jwtDecode } from "jwt-decode";
import SuccessMessageModal from "./SuccessMessageModal";

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

const CreateModuleModal = ({ open, onClose, id, data }) => {
  const [hours, setHours] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [openMessage, setOpenMessage] = useState(false);
  const [messageInfo, setMessageInfo] = useState({ type: "success", message: "" });

  useEffect(() => {
    if (open) {
      if (id && data) {
        setName(data.name || "");
        setHours(data.qtd_hours ? String(data.qtd_hours) : "");
      } else {
        setName("");
        setHours("");
      }
      setError("");
    }
  }, [open, id, data]);

  const handleHoursChange = (event) => {
    const value = event.target.value;
    if (value === "" || Number(value) >= 0) {
      setHours(value);
    }
  };

  const handleCreateModule = async () => {
    try {
      if (!name || !hours) {
        setError("Por favor, preencha todos os campos.");
        return;
      }

      const token = jwtDecode(localStorage.getItem("token"));
      await api.post("/modules/", {
        teacher_id: token.id,
        name: name,
        qtd_hours: Number(hours),
      });
      setMessageInfo({ type: "success", message: "Módulo cadastrado com sucesso!" });
      setOpenMessage(true);
      setName("");
      setHours("");
      setError("");
      onClose();
    } catch (error) {
      setError("Erro ao criar o módulo. Tente novamente.");
      console.error("Erro ao criar módulo:", error);
    }
  };

  const handleUpdateModule = async () => {
    try {
      if (!name || !hours) {
        setError("Por favor, preencha todos os campos.");
        return;
      }

      const token = jwtDecode(localStorage.getItem("token"));
      await api.put(`/modules/${id}`, {
        teacher_id: token.id,
        name: name,
        qtd_hours: Number(hours),
      });
      setMessageInfo({ type: "success", message: "Módulo atualizado com sucesso!" });
      setOpenMessage(true);
      setName("");
      setHours("");
      setError("");
      onClose();
    } catch (error) {
      setError("Erro ao atualizar o módulo. Tente novamente.");
      console.error("Erro ao atualizar módulo:", error);
    }
  };

  const handleCloseMessage = () => setOpenMessage(false);

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box sx={style}>
          <Typography variant="h6" fontWeight="bold" textAlign="center" mb={2}>
            {id ? "Editar Módulo" : "Criar Módulo"}
          </Typography>
          {error && (
            <Typography color="error" textAlign="center" mb={2}>
              {error}
            </Typography>
          )}
          <TextField
            fullWidth
            label="Nome"
            variant="filled"
            value={name}
            onChange={(event) => setName(event.target.value)}
            sx={{
              mb: 2,
              backgroundColor: "#0A0F29",
              borderRadius: 1,
              "& .MuiFilledInput-root": { color: "white" },
              "& .MuiInputLabel-root": { color: "white" },
              "& .MuiInputLabel-root.Mui-focused": { color: "white" },
              "& .MuiFilledInput-underline:before": { borderBottomColor: "white" },
              "& .MuiFilledInput-underline:after": { borderBottomColor: "#26C6DA" },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Title sx={{ color: "white" }} />
                </InputAdornment>
              ),
            }}
            InputLabelProps={{ style: { color: "white" } }}
          />
          <TextField
            fullWidth
            label="Quantidade de Horas"
            variant="filled"
            type="number"
            value={hours}
            onChange={handleHoursChange}
            sx={{
              mb: 3,
              backgroundColor: "#0A0F29",
              borderRadius: 1,
              "& .MuiFilledInput-root": { color: "white" },
              "& .MuiInputLabel-root": { color: "white" },
              "& .MuiInputLabel-root.Mui-focused": { color: "white" },
              "& .MuiFilledInput-underline:before": { borderBottomColor: "white" },
              "& .MuiFilledInput-underline:after": { borderBottomColor: "#26C6DA" },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccessTime sx={{ color: "white" }} />
                </InputAdornment>
              ),
              inputProps: { min: 0 },
            }}
            InputLabelProps={{ style: { color: "white" } }}
          />
          <Box display="flex" justifyContent="space-between">
            <Button variant="contained" sx={{ bgcolor: "#F44336" }} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              variant="contained"
              sx={{ bgcolor: "#26C6DA" }}
              onClick={id ? handleUpdateModule : handleCreateModule}
            >
              Salvar
            </Button>
          </Box>
        </Box>
      </Modal>
      <SuccessMessageModal
        open={openMessage}
        onClose={handleCloseMessage}
        type={messageInfo.type}
        message={messageInfo.message}
      />
    </>
  );
};

export default CreateModuleModal;