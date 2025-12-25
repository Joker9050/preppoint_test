# PrepPoint Project Functionality Documentation

## Overview
PrepPoint is a Next.js-based web application designed for Multiple Choice Question (MCQ) and Previous Year Question (PYQ) practice. It provides a comprehensive platform for users to prepare for various competitive exams, including IT programming, government exams, and banking exams. The application features a modern, responsive UI built with React, Tailwind CSS, and Framer Motion for animations.

## Project Structure

### Root Directory
- **package.json**: Defines project dependencies including Next.js, React, authentication libraries (NextAuth, JWT), UI libraries (Framer Motion, Lucide React), and styling (Tailwind CSS)
- **next.config.js**: Next.js configuration file
- **tailwind.config.js**: Tailwind CSS configuration
- **postcss.config.js**: PostCSS configuration for Tailwind
- **README.md**: Basic project description
- **TODO.md**: Migration plan from React (Vite) to Next.js
- **eslint.config.js**: ESLint configuration
- **vite.config.js**: Legacy Vite configuration (to be removed)
- **index.html**: Legacy HTML file (to be removed)

### Pages Directory (`pages/`)
Next.js file-based routing system:

- **_app.js**: Root component that wraps all pages with AuthProvider and conditionally renders Navbar
- **index.js**: Home page with animated search bar, welcome section, and course sliders
- **categories.js**: Wrapper component that renders the Category page from src/
- **mcq.js**: MCQ practice page (likely contains quiz functionality)
- **login.js**: User authentication page
- **register.js**: User registration page
- **forgot-password.js**: Password recovery page
- **dashboard.js**: User dashboard
- **contact.js**: Contact page
- **cookie-policy.js**: Cookie policy page
- **api/auth/[...nextauth].js**: NextAuth.js API route for authentication

### Components Directory (`components/`)
Reusable React components:

- **Navbar.jsx**: Main navigation bar with search functionality, category dropdown, and auth buttons
- **Navbar_new.jsx**: Alternative/newer version of navbar
- **Footer.jsx**: Site footer component
- **Slidebar.jsx**: Course slider component for displaying learning categories
- **ContactUs.jsx**: Contact form component
- **FeedbackSection.jsx**: User feedback collection component
- **FeaturesSection.jsx**: Features showcase component

#### Helper Components (`components/helper/`)
- **Logo.jsx**: Application logo component
- **AuthButton.jsx**: Authentication button (login/logout)
- **LanguageSelector.jsx**: Language selection dropdown
- **CategoryDropdown.jsx**: Category selection dropdown
- **MobileMenu.jsx**: Mobile navigation menu
- **SearchBar.jsx**: Search input component
- **NavLinks.jsx**: Navigation links component

### Library Directory (`lib/`)
- **AuthContext.js**: React context for authentication state management

### Source Directory (`src/`)
Legacy structure from Vite migration:

#### Components (`src/componets/` - Note: Typo in folder name)
- **Footer.jsx**: Alternative footer component
- **Navbar.jsx**: Alternative navbar component
- **Slidebar.jsx**: Alternative slidebar component
- **ContactUs.jsx**: Alternative contact component
- **FeaturesSection.jsx**: Alternative features component
- **FeedbackSection.jsx**: Alternative feedback component

##### Helper Components (`src/componets/helper/`)
- **AuthButton.jsx**: Alternative auth button
- **CategoryDropdown.jsx**: Alternative category dropdown
- **LanguageSelector.jsx**: Alternative language selector
- **Logo.jsx**: Alternative logo component
- **MobileMenu.jsx**: Alternative mobile menu
- **NavLinks.jsx**: Alternative nav links
- **SearchBar.jsx**: Alternative search bar

#### Pages (`src/pages/`)
- **Category.jsx**: Main categories page displaying IT, Government, and Banking exam categories
- **Home.jsx**: Alternative home page
- **Mcq.jsx**: Alternative MCQ page
- **NotFound.jsx**: 404 error page
- **StaticPage.jsx**: Generic static page component

##### Auth Pages (`src/pages/Auth/`)
- **Login.jsx**: Login page component
- **Register.jsx**: Registration page component
- **ForgotPassword.jsx**: Password recovery component
- **Logout.jsx**: Logout functionality
- **AuthContext.jsx**: Alternative auth context

##### Admin Pages (`src/pages/Admin/`)
- **Dashboard.jsx**: Admin dashboard
- **ManageUsers.jsx**: User management interface
- **Reports.jsx**: Admin reports page

##### User Pages (`src/pages/User/`)
- **Courses.jsx**: User courses page
- **Dashboard.jsx**: User dashboard
- **Enrollments.jsx**: User enrollments page
- **Profile.jsx**: User profile page

#### Context (`src/context/`)
- **AuthContext.js**: Alternative authentication context
- **UserContext.js**: User state management context

#### Routes (`src/routes/`)
- **AppRoutes.jsx**: Application routing configuration

#### Services (`src/services/`)
- **authService.js**: Authentication API service functions
- **courseService.js**: Course-related API service functions

### Assets Directory (`src/assets/`)
- **css/style.css**: Custom CSS styles
- **images/**: Static images (logo.png, profile.png)
- **react.svg**: React logo

### Public Directory (`public/`)
- **logo.png**: Public logo asset
- **vite.svg**: Vite logo (legacy)

### Styles Directory (`styles/`)
- **globals.css**: Global CSS styles

## Core Functionality

### 1. Authentication System
- **Context**: AuthContext manages user state using React Context and localStorage
- **Methods**: login(), logout(), register(), useAuth() hook
- **Integration**: NextAuth.js for OAuth (Google) and session management
- **Pages**: Login, Register, Forgot Password, Logout

### 2. Navigation & UI
- **Responsive Design**: Mobile-first approach with breakpoints at 1080px
- **Search Functionality**: Debounced search with real-time results across categories
- **Animations**: Framer Motion for smooth transitions and hover effects
- **Styling**: Tailwind CSS for utility-first styling

### 3. Categories & Learning Paths
- **IT Section**: Programming languages (HTML, CSS, JS, React, Python, Java, PHP, C, TypeScript) and CS fundamentals (DSA, DBMS, OS, Networks, OOP, etc.)
- **Government Exams**: SSC CGL, CHSL, GD, MTS, Stenographer
- **Banking Exams**: IBPS PO/Clerk, SBI PO/Clerk, RBI Grade B, NABARD, SEBI

### 4. MCQ Practice System
- **Dynamic Routing**: Subject-based routing (/mcq?subject=JavaScript)
- **Question Display**: Interactive MCQ interface
- **Progress Tracking**: User performance and completion tracking

### 5. User Dashboard
- **Profile Management**: User information and settings
- **Course Enrollment**: Track enrolled courses and progress
- **Performance Analytics**: Quiz results and improvement suggestions

### 6. Admin Panel
- **User Management**: Admin controls for user accounts
- **Content Management**: Manage courses, questions, and categories
- **Reports**: Analytics and system reports

## Key Features

### Search & Discovery
- Animated search bar with typing effect
- Real-time search results with category filtering
- Debounced search to optimize performance

### Responsive Design
- Mobile-optimized navigation with hamburger menu
- Adaptive layouts for different screen sizes
- Touch-friendly interactions

### Performance Optimizations
- Static data for categories (no API calls for basic content)
- Lazy loading and code splitting
- Optimized images and assets

### Accessibility
- Semantic HTML structure
- Keyboard navigation support
- Screen reader friendly components

## API Integration
- **Authentication**: NextAuth.js with Google OAuth
- **Data Fetching**: Axios for HTTP requests
- **Environment Variables**: API_URL and API_KEY for backend communication

## Migration Status
The project is currently migrating from Vite + React to Next.js, with:
- ✅ Completed: Basic Next.js setup, routing, component migration
- 🔄 In Progress: Context migration, API integration, testing
- ❌ Pending: Cleanup of legacy files, full SSR optimization

## Technology Stack
- **Frontend**: Next.js 16, React 19, Tailwind CSS
- **Authentication**: NextAuth.js, JWT
- **UI/UX**: Framer Motion, Lucide React, React Icons
- **State Management**: React Context
- **Styling**: Tailwind CSS, PostCSS
- **Development**: ESLint, Autoprefixer

## Future Enhancements
- Complete migration to Next.js with full SSR
- Implement real-time quiz functionality
- Add user progress tracking and analytics
- Integrate with backend API for dynamic content
- Implement advanced search and filtering
- Add social features and leaderboards
