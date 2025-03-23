import React from 'react';
import TextField from '@mui/material/TextField';

const applyMask = (value, mask) => {
  let maskedValue = '';
  let rawValueIndex = 0;

  for (let i = 0; i < mask.length; i++) {
    if (mask[i] === '9') {
      if (rawValueIndex < value.length) {
        maskedValue += value[rawValueIndex];
        rawValueIndex++;
      } else {
        break;
      }
    } else {
      maskedValue += mask[i];
    }
  }
  return maskedValue;
};

export const MaskedTextField = ({ id, value, onChange, mask, label, icon, ...props }) => {
  const handleChange = (event) => {
    const rawValue = event.target.value.replace(/\D/g, '');
    onChange(applyMask(rawValue, mask));
  };

  return (
    <TextField
      {...props}
      id={id} 
      label={label}
      value={value}
      onChange={handleChange}
      variant="outlined"
      fullWidth
      InputProps={{
        startAdornment: icon, 
      }}
    />
  );
};

export default MaskedTextField;
