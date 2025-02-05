import React from "react";
import { TextField } from '@mui/material';

const Textarea = ({ label, value, onChange, required }) => (
    <TextField
        label={label}
        value={value}
        onChange={onChange}
        required={required}
        variant="outlined"
        fullWidth
        margin="normal"
        multiline
        rows={4}
    />
);

export default Textarea;