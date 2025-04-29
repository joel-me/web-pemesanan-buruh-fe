"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/textarea"
import { useToast } from "../../components/ui/use-toast"
import { API_URL } from "../../config"
import { UserType } from "../../types"

const ProfilePage: React.FC = () => {
  const { user, token, updateUserInfo } = useAuth()
  const [email, setEmail] = useState(user?.email || "")
  const [skills, setSkills] = useState<string[]>(user?.skills || [])
  const [skillsInput, setSkillsInput] = useState(user?.skills?.join(", ") || "")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const updatedData: any = { email }

      if (user?.userType === UserType.LABORER) {
        updatedData.skills = skillsInput
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean)
      }

      const response = await fetch(`${API_URL}/users/${user?.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      })

      if (!response.ok) {
        throw new Error("Failed to update profile")
      }

      const updatedUser = await response.json()
      updateUserInfo(updatedUser)

      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      })
    } catch (error) {
      console.error("Error updating profile:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update profile. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) {
    return null
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">Manage your account information</p>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your personal details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" value={user.username} disabled className="bg-gray-50" />
              <p className="text-xs text-muted-foreground">Username cannot be changed</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="userType">Account Type</Label>
              <Input
                id="userType"
                value={user.userType === UserType.FARMER ? "Farmer" : "Laborer"}
                disabled
                className="bg-gray-50"
              />
            </div>
            {user.userType === UserType.LABORER && (
              <div className="space-y-2">
                <Label htmlFor="skills">Skills (comma separated)</Label>
                <Textarea
                  id="skills"
                  placeholder="e.g. harvesting, planting, irrigation"
                  value={skillsInput}
                  onChange={(e) => setSkillsInput(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default ProfilePage
