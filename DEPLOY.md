# 🚀 Quick Vercel Deployment Guide

## Prerequisites
- GitHub account
- Vercel account (sign up at [vercel.com](https://vercel.com))
- Code pushed to GitHub

---

## Step 1: Push Code to GitHub

If not already done:

```bash
cd /Users/samirsardhara/Desktop/Projects/Apni-Sec
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/ApniSec.git
git branch -M main
git push -u origin main
```

---

## Step 2: Deploy Frontend to Vercel

### Option A: Using Vercel Dashboard (Easiest)

1. **Go to [vercel.com](https://vercel.com)** and sign in
2. **Click "Add New Project"**
3. **Import your GitHub repository** (ApniSec)
4. **Configure Project:**
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build` (auto-detected)
   - **Output Directory:** `dist` (auto-detected)
   - **Install Command:** `npm install` (auto-detected)
5. **Environment Variables:**
   - Click "Environment Variables"
   - Add: `VITE_API_URL` = `https://your-backend-url.railway.app` (or your backend URL)
6. **Click "Deploy"**

### Option B: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to frontend
cd /Users/samirsardhara/Desktop/Projects/Apni-Sec/frontend

# Login to Vercel
vercel login

# Deploy
vercel

# For production
vercel --prod
```

---

## Step 3: Deploy Backend (Choose One)

### Option A: Railway (Recommended - Easiest)

1. **Go to [railway.app](https://railway.app)**
2. **Sign up with GitHub**
3. **New Project** → **Deploy from GitHub repo**
4. **Select your ApniSec repository**
5. **Configure:**
   - **Root Directory:** `backend`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
6. **Add MySQL Database:**
   - Click "New" → "Database" → "MySQL"
   - Railway will auto-create database
7. **Add Environment Variables:**
   - Go to "Variables" tab
   - Add all variables from your `.env` file:
     ```
     NODE_ENV=production
     PORT=3001
     JWT_SECRET=your-secret-key
     JWT_REFRESH_SECRET=your-refresh-secret
     DB_HOST=containers-us-west-xxx.railway.app
     DB_PORT=3306
     DB_USER=root
     DB_PASSWORD=(Railway provides this)
     DB_NAME=railway
     RESEND_API_KEY=your-resend-key
     FRONTEND_URL=https://your-frontend.vercel.app
     ```
8. **Get Backend URL:**
   - Railway provides a URL like: `https://your-app.railway.app`
   - Copy this URL

### Option B: Render

1. **Go to [render.com](https://render.com)**
2. **New** → **Web Service**
3. **Connect GitHub** → **Select repository**
4. **Configure:**
   - **Name:** `apnisec-backend`
   - **Environment:** `Node`
   - **Build Command:** `cd backend && npm install && npm run build`
   - **Start Command:** `cd backend && npm start`
5. **Add Environment Variables** (same as Railway)
6. **Add Database:** New → PostgreSQL or MySQL

---

## Step 4: Update Frontend Environment Variable

1. **Go to Vercel Dashboard**
2. **Select your project**
3. **Settings** → **Environment Variables**
4. **Add/Update:**
   - `VITE_API_URL` = `https://your-backend-url.railway.app` (your backend URL from Step 3)
5. **Redeploy** (Vercel will auto-redeploy)

---

## Step 5: Update Backend CORS

Update `backend/src/server.ts` to allow your Vercel frontend:

```typescript
this.app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://your-frontend.vercel.app',
  credentials: true,
}));
```

Then redeploy backend.

---

## Complete Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Frontend deployed on Vercel
- [ ] Backend deployed on Railway/Render
- [ ] Database created and connected
- [ ] Environment variables set in Vercel
- [ ] Environment variables set in Railway/Render
- [ ] CORS configured in backend
- [ ] Frontend API URL updated
- [ ] Test registration/login
- [ ] Test issue creation

---

## Quick Commands Reference

### Frontend (Vercel)
```bash
cd frontend
vercel --prod
```

### Backend (Railway)
- Use Railway dashboard (no CLI needed)
- Or: `railway up` (if Railway CLI installed)

### Update Environment Variables
- **Vercel:** Project → Settings → Environment Variables
- **Railway:** Project → Variables tab

---

## Troubleshooting

### CORS Error
- Check `FRONTEND_URL` in backend environment variables
- Verify CORS origin matches your Vercel URL exactly

### API Not Found
- Check `VITE_API_URL` in Vercel environment variables
- Verify backend is deployed and accessible
- Check browser console for errors

### Database Connection Failed
- Verify database credentials in Railway/Render
- Check if database allows external connections
- Use Railway/Render provided connection strings

---

## Your URLs After Deployment

- **Frontend:** `https://apnisec-frontend.vercel.app`
- **Backend:** `https://your-app.railway.app`
- **Database:** Managed by Railway/Render

---

## Need Help?

- Vercel Docs: https://vercel.com/docs
- Railway Docs: https://docs.railway.app
- Render Docs: https://render.com/docs

