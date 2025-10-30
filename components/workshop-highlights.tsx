"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Brain, Briefcase, GraduationCap, Shield, Target } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function WorkshopHighlights() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })

  const highlights = [
    {
      title: "AI Fundamentals & Smart Prompting",
      icon: Brain,
      description: "Master the core concepts and techniques",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Career Acceleration & Entrepreneurship",
      icon: Briefcase,
      description: "Leverage AI for professional growth",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      title: "Academic & Professional Efficiency",
      icon: GraduationCap,
      description: "Streamline research and writing tasks",
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      title: "Innovation & Ethical Application",
      icon: Shield,
      description: "Use AI responsibly and creatively",
      color: "text-chart-4",
      bgColor: "bg-chart-4/10",
    },
    {
      title: "Real-World Relevance",
      icon: Target,
      description: "Apply practical solutions immediately",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
  ]

  return (
    <section ref={containerRef} className="py-24 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            What You'll Master
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive training designed to transform your relationship with AI technology
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((highlight, index) => {
            const Icon = highlight.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full border-2 border-transparent hover:border-primary/50 transition-all duration-300 hover:shadow-card-hover">
                  <CardHeader>
                    <motion.div
                      className={`inline-flex items-center justify-center w-14 h-14 rounded-lg ${highlight.bgColor} mb-4`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon className={`w-7 h-7 ${highlight.color}`} />
                    </motion.div>
                    <CardTitle className="text-xl font-bold">{highlight.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{highlight.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
