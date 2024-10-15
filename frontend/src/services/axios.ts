import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;

const instance = axios.create({
    baseURL: baseURL,
    withCredentials: true,
    headers: {
        'Content-Type': 'multipart/form-data',
    }
});

instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Obtén el token del localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Añade el token al encabezado
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;