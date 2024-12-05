import React from 'react';
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children, requiredRole }) {
    const { token, user } = useSelector(state => state.auth);
    
    console.log("token in private", token) ;
    
    if (token && ( !requiredRole || user.toLowerCase() === requiredRole.toLowerCase())) {
        return children;
    } else { 
        console.log("auth to home") ;
        return <Navigate to="/auth" />;
    }
}

export default PrivateRoute;
