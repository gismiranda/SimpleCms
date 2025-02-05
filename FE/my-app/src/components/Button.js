import React from "react";
import { Button as MuiButton } from '@mui/material';

const Button = ({ type, onClick, children }) => (
    <MuiButton type={type} onClick={onClick} variant="contained" color="primary">
        {children}
    </MuiButton>
);

export default Button;