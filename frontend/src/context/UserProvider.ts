import { ReactNode, useEffect, useState } from 'react'
import { UserContext } from '#context/UserContext.ts';
import { loginRequest, verifyTokenRequest } from '#services/userServices.ts';
import Cookies from 'js-cookie';
import { Usuario } from '#models/Usuario.ts'

interface UserProviderProps {
    children: ReactNode;
}


export const UserProvider = ({ children }: UserProviderProps) => {


    // Estado del usuario.
    const [usuario, setUsuario] = useState<string | null>(null);

    // Estado de la carga de los datos para el checkLogin.
    const [loading, setLoading] = useState<boolean>(true);

    // Estado para verificar si esta autenticado el usuario.
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const [accesos, setAccesos] = useState<string | null>(null);

    const [errores, setErrores] = useState<string[] | null>(null);


    // Envia los datos al backend e inicia al usuario en sesión.
    const iniciarSesion = async (usuario: Usuario) => {
        try {
            const res = await loginRequest(usuario);
            if (res.data.errors) {
                setUsuario(null);
                setAccesos(null);
                setIsAuthenticated(false);
                setErrores(res.data.errors);
            } else if(res.data.token) {
                setUsuario(res.data);
                setAccesos(res.data.token);
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const token = Cookies.get('token');

        const checkLogin = async () => {
            try {
                const res = await verifyTokenRequest();
                if (!res.data) {
                    setUsuario(null);
                    setLoading(false);
                    return;
                }

                setUsuario(res.data);
                setIsAuthenticated(true);
                setLoading(false);
                return;
            } catch (error) {
                setUsuario(null);
                setIsAuthenticated(false);
                setLoading(false);
                console.log(error);
            }
        }

        if (token) checkLogin();
        else {
            setIsAuthenticated(false);
            setUsuario(null);
            setLoading(false);
        }
    }, []);


    // return (
    //     <UserContext.Provider value={{ iniciarSesion, usuario, accesos, isAuthenticated, loading, errores, setErrores, }} >
    //         {children}
    //     </UserContext.Provider>
    // )
}