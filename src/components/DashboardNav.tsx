"use client"

import type React from "react"

import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { cn } from "../lib/utils"
import { UserType } from "../types"
import { LayoutDashboard } from "./icons/LayoutDashboard"
import { Users } from "./icons/Users"
import { ClipboardList } from "./icons/ClipboardList"
import { User } from "./icons/User"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
  userTypes?: UserType[]
}

const DashboardNav: React.FC = () => {
  const location = useLocation()
  const { user } = useAuth()

  const navItems: NavItem[] = [
    {
      title: "Overview",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Laborers",
      href: "/dashboard/laborers",
      icon: <Users className="h-5 w-5" />,
      userTypes: [UserType.FARMER],
    },
    {
      title: "Orders",
      href: "/dashboard/orders",
      icon: <ClipboardList className="h-5 w-5" />,
    },
    {
      title: "Profile",
      href: "/dashboard/profile",
      icon: <User className="h-5 w-5" />,
    },
  ]

  const filteredNavItems = navItems.filter(
    (item) => !item.userTypes || item.userTypes.includes(user?.userType as UserType),
  )

  return (
    <nav className="grid items-start px-4 py-6 gap-2">
      {filteredNavItems.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary",
            location.pathname === item.href ? "bg-green-50 text-green-700 font-medium" : "text-muted-foreground",
          )}
        >
          {item.icon}
          {item.title}
        </Link>
      ))}
    </nav>
  )
}

export default DashboardNav
