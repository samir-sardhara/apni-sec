import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { ValidationError } from '../utils/errors';

class UserValidator {
  validateUpdateProfile() {
    return [
      body('firstName')
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage('First name must be less than 100 characters'),
      body('lastName')
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage('Last name must be less than 100 characters'),
      body('phone')
        .optional()
        .trim()
        .isLength({ max: 20 })
        .withMessage('Phone number must be less than 20 characters'),
      body('company')
        .optional()
        .trim()
        .isLength({ max: 200 })
        .withMessage('Company name must be less than 200 characters'),
      body('position')
        .optional()
        .trim()
        .isLength({ max: 200 })
        .withMessage('Position must be less than 200 characters'),
      body('bio')
        .optional()
        .trim()
        .isLength({ max: 1000 })
        .withMessage('Bio must be less than 1000 characters'),
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

export default new UserValidator();

