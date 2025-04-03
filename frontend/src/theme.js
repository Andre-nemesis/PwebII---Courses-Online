import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: ['Epilogue', 'Arial', 'sans-serif'].join(','),
  },

  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          color: '#F8F9FA',
          borderColor: '#2176FF',
          '&.MuiTableCell-head': {
            fontWeight: 'bold',
            backgroundColor: '#155F90',
          },
        },
      },
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
              color: '#FFFFFF',
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
    MuiFormControl: {
      styleOverrides: {
        root: {
          width: '100%',
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: '#1E2951',
          fontSize: '0.875rem',
          '&.custom-form-helper-text': {
            fontWeight: 'bold',
            opacity: 0.9,
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          backgroundColor: '#1E2951',
          color: '#EAEFF7',
          border: '1px solid rgba(200, 208, 218, 0.25)',
          '& .MuiSvgIcon-root': {
            color: '#EAEFF7',
          },
          '&:hover': {
            backgroundColor: '#2A3570',
          },
          '&.custom-select': {
            borderRadius: '8px',
            padding: '4px',
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: '#EAEFF7',
          backgroundColor: '#1E2951',
          '&:hover': {
            backgroundColor: '#2A3570',
          },
          '&.Mui-selected': {
            backgroundColor: '#155F90',
            color: '#FFFFFF',
            '&:hover': {
              backgroundColor: '#040D33', 
            },
          },
          '&.custom-menu-item': {
            padding: '8px 16px',
            fontSize: '1rem',
          },
        },
      },
    },
  },
});

export default theme;