import { Routes, Route, Navigate } from "react-router-dom";
import { App } from "./App";
import { Chat } from "./Chat";
import { useEffect, useState } from "react";
import { ProtectedRoutes } from "./ProtectedRoutes";
import Cookies from 'js-cookie';


export const MainApp = () => {
    const [nombre, setNombre] = useState<string>("");

    useEffect(() => {
        const storedNombre = Cookies.get("nombre");
        if(storedNombre) {
            setNombre(storedNombre);
        }
    }, []);

    useEffect(() => {
        if(nombre) Cookies.set("nombre", nombre);
    }, [nombre]);

    return (
        <Routes>
            <Route path="/login" element={<App nombre={setNombre} />} />
            <Route
                path="/protected/*"
                element={
                    <Routes>
                        <Route element={<ProtectedRoutes />}>
                            <Route
                                path="chat"
                                element={<Chat nombre={nombre} />}
                            />
                        </Route>
                    </Routes>
                }
            />

            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    );
};
