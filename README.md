# ApniSec - Cybersecurity Platform

A full-stack cybersecurity management platform with separate frontend (React 19+) and backend (Node.js) applications.

## Tech Stack

### Frontend
- React 19+
- TypeScript
- Tailwind CSS
- Vite
- React Router

### Backend
- Node.js
- Express
- TypeScript
- MySQL
- JWT Authentication
- Resend Email Service

## Project Structure

```
Apni-Sec/
├── frontend/          # React frontend application
├── backend/          # Node.js backend API
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js 18+ and npm
- MySQL 8.0+
- Resend API key (for email functionality)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (copy from `.env.example`):
```bash
PORT=3001
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this-in-production
JWT_EXPIRES_IN=24h
JWT_REFRESH_EXPIRES_IN=7d
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your-mysql-password
DB_NAME=apnisec_db
RESEND_API_KEY=your-resend-api-key
RESEND_FROM_EMAIL=onboarding@resend.dev
FRONTEND_URL=http://localhost:3000
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

4. Set up MySQL database:
```bash
mysql -u root -p < src/database/schema.sql
```

5. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:3001`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (optional, defaults to proxy):
```bash
VITE_API_URL=http://localhost:3001/api
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## Features

### Authentication
- User registration with email validation
- JWT-based login/logout
- Protected routes
- Password hashing with bcrypt

### User Profile Management
- View and update user profile
- Profile fields: firstName, lastName, phone, company, position, bio

### Issue Management
- Create security issues (Cloud Security, Reteam Assessment, VAPT)
- View all issues with filtering by type
- Update issue status and details
- Delete issues
- Priority and status tracking

### Rate Limiting
- Custom rate limiter: 100 requests per 15 minutes per IP/user
- Rate limit headers in responses

### Email Notifications
- Welcome email on registration
- Issue creation notifications
- Profile update notifications

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user (protected)

### User Profile
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update user profile (protected)

### Issues
- `GET /api/issues` - List all issues (protected, supports ?type= filter)
- `GET /api/issues/:id` - Get single issue (protected)
- `POST /api/issues` - Create new issue (protected)
- `PUT /api/issues/:id` - Update issue (protected)
- `DELETE /api/issues/:id` - Delete issue (protected)

## Backend Architecture (OOP)

The backend follows strict Object-Oriented Programming principles:

- **Handlers**: Request handlers (class-based)
- **Services**: Business logic (class-based)
- **Repositories**: Data access layer (class-based)
- **Validators**: Input validation (class-based)
- **Middleware**: Authentication, rate limiting, error handling (class-based)

## SEO Optimization

The landing page is optimized for SEO with:
- Semantic HTML
- Meta tags
- Proper heading structure
- Descriptive alt texts
- Fast loading times

## Development

### Backend
```bash
cd backend
npm run dev      # Development mode with hot reload
npm run build    # Build for production
npm start        # Run production build
```

### Frontend
```bash
cd frontend
npm run dev      # Development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## License

MIT

