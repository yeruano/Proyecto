import jwt from 'jsonwebtoken';
import { response } from './response';

export function validateToken(req, res, next) {

    let token = req.headers['authorization'];

    if (!token) {
        return response(res, 500, 'Es Token es necesario');
    }

    token = token.split(' ')[1];
    jwt.verify(token, process.env.PRIVATE_KEY, (err, userToken) => {
        
        if (err) {
            return response(res, 500, 'Token invalido');
        }

        req.user = userToken;
        console.log(req.user);
        next();
    });


}