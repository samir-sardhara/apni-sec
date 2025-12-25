# Netlify Deployment Guide

## Can You Deploy Both on Netlify?

### ✅ Frontend: YES - Perfect for Netlify
Netlify is excellent for React/Vite frontends. Easy deployment, great performance.

### ⚠️ Backend: NOT RECOMMENDED
Your backend is a full Express.js application with OOP architecture. Netlify Functions are designed for smaller serverless functions, not full Express apps. You would need to:
- Refactor all routes into separate function files
- Restructure the entire OOP architecture
- Convert Express middleware to function handlers
- This is a major rewrite

### 🎯 Recommended Approach
- **Frontend:** Deploy on Netlify ✅
- **Backend:** Deploy on Railway, Render, or Heroku ✅

---

## Option 1: Frontend on Netlify + Backend on Railway (Recommended)

### Step 1: Deploy Frontend to Netlify

#### Method A: Using Netlify Dashboard (Easiest)

1. **Go to [netlify.com](https://netlify.com)** and sign in
2. **Click "Add new site"** → **"Import an existing project"**
3. **Connect to Git provider** (GitHub)
4. **Select your repository** (ApniSec)
5. **Configure build settings:**
   - **Base directory:** `frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `frontend/dist`
6. **Click "Deploy site"**

#### Method B: Using Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Navigate to frontend
cd /Users/samirsardhara/Desktop/Projects/Apni-Sec/frontend

# Login to Netlify
netlify login

# Initialize Netlify (first time)
netlify init

# Deploy
netlify deploy --prod
```

### Step 2: Deploy Backend to Railway

1. **Go to [railway.app](https://railway.app)**
2. **Sign up with GitHub**
3. **New Project** → **Deploy from GitHub repo**
4. **Select your repository**
5. **Configure:**
   - **Root Directory:** `backend`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
6. **Add MySQL Database:**
   - Click "New" → "Database" → "MySQL"
7. **Add Environment Variables:**
   ```
   NODE_ENV=production
   PORT=3001
   JWT_SECRET=your-secret
   DB_HOST=(Railway provides)
   DB_PASSWORD=(Railway provides)
   RESEND_API_KEY=your-key
   FRONTEND_URL=https://your-site.netlify.app
   ```
8. **Copy Backend URL** (e.g., `https://your-app.railway.app`)

### Step 3: Configure Frontend Environment Variable

1. **Go to Netlify Dashboard**
2. **Site settings** → **Environment variables**
3. **Add variable:**
   - **Key:** `VITE_API_URL`
   - **Value:** `https://your-backend.railway.app` (your Railway backend URL)
4. **Redeploy** (triggered automatically)

### Step 4: Update Backend CORS

In `backend/src/server.ts`, ensure CORS allows Netlify:

```typescript
this.app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://your-site.netlify.app',
  credentials: true,
}));
```

Redeploy backend.

---

## Option 2: Frontend on Netlify + Backend on Render

### Deploy Backend to Render

1. **Go to [render.com](https://render.com)**
2. **New** → **Web Service**
3. **Connect GitHub** → **Select repository**
4. **Configure:**
   - **Name:** `apnisec-backend`
   - **Environment:** `Node`
   - **Root Directory:** `backend`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
5. **Add Environment Variables**
6. **Add Database:** New → PostgreSQL or MySQL

Then follow Step 3 above to configure frontend.

---

## Option 3: Convert Backend to Netlify Functions (Advanced - Not Recommended)

If you really want everything on Netlify, you would need to:

1. **Convert Express routes to Netlify Functions**
2. **Restructure your OOP architecture**
3. **Create separate function files for each endpoint**

This requires significant refactoring. Example structure:

```
netlify/
  functions/
    auth-register.js
    auth-login.js
    issues-get.js
    issues-create.js
    ...
```

**This is NOT recommended** because:
- Major code refactoring required
- Loses your clean OOP architecture
- More complex to maintain
- Netlify Functions have execution time limits
- Not ideal for database connections

---

## Quick Deployment Steps

### 1. Push Code to GitHub
```bash
git add .
git commit -m "Ready for Netlify deployment"
git push
```

### 2. Deploy Frontend to Netlify
- Use Netlify dashboard (easiest)
- Or: `netlify deploy --prod`

### 3. Deploy Backend to Railway
- Use Railway dashboard
- Connect GitHub repo
- Set root directory to `backend`

### 4. Configure Environment Variables
- **Netlify:** `VITE_API_URL` = your backend URL
- **Railway:** All backend env vars + `FRONTEND_URL` = your Netlify URL

---

## Netlify Configuration File

Create `netlify.toml` in your project root:

```toml
[build]
  base = "frontend"
  command = "npm run build"
  publish = "frontend/dist"

[[redirects]]
  from = "/api/*"
  to = "https://your-backend.railway.app/api/:splat"
  status = 200
  force = true

[build.environment]
  NODE_VERSION = "18"
```

Or create it in `frontend/netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/api/*"
  to = "https://your-backend.railway.app/api/:splat"
  status = 200
  force = true
```

---

## Complete Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Frontend deployed on Netlify
- [ ] Backend deployed on Railway/Render
- [ ] Database created and connected
- [ ] Environment variables set in Netlify (`VITE_API_URL`)
- [ ] Environment variables set in Railway/Render
- [ ] CORS configured in backend
- [ ] Test registration/login
- [ ] Test API endpoints

---

## Troubleshooting

### CORS Errors
- Verify `FRONTEND_URL` in backend matches your Netlify URL exactly
- Check CORS configuration in `backend/src/server.ts`

### API Not Found
- Check `VITE_API_URL` in Netlify environment variables
- Verify backend is accessible
- Check browser console for errors

### Build Fails on Netlify
- Check build logs in Netlify dashboard
- Verify Node version (set in `netlify.toml`)
- Ensure all dependencies are in `package.json`

---

## Recommended Stack

| Service | Purpose | Why |
|---------|---------|-----|
| **Netlify** | Frontend hosting | Free, fast, great for React |
| **Railway** | Backend hosting | Free tier, easy MySQL setup |
| **Railway MySQL** | Database | Managed, included with Railway |

---

## Quick Commands

```bash
# Deploy frontend to Netlify
cd frontend
netlify deploy --prod

# Check Netlify status
netlify status

# View Netlify logs
netlify logs
```

---

## Need Help?

- Netlify Docs: https://docs.netlify.com
- Railway Docs: https://docs.railway.app
- Render Docs: https://render.com/docs

