import React from "react";
import { Snackbar, Alert } from "@mui/material";

const SuccessMessageModal = ({ open, onClose, type = "success", message = "Operação realizada com sucesso!" }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert onClose={onClose} severity={type} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SuccessMessageModal;
