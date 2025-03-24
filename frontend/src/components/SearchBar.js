import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';

const SearchBar = ({ value, onChange }) => {
    return (
        <TextField
            variant="outlined"
            fullWidth
            placeholder="Buscar..."
            value={value}
            onChange={onChange}
            InputProps={{
                startAdornment: (
                    <InputAdornment sx={{color:'#040D33'}} position="end">
                        <Search />
                    </InputAdornment>
                ),
            }}
            sx={{
                backgroundColor:'#2176FF',
                color:'#040D33',
                borderRadius:2,
                border:'none',
                width: { xs: '100%', sm: '40%' },
                marginBottom: { xs: 1, sm: 2 },
                '& .MuiOutlinedInput-root': {
                    height: { xs: '32px', sm: '40px' },
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                    padding: { xs: '0 6px', sm: '0 8px' },
                },
                '& .MuiInputBase-input': {
                    padding: { xs: '0 0 0 6px', sm: '0 0 0 8px' },
                },
                '& .MuiInputAdornment-root': {
                    height: { xs: '32px', sm: '40px' },
                    display: 'flex',
                    alignItems: 'center',
                    '& .MuiSvgIcon-root': {
                        fontSize: { xs: '0.875rem', sm: '1rem' },
                    },
                },
                '& .MuiInputBase-input::placeholder': {
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                },
            }}
        />
    );
};

export default SearchBar;