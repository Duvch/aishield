import { ArrowLeft } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { FeatureCard } from "@/components/feature-card"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function FeaturesPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-950 to-indigo-950">
      <Navbar />
      <main className="relative z-10 pt-20">
        <section className="px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8">
              <Link href="/">
                <Button variant="ghost" className="mb-4 text-gray-400 hover:text-white">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
              <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">Features</h1>
              <p className="max-w-2xl text-gray-400">
                AI Shield offers comprehensive protection for your digital identity and content across the internet.
                Explore our powerful features designed to keep your content safe.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                title="Deepfake Detection"
                description="Spot manipulated videos that misuse your identity with our advanced AI recognition technology. Our system analyzes facial movements, voice patterns, and other biometric data to identify synthetic media."
                icon="face-scan"
              />
              <FeatureCard
                title="Content Violation Detection"
                description="Find pirated content before it goes viral with our continuous monitoring system. We scan social media platforms, websites, and marketplaces to identify unauthorized use of your content."
                icon="content-scan"
              />
              <FeatureCard
                title="Automated DMCA Takedowns"
                description="Let AI take legal action, while you stay creative. Our system automatically files DMCA takedown requests when unauthorized content is detected, saving you time and legal hassle."
                icon="legal"
              />
              <FeatureCard
                title="Brand & Ad Monitoring"
                description="Track illegal use of your brand in sponsored content across all major platforms. Our system identifies unauthorized brand mentions, logo usage, and product placements in ads and sponsored content."
                icon="monitor"
              />
              <FeatureCard
                title="Real-Time Reports"
                description="Get live insights on detection, takedowns, and more through our intuitive dashboard. Our reporting system provides detailed analytics on content protection efforts and success rates."
                icon="reports"
              />
              <FeatureCard
                title="Cross-Platform Protection"
                description="Comprehensive coverage across social media, websites, marketplaces, and more. Our system monitors all major platforms where your content might be misused or stolen."
                icon="shield"
              />
              <FeatureCard
                title="AI-Powered Content Recognition"
                description="Our advanced algorithms can identify your content even when it's been modified, cropped, or embedded in other media. We use machine learning to recognize patterns unique to your content."
                icon="brain"
              />
              <FeatureCard
                title="Custom Protection Rules"
                description="Set up custom rules for what constitutes a violation based on your specific needs. You can define different levels of protection for different types of content."
                icon="settings"
              />
              <FeatureCard
                title="24/7 Monitoring"
                description="Our system never sleeps, providing round-the-clock protection for your digital assets. Get alerts any time a potential violation is detected, no matter when it happens."
                icon="clock"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

