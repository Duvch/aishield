import { Check, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface PricingCardProps {
  title: string
  price: string
  description: string
  features: string[]
  cta: string
  featured?: boolean
  contactForDetails?: boolean
}

export function PricingCard({
  title,
  price,
  description,
  features,
  cta,
  featured = false,
  contactForDetails = false,
}: PricingCardProps) {
  return (
    <Card
      className={cn(
        "relative overflow-hidden border-gray-800 transition-all duration-200",
        featured
          ? "border-indigo-500 bg-gradient-to-b from-indigo-900/50 to-gray-900 shadow-lg shadow-indigo-900/20"
          : "bg-gray-900/50 hover:border-gray-700",
      )}
    >
      {featured && (
        <div className="absolute -right-12 top-7 rotate-45 bg-indigo-600 px-12 py-1 text-xs font-medium text-white">
          Popular
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-xl text-white">{title}</CardTitle>
        <div className="mt-4 flex items-baseline text-white">
          <span className="text-4xl font-extrabold tracking-tight">{price}</span>
          {price !== "Custom" && <span className="ml-1 text-sm font-medium text-gray-400">/month</span>}
        </div>
        <CardDescription className="pt-4">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <div
                className={cn(
                  "mr-2 mt-0.5 flex h-5 w-5 items-center justify-center rounded-full",
                  featured ? "bg-indigo-500" : "bg-gray-800",
                )}
              >
                <Check className="h-3 w-3 text-white" />
              </div>
              <span className="text-sm text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>

        {contactForDetails && (
          <div className="mt-4 flex items-start rounded-md bg-indigo-900/30 p-3">
            <Info className="mr-2 h-5 w-5 flex-shrink-0 text-indigo-400" />
            <p className="text-xs text-indigo-200">
              Contact us for detailed pricing information tailored to your specific requirements.
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Link href="/contact" className="w-full">
          <Button
            className={cn(
              "w-full",
              featured ? "bg-indigo-600 text-white hover:bg-indigo-700" : "bg-gray-800 text-white hover:bg-gray-700",
            )}
          >
            {cta}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

