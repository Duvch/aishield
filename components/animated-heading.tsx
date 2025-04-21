"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const headings = ["Protect What You Create.", "Detect. Track. Takedown.", "Your Shield Against AI Misuse."]

export function AnimatedHeading() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % headings.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-[120px] sm:h-[150px]">
      <AnimatePresence mode="wait">
        <motion.h1
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
        >
          {headings[currentIndex]}
        </motion.h1>
      </AnimatePresence>
    </div>
  )
}

