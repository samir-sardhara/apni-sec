import issueRepository from '../repositories/IssueRepository';
import emailService from './EmailService';
import userRepository from '../repositories/UserRepository';
import { NotFoundError, ValidationError, AuthorizationError } from '../utils/errors';
import { Issue } from '../types';

class IssueService {
  async getAllIssues(userId: number, type?: string): Promise<Issue[]> {
    return await issueRepository.findAll(userId, type);
  }

  async getIssueById(id: number, userId: number): Promise<Issue> {
    const issue = await issueRepository.findById(id, userId);
    if (!issue) {
      throw new NotFoundError('Issue not found');
    }
    return issue;
  }

  async createIssue(userId: number, issueData: Omit<Issue, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<Issue> {
    // Validate input
    if (!issueData.type || !['cloud-security', 'reteam-assessment', 'vapt'].includes(issueData.type)) {
      throw new ValidationError('Invalid issue type. Must be: cloud-security, reteam-assessment, or vapt');
    }

    if (!issueData.title || issueData.title.trim().length === 0) {
      throw new ValidationError('Title is required');
    }

    if (!issueData.description || issueData.description.trim().length === 0) {
      throw new ValidationError('Description is required');
    }

    if (issueData.title.length > 200) {
      throw new ValidationError('Title is too long (max 200 characters)');
    }

    if (issueData.description.length > 5000) {
      throw new ValidationError('Description is too long (max 5000 characters)');
    }

    if (issueData.priority && !['low', 'medium', 'high', 'critical'].includes(issueData.priority)) {
      throw new ValidationError('Invalid priority. Must be: low, medium, high, or critical');
    }

    if (issueData.status && !['open', 'in-progress', 'resolved', 'closed'].includes(issueData.status)) {
      throw new ValidationError('Invalid status. Must be: open, in-progress, resolved, or closed');
    }

    const issue = await issueRepository.create({
      userId,
      ...issueData,
    });

    // Send notification email (don't await)
    const user = await userRepository.findById(userId);
    if (user) {
      emailService.sendIssueCreatedEmail(user.email, issue).catch(console.error);
    }

    return issue;
  }

  async updateIssue(id: number, userId: number, issueData: Partial<Issue>): Promise<Issue> {
    // Check if issue exists and belongs to user
    const existing = await issueRepository.findById(id, userId);
    if (!existing) {
      throw new NotFoundError('Issue not found');
    }

    // Validate updates
    if (issueData.type && !['cloud-security', 'reteam-assessment', 'vapt'].includes(issueData.type)) {
      throw new ValidationError('Invalid issue type');
    }

    if (issueData.priority && !['low', 'medium', 'high', 'critical'].includes(issueData.priority)) {
      throw new ValidationError('Invalid priority');
    }

    if (issueData.status && !['open', 'in-progress', 'resolved', 'closed'].includes(issueData.status)) {
      throw new ValidationError('Invalid status');
    }

    if (issueData.title && issueData.title.length > 200) {
      throw new ValidationError('Title is too long');
    }

    if (issueData.description && issueData.description.length > 5000) {
      throw new ValidationError('Description is too long');
    }

    return await issueRepository.update(id, userId, issueData);
  }

  async deleteIssue(id: number, userId: number): Promise<boolean> {
    const issue = await issueRepository.findById(id, userId);
    if (!issue) {
      throw new NotFoundError('Issue not found');
    }

    return await issueRepository.delete(id, userId);
  }
}

export default new IssueService();

