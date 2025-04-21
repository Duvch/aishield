import { Shield, Scan, FileSearch, Scale, BarChart3, Layers } from "lucide-react"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface FeatureCardProps {
  title: string
  description: string
  icon: string
}

export function FeatureCard({ title, description, icon }: FeatureCardProps) {
  const getIcon = () => {
    switch (icon) {
      case "face-scan":
        return <Scan className="h-10 w-10 text-indigo-400" />
      case "content-scan":
        return <FileSearch className="h-10 w-10 text-violet-400" />
      case "legal":
        return <Scale className="h-10 w-10 text-blue-400" />
      case "monitor":
        return <Layers className="h-10 w-10 text-emerald-400" />
      case "reports":
        return <BarChart3 className="h-10 w-10 text-amber-400" />
      case "shield":
      default:
        return <Shield className="h-10 w-10 text-indigo-400" />
    }
  }

  return (
    <Card className="group overflow-hidden border-gray-800 bg-gray-900/50 transition-all duration-300 hover:border-indigo-500/50 hover:bg-gray-900/80">
      <CardContent className="p-6">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-indigo-950/50 group-hover:bg-indigo-900/50">
          {getIcon()}
        </div>
        <h3 className="mb-2 text-xl font-semibold text-white">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </CardContent>
      <CardFooter className="border-t border-gray-800 bg-gray-900/30 px-6 py-4">
        <Button variant="link" className="px-0 text-indigo-400 hover:text-indigo-300">
          Learn more
        </Button>
      </CardFooter>
    </Card>
  )
}

