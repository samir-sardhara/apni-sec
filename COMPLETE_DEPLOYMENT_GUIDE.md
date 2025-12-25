# 🚀 Complete Deployment Guide: Backend (Railway) + Frontend (Vercel)

Step-by-step guide to deploy your ApniSec application.

---

## 📋 Prerequisites

- ✅ Code pushed to GitHub
- ✅ GitHub account
- ✅ Railway account (we'll create)
- ✅ Vercel account (we'll create)

---

## Part 1: Deploy Backend on Railway

### Step 1: Sign Up for Railway

1. **Go to [railway.app](https://railway.app)**
2. **Click "Start a New Project"** or **"Login"**
3. **Click "Login with GitHub"**
4. **Authorize Railway** to access your GitHub account
5. **Complete signup** (free tier available)

### Step 2: Create New Project

1. **In Railway dashboard, click "New Project"**
2. **Select "Deploy from GitHub repo"**
3. **If first time, authorize Railway:**
   - Click "Configure GitHub App"
   - Select repositories (choose "All repositories" or specific ones)
   - Click "Install"
4. **Select your repository:**
   - Find "ApniSec" (or your repo name)
   - Click on it

### Step 3: Configure Backend Service

1. **Railway will detect your repo**
2. **Click on the detected service** (or "Add Service" if nothing detected)
3. **Go to "Settings" tab**
4. **Set Root Directory:**
   - Find "Root Directory" section
   - Enter: `backend`
   - Click "Save"
5. **Build and Start Commands** (usually auto-detected):
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`

### Step 4: Add MySQL Database

1. **In your Railway project, click "New"**
2. **Select "Database"**
3. **Choose "MySQL"**
4. **Railway will automatically create the database**

### Step 5: Get Database Credentials

1. **Click on the MySQL service** in your project
2. **Go to "Variables" tab**
3. **Copy these values:**
   - `MYSQLHOST`
   - `MYSQLPORT`
   - `MYSQLDATABASE`
   - `MYSQLUSER`
   - `MYSQLPASSWORD`

### Step 6: Create Database Schema

1. **Click on MySQL service**
2. **Go to "Data" tab**
3. **Click "Query"**
4. **Open `backend/src/database/schema.sql`** in your editor
5. **Copy all SQL content**
6. **Paste into Railway Query editor**
7. **Click "Run"**

### Step 7: Add Environment Variables to Backend

1. **Click on your backend service** (not MySQL)
2. **Go to "Variables" tab**
3. **Click "New Variable"** for each:

```bash
# Server Configuration
NODE_ENV=production
PORT=3001

# JWT Configuration (Generate strong secrets!)
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this
JWT_EXPIRES_IN=24h
JWT_REFRESH_EXPIRES_IN=7d

# Database Configuration (Use Railway variable references)
DB_HOST=${{MySQL.MYSQLHOST}}
DB_PORT=${{MySQL.MYSQLPORT}}
DB_USER=${{MySQL.MYSQLUSER}}
DB_PASSWORD=${{MySQL.MYSQLPASSWORD}}
DB_NAME=${{MySQL.MYSQLDATABASE}}

# Resend Email Configuration
RESEND_API_KEY=re_T2sEThU5_85FBEFnb18mhS3Jwa5YoFgV7
RESEND_FROM_EMAIL=onboarding@resend.dev

# Frontend URL (We'll update this after deploying frontend)
FRONTEND_URL=https://your-frontend.vercel.app

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

**Important:** For database variables, use the format `${{MySQL.MYSQLHOST}}` - Railway will automatically link to your MySQL service.

### Step 8: Get Backend URL

1. **Click on your backend service**
2. **Go to "Settings" tab**
3. **Scroll to "Domains" section**
4. **Click "Generate Domain"** (if not auto-generated)
5. **Copy the URL** (e.g., `https://apnisec-backend-production.up.railway.app`)

**Save this URL - you'll need it for frontend deployment!**

### Step 9: Test Backend

1. **Open your backend URL in browser:**
   ```
   https://your-backend.railway.app/health
   ```
2. **Should return:** `{"status":"ok","timestamp":"..."}`

✅ **Backend is now deployed on Railway!**

---

## Part 2: Deploy Frontend on Vercel

### Step 1: Sign Up for Vercel

1. **Go to [vercel.com](https://vercel.com)**
2. **Click "Sign Up"**
3. **Sign up with GitHub**
4. **Authorize Vercel** to access your GitHub account

### Step 2: Install Vercel CLI

Open your terminal and run:

```bash
npm install -g vercel
```

### Step 3: Navigate to Frontend Directory

```bash
cd /Users/samirsardhara/Desktop/Projects/Apni-Sec/frontend
```

### Step 4: Login to Vercel

```bash
vercel login
```

This will open your browser for authentication. Complete the login.

### Step 5: Deploy Frontend (First Time)

```bash
vercel
```

**Answer the prompts:**
- Set up and deploy? → **Yes** (press Enter)
- Which scope? → **Select your account** (press Enter)
- Link to existing project? → **No** (type `n` and press Enter)
- Project name? → **apnisec-frontend** (or press Enter for default)
- Directory? → **./frontend** (or just press Enter)
- Override settings? → **No** (press Enter)

### Step 6: Add Environment Variable

```bash
vercel env add VITE_API_URL production
```

**When prompted:**
- Value: **Paste your Railway backend URL** (from Step 8 of Part 1)
  - Example: `https://apnisec-backend-production.up.railway.app`
- Press Enter

### Step 7: Deploy to Production

```bash
vercel --prod
```

### Step 8: Get Frontend URL

After deployment, Vercel will show:
- ✅ **Production URL:** `https://apnisec-frontend.vercel.app` (or similar)

**Save this URL!**

✅ **Frontend is now deployed on Vercel!**

---

## Part 3: Connect Frontend and Backend

### Step 1: Update Backend CORS

1. **Go to Railway dashboard**
2. **Click on your backend service**
3. **Go to "Variables" tab**
4. **Find `FRONTEND_URL` variable**
5. **Update it with your Vercel frontend URL:**
   ```
   https://apnisec-frontend.vercel.app
   ```
6. **Save** (Railway will auto-redeploy)

### Step 2: Verify Connection

1. **Visit your Vercel frontend URL**
2. **Open browser console (F12)**
3. **Try to register a new user**
4. **Check for errors**

---

## Complete Command Summary

### Backend (Railway) - No Commands Needed
- Use Railway dashboard (web interface)
- All configuration done through UI

### Frontend (Vercel) - Commands

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to frontend
cd /Users/samirsardhara/Desktop/Projects/Apni-Sec/frontend

# Login
vercel login

# Deploy (first time)
vercel

# Add environment variable (replace with your Railway backend URL)
vercel env add VITE_API_URL production

# Deploy to production
vercel --prod
```

---

## Quick Checklist

### Backend (Railway)
- [ ] Railway account created
- [ ] Project created from GitHub
- [ ] Root directory set to `backend`
- [ ] MySQL database added
- [ ] Database schema created
- [ ] Environment variables added
- [ ] Backend URL obtained
- [ ] Health check working (`/health` endpoint)

### Frontend (Vercel)
- [ ] Vercel account created
- [ ] Vercel CLI installed
- [ ] Logged in to Vercel
- [ ] Frontend deployed
- [ ] `VITE_API_URL` environment variable set
- [ ] Production deployment complete
- [ ] Frontend URL obtained

### Connection
- [ ] `FRONTEND_URL` updated in Railway
- [ ] Backend redeployed with new CORS settings
- [ ] Frontend can communicate with backend
- [ ] Registration works
- [ ] Login works
- [ ] Issue creation works

---

## Troubleshooting

### Backend Issues

**Build Fails:**
- Check Railway deployment logs
- Verify `package.json` has all dependencies
- Check Root Directory is set to `backend`

**Database Connection Fails:**
- Verify database variables use `${{MySQL.MYSQLHOST}}` format
- Check MySQL service is running (green status)
- Verify database schema was created

**API Not Accessible:**
- Check domain is generated in Settings
- Verify service is deployed (green status)
- Check deployment logs for errors

### Frontend Issues

**Build Fails:**
- Check Vercel build logs
- Verify all dependencies in `package.json`
- Check Node version compatibility

**API Not Working:**
- Verify `VITE_API_URL` is set correctly
- Check backend URL is accessible
- Check browser console for CORS errors

**CORS Errors:**
- Update `FRONTEND_URL` in Railway
- Redeploy backend after updating CORS
- Verify CORS origin matches exactly

---

## Your Live URLs

After deployment, you'll have:

- **Frontend:** `https://apnisec-frontend.vercel.app`
- **Backend:** `https://apnisec-backend-production.up.railway.app`
- **Database:** Managed by Railway

---

## Testing Your Deployment

1. **Visit your frontend URL**
2. **Click "Register"**
3. **Create a new account**
4. **Login**
5. **Create an issue**
6. **Check dashboard**

Everything should work! 🎉

---

## Future Updates

### Update Backend:
```bash
git add .
git commit -m "Update backend"
git push
# Railway auto-deploys
```

### Update Frontend:
```bash
cd frontend
git add .
git commit -m "Update frontend"
git push
# Vercel auto-deploys
```

---

## Support

- **Railway Docs:** https://docs.railway.app
- **Vercel Docs:** https://vercel.com/docs
- **Railway Discord:** https://discord.gg/railway
- **Vercel Support:** https://vercel.com/support

---

**Your application is now live! 🚀**

