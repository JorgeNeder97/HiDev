import axios from '#services/axios.ts';
import { Usuario } from '#models/Usuario.ts';

export const loginRequest = async (data: Usuario) => {
    return await axios.post('/login', data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export const verifyTokenRequest = async (token: string) => {
    return await axios.get('/verify', {
        headers: {
            Authorization: `Bearer ${token}` // Envía el token en la cabecera
        }
    });
}