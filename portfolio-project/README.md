# Professional Portfolio Website

A modern, interactive personal portfolio website featuring a Next.js frontend and Spring Boot backend.

## Features

- Modern, clean interface with animated elements
- Cloud-themed visuals in hero section
- DevOps visual elements including pipeline diagrams
- Fully responsive design
- Interactive hover effects and smooth transitions
- Light/dark mode toggle
- All content on a single page with smooth scroll navigation

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

### Backend (Spring Boot)

The backend is a minimal Spring Boot REST API implementation.

```
backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── portfolio/
│   │   │           └── backend/
│   │   │               ├── BackendApplication.java
│   │   │               └── controller/
│   │   │                   └── PortfolioController.java
│   │   └── resources/
│   │       └── application.properties
└── pom.xml
```

## Setup and Installation

### Prerequisites

- Node.js (v18+)
- Java JDK 17+
- Maven

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

4. The frontend should now be accessible at [http://localhost:3000](http://localhost:3000)

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd portfolio-project/backend
   ```

2. Build the application:
   ```
   mvn clean install
   ```

3. Run the application:
   ```
   mvn spring-boot:run
   ```

4. The backend API should now be accessible at [http://localhost:8080](http://localhost:8080)

## API Endpoints

- `GET /api/profile` - Returns profile data including personal information, skills, projects, experience, and certifications.

## Customization

To personalize this portfolio:

1. Update the profile data in `backend/src/main/java/com/portfolio/backend/controller/PortfolioController.java` with your own information.

2. Replace placeholder content in various components under `frontend/components/` with your own details.

3. Customize colors and themes by modifying variables in `frontend/app/globals.css`.

## Deployment

### Frontend Deployment

The Next.js frontend can be deployed to platforms like Vercel, Netlify, or any hosting provider supporting Node.js applications.

1. Build the production version:
   ```
   cd frontend
   npm run build
   ```

2. Deploy the built files from the `.next` directory.

### Backend Deployment

The Spring Boot backend can be deployed to platforms like Heroku, AWS Elastic Beanstalk, or any Java hosting service.

1. Build the JAR file:
   ```
   cd backend
   mvn clean package
   ```

2. Deploy the JAR file from the `target` directory.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 