import React from "react";

const Button = ({ type, onClick, children}) => (
    <button type={type} onClick={onClick}>
        {children}
    </button>
);

export default Button;