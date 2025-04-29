"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { UserType } from "../../types"
import { CalendarCheck } from "../../components/icons/CalendarCheck"
import { Users } from "../../components/icons/Users"
import { ClipboardList } from "../../components/icons/ClipboardList"

const DashboardPage: React.FC = () => {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
  })

  useEffect(() => {
    // In a real app, you would fetch these stats from your API
    // This is just a placeholder
    setStats({
      totalOrders: user?.userType === UserType.FARMER ? 12 : 8,
      pendingOrders: user?.userType === UserType.FARMER ? 5 : 3,
      completedOrders: user?.userType === UserType.FARMER ? 7 : 5,
    })
  }, [user])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.username}! Here&apos;s an overview of your activity.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
            <p className="text-xs text-muted-foreground">
              {user?.userType === UserType.FARMER ? "Orders you've placed" : "Orders assigned to you"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingOrders}</div>
            <p className="text-xs text-muted-foreground">Orders awaiting action</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Orders</CardTitle>
            <CalendarCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedOrders}</div>
            <p className="text-xs text-muted-foreground">Successfully completed orders</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your recent orders and updates</CardDescription>
        </CardHeader>
        <CardContent>
          {user?.userType === UserType.FARMER ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <p className="font-medium">Rice Harvesting</p>
                  <p className="text-sm text-muted-foreground">Assigned to: John Doe</p>
                </div>
                <div className="rounded-full bg-yellow-100 px-3 py-1 text-xs text-yellow-800">Pending</div>
              </div>
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <p className="font-medium">Irrigation System Setup</p>
                  <p className="text-sm text-muted-foreground">Assigned to: Jane Smith</p>
                </div>
                <div className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-800">Completed</div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Crop Planting</p>
                  <p className="text-sm text-muted-foreground">Assigned to: Mike Johnson</p>
                </div>
                <div className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-800">In Progress</div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <p className="font-medium">Corn Harvesting</p>
                  <p className="text-sm text-muted-foreground">Requested by: Farmer Bob</p>
                </div>
                <div className="rounded-full bg-yellow-100 px-3 py-1 text-xs text-yellow-800">Pending</div>
              </div>
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <p className="font-medium">Vegetable Planting</p>
                  <p className="text-sm text-muted-foreground">Requested by: Farmer Alice</p>
                </div>
                <div className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-800">Completed</div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Pest Control</p>
                  <p className="text-sm text-muted-foreground">Requested by: Farmer Charlie</p>
                </div>
                <div className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-800">In Progress</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default DashboardPage
