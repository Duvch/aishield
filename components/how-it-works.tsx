"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Eye, Flag, FileCheck, BarChart, Mail } from "lucide-react"

const steps = [
  {
    title: "Scan",
    description: "AI crawls social platforms and websites",
    icon: Eye,
    color: "bg-indigo-500",
  },
  {
    title: "Detect",
    description: "Flags unauthorized content or deepfakes",
    icon: Flag,
    color: "bg-violet-500",
  },
  {
    title: "File Takedown",
    description: "Automatically files takedown requests",
    icon: FileCheck,
    color: "bg-blue-500",
  },
  {
    title: "Dashboard",
    description: "User sees all activity in a clean dashboard",
    icon: BarChart,
    color: "bg-emerald-500",
  },
  {
    title: "Get Reports",
    description: "Weekly emails or exports of protection performance",
    icon: Mail,
    color: "bg-amber-500",
  },
]

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.2 })

  return (
    <div ref={containerRef} className="relative mx-auto max-w-4xl">
      {/* Timeline line */}
      <div className="absolute left-4 top-0 h-full w-0.5 bg-gradient-to-b from-indigo-500 via-violet-500 to-blue-500 md:left-1/2 md:-ml-0.5" />

      {/* Steps */}
      <div className="space-y-12">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="relative"
          >
            <div className={`md:flex ${index % 2 === 0 ? "" : "md:flex-row-reverse"}`}>
              {/* Circle on timeline */}
              <div className="absolute left-4 top-4 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border-4 border-gray-900 bg-gray-800 md:left-1/2">
                <div className={`h-3 w-3 rounded-full ${step.color}`} />
              </div>

              {/* Content */}
              <div className="ml-12 md:ml-0 md:w-1/2 md:px-8">
                <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6 shadow-lg">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-800">
                    <step.icon className={`h-6 w-6 text-${step.color.split("-")[1]}-400`} />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-white">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

