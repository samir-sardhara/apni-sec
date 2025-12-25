# Vercel Frontend Deployment - Complete Commands

## Step-by-Step Commands

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Navigate to Frontend Directory
```bash
cd /Users/samirsardhara/Desktop/Projects/Apni-Sec/frontend
```

### Step 3: Login to Vercel
```bash
vercel login
```
This will open your browser for authentication.

### Step 4: Deploy (First Time)
```bash
vercel
```

**When prompted, answer:**
- Set up and deploy? → **Yes** (press Enter)
- Which scope? → **Select your account** (press Enter)
- Link to existing project? → **No** (press Enter)
- Project name? → **apnisec-frontend** (or press Enter for default)
- Directory? → **./frontend** (or just press Enter)
- Override settings? → **No** (press Enter)

### Step 5: Add Environment Variable
```bash
vercel env add VITE_API_URL production
```

**When prompted:**
- Value: **Paste your Railway backend URL** (e.g., `https://your-backend.railway.app`)
- Press Enter

### Step 6: Deploy to Production
```bash
vercel --prod
```

---

## All Commands in One Block

Copy and paste this (replace `YOUR_RAILWAY_BACKEND_URL` with your actual Railway URL):

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to frontend
cd /Users/samirsardhara/Desktop/Projects/Apni-Sec/frontend

# Login
vercel login

# Deploy (follow prompts)
vercel

# Add environment variable (replace with your Railway backend URL)
vercel env add VITE_API_URL production

# Deploy to production
vercel --prod
```

---

## Quick One-Liner (After First Setup)

If you've already set up Vercel once, you can just run:

```bash
cd frontend && vercel --prod
```

---

## Get Your Railway Backend URL First!

Before running the commands, get your Railway backend URL:

1. Go to [railway.app](https://railway.app)
2. Click on your backend service
3. Go to **Settings** → **Domains**
4. Copy the URL (e.g., `https://apnisec-backend-production.up.railway.app`)

Use this URL when setting `VITE_API_URL`.

---

## After Deployment

1. **Vercel will give you a URL** like: `https://apnisec-frontend.vercel.app`

2. **Update Railway Backend:**
   - Go to Railway → Backend service → Variables
   - Update `FRONTEND_URL` = `https://apnisec-frontend.vercel.app`
   - Redeploy backend

3. **Test your app:**
   - Visit your Vercel URL
   - Try registering and logging in

---

## Troubleshooting

### If `vercel` command not found:
```bash
npm install -g vercel
```

### If login fails:
```bash
vercel logout
vercel login
```

### To check current deployment:
```bash
vercel ls
```

### To view logs:
```bash
vercel logs
```

### To remove deployment:
```bash
vercel remove
```

---

## Alternative: Use Vercel Dashboard (No Commands)

1. Go to [vercel.com](https://vercel.com) and login
2. Click **"Add New Project"**
3. **Import your GitHub repository**
4. **Configure:**
   - Framework Preset: **Vite**
   - Root Directory: **frontend**
   - Build Command: **npm run build** (auto-detected)
   - Output Directory: **dist** (auto-detected)
5. **Environment Variables:**
   - Click "Environment Variables"
   - Add: **VITE_API_URL** = `https://your-backend.railway.app`
6. Click **"Deploy"**

---

## Complete Example with Real URL

```bash
# Step 1: Install
npm install -g vercel

# Step 2: Navigate
cd /Users/samirsardhara/Desktop/Projects/Apni-Sec/frontend

# Step 3: Login
vercel login

# Step 4: Deploy
vercel

# Step 5: Set environment variable (REPLACE with your actual Railway URL)
vercel env add VITE_API_URL production
# When prompted, paste: https://apnisec-backend-production.up.railway.app

# Step 6: Deploy to production
vercel --prod
```

---

## Verify Deployment

After deployment, Vercel will show:
- ✅ Production URL: `https://your-project.vercel.app`
- ✅ Deployment status: Ready

Visit the URL to test your application!

