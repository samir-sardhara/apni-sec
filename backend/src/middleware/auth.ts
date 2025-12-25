import { Request, Response, NextFunction } from 'express';
import jwtService from '../utils/jwt';
import { AuthenticationError } from '../utils/errors';

interface AuthRequest extends Request {
  user?: {
    userId: number;
    email: string;
  };
}

class AuthMiddleware {
  authenticate() {
    return (req: AuthRequest, res: Response, next: NextFunction): void => {
      try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
          throw new AuthenticationError('No token provided');
        }

        const token = authHeader.substring(7);
        const payload = jwtService.verifyToken(token);

        req.user = {
          userId: payload.userId,
          email: payload.email,
        };

        next();
      } catch (error) {
        if (error instanceof AuthenticationError) {
          throw error;
        }
        throw new AuthenticationError('Invalid or expired token');
      }
    };
  }
}

export default new AuthMiddleware();

