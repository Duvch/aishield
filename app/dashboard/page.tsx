import Link from "next/link"
import { ArrowRight, Bot, FileSearch, Search, Shield } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// Add the import for the AIBotFeatures component
import { AIBotFeatures } from "@/components/ai-bot-features"

// Mock data
const stats = [
  { name: "Active Scans", value: 2, icon: Search },
  { name: "Scan Results", value: 12, icon: FileSearch },
  { name: "Takedown Requests", value: 5, icon: Shield },
  { name: "AI Bot Scans", value: 8, icon: Bot },
]

const recentScans = [
  { id: 1, platform: "YouTube", type: "Deepfake", status: "In Progress", date: "2025-04-06" },
  { id: 2, platform: "Instagram", type: "Copyright", status: "Completed", date: "2025-04-05", results: 3 },
  { id: 3, platform: "TikTok", type: "Brand Usage", status: "Completed", date: "2025-04-04", results: 0 },
]

const recentTakedowns = [
  { id: 1, platform: "YouTube", content: "Video ID: xYz123", status: "Pending", date: "2025-04-06" },
  { id: 2, platform: "Instagram", content: "Post ID: abc456", status: "Successful", date: "2025-04-03" },
]

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Monitor your content protection across platforms</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/request-scan">
            Request New Scan
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Bot Upgrade Section */}
      <AIBotFeatures />

      {/* Plan usage */}
      <Card>
        <CardHeader>
          <CardTitle>Plan Usage</CardTitle>
          <CardDescription>You are currently on the Pro plan</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Scans Used</span>
              <span className="font-medium">14 / 50</span>
            </div>
            <Progress value={28} />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Takedown Requests</span>
              <span className="font-medium">5 / 20</span>
            </div>
            <Progress value={25} />
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" asChild className="w-full">
            <Link href="/dashboard/my-plan">View Plan Details</Link>
          </Button>
        </CardFooter>
      </Card>

      {/* Recent Activity */}
      <Tabs defaultValue="scans">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Recent Activity</h2>
          <TabsList>
            <TabsTrigger value="scans">Scans</TabsTrigger>
            <TabsTrigger value="takedowns">Takedowns</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="scans" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-3 text-left text-sm font-medium">Platform</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Type</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Results</th>
                      <th className="px-4 py-3 text-left text-sm font-medium"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentScans.map((scan) => (
                      <tr key={scan.id} className="border-b">
                        <td className="px-4 py-3 text-sm">{scan.platform}</td>
                        <td className="px-4 py-3 text-sm">{scan.type}</td>
                        <td className="px-4 py-3 text-sm">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              scan.status === "In Progress"
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                                : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            }`}
                          >
                            {scan.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">{scan.date}</td>
                        <td className="px-4 py-3 text-sm">
                          {scan.status === "Completed"
                            ? scan.results !== undefined
                              ? scan.results
                              : "N/A"
                            : "Pending"}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {scan.status === "Completed" && scan.results ? (
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/dashboard/scan-results?id=${scan.id}`}>View Results</Link>
                            </Button>
                          ) : null}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter className="border-t p-4">
              <Button variant="outline" asChild className="w-full">
                <Link href="/dashboard/scan-results">View All Scans</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="takedowns" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-3 text-left text-sm font-medium">Platform</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Content</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                      <th className="px-4 py-3 text-left text-sm font-medium"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentTakedowns.map((takedown) => (
                      <tr key={takedown.id} className="border-b">
                        <td className="px-4 py-3 text-sm">{takedown.platform}</td>
                        <td className="px-4 py-3 text-sm">{takedown.content}</td>
                        <td className="px-4 py-3 text-sm">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              takedown.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                                : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            }`}
                          >
                            {takedown.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">{takedown.date}</td>
                        <td className="px-4 py-3 text-sm">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/dashboard/takedown-requests?id=${takedown.id}`}>View Details</Link>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter className="border-t p-4">
              <Button variant="outline" asChild className="w-full">
                <Link href="/dashboard/takedown-requests">View All Takedowns</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

