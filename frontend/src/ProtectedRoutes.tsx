import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoutes = () => {
    
    const token = localStorage.getItem('token'); // Obtiene el token del localStorage

    // Si no hay token, redirige al usuario a la página de inicio de sesión
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Si hay un token, renderiza los componentes hijos
    return <Outlet />;
};
