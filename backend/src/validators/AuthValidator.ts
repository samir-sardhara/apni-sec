import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { ValidationError } from '../utils/errors';

class AuthValidator {
  validateRegister() {
    return [
      body('email')
        .isEmail()
        .withMessage('Please provide a valid email address')
        .normalizeEmail(),
      body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
        .matches(/[A-Za-z]/)
        .withMessage('Password must contain at least one letter')
        .matches(/[0-9]/)
        .withMessage('Password must contain at least one number'),
      this.handleValidationErrors,
    ];
  }

  validateLogin() {
    return [
      body('email')
        .isEmail()
        .withMessage('Please provide a valid email address')
        .normalizeEmail(),
      body('password')
        .notEmpty()
        .withMessage('Password is required'),
      this.handleValidationErrors,
    ];
  }

  private handleValidationErrors(req: Request, res: Response, next: NextFunction): void {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map(err => err.msg).join(', ');
      throw new ValidationError(errorMessages);
    }
    next();
  }
}

export default new AuthValidator();

