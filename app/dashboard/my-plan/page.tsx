"use client"

import { useState } from "react"
import { Check, CreditCard, Shield, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"

// Mock data for plan information
const planUsage = {
  scans: {
    used: 14,
    total: 50,
    percentage: 28,
  },
  takedowns: {
    used: 5,
    total: 20,
    percentage: 25,
  },
  aiBot: {
    enabled: true,
    lastRun: "2025-04-06",
    scansCompleted: 8,
  },
}

const plans = [
  {
    id: "demo",
    name: "Demo",
    price: "Free",
    description: "Try AI Shield with limited features",
    features: ["5 scans per month", "2 takedown requests", "Basic platforms only", "Email support"],
    limitations: ["No AI Bot automation", "Limited scan types", "No priority scanning"],
  },
  {
    id: "premium",
    name: "Premium",
    price: "$19.99",
    description: "For individuals protecting their content",
    features: [
      "20 scans per month",
      "10 takedown requests",
      "All platforms supported",
      "Priority scanning",
      "Priority support",
    ],
    limitations: ["No AI Bot automation"],
  },
  {
    id: "pro",
    name: "Pro",
    price: "$49.99",
    description: "For creators who need comprehensive protection",
    features: [
      "50 scans per month",
      "20 takedown requests",
      "All platforms supported",
      "Priority scanning",
      "AI Bot automation",
      "Auto-takedown filing",
      "24/7 priority support",
    ],
    limitations: [],
    current: true,
  },
]

export default function MyPlanPage() {
  const [billingCycle, setBillingCycle] = useState("monthly")
  const [selectedPlan, setSelectedPlan] = useState("pro")

  const handleUpgrade = () => {
    toast({
      title: "Plan Upgraded",
      description: "Your plan has been successfully upgraded.",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Plan</h1>
        <p className="text-muted-foreground">Manage your subscription and usage</p>
      </div>

      {/* Current Usage */}
      <Card>
        <CardHeader>
          <CardTitle>Current Usage</CardTitle>
          <CardDescription>Your Pro plan renews on May 7, 2025</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span>Scans Used</span>
              <span className="font-medium">
                {planUsage.scans.used} / {planUsage.scans.total}
              </span>
            </div>
            <Progress value={planUsage.scans.percentage} />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span>Takedown Requests</span>
              <span className="font-medium">
                {planUsage.takedowns.used} / {planUsage.takedowns.total}
              </span>
            </div>
            <Progress value={planUsage.takedowns.percentage} />
          </div>
          {planUsage.aiBot.enabled && (
            <div className="rounded-lg bg-muted p-4">
              <div className="flex items-start">
                <Zap className="mr-3 h-5 w-5 text-primary" />
                <div>
                  <h4 className="text-sm font-medium">AI Bot Status</h4>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Last run: {planUsage.aiBot.lastRun} • {planUsage.aiBot.scansCompleted} scans completed
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Plans */}
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <h2 className="text-xl font-bold">Available Plans</h2>
          <Tabs defaultValue="monthly" onValueChange={setBillingCycle} className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="yearly">
                Yearly
                <span className="ml-1.5 rounded-full bg-primary px-2 py-0.5 text-[10px] text-primary-foreground">
                  Save 20%
                </span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative overflow-hidden ${plan.current ? "border-primary shadow-md" : ""}`}
            >
              {plan.current && (
                <div className="absolute right-0 top-0 rounded-bl-lg bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                  Current Plan
                </div>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-1">
                  <span className="text-2xl font-bold">{plan.price}</span>
                  {billingCycle === "monthly" ? (
                    <span className="text-sm text-muted-foreground"> /month</span>
                  ) : (
                    <span className="text-sm text-muted-foreground"> /year</span>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="mb-2 text-sm font-medium">Features</h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="mr-2 h-4 w-4 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {plan.limitations.length > 0 && (
                  <div>
                    <h4 className="mb-2 text-sm font-medium text-muted-foreground">Limitations</h4>
                    <ul className="space-y-2">
                      {plan.limitations.map((limitation, index) => (
                        <li key={index} className="flex items-start text-muted-foreground">
                          <span className="mr-2 text-sm">•</span>
                          <span className="text-sm">{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                {plan.current ? (
                  <Button className="w-full" variant="outline" disabled>
                    Current Plan
                  </Button>
                ) : (
                  <Button
                    className="w-full"
                    onClick={() => {
                      setSelectedPlan(plan.id)
                      handleUpgrade()
                    }}
                  >
                    {plan.id === "demo" ? "Downgrade" : "Upgrade"}
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Payment Information */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Information</CardTitle>
          <CardDescription>Manage your payment method</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-muted p-2">
                  <CreditCard className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">Visa ending in 4242</p>
                  <p className="text-xs text-muted-foreground">Expires 12/2026</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                Edit
              </Button>
            </div>
          </div>
          <div className="rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Billing Address</p>
                <p className="text-xs text-muted-foreground">123 Main St, San Francisco, CA 94105</p>
              </div>
              <Button variant="ghost" size="sm">
                Edit
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="rounded-lg bg-muted p-4 text-sm">
            <div className="flex items-start">
              <Shield className="mr-2 h-5 w-5 text-muted-foreground" />
              <div>
                <p>
                  Your next billing date is <strong>May 7, 2025</strong>
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  You can cancel or change your plan at any time before the next billing date.
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="flex-1">
              Cancel Subscription
            </Button>
            <Button variant="outline" className="flex-1">
              Billing History
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

