import React from "react";
import { Snackbar, Alert } from "@mui/material";

const ErrorMessageModal = ({ 
  open, 
  onClose, 
  type = "error", 
  message = "Ocorreu um erro na operação!" 
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert 
        onClose={onClose} 
        severity={type} 
        sx={{ width: "100%" }}
        variant="filled"
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ErrorMessageModal;