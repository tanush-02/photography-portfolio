# Photography Portfolio Website

A beautiful, responsive React-based photography portfolio website with admin authentication, photo gallery management, storytelling features, and an about section.

## Features

- 📸 **Photo Gallery**: Display your photography work in a beautiful grid layout
- 📝 **Stories Section**: Share stories behind your photos with rich content
- 👤 **About Section**: Professional about page with portrait and biography
- 🔐 **Admin Authentication**: Simple static username/password authentication
- ✏️ **Content Management**: Upload, edit descriptions, and delete photos/stories (admin only)
- 👁️ **Public View**: Visitors can view all content without login
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- ☁️ **No Backend Required**: All data stored in Cloudinary metadata

## Tech Stack

- **Frontend**: React 19 with TypeScript
- **Routing**: React Router DOM
- **Image Storage & Database**: Cloudinary (25 GB free tier)
- **Authentication**: Static credentials (environment variables)
- **Styling**: Custom CSS with modern design

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Cloudinary account (free tier available)

## Setup Instructions

### 1. Clone and Install

```bash
cd photography-portfolio
npm install
```

### 2. Cloudinary Setup

See [CLOUDINARY_SETUP.md](CLOUDINARY_SETUP.md) for detailed Cloudinary configuration instructions.

Quick steps:
1. Go to [Cloudinary](https://cloudinary.com/) and create a free account
2. Get your Cloud Name, API Key, and API Secret
3. Create an unsigned upload preset
4. Add credentials to `.env`

### 3. Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in your admin credentials and Cloudinary configuration in `.env`:
   ```env
   # Admin Credentials
   REACT_APP_ADMIN_USERNAME=your_username
   REACT_APP_ADMIN_PASSWORD=your_password
   
   # Cloudinary
   REACT_APP_CLOUDINARY_CLOUD_NAME=your_cloud_name
   REACT_APP_CLOUDINARY_API_KEY=your_api_key
   REACT_APP_CLOUDINARY_API_SECRET=your_api_secret
   REACT_APP_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
   ```

### 4. Upload About Page Portrait

Upload your portrait image to Cloudinary and update the URL in `src/components/About.tsx` (line 67).

See [CLOUDINARY_SETUP.md](CLOUDINARY_SETUP.md) for detailed instructions.

### 5. Run the Application

```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## Usage

### For Visitors
- Browse the photo gallery on the home page
- Read photography stories in the Stories section
- View the About page to learn more about the photographer
- No login required for viewing content

### For Admin
1. Click "Admin Login" in the navigation
2. Enter your email and password
3. Once logged in, you can:
   - **Upload Photos**: Click "Upload Photo" button in Gallery
   - **Edit Descriptions**: Click "Edit" on any photo to add/modify description
   - **Delete Photos**: Click "Delete" to remove photos
   - **Create Stories**: Click "Add New Story" in Stories section
   - **Edit Stories**: Click "Edit" on any story
   - **Delete Stories**: Click "Delete" to remove stories

## Project Structure

```
photography-portfolio/
├── public/
├── src/
│   ├── components/
│   │   ├── Gallery.tsx          # Photo gallery component
│   │   ├── Gallery.css
│   │   ├── Stories.tsx          # Stories component
│   │   ├── Stories.css
│   │   ├── About.tsx            # About page component
│   │   ├── About.css
│   │   ├── Login.tsx            # Login component
│   │   ├── Login.css
│   │   ├── Navbar.tsx           # Navigation component
│   │   └── Navbar.css
│   ├── contexts/
│   │   └── AuthContext.tsx      # Static authentication context
│   ├── cloudinary.ts            # Cloudinary configuration & API
│   ├── App.tsx                  # Main app component
│   ├── App.css
│   └── index.tsx
├── .env.example
├── CLOUDINARY_SETUP.md
├── package.json
└── README.md
```

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Deployment

You can deploy to various platforms:

### Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

### Netlify
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Add environment variables in Netlify dashboard

### Vercel
```bash
npm install -g vercel
vercel
```

## Customization

- **Colors**: Update gradient colors in CSS files
- **Logo**: Change the logo in `Navbar.tsx`
- **Fonts**: Modify font-family in `App.css`
- **Layout**: Adjust grid layouts in Gallery and Stories CSS

## Security Notes

- Never commit `.env` file to version control
- Keep your Firebase configuration secure
- Regularly update dependencies
- Use strong passwords for admin accounts
- Review Firebase security rules regularly

## Troubleshooting

### Images not uploading
- Check Cloudinary credentials in `.env`
- Verify upload preset is set to "unsigned"
- Ensure API Key and Secret are correct
- Check browser console for errors
- See [CLOUDINARY_SETUP.md](CLOUDINARY_SETUP.md) for more details

### Authentication not working
- Verify admin credentials in `.env` file
- Check that username and password match
- Clear browser cache and try again

### Images not displaying
- Verify Cloudinary API credentials are correct
- Check that images exist in Cloudinary Media Library
- Ensure folder names match ('gallery', 'stories', 'about')
- Check browser console for CORS or API errors

## License

MIT License - feel free to use this project for your portfolio!

## Support

For issues or questions, please check:
- Cloudinary documentation: https://cloudinary.com/documentation
- React documentation: https://react.dev/

---

Built with ❤️ for photographers
