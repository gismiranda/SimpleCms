import React from "react";
import { Navigate } from "react-router-dom";

const SecureRoute = ({children}) => {
    const userId = localStorage.getItem('userId');
    return userId ? children : <Navigate to="/login" />;
};

export default SecureRoute;