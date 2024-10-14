import { Navigate, Outlet } from "react-router-dom";
import Cookies from 'js-cookie';

export const ProtectedRoutes = () => {

    const token = Cookies.get('token');

    if (!token) return <Navigate to="/login" replace />;

    return <Outlet />;
};
