"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Tractor } from "../components/icons/Tractor"
import { useToast } from "../components/ui/use-toast"
import { API_URL } from "../config"

const RegisterPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("farmer")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [skills, setSkills] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { toast } = useToast()

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const type = searchParams.get("type")
    if (type === "farmer" || type === "laborer") {
      setActiveTab(type)
    }
  }, [location.search])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const endpoint = activeTab === "farmer" ? `${API_URL}/auth/register/farmer` : `${API_URL}/auth/register/laborer`

      const payload =
        activeTab === "farmer"
          ? { username, email, password }
          : { username, email, password, skills: skills.split(",").map((skill) => skill.trim()) }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Registration failed")
      }

      toast({
        title: "Registration Successful",
        description: "Your account has been created. Please login.",
      })

      navigate("/login")
    } catch (error) {
      console.error("Registration failed:", error)
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="mb-6 flex items-center justify-center gap-2">
          <Tractor className="h-8 w-8 text-green-600" />
          <span className="text-2xl font-bold">FarmLabor</span>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Create an Account</CardTitle>
            <CardDescription>Register to start using our platform</CardDescription>
          </CardHeader>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="farmer">Farmer</TabsTrigger>
              <TabsTrigger value="laborer">Laborer</TabsTrigger>
            </TabsList>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4 pt-6">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    placeholder="Choose a username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {activeTab === "laborer" && (
                  <div className="space-y-2">
                    <Label htmlFor="skills">Skills (comma separated)</Label>
                    <Input
                      id="skills"
                      placeholder="e.g. harvesting, planting, irrigation"
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                    />
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
                  {isLoading ? "Registering..." : "Register"}
                </Button>
                <div className="text-center text-sm">
                  Already have an account?{" "}
                  <Link to="/login" className="text-green-600 hover:underline">
                    Login
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Tabs>
        </Card>
      </div>
    </div>
  )
}

export default RegisterPage
