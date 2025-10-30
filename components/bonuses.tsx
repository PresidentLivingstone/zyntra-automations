"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { FileText, Zap, Target, Package } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function Bonuses() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })

  const bonuses = [
    {
      title: "Prompt Engineering Frameworks",
      icon: FileText,
      color: "text-accent",
      badge: null,
    },
    {
      title: "10 ChatGPT Cheat Codes",
      icon: Zap,
      color: "text-primary",
      badge: "Popular",
    },
    {
      title: "Prompt Strategies for Professional Impact",
      icon: Target,
      color: "text-secondary",
      badge: null,
    },
    {
      title: "Ultimate AI Tools Handbook",
      subtitle: "100+ Curated Tools",
      icon: Package,
      color: "text-chart-4",
      badge: "Comprehensive",
    },
  ]

  return (
    <section ref={containerRef} className="py-24 px-6 bg-gradient-accent relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-white/80 text-sm uppercase tracking-wider mb-4">Exclusive</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Workshop Bonuses
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Every participant receives exclusive resources to accelerate their AI journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bonuses.map((bonus, index) => {
            const Icon = bonus.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full border-3 border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 bg-white shadow-xl">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <motion.div
                        className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </motion.div>
                      {bonus.badge && (
                        <span className="px-3 py-1 bg-primary text-white text-xs font-semibold rounded-full">
                          {bonus.badge}
                        </span>
                      )}
                    </div>
                    <CardTitle className="text-2xl font-bold text-foreground">
                      {bonus.title}
                    </CardTitle>
                    {bonus.subtitle && (
                      <p className="text-muted-foreground font-medium mt-2">{bonus.subtitle}</p>
                    )}
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Instantly applicable resources to enhance your AI capabilities
                    </p>
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
