"use client"

import type React from "react"

import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import DashboardNav from "../components/DashboardNav"
import UserNav from "../components/UserNav"
import { Tractor } from "../components/icons/Tractor"

const DashboardLayout: React.FC = () => {
  const { user, isLoading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login")
    }
  }, [user, isLoading, navigate])

  if (isLoading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-green-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Tractor className="h-6 w-6 text-green-600" />
            <span className="text-xl font-bold">FarmLabor</span>
          </div>
          <UserNav />
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r bg-gray-50 md:block">
          <div className="flex h-full flex-col">
            <DashboardNav />
          </div>
        </aside>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
