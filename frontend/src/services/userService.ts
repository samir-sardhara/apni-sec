import api from '../utils/api';

export interface UserProfile {
  id: number;
  userId: number;
  firstName?: string;
  lastName?: string;
  phone?: string;
  company?: string;
  position?: string;
  bio?: string;
  updatedAt: string;
}

class UserService {
  async getProfile(): Promise<UserProfile> {
    const response = await api.get('/users/profile');
    return response.data.data;
  }

  async updateProfile(profileData: Partial<UserProfile>): Promise<UserProfile> {
    const response = await api.put('/users/profile', profileData);
    return response.data.data;
  }
}

export default new UserService();

