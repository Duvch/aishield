"use client"

import Link from "next/link"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Bot,
  Calendar,
  Clock,
  Download,
  Info,
  Layers,
  RefreshCw,
  Zap,
  Shield,
  CheckCircle,
  BellRing,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"

// Mock data for AI Bot
const botSettings = {
  enabled: true,
  schedule: "daily",
  time: "02:00",
  platforms: ["youtube", "instagram", "tiktok"],
  scanFocus: ["deepfakes", "copyright"],
  autoTakedown: true,
  lastRun: "2025-04-06 02:00",
  nextRun: "2025-04-07 02:00",
}

const botHistory = [
  {
    id: 1,
    date: "2025-04-06 02:00",
    platforms: ["YouTube", "Instagram", "TikTok"],
    resultsFound: 3,
    takedownsFiled: 3,
    status: "Completed",
  },
  {
    id: 2,
    date: "2025-04-05 02:00",
    platforms: ["YouTube", "Instagram", "TikTok"],
    resultsFound: 1,
    takedownsFiled: 1,
    status: "Completed",
  },
  {
    id: 3,
    date: "2025-04-04 02:00",
    platforms: ["YouTube", "Instagram", "TikTok"],
    resultsFound: 0,
    takedownsFiled: 0,
    status: "Completed",
  },
  {
    id: 4,
    date: "2025-04-03 02:00",
    platforms: ["YouTube", "Instagram", "TikTok"],
    resultsFound: 2,
    takedownsFiled: 2,
    status: "Completed",
  },
  {
    id: 5,
    date: "2025-04-02 02:00",
    platforms: ["YouTube", "Instagram", "TikTok"],
    resultsFound: 2,
    takedownsFiled: 2,
    status: "Completed",
  },
]

export default function AIBotPage() {
  const [settings, setSettings] = useState(botSettings)
  const [isRunning, setIsRunning] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [activeFeatureTab, setActiveFeatureTab] = useState("overview")

  const handleToggleBot = () => {
    if (!settings.enabled) {
      setShowConfirmDialog(true)
    } else {
      setSettings({ ...settings, enabled: false })
      toast({
        title: "AI Bot Disabled",
        description: "The AI Bot has been disabled and will no longer run automatically.",
      })
    }
  }

  const handleEnableBot = () => {
    setSettings({ ...settings, enabled: true })
    setShowConfirmDialog(false)
    toast({
      title: "AI Bot Enabled",
      description: "The AI Bot has been enabled and will run according to your schedule.",
    })
  }

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your AI Bot settings have been updated.",
    })
  }

  const handleRunNow = () => {
    setIsRunning(true)

    // Simulate bot running
    setTimeout(() => {
      setIsRunning(false)
      toast({
        title: "AI Bot Scan Complete",
        description: "The AI Bot has completed its scan. Found 2 matches and filed takedown requests.",
      })
    }, 3000)
  }

  const togglePlatform = (platform: string) => {
    setSettings((prev) => {
      if (prev.platforms.includes(platform)) {
        return { ...prev, platforms: prev.platforms.filter((p) => p !== platform) }
      } else {
        return { ...prev, platforms: [...prev.platforms, platform] }
      }
    })
  }

  const toggleScanFocus = (focus: string) => {
    setSettings((prev) => {
      if (prev.scanFocus.includes(focus)) {
        return { ...prev, scanFocus: prev.scanFocus.filter((f) => f !== focus) }
      } else {
        return { ...prev, scanFocus: [...prev.scanFocus, focus] }
      }
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Bot Settings</h1>
          <p className="text-muted-foreground">Configure your automated content protection bot</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Switch id="bot-status" checked={settings.enabled} onCheckedChange={handleToggleBot} />
            <Label htmlFor="bot-status" className="text-sm font-medium">
              {settings.enabled ? "Enabled" : "Disabled"}
            </Label>
          </div>
          <Button onClick={handleRunNow} disabled={isRunning}>
            {isRunning ? (
              <>
                <motion.div
                  className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />
                Running...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Run Now
              </>
            )}
          </Button>
        </div>
      </div>

      {/* AI Bot Features Overview */}
      <Card>
        <CardHeader>
          <CardTitle>AI Bot Features</CardTitle>
          <CardDescription>Explore the powerful capabilities of your AI Bot</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeFeatureTab} onValueChange={setActiveFeatureTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="scanning">Scanning</TabsTrigger>
              <TabsTrigger value="takedowns">Takedowns</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="relative overflow-hidden rounded-lg border p-6">
                  <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/10"></div>
                  <div className="relative">
                    <div className="rounded-full bg-primary/10 p-2 w-fit">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="mt-4 text-lg font-medium">Automated Scanning</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Schedule daily, weekly, or monthly scans across all major platforms
                    </p>
                  </div>
                  <img
                    src="/placeholder.svg?height=120&width=280"
                    alt="Automated Scanning"
                    className="mt-4 rounded-md w-full h-32 object-cover"
                  />
                </div>

                <div className="relative overflow-hidden rounded-lg border p-6">
                  <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/10"></div>
                  <div className="relative">
                    <div className="rounded-full bg-primary/10 p-2 w-fit">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="mt-4 text-lg font-medium">Auto-Takedowns</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Automatically file DMCA takedown requests for detected content
                    </p>
                  </div>
                  <img
                    src="/placeholder.svg?height=120&width=280"
                    alt="Auto-Takedowns"
                    className="mt-4 rounded-md w-full h-32 object-cover"
                  />
                </div>

                <div className="relative overflow-hidden rounded-lg border p-6">
                  <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/10"></div>
                  <div className="relative">
                    <div className="rounded-full bg-primary/10 p-2 w-fit">
                      <BellRing className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="mt-4 text-lg font-medium">Real-time Alerts</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Get notified immediately when matches are found or actions are taken
                    </p>
                  </div>
                  <img
                    src="/placeholder.svg?height=120&width=280"
                    alt="Real-time Alerts"
                    className="mt-4 rounded-md w-full h-32 object-cover"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="scanning" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-medium">Intelligent Scanning</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    The AI Bot uses advanced machine learning algorithms to detect unauthorized use of your content
                    across platforms.
                  </p>

                  <div className="mt-6 space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-primary/10 p-1.5">
                        <CheckCircle className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Multi-Platform Coverage</h4>
                        <p className="text-sm text-muted-foreground">
                          Scans YouTube, Instagram, TikTok, Facebook, and more in a single pass
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-primary/10 p-1.5">
                        <CheckCircle className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Content Recognition</h4>
                        <p className="text-sm text-muted-foreground">
                          Identifies deepfakes, copyright infringement, and brand misuse
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-primary/10 p-1.5">
                        <CheckCircle className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Scheduled Automation</h4>
                        <p className="text-sm text-muted-foreground">
                          Set it and forget it - the bot handles everything automatically
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative rounded-lg overflow-hidden border">
                  <img
                    src="/placeholder.svg?height=300&width=500"
                    alt="AI Bot Scanning"
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center gap-2 text-white">
                      <Bot className="h-5 w-5" />
                      <span className="font-medium">AI-powered scanning in action</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="takedowns" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="relative rounded-lg overflow-hidden border">
                  <img
                    src="/placeholder.svg?height=300&width=500"
                    alt="Auto Takedowns"
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center gap-2 text-white">
                      <Shield className="h-5 w-5" />
                      <span className="font-medium">Automated DMCA filing</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium">Automated Takedowns</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    The AI Bot can automatically file DMCA takedown requests when it detects unauthorized use of your
                    content.
                  </p>

                  <div className="mt-6 space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-primary/10 p-1.5">
                        <CheckCircle className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Confidence Threshold</h4>
                        <p className="text-sm text-muted-foreground">
                          Only files takedowns for matches above your set confidence level
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-primary/10 p-1.5">
                        <CheckCircle className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Complete Documentation</h4>
                        <p className="text-sm text-muted-foreground">
                          Generates all required evidence and paperwork for DMCA filings
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-primary/10 p-1.5">
                        <CheckCircle className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Status Tracking</h4>
                        <p className="text-sm text-muted-foreground">Monitors the progress of each takedown request</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Bot Status */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-6 md:flex-row">
            <div className="flex flex-1 items-center gap-4 rounded-lg border p-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-medium">Last Run</h3>
                <p className="text-2xl font-bold">{settings.lastRun}</p>
              </div>
            </div>
            <div className="flex flex-1 items-center gap-4 rounded-lg border p-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-medium">Next Scheduled Run</h3>
                <p className="text-2xl font-bold">{settings.nextRun}</p>
              </div>
            </div>
            <div className="flex flex-1 items-center gap-4 rounded-lg border p-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Layers className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-medium">Total Scans</h3>
                <p className="text-2xl font-bold">{botHistory.length}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Bot Configuration */}
        <Card className="md:row-span-2">
          <CardHeader>
            <CardTitle>Bot Configuration</CardTitle>
            <CardDescription>Customize how your AI Bot scans and protects your content</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Schedule */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Schedule</h3>
              <RadioGroup
                value={settings.schedule}
                onValueChange={(value) => setSettings({ ...settings, schedule: value })}
                className="grid grid-cols-3 gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="daily" id="daily" />
                  <Label htmlFor="daily">Daily</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="weekly" id="weekly" />
                  <Label htmlFor="weekly">Weekly</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="monthly" id="monthly" />
                  <Label htmlFor="monthly">Monthly</Label>
                </div>
              </RadioGroup>
              <div className="flex items-center gap-4">
                <div className="w-full">
                  <Label htmlFor="time" className="text-xs">
                    Run Time (UTC)
                  </Label>
                  <Input
                    id="time"
                    type="time"
                    value={settings.time}
                    onChange={(e) => setSettings({ ...settings, time: e.target.value })}
                    className="mt-1"
                  />
                </div>
                {settings.schedule === "weekly" && (
                  <div className="w-full">
                    <Label htmlFor="day" className="text-xs">
                      Day of Week
                    </Label>
                    <Select defaultValue="monday">
                      <SelectTrigger id="day" className="mt-1">
                        <SelectValue placeholder="Select day" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monday">Monday</SelectItem>
                        <SelectItem value="tuesday">Tuesday</SelectItem>
                        <SelectItem value="wednesday">Wednesday</SelectItem>
                        <SelectItem value="thursday">Thursday</SelectItem>
                        <SelectItem value="friday">Friday</SelectItem>
                        <SelectItem value="saturday">Saturday</SelectItem>
                        <SelectItem value="sunday">Sunday</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                {settings.schedule === "monthly" && (
                  <div className="w-full">
                    <Label htmlFor="date" className="text-xs">
                      Day of Month
                    </Label>
                    <Select defaultValue="1">
                      <SelectTrigger id="date" className="mt-1">
                        <SelectValue placeholder="Select date" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 31 }, (_, i) => (
                          <SelectItem key={i + 1} value={(i + 1).toString()}>
                            {i + 1}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* Platforms */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Platforms to Scan</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="youtube"
                    checked={settings.platforms.includes("youtube")}
                    onCheckedChange={() => togglePlatform("youtube")}
                  />
                  <Label htmlFor="youtube">YouTube</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="instagram"
                    checked={settings.platforms.includes("instagram")}
                    onCheckedChange={() => togglePlatform("instagram")}
                  />
                  <Label htmlFor="instagram">Instagram</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="facebook"
                    checked={settings.platforms.includes("facebook")}
                    onCheckedChange={() => togglePlatform("facebook")}
                  />
                  <Label htmlFor="facebook">Facebook</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="tiktok"
                    checked={settings.platforms.includes("tiktok")}
                    onCheckedChange={() => togglePlatform("tiktok")}
                  />
                  <Label htmlFor="tiktok">TikTok</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="twitter"
                    checked={settings.platforms.includes("twitter")}
                    onCheckedChange={() => togglePlatform("twitter")}
                  />
                  <Label htmlFor="twitter">Twitter</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="reddit"
                    checked={settings.platforms.includes("reddit")}
                    onCheckedChange={() => togglePlatform("reddit")}
                  />
                  <Label htmlFor="reddit">Reddit</Label>
                </div>
              </div>
            </div>

            <Separator />

            {/* Scan Focus */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Scan Focus</h3>
              <div className="grid gap-3">
                <div className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
                  <Checkbox
                    id="deepfakes"
                    checked={settings.scanFocus.includes("deepfakes")}
                    onCheckedChange={() => toggleScanFocus("deepfakes")}
                  />
                  <div className="space-y-1 leading-none">
                    <Label htmlFor="deepfakes" className="cursor-pointer font-medium">
                      Search for Deepfakes
                    </Label>
                    <p className="text-xs text-muted-foreground">Find AI-generated content using your likeness</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
                  <Checkbox
                    id="copyright"
                    checked={settings.scanFocus.includes("copyright")}
                    onCheckedChange={() => toggleScanFocus("copyright")}
                  />
                  <div className="space-y-1 leading-none">
                    <Label htmlFor="copyright" className="cursor-pointer font-medium">
                      Detect Copyrighted Videos
                    </Label>
                    <p className="text-xs text-muted-foreground">Find unauthorized use of your videos or content</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
                  <Checkbox
                    id="brand-usage"
                    checked={settings.scanFocus.includes("brand-usage")}
                    onCheckedChange={() => toggleScanFocus("brand-usage")}
                  />
                  <div className="space-y-1 leading-none">
                    <Label htmlFor="brand-usage" className="cursor-pointer font-medium">
                      Find Brand/Face in Ads
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Detect unauthorized use of your brand or likeness in advertisements
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Auto-Takedown */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h3 className="text-sm font-medium">Auto-Takedown</h3>
                  <p className="text-xs text-muted-foreground">
                    Automatically file DMCA takedown requests for detected content
                  </p>
                </div>
                <Switch
                  checked={settings.autoTakedown}
                  onCheckedChange={(checked) => setSettings({ ...settings, autoTakedown: checked })}
                />
              </div>
              {settings.autoTakedown && (
                <div className="rounded-lg bg-yellow-50 p-4 dark:bg-yellow-950">
                  <div className="flex items-start">
                    <Info className="mr-2 h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                    <div>
                      <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
                        Auto-Takedown Enabled
                      </h4>
                      <p className="mt-1 text-xs text-yellow-700 dark:text-yellow-400">
                        The AI Bot will automatically file DMCA takedown requests for content with a confidence score
                        above 85%. You can review these in the Takedown Requests section.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveSettings} className="w-full">
              Save Settings
            </Button>
          </CardFooter>
        </Card>

        {/* Bot History */}
        <Card>
          <CardHeader>
            <CardTitle>Bot History</CardTitle>
            <CardDescription>Recent automated scans and their results</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Results</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Takedowns</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {botHistory.map((run) => (
                    <tr key={run.id} className="border-b">
                      <td className="px-4 py-3 text-sm">{run.date}</td>
                      <td className="px-4 py-3 text-sm">{run.resultsFound}</td>
                      <td className="px-4 py-3 text-sm">{run.takedownsFiled}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                          {run.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {run.resultsFound > 0 && (
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/dashboard/scan-results?botRun=${run.id}`}>View Results</Link>
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
          <CardFooter className="border-t p-4">
            <Button variant="outline" asChild className="w-full">
              <a href="#" download>
                <Download className="mr-2 h-4 w-4" />
                Export History
              </a>
            </Button>
          </CardFooter>
        </Card>

        {/* Bot Analytics */}
        <Card>
          <CardHeader>
            <CardTitle>Bot Analytics</CardTitle>
            <CardDescription>Performance metrics for your AI Bot</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border p-4 text-center">
                <h3 className="text-sm font-medium text-muted-foreground">Total Scans</h3>
                <p className="mt-2 text-3xl font-bold">{botHistory.length}</p>
              </div>
              <div className="rounded-lg border p-4 text-center">
                <h3 className="text-sm font-medium text-muted-foreground">Content Found</h3>
                <p className="mt-2 text-3xl font-bold">
                  {botHistory.reduce((total, run) => total + run.resultsFound, 0)}
                </p>
              </div>
              <div className="rounded-lg border p-4 text-center">
                <h3 className="text-sm font-medium text-muted-foreground">Takedowns Filed</h3>
                <p className="mt-2 text-3xl font-bold">
                  {botHistory.reduce((total, run) => total + run.takedownsFiled, 0)}
                </p>
              </div>
              <div className="rounded-lg border p-4 text-center">
                <h3 className="text-sm font-medium text-muted-foreground">Success Rate</h3>
                <p className="mt-2 text-3xl font-bold">100%</p>
              </div>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <div className="flex items-start">
                <Bot className="mr-3 h-5 w-5 text-primary" />
                <div>
                  <h4 className="text-sm font-medium">AI Bot Efficiency</h4>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Your AI Bot has saved you approximately 8 hours of manual scanning time this month.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enable Bot Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enable AI Bot</DialogTitle>
            <DialogDescription>
              The AI Bot will automatically scan platforms for your content and can file takedown requests on your
              behalf.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="rounded-lg bg-primary/10 p-4">
              <div className="flex items-start">
                <Zap className="mr-2 h-5 w-5 text-primary" />
                <div>
                  <h4 className="text-sm font-medium">Pro Feature</h4>
                  <p className="mt-1 text-xs text-muted-foreground">
                    The AI Bot is a Pro feature that helps you automate content protection.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">The AI Bot will:</h4>
              <ul className="ml-6 list-disc text-sm">
                <li>Scan platforms according to your schedule</li>
                <li>Detect unauthorized use of your content</li>
                <li>File takedown requests automatically (if enabled)</li>
                <li>Notify you of all actions taken</li>
              </ul>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleEnableBot}>Enable AI Bot</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

