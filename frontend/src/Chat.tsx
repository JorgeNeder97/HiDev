import { useState, useEffect, FormEvent, KeyboardEvent, useRef } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

interface ChatProps {
    nombre: string;
}

interface Message {
    body: string,
    from?: string,
    isMine?: boolean,
}

export const Chat: React.FC<ChatProps> = ({ nombre }) => {

    const [message, setMessage] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(message === "" || message === null) return
        const newMessage = {
            body: message,
            from: nombre,
            isMine: true,
        }
        setMessages([...messages, newMessage]);
        socket.emit('message', newMessage);
        setMessage("");
    }

    useEffect(() => {
        socket.on('message', reciveMessage);
        
        return () => {
            socket.off('message', reciveMessage);
        }
    }, []);

    const reciveMessage = (message: Message) => {
        setMessages((state) => [...state, message]);
    }

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
        <div className="fondoClaro main">
            <div className="interfaz">
                <h3 className="chatTitulo">Chat General</h3>
                <ul ref={messagesEndRef} className="chat">
                    {
                        messages.map((message, i) => {
                            return (
                                <div key={i} className={`mensajeCard ${message.isMine ? "bg-pink-400 ml-auto": "bg-violet-400 mr-auto"}`} > 
                                    <span className="nombre">{message.from}</span>
                                    <li className="mensaje">{message.body}</li>
                                </div>
                            );
                        })
                    }
                </ul>
                <form onSubmit={handleSubmit} className="teclado">
                    <textarea placeholder="Mensaje" className="inputTexto" value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={handleKeyDown} />
                    <button className="enviar">Enviar</button>
                </form>
            </div>
        </div>
    );
};
