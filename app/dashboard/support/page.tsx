"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { FileQuestion, HelpCircle, MessageSquare, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

// Mock data for support tickets
const supportTickets = [
  {
    id: "T-1234",
    subject: "Issue with takedown request",
    status: "Open",
    date: "2025-04-05",
    messages: [
      {
        sender: "You",
        message: "I submitted a takedown request but it's been pending for over 48 hours. Can you help?",
        timestamp: "2025-04-05 14:32",
      },
      {
        sender: "Support",
        message:
          "Thank you for reaching out. I'll check the status of your takedown request and get back to you shortly.",
        timestamp: "2025-04-05 15:10",
      },
    ],
  },
  {
    id: "T-1189",
    subject: "AI Bot configuration help",
    status: "Closed",
    date: "2025-03-28",
    messages: [
      {
        sender: "You",
        message: "I need help configuring my AI Bot to scan specific platforms only.",
        timestamp: "2025-03-28 09:15",
      },
      {
        sender: "Support",
        message:
          "I'd be happy to help you configure your AI Bot. You can select specific platforms in the AI Bot settings page under 'Platforms to Scan'.",
        timestamp: "2025-03-28 09:45",
      },
      {
        sender: "You",
        message:
          "Thank you, I found it! One more question - can I set different scan schedules for different platforms?",
        timestamp: "2025-03-28 10:02",
      },
      {
        sender: "Support",
        message:
          "Currently, the schedule applies to all selected platforms. We're working on platform-specific scheduling for a future update. Is there anything else I can help with?",
        timestamp: "2025-03-28 10:15",
      },
      {
        sender: "You",
        message: "That's all, thank you for your help!",
        timestamp: "2025-03-28 10:20",
      },
      {
        sender: "Support",
        message:
          "You're welcome! If you have any other questions, feel free to reach out. I'm closing this ticket, but you can always reference it or create a new one if needed.",
        timestamp: "2025-03-28 10:25",
      },
    ],
  },
]

// Mock data for FAQs
const faqs = [
  {
    question: "How does AI Shield detect deepfakes?",
    answer:
      "AI Shield uses advanced machine learning algorithms to analyze visual and audio patterns in content across platforms. Our technology can detect manipulated media by identifying inconsistencies and artifacts that are typically present in AI-generated or manipulated content.",
  },
  {
    question: "What happens after I request a takedown?",
    answer:
      "After you request a takedown, our team reviews your request and prepares the necessary DMCA documentation. We then submit this to the platform where the content was found. The platform typically reviews the request within 1-7 days, after which they will either remove the content or provide a reason for rejection.",
  },
  {
    question: "How often does the AI Bot scan for content?",
    answer:
      "The AI Bot can be configured to scan daily, weekly, or monthly, depending on your preference. Pro users can set specific times for these scans to occur. Each scan covers all the platforms you've selected in your settings.",
  },
  {
    question: "Can I use AI Shield for multiple people or brands?",
    answer:
      "Yes, you can protect multiple identities or brands with a single account. Simply create different scan profiles for each person or brand you want to protect. Premium and Pro plans allow for more profiles than the Demo plan.",
  },
  {
    question: "What's the difference between manual scans and AI Bot scans?",
    answer:
      "Manual scans are initiated by you and require approval from our team before execution. AI Bot scans are automated based on your schedule and don't require approval for each scan. Both types use the same detection technology, but AI Bot scans (Pro plan only) can also automatically file takedown requests.",
  },
  {
    question: "How do I know if a takedown was successful?",
    answer:
      "You'll receive a notification when the status of your takedown request changes. You can also check the status in the Takedown Requests section of your dashboard. Successful takedowns will be marked as 'Success' and include documentation you can download for your records.",
  },
]

export default function SupportPage() {
  const [activeTab, setActiveTab] = useState("contact")
  const [activeTicket, setActiveTicket] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [newTicket, setNewTicket] = useState({
    subject: "",
    category: "",
    message: "",
  })

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Support Ticket Created",
        description: "Your support ticket has been submitted. We'll respond shortly.",
      })
      setNewTicket({
        subject: "",
        category: "",
        message: "",
      })
    }, 1500)
  }

  const handleSendMessage = (ticketId: string) => {
    if (!newMessage.trim()) return

    // In a real app, you would send this to your API
    toast({
      title: "Message Sent",
      description: "Your message has been sent to support.",
    })

    setNewMessage("")
  }

  const selectedTicket = supportTickets.find((ticket) => ticket.id === activeTicket)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Contact Support</h1>
        <p className="text-muted-foreground">Get help with your account or content protection</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="contact">Contact Us</TabsTrigger>
          <TabsTrigger value="tickets">Support Tickets</TabsTrigger>
          <TabsTrigger value="faq">FAQs</TabsTrigger>
        </TabsList>

        {/* Contact Form */}
        <TabsContent value="contact" className="space-y-6">
          <Card>
            <form onSubmit={handleSubmitTicket}>
              <CardHeader>
                <CardTitle>Submit a Support Request</CardTitle>
                <CardDescription>Our team will respond to your inquiry within 24 hours</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="Brief description of your issue"
                    value={newTicket.subject}
                    onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={newTicket.category}
                    onValueChange={(value) => setNewTicket({ ...newTicket, category: value })}
                    required
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="account">Account Issues</SelectItem>
                      <SelectItem value="billing">Billing & Subscription</SelectItem>
                      <SelectItem value="scan">Scan Requests</SelectItem>
                      <SelectItem value="takedown">Takedown Requests</SelectItem>
                      <SelectItem value="bot">AI Bot</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Describe your issue in detail"
                    rows={6}
                    value={newTicket.message}
                    onChange={(e) => setNewTicket({ ...newTicket, message: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="attachment">Attachment (optional)</Label>
                  <Input id="attachment" type="file" />
                  <p className="text-xs text-muted-foreground">Max file size: 10MB. Supported formats: JPG, PNG, PDF</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <motion.div
                        className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      />
                      Submitting...
                    </>
                  ) : (
                    "Submit Support Request"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Live Chat
                </CardTitle>
                <CardDescription>Chat with our support team in real-time</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Our live chat support is available Monday through Friday, 9am to 5pm EST.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Start Live Chat
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5" />
                  Help Center
                </CardTitle>
                <CardDescription>Browse our knowledge base</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Find answers to common questions, tutorials, and troubleshooting guides.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Visit Help Center
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* Support Tickets */}
        <TabsContent value="tickets" className="space-y-6">
          {activeTicket ? (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>{selectedTicket?.subject}</CardTitle>
                  <CardDescription>
                    Ticket ID: {selectedTicket?.id} • {selectedTicket?.status} • {selectedTicket?.date}
                  </CardDescription>
                </div>
                <Button variant="ghost" onClick={() => setActiveTicket(null)}>
                  Back to Tickets
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  {selectedTicket?.messages.map((message, index) => (
                    <div key={index} className={`flex ${message.sender === "You" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[80%] rounded-lg p-4 ${
                          message.sender === "You" ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        <div className="mb-1 flex items-center justify-between gap-4">
                          <span className="text-xs font-medium">{message.sender}</span>
                          <span className="text-xs opacity-70">{message.timestamp.split(" ")[1]}</span>
                        </div>
                        <p className="text-sm">{message.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                {selectedTicket?.status === "Open" ? (
                  <div className="flex w-full items-center gap-2">
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <Button
                      type="button"
                      size="icon"
                      onClick={() => handleSendMessage(selectedTicket.id)}
                      disabled={!newMessage.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="rounded-lg bg-muted p-4 text-center text-sm">
                    This ticket is closed. Please create a new ticket if you need further assistance.
                  </div>
                )}
              </CardFooter>
            </Card>
          ) : (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Your Support Tickets</CardTitle>
                  <CardDescription>View and manage your support conversations</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  {supportTickets.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-8 text-center">
                      <div className="rounded-full bg-muted p-3">
                        <FileQuestion className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <h3 className="mt-4 text-lg font-medium">No support tickets</h3>
                      <p className="mt-2 text-sm text-muted-foreground">You haven't created any support tickets yet</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="px-4 py-3 text-left text-sm font-medium">Ticket ID</th>
                            <th className="px-4 py-3 text-left text-sm font-medium">Subject</th>
                            <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                            <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                            <th className="px-4 py-3 text-left text-sm font-medium"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {supportTickets.map((ticket) => (
                            <tr key={ticket.id} className="border-b">
                              <td className="px-4 py-3 text-sm font-mono">{ticket.id}</td>
                              <td className="px-4 py-3 text-sm">{ticket.subject}</td>
                              <td className="px-4 py-3 text-sm">
                                <span
                                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                    ticket.status === "Open"
                                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                      : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
                                  }`}
                                >
                                  {ticket.status}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-sm">{ticket.date}</td>
                              <td className="px-4 py-3 text-sm">
                                <Button variant="ghost" size="sm" onClick={() => setActiveTicket(ticket.id)}>
                                  View
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="border-t p-4">
                  <Button variant="outline" className="w-full" onClick={() => setActiveTab("contact")}>
                    Create New Ticket
                  </Button>
                </CardFooter>
              </Card>
            </>
          )}
        </TabsContent>

        {/* FAQs */}
        <TabsContent value="faq" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Find answers to common questions about AI Shield</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="space-y-2">
                  <h3 className="text-base font-medium">{faq.question}</h3>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                  {index < faqs.length - 1 && <Separator className="my-4" />}
                </div>
              ))}
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <p className="text-sm text-center text-muted-foreground">Didn't find what you're looking for?</p>
              <Button variant="outline" className="w-full" onClick={() => setActiveTab("contact")}>
                Contact Support
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

