"use client"

import type React from "react"

import { Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "./context/AuthContext"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import DashboardLayout from "./layouts/DashboardLayout"
import DashboardPage from "./pages/dashboard/DashboardPage"
import LaborersPage from "./pages/dashboard/LaborersPage"
import OrdersPage from "./pages/dashboard/OrdersPage"
import ProfilePage from "./pages/dashboard/ProfilePage"
import { UserType } from "./types"

const App: React.FC = () => {
  const { user } = useAuth()

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/dashboard" />} />
      <Route path="/register" element={!user ? <RegisterPage /> : <Navigate to="/dashboard" />} />

      {/* Protected Routes */}
      <Route path="/dashboard" element={user ? <DashboardLayout /> : <Navigate to="/login" />}>
        <Route index element={<DashboardPage />} />
        <Route
          path="laborers"
          element={user?.userType === UserType.FARMER ? <LaborersPage /> : <Navigate to="/dashboard" />}
        />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  )
}

export default App
