# Frontend Deployment Commands

## Option 1: Deploy to Netlify (Recommended)

### Method A: Using Netlify CLI (Command Line)

```bash
# Step 1: Install Netlify CLI globally
npm install -g netlify-cli

# Step 2: Navigate to frontend directory
cd /Users/samirsardhara/Desktop/Projects/Apni-Sec/frontend

# Step 3: Login to Netlify
netlify login

# Step 4: Initialize Netlify (first time only)
netlify init

# Follow the prompts:
# - Create & configure a new site? Yes
# - Team: Select your team
# - Site name: apnisec-frontend (or any name)
# - Build command: npm run build
# - Directory to deploy: dist
# - Netlify functions folder: (leave empty, press Enter)

# Step 5: Add environment variable (replace with your Railway backend URL)
netlify env:set VITE_API_URL "https://your-backend.railway.app"

# Step 6: Deploy to production
netlify deploy --prod
```

### Method B: Using Netlify Dashboard (Easier - No Commands)

1. **Go to [netlify.com](https://netlify.com)** and login
2. **Click "Add new site"** → **"Import an existing project"**
3. **Connect to GitHub** → Select your repository
4. **Configure:**
   - **Base directory:** `frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `frontend/dist`
5. **Add environment variable:**
   - **Key:** `VITE_API_URL`
   - **Value:** `https://your-backend.railway.app` (your Railway backend URL)
6. **Click "Deploy site"**

---

## Option 2: Deploy to Vercel

### Method A: Using Vercel CLI

```bash
# Step 1: Install Vercel CLI globally
npm install -g vercel

# Step 2: Navigate to frontend directory
cd /Users/samirsardhara/Desktop/Projects/Apni-Sec/frontend

# Step 3: Login to Vercel
vercel login

# Step 4: Deploy (first time - will ask questions)
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? (select your account)
# - Link to existing project? No
# - Project name: apnisec-frontend
# - Directory: ./frontend
# - Override settings? No

# Step 5: Add environment variable
vercel env add VITE_API_URL production
# Enter your Railway backend URL when prompted

# Step 6: Deploy to production
vercel --prod
```

### Method B: Using Vercel Dashboard

1. **Go to [vercel.com](https://vercel.com)** and login
2. **Click "Add New Project"**
3. **Import your GitHub repository**
4. **Configure:**
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. **Environment Variables:**
   - **Key:** `VITE_API_URL`
   - **Value:** `https://your-backend.railway.app`
6. **Click "Deploy"**

---

## Quick Commands Summary

### Netlify (Quick Deploy)
```bash
cd frontend
npm install -g netlify-cli
netlify login
netlify init
netlify env:set VITE_API_URL "https://your-backend.railway.app"
netlify deploy --prod
```

### Vercel (Quick Deploy)
```bash
cd frontend
npm install -g vercel
vercel login
vercel
vercel env add VITE_API_URL production
vercel --prod
```

---

## Important: Update Backend URL

**Replace `your-backend.railway.app` with your actual Railway backend URL!**

To get your Railway backend URL:
1. Go to Railway dashboard
2. Click on your backend service
3. Go to "Settings" → "Domains"
4. Copy the URL (e.g., `https://apnisec-backend-production.up.railway.app`)

---

## After Deployment

1. **Get your frontend URL** (Netlify/Vercel will provide it)
2. **Update Railway backend environment variable:**
   - Go to Railway → Backend service → Variables
   - Update `FRONTEND_URL` with your frontend URL
   - Redeploy backend

3. **Test your application:**
   - Visit your frontend URL
   - Try registering a new user
   - Try logging in
   - Create an issue

---

## Troubleshooting

### Build Fails
- Check build logs in Netlify/Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify Node version compatibility

### API Not Working
- Check `VITE_API_URL` environment variable is set correctly
- Verify backend URL is accessible
- Check browser console for CORS errors

### CORS Errors
- Update `FRONTEND_URL` in Railway backend variables
- Redeploy backend after updating CORS

