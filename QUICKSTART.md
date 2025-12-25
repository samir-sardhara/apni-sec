# Quick Start Guide

## Prerequisites
- Node.js 18+ installed
- MySQL 8.0+ installed and running
- Resend account (for email functionality - optional)

## Step 1: Database Setup

1. Start MySQL server
2. Create the database:
```bash
mysql -u root -p < backend/src/database/schema.sql
```

Or manually:
```sql
CREATE DATABASE apnisec_db;
USE apnisec_db;
-- Then run the SQL from backend/src/database/schema.sql
```

## Step 2: Backend Setup

1. Navigate to backend:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (copy from `env.example`):
```bash
cp env.example .env
```

4. Edit `.env` with your configuration:
   - Set your MySQL password
   - Set JWT secrets (use strong random strings)
   - Add Resend API key (optional, emails will be disabled without it)

5. Start backend server:
```bash
npm run dev
```

Backend should be running on `http://localhost:3001`

## Step 3: Frontend Setup

1. Open a new terminal and navigate to frontend:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start frontend server:
```bash
npm run dev
```

Frontend should be running on `http://localhost:3000`

## Step 4: Access the Application

1. Open browser to `http://localhost:3000`
2. Click "Login" in navigation
3. Click "Sign up" to create a new account
4. After registration, you'll be redirected to the dashboard

## Testing the Application

### Create an Issue
1. Go to Dashboard
2. Click "Create New Issue"
3. Fill in the form:
   - Select issue type (Cloud Security, Reteam Assessment, or VAPT)
   - Enter title and description
   - Set priority and status
4. Click "Create Issue"

### Update Profile
1. Click "View Profile" or navigate to `/profile`
2. Fill in your profile information
3. Click "Save Changes"

### Filter Issues
1. On Dashboard, use the dropdown to filter by issue type
2. Issues will be filtered in real-time

## Troubleshooting

### Backend won't start
- Check MySQL is running: `mysql -u root -p`
- Verify `.env` file exists and has correct database credentials
- Check port 3001 is not in use

### Frontend won't connect to backend
- Verify backend is running on port 3001
- Check browser console for CORS errors
- Verify `FRONTEND_URL` in backend `.env` matches frontend URL

### Database connection errors
- Verify MySQL is running
- Check database credentials in `.env`
- Ensure database `apnisec_db` exists

### Email not working
- Verify `RESEND_API_KEY` is set in `.env`
- Check Resend dashboard for API key
- Emails are optional - app works without them (logs to console)

## Next Steps

- Customize the landing page content
- Add more issue types if needed
- Configure production environment variables
- Set up SSL certificates for production
- Configure proper CORS for production domain

