import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

interface UserPayload {
    id: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: UserPayload;
        }
    }
}

export const authenticateJWT = (req: Request, res: Response, next: NextFunction):void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: 'Access denied. No token provided.' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token);
    req.user = decoded as { id: string };
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};