import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import DashboardPetani from "../pages/DashboardPetani";
import DashboardBuruh from "../pages/DashboardBuruh";

export const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard-petani" element={<DashboardPetani />} />
      <Route path="/dashboard-buruh" element={<DashboardBuruh />} />
    </Routes>
  </BrowserRouter>
);
