import api from '../utils/api';

export interface Issue {
  id: number;
  userId: number;
  type: 'cloud-security' | 'reteam-assessment' | 'vapt';
  title: string;
  description: string;
  priority?: 'low' | 'medium' | 'high' | 'critical';
  status?: 'open' | 'in-progress' | 'resolved' | 'closed';
  createdAt: string;
  updatedAt: string;
}

class IssueService {
  async getAllIssues(type?: string): Promise<Issue[]> {
    const params = type ? { type } : {};
    const response = await api.get('/issues', { params });
    return response.data.data;
  }

  async getIssueById(id: number): Promise<Issue> {
    const response = await api.get(`/issues/${id}`);
    return response.data.data;
  }

  async createIssue(issueData: Omit<Issue, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<Issue> {
    const response = await api.post('/issues', issueData);
    return response.data.data;
  }

  async updateIssue(id: number, issueData: Partial<Issue>): Promise<Issue> {
    const response = await api.put(`/issues/${id}`, issueData);
    return response.data.data;
  }

  async deleteIssue(id: number): Promise<void> {
    await api.delete(`/issues/${id}`);
  }
}

export default new IssueService();

