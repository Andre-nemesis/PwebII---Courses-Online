import React from 'react';
import { Dialog, 
            DialogActions, 
            DialogContent, 
            DialogTitle, 
            Button, 
            Typography 
        } from '@mui/material';

const LogoutModal = ({ open, onClose, onConfirm }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle> <strong>Sair da conta?</strong> </DialogTitle>

            <DialogContent sx={{ width: '350px' }}>
                <Typography component="p" variant="body1" sx={{ mb: 1}}>
                    Deseja realmente sair da sua conta? Ao clicar em "Sair da Conta", 
                    será necessário realizar login novamente
                </Typography>

                <DialogActions sx={{ display: 'flex', flexDirection: 'row', width: '100vw', gap: '5px' }}>
                    <Button onClick={onClose}
                        sx={{ 
                            padding: "15px 20px",
                            backgroundColor: "#2176FF",
                            borderRadius: "1px",
                            color: "#2176FF",
                            textTransform: "uppercase",
                            letterSpacing: "2px"
                        }}
                    
                        >
                        Cancelar
                    </Button>

                    <Button onClick={onConfirm}
                        sx={{ 
                            padding: "15px 20px",
                            border: "1px solid #2176FF",
                            borderRadius: "1px",
                            color: "#EAEFF7",
                            textTransform: "uppercase",
                            letterSpacing: "2px"
                         }}
                    
                    >
                        Sair da Conta
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
};

export default LogoutModal;
