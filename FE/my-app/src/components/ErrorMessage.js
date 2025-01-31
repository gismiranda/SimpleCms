import React from "react";

const ErrorMessage = ({ message }) => (
    message ?  <p style={{color: 'red'}}></p> : null
);

export default ErrorMessage;