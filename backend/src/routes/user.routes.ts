import { Router } from 'express';
import userHandler from '../handlers/UserHandler';
import userValidator from '../validators/UserValidator';
import authMiddleware from '../middleware/auth';
import rateLimiter from '../middleware/rateLimiter';

const router = Router();

// All user routes require authentication
router.use(authMiddleware.authenticate());
router.use(rateLimiter.middleware());

router.get('/profile', userHandler.getProfile.bind(userHandler));

router.put(
  '/profile',
  ...userValidator.validateUpdateProfile(),
  userHandler.updateProfile.bind(userHandler)
);

export default router;

