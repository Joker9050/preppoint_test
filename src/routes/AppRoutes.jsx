import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Logout from "../pages/Auth/Logout";
import Category from "../pages/Category"
import { useAuth } from "../pages/Auth/AuthContext";
import Mcq from "../pages/Mcq";
import Dashboard from "../pages/User/Dashboard";

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
