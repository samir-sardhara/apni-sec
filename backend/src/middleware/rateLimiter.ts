import { Request, Response, NextFunction } from 'express';
import { RateLimitError, RateLimitInfo } from '../types';
import { RateLimitError as RateLimitErrorClass } from '../utils/errors';

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

class RateLimiter {
  private store: Map<string, RateLimitEntry>;
  private windowMs: number;
  private maxRequests: number;

  constructor() {
    this.store = new Map();
    this.windowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'); // 15 minutes
    this.maxRequests = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100');
    
    // Clean up expired entries every minute
    setInterval(() => this.cleanup(), 60000);
  }

  private getKey(req: Request): string {
    // Use user ID if authenticated, otherwise use IP address
    const userId = (req as any).user?.userId;
    return userId ? `user:${userId}` : `ip:${req.ip || req.socket.remoteAddress}`;
  }

  private cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.store.entries()) {
      if (entry.resetTime < now) {
        this.store.delete(key);
      }
    }
  }

  private getRateLimitInfo(key: string): RateLimitInfo {
    const entry = this.store.get(key);
    if (!entry) {
      return {
        limit: this.maxRequests,
        remaining: this.maxRequests,
        reset: Date.now() + this.windowMs,
      };
    }

    return {
      limit: this.maxRequests,
      remaining: Math.max(0, this.maxRequests - entry.count),
      reset: entry.resetTime,
    };
  }

  middleware() {
    return (req: Request, res: Response, next: NextFunction): void => {
      const key = this.getKey(req);
      const now = Date.now();
      const entry = this.store.get(key);

      if (!entry || entry.resetTime < now) {
        // Create new entry or reset expired entry
        this.store.set(key, {
          count: 1,
          resetTime: now + this.windowMs,
        });
      } else {
        // Increment count
        entry.count++;
        if (entry.count > this.maxRequests) {
          const info = this.getRateLimitInfo(key);
          res.setHeader('X-RateLimit-Limit', info.limit.toString());
          res.setHeader('X-RateLimit-Remaining', '0');
          res.setHeader('X-RateLimit-Reset', new Date(info.reset).toISOString());
          throw new RateLimitErrorClass('Too many requests. Please try again later.');
        }
      }

      const info = this.getRateLimitInfo(key);
      res.setHeader('X-RateLimit-Limit', info.limit.toString());
      res.setHeader('X-RateLimit-Remaining', info.remaining.toString());
      res.setHeader('X-RateLimit-Reset', new Date(info.reset).toISOString());

      next();
    };
  }
}

export default new RateLimiter();

