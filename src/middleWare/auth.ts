import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
    userId?: string;
    userType?: string;
}

const adminAuthorized = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    const token = req.header('authorization');

    if (!token) {
        res.status(401).json({ error: 'Authorization token missing' });
        return;
    }

    try {
        const decoded = jwt.verify(
            token.split(' ')[1], 
            process.env.JWT_SECRET as string) as { 
                userId: string, 
                exp: number, 
                userType: string 
            };

        if (decoded.exp < Date.now().valueOf() / 1000) {
            res.status(401).json({
                error: 'JWT token has expired, please login to obtain a new one'
            });
            return;
        }

        if (decoded.userType !== 'Administrator') {
            res.status(403).json({
                error: 'Access denied: Admins only'
            });
            return;
        }

        req.userId = decoded.userId;
        req.userType = decoded.userType;
        return next(); 
    } catch (error) {
        return next(error); 
    }
};

export default adminAuthorized;



const subUserAuthorized = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    const token = req.header('authorization');

    if (!token) {
        res.status(401).json({ error: 'Authorization token missing' });
        return;
    }

    try {
        const decoded = jwt.verify(
            token.split(' ')[1], 
            process.env.JWT_SECRET as string) as { 
                userId: string, 
                exp: number, 
                userType: string 
            };

        if (decoded.exp < Date.now().valueOf() / 1000) {
            res.status(401).json({
                error: 'JWT token has expired, please login to obtain a new one'
            });
            return;
        }
        if (decoded.userType !== 'Subscriber') {
            res.status(403).json({
                error: 'Access denied: Subscribers only'
            });
            return;
        }

        req.userId = decoded.userId;
        req.userType = decoded.userType;
        return next(); 
    } catch (error) {
        return next(error); 
    }
};

export {subUserAuthorized as subUserAuthorized};
