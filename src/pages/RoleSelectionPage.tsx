"use client"

import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"

export default function RoleSelectionPage() {
  const navigate = useNavigate()

  const handleRoleSelect = (role: string) => {
    navigate(`/register/${role}`)
  }

  return (
    <div className="min-h-screen bg-green-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-white text-center mb-8">Pilih Peran Anda</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="cursor-pointer hover:shadow-xl transition-shadow" onClick={() => handleRoleSelect("farmer")}>
            <CardHeader className="pb-2">
              <CardTitle className="text-center">Petani</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center mb-4">
                <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-600"
                  >
                    <path d="M3 11a7.5 7.5 0 0 0 15 0m0 0a7.5 7.5 0 0 0-15 0" />
                    <path d="M9 11V8a3 3 0 0 1 6 0v3" />
                  </svg>
                </div>
              </div>
              <p className="text-center text-sm text-muted-foreground">
                Daftar sebagai petani untuk mengelola lahan dan hasil panen Anda
              </p>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-xl transition-shadow"
            onClick={() => handleRoleSelect("laborer")}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-center">Buruh</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center mb-4">
                <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-600"
                  >
                    <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path d="M10 9V6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3" />
                    <path d="M13.8 15.917A7.5 7.5 0 0 0 20 10c0-4.142-3.582-7.5-8-7.5s-8 3.358-8 7.5c0 2.76 1.592 5.18 4 6.592" />
                  </svg>
                </div>
              </div>
              <p className="text-center text-sm text-muted-foreground">
                Daftar sebagai buruh untuk menawarkan keterampilan dan layanan Anda
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
