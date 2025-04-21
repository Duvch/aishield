
"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { Bell, Bot, CreditCard, FileSearch, HelpCircle, Home, LogOut, Menu, Search, Shield, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

// Mock user data
const user = {
  name: "John Doe",
  email: "john@example.com",
  avatar: "/placeholder.svg?height=40&width=40",
  plan: "Pro",
}

// Navigation items
const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Request Scan", href: "/dashboard/request-scan", icon: Search },
  { name: "Scan Results", href: "/dashboard/scan-results", icon: FileSearch },
  { name: "Takedown Requests", href: "/dashboard/takedown-requests", icon: Shield },
  { name: "My Plan", href: "/dashboard/my-plan", icon: CreditCard },
  { name: "AI Bot Settings", href: "/dashboard/ai-bot", icon: Bot, proPlan: true },
  { name: "Contact Support", href: "/dashboard/support", icon: HelpCircle },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      {/* Mobile Header */}
      <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-background px-4 md:hidden">
        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="mr-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0">
            {/* Mobile Sidebar Header */}
            <div className="flex h-16 items-center border-b px-6">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 font-bold"
                onClick={() => setIsSidebarOpen(false)}
              >
                <Shield className="h-6 w-6 text-primary" />
                <span className="text-lg">AI Shield</span>
              </Link>
              <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setIsSidebarOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            {/* Mobile Sidebar User */}
            <div className="border-b px-6 py-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border-2 border-primary/10">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-primary/10 text-primary">{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium">{user.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{user.email}</span>
                    <Badge variant="outline" className="border-primary/30 text-xs bg-primary/5 text-primary font-normal">
                      {user.plan}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Mobile Navigation */}
            <nav className="flex-1 overflow-auto py-4">
              <div className="px-3 mb-2">
                <h3 className="px-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Main Navigation
                </h3>
              </div>
              <div className="grid gap-1 px-3">
                {navItems.map((item) => {
                  // Skip AI Bot Settings if not on Pro plan
                  if (item.proPlan && user.plan !== "Pro") return null

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsSidebarOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
                        pathname === item.href 
                          ? "bg-primary text-primary-foreground" 
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.name}
                      {item.name === "Scan Results" && (
                        <Badge className="ml-auto py-0.5 px-1.5">3</Badge>
                      )}
                    </Link>
                  )
                })}
              </div>
            </nav>
            
            {/* Mobile Sidebar Footer */}
            <div className="border-t p-4">
              <Link
                href="/auth/logout"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-muted/80 px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Link>
            </div>
          </SheetContent>
        </Sheet>
        <Link href="/dashboard" className="flex items-center gap-2 font-bold">
          <Shield className="h-5 w-5" />
          <span>AI Shield</span>
        </Link>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-primary"></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Scan request approved</DropdownMenuItem>
              <DropdownMenuItem>Takedown request successful</DropdownMenuItem>
              <DropdownMenuItem>AI Bot completed daily scan</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar>
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/auth/logout">Logout</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        <aside className="hidden w-72 flex-col border-r md:flex bg-muted/5">
          {/* Sidebar Header */}
          <div className="flex h-16 items-center border-b px-6">
            <Link href="/dashboard" className="flex items-center gap-2 font-bold">
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-lg">AI Shield</span>
            </Link>
          </div>
          
         
          
          {/* Navigation */}
          <nav className="flex-1 overflow-auto py-4">
            <div className="px-3 mb-2">
              <h3 className="px-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Main Navigation
              </h3>
            </div>
            <div className="grid gap-1 px-3">
              {navItems.map((item) => {
                // Skip AI Bot Settings if not on Pro plan
                if (item.proPlan && user.plan !== "Pro") return null

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
                      pathname === item.href 
                        ? "bg-primary text-primary-foreground" 
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                    {item.name === "Scan Results" && (
                      <Badge className="ml-auto py-0.5 px-1.5">3</Badge>
                    )}
                  </Link>
                )
              })}
            </div>
          </nav>
           {/* User Profile Section */}
           <div className="border-b px-6 py-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border-2 border-primary/10">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-primary/10 text-primary">{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-medium">{user.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{user.email}</span>
                  <Badge variant="outline" className="border-primary/30 text-xs bg-primary/5 text-primary font-normal">
                    {user.plan}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
          
          
          {/* Sidebar Footer */}
          <div className="border-t p-4">
            <Link
              href="/auth/logout"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-muted/80 px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Link>
          </div>
        </aside>
        
        {/* Main content */}
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="container max-w-7xl py-6"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>

        
      </div>
    </div>
  )
}