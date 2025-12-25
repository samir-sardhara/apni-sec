import userRepository from '../repositories/UserRepository';
import passwordService from '../utils/password';
import jwtService from '../utils/jwt';
import emailService from './EmailService';
import { AuthenticationError, ValidationError } from '../utils/errors';
import { User, JWTPayload } from '../types';

class AuthService {
  async register(email: string, password: string): Promise<{ user: Omit<User, 'password'>; token: string }> {
    // Validate input
    if (!email || !password) {
      throw new ValidationError('Email and password are required');
    }

    if (password.length < 6) {
      throw new ValidationError('Password must be at least 6 characters long');
    }

    // Check if user already exists
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new ValidationError('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await passwordService.hash(password);

    // Create user
    const user = await userRepository.create(email, hashedPassword);

    // Generate token
    const payload: JWTPayload = {
      userId: user.id,
      email: user.email,
    };
    const token = jwtService.generateToken(payload);

    // Send welcome email (don't await - fire and forget)
    emailService.sendWelcomeEmail(user.email, user.firstName || undefined).catch(console.error);

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
  }

  async login(email: string, password: string): Promise<{ user: Omit<User, 'password'>; token: string }> {
    // Validate input
    if (!email || !password) {
      throw new ValidationError('Email and password are required');
    }

    // Find user
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new AuthenticationError('Invalid email or password');
    }

    // Verify password
    const isValid = await passwordService.compare(password, user.password);
    if (!isValid) {
      throw new AuthenticationError('Invalid email or password');
    }

    // Generate token
    const payload: JWTPayload = {
      userId: user.id,
      email: user.email,
    };
    const token = jwtService.generateToken(payload);

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
  }

  async getCurrentUser(userId: number): Promise<Omit<User, 'password'>> {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new AuthenticationError('User not found');
    }

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}

export default new AuthService();

