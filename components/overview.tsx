"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Clock, Gauge, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function Overview() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })

  const metrics = [
    {
      icon: Clock,
      value: "8+",
      unit: "hours",
      label: "Saved Weekly",
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      icon: Gauge,
      value: "40%",
      unit: "",
      label: "Task Speed Improvement",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: TrendingUp,
      value: "30%",
      unit: "",
      label: "Revenue Increase",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
  ]

  return (
    <section ref={containerRef} className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            AI is transforming how we work, creating unprecedented opportunities for those who embrace it.
            The future belongs to professionals who can harness these powerful tools.
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6">
            AI expected to automate 30% of work hours by 2030
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {metrics.map((metric, index) => {
            const Icon = metric.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              >
                <Card className="border-2 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-card-hover bg-gradient-card">
                  <CardContent className="p-8 text-center">
                    <motion.div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-xl ${metric.bgColor} mb-4`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon className={`w-8 h-8 ${metric.color}`} />
                    </motion.div>
                    <div className="mb-2">
                      <span className="text-5xl font-bold text-foreground">{metric.value}</span>
                      {metric.unit && (
                        <span className="text-xl font-medium text-muted-foreground ml-1">
                          {metric.unit}
                        </span>
                      )}
                    </div>
                    <p className="text-base font-medium text-muted-foreground">{metric.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
