"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { useToast } from "../../components/ui/use-toast"
import { API_URL } from "../../config"
import { UserType, OrderStatus } from "../../types"
import { CheckCircle } from "../../components/icons/CheckCircle"
import { XCircle } from "../../components/icons/XCircle"
import { Clock } from "../../components/icons/Clock"
import { AlertCircle } from "../../components/icons/AlertCircle"

interface Order {
  id: number
  description: string
  status: OrderStatus
  farmer?: {
    id: number
    username: string
    email: string
  }
  laborer?: {
    id: number
    username: string
    email: string
  }
}

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [updatingOrderId, setUpdatingOrderId] = useState<number | null>(null)
  const { user, token } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    if (!user || !token) return

    const fetchOrders = async () => {
      try {
        const endpoint =
          user.userType === UserType.FARMER ? `${API_URL}/orders/my-placed-orders` : `${API_URL}/orders/my-orders`

        const response = await fetch(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error("Failed to fetch orders")
        }

        const data = await response.json()
        setOrders(data)
      } catch (error) {
        console.error("Error fetching orders:", error)
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load orders. Please try again.",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrders()
  }, [user, token, toast])

  const handleUpdateStatus = async (orderId: number, newStatus: OrderStatus) => {
    if (user?.userType !== UserType.LABORER) return

    setUpdatingOrderId(orderId)

    try {
      const response = await fetch(`${API_URL}/orders/${orderId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update order status")
      }

      const updatedOrder = await response.json()

      setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))

      toast({
        title: "Status Updated",
        description: `Order status has been updated to ${newStatus}`,
      })
    } catch (error) {
      console.error("Error updating order status:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update order status. Please try again.",
      })
    } finally {
      setUpdatingOrderId(null)
    }
  }

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.COMPLETED:
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case OrderStatus.CANCELLED:
        return <XCircle className="h-5 w-5 text-red-500" />
      case OrderStatus.ACCEPTED:
        return <Clock className="h-5 w-5 text-blue-500" />
      case OrderStatus.PENDING:
      default:
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-green-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading orders...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {user?.userType === UserType.FARMER ? "My Placed Orders" : "My Assigned Orders"}
        </h1>
        <p className="text-muted-foreground">
          {user?.userType === UserType.FARMER
            ? "Manage the orders you've placed with laborers"
            : "View and update the status of orders assigned to you"}
        </p>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>Order #{order.id}</CardTitle>
                <div className="flex items-center gap-2">
                  {getStatusIcon(order.status)}
                  <span className="text-sm font-medium">{order.status}</span>
                </div>
              </div>
              <CardDescription>
                {user?.userType === UserType.FARMER
                  ? `Assigned to: ${order.laborer?.username}`
                  : `Requested by: ${order.farmer?.username}`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2">Job Description:</h4>
                <p className="text-sm text-gray-600">{order.description}</p>
              </div>

              {user?.userType === UserType.LABORER && order.status === OrderStatus.PENDING && (
                <div className="flex gap-2">
                  <Button
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => handleUpdateStatus(order.id, OrderStatus.ACCEPTED)}
                    disabled={updatingOrderId === order.id}
                  >
                    Accept Order
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleUpdateStatus(order.id, OrderStatus.CANCELLED)}
                    disabled={updatingOrderId === order.id}
                  >
                    Decline
                  </Button>
                </div>
              )}

              {user?.userType === UserType.LABORER && order.status === OrderStatus.ACCEPTED && (
                <Button
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => handleUpdateStatus(order.id, OrderStatus.COMPLETED)}
                  disabled={updatingOrderId === order.id}
                >
                  Mark as Completed
                </Button>
              )}
            </CardContent>
          </Card>
        ))}

        {orders.length === 0 && (
          <div className="flex h-40 items-center justify-center rounded-lg border border-dashed">
            <div className="text-center">
              <p className="text-muted-foreground">
                {user?.userType === UserType.FARMER
                  ? "You haven't placed any orders yet"
                  : "You don't have any assigned orders yet"}
              </p>
              {user?.userType === UserType.FARMER && (
                <Button
                  className="mt-4 bg-green-600 hover:bg-green-700"
                  onClick={() => (window.location.href = "/dashboard/laborers")}
                >
                  Find Laborers
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default OrdersPage
