# Cloudinary Setup Guide

This project uses Cloudinary for image storage and management instead of Firebase Storage.

## Why Cloudinary?

- **Generous Free Tier**: 25 GB storage and 25 GB bandwidth/month
- **Image Optimization**: Automatic format conversion and quality optimization
- **Transformations**: On-the-fly image resizing and effects
- **Better Performance**: CDN delivery for faster image loading
- **Easy Integration**: Simple client-side uploads with unsigned presets

## Setup Instructions

### 1. Create a Cloudinary Account

1. Go to [Cloudinary](https://cloudinary.com/) and sign up for a free account
2. After signing up, you'll be taken to your Dashboard

### 2. Get Your Credentials

From your Cloudinary Dashboard, note down:
- **Cloud Name**: Found at the top of the dashboard
- **API Key**: Found in the "Account Details" section
- **API Secret**: Found in the "Account Details" section (click "Reveal" to see it)

### 3. Create an Upload Preset

For client-side uploads, you need to create an unsigned upload preset:

1. Go to **Settings** (gear icon) → **Upload**
2. Scroll down to **Upload presets**
3. Click **Add upload preset**
4. Configure the preset:
   - **Preset name**: Choose a name (e.g., `photography_portfolio`)
   - **Signing Mode**: Select **Unsigned**
   - **Folder**: (Optional) Set a default folder like `photography-portfolio`
   - **Access Mode**: Public
5. Click **Save**
6. Note down the **preset name** you created

### 4. Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and add your Cloudinary credentials:
   ```env
   # Cloudinary Configuration
   REACT_APP_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
   REACT_APP_CLOUDINARY_API_KEY=your_api_key_here
   REACT_APP_CLOUDINARY_API_SECRET=your_api_secret_here
   REACT_APP_CLOUDINARY_UPLOAD_PRESET=your_upload_preset_name_here
   ```

3. Replace the placeholder values with your actual Cloudinary credentials

### 5. Folder Structure in Cloudinary

The application organizes images into folders:
- `gallery/` - Photos uploaded through the Gallery page
- `stories/` - Images uploaded with Stories
- `about/` - Portrait image for the About page

### 6. Upload Your About Page Portrait

You have two options:

#### Option A: Upload via Cloudinary Dashboard (Recommended)
1. Go to your Cloudinary Dashboard
2. Click **Media Library**
3. Click **Upload** button
4. Create a folder named `about`
5. Upload your portrait image
6. Click on the uploaded image
7. Copy the **Secure URL** (starts with `https://res.cloudinary.com/...`)
8. Update `src/components/About.tsx` line 67 with your image URL

#### Option B: Use Static Image
1. Place your portrait image in `public/images/portrait.jpg`
2. Update `src/components/About.tsx` line 67:
   ```tsx
   src="/images/portrait.jpg"
   ```

## Image Deletion Note

⚠️ **Important**: For security reasons, deleting images from Cloudinary requires server-side implementation. Currently, the app only removes image references from Firestore. To fully delete images from Cloudinary, you'll need to:

1. Set up a backend API endpoint
2. Use Cloudinary's Admin API with your API Secret
3. Call this endpoint when deleting images

For now, you can manually delete images from the Cloudinary Dashboard:
1. Go to **Media Library**
2. Find the image
3. Click the trash icon

## Testing

1. Start your development server:
   ```bash
   npm start
   ```

2. Log in as admin (if you haven't set up Firebase Auth yet, see `FIREBASE_SETUP.md`)

3. Try uploading an image in the Gallery or Stories section

4. Check your Cloudinary Media Library to verify the upload

## Troubleshooting

### Upload Fails
- Verify your Cloud Name and Upload Preset are correct in `.env`
- Make sure the Upload Preset is set to "Unsigned"
- Check browser console for error messages

### Images Don't Display
- Verify the Cloudinary URLs are accessible (try opening in browser)
- Check if images are set to "Public" access mode
- Clear browser cache

### CORS Errors
- Cloudinary should handle CORS automatically
- If issues persist, check Cloudinary Settings → Security → Allowed fetch domains

## Free Tier Limits

Monitor your usage in the Cloudinary Dashboard:
- **Storage**: 25 GB
- **Bandwidth**: 25 GB/month
- **Transformations**: 25,000/month
- **Credits**: 25 credits/month

## Additional Resources

- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Upload Widget](https://cloudinary.com/documentation/upload_widget)
- [Image Transformations](https://cloudinary.com/documentation/image_transformations)

## Made with Bob