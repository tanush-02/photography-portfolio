# Quick Start Guide

Get your photography portfolio up and running in 5 minutes!

## Prerequisites
- Node.js installed
- Firebase account (free)

## Step 1: Install Dependencies (1 min)

```bash
cd photography-portfolio
npm install
```

## Step 2: Set Up Firebase (2 min)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable:
   - Authentication (Email/Password)
   - Firestore Database
   - Storage
4. Create an admin user in Authentication
5. Copy your Firebase config

## Step 3: Configure App (1 min)

Open `src/firebase.ts` and replace the config:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

## Step 4: Set Security Rules (1 min)

### Firestore Rules
In Firebase Console > Firestore > Rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /photos/{photoId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /stories/{storyId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### Storage Rules
In Firebase Console > Storage > Rules:
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /photos/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /stories/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Step 5: Run the App (30 sec)

```bash
npm start
```

Visit `http://localhost:3000` 🎉

## First Steps

1. Click "Admin Login"
2. Enter your Firebase admin credentials
3. Upload your first photo
4. Create your first story
5. Share your portfolio!

## Need More Help?

- Detailed setup: See `FIREBASE_SETUP.md`
- Full documentation: See `README.md`
- Firebase docs: https://firebase.google.com/docs

---

Happy photographing! 📸