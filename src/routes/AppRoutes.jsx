import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Logout from "../pages/Auth/Logout";
import Category from "../pages/Category"
import { useAuth } from "../pages/Auth/AuthContext";
import Mcq from "../pages/Mcq";
import Dashboard from "../pages/User/Dashboard";
import Profile from "../pages/User/Profile";
import Contact from "../pages/Contact";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import StaticPage from "../pages/StaticPage";

export default function AppRoutes() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/categories" element={<Category/>} />
        <Route path="/mcq" element={<Mcq/>} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Static pages */}
        <Route path="/terms-conditions" element={<StaticPage />} />
        <Route path="/privacy-policy" element={<StaticPage />} />
        <Route path="/cookie-policy" element={<StaticPage />} />
        <Route path="/terms-of-service" element={<StaticPage />} />
        <Route path="/legal/:slug" element={<StaticPage />} />

        {/* <Route
          path="/"
          element={
            user ? <Home /> : <Navigate to="/login" />
          }
        /> */}
      </Routes>
    </BrowserRouter>
  );
}
