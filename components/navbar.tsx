"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Shield, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "bg-gray-950/80 backdrop-blur-lg" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-indigo-500" />
          <span className="text-xl font-bold text-white">AI Cover</span>
        </Link>

        <nav className="hidden md:flex md:items-center md:space-x-6">
          <Link
            href="/features"
            className={cn(
              "text-sm transition-colors",
              isActive("/features") ? "text-white" : "text-gray-300 hover:text-white",
            )}
          >
            Features
          </Link>
          <Link
            href="/how-it-works"
            className={cn(
              "text-sm transition-colors",
              isActive("/how-it-works") ? "text-white" : "text-gray-300 hover:text-white",
            )}
          >
            How It Works
          </Link>
          <Link
            href="/product"
            className={cn(
              "text-sm transition-colors",
              isActive("/product") ? "text-white" : "text-gray-300 hover:text-white",
            )}
          >
            Product
          </Link>
          <Link
            href="/pricing"
            className={cn(
              "text-sm transition-colors",
              isActive("/pricing") ? "text-white" : "text-gray-300 hover:text-white",
            )}
          >
            Pricing
          </Link>
          <Link
            href="/contact"
            className={cn(
              "text-sm transition-colors",
              isActive("/contact") ? "text-white" : "text-gray-300 hover:text-white",
            )}
          >
            Contact
          </Link>
        </nav>

        <div className="hidden md:block">
          
        </div>

        <button className="block md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-gray-950/95 backdrop-blur-sm md:hidden">
          <nav className="flex flex-col p-4">
            <Link
              href="/features"
              className={cn(
                "border-b border-gray-800 py-4 text-lg",
                isActive("/features") ? "text-white" : "text-gray-300",
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="/how-it-works"
              className={cn(
                "border-b border-gray-800 py-4 text-lg",
                isActive("/how-it-works") ? "text-white" : "text-gray-300",
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              href="/product"
              className={cn(
                "border-b border-gray-800 py-4 text-lg",
                isActive("/product") ? "text-white" : "text-gray-300",
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Product
            </Link>
            <Link
              href="/pricing"
              className={cn(
                "border-b border-gray-800 py-4 text-lg",
                isActive("/pricing") ? "text-white" : "text-gray-300",
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="/contact"
              className={cn(
                "border-b border-gray-800 py-4 text-lg",
                isActive("/contact") ? "text-white" : "text-gray-300",
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="mt-4">
              
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

