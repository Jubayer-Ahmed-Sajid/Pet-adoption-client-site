import React from 'react';
import useAuth from '../Components/Hooks/useAuth';
import { Spinner } from "@material-tailwind/react";
import { Navigate, useLocation } from 'react-router-dom';
const PrivateRoutes = ({children}) => {
    const location = useLocation()
    const {user,loading} = useAuth()
    if(loading){
        return <Spinner className="h-16 w-16 text-gray-900/50" />;
    }
    if(user && !loading){
        return children
    }
    return <Navigate to="/signin" state={{from: location}} replace ></Navigate>
};

export default PrivateRoutes;