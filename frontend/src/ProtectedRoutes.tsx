import { Navigate, Outlet } from "react-router-dom";
// import Cookies from 'js-cookie';
import { verifyTokenRequest } from "#services/userServices.ts";

export const ProtectedRoutes = () => {

    // const token = Cookies.get('token');
    const verify = async () => {
        const verificado = await verifyTokenRequest();

        if(verificado.status === 200) return <Outlet />
        else return <Navigate to="/login" replace />;
    }

    verify();

};
