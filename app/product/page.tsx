import { ArrowLeft } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { ProductPreview } from "@/components/product-preview"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function ProductPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-950 to-indigo-950">
      <Navbar />
      <main className="relative z-10 pt-20">
        <section className="px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16">
              <Link href="/">
                <Button variant="ghost" className="mb-4 text-gray-400 hover:text-white">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
              <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">Product</h1>
              <p className="max-w-2xl text-gray-400">
                Take a look at our powerful dashboard that puts protection in your hands. AI Shield's intuitive
                interface makes it easy to monitor and protect your content.
              </p>
            </div>

            <ProductPreview />

            <div className="mt-20 grid gap-12 md:grid-cols-2">
              <div>
                <h2 className="mb-6 text-3xl font-bold text-white">Key Dashboard Features</h2>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="mr-4 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-900">
                      <span className="text-sm font-medium text-white">1</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">Real-time Monitoring</h3>
                      <p className="text-gray-400">View all content violations as they happen with our live feed.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-4 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-900">
                      <span className="text-sm font-medium text-white">2</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">Takedown Management</h3>
                      <p className="text-gray-400">Track the status of all takedown requests in one place.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-4 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-900">
                      <span className="text-sm font-medium text-white">3</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">Analytics Dashboard</h3>
                      <p className="text-gray-400">Get insights into protection performance with detailed analytics.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-4 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-900">
                      <span className="text-sm font-medium text-white">4</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">Platform Coverage</h3>
                      <p className="text-gray-400">
                        See which platforms are being monitored and add new ones as needed.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-3xl font-bold text-white">Integration Options</h2>
                <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
                  <h3 className="mb-4 text-xl font-medium text-white">API Access</h3>
                  <p className="mb-4 text-gray-400">
                    Integrate AI Shield directly into your existing workflows with our comprehensive API. Access all
                    features programmatically and receive alerts through your preferred channels.
                  </p>
                  <div className="rounded bg-gray-800 p-4">
                    <code className="text-sm text-gray-300">
                      <pre>{`// Example API call to check content status
const response = await fetch('https://api.aicover.ai/content/check', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    contentUrl: 'https://example.com/my-content',
    contentType: 'image'
  })
});`}</pre>
                    </code>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-500 hover:to-violet-500"
                >
                  Request a Demo
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

