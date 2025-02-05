import React from "react";
import { TextField } from '@mui/material';

const Input = ({ label, type, value, onChange, required }) => (
    <TextField
        label={label}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        variant="outlined"
        fullWidth
        margin="normal"
    />
);

export default Input;