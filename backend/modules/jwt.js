import jwt from 'jsonwebtoken';

export default function createAccessToken(payload) {
    return new Promise ((resolve, reject) => {
        jwt.sign(
            payload,
            process.env.TOKEN_SECRET,
            {
                expiresIn: "1d",
            },
            (err, token) => {
                if(err) reject(err);
                resolve(token);
            }
        );
    });
}
