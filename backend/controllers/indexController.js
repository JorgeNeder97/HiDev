import pkg from 'jsonwebtoken';
const { verify } = pkg;
import createAccestoken from '../modules/jwt.js';

const indexController = {
    sayHi: (req, res) => {
        res.send('HiDev! Server')
    }, 
    login: (req, res) => {
        const {usuario, contraseña} = req.body;
        if(contraseña !== process.env.PASSWORD) return res.status(400).json({ message: "Contraseña inválida" });
        else if(contraseña === process.env.PASSWORD) {
            const token = createAccestoken({
                nombre: usuario
            });
            res.cookie("token", token);
            res.json({
                nombre: usuario,
                token,
            });
        }
    },
    logout: (req, res) => {
        res.cookie("token", "", { expires: new Date(0) });
        return res.sendStatus(200);
    }

}

export default indexController;