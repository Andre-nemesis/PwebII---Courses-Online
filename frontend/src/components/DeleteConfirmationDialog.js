import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from '@mui/material';

const DeleteConfirmationDialog = ({ open, onClose, title, message, onConfirm, userName }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle> <strong>{title}</strong> </DialogTitle>
      <DialogContent sx={{ width: '385px'}}>
        <Typography textAlign='center'>
          {message} <strong>{userName}</strong>
        </Typography>
      </DialogContent>
      <DialogActions sx={{ marginTop: '-1px', gap: 2, marginTop: '-5px'}}>
        <Button onClick={onClose}
          sx={{
            color: "black",
            backgroundColor: "#60BFBF",
            padding: "5px 30px",
            "&:hover": { backgroundColor: "#50B7B7" }
          }}
        >
          Cancelar
        </Button>
        <Button onClick={onConfirm}
          sx={{
            color: "white",
            backgroundColor: "#FF342D",
            padding: "5px 25px",
            "&:hover": { backgroundColor: "#FF170F" }
          }}
        >
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
