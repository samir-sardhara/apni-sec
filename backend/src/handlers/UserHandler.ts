import { Request, Response, NextFunction } from 'express';
import userService from '../services/UserService';
import { ApiResponse } from '../types';
import { AppError } from '../utils/errors';

interface AuthRequest extends Request {
  user?: {
    userId: number;
    email: string;
  };
}

class UserHandler {
  async getProfile(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        throw new AppError('User not authenticated', 401);
      }

      const profile = await userService.getProfile(req.user.userId);

      const response: ApiResponse = {
        success: true,
        data: profile,
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        throw new AppError('User not authenticated', 401);
      }

      const profile = await userService.updateProfile(req.user.userId, req.body);

      const response: ApiResponse = {
        success: true,
        data: profile,
        message: 'Profile updated successfully',
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}

export default new UserHandler();

