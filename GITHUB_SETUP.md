# GitHub Setup Instructions

Follow these commands to push your project to GitHub:

## Step 1: Initialize Git Repository

```bash
cd /Users/samirsardhara/Desktop/Projects/Apni-Sec
git init
```

## Step 2: Add All Files

```bash
git add .
```

## Step 3: Create Initial Commit

```bash
git commit -m "Initial commit: ApniSec full-stack application"
```

## Step 4: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Repository name: `ApniSec` (or any name you prefer)
5. Description: "Full-stack cybersecurity platform with React frontend and Node.js backend"
6. Choose **Public** or **Private**
7. **DO NOT** initialize with README, .gitignore, or license (we already have these)
8. Click "Create repository"

## Step 5: Add Remote and Push

After creating the repository, GitHub will show you commands. Use these:

```bash
# Add your GitHub repository as remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/ApniSec.git

# Or if you prefer SSH:
# git remote add origin git@github.com:YOUR_USERNAME/ApniSec.git

# Rename default branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

## Complete Command Sequence

Here's the complete sequence of commands:

```bash
# Navigate to project directory
cd /Users/samirsardhara/Desktop/Projects/Apni-Sec

# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: ApniSec full-stack application

- React 19+ frontend with TypeScript and Tailwind CSS
- Node.js backend with OOP architecture
- MySQL database integration
- JWT authentication
- Issue management system
- Email notifications with Resend
- Rate limiting
- SEO optimized landing page"

# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/ApniSec.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Important Notes

⚠️ **Before pushing, make sure:**
- `.env` files are NOT committed (they're in .gitignore)
- No sensitive data (passwords, API keys) in committed files
- `env.example` files are committed (they're safe templates)

## Future Updates

To push future changes:

```bash
git add .
git commit -m "Your commit message"
git push
```

## If You Need to Update Remote URL

```bash
# Check current remote
git remote -v

# Update remote URL
git remote set-url origin https://github.com/YOUR_USERNAME/ApniSec.git
```

