import { Request, Response, NextFunction } from 'express';
import issueService from '../services/IssueService';
import { ApiResponse } from '../types';
import { AppError } from '../utils/errors';

interface AuthRequest extends Request {
  user?: {
    userId: number;
    email: string;
  };
}

class IssueHandler {
  async getAllIssues(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        throw new AppError('User not authenticated', 401);
      }

      const type = req.query.type as string | undefined;
      const issues = await issueService.getAllIssues(req.user.userId, type);

      const response: ApiResponse = {
        success: true,
        data: issues,
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getIssueById(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        throw new AppError('User not authenticated', 401);
      }

      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        throw new AppError('Invalid issue ID', 400);
      }

      const issue = await issueService.getIssueById(id, req.user.userId);

      const response: ApiResponse = {
        success: true,
        data: issue,
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async createIssue(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        throw new AppError('User not authenticated', 401);
      }

      const issue = await issueService.createIssue(req.user.userId, req.body);

      const response: ApiResponse = {
        success: true,
        data: issue,
        message: 'Issue created successfully',
      };

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  async updateIssue(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        throw new AppError('User not authenticated', 401);
      }

      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        throw new AppError('Invalid issue ID', 400);
      }

      const issue = await issueService.updateIssue(id, req.user.userId, req.body);

      const response: ApiResponse = {
        success: true,
        data: issue,
        message: 'Issue updated successfully',
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async deleteIssue(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        throw new AppError('User not authenticated', 401);
      }

      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        throw new AppError('Invalid issue ID', 400);
      }

      await issueService.deleteIssue(id, req.user.userId);

      const response: ApiResponse = {
        success: true,
        message: 'Issue deleted successfully',
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}

export default new IssueHandler();

