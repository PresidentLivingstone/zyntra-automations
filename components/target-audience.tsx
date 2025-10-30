"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { BookOpen, Briefcase, TrendingUp, PenTool, Cpu } from "lucide-react"

export function TargetAudience() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })

  const audiences = [
    { text: "Students & Academics", icon: BookOpen },
    { text: "Entrepreneurs & Business Owners", icon: Briefcase },
    { text: "Professionals & Career Developers", icon: TrendingUp },
    { text: "Content Creators & Marketers", icon: PenTool },
    { text: "Tech Enthusiasts & Innovators", icon: Cpu },
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
            Perfect For
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you're advancing your career, building a business, or pursuing academic excellence
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {audiences.map((audience, index) => {
            const Icon = audience.icon
            return (
              <motion.div
                key={index}
                className="inline-flex items-center gap-3 px-6 py-4 bg-background border-2 border-primary rounded-full hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Icon className="w-5 h-5" />
                <span className="text-base font-semibold">{audience.text}</span>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
