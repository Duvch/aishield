import Link from "next/link"
import { Shield, Twitter, Facebook, Instagram, Linkedin, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-gray-800 bg-gray-950 px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-indigo-500" />
              <span className="text-lg font-bold text-white">AI Shield</span>
            </div>
            <p className="mt-4 text-sm text-gray-400">
              Built to Protect What You Create. AI Shield offers comprehensive protection for your digital identity and
              content.
            </p>
            <div className="mt-6 flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-indigo-400">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-indigo-400">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-indigo-400">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-indigo-400">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/features" className="text-sm text-gray-300 hover:text-indigo-400">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-sm text-gray-300 hover:text-indigo-400">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/product" className="text-sm text-gray-300 hover:text-indigo-400">
                  Product
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm text-gray-300 hover:text-indigo-400">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-300 hover:text-indigo-400">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="text-sm text-gray-300 hover:text-indigo-400">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-gray-300 hover:text-indigo-400">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="text-sm text-gray-300 hover:text-indigo-400">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/dmca-policy" className="text-sm text-gray-300 hover:text-indigo-400">
                  DMCA Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-indigo-400" />
                <span className="text-sm text-gray-300">contact@aishield.ai</span>
              </li>
            </ul>
            <div className="mt-6 rounded-lg border border-gray-800 bg-gray-900/50 p-4">
              <h4 className="mb-2 text-sm font-medium text-white">Subscribe to our newsletter</h4>
              <form className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 rounded-md border border-gray-800 bg-gray-800/50 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8 text-center">
          <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} AI Shield. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

