export interface User {
  id: number;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile {
  id: number;
  userId: number;
  firstName?: string;
  lastName?: string;
  phone?: string;
  company?: string;
  position?: string;
  bio?: string;
  updatedAt: Date;
}

export interface Issue {
  id: number;
  userId: number;
  type: 'cloud-security' | 'reteam-assessment' | 'vapt';
  title: string;
  description: string;
  priority?: 'low' | 'medium' | 'high' | 'critical';
  status?: 'open' | 'in-progress' | 'resolved' | 'closed';
  createdAt: Date;
  updatedAt: Date;
}

export interface JWTPayload {
  userId: number;
  email: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface RateLimitInfo {
  limit: number;
  remaining: number;
  reset: number;
}

