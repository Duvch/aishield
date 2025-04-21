import { ArrowLeft } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { PricingCard } from "@/components/pricing-card"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function PricingPage() {
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
              <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">Pricing</h1>
              <p className="max-w-2xl text-gray-400">
                Choose the plan that fits your needs and grow with us. Contact us for detailed pricing information
                tailored to your specific requirements.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <PricingCard
                title="Starter"
                price="₹599"
                description="Perfect for individual creators and small brands"
                features={[
                  "Basic deepfake detection",
                  "Content monitoring on 3 platforms",
                  "5 DMCA takedowns per month",
                  "Weekly reports",
                  "Email support",
                ]}
                cta="Contact for Details"
                contactForDetails={true}
              />
              <PricingCard
                title="Enterprise"
                price="Custom"
                description="Ideal for established creators and growing brands"
                features={[
                  "Advanced deepfake detection",
                  "Content monitoring on 10 platforms",
                  "25 DMCA takedowns per month",
                  "Daily reports",
                  "Priority email & chat support",
                  "Brand monitoring",
                ]}
                featured={true}
                cta="Contact for Details"
                contactForDetails={true}
              />
              <PricingCard
                title="Enterprise"
                price="Custom"
                description="Comprehensive protection for large brands and celebrities"
                features={[
                  "Premium deepfake detection",
                  "Unlimited platform monitoring",
                  "Unlimited DMCA takedowns",
                  "Real-time alerts",
                  "24/7 dedicated support",
                  "Advanced brand & ad monitoring",
                  "Custom API integration",
                ]}
                cta="Contact for Details"
                contactForDetails={true}
              />
            </div>

            <div className="mt-16 rounded-lg border border-gray-800 bg-gray-900/50 p-8">
              <h2 className="mb-4 text-2xl font-bold text-white">Frequently Asked Questions</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="mb-2 text-lg font-medium text-white">Can I upgrade my plan later?</h3>
                  <p className="text-gray-400">
                    Yes, you can upgrade your plan at any time. We'll prorate the difference and apply it to your new
                    plan.
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-medium text-white">Do you offer discounts for annual billing?</h3>
                  <p className="text-gray-400">
                    Yes, we offer a 20% discount for annual billing on all plans. Contact us for details.
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-medium text-white">What happens if I exceed my takedown limit?</h3>
                  <p className="text-gray-400">
                    Additional takedowns are billed at a per-request rate. Contact us for specific pricing details.
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-medium text-white">
                    Can I get a custom plan for my specific needs?
                  </h3>
                  <p className="text-gray-400">
                    Contact us to discuss your requirements, and we'll create a custom plan for you.
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

