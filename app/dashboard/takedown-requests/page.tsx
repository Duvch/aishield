"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Download,
  ExternalLink,
  FileText,
  Filter,
  Search,
  XCircle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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

// Mock data for takedown requests
const takedownRequests = [
  {
    id: 1,
    platform: "YouTube",
    contentTitle: "Unauthorized Video Using Your Content",
    contentUrl: "https://youtube.com/watch?v=example1",
    thumbnail: "/placeholder.svg?height=180&width=320",
    status: "Pending",
    dateRequested: "2025-04-06",
    dmcaReference: null,
    adminComments: "Reviewing your request",
  },
  {
    id: 2,
    platform: "Instagram",
    contentTitle: "Deepfake Profile Using Your Image",
    contentUrl: "https://instagram.com/p/example2",
    thumbnail: "/placeholder.svg?height=180&width=320",
    status: "In Process",
    dateRequested: "2025-04-05",
    dmcaReference: "DMCA-IG-12345",
    adminComments: "DMCA notice sent to platform",
  },
  {
    id: 3,
    platform: "TikTok",
    contentTitle: "Advertisement Using Your Likeness",
    contentUrl: "https://tiktok.com/@user/video/example3",
    thumbnail: "/placeholder.svg?height=180&width=320",
    status: "Success",
    dateRequested: "2025-04-03",
    dmcaReference: "DMCA-TT-67890",
    adminComments: "Content has been removed by the platform",
    dateCompleted: "2025-04-05",
  },
  {
    id: 4,
    platform: "YouTube",
    contentTitle: "AI Generated Content Based on Your Work",
    contentUrl: "https://youtube.com/watch?v=example4",
    thumbnail: "/placeholder.svg?height=180&width=320",
    status: "Failed",
    dateRequested: "2025-03-28",
    dmcaReference: "DMCA-YT-54321",
    adminComments: "Platform rejected takedown request. Reason: Fair use claim by uploader.",
    dateCompleted: "2025-04-01",
  },
  {
    id: 5,
    platform: "Facebook",
    contentTitle: "Unauthorized Ad Campaign",
    contentUrl: "https://facebook.com/posts/example5",
    thumbnail: "/placeholder.svg?height=180&width=320",
    status: "Success",
    dateRequested: "2025-03-25",
    dmcaReference: "DMCA-FB-98765",
    adminComments: "Content has been removed by the platform",
    dateCompleted: "2025-03-27",
  },
]

export default function TakedownRequestsPage() {
  const [status, setStatus] = useState<string>("all")
  const [platform, setPlatform] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [selectedRequest, setSelectedRequest] = useState<(typeof takedownRequests)[0] | null>(null)

  // Filter requests based on selected filters and search query
  const filteredRequests = takedownRequests.filter((request) => {
    const matchesStatus = status === "all" || request.status.toLowerCase() === status.toLowerCase()
    const matchesPlatform = platform === "all" || request.platform.toLowerCase() === platform.toLowerCase()
    const matchesSearch =
      searchQuery === "" ||
      request.contentTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.platform.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (request.dmcaReference && request.dmcaReference.toLowerCase().includes(searchQuery.toLowerCase()))

    return matchesStatus && matchesPlatform && matchesSearch
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending":
        return <Clock className="h-5 w-5 text-yellow-500" />
      case "In Process":
        return (
          <motion.div
            className="h-5 w-5 rounded-full border-2 border-blue-500 border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
        )
      case "Success":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
      case "Failed":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "In Process":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "Success":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Failed":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Takedown Requests</h1>
          <p className="text-muted-foreground">Track and manage your content takedown requests</p>
        </div>
        <Button variant="outline" size="icon" className="md:hidden">
          <Filter className="h-4 w-4" />
        </Button>
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
                  placeholder="Search requests..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in process">In Process</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
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
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {filteredRequests.length === 0 ? (
        <Card className="flex flex-col items-center justify-center p-8 text-center">
          <div className="rounded-full bg-muted p-3">
            <Search className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-lg font-medium">No takedown requests found</h3>
          <p className="mt-2 text-sm text-muted-foreground">Try adjusting your filters or search query</p>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left text-sm font-medium">Content</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Platform</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Date Requested</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">DMCA Reference</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.map((request) => (
                    <tr key={request.id} className="border-b">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={request.thumbnail || "/placeholder.svg"}
                            alt={request.contentTitle}
                            className="h-12 w-20 rounded object-cover"
                          />
                          <div className="line-clamp-2 max-w-xs text-sm font-medium">{request.contentTitle}</div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">{request.platform}</td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(request.status)}`}
                        >
                          {getStatusIcon(request.status)}
                          {request.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">{request.dateRequested}</td>
                      <td className="px-4 py-3 text-sm">{request.dmcaReference || "N/A"}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" onClick={() => setSelectedRequest(request)}>
                            Details
                          </Button>
                          {request.status === "Success" && (
                            <Button variant="outline" size="sm" asChild>
                              <a href="#" download>
                                <Download className="mr-1 h-3 w-3" />
                                Proof
                              </a>
                            </Button>
                          )}
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

      {/* Request Detail Dialog */}
      {selectedRequest && (
        <Dialog open={!!selectedRequest} onOpenChange={(open) => !open && setSelectedRequest(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Takedown Request Details</DialogTitle>
              <DialogDescription>Review detailed information about this takedown request</DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4 md:grid-cols-2">
              <div>
                <img
                  src={selectedRequest.thumbnail || "/placeholder.svg"}
                  alt={selectedRequest.contentTitle}
                  className="w-full rounded-lg object-cover"
                />
                <div className="mt-4 flex items-center justify-between">
                  <span className="rounded bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                    {selectedRequest.platform}
                  </span>
                  <Button variant="outline" size="sm" asChild>
                    <a href={selectedRequest.contentUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-3 w-3" />
                      View Original
                    </a>
                  </Button>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">{selectedRequest.contentTitle}</h3>
                  <div className="mt-2 flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(selectedRequest.status)}`}
                    >
                      {getStatusIcon(selectedRequest.status)}
                      {selectedRequest.status}
                    </span>
                    <span className="text-xs text-muted-foreground">Requested on {selectedRequest.dateRequested}</span>
                  </div>
                </div>
                <Separator />
                <div>
                  <h4 className="text-sm font-medium">DMCA Information</h4>
                  <div className="mt-2 rounded-lg border p-3">
                    {selectedRequest.dmcaReference ? (
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Reference: {selectedRequest.dmcaReference}</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Awaiting DMCA filing</span>
                      </div>
                    )}
                  </div>
                </div>
                <Separator />
                <div>
                  <h4 className="text-sm font-medium">Admin Comments</h4>
                  <p className="mt-1 rounded-lg bg-muted p-3 text-sm">{selectedRequest.adminComments}</p>
                </div>
                {selectedRequest.status === "Success" && (
                  <div className="rounded-lg bg-green-50 p-4 dark:bg-green-950">
                    <div className="flex items-start">
                      <CheckCircle2 className="mr-2 h-5 w-5 text-green-600 dark:text-green-400" />
                      <div>
                        <h4 className="text-sm font-medium text-green-800 dark:text-green-300">Takedown Successful</h4>
                        <p className="mt-1 text-xs text-green-700 dark:text-green-400">
                          Content was removed on {selectedRequest.dateCompleted}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                {selectedRequest.status === "Failed" && (
                  <div className="rounded-lg bg-red-50 p-4 dark:bg-red-950">
                    <div className="flex items-start">
                      <XCircle className="mr-2 h-5 w-5 text-red-600 dark:text-red-400" />
                      <div>
                        <h4 className="text-sm font-medium text-red-800 dark:text-red-300">Takedown Failed</h4>
                        <p className="mt-1 text-xs text-red-700 dark:text-red-400">
                          Request was rejected on {selectedRequest.dateCompleted}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <DialogFooter className="flex flex-col gap-2 sm:flex-row">
              {selectedRequest.status === "Success" && (
                <Button variant="outline" className="flex-1" asChild>
                  <a href="#" download>
                    <Download className="mr-2 h-4 w-4" />
                    Download Takedown Proof
                  </a>
                </Button>
              )}
              {(selectedRequest.status === "Pending" || selectedRequest.status === "In Process") && (
                <Button variant="outline" className="flex-1">
                  Cancel Request
                </Button>
              )}
              {selectedRequest.status === "Failed" && <Button className="flex-1">Appeal Decision</Button>}
              <Button variant="default" className="flex-1" asChild>
                <Link href="/dashboard/support">Contact Support</Link>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

