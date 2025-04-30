import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-green-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-white text-center mb-8">Selamat Datang</h1>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="space-y-4">
            <Link to="/login" className="block w-full">
              <Button variant="outline" className="w-full">
                Masuk
              </Button>
            </Link>
            <Link to="/register/role" className="block w-full">
              <Button className="w-full bg-green-600 hover:bg-green-700">Daftar</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
