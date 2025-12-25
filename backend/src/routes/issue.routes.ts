import { Router } from 'express';
import issueHandler from '../handlers/IssueHandler';
import issueValidator from '../validators/IssueValidator';
import authMiddleware from '../middleware/auth';
import rateLimiter from '../middleware/rateLimiter';

const router = Router();

// All issue routes require authentication
router.use(authMiddleware.authenticate());
router.use(rateLimiter.middleware());

router.get(
  '/',
  ...issueValidator.validateFilter(),
  issueHandler.getAllIssues.bind(issueHandler)
);

router.get('/:id', issueHandler.getIssueById.bind(issueHandler));

router.post(
  '/',
  ...issueValidator.validateCreate(),
  issueHandler.createIssue.bind(issueHandler)
);

router.put(
  '/:id',
  ...issueValidator.validateUpdate(),
  issueHandler.updateIssue.bind(issueHandler)
);

router.delete('/:id', issueHandler.deleteIssue.bind(issueHandler));

export default router;

