import { Navigate, Outlet } from "react-router-dom";
// import Cookies from 'js-cookie';
import { verifyTokenRequest } from "#services/userServices.ts";
import { useState } from "react";

export const ProtectedRoutes = () => {

    const [auth, setAuth] = useState<boolean>(false);
    // const token = Cookies.get('token');
    const verify = async () => {
        const verificado = await verifyTokenRequest();
        if(verificado.status === 200) setAuth(true);
        return
    }
    
    verify();

    if(!auth) return <Navigate to="/login" />
    
    return <Outlet />
};
