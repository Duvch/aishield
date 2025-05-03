"use client"

import type React from "react"
import { useState, useEffect, Suspense } from "react"
import { ArrowLeft, Shield } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { loginUser, registerUser } from "@/lib/auth-client"

// Create a client component that uses searchParams
function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  
  // Get return URL from the URL safely on the client side
  const [returnTo, setReturnTo] = useState('/dashboard')
  
  useEffect(() => {
    // Safely get the searchParams on the client side
    const params = new URLSearchParams(window.location.search)
    const returnParam = params.get('returnTo')
    if (returnParam) {
      setReturnTo(returnParam)
    }
    console.log("Login page mounted, returnTo:", returnParam || '/dashboard')
  }, [])
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    confirmPassword: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      console.log("Attempting login for:", formData.email)
      const success = await loginUser(formData.email, formData.password)
      
      if (success) {
        toast({
          title: "Login successful",
          description: "Redirecting to dashboard..."
        })
        
        // Force navigation
        console.log("Login successful, redirecting to:", returnTo)
        
        // Force a hard navigation to ensure cookies are properly processed
        window.location.href = returnTo;
      } else {
        toast({
          title: "Login failed",
          description: "Please check your credentials and try again",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error("Login error:", error)
      toast({
        title: "An error occurred",
        description: error instanceof Error ? error.message : "Failed to login",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match",
        variant: "destructive"
      })
      setIsLoading(false)
      return
    }
    
    try {
      const success = await registerUser({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName
      })
      
      if (success) {
        toast({
          title: "Account created successfully",
          description: "Logging you in..."
        })
        
        // Automatically log in the user after successful registration
        const loginSuccess = await loginUser(formData.email, formData.password)
        
        if (loginSuccess) {
          toast({
            title: "Login successful",
            description: "Redirecting to dashboard..."
          })
          
          // Force navigation to dashboard
          window.location.href = returnTo;
        } else {
          toast({
            title: "Auto-login failed",
            description: "Please log in with your new credentials",
            variant: "destructive"
          })
          // Switch to login tab
          document.getElementById("login-tab")?.click()
        }
      } else {
        toast({
          title: "Registration failed",
          description: "Email might already be in use",
          variant: "destructive"
        })
      }
    } catch (error) {
      toast({
        title: "An error occurred",
        description: error instanceof Error ? error.message : "Failed to create account",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-gray-950 to-indigo-950">
      <div className="container flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <Link href="/" className="inline-flex items-center justify-center">
              <Shield className="h-10 w-10 text-indigo-500" />
              <span className="ml-2 text-2xl font-bold text-white">AI Shield</span>
            </Link>
            <h1 className="mt-6 text-3xl font-bold text-white">Welcome Back</h1>
            <p className="mt-2 text-gray-400">Sign in to your account to continue</p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gray-900/50">
              <TabsTrigger id="login-tab" value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                    className="border-gray-700 bg-gray-800/50 text-white placeholder:text-gray-500"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link href="/auth/forgot-password" className="text-xs text-indigo-400 hover:text-indigo-300">
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    className="border-gray-700 bg-gray-800/50 text-white placeholder:text-gray-500"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      required
                      className="border-gray-700 bg-gray-800/50 text-white placeholder:text-gray-500"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      required
                      className="border-gray-700 bg-gray-800/50 text-white placeholder:text-gray-500"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                    className="border-gray-700 bg-gray-800/50 text-white placeholder:text-gray-500"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    className="border-gray-700 bg-gray-800/50 text-white placeholder:text-gray-500"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    required
                    className="border-gray-700 bg-gray-800/50 text-white placeholder:text-gray-500"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
                <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700" disabled={isLoading}>
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="text-center">
            <Link href="/" className="text-sm text-gray-400 hover:text-white">
              <ArrowLeft className="mr-2 inline-block h-4 w-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

// Main component with Suspense boundary
export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-950 to-indigo-950">
        <div className="text-center text-white">
          <p>Loading...</p>
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}