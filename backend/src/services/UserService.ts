import userRepository from '../repositories/UserRepository';
import emailService from './EmailService';
import { NotFoundError, ValidationError } from '../utils/errors';
import { UserProfile } from '../types';

class UserService {
  async getProfile(userId: number): Promise<UserProfile> {
    const profile = await userRepository.getProfile(userId);
    if (!profile) {
      // Return empty profile if not exists
      return {
        id: 0,
        userId,
        updatedAt: new Date(),
      };
    }
    return profile;
  }

  async updateProfile(userId: number, profileData: Partial<UserProfile>): Promise<UserProfile> {
    // Validate input
    if (profileData.firstName && profileData.firstName.length > 100) {
      throw new ValidationError('First name is too long');
    }
    if (profileData.lastName && profileData.lastName.length > 100) {
      throw new ValidationError('Last name is too long');
    }
    if (profileData.phone && profileData.phone.length > 20) {
      throw new ValidationError('Phone number is too long');
    }

    const updatedProfile = await userRepository.updateProfile(userId, profileData);

    // Send notification email (don't await)
    const user = await userRepository.findById(userId);
    if (user) {
      emailService.sendProfileUpdatedEmail(user.email).catch(console.error);
    }

    return updatedProfile;
  }
}

export default new UserService();

