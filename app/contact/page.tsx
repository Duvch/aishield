"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ArrowLeft, Check } from "lucide-react"
import Link from "next/link"
import 'dotenv/config';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function ContactPage() {
  const [glow, setGlow] = useState(true);
  const [selectedInterest, setSelectedInterest] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setGlow(false), 3000); // glow lasts 3 seconds
    return () => clearTimeout(timer);
  }, []);
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    // In a real application, you would handle the form submission here
    const response = await fetch(`https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMID}`, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });
    setIsSubmitted(true)
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-950 to-indigo-950">
      <Navbar />
      <main className="relative z-10 pt-20">
        <section className="px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16">
              <Link href="/">
                <Button variant="ghost" className="mb-4 text-gray-400 hover:text-white">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
              <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">Contact Us</h1>
              <p className="max-w-2xl text-gray-400">
                Get in touch with our team to learn more about AI Shield and how we can help protect your digital
                content.
              </p>
              <Button className={`mt-5 px-6 py-3 transition-all ${glow ? "button-glow" : ""}`}>
                Book a Demo
              </Button>
            </div>
            <div className="mb-2 block text-lg font-medium text-gray-300">
              **Note: If you didn't see your meet time in book a demo page pls consider reaching out to us via below mentioning your time or sending candley or cal link**
            </div>

            <div className="grid gap-12 md:grid-cols-2">
              <div>
                {isSubmitted ? (
                  <div className="rounded-lg border border-green-500 bg-green-900/20 p-8 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-900">
                      <Check className="h-6 w-6 text-green-400" />
                    </div>
                    <h2 className="mb-2 text-2xl font-bold text-white">Thank You!</h2>
                    <p className="text-gray-300">
                      Your message has been received. We'll get back to you within 24 hours.
                    </p>
                    <Button className="mt-6 bg-green-600 hover:bg-green-700" onClick={() => setIsSubmitted(false)}>
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
                    <h2 className="mb-6 text-2xl font-bold text-white">Send Us a Message</h2>
                    <div className="mb-4 grid gap-4 md:grid-cols-2">
                      <div>
                        <label htmlFor="firstName" className="mb-2 block text-sm font-medium text-gray-300">
                          First Name
                        </label>
                        <Input
                          id="firstName"
                          name="firstName"
                          placeholder="John"
                          required
                          className="border-gray-700 bg-gray-800/50 text-white placeholder:text-gray-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="mb-2 block text-sm font-medium text-gray-300">
                          Last Name
                        </label>
                        <Input
                          id="lastName"
                          name="lastName"
                          placeholder="Doe"
                          required
                          className="border-gray-700 bg-gray-800/50 text-white placeholder:text-gray-500"
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-300">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        required
                        className="border-gray-700 bg-gray-800/50 text-white placeholder:text-gray-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-300">
                        Phone (Optional)
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        placeholder="+91 98765 43210"
                        className="border-gray-700 bg-gray-800/50 text-white placeholder:text-gray-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="interest" className="mb-2 block text-sm font-medium text-gray-300">
                        I'm interested in
                      </label>
                      <select
                        name="interest"
                        required
                        className="w-full border-gray-700 bg-gray-800/50 text-white px-4 py-2 rounded"
                      >
                        <option value="">Select an option</option>
                        <option value="starter">Starter Plan</option>
                        <option value="pro">Pro Plan</option>
                        <option value="enterprise">Enterprise Plan</option>
                        <option value="demo">Product Demo</option>
                        <option value="other">Other</option>
                      </select>
                      
                      <input type="hidden" name="interest" value={selectedInterest} />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-300">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us about your needs..."
                        required
                        className="min-h-[120px] border-gray-700 bg-gray-800/50 text-white placeholder:text-gray-500"
                      />
                    </div>
                    <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">
                      Send Message
                    </Button>
                  </form>
                )}
              </div>

              {/* <div>
                <div className="mb-8 rounded-lg border border-gray-800 bg-gray-900/50 p-6">
                  <h2 className="mb-4 text-2xl font-bold text-white">Contact Information</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium text-white">Email</h3>
                      <p className="text-indigo-400">contact@aicover.ai</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">Phone</h3>
                      <p className="text-indigo-400">+91 98765 43210</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">Address</h3>
                      <p className="text-gray-400">
                        123 Tech Park, Cyber City
                        <br />
                        Bengaluru, Karnataka 560100
                        <br />
                        India
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
                  <h2 className="mb-4 text-2xl font-bold text-white">Office Hours</h2>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Monday - Friday</span>
                      <span className="text-white">9:00 AM - 6:00 PM IST</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Saturday</span>
                      <span className="text-white">10:00 AM - 2:00 PM IST</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Sunday</span>
                      <span className="text-white">Closed</span>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

