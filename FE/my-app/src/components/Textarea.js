import React from "react";

const Textarea = ({label, value, onChange, required}) => (
    <div>
        <label>{label}</label>
        <textarea value={value} onChange={onChange} required={required}/>
    </div>
);

export default Textarea;