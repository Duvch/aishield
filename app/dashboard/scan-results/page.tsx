"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { AlertTriangle, Download, ExternalLink, Filter, Search, ThumbsDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"

// Mock data for scan results
const scanResults = [
  {
    id: 1,
    platform: "YouTube",
    thumbnail: "/placeholder.svg?height=180&width=320",
    title: "Unauthorized Video Using Your Content",
    url: "https://youtube.com/watch?v=example1",
    matchType: "Copyright",
    confidenceScore: 92,
    date: "2025-04-05",
  },
  {
    id: 2,
    platform: "Instagram",
    thumbnail: "/placeholder.svg?height=180&width=320",
    title: "Deepfake Profile Using Your Image",
    url: "https://instagram.com/p/example2",
    matchType: "Deepfake",
    confidenceScore: 87,
    date: "2025-04-05",
  },
  {
    id: 3,
    platform: "TikTok",
    thumbnail: "/placeholder.svg?height=180&width=320",
    title: "Advertisement Using Your Likeness",
    url: "https://tiktok.com/@user/video/example3",
    matchType: "Brand Usage",
    confidenceScore: 78,
    date: "2025-04-04",
  },
  {
    id: 4,
    platform: "YouTube",
    thumbnail: "/placeholder.svg?height=180&width=320",
    title: "AI Generated Content Based on Your Work",
    url: "https://youtube.com/watch?v=example4",
    matchType: "AI Generated",
    confidenceScore: 95,
    date: "2025-04-03",
  },
  {
    id: 5,
    platform: "Facebook",
    thumbnail: "/placeholder.svg?height=180&width=320",
    title: "Unauthorized Ad Campaign",
    url: "https://facebook.com/posts/example5",
    matchType: "Brand Usage",
    confidenceScore: 89,
    date: "2025-04-02",
  },
  {
    id: 6,
    platform: "Instagram",
    thumbnail: "/placeholder.svg?height=180&width=320",
    title: "Deepfake Video Using Your Voice",
    url: "https://instagram.com/p/example6",
    matchType: "Deepfake",
    confidenceScore: 91,
    date: "2025-04-01",
  },
]

export default function ScanResultsPage() {
  const [view, setView] = useState<"grid" | "list">("grid")
  const [platform, setPlatform] = useState<string>("all")
  const [matchType, setMatchType] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [selectedResult, setSelectedResult] = useState<(typeof scanResults)[0] | null>(null)

  // Filter results based on selected filters and search query
  const filteredResults = scanResults.filter((result) => {
    const matchesPlatform = platform === "all" || result.platform.toLowerCase() === platform.toLowerCase()
    const matchesType = matchType === "all" || result.matchType.toLowerCase() === matchType.toLowerCase()
    const matchesSearch =
      searchQuery === "" ||
      result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.platform.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesPlatform && matchesType && matchesSearch
  })

  const handleTakedownRequest = (result: (typeof scanResults)[0]) => {
    toast({
      title: "Takedown Request Submitted",
      description: `Your takedown request for content on ${result.platform} has been submitted.`,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Scan Results</h1>
          <p className="text-muted-foreground">Review and take action on detected content</p>
        </div>
        <div className="flex items-center gap-2">
          <Tabs value={view} onValueChange={(v) => setView(v as "grid" | "list")} className="hidden md:block">
            <TabsList>
              <TabsTrigger value="grid">Grid</TabsTrigger>
              <TabsTrigger value="list">List</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button variant="outline" size="icon" className="md:hidden">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4 sm:p-6">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search results..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <Select value={platform} onValueChange={setPlatform}>
              <SelectTrigger>
                <SelectValue placeholder="All Platforms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Platforms</SelectItem>
                <SelectItem value="youtube">YouTube</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="facebook">Facebook</SelectItem>
                <SelectItem value="tiktok">TikTok</SelectItem>
              </SelectContent>
            </Select>
            <Select value={matchType} onValueChange={setMatchType}>
              <SelectTrigger>
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="deepfake">Deepfake</SelectItem>
                <SelectItem value="copyright">Copyright</SelectItem>
                <SelectItem value="ai generated">AI Generated</SelectItem>
                <SelectItem value="brand usage">Brand Usage</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {filteredResults.length === 0 ? (
        <Card className="flex flex-col items-center justify-center p-8 text-center">
          <div className="rounded-full bg-muted p-3">
            <Search className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-lg font-medium">No results found</h3>
          <p className="mt-2 text-sm text-muted-foreground">Try adjusting your filters or search query</p>
        </Card>
      ) : view === "grid" ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredResults.map((result) => (
            <Card key={result.id} className="overflow-hidden">
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={result.thumbnail || "/placeholder.svg"}
                  alt={result.title}
                  className="h-full w-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardHeader className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                      {result.platform}
                    </span>
                    <span className="rounded bg-muted px-2 py-1 text-xs font-medium">{result.matchType}</span>
                  </div>
                  <span className="text-sm font-medium">{result.confidenceScore}% Match</span>
                </div>
                <CardTitle className="line-clamp-2 mt-2 text-base">{result.title}</CardTitle>
                <CardDescription className="mt-1 text-xs">Found on {result.date}</CardDescription>
              </CardHeader>
              <CardFooter className="flex gap-2 p-4 pt-0">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => setSelectedResult(result)}>
                  View Details
                </Button>
                <Button variant="default" size="sm" className="flex-1" onClick={() => handleTakedownRequest(result)}>
                  Request Takedown
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left text-sm font-medium">Content</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Platform</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Type</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Match</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredResults.map((result) => (
                    <tr key={result.id} className="border-b">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={result.thumbnail || "/placeholder.svg"}
                            alt={result.title}
                            className="h-12 w-20 rounded object-cover"
                          />
                          <div className="line-clamp-2 max-w-xs text-sm font-medium">{result.title}</div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">{result.platform}</td>
                      <td className="px-4 py-3 text-sm">{result.matchType}</td>
                      <td className="px-4 py-3 text-sm">{result.confidenceScore}%</td>
                      <td className="px-4 py-3 text-sm">{result.date}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" onClick={() => setSelectedResult(result)}>
                            Details
                          </Button>
                          <Button variant="default" size="sm" onClick={() => handleTakedownRequest(result)}>
                            Takedown
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Result Detail Dialog */}
      {selectedResult && (
        <Dialog open={!!selectedResult} onOpenChange={(open) => !open && setSelectedResult(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Content Details</DialogTitle>
              <DialogDescription>Review detailed information about this content match</DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4 md:grid-cols-2">
              <div>
                <img
                  src={selectedResult.thumbnail || "/placeholder.svg"}
                  alt={selectedResult.title}
                  className="w-full rounded-lg object-cover"
                />
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                      {selectedResult.platform}
                    </span>
                    <span className="rounded bg-muted px-2 py-1 text-xs font-medium">{selectedResult.matchType}</span>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <a href={selectedResult.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-3 w-3" />
                      View Original
                    </a>
                  </Button>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">{selectedResult.title}</h3>
                  <p className="text-sm text-muted-foreground">Found on {selectedResult.date}</p>
                </div>
                <Separator />
                <div>
                  <h4 className="text-sm font-medium">Match Details</h4>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Confidence Score</span>
                      <span className="font-medium">{selectedResult.confidenceScore}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <motion.div
                        className="h-2 rounded-full bg-primary"
                        initial={{ width: 0 }}
                        animate={{ width: `${selectedResult.confidenceScore}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                </div>
                <Separator />
                <div>
                  <h4 className="text-sm font-medium">Match Reason</h4>
                  <p className="mt-1 text-sm">
                    {selectedResult.matchType === "Deepfake" &&
                      "This content appears to use AI to recreate your likeness without permission."}
                    {selectedResult.matchType === "Copyright" &&
                      "This content contains your copyrighted material without proper attribution or license."}
                    {selectedResult.matchType === "AI Generated" &&
                      "This content was generated using AI trained on your work."}
                    {selectedResult.matchType === "Brand Usage" &&
                      "This content uses your brand or likeness in advertising without permission."}
                  </p>
                </div>
                <div className="rounded-lg bg-yellow-50 p-4 dark:bg-yellow-950">
                  <div className="flex items-start">
                    <AlertTriangle className="mr-2 h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                    <div>
                      <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-300">Potential Violation</h4>
                      <p className="mt-1 text-xs text-yellow-700 dark:text-yellow-400">
                        This content likely violates platform terms and may be eligible for takedown.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter className="flex flex-col gap-2 sm:flex-row">
              <Button variant="outline" className="flex-1" asChild>
                <a href={`/dashboard/takedown-requests?content=${selectedResult.id}`}>
                  <Download className="mr-2 h-4 w-4" />
                  Download Evidence
                </a>
              </Button>
              <Button variant="outline" className="flex-1">
                <ThumbsDown className="mr-2 h-4 w-4" />
                Report False Match
              </Button>
              <Button className="flex-1" onClick={() => handleTakedownRequest(selectedResult)}>
                Request Takedown
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

