import { Router } from 'express';
import authHandler from '../handlers/AuthHandler';
import authValidator from '../validators/AuthValidator';
import authMiddleware from '../middleware/auth';
import rateLimiter from '../middleware/rateLimiter';

const router = Router();

router.post(
  '/register',
  rateLimiter.middleware(),
  ...authValidator.validateRegister(),
  authHandler.register.bind(authHandler)
);

router.post(
  '/login',
  rateLimiter.middleware(),
  ...authValidator.validateLogin(),
  authHandler.login.bind(authHandler)
);

router.post(
  '/logout',
  rateLimiter.middleware(),
  authMiddleware.authenticate(),
  authHandler.logout.bind(authHandler)
);

router.get(
  '/me',
  rateLimiter.middleware(),
  authMiddleware.authenticate(),
  authHandler.getCurrentUser.bind(authHandler)
);

export default router;

