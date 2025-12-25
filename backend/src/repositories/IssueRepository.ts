import database from '../config/database';
import { Issue } from '../types';

class IssueRepository {
  async findAll(userId: number, type?: string): Promise<Issue[]> {
    if (type) {
      return await database.query<Issue[]>(
        'SELECT * FROM issues WHERE userId = ? AND type = ? ORDER BY createdAt DESC',
        [userId, type]
      );
    }
    return await database.query<Issue[]>(
      'SELECT * FROM issues WHERE userId = ? ORDER BY createdAt DESC',
      [userId]
    );
  }

  async findById(id: number, userId: number): Promise<Issue | null> {
    const rows = await database.query<Issue[]>(
      'SELECT * FROM issues WHERE id = ? AND userId = ?',
      [id, userId]
    );
    return rows.length > 0 ? rows[0] : null;
  }

  async create(issueData: Omit<Issue, 'id' | 'createdAt' | 'updatedAt'>): Promise<Issue> {
    const { userId, type, title, description, priority, status } = issueData;
    
    const result = await database.query<any>(
      `INSERT INTO issues (userId, type, title, description, priority, status, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [userId, type, title, description, priority || 'medium', status || 'open']
    );

    const issue = await this.findById(result.insertId, userId);
    if (!issue) {
      throw new Error('Failed to create issue');
    }
    return issue;
  }

  async update(id: number, userId: number, issueData: Partial<Issue>): Promise<Issue> {
    const { type, title, description, priority, status } = issueData;
    
    const existing = await this.findById(id, userId);
    if (!existing) {
      throw new Error('Issue not found');
    }

    await database.query(
      `UPDATE issues 
       SET type = ?, title = ?, description = ?, priority = ?, status = ?, updatedAt = NOW()
       WHERE id = ? AND userId = ?`,
      [
        type || existing.type,
        title || existing.title,
        description || existing.description,
        priority || existing.priority,
        status || existing.status,
        id,
        userId
      ]
    );

    const updated = await this.findById(id, userId);
    if (!updated) {
      throw new Error('Failed to update issue');
    }
    return updated;
  }

  async delete(id: number, userId: number): Promise<boolean> {
    const result = await database.query<any>(
      'DELETE FROM issues WHERE id = ? AND userId = ?',
      [id, userId]
    );
    return result.affectedRows > 0;
  }
}

export default new IssueRepository();

