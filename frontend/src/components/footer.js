import React from 'react';
import { Typography, Box } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#1E2951',
        color: 'white',
        textAlign: 'center',
        padding: '20px',
        bottom: 0,
        width: '100%',
        position: 'relative',
      }}
    >
      <Typography variant="body2" component="p">
        Desenvolvido por &copy; Learnfy
      </Typography>
      <Typography variant="body2" component="p">
        Alguns direitos reservados
      </Typography>
    </Box>
  );
};

export default Footer;