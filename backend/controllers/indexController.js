import pkg from 'jsonwebtoken';
const { verify } = pkg;
import jwt from 'jsonwebtoken';
import createAccestoken from '../modules/jwt.js';

const indexController = {
    sayHi: (req, res) => {
        res.send('HiDev! Server')
    }, 
    login: async (req, res) => {
        const {usuario, contraseña} = req.body;
        if(contraseña !== process.env.PASSWORD) return res.status(400).json({ message: "Contraseña inválida" });
        else if(contraseña === process.env.PASSWORD) {
            const token = await createAccestoken({
                nombre: usuario
            });
            res.cookie("token", token);
            res.json({
                nombre: usuario,
                token,
            });
        }
    },
    verifyToken: (req, res) => {
        const token = req.cookies.token;
        if(!token) return res.status(401).json({ message: 'Unauthorized - No Token' });

        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if (err) {
              return res.status(403).send('Token inválido.');
            }
            return res.status(200).json({ message: 'Authorized!' });
        });
    },
    logout: (req, res) => {
        res.cookie("token", "", { expires: new Date(0) });
        res.cookie("nombre", "", { expires: new Date(0) });
        return res.sendStatus(200);
    }

}

export default indexController;