import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors';
import { ApiResponse } from '../types';

class ErrorHandler {
  handle() {
    return (err: Error, req: Request, res: Response, next: NextFunction): void => {
      let statusCode = 500;
      let message = 'Internal server error';

      if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;
      } else if (err instanceof Error) {
        message = err.message;
      }

      const response: ApiResponse = {
        success: false,
        error: message,
      };

      // Log error in development
      if (process.env.NODE_ENV === 'development') {
        console.error('Error:', err);
      }

      res.status(statusCode).json(response);
    };
  }
}

export default new ErrorHandler();

