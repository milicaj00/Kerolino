import dotenv from 'dotenv'
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const token_key: string | undefined = process.env.TOKEN_KEY

export interface CustomRequest extends Request {
    token: string | JwtPayload;
}

export const generateAccessToken = (user: Object) => {

    if (token_key)
        return jwt.sign(user, token_key, { expiresIn: "2h" });


};

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.body)
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            throw new Error();
        }

        if (token_key !== undefined) {

            jwt.verify(token, token_key, (err, user_token) => {
                if (err) {
                    return res.status(403).json("Token nije validan!");
                }

                if (user_token)
                    res.locals.user = user_token;

                // (req as CustomRequest).token = user_token;

                next();
            });

        }
        else {
            return res.status(500).send('connection error');
        }

    } catch (err) {
        res.status(401).send('Please authenticate');
    }
};