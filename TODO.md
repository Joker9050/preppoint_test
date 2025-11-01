# TODO: Make Frontend Static by Removing Backend Dependencies

## Step 1: Delete Backend-Related Files and Directories
- [x] Delete `public/` directory (entire backend API and admin files)
- [x] Delete `vendor/` directory (Composer dependencies)
- [x] Delete `composer.json` and `composer.lock`
- [x] Delete `mcq_page.html` and `mcq.html` (static HTML files)
- [x] Delete `backup.txt` (if backend-related)

## Step 2: Modify Frontend Files to Remove Dynamic Elements
- [x] Update `frontend_current/src/pages/Auth/Register.jsx`: Remove Axios imports, API calls, and replace with static UI or mock logic
- [ ] Update `frontend_current/src/pages/Auth/ForgotPassword.jsx`: Remove Axios imports, API calls, and replace with static UI or mock logic
- [ ] Update `frontend_current/src/pages/Auth/AuthContext.jsx`: Make auth static (no backend calls, use local state only)
- [ ] Update `frontend_current/src/routes/AppRoutes.jsx`: Remove or comment out backend-dependent routes if needed
- [ ] Update `frontend_current/src/services/authService.js` and `courseService.js`: Remove API calls or replace with mock data
- [ ] Check and update other pages/components (e.g., Login, Register, Dashboard) to remove API dependencies
- [ ] Remove Axios from `package.json` if no longer needed (or keep for future)

## Step 3: Update Components for Static Data
- [ ] Ensure pages like Home, Category, Mcq use static content or mock data
- [ ] Update any components fetching data to use hardcoded values

## Step 4: Test Static Frontend
- [ ] Run `npm run dev` in `frontend_current/`
- [ ] Check all pages load without errors
- [ ] Verify no console errors related to missing APIs
- [ ] Test navigation and UI interactions

## Step 5: Final Cleanup
- [ ] Ensure no references to deleted files remain in code
- [ ] Update README or notes if needed
