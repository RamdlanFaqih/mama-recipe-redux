import React from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Outlet,
  Navigate,
} from "react-router-dom";
import Home from "../views/Home/index";
import Login from "../views/Login/index";
import AddRecipe from "../views/AddRecipe";
import Register from "../views/Register";
import DetailRecipe from "../views/DetailRecipe";
import Profile from "../views/Profile";
import DetailVideo from "../views/DetailVideo";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="addRecipe" element={<PrivateRoute><AddRecipe /></PrivateRoute>} />
        <Route path="detailRecipe" element={<PrivateRoute><DetailRecipe /></PrivateRoute>} />
        <Route path="Profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="DetailVideo" element={<PrivateRoute><DetailVideo /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
