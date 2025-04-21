import { ArrowLeft } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { HowItWorks } from "@/components/how-it-works"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function HowItWorksPage() {
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
              <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">How It Works</h1>
              <p className="max-w-2xl text-gray-400">
                Our advanced AI-powered system works around the clock to protect your digital assets. Learn about our
                streamlined process for keeping your content safe.
              </p>
            </div>

            <HowItWorks />

            <div className="mt-20">
              <h2 className="mb-6 text-3xl font-bold text-white">Frequently Asked Questions</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
                  <h3 className="mb-3 text-xl font-medium text-white">How quickly can you detect violations?</h3>
                  <p className="text-gray-400">
                    Our system typically detects violations within minutes of content being posted online. For
                    high-priority accounts, we offer real-time monitoring with instant alerts.
                  </p>
                </div>
                <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
                  <h3 className="mb-3 text-xl font-medium text-white">What platforms do you monitor?</h3>
                  <p className="text-gray-400">
                    We monitor all major social media platforms, video sharing sites, marketplaces, and millions of
                    websites. Our coverage includes YouTube, Instagram, TikTok, Twitter, Facebook, and many more.
                  </p>
                </div>
                <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
                  <h3 className="mb-3 text-xl font-medium text-white">How accurate is your deepfake detection?</h3>
                  <p className="text-gray-400">
                    Our deepfake detection has a 98.7% accuracy rate based on our latest testing. We continuously train
                    our AI models to recognize even the most sophisticated deepfakes.
                  </p>
                </div>
                <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
                  <h3 className="mb-3 text-xl font-medium text-white">How long does the takedown process take?</h3>
                  <p className="text-gray-400">
                    Once a violation is detected, our automated system files takedown requests immediately. The actual
                    removal depends on the platform, but typically happens within 24-72 hours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

