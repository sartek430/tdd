import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/userModel';

const secretKey: string | undefined = process.env.SECRET_KEY;

export interface AuthenticatedRequest extends Request {
    user?: User;
}

export function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
    if (!secretKey) {
        throw new Error('Secret key not found');
    }

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.sendStatus(401);
        return;
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            res.sendStatus(403);
            return;
        }

        req.user = user as User;
        next();
    });
}