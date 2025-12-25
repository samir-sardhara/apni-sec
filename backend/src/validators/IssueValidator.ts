import { body, query, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { ValidationError } from '../utils/errors';

class IssueValidator {
  validateCreate() {
    return [
      body('type')
        .isIn(['cloud-security', 'reteam-assessment', 'vapt'])
        .withMessage('Issue type must be: cloud-security, reteam-assessment, or vapt'),
      body('title')
        .trim()
        .notEmpty()
        .withMessage('Title is required')
        .isLength({ max: 200 })
        .withMessage('Title must be less than 200 characters'),
      body('description')
        .trim()
        .notEmpty()
        .withMessage('Description is required')
        .isLength({ max: 5000 })
        .withMessage('Description must be less than 5000 characters'),
      body('priority')
        .optional()
        .isIn(['low', 'medium', 'high', 'critical'])
        .withMessage('Priority must be: low, medium, high, or critical'),
      body('status')
        .optional()
        .isIn(['open', 'in-progress', 'resolved', 'closed'])
        .withMessage('Status must be: open, in-progress, resolved, or closed'),
      this.handleValidationErrors,
    ];
  }

  validateUpdate() {
    return [
      body('type')
        .optional()
        .isIn(['cloud-security', 'reteam-assessment', 'vapt'])
        .withMessage('Invalid issue type'),
      body('title')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Title cannot be empty')
        .isLength({ max: 200 })
        .withMessage('Title must be less than 200 characters'),
      body('description')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Description cannot be empty')
        .isLength({ max: 5000 })
        .withMessage('Description must be less than 5000 characters'),
      body('priority')
        .optional()
        .isIn(['low', 'medium', 'high', 'critical'])
        .withMessage('Invalid priority'),
      body('status')
        .optional()
        .isIn(['open', 'in-progress', 'resolved', 'closed'])
        .withMessage('Invalid status'),
      this.handleValidationErrors,
    ];
  }

  validateFilter() {
    return [
      query('type')
        .optional()
        .isIn(['cloud-security', 'reteam-assessment', 'vapt'])
        .withMessage('Invalid filter type'),
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

export default new IssueValidator();

