# Migration Plan: Convert PrepPoint from React (Vite) to Next.js

## Phase 1: Project Setup and Dependencies
- [x] Update package.json: Remove Vite, add Next.js dependencies
- [x] Create next.config.js
- [x] Update postcss.config.js and tailwind.config.js for Next.js
- [x] Install dependencies

## Phase 2: File Structure Migration
- [x] Create pages/ directory for Next.js routing
- [x] Create components/ directory (rename from componets/)
- [x] Create lib/ or utils/ for contexts and services
- [x] Move assets to public/ (adjust paths)

## Phase 3: Routing Conversion
- [x] Convert AppRoutes.jsx logic to Next.js file-based routing
- [x] Create pages/index.js (Home page)
- [x] Create pages/categories.js
- [x] Create pages/mcq.js
- [ ] Create pages/login.js, pages/register.js, pages/logout.js
- [ ] Create pages/dashboard.js, pages/profile.js
- [ ] Create pages/contact.js, pages/forgot-password.js
- [ ] Create pages/terms-conditions.js, etc. (static pages)
- [x] Create _app.js for global providers (AuthProvider)
- [ ] Create _document.js if needed

## Phase 4: Component Migration
- [x] Move all components from src/componets/ to components/
- [x] Update import paths in all files
- [ ] Handle any client-side only components (use dynamic imports if needed)

## Phase 5: Context and Services Migration
- [x] Move AuthContext.jsx to lib/ or contexts/
- [ ] Move UserContext.js to lib/
- [ ] Move services to lib/
- [ ] Update imports throughout the app

## Phase 6: Styling and Assets
- [x] Move src/assets/ to public/assets/
- [x] Update asset paths in components
- [x] Ensure Tailwind CSS works with Next.js
- [x] Move src/index.css to global styles

## Phase 7: Configuration and Build
- [x] Update scripts in package.json (dev, build, start)
- [x] Configure environment variables
- [x] Test build process
- [x] Handle any SSR issues (localStorage in AuthContext)

## Phase 8: Testing and Optimization
- [x] Test all pages and navigation
- [ ] Test authentication flow
- [ ] Test search functionality
- [ ] Optimize for performance (static generation where possible)
- [ ] Handle any hydration mismatches

## Phase 9: Cleanup
- [ ] Remove old Vite files (vite.config.js, etc.)
- [ ] Remove src/ directory structure
- [ ] Update README.md with Next.js instructions
