"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Shield } from "lucide-react"
import { logoutUser } from "@/lib/auth-client"

export default function LogoutPage() {
  const router = useRouter()
  
  useEffect(() => {
    async function performLogout() {
      await logoutUser()
      router.push("/login")
    }
    
    performLogout()
  }, [router])
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-950 to-indigo-950">
      <div className="flex flex-col items-center space-y-4 text-center">
        <Shield className="h-12 w-12 text-indigo-500 animate-pulse" />
        <h1 className="text-2xl font-bold text-white">Logging out...</h1>
        <p className="text-gray-400">Please wait while we log you out securely.</p>
      </div>
    </div>
  )
}