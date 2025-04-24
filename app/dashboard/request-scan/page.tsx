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

// Define form state type
interface ScanFormState {
  contentType: "image" | "video" | "keywords";
  url: string;
  description?: string;
  keywords?: string;
  platforms: string[];
  purposes: string[];
  priority: "standard" | "priority";
  imageFile?: File | null;
}

export default function RequestScanPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formState, setFormState] = useState<ScanFormState>({
    contentType: "image",
    url: "",
    description: "",
    keywords: "",
    platforms: [],
    purposes: [],
    priority: "standard",
    imageFile: null
  })
  
  // Helper function to update form state
  const updateFormState = (key: keyof ScanFormState, value: any) => {
    setFormState(prev => ({ ...prev, [key]: value }))
  }

  // Handle platform selection
  const handlePlatformChange = (platform: string, checked: boolean | string) => {
    if (checked) {
      updateFormState('platforms', [...formState.platforms, platform])
    } else {
      updateFormState('platforms', formState.platforms.filter(p => p !== platform))
    }
  }

  // Handle scan purpose change
  const handleScanPurposeChange = (purpose: string) => {
    const newPurposes = formState.purposes.includes(purpose)
      ? formState.purposes.filter(p => p !== purpose)
      : [...formState.purposes, purpose]
    
    updateFormState('purposes', newPurposes)
  }

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    updateFormState('imageFile', file)
  }

  // Prepare data for database
  const prepareDataForSubmission = () => {
    // Get the URL based on content type
    let url = "";
    
    if (formState.contentType === "video") {
      url = formState.url;
    } else if (formState.contentType === "image") {
      // For image uploads, we'd typically upload to a storage service
      // and store the resulting URL, but for now we'll use a placeholder
      url = formState.imageFile ? `image:${formState.imageFile.name}` : "";
    } else if (formState.contentType === "keywords") {
      url = `keywords:${formState.keywords}`;
    }
    
    // Return formatted data matching the schema
    return {
      url: url,
      contentType: formState.contentType,
      description: formState.description,
      platforms: formState.platforms,
      purposes: formState.purposes,
      priority: formState.priority,
      status: "pending"
    };
  };

  // Updated handleSubmit function for your RequestScanPage component

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      // 1. Handle image upload if there's an image file
      let imageUrl = "";
      if (formState.contentType === "image" && formState.imageFile) {
        // Create a FormData object to upload the file
        const uploadFormData = new FormData();
        uploadFormData.append('file', formState.imageFile);
        
        // Upload image to your file storage API
        const uploadResponse = await fetch('/api/uploads', {
          method: 'POST',
          body: uploadFormData,
        });
        
        if (!uploadResponse.ok) {
          throw new Error('Failed to upload image');
        }
        
        const uploadData = await uploadResponse.json();
        imageUrl = uploadData.url; // Get the URL of the uploaded file
      }
  
      // 2. Prepare the data for submission
      const scanRequestData = {
        contentType: formState.contentType,
        // Set the URL based on content type
        url: formState.contentType === "image" 
             ? imageUrl 
             : formState.contentType === "keywords" 
               ? `keywords:${formState.keywords}` // Create a special URL format for keywords
               : formState.url,
        description: formState.description || "",
        keywords: formState.keywords || "",
        platforms: formState.platforms,
        purposes: formState.purposes,
        priority: formState.priority,
      };
      
      // 3. Submit the data to your API
      const response = await fetch('/api/scan-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(scanRequestData),
        credentials: 'include', // Important for sending cookies
      });
  
      if (!response.ok) {
        throw new Error('Failed to submit scan request');
      }
  
      toast({
        title: "Scan Request Submitted",
        description: "Your scan request has been sent for processing.",
      });
  
      router.push("/dashboard");
    } catch (error) {
      console.error('Error submitting scan request:', error);
      toast({
        title: "Submission Error",
        description: "There was a problem submitting your scan request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <Tabs 
                defaultValue="image" 
                onValueChange={(value) => updateFormState('contentType', value as "image" | "video" | "keywords")} 
                className="w-full"
              >
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
                      <Input 
                        type="file" 
                        className="hidden" 
                        id="image-upload" 
                        accept="image/*" 
                        onChange={handleFileChange}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => document.getElementById("image-upload")?.click()}
                      >
                        Select Image
                      </Button>
                      {formState.imageFile && (
                        <div className="text-sm mt-2">
                          Selected file: {formState.imageFile.name}
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="image-description">Image Description (optional)</Label>
                    <Textarea
                      id="image-description"
                      placeholder="Describe your image to improve scan accuracy"
                      className="mt-1.5"
                      value={formState.description || ""}
                      onChange={(e) => updateFormState('description', e.target.value)}
                    />
                  </div>
                </TabsContent>
                <TabsContent value="video" className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="video-url">Video URL</Label>
                    <Input 
                      id="video-url" 
                      placeholder="https://youtube.com/watch?v=..." 
                      value={formState.url}
                      onChange={(e) => updateFormState('url', e.target.value)}
                    />
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
                      value={formState.description || ""}
                      onChange={(e) => updateFormState('description', e.target.value)}
                    />
                  </div>
                </TabsContent>
                <TabsContent value="keywords" className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="keywords">Keywords</Label>
                    <Textarea 
                      id="keywords" 
                      placeholder="Enter keywords separated by commas"
                      value={formState.keywords || ""}
                      onChange={(e) => updateFormState('keywords', e.target.value)}
                    />
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
                    checked={formState.platforms.includes("youtube")}
                    onCheckedChange={(checked) => handlePlatformChange("youtube", checked)}
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
                    checked={formState.platforms.includes("instagram")}
                    onCheckedChange={(checked) => handlePlatformChange("instagram", checked)}
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
                    checked={formState.platforms.includes("facebook")}
                    onCheckedChange={(checked) => handlePlatformChange("facebook", checked)}
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
                    checked={formState.platforms.includes("tiktok")}
                    onCheckedChange={(checked) => handlePlatformChange("tiktok", checked)}
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
                    checked={formState.platforms.includes("twitter")}
                    onCheckedChange={(checked) => handlePlatformChange("twitter", checked)}
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
                    checked={formState.platforms.includes("reddit")}
                    onCheckedChange={(checked) => handlePlatformChange("reddit", checked)}
                  />
                  <div className="space-y-1 leading-none">
                    <Label htmlFor="reddit" className="cursor-pointer font-medium">
                      Reddit
                    </Label>
                  </div>
                </div>
              </div>
              {formState.platforms.length === 0 && (
                <p className="text-sm text-muted-foreground">Please select at least one platform to scan</p>
              )}
              {formState.platforms.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  <p className="text-sm text-muted-foreground mr-2">Selected platforms:</p>
                  {formState.platforms.map((platform) => (
                    <Badge key={platform} variant="secondary" className="flex items-center gap-1">
                      {platform.charAt(0).toUpperCase() + platform.slice(1)}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 hover:bg-transparent"
                        onClick={() => handlePlatformChange(platform, false)}
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
                    checked={formState.purposes.includes("deepfakes")}
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
                    checked={formState.purposes.includes("copyright")}
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
                    checked={formState.purposes.includes("ai-generated")}
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
                    checked={formState.purposes.includes("brand-usage")}
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
              <RadioGroup 
                defaultValue="standard" 
                value={formState.priority}
                onValueChange={(value) => updateFormState('priority', value as "standard" | "priority")}
              >
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
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting || formState.platforms.length === 0 || 
                (formState.contentType === "video" && !formState.url) ||
                (formState.contentType === "keywords" && !formState.keywords) ||
                (formState.contentType === "image" && !formState.imageFile)
              }
            >
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