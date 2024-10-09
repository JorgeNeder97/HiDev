// Validación del token
import jwt from 'jsonwebtoken';

function TokenAuthRequired (req, res, next) {
    const {token} = req.cookies;
    if(!token) return res.status(401).json({ message: 'No token, authorization denied'});

    jwt.verify(token, process.env.TOKEN_SECRET, (err, usuario) => {
        if(err) return res.status(403).json({ message: 'Invalid Token' });

        req.usuarioLogueado = usuario;

        next();
    });
}

module.exports = TokenAuthRequired;