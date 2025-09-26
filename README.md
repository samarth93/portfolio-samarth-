# 🚀 Samarth's Portfolio - Full-Stack Application

A modern, responsive, and dynamic portfolio website with complete backend integration, featuring real-time content management and admin dashboard capabilities.

## ✨ Features

### 🎨 **Frontend Features**
- **Fully Responsive Design** - Optimized for all devices (desktop, tablet, mobile)
- **Dynamic Content Management** - All content loaded from MongoDB database
- **Interactive Animations** - Smooth scroll animations and modern UI transitions
- **Contact Form** - Real-time message submission with feedback
- **Project Showcase** - Dynamic project gallery with custom key features
- **Professional Journey** - Experience timeline with achievements
- **Core Domains** - Skills and expertise showcase
- **Community Section** - Professional networking and collaboration

### 🔐 **Admin Dashboard**
- **Secure Authentication** - JWT-based login system
- **Experience Management** - Full CRUD operations for professional experience
- **Project Management** - Dynamic project creation with custom key features
- **Insights Management** - Blog/article management with publish/draft status
- **Contact Management** - View and manage all contact form submissions
- **Real-time Statistics** - Dashboard with counts and metrics
- **Content Publishing** - Control what content appears on the public site

### 🗄️ **Backend Features**
- **MongoDB Atlas Integration** - Cloud database with full persistence
- **RESTful API** - Complete CRUD operations for all entities
- **JWT Authentication** - Secure token-based admin access
- **Input Validation** - Comprehensive data validation and error handling
- **Dynamic Content** - No hardcoded content, everything from database
- **Contact System** - Message storage and management
- **CORS Configuration** - Proper cross-origin resource sharing

## 🛠️ Tech Stack

### **Frontend**
- **Next.js 15.2.4** - React framework with Turbopack
- **React 19** - Modern React with hooks and context
- **TypeScript** - Type-safe development
- **CSS Modules** - Scoped styling with responsive design
- **Framer Motion** - Smooth animations and transitions

### **Backend** 
- **Spring Boot 3.x** - Java enterprise framework
- **Java 17+** - Modern Java with latest features
- **MongoDB Atlas** - Cloud NoSQL database
- **Spring Data MongoDB** - Database integration layer
- **JWT Authentication** - Secure token-based auth
- **Maven** - Project management and dependencies

### **Database Collections**
- **experiences** - Professional experience and achievements
- **projects** - Portfolio projects with dynamic key features  
- **insights** - Blog posts and articles with publish status
- **contacts** - Contact form submissions and messages

## 🚀 Getting Started

### **Prerequisites**
- **Node.js** (v18+)
- **npm** or **yarn**
- **Java 17+**
- **Maven 3.6+**
- **MongoDB Atlas Account** (for database)

### **Environment Setup**

1. **Clone the Repository**
```bash
git clone https://github.com/samarth93/portfolio-samarth-.git
cd portfolio-samarth-
```

2. **Backend Configuration**
```bash
cd backend
# Update src/main/resources/application.properties with your MongoDB connection string
# spring.data.mongodb.uri=mongodb+srv://your-connection-string
```

3. **Start the Backend**
```bash
cd backend
mvn spring-boot:run
# Backend will run on http://127.0.0.1:8081
```

4. **Start the Frontend**
```bash
cd portfolio-project/frontend
npm install
npm run dev
# Frontend will run on http://localhost:3000
```

5. **Access the Application**
- **Public Portfolio**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3000/admin

## 📱 **Application Structure**

### **Frontend Pages**
- `/` - Main portfolio page with all sections
- `/admin` - Admin dashboard (protected route)
- `/insights` - Public insights/blog page
- `/community` - Community and collaboration page

### **API Endpoints**

#### **Public Endpoints**
- `GET /api/experiences` - Get all experiences
- `GET /api/projects` - Get all projects  
- `GET /api/insights` - Get published insights
- `POST /api/auth/contacts` - Submit contact form

#### **Protected Admin Endpoints**
- `POST /api/auth/login` - Admin authentication
- `GET /api/auth/validate` - Token validation
- `GET/POST/PUT/DELETE /api/auth/experiences/*` - Experience management
- `GET/POST/PUT/DELETE /api/auth/projects/*` - Project management
- `GET/POST/PUT/DELETE /api/auth/insights/*` - Insights management
- `GET /api/auth/contacts/*` - Contact management and stats

## 🎯 **Key Improvements**

### **Dynamic Content System**
- ✅ Removed all hardcoded content
- ✅ Complete database integration
- ✅ Real-time content updates
- ✅ Admin-controlled publishing

### **Enhanced Project Management**
- ✅ Custom key features for each project
- ✅ Dynamic technology stack management
- ✅ Flexible project categorization
- ✅ Rich project descriptions

### **Contact System**
- ✅ Real-time form submission
- ✅ Admin message management
- ✅ Contact statistics and analytics
- ✅ Message status tracking

### **Mobile Optimization**
- ✅ Fully responsive design
- ✅ Touch-friendly interactions  
- ✅ Optimized loading performance
- ✅ Mobile-first approach

## 🔧 **Development**

### **Database Schema**

```javascript
// Experience Document
{
  id: String,
  company: String,
  position: String,
  duration: String,
  description: String,
  achievements: [String],
  techStack: [String],
  createdAt: Date,
  updatedAt: Date
}

// Project Document  
{
  id: String,
  title: String,
  description: String,
  techStack: [String],
  keyFeatures: [String], // Dynamic custom features
  githubUrl: String,
  liveUrl: String,
  createdAt: Date,
  updatedAt: Date
}

// Contact Document
{
  id: String,
  name: String,
  email: String,
  subject: String,
  message: String,
  isRead: Boolean,
  createdAt: Date
}
```

### **Authentication Flow**
1. Admin login with credentials
2. JWT token generation and storage
3. Token validation for protected routes
4. Automatic logout on token expiry

## 🌟 **Features Showcase**

- **📊 Admin Dashboard** - Complete content management system
- **📱 Responsive Design** - Perfect on all devices
- **🎨 Modern UI/UX** - Clean, professional design
- **⚡ Fast Performance** - Optimized loading and interactions
- **🔒 Secure Admin** - JWT-based authentication
- **📧 Contact System** - Real-time message handling
- **🗃️ Database Driven** - No hardcoded content
- **🚀 Easy Deployment** - Ready for production

## 📄 **License**

MIT License - feel free to use this project for your own portfolio!

---

**Built with ❤️ by Samarth** | [GitHub](https://github.com/samarth93) | [LinkedIn](https://linkedin.com/in/samarth93) 
