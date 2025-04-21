"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const tabs = [
  {
    id: "content-violations",
    label: "Content Violation Feed",
    content: (
      <div className="rounded-lg border border-gray-800 bg-gray-900/70 p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-medium text-white">Recent Violations</h3>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="h-8 border-gray-700 bg-gray-800/50 text-xs text-gray-300">
              Filter
            </Button>
            <Button variant="outline" size="sm" className="h-8 border-gray-700 bg-gray-800/50 text-xs text-gray-300">
              Export
            </Button>
          </div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="rounded-md border border-gray-800 bg-gray-800/50 p-4">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-red-500" />
                  <span className="text-sm font-medium text-white">High Priority</span>
                </div>
                <span className="text-xs text-gray-400">2 hours ago</span>
              </div>
              <p className="mb-2 text-sm text-gray-300">Unauthorized content detected on Instagram</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded bg-gray-700" />
                  <div>
                    <div className="h-2 w-24 rounded bg-gray-700" />
                    <div className="mt-1 h-2 w-16 rounded bg-gray-700" />
                  </div>
                </div>
                <Button size="sm" className="h-8 bg-indigo-600 text-xs hover:bg-indigo-700">
                  Take Action
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "takedown-tracker",
    label: "Takedown Tracker",
    content: (
      <div className="rounded-lg border border-gray-800 bg-gray-900/70 p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-medium text-white">Takedown Status</h3>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="h-8 border-gray-700 bg-gray-800/50 text-xs text-gray-300">
              Filter
            </Button>
            <Button variant="outline" size="sm" className="h-8 border-gray-700 bg-gray-800/50 text-xs text-gray-300">
              Export
            </Button>
          </div>
        </div>
        <div className="mb-6 grid grid-cols-4 gap-4">
          <div className="rounded-md border border-gray-800 bg-gray-800/50 p-3 text-center">
            <div className="text-2xl font-bold text-white">12</div>
            <div className="text-xs text-gray-400">Pending</div>
          </div>
          <div className="rounded-md border border-gray-800 bg-gray-800/50 p-3 text-center">
            <div className="text-2xl font-bold text-green-500">28</div>
            <div className="text-xs text-gray-400">Successful</div>
          </div>
          <div className="rounded-md border border-gray-800 bg-gray-800/50 p-3 text-center">
            <div className="text-2xl font-bold text-yellow-500">5</div>
            <div className="text-xs text-gray-400">In Progress</div>
          </div>
          <div className="rounded-md border border-gray-800 bg-gray-800/50 p-3 text-center">
            <div className="text-2xl font-bold text-red-500">3</div>
            <div className="text-xs text-gray-400">Failed</div>
          </div>
        </div>
        <div className="space-y-4">
          {[1, 2].map((item) => (
            <div key={item} className="rounded-md border border-gray-800 bg-gray-800/50 p-4">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-sm font-medium text-white">Takedown Successful</span>
                </div>
                <span className="text-xs text-gray-400">Yesterday</span>
              </div>
              <p className="mb-2 text-sm text-gray-300">
                DMCA takedown on YouTube video ID: YT-{Math.floor(Math.random() * 10000)}
              </p>
              <div className="h-1.5 w-full rounded-full bg-gray-700">
                <div className="h-1.5 w-full rounded-full bg-green-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "analytics",
    label: "Performance Analytics",
    content: (
      <div className="rounded-lg border border-gray-800 bg-gray-900/70 p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-medium text-white">Protection Analytics</h3>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="h-8 border-gray-700 bg-gray-800/50 text-xs text-gray-300">
              Last 7 Days
            </Button>
          </div>
        </div>
        <div className="mb-6 h-64 w-full rounded-md border border-gray-800 bg-gray-800/50 p-4">
          <div className="flex h-full flex-col justify-between">
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div
                    className="h-32 w-8 rounded-t-sm bg-indigo-900"
                    style={{
                      height: `${Math.floor(Math.random() * 100 + 20)}px`,
                    }}
                  />
                  <div className="mt-2 text-xs text-gray-500">{i + 1}</div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="rounded-md bg-gray-800 p-2 text-center">
                <div className="text-lg font-bold text-white">48</div>
                <div className="text-xs text-gray-400">Detections</div>
              </div>
              <div className="rounded-md bg-gray-800 p-2 text-center">
                <div className="text-lg font-bold text-white">36</div>
                <div className="text-xs text-gray-400">Takedowns</div>
              </div>
              <div className="rounded-md bg-gray-800 p-2 text-center">
                <div className="text-lg font-bold text-indigo-400">75%</div>
                <div className="text-xs text-gray-400">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "coverage",
    label: "Platform Coverage Map",
    content: (
      <div className="rounded-lg border border-gray-800 bg-gray-900/70 p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-medium text-white">Platform Coverage</h3>
          <Button variant="outline" size="sm" className="h-8 border-gray-700 bg-gray-800/50 text-xs text-gray-300">
            Add Platform
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {["YouTube", "Instagram", "TikTok", "Twitter", "Facebook", "Pinterest", "LinkedIn", "Reddit"].map(
            (platform) => (
              <div key={platform} className="rounded-md border border-gray-800 bg-gray-800/50 p-3 text-center">
                <div className="mb-2 h-10 w-10 rounded-full bg-indigo-900/50 p-2 mx-auto" />
                <div className="text-sm font-medium text-white">{platform}</div>
                <div className="mt-1 text-xs text-green-500">Active</div>
              </div>
            ),
          )}
        </div>
      </div>
    ),
  },
]

export function ProductPreview() {
  const [activeTab, setActiveTab] = useState("content-violations")

  return (
    <div className="mx-auto max-w-4xl">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-8 grid w-full grid-cols-2 bg-gray-900/50 p-1 md:grid-cols-4">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="data-[state=active]:bg-indigo-900/50 data-[state=active]:text-white"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {tabs.find((tab) => tab.id === activeTab)?.content}
          </motion.div>
        </AnimatePresence>
      </Tabs>
    </div>
  )
}

