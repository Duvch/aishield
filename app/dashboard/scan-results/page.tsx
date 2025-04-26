"use client"

import { useState, useEffect } from "react"
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

// Define a type for scan results based on your schema
type ScanResult = {
  id: number
  scanRequestId: number
  result: string  // This will be used as the title
  score: string
  detectionType: string
  platform: string
  sourceUrl: string
  mutlipleSources: string[]  // Only using the first element
  imageUrl: string[]  // Only using the first element
  createdAt: string
}

// Client component for scan results display
export default function ScanResultsPage() {
  const [scanResults, setScanResults] = useState<ScanResult[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const [view, setView] = useState<"grid" | "list">("grid")
  const [platform, setPlatform] = useState<string>("all")
  const [matchType, setMatchType] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [selectedResult, setSelectedResult] = useState<ScanResult | null>(null)

  // Fetch scan results from your API
  useEffect(() => {
    const fetchScanResults = async () => {
      try {
        const response = await fetch('/api/scan-results')
        
        if (!response.ok) {
          throw new Error('Failed to fetch scan results')
        }
        
        const data = await response.json()
        setScanResults(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred')
        console.error('Error fetching scan results:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchScanResults()
  }, [])

  // Get unique platforms for the filter dropdown
  const uniquePlatforms = Array.from(new Set(scanResults.map(result => result.platform)))
  
  // Get unique detection types for the filter dropdown
  const uniqueDetectionTypes = Array.from(new Set(scanResults.map(result => result.detectionType)))

  // Filter results based on selected filters and search query
  const filteredResults = scanResults.filter((result) => {
    const matchesPlatform = platform === "all" || result.platform.toLowerCase() === platform.toLowerCase()
    const matchesType = matchType === "all" || result.detectionType.toLowerCase() === matchType.toLowerCase()
    const matchesSearch =
      searchQuery === "" ||
      result.result.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.platform.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesPlatform && matchesType && matchesSearch
  })

  const handleTakedownRequest = (result: ScanResult) => {
    toast({
      title: "Takedown Request Submitted",
      description: `Your takedown request for content on ${result.platform} has been submitted.`,
    })
  }

  // Calculate confidence score as a percentage from the score field
  const getConfidenceScore = (score: string) => {
    // If score is already a percentage, return it
    if (score.includes('%')) {
      return parseInt(score)
    }
    
    // If score is a decimal between 0-1, convert to percentage
    const numScore = parseFloat(score)
    if (!isNaN(numScore) && numScore >= 0 && numScore <= 1) {
      return Math.round(numScore * 100)
    }
    
    // Otherwise just parse as integer
    return parseInt(score) || 0
  }

  // Format the date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toISOString().split('T')[0]
  }

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="mt-4 text-muted-foreground">Loading scan results...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <Card className="flex flex-col items-center justify-center p-8 text-center">
        <div className="rounded-full bg-destructive/10 p-3">
          <AlertTriangle className="h-6 w-6 text-destructive" />
        </div>
        <h3 className="mt-4 text-lg font-medium">Failed to load scan results</h3>
        <p className="mt-2 text-sm text-muted-foreground">{error}</p>
        <Button className="mt-4" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </Card>
    )
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
                {uniquePlatforms.map((platform) => (
                  <SelectItem key={platform} value={platform.toLowerCase()}>
                    {platform}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={matchType} onValueChange={setMatchType}>
              <SelectTrigger>
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {uniqueDetectionTypes.map((type) => (
                  <SelectItem key={type} value={type.toLowerCase()}>
                    {type}
                  </SelectItem>
                ))}
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
              {/* <div className="aspect-video w-full overflow-hidden">
                <img
                  src={result.imageUrl[0] || "/placeholder.svg"}
                  alt={result.result}
                  className="h-full w-full object-cover transition-transform hover:scale-105"
                />
              </div> */}
              <CardHeader className="p-4">
              <CardTitle className="line-clamp-2 mt-2 text-base">{result.result}</CardTitle>
              <CardDescription className="mt-1 text-xs">Found on {formatDate(result.createdAt)}</CardDescription>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                      {result.platform}
                    </span>
                    <span className="rounded bg-muted px-2 py-1 text-xs font-medium">{result.detectionType}</span>
                  </div>
                  <span className="text-sm font-medium">{getConfidenceScore(result.score)}% Match</span>
                </div>
                
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
                          {/* <img
                            src={result.imageUrl[0] || "/placeholder.svg"}
                            alt={result.result}
                            className="h-12 w-20 rounded object-cover"
                          /> */}
                          <div className="line-clamp-2 max-w-xs text-sm font-medium">{result.result}</div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">{result.platform}</td>
                      <td className="px-4 py-3 text-sm">{result.detectionType}</td>
                      <td className="px-4 py-3 text-sm">{getConfidenceScore(result.score)}%</td>
                      <td className="px-4 py-3 text-sm">{formatDate(result.createdAt)}</td>
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
            <div className="grid gap-6 py-4">
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-xl font-medium">{selectedResult.result}</h3>
        <p className="text-sm text-muted-foreground">Found on {formatDate(selectedResult.createdAt)}</p>
      </div>
      <div className="flex items-center gap-2">
        <span className="rounded bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
          {selectedResult.platform}
        </span>
        <span className="rounded bg-muted px-2 py-1 text-xs font-medium">
          {selectedResult.detectionType}
        </span>
      </div>
    </div>
    
    <Separator />
    
    <div className="grid gap-6 md:grid-cols-2">
      <div>
        <h4 className="text-sm font-medium">Match Details</h4>
        <div className="mt-2 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm">Confidence Score</span>
            <span className="font-medium">{getConfidenceScore(selectedResult.score)}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-muted">
            <motion.div
              className="h-2 rounded-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${getConfidenceScore(selectedResult.score)}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>
        
        {selectedResult.sourceUrl && (
          <div className="mt-4">
            <h4 className="text-sm font-medium">Source URL</h4>
            <div className="mt-2 flex items-center justify-between">
              <p className="text-sm truncate max-w-xs">{selectedResult.sourceUrl}</p>
              <Button variant="outline" size="sm" asChild>
                <a href={selectedResult.mutlipleSources[0]} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-3 w-3" />
                  View
                </a>
              </Button>
            </div>
          </div>
        )}
        
        
      </div>
      
      <div>
        <h4 className="text-sm font-medium">Match Reason</h4>
        <p className="mt-2 text-sm">
          {selectedResult.detectionType === "Deepfake" &&
            "This content appears to use AI to recreate your likeness without permission."}
          {selectedResult.detectionType === "Copyright" &&
            "This content contains your copyrighted material without proper attribution or license."}
          {selectedResult.detectionType === "AI Generated" &&
            "This content was generated using AI trained on your work."}
          {selectedResult.detectionType === "Brand Usage" &&
            "This content uses your brand or likeness in advertising without permission."}
          {/* Fall back for any other detection types */}
          {!["Deepfake", "Copyright", "AI Generated", "Brand Usage"].includes(selectedResult.detectionType) &&
            `This content was flagged as ${selectedResult.detectionType}.`}
        </p>
        
        <div className="mt-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-950">
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
        
        <div className="mt-4">
          <h4 className="text-sm font-medium">Scan Request Details</h4>
          <div className="mt-2 text-sm">
            <div className="flex justify-between py-1">
              <span className="text-muted-foreground">Request ID:</span>
              <span>{selectedResult.scanRequestId}</span>
            </div>
            <div className="flex justify-between border-t py-1">
              <span className="text-muted-foreground">Detection Type:</span>
              <span>{selectedResult.detectionType}</span>
            </div>
            <div className="flex justify-between border-t py-1">
              <span className="text-muted-foreground">Platform:</span>
              <span>{selectedResult.platform}</span>
            </div>
          </div>
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