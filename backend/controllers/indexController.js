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
    verifyToken: async (req, res) => {

        const { token } = req.cookies;

        // Funcion que hace la verificación con JsonWebToken.
        function verifyTkn(token) {
            verify(token, TOKEN_SECRET, async (err) => {
                if (err)
                return res
                    .status(401)
                    .json({ message: "Unauthorized: invalid token" });
            
                else return
            });
        }

        return verifyTkn(token);
    }

}

export default indexController;