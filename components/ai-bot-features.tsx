"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Bot, CheckCircle, Clock, BellRing, Shield, Zap, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function AIBotFeatures() {
  const [activeTab, setActiveTab] = useState("scanning")

  const features = {
    scanning: {
      title: "Automated Scanning",
      description: "The AI Bot continuously monitors platforms for unauthorized use of your content",
      image: "/placeholder.svg?height=300&width=500",
      benefits: [
        "Daily scans across all major platforms",
        "No manual approval needed",
        "Detects deepfakes, copyright infringement, and brand misuse",
        "Saves hours of manual searching",
      ],
    },
    takedowns: {
      title: "Auto-Takedowns",
      description: "Automatically file DMCA takedown requests when unauthorized content is detected",
      image: "/placeholder.svg?height=300&width=500",
      benefits: [
        "Instant DMCA filing for high-confidence matches",
        "Customizable confidence threshold",
        "Complete documentation and tracking",
        "Higher success rate than manual filing",
      ],
    },
    alerts: {
      title: "Real-time Alerts",
      description: "Get notified immediately when the AI Bot finds matches or takes action",
      image: "/placeholder.svg?height=300&width=500",
      benefits: [
        "Email and in-app notifications",
        "Detailed match information",
        "Actionable next steps",
        "Weekly summary reports",
      ],
    },
  }

  return (
    <Card className="overflow-hidden">
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold">AI Bot Protection</h2>
        </div>
        <p className="mt-2 text-muted-foreground">
          Upgrade to Pro for automated content protection across all platforms
        </p>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="scanning">Scanning</TabsTrigger>
            <TabsTrigger value="takedowns">Takedowns</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>

          {Object.entries(features).map(([key, feature]) => (
            <TabsContent key={key} value={key} className="mt-4 space-y-4">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-medium">{feature.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{feature.description}</p>

                  <ul className="mt-4 space-y-2">
                    {feature.benefits.map((benefit, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-2"
                      >
                        <CheckCircle className="mt-0.5 h-4 w-4 text-primary" />
                        <span className="text-sm">{benefit}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="relative rounded-lg overflow-hidden">
                  <img
                    src={feature.image || "/placeholder.svg"}
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center gap-2 text-white">
                      {key === "scanning" && <Clock className="h-5 w-5" />}
                      {key === "takedowns" && <Shield className="h-5 w-5" />}
                      {key === "alerts" && <BellRing className="h-5 w-5" />}
                      <span className="font-medium">Pro Feature</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button asChild className="gap-2">
            <Link href="/dashboard/my-plan">
              <Zap className="h-4 w-4" />
              Upgrade to Pro
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard/ai-bot">
              Learn More
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  )
}

