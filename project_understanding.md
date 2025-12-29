# Project Understanding: PrepPoint

## Overview
PrepPoint is a Next.js-based learning platform focused on Multiple Choice Questions (MCQs) for educational preparation. The application provides an interactive interface for users to practice MCQs across various topics, particularly in JavaScript programming.

## Technology Stack
- **Framework**: Next.js 16.1.1 (using App Router)
- **Frontend**: React 19.2.3 with TypeScript
- **Styling**: Tailwind CSS 3.4.17
- **Authentication**: NextAuth 4.24.13 with Google OAuth (@react-oauth/google)
- **Icons**: Lucide React, React Icons
- **Animations**: Framer Motion
- **HTTP Client**: Axios
- **Utilities**: Lodash, JWT Decode
- **UI Components**: React Toastify, React Loading Skeleton, React World Flags

## Project Structure

### Root Level Configuration
- `package.json`: Defines dependencies, scripts (dev, build, start, lint), and project metadata
- `next.config.js`: Next.js configuration
- `tailwind.config.js`: Tailwind CSS configuration
- `tsconfig.json`: TypeScript configuration
- `eslint.config.js`: ESLint configuration
- `postcss.config.js`: PostCSS configuration
- `README.md`: Basic project description ("frontend of prep_point")

### App Directory (Next.js App Router)
- `app/layout.tsx`: Root layout with AuthProvider, Navbar, and Footer
- `app/mcq/page.tsx`: Main MCQ practice page combining Sidebar, MCQContent, and Pagination components

### Components
- **components/**: Reusable UI components
  - `Navbar.jsx`, `Footer.jsx`: Site navigation and footer
  - `FeaturesSection.jsx`, `FeedbackSection.jsx`, etc.: Landing page components
- **components/helper/**: Helper components
  - `AuthButton.jsx`: Authentication button
  - `LanguageSelector.jsx`, `CategoryDropdown.jsx`: Selection components
  - `Logo.jsx`, `MobileMenu.jsx`, `NavLinks.jsx`, `SearchBar.jsx`: Navigation helpers
- **components/mcq/**: MCQ-specific components
  - `MCQContent.tsx`: Displays MCQs with options, code snippets, and explanations
  - `Sidebar.tsx`: Topic/subtopic navigation
  - `Pagination.tsx`: Question navigation

### Data Layer
- `data/topics.ts`: Defines Topic and Subtopic types, contains topic hierarchy (e.g., JavaScript Introduction, Variables with subtopics var/let/const, Arrays)
- `data/mcqs.ts`: Defines MCQ type, contains sample MCQs with questions, options, correct answers, explanations, and optional code snippets

### Authentication & Context
- `lib/AuthContext.js`: Authentication context provider
- `pages/api/auth/[...nextauth].js`: NextAuth API route

### Legacy Structure
The project contains legacy directories that appear to be from an older setup:
- `pages/`: Old Next.js Pages Router structure with various pages (index, login, register, dashboard, etc.)
- `src/`: Separate React application structure with components, pages, routes, services, and contexts

### Public Assets
- `public/`: Static assets (logo.png, vite.svg)

### Styles
- `styles/globals.css`: Global CSS styles

## Key Features
1. **MCQ Practice**: Interactive MCQ interface with explanations
2. **Topic Organization**: Hierarchical topics with subtopics
3. **Authentication**: User login/registration with Google OAuth
4. **Responsive Design**: Mobile-friendly UI with Tailwind CSS
5. **Code Display**: Support for code snippets in MCQs
6. **Pagination**: Navigate through questions
7. **Sidebar Navigation**: Topic and subtopic selection

## Data Models
- **MCQ**: id, topicId, subtopicId?, question, code?, options (A/B/C/D), correct answer, explanation
- **Topic**: id, title, subtopics?
- **Subtopic**: id, title

## Current State
The application is in development with sample data for JavaScript topics. It has both modern App Router implementation and legacy Pages Router code, suggesting an ongoing migration or hybrid setup.

## Potential Issues
- Duplicate structures (app/ vs pages/, components/ vs src/components/)
- Mixed routing approaches (App Router vs Pages Router)
- Incomplete authentication flow implementation
