# Vercel Deployment Guide

This guide covers deploying your ApniSec application to Vercel.

## Deployment Strategy

Since you have a **full-stack application**, you have two options:

### Option 1: Frontend on Vercel + Backend on Vercel (Recommended)
- Deploy frontend as a static site on Vercel
- Deploy backend as Vercel serverless functions

### Option 2: Frontend on Vercel + Backend on Separate Service
- Deploy frontend on Vercel
- Deploy backend on Railway, Render, or Heroku

---

## Option 1: Deploy Both on Vercel (Recommended)

### Step 1: Prepare Backend for Vercel Serverless

Vercel uses serverless functions. We need to adapt the backend:

1. **Install Vercel CLI** (if not already installed):
```bash
npm i -g vercel
```

2. **Create API route structure** - Vercel expects API routes in `/api` folder at root level.

### Step 2: Install Dependencies

```bash
# Install Vercel CLI globally
npm i -g vercel

# Or use npx (no installation needed)
npx vercel
```

### Step 3: Deploy Frontend

```bash
cd /Users/samirsardhara/Desktop/Projects/Apni-Sec

# Login to Vercel
vercel login

# Deploy frontend
cd frontend
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? (select your account)
# - Link to existing project? No
# - Project name? apnisec-frontend
# - Directory? ./frontend
# - Override settings? No
```

### Step 4: Configure Environment Variables

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add these variables:

**For Frontend:**
```
VITE_API_URL=https://your-backend-url.vercel.app/api
```

**For Backend (if deploying separately):**
```
NODE_ENV=production
PORT=3001
JWT_SECRET=your-production-jwt-secret
JWT_REFRESH_SECRET=your-production-refresh-secret
JWT_EXPIRES_IN=24h
JWT_REFRESH_EXPIRES_IN=7d
DB_HOST=your-database-host
DB_PORT=3306
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_NAME=apnisec_db
RESEND_API_KEY=your-resend-api-key
RESEND_FROM_EMAIL=onboarding@resend.dev
FRONTEND_URL=https://your-frontend-url.vercel.app
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Step 5: Update Frontend API Configuration

Update `frontend/src/utils/api.ts` to use environment variable:

```typescript
baseURL: import.meta.env.VITE_API_URL || '/api',
```

---

## Option 2: Frontend on Vercel + Backend on Railway/Render

### Deploy Frontend to Vercel

```bash
cd frontend
vercel
```

### Deploy Backend to Railway (Recommended)

1. **Go to [Railway.app](https://railway.app)**
2. **Sign up/Login** with GitHub
3. **New Project** → **Deploy from GitHub repo**
4. **Select your repository**
5. **Configure:**
   - Root Directory: `backend`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
6. **Add Environment Variables** (from your `.env` file)
7. **Add MySQL Database:**
   - Click "New" → "Database" → "MySQL"
   - Railway will provide connection details
8. **Update environment variables** with Railway's database credentials

### Update Frontend API URL

In Vercel dashboard, set:
```
VITE_API_URL=https://your-railway-backend-url.railway.app
```

---

## Quick Deploy Commands

### Frontend Only (Quick Start)

```bash
cd /Users/samirsardhara/Desktop/Projects/Apni-Sec/frontend

# Install Vercel CLI (if needed)
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# For production
vercel --prod
```

### Using Vercel Dashboard (Easier)

1. **Push your code to GitHub** (if not already done)
2. **Go to [vercel.com](https://vercel.com)**
3. **Click "Add New Project"**
4. **Import your GitHub repository**
5. **Configure:**
   - Framework Preset: **Vite**
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. **Add Environment Variables**
7. **Deploy**

---

## Important Configuration Files

### 1. Update `frontend/vite.config.ts`

Make sure it has the correct build configuration:

```typescript
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
```

### 2. Update API Base URL

In `frontend/src/utils/api.ts`, ensure it uses environment variable:

```typescript
baseURL: import.meta.env.VITE_API_URL || import.meta.env.PROD ? '/api' : '/api',
```

---

## Post-Deployment Checklist

- [ ] Frontend deployed and accessible
- [ ] Backend deployed and accessible
- [ ] Environment variables configured
- [ ] Database connection working
- [ ] API endpoints responding
- [ ] Authentication working
- [ ] CORS configured correctly
- [ ] Frontend can communicate with backend

---

## Troubleshooting

### CORS Errors

If you get CORS errors, update `backend/src/server.ts`:

```typescript
this.app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://your-frontend.vercel.app',
  credentials: true,
}));
```

### API Not Found

- Check that `VITE_API_URL` is set correctly
- Verify backend is deployed and accessible
- Check network tab in browser console

### Database Connection Issues

- Verify database credentials in environment variables
- Check if database allows external connections
- For Railway/Render, use their provided database connection strings

---

## Recommended: Use Railway for Backend

Railway is excellent for Node.js backends:

1. **Sign up at [railway.app](https://railway.app)**
2. **Connect GitHub**
3. **New Project** → **Deploy from GitHub**
4. **Select repository**
5. **Set Root Directory:** `backend`
6. **Add MySQL database** (Railway provides one-click setup)
7. **Add environment variables**
8. **Deploy**

Railway will give you a URL like: `https://your-app.railway.app`

Then set in Vercel frontend environment variables:
```
VITE_API_URL=https://your-app.railway.app
```

---

## Alternative: Deploy Backend to Render

1. **Go to [render.com](https://render.com)**
2. **New** → **Web Service**
3. **Connect GitHub** → **Select repository**
4. **Configure:**
   - Name: `apnisec-backend`
   - Environment: `Node`
   - Build Command: `cd backend && npm install && npm run build`
   - Start Command: `cd backend && npm start`
5. **Add Environment Variables**
6. **Add PostgreSQL/MySQL Database** (Render provides managed databases)

---

## Quick Reference

**Frontend Vercel Deploy:**
```bash
cd frontend
vercel --prod
```

**Backend Railway Deploy:**
- Use Railway dashboard (easiest)
- Or Railway CLI: `railway up`

**Update Environment Variables:**
- Vercel: Project Settings → Environment Variables
- Railway: Variables tab in dashboard

---

## Need Help?

- Vercel Docs: https://vercel.com/docs
- Railway Docs: https://docs.railway.app
- Render Docs: https://render.com/docs

