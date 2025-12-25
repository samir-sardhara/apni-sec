import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Load environment variables FIRST before importing other modules
// Try multiple possible paths
const possiblePaths = [
  path.resolve(__dirname, '../.env'),           // backend/.env (from dist/)
  path.resolve(__dirname, '../../.env'),         // backend/.env (from src/)
  path.resolve(process.cwd(), '.env'),          // Current working directory
  path.resolve(process.cwd(), 'backend/.env'),  // Explicit backend path
];

// In development, also try env.example as fallback
if (process.env.NODE_ENV !== 'production') {
  possiblePaths.push(
    path.resolve(__dirname, '../env.example'),
    path.resolve(process.cwd(), 'backend/env.example'),
    path.resolve(process.cwd(), 'env.example')
  );
}

let envLoaded = false;
let loadedPath = '';
let isExampleFile = false;

for (const envPath of possiblePaths) {
  if (fs.existsSync(envPath)) {
    const result = dotenv.config({ path: envPath });
    if (!result.error) {
      envLoaded = true;
      loadedPath = envPath;
      isExampleFile = envPath.includes('env.example');
      break;
    }
  }
}

if (envLoaded) {
  if (isExampleFile) {
    console.log('⚠️  Using env.example file (create .env file for production)');
    console.log(`   From: ${loadedPath}`);
    console.log('   📝 To fix: Copy env.example to .env in the backend directory');
  } else {
    console.log('✅ Environment variables loaded successfully');
    console.log(`   From: ${loadedPath}`);
  }
} else {
  console.error('❌ ERROR: Could not load environment variables!');
  console.error('   Tried paths:');
  possiblePaths.forEach(p => {
    const exists = fs.existsSync(p);
    console.error(`   ${exists ? '✓' : '✗'} ${p}`);
  });
  console.error('\n   📝 SOLUTION: Create a .env file in the backend directory');
  console.error('   1. Copy env.example to .env: cp env.example .env');
  console.error('   2. Edit .env and set your actual values');
  console.error('   3. Make sure DB_PASSWORD is quoted: DB_PASSWORD="@sam12$$"');
  // Try default dotenv.config() as last resort
  dotenv.config();
}

import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import issueRoutes from './routes/issue.routes';
import errorHandler from './middleware/errorHandler';

class Server {
  private app: Express;
  private port: number;

  constructor() {
    this.app = express();
    this.port = parseInt(process.env.PORT || '3001');
    this.setupMiddleware();
    this.setupRoutes();
    this.setupErrorHandling();
  }

  private setupMiddleware(): void {
    // Security middleware
    this.app.use(helmet());
    
    // CORS configuration
    this.app.use(cors({
      origin: process.env.FRONTEND_URL || 'http://localhost:3000',
      credentials: true,
    }));

    // Body parsing
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // Trust proxy for rate limiting (if behind reverse proxy)
    this.app.set('trust proxy', 1);
  }

  private setupRoutes(): void {
    // Health check
    this.app.get('/health', (req, res) => {
      res.json({ status: 'ok', timestamp: new Date().toISOString() });
    });

    // API routes
    this.app.use('/api/auth', authRoutes);
    this.app.use('/api/users', userRoutes);
    this.app.use('/api/issues', issueRoutes);

    // 404 handler
    this.app.use((req, res) => {
      res.status(404).json({
        success: false,
        error: 'Route not found',
      });
    });
  }

  private setupErrorHandling(): void {
    this.app.use(errorHandler.handle());
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log(`🚀 Server running on port ${this.port}`);
      console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  }
}

const server = new Server();
server.start();

