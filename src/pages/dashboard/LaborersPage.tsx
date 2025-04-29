"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/textarea"
import { useToast } from "../../components/ui/use-toast"
import { API_URL } from "../../config"
import { UserType } from "../../types"
import { User } from "../../components/icons/User"

interface Laborer {
  id: number
  username: string
  email: string
  skills: string[]
}

const LaborersPage: React.FC = () => {
  const [laborers, setLaborers] = useState<Laborer[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedLaborer, setSelectedLaborer] = useState<Laborer | null>(null)
  const [orderDescription, setOrderDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { user, token } = useAuth()
  const { toast } = useToast()
  const [dialogOpen, setDialogOpen] = useState(false)

  useEffect(() => {
    if (user?.userType !== UserType.FARMER) {
      return
    }

    const fetchLaborers = async () => {
      try {
        const response = await fetch(`${API_URL}/users/laborers`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error("Failed to fetch laborers")
        }

        const data = await response.json()
        setLaborers(data)
      } catch (error) {
        console.error("Error fetching laborers:", error)
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load laborers. Please try again.",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchLaborers()
  }, [user, token, toast])

  const handleCreateOrder = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedLaborer) return

    setIsSubmitting(true)

    try {
      const response = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          laborerId: selectedLaborer.id,
          description: orderDescription,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create order")
      }

      toast({
        title: "Order Created",
        description: `Your order has been sent to ${selectedLaborer.username}`,
      })

      setOrderDescription("")
      setDialogOpen(false)
    } catch (error) {
      console.error("Error creating order:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create order. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (user?.userType !== UserType.FARMER) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Access Denied</h1>
          <p className="text-muted-foreground">This page is only available to farmers.</p>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-green-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading laborers...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Available Laborers</h1>
        <p className="text-muted-foreground">Browse and hire skilled agricultural laborers for your farm</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {laborers.map((laborer) => (
          <Card key={laborer.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <User className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <CardTitle>{laborer.username}</CardTitle>
                  <CardDescription className="truncate">{laborer.email}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-6">
              <div className="mb-4">
                <h4 className="text-sm font-medium">Skills:</h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {laborer.skills && laborer.skills.length > 0 ? (
                    laborer.skills.map((skill, index) => (
                      <span key={index} className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-800">
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-gray-500">No skills listed</span>
                  )}
                </div>
              </div>
              <Dialog
                open={dialogOpen && selectedLaborer?.id === laborer.id}
                onOpenChange={(open) => {
                  setDialogOpen(open)
                  if (!open) setSelectedLaborer(null)
                }}
              >
                <DialogTrigger asChild>
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={() => setSelectedLaborer(laborer)}
                  >
                    Hire Laborer
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <form onSubmit={handleCreateOrder}>
                    <DialogHeader>
                      <DialogTitle>Create Order</DialogTitle>
                      <DialogDescription>Create a new work order for {selectedLaborer?.username}</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="description">Job Description</Label>
                        <Textarea
                          id="description"
                          placeholder="Describe the work you need done..."
                          value={orderDescription}
                          onChange={(e) => setOrderDescription(e.target.value)}
                          required
                          className="min-h-[120px]"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={isSubmitting}>
                        {isSubmitting ? "Creating..." : "Create Order"}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}

        {laborers.length === 0 && (
          <div className="col-span-full flex h-40 items-center justify-center rounded-lg border border-dashed">
            <div className="text-center">
              <p className="text-muted-foreground">No laborers available at the moment</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default LaborersPage
