import pkg from "jsonwebtoken";
const { verify } = pkg;
import jwt from "jsonwebtoken";
import createAccestoken from "../modules/jwt.js";

const indexController = {
    sayHi: (req, res) => {
        res.send("HiDev! Server");
    },
    login: async (req, res) => {
        const { usuario, contraseña } = req.body;
        if (contraseña !== process.env.PASSWORD)
            return res.status(400).json({ message: "Contraseña inválida" });
        else if (contraseña === process.env.PASSWORD) {
            const token = jwt.sign({ nombre: usuario }, process.env.TOKEN_SECRET, { expiresIn: '1d' });
            res.setHeader('Authorization', `Bearer ${token}`);
            return res.json({ message: 'Inicio de sesión exitoso', token });
        }
    },
    verifyToken: (req, res) => {
        const token = req.headers['authorization']?.split(' ')[1]; // Obtener el token del encabezado
        if (!token)
            return res.status(401).json({ message: "Unauthorized - No Token" });

        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.status(403).send("Token inválido.");
            }
            return res.status(200).json({ message: "Authorized!" });
        });
    },
};

export default indexController;
