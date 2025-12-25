# 🚂 Railway Backend Deployment Guide - Step by Step

Complete step-by-step guide to deploy your ApniSec backend on Railway.

---

## Prerequisites

- ✅ Code pushed to GitHub
- ✅ GitHub account
- ✅ Railway account (we'll create this)

---

## Step 1: Sign Up for Railway

1. **Go to [railway.app](https://railway.app)**
2. **Click "Start a New Project"** or **"Login"**
3. **Sign up with GitHub:**
   - Click "Login with GitHub"
   - Authorize Railway to access your GitHub account
4. **Complete signup** (free tier is available)

---

## Step 2: Create New Project

1. **In Railway dashboard, click "New Project"**
2. **Select "Deploy from GitHub repo"**
3. **If first time, authorize Railway:**
   - Click "Configure GitHub App"
   - Select repositories (choose "All repositories" or specific ones)
   - Click "Install"
4. **Select your repository:**
   - Find "ApniSec" (or your repo name)
   - Click on it

---

## Step 3: Configure Backend Service

After selecting your repo, Railway will detect it. Now configure:

1. **Railway will show "Detected Services"**
2. **Click on the detected service** (or "Add Service" if nothing detected)
3. **Configure the service:**
   - **Name:** `apnisec-backend` (or any name you prefer)
   - **Root Directory:** Click "Settings" → Set to `backend`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`

### How to set Root Directory:

1. Click on your service
2. Go to **"Settings"** tab
3. Scroll to **"Root Directory"**
4. Enter: `backend`
5. Click **"Save"**

---

## Step 4: Add MySQL Database

1. **In your Railway project dashboard, click "New"**
2. **Select "Database"**
3. **Choose "MySQL"**
4. **Railway will automatically:**
   - Create a MySQL database
   - Provide connection credentials
   - Link it to your project

### Get Database Credentials:

1. **Click on the MySQL service** in your project
2. **Go to "Variables" tab**
3. **You'll see these variables:**
   - `MYSQLHOST` - Database host
   - `MYSQLPORT` - Port (usually 3306)
   - `MYSQLDATABASE` - Database name
   - `MYSQLUSER` - Username
   - `MYSQLPASSWORD` - Password
   - `MYSQL_URL` - Full connection URL

**Copy these values** - you'll need them in the next step.

---

## Step 5: Set Up Database Schema

You have two options:

### Option A: Use Railway's MySQL (Recommended)

1. **Click on your MySQL service**
2. **Go to "Data" tab**
3. **Click "Query"**
4. **Copy and paste the SQL from `backend/src/database/schema.sql`**
5. **Click "Run"**

### Option B: Run SQL via Command Line

1. **Get connection string from Railway MySQL service**
2. **Use MySQL client:**
   ```bash
   mysql -h [MYSQLHOST] -P [MYSQLPORT] -u [MYSQLUSER] -p[MYSQLPASSWORD] [MYSQLDATABASE] < backend/src/database/schema.sql
   ```

---

## Step 6: Add Environment Variables

1. **Click on your backend service** (not the database)
2. **Go to "Variables" tab**
3. **Click "New Variable"** for each variable below:

### Required Environment Variables:

```bash
# Server Configuration
NODE_ENV=production
PORT=3001

# JWT Configuration (CHANGE THESE!)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this-in-production
JWT_EXPIRES_IN=24h
JWT_REFRESH_EXPIRES_IN=7d

# Database Configuration (Use Railway MySQL variables)
DB_HOST=${{MySQL.MYSQLHOST}}
DB_PORT=${{MySQL.MYSQLPORT}}
DB_USER=${{MySQL.MYSQLUSER}}
DB_PASSWORD=${{MySQL.MYSQLPASSWORD}}
DB_NAME=${{MySQL.MYSQLDATABASE}}

# Resend Email Configuration
RESEND_API_KEY=re_T2sEThU5_85FBEFnb18mhS3Jwa5YoFgV7
RESEND_FROM_EMAIL=onboarding@resend.dev

# Frontend URL (Update with your frontend URL)
FRONTEND_URL=https://your-frontend.netlify.app

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Important Notes:

- **Database Variables:** Use Railway's variable references:
  - `DB_HOST=${{MySQL.MYSQLHOST}}`
  - `DB_PASSWORD=${{MySQL.MYSQLPASSWORD}}`
  - etc.
  
  This automatically links to your MySQL service.

- **JWT Secrets:** Generate strong secrets:
  ```bash
  # Generate random secrets
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```

- **Frontend URL:** Update with your actual frontend URL (Netlify/Vercel)

---

## Step 7: Deploy

1. **Railway will automatically start deploying** when you:
   - Push code to GitHub (if connected)
   - Or click "Deploy" button

2. **Watch the deployment logs:**
   - Click on your service
   - Go to "Deployments" tab
   - Watch the build process

3. **Wait for deployment to complete** (usually 2-5 minutes)

---

## Step 8: Get Your Backend URL

1. **Click on your backend service**
2. **Go to "Settings" tab**
3. **Scroll to "Domains"**
4. **Click "Generate Domain"** (if not auto-generated)
5. **Copy the URL** (e.g., `https://apnisec-backend-production.up.railway.app`)

**This is your backend API URL!** You'll use this in your frontend.

---

## Step 9: Test Your Backend

1. **Open your backend URL in browser:**
   ```
   https://your-backend.railway.app/health
   ```
   
   Should return: `{"status":"ok","timestamp":"..."}`

2. **Test API endpoint:**
   ```
   https://your-backend.railway.app/api/auth/register
   ```
   
   Should return an error (expected - needs POST with data)

---

## Step 10: Update Frontend

1. **Go to your frontend hosting (Netlify/Vercel)**
2. **Add/Update environment variable:**
   - **Key:** `VITE_API_URL`
   - **Value:** `https://your-backend.railway.app` (your Railway URL)
3. **Redeploy frontend**

---

## Step 11: Update Backend CORS

Make sure your backend allows requests from your frontend:

1. **In Railway, check `FRONTEND_URL` variable**
2. **Update `backend/src/server.ts`** if needed:
   ```typescript
   this.app.use(cors({
     origin: process.env.FRONTEND_URL || 'https://your-frontend.netlify.app',
     credentials: true,
   }));
   ```
3. **Redeploy backend** (push to GitHub or trigger redeploy)

---

## Troubleshooting

### Build Fails

**Check build logs:**
1. Click on service → "Deployments" → Latest deployment
2. Check for errors in logs

**Common issues:**
- Missing dependencies → Check `package.json`
- TypeScript errors → Fix in code
- Build command wrong → Verify in settings

### Database Connection Fails

**Check:**
1. Database variables are set correctly
2. Using Railway variable references: `${{MySQL.MYSQLHOST}}`
3. Database service is running (green status)

### API Not Accessible

**Check:**
1. Service is deployed (green status)
2. Domain is generated
3. Port is set correctly (3001)
4. Check deployment logs for errors

### CORS Errors

**Fix:**
1. Update `FRONTEND_URL` in Railway environment variables
2. Verify CORS origin in `backend/src/server.ts`
3. Redeploy backend

---

## Railway Dashboard Overview

### Service Tabs:

- **Deployments:** View build and deployment history
- **Metrics:** CPU, Memory usage
- **Logs:** Real-time application logs
- **Settings:** Configuration, domains, environment variables
- **Variables:** Environment variables (same as Settings → Variables)

### Useful Features:

- **View Logs:** Real-time application logs
- **Redeploy:** Trigger new deployment
- **Generate Domain:** Get public URL
- **Custom Domain:** Add your own domain (paid feature)

---

## Quick Reference Commands

### Check Railway Status
- Visit Railway dashboard
- Check service status (green = running)

### View Logs
- Service → "Logs" tab
- Real-time streaming logs

### Redeploy
- Push to GitHub (auto-deploys)
- Or: Service → "Deployments" → "Redeploy"

### Update Environment Variables
- Service → "Variables" tab
- Add/Edit/Delete variables
- Changes apply on next deployment

---

## Cost Information

**Railway Free Tier:**
- $5 free credit per month
- Sufficient for small projects
- Pay-as-you-go after free credit

**Typical Usage:**
- Backend service: ~$5-10/month
- MySQL database: ~$5/month
- Total: ~$10-15/month (after free credit)

---

## Next Steps After Deployment

1. ✅ Backend deployed and accessible
2. ✅ Database connected
3. ✅ Environment variables set
4. ✅ Frontend updated with backend URL
5. ✅ Test registration/login
6. ✅ Test API endpoints
7. ✅ Monitor logs for errors

---

## Support Resources

- **Railway Docs:** https://docs.railway.app
- **Railway Discord:** https://discord.gg/railway
- **Railway Status:** https://status.railway.app

---

## Complete Checklist

- [ ] Railway account created
- [ ] Project created from GitHub
- [ ] Backend service configured
- [ ] Root directory set to `backend`
- [ ] MySQL database added
- [ ] Database schema created
- [ ] Environment variables added
- [ ] Backend deployed successfully
- [ ] Backend URL obtained
- [ ] Health check endpoint working
- [ ] Frontend updated with backend URL
- [ ] CORS configured
- [ ] Test registration/login

---

**Your backend is now live on Railway! 🎉**

