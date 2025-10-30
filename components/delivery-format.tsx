"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Clock, Video, Users } from "lucide-react"

export function DeliveryFormat() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })

  const details = [
    {
      icon: Clock,
      value: "3 Hours",
      label: "Duration",
      color: "text-accent",
    },
    {
      icon: Video,
      value: "Interactive",
      label: "Live Demos & Exercises",
      color: "text-secondary",
    },
    {
      icon: Users,
      value: "20-50",
      label: "Participants",
      color: "text-accent",
    },
  ]

  return (
    <section ref={containerRef} className="py-24 px-6 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/20" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Workshop Details
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {details.map((detail, index) => {
            const Icon = detail.icon
            return (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center"
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
              >
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-xl mb-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Icon className="w-8 h-8 text-white" />
                </motion.div>
                <div className="text-3xl font-bold text-white mb-2">{detail.value}</div>
                <div className="text-white/90 font-medium">{detail.label}</div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
