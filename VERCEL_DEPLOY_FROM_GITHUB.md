# Deploy to Vercel from Existing GitHub Repo

## Step-by-Step After Login

### Step 1: Login to Vercel (Already Done)
```bash
vercel login
```

### Step 2: Navigate to Project Root
```bash
cd /Users/samirsardhara/Desktop/Projects/Apni-Sec
```

### Step 3: Link to Your GitHub Repo
```bash
vercel
```

**When prompted:**
- Set up and deploy? → **Yes** (press Enter)
- Which scope? → **Select your account** (press Enter)
- Link to existing project? → **No** (type `n` and press Enter)
- Project name? → **apnisec-frontend** (or press Enter)
- Directory? → **frontend** (type `frontend` and press Enter)
- Override settings? → **No** (press Enter)

### Step 4: Add Environment Variable
```bash
vercel env add VITE_API_URL production
```

**When prompted:**
- Value: **Paste your Railway backend URL**
  - Example: `https://your-backend.railway.app`
- Press Enter

### Step 5: Deploy to Production
```bash
vercel --prod
```

---

## Alternative: Use Vercel Dashboard (Easier)

Since you already have a GitHub repo, this is the easiest method:

### Step 1: Go to Vercel Dashboard
1. **Visit [vercel.com](https://vercel.com)**
2. **Login** (you're already logged in)

### Step 2: Import Project
1. **Click "Add New Project"** (or "New Project")
2. **Click "Import Git Repository"**
3. **Select your GitHub account** (if not connected, connect it)
4. **Find and select your "ApniSec" repository**
5. **Click "Import"**

### Step 3: Configure Project
1. **Framework Preset:** Vite (should auto-detect)
2. **Root Directory:** Click "Edit" → Enter `frontend`
3. **Build Command:** `npm run build` (auto-detected)
4. **Output Directory:** `dist` (auto-detected)
5. **Install Command:** `npm install` (auto-detected)

### Step 4: Add Environment Variable
1. **Click "Environment Variables"**
2. **Add new variable:**
   - **Key:** `VITE_API_URL`
   - **Value:** `https://your-backend.railway.app` (your Railway backend URL)
   - **Environment:** Production (and Preview if you want)
3. **Click "Save"**

### Step 5: Deploy
1. **Click "Deploy"**
2. **Wait for deployment** (2-3 minutes)
3. **Get your URL** (e.g., `https://apnisec-frontend.vercel.app`)

---

## Complete Commands (After Login)

```bash
# Navigate to project
cd /Users/samirsardhara/Desktop/Projects/Apni-Sec

# Deploy (will ask questions)
vercel

# When prompted:
# - Set up and deploy? Yes
# - Which scope? (select account)
# - Link to existing project? No
# - Project name? apnisec-frontend
# - Directory? frontend
# - Override settings? No

# Add environment variable (replace with your Railway backend URL)
vercel env add VITE_API_URL production

# Deploy to production
vercel --prod
```

---

## Quick One-Liner (After First Setup)

If you've already deployed once:

```bash
cd /Users/samirsardhara/Desktop/Projects/Apni-Sec && vercel --prod
```

---

## Important: Get Your Railway Backend URL First!

Before setting `VITE_API_URL`, get your Railway backend URL:

1. Go to [railway.app](https://railway.app)
2. Click on your backend service
3. Settings → Domains
4. Copy the URL (e.g., `https://apnisec-backend-production.up.railway.app`)

Use this URL when setting the environment variable.

---

## After Deployment

1. **Vercel will show your URL:** `https://your-project.vercel.app`
2. **Update Railway Backend:**
   - Railway → Backend service → Variables
   - Update `FRONTEND_URL` = your Vercel URL
   - Backend will auto-redeploy
3. **Test your app:**
   - Visit your Vercel URL
   - Try registering and logging in

---

## Troubleshooting

### If `vercel` command not found:
```bash
npm install -g vercel
```

### If directory not found:
Make sure you're in the project root:
```bash
cd /Users/samirsardhara/Desktop/Projects/Apni-Sec
```

### To check deployment status:
```bash
vercel ls
```

### To view logs:
```bash
vercel logs
```

---

## Recommended: Use Dashboard Method

Since you have a GitHub repo, **using the Vercel dashboard is easier**:
- No commands needed
- Visual interface
- Easy to configure
- Automatic deployments on git push

Just go to vercel.com → Add New Project → Import your GitHub repo → Configure → Deploy!

