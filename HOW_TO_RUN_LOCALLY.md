# How to Run Locally

Follow these steps to run your photography portfolio on your local machine:

## Step 1: Open Terminal

Open your terminal and navigate to the project:

```bash
cd /Users/tanush/Desktop/photography-portfolio
```

## Step 2: Install Dependencies (if not done)

```bash
npm install
```

## Step 3: Configure Firebase (Important!)

Before running, you MUST configure Firebase:

### Option A: Quick Test (Temporary)
Update `src/firebase.ts` with placeholder values to see the UI:
- The app will load but won't save data
- Good for testing the interface

### Option B: Full Setup (Recommended)
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a project
3. Enable Authentication, Firestore, and Storage
4. Copy your config to `src/firebase.ts`

See `FIREBASE_SETUP.md` for detailed instructions.

## Step 4: Start Development Server

```bash
npm start
```

This will:
- Compile the React app
- Open browser at `http://localhost:3000`
- Show any compilation errors in terminal

## Step 5: Check for Errors

### Common Errors and Solutions:

**"Firebase: Error (auth/invalid-api-key)"**
- You need to configure Firebase in `src/firebase.ts`
- See FIREBASE_SETUP.md

**"Module not found"**
- Run `npm install` again
- Check if all dependencies installed

**Port 3000 already in use**
- Kill the process: `lsof -ti:3000 | xargs kill -9`
- Or use different port: `PORT=3001 npm start`

**TypeScript errors**
- These are warnings, app should still run
- Can be fixed later

## What You Should See

1. **Without Firebase configured:**
   - App loads with UI
   - Login won't work
   - Can't upload photos
   - Good for testing design

2. **With Firebase configured:**
   - Full functionality
   - Can login
   - Can upload photos
   - Can create stories

## Testing the App

1. **Test Navigation:**
   - Click "Gallery" - should show gallery page
   - Click "Stories" - should show stories page
   - Click "Admin Login" - should show login form

2. **Test Responsive Design:**
   - Resize browser window
   - Should adapt to different screen sizes

3. **Test Admin Features (with Firebase):**
   - Login with your credentials
   - Try uploading a photo
   - Try creating a story
   - Try editing descriptions

## Stopping the Server

Press `Ctrl + C` in the terminal

## Next Steps

If everything works:
1. Configure Firebase properly
2. Create admin user
3. Start uploading your photos!

If you see errors:
1. Check terminal output
2. Check browser console (F12)
3. See troubleshooting in README.md