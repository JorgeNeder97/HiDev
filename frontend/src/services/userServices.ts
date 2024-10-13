import axios from '#services/axios.ts';
import { Usuario } from '#models/Usuario.ts';

export const loginRequest = async (data: Usuario) => {
    return await axios.post('/login', data, {
        headers: {
            "Content-Type": "application/json",
        }
    });
}

export const logOutRequest = async () => {
    return await axios.get('/logout', {
        headers: {
            "Content-Type": "application/json"
        }
    });
}