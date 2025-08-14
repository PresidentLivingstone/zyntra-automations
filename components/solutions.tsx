"use client"

import { useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion, useInView, AnimatePresence, useAnimation } from "framer-motion"
import { ArrowRight, Lock, Zap, MessageSquare, Share2 } from "lucide-react"
import React from "react" // Import React for useEffect

// Icons for each service type
const serviceIcons = {
  "Autonomous AI Agents": Zap,
  "Workflow Automations": Lock,
  "AI Voice Agents": MessageSquare,
  "Social Media AI Systems": Share2,
}

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  React.useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }

    const listener = () => setMatches(media.matches)
    media.addEventListener("change", listener)

    return () => media.removeEventListener("change", listener)
  }, [matches, query])

  return matches
}

export function Solutions() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.2 })
  const controls = useAnimation()
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  // Services data with additional fields for rich interactions
  const services = [
    {
      title: "Autonomous AI Agents",
      description:
        "Digital teammates that work 24/7. Handling sales leads, tracking inventory, and responding to customer requests without supervision. Perfect for retail, logistics, and service industries.",
      features: ["24/7 Operation", "Self-Learning", "Task Coordination", "Custom Logic"],
      gradientColors: ["#A72BFF", "#E94EFF"],
    },
    {
      title: "Workflow Automations",
      description:
        "Automate admin tasks like financial reporting, inventory updates, and customer follow-ups to boost productivity without extra hires.",
      features: ["Process Optimization", "Data Syncing", "Scheduled Tasks", "Error Detection"],
      gradientColors: ["#E94EFF", "#FF3DD9"],
    },
    {
      title: "AI Voice Agents",
      description:
        "Voice assistants that handle calls, reminders, and lead qualification in English making technology feel personal.",
      features: ["Multi-Lingual Support", "Call Routing", "Sentiment Analysis", "Voice Authentication"],
      gradientColors: ["#FF3DD9", "#FF57B9"],
    },
    {
      title: "Social Media AI Systems",
      description:
        "Consistent social posting, customer engagement, and lead generation for WhatsApp, Facebook, and Instagram - the platforms where most Zimbabweans interact daily.",
      features: ["Content Generation", "Engagement Automation", "Lead Capture", "Analytics"],
      gradientColors: ["#FF57B9", "#A72BFF"],
    },
  ]

  if (isInView && !controls.isAnimating) {
    controls.start("visible")
  }

  // Handle card hover
  const handleCardHover = (index: number | null) => {
    setHoveredCard(index)
  }

  // Get icon component for a service
  const getIconComponent = (title: string) => {
    const IconComponent = serviceIcons[title as keyof typeof serviceIcons]
    return IconComponent || Zap
  }

  return (
    <section
      id="services"
      className="relative py-32 px-6 overflow-hidden bg-gradient-to-b from-background to-[#0F051C]"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-[#A72BFF] blur-[150px] opacity-10"
          animate={{
            x: [50, -50, 50],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-[#FF3DD9] blur-[120px] opacity-10"
          animate={{
            x: [-50, 50, -50],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 2,
          }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid opacity-[0.03]"></div>

      <div className="max-w-6xl mx-auto relative" ref={containerRef}>
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse mr-2"></span>
            <span className="text-primary font-medium tracking-wide">Solutions</span>
          </div>

          <h2 className="text-4xl lg:text-6xl font-bold mb-6 tracking-tight">
            AI Solutions Built for{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-gradient-neon animate-gradient-shift">Local Impact</span>
              <motion.span
                className="absolute -bottom-2 left-0 right-0 h-[10px] bg-gradient-neon opacity-20 rounded-full blur-sm"
                initial={{ width: "0%" }}
                animate={isInView ? { width: "100%" } : {}}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </span>
          </h2>

          <motion.p
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            From Harare to Bulawayo, we build AI systems that take repetitive work off your hands — so you can focus on
            growth. As a start-up ourselves, we understand the importance of working smarter, not harder.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          initial="hidden"
          animate={controls}
        >
          {services.map((service, index) => {
            const IconComponent = getIconComponent(service.title)
            const isHovered = hoveredCard === index

            return (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.7,
                      ease: [0.19, 1, 0.22, 1],
                    },
                  },
                }}
                onMouseEnter={() => handleCardHover(index)}
                onMouseLeave={() => handleCardHover(null)}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                className="h-full"
              >
                <Card className="border border-white/10 shadow-lg overflow-hidden h-full bg-black/20 backdrop-blur-sm group transition-all duration-500">
                  {/* Gradient border effect */}
                  <div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}
                    style={{
                      background: `linear-gradient(60deg, ${service.gradientColors[0]}22, ${service.gradientColors[1]}22)`,
                      borderRadius: "inherit",
                    }}
                  />

                  {/* Card Content */}
                  <div className="relative z-10">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between mb-3">
                        <div
                          className="p-3 rounded-lg"
                          style={{
                            background: `linear-gradient(135deg, ${service.gradientColors[0]}22, ${service.gradientColors[1]}44)`,
                          }}
                        >
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>

                        <motion.div
                          className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5"
                          whileHover={{
                            rotate: 90,
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <ArrowRight className="w-5 h-5 text-white/70" />
                        </motion.div>
                      </div>

                      <CardTitle className="text-2xl font-bold text-white mb-2">{service.title}</CardTitle>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <CardDescription className="text-muted-foreground text-base leading-relaxed mb-6">
                        {service.description}
                      </CardDescription>

                      {/* Features List - Shows on hover on desktop, always visible on mobile */}
                      <AnimatePresence>
                        {(isHovered || isMobile) && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="border-t border-white/10 pt-5 mt-2">
                              <div className="flex flex-wrap gap-2">
                                {service.features.map((feature, i) => (
                                  <motion.span
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="px-3 py-1 text-xs rounded-full bg-white/10 text-white/70"
                                  >
                                    {feature}
                                  </motion.span>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </div>

                  {/* Animated gradient overlay on hover */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{
                      background: `linear-gradient(60deg, ${service.gradientColors[0]}00, ${service.gradientColors[1]}11)`,
                      borderRadius: "inherit",
                    }}
                    animate={{
                      background: isHovered
                        ? [
                            `linear-gradient(60deg, ${service.gradientColors[0]}00, ${service.gradientColors[1]}11)`,
                            `linear-gradient(120deg, ${service.gradientColors[0]}11, ${service.gradientColors[1]}22)`,
                            `linear-gradient(180deg, ${service.gradientColors[0]}22, ${service.gradientColors[1]}11)`,
                            `linear-gradient(240deg, ${service.gradientColors[0]}11, ${service.gradientColors[1]}00)`,
                            `linear-gradient(300deg, ${service.gradientColors[0]}00, ${service.gradientColors[1]}11)`,
                          ]
                        : `linear-gradient(60deg, ${service.gradientColors[0]}00, ${service.gradientColors[1]}11)`,
                    }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    }}
                  />
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <a
            href="#process"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById("process")?.scrollIntoView({ behavior: "smooth" })
            }}
            className="inline-flex items-center px-8 py-3 rounded-full bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 transition-all duration-300 group"
          >
            View all solutions
            <motion.div initial={{ x: 0 }} whileHover={{ x: 5 }} className="ml-2">
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
