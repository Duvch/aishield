import { ArrowRight, ChevronRight } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { ParticleBackground } from "@/components/particle-background"
import { FeatureCard } from "@/components/feature-card"
import { PricingCard } from "@/components/pricing-card"
import { ProductPreview } from "@/components/product-preview"
import { HowItWorks } from "@/components/how-it-works"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AnimatedHeading } from "@/components/animated-heading"

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-950 to-indigo-950">
      <ParticleBackground />
      <Navbar />
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="relative overflow-hidden px-4 py-20 md:py-32">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-12 md:grid-cols-2 md:gap-8">
              <div className="flex flex-col justify-center space-y-6">
                <AnimatedHeading />
                <p className="max-w-md text-lg text-gray-300">
                  AI Shield scans the internet to detect deepfakes, copyright violations, and unauthorized uses of your
                  content across social media, ads, and websites.
                </p>
                <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <Link href="/contact">
                    <Button
                      size="lg"
                      className="group bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-500 hover:to-violet-500"
                    >
                      Contact Now
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Link href="/features">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-indigo-500/30 bg-indigo-950/30 text-indigo-200 backdrop-blur-sm hover:bg-indigo-900/40"
                    >
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative flex items-center justify-center">
                <div className="relative h-[350px] w-full max-w-md overflow-hidden rounded-xl bg-gradient-to-br from-indigo-900/40 to-violet-900/40 p-1 backdrop-blur-sm">
                  <div className="absolute inset-0 rounded-xl border border-indigo-500/20" />
                  <div className="h-full w-full rounded-lg bg-gray-900/80 p-4">
                    <div className="flex h-full flex-col">
                      <div className="mb-4 flex items-center space-x-2">
                        <div className="h-3 w-3 rounded-full bg-red-500" />
                        <div className="h-3 w-3 rounded-full bg-yellow-500" />
                        <div className="h-3 w-3 rounded-full bg-green-500" />
                        <div className="ml-4 text-xs font-medium text-gray-400">AI Shield Control Center</div>
                      </div>
                      <div className="flex-1 space-y-4 overflow-hidden rounded-md bg-gray-950/70 p-4">
                        <div className="h-6 w-2/3 rounded bg-indigo-900/40" />
                        <div className="space-y-2">
                          <div className="h-4 w-full rounded bg-gray-800" />
                          <div className="h-4 w-5/6 rounded bg-gray-800" />
                          <div className="h-4 w-4/6 rounded bg-gray-800" />
                        </div>
                        <div className="mt-6 grid grid-cols-2 gap-3">
                          <div className="h-20 rounded-md bg-indigo-900/30 p-2">
                            <div className="h-3 w-1/2 rounded bg-indigo-700/50" />
                            <div className="mt-2 h-10 rounded-sm bg-indigo-600/20" />
                          </div>
                          <div className="h-20 rounded-md bg-violet-900/30 p-2">
                            <div className="h-3 w-1/2 rounded bg-violet-700/50" />
                            <div className="mt-2 h-10 rounded-sm bg-violet-600/20" />
                          </div>
                          <div className="h-20 rounded-md bg-blue-900/30 p-2">
                            <div className="h-3 w-1/2 rounded bg-blue-700/50" />
                            <div className="mt-2 h-10 rounded-sm bg-blue-600/20" />
                          </div>
                          <div className="h-20 rounded-md bg-emerald-900/30 p-2">
                            <div className="h-3 w-1/2 rounded bg-emerald-700/50" />
                            <div className="mt-2 h-10 rounded-sm bg-emerald-600/20" />
                          </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                          <div className="h-8 w-24 rounded-md bg-indigo-600/50" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-indigo-600/30 blur-3xl" />
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-violet-600/30 blur-3xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                What AI Shield Can Do for You
              </h2>
              <p className="mx-auto max-w-2xl text-gray-400">
                Comprehensive protection for your digital identity and content across the internet
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                title="Deepfake Detection"
                description="Spot manipulated videos that misuse your identity with our advanced AI recognition technology."
                icon="face-scan"
              />
              <FeatureCard
                title="Content Violation Detection"
                description="Find pirated content before it goes viral with our continuous monitoring system."
                icon="content-scan"
              />
              <FeatureCard
                title="Automated DMCA Takedowns"
                description="Let AI take legal action, while you stay creative. Automated filing and tracking of takedown requests."
                icon="legal"
              />
              <FeatureCard
                title="Brand & Ad Monitoring"
                description="Track illegal use of your brand in sponsored content across all major platforms."
                icon="monitor"
              />
              <FeatureCard
                title="Real-Time Reports"
                description="Get live insights on detection, takedowns, and more through our intuitive dashboard."
                icon="reports"
              />
              <FeatureCard
                title="Cross-Platform Protection"
                description="Comprehensive coverage across social media, websites, marketplaces, and more."
                icon="shield"
              />
            </div>
            <div className="mt-12 text-center">
              <Link href="/features">
                <Button
                  variant="outline"
                  className="border-indigo-500/30 bg-indigo-950/30 text-indigo-200 backdrop-blur-sm hover:bg-indigo-900/40"
                >
                  View All Features
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="px-4 py-20 bg-gradient-to-b from-indigo-950/50 to-gray-950">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">How It Works</h2>
              <p className="mx-auto max-w-2xl text-gray-400">
                Our advanced AI-powered system works around the clock to protect your digital assets
              </p>
            </div>
            <HowItWorks />
            <div className="mt-12 text-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-500 hover:to-violet-500"
                >
                  Contact Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Product Preview Section */}
        <section id="product" className="px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">Product Preview</h2>
              <p className="mx-auto max-w-2xl text-gray-400">
                Take a look at our powerful dashboard that puts protection in your hands
              </p>
            </div>
            <ProductPreview />
            <div className="mt-12 text-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-500 hover:to-violet-500"
                >
                  Contact Now to See a Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="px-4 py-20 bg-gradient-to-b from-gray-950 to-indigo-950/70">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Transparent Pricing That Scales with You
              </h2>
              <p className="mx-auto max-w-2xl text-gray-400">
                Choose the plan that fits your needs and grow with us. Contact us for detailed pricing information.
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
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="px-4 py-20">
          <div className="mx-auto max-w-4xl">
            <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-900 to-violet-900">
              <div className="relative px-6 py-16 sm:px-12 sm:py-20">
                <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-indigo-600/30 blur-3xl" />
                <div className="absolute -bottom-10 -left-10 h-64 w-64 rounded-full bg-violet-600/30 blur-3xl" />
                <div className="relative z-10 text-center">
                  <h2 className="mb-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    Ready to protect your digital identity?
                  </h2>
                  <p className="mx-auto mb-8 max-w-2xl text-lg text-indigo-100">
                    Get started today and let AI Shield guard your content across the internet.
                  </p>
                  <Link href="/contact">
                    <Button size="lg" className="bg-white text-indigo-900 hover:bg-gray-100">
                      Contact Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Floating Contact Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Link href="/contact">
          <Button
            size="lg"
            className="rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 p-4 text-white shadow-lg hover:from-indigo-500 hover:to-violet-500"
          >
            <span className="sr-only">Contact Now</span>
            <ChevronRight className="h-6 w-6" />
          </Button>
        </Link>
      </div>
    </div>
  )
}

