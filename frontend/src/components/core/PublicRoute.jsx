import React from 'react';
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PublicRoute({ children }) {
    const { token } = useSelector((store) => store.auth)

    // if (token === null) {
    //     return children
    // } else {
    //     return <Navigate to="/" />
    // }
    return children ;
    
}

export default PublicRoute;