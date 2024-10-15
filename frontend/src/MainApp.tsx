import { Routes, Route, Navigate } from "react-router-dom";
import { App } from "./App";
import { Chat } from "./Chat";
import { ProtectedRoutes } from "./ProtectedRoutes";


export const MainApp = () => {

    return (
        <Routes>
            <Route path="/login" element={<App />} />
            <Route
                path="/protected/*"
                element={
                    <Routes>
                        <Route element={<ProtectedRoutes />}>
                            <Route
                                path="chat"
                                element={<Chat />}
                            />
                        </Route>
                    </Routes>
                }
            />
            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    );
};
