"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Clock, Upload, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"

export default function RequestScanPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [contentType, setContentType] = useState("image")
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  const [scanPurposes, setScanPurposes] = useState<string[]>([])

  const handleScanPurposeChange = (purpose: string) => {
    setScanPurposes((prev) => {
      if (prev.includes(purpose)) {
        return prev.filter((p) => p !== purpose)
      } else {
        return [...prev, purpose]
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Scan Request Submitted",
      description: "Your scan request has been sent to the admin for approval.",
    })

    setIsSubmitting(false)
    router.push("/dashboard")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Start a New Scan</h1>
        <p className="text-muted-foreground">Request a scan to find your content across platforms</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Content Information</CardTitle>
            <CardDescription>Provide details about the content you want to scan for</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Content Type Selection */}
            <div className="space-y-4">
              <Label>Content Type</Label>
              <Tabs defaultValue="image" onValueChange={setContentType} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="image">Image</TabsTrigger>
                  <TabsTrigger value="video">Video Link</TabsTrigger>
                  <TabsTrigger value="keywords">Keywords</TabsTrigger>
                </TabsList>
                <TabsContent value="image" className="space-y-4 pt-4">
                  <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12">
                    <div className="flex flex-col items-center justify-center space-y-2 text-center">
                      <div className="rounded-full bg-primary/10 p-3">
                        <Upload className="h-6 w-6 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Drag & drop or click to upload</p>
                        <p className="text-xs text-muted-foreground">Supports JPG, PNG, WEBP (max 10MB)</p>
                      </div>
                      <Input type="file" className="hidden" id="image-upload" accept="image/*" />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => document.getElementById("image-upload")?.click()}
                      >
                        Select Image
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="image-description">Image Description (optional)</Label>
                    <Textarea
                      id="image-description"
                      placeholder="Describe your image to improve scan accuracy"
                      className="mt-1.5"
                    />
                  </div>
                </TabsContent>
                <TabsContent value="video" className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="video-url">Video URL</Label>
                    <Input id="video-url" placeholder="https://youtube.com/watch?v=..." />
                    <p className="text-xs text-muted-foreground">
                      Enter a YouTube, TikTok, Instagram, or other video platform URL
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="video-description">Video Description (optional)</Label>
                    <Textarea
                      id="video-description"
                      placeholder="Describe your video to improve scan accuracy"
                      className="mt-1.5"
                    />
                  </div>
                </TabsContent>
                <TabsContent value="keywords" className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="keywords">Keywords</Label>
                    <Textarea id="keywords" placeholder="Enter keywords separated by commas" />
                    <p className="text-xs text-muted-foreground">
                      Enter keywords related to your content (e.g., your name, brand, product names)
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <Separator />

            {/* Platform Selection */}
            <div className="space-y-4">
              <Label htmlFor="platform">Platform Selection</Label>
              <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                <div className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
                  <Checkbox
                    id="youtube"
                    checked={selectedPlatforms.includes("youtube")}
                    onCheckedChange={(checked) => {
                      setSelectedPlatforms((prev) =>
                        checked ? [...prev, "youtube"] : prev.filter((p) => p !== "youtube"),
                      )
                    }}
                  />
                  <div className="space-y-1 leading-none">
                    <Label htmlFor="youtube" className="cursor-pointer font-medium">
                      YouTube
                    </Label>
                  </div>
                </div>
                <div className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
                  <Checkbox
                    id="instagram"
                    checked={selectedPlatforms.includes("instagram")}
                    onCheckedChange={(checked) => {
                      setSelectedPlatforms((prev) =>
                        checked ? [...prev, "instagram"] : prev.filter((p) => p !== "instagram"),
                      )
                    }}
                  />
                  <div className="space-y-1 leading-none">
                    <Label htmlFor="instagram" className="cursor-pointer font-medium">
                      Instagram
                    </Label>
                  </div>
                </div>
                <div className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
                  <Checkbox
                    id="facebook"
                    checked={selectedPlatforms.includes("facebook")}
                    onCheckedChange={(checked) => {
                      setSelectedPlatforms((prev) =>
                        checked ? [...prev, "facebook"] : prev.filter((p) => p !== "facebook"),
                      )
                    }}
                  />
                  <div className="space-y-1 leading-none">
                    <Label htmlFor="facebook" className="cursor-pointer font-medium">
                      Facebook
                    </Label>
                  </div>
                </div>
                <div className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
                  <Checkbox
                    id="tiktok"
                    checked={selectedPlatforms.includes("tiktok")}
                    onCheckedChange={(checked) => {
                      setSelectedPlatforms((prev) =>
                        checked ? [...prev, "tiktok"] : prev.filter((p) => p !== "tiktok"),
                      )
                    }}
                  />
                  <div className="space-y-1 leading-none">
                    <Label htmlFor="tiktok" className="cursor-pointer font-medium">
                      TikTok
                    </Label>
                  </div>
                </div>
                <div className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
                  <Checkbox
                    id="twitter"
                    checked={selectedPlatforms.includes("twitter")}
                    onCheckedChange={(checked) => {
                      setSelectedPlatforms((prev) =>
                        checked ? [...prev, "twitter"] : prev.filter((p) => p !== "twitter"),
                      )
                    }}
                  />
                  <div className="space-y-1 leading-none">
                    <Label htmlFor="twitter" className="cursor-pointer font-medium">
                      Twitter
                    </Label>
                  </div>
                </div>
                <div className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
                  <Checkbox
                    id="reddit"
                    checked={selectedPlatforms.includes("reddit")}
                    onCheckedChange={(checked) => {
                      setSelectedPlatforms((prev) =>
                        checked ? [...prev, "reddit"] : prev.filter((p) => p !== "reddit"),
                      )
                    }}
                  />
                  <div className="space-y-1 leading-none">
                    <Label htmlFor="reddit" className="cursor-pointer font-medium">
                      Reddit
                    </Label>
                  </div>
                </div>
              </div>
              {selectedPlatforms.length === 0 && (
                <p className="text-sm text-muted-foreground">Please select at least one platform to scan</p>
              )}
              {selectedPlatforms.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  <p className="text-sm text-muted-foreground mr-2">Selected platforms:</p>
                  {selectedPlatforms.map((platform) => (
                    <Badge key={platform} variant="secondary" className="flex items-center gap-1">
                      {platform.charAt(0).toUpperCase() + platform.slice(1)}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 hover:bg-transparent"
                        onClick={() => setSelectedPlatforms((prev) => prev.filter((p) => p !== platform))}
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Remove {platform}</span>
                      </Button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <Separator />

            {/* Scan Purpose */}
            <div className="space-y-4">
              <Label>Scan Purpose</Label>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
                  <Checkbox
                    id="deepfakes"
                    checked={scanPurposes.includes("deepfakes")}
                    onCheckedChange={() => handleScanPurposeChange("deepfakes")}
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
                    checked={scanPurposes.includes("copyright")}
                    onCheckedChange={() => handleScanPurposeChange("copyright")}
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
                    id="ai-generated"
                    checked={scanPurposes.includes("ai-generated")}
                    onCheckedChange={() => handleScanPurposeChange("ai-generated")}
                  />
                  <div className="space-y-1 leading-none">
                    <Label htmlFor="ai-generated" className="cursor-pointer font-medium">
                      Track AI-generated Images
                    </Label>
                    <p className="text-xs text-muted-foreground">Find AI-generated content based on your work</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
                  <Checkbox
                    id="brand-usage"
                    checked={scanPurposes.includes("brand-usage")}
                    onCheckedChange={() => handleScanPurposeChange("brand-usage")}
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

            {/* Scan Priority */}
            <div className="space-y-4">
              <Label>Scan Priority</Label>
              <RadioGroup defaultValue="standard">
                <div className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
                  <RadioGroupItem value="standard" id="standard" />
                  <div className="space-y-1 leading-none">
                    <Label htmlFor="standard" className="cursor-pointer font-medium">
                      Standard Scan
                    </Label>
                    <p className="text-xs text-muted-foreground">Processed within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
                  <RadioGroupItem value="priority" id="priority" />
                  <div className="space-y-1 leading-none">
                    <Label htmlFor="priority" className="cursor-pointer font-medium">
                      Priority Scan
                    </Label>
                    <p className="text-xs text-muted-foreground">Processed within 4 hours (uses 2 scan credits)</p>
                  </div>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="flex items-center rounded-lg bg-muted p-4">
              <Clock className="mr-2 h-5 w-5 text-muted-foreground" />
              <span className="text-sm">Expected scan time: 15-30 minutes after approval</span>
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <motion.div
                    className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  />
                  Processing...
                </>
              ) : (
                "Request Scan"
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}

