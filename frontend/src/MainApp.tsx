import { Routes, Route, Navigate } from "react-router-dom";
import { App } from "./App";
import { Chat } from './Chat';
import { useState } from "react";

export const MainApp = () => {

    const [nombre, setNombre] = useState<string>("");

    return (
        <Routes>
            <Route path="/login" element={<App nombre={setNombre}/>} />
            <Route path="/chat" element={<Chat nombre={nombre} />} />
            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    );
};
