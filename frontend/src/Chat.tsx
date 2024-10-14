import { DarkModeButton } from "#components/DarkModeButton/DarkModeButton.tsx";
import { LogOutButton } from "#components/LogOutButton/LogOutButton.tsx";
import { MarcaPersonal } from "#components/MarcaPersonal/MarcaPersonal.tsx";
import { useState, useEffect, FormEvent, KeyboardEvent, useRef } from "react";
import Cookies from 'js-cookie';
import io from "socket.io-client";

const socket = io("http://localhost:3000");

interface ChatProps {
    nombre: string;
}

interface Message {
    body: string;
    hour: string;
    from?: string;
    isMine?: boolean;
}

export const Chat: React.FC<ChatProps> = ({ nombre }) => {
    const [message, setMessage] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);

    const nombreCookie = Cookies.get("nombre");

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const fecha = new Date();
        const timestamp = `${fecha.getHours()}:${
            fecha.getMinutes().toString().length == 1
                ? "0" + fecha.getMinutes()
                : fecha.getMinutes()
        }`;
        if (message === "" || message === null) return;
        const newMessage = {
            body: message,
            from: nombre ? nombre : nombreCookie,
            hour: timestamp,
            isMine: true,
        };
        setMessages([...messages, newMessage]);
        socket.emit("message", newMessage);
        setMessage("");
    };

    useEffect(() => {
        socket.on("message", reciveMessage);

        return () => {
            socket.off("message", reciveMessage);
        };
    }, []);

    const reciveMessage = (message: Message) => {
        setMessages((state) => [...state, message]);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        // Si presiona Enter sin Shift, se envía el formulario
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); // Previene el salto de línea
            handleSubmit(e as unknown as FormEvent<HTMLFormElement>); // Envía el formulario
        }
    };

    // Referencia al contenedor del chat
    const messagesEndRef = useRef<HTMLUListElement>(null);

    // Función para hacer scroll hacia el final
    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
        }
    };

    // Scroll hacia abajo cuando cambia la lista de mensajes
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="dev-fondo dev-main relative">
            <div className="dev-interfaz">
                <h3 className="dev-chatTitulo">Chat General</h3>
                <ul ref={messagesEndRef} className="dev-chat">
                    {messages.map((message, i) => {
                        return (
                            <div
                                key={i}
                                className={`dev-mensajeCard ${
                                    message.isMine
                                        ? "bg-pink-400 ml-auto dark:bg-violet-500 animate-sliceRight"
                                        : "bg-violet-400 mr-auto dark:bg-zinc-600 animate-sliceLeft"
                                }`}
                            >
                                <span className="dev-nombre">
                                    {message.from}
                                </span>
                                <li className="dev-mensaje">{message.body}</li>
                                <span className="dev-hora">{message.hour}</span>
                            </div>
                        );
                    })}
                </ul>
                <form onSubmit={handleSubmit} className="dev-teclado">
                    <textarea
                        placeholder="Mensaje"
                        className="dev-inputTexto"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button className="dev-enviar">Enviar</button>
                </form>
            </div>
            <LogOutButton />
            <MarcaPersonal />
            <DarkModeButton />
        </div>
    );
};
