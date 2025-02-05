import React from "react";
import { Typography } from '@mui/material';

const ErrorMessage = ({ message }) => (
    message ? <Typography color="error">{message}</Typography> : null
);

export default ErrorMessage;