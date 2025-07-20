# Professional Portfolio Website

A modern, interactive personal portfolio website built with Next.js.

## Features

- Modern, clean interface with animated elements
- Cloud-themed visuals in hero section
- DevOps visual elements including pipeline diagrams
- Fully responsive design
- Interactive hover effects and smooth transitions
- Light/dark mode toggle
- All content on a single page with smooth scroll navigation
- Static data (no backend required)

## Project Structure

### Frontend (Next.js)

The frontend is built with Next.js and uses CSS modules for styling (no CSS frameworks).

```
frontend/
├── app/            # Next.js app directory
├── components/     # React components
├── styles/         # CSS module files
└── public/         # Static assets
```

## Setup and Installation

### Prerequisites

- Node.js (v18+)

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd portfolio-project/frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   npm run dev
   ```

4. The application should now be accessible at [http://localhost:3000](http://localhost:3000)

## Customization

To personalize this portfolio:

1. Update the profile data in `frontend/app/page.tsx` with your own information in the `setProfileData` function.

2. Replace placeholder content in various components under `frontend/components/` with your own details.

3. Customize colors and themes by modifying variables in `frontend/app/globals.css`.

4. Add your own images to `frontend/public/images/`.

## Deployment

The Next.js application can be deployed to platforms like Vercel, Netlify, or any hosting provider supporting Node.js applications.

### Option 1: Vercel (Recommended)

1. Push your code to a Git repository (GitHub, GitLab, etc.)
2. Connect your repository to Vercel
3. Vercel will automatically build and deploy your application

### Option 2: Static Export

1. Build the production version:
   ```
   cd frontend
   npm run build
   ```

2. Deploy the built files from the `.next` directory to any static hosting service.

### Option 3: Manual Deployment

1. Build the production version:
   ```
   cd frontend
   npm run build
   npm start
   ```

2. Deploy to any Node.js hosting service.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 
