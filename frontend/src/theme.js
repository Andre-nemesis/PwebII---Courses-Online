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
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          textAlign: 'center',
          backgroundColor: '#F8F9FA',
          padding: '16px',
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          backgroundColor: '#F8F9FA',
          padding: '16px 24px',
          maxWidth: '90%',
          width: '600px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '&.custom-textfield': {
            marginBottom: '12px',
            '& .MuiInputBase-root': {
              backgroundColor: '#1E2951',
              color: '#EAEFF7',
              border: '1px solid rgba(200, 208, 218, 0.25)',
            },
            '& .MuiInputLabel-root': {
              color: '#2176FF',
            },
          },
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          justifyContent: 'center',
          gap: 2,
          padding: '10px 24px',
          marginTop: '8px',
        },
      },
    },
  }
});

export default theme;