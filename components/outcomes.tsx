"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Code, Lightbulb, CheckCircle, Award } from "lucide-react"

export function Outcomes() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })

  const outcomes = [
    {
      icon: Code,
      title: "Practical Skills",
      description: "Hands-on experience with AI tools",
      color: "bg-primary",
    },
    {
      icon: Lightbulb,
      title: "Strategic Insight",
      description: "Understanding AI's impact on business and career",
      color: "bg-secondary",
    },
    {
      icon: CheckCircle,
      title: "Responsible AI Know-How",
      description: "Ethical considerations and best practices",
      color: "bg-accent",
    },
    {
      icon: Award,
      title: "Certificate of Participation",
      description: "Official recognition of completion",
      color: "bg-chart-4",
    },
  ]

  return (
    <section ref={containerRef} className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Your Transformation Journey
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Walk away with tangible skills, strategic knowledge, and a certificate that validates your expertise.
            </p>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {outcomes.map((outcome, index) => {
              const Icon = outcome.icon
              return (
                <motion.div
                  key={index}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                >
                  <motion.div
                    className={`flex-shrink-0 w-12 h-12 ${outcome.color} rounded-lg flex items-center justify-center`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{outcome.title}</h3>
                    <p className="text-muted-foreground">{outcome.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
