import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Epilogue',
      'Arial',
      'sans-serif',
    ].join(','),
  },

  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          color: '#F8F9FA',
          borderColor: '#2176FF',
          '&.MuiTableCell-head': {
            fontWeight: 'bold',
            backgroundColor: '#155F90'
          }
        }
      }
    }
  }
});

export default theme;