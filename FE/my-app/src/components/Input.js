import React from "react";

const Input = ({ label, type, value, onChange, required}) => (
    <div>
        <label>{label}</label>
        <input type={type} value={value} onChange={onChange} required={required} />
    </div>
);

export default Input;