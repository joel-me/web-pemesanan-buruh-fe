import type React from "react"
import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Tractor } from "../components/icons/Tractor"
import { ChevronRight } from "../components/icons/ChevronRight"
import { Users } from "../components/icons/Users"
import { Calendar } from "../components/icons/Calendar"

const HomePage: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Tractor className="h-6 w-6 text-green-600" />
            <span className="text-xl font-bold">FarmLabor</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/register">
              <Button>Register</Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Connecting Farmers with Skilled Agricultural Laborers
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl">
                    Our platform makes it easy to find and hire skilled agricultural workers for your farm or offer your
                    services as a laborer.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link to="/register?type=farmer">
                    <Button size="lg" className="bg-green-600 hover:bg-green-700">
                      Register as Farmer
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/register?type=laborer">
                    <Button size="lg" variant="outline">
                      Register as Laborer
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="mx-auto lg:mx-0 rounded-xl overflow-hidden">
                <img
                  alt="Farm workers"
                  className="aspect-video overflow-hidden rounded-xl object-cover"
                  src="/placeholder.svg?height=600&width=800"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform simplifies the process of connecting farmers with skilled agricultural laborers.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Create an Account</h3>
                  <p className="text-gray-500">
                    Register as a farmer looking for help or as a laborer offering your skills.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <Calendar className="h-8 w-8 text-green-600" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Create or Accept Orders</h3>
                  <p className="text-gray-500">
                    Farmers can create job orders, and laborers can accept work that matches their skills.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <Tractor className="h-8 w-8 text-green-600" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Complete Agricultural Work</h3>
                  <p className="text-gray-500">
                    Track progress, complete jobs, and build your reputation in the agricultural community.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6">
        <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
          <p className="text-center text-sm text-gray-500 md:text-left">© 2023 FarmLabor. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/terms" className="text-sm text-gray-500 hover:underline">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-sm text-gray-500 hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage
