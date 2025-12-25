import database from '../config/database';
import { User, UserProfile } from '../types';

class UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const rows = await database.query<User[]>(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return rows.length > 0 ? rows[0] : null;
  }

  async findById(id: number): Promise<User | null> {
    const rows = await database.query<User[]>(
      'SELECT * FROM users WHERE id = ?',
      [id]
    );
    return rows.length > 0 ? rows[0] : null;
  }

  async create(email: string, hashedPassword: string): Promise<User> {
    const result = await database.query<any>(
      'INSERT INTO users (email, password, createdAt, updatedAt) VALUES (?, ?, NOW(), NOW())',
      [email, hashedPassword]
    );
    
    const user = await this.findById(result.insertId);
    if (!user) {
      throw new Error('Failed to create user');
    }
    return user;
  }

  async getProfile(userId: number): Promise<UserProfile | null> {
    const rows = await database.query<UserProfile[]>(
      'SELECT * FROM user_profiles WHERE userId = ?',
      [userId]
    );
    return rows.length > 0 ? rows[0] : null;
  }

  async createProfile(userId: number, profileData: Partial<UserProfile>): Promise<UserProfile> {
    const { firstName, lastName, phone, company, position, bio } = profileData;
    
    const result = await database.query<any>(
      `INSERT INTO user_profiles (userId, firstName, lastName, phone, company, position, bio, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
      [userId, firstName || null, lastName || null, phone || null, company || null, position || null, bio || null]
    );

    const profile = await this.getProfile(userId);
    if (!profile) {
      throw new Error('Failed to create profile');
    }
    return profile;
  }

  async updateProfile(userId: number, profileData: Partial<UserProfile>): Promise<UserProfile> {
    const { firstName, lastName, phone, company, position, bio } = profileData;
    
    const existing = await this.getProfile(userId);
    
    if (!existing) {
      return await this.createProfile(userId, profileData);
    }

    await database.query(
      `UPDATE user_profiles 
       SET firstName = ?, lastName = ?, phone = ?, company = ?, position = ?, bio = ?, updatedAt = NOW()
       WHERE userId = ?`,
      [firstName || existing.firstName, lastName || existing.lastName, phone || existing.phone, 
       company || existing.company, position || existing.position, bio || existing.bio, userId]
    );

    const updated = await this.getProfile(userId);
    if (!updated) {
      throw new Error('Failed to update profile');
    }
    return updated;
  }
}

export default new UserRepository();

