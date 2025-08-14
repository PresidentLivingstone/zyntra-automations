"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { motion, useInView, useAnimation } from "framer-motion"
import { Calendar, ArrowRight, CheckCircle2 } from "lucide-react"

declare global {
  interface Window {
    Calendly: {
      initPopupWidget: (options: { url: string }) => void
    }
  }
}

const ParticleField = () => {
  return (
    <div className="absolute inset-0">
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  )
}

export function CTA() {
  const containerRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.3 })
  const controls = useAnimation()
  const [buttonHovered, setButtonHovered] = useState(false)

  const handleCalendlyClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (typeof window !== "undefined" && window.Calendly) {
      window.Calendly.initPopupWidget({ url: "https://calendly.com/mazvoverelivingstone/30min" })
    }
    return false
  }

  // Update animations when section comes into view
  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  // Magnetic button effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return

    const button = buttonRef.current
    const rect = button.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    // Limit movement range
    const maxMove = 15
    const moveX = (x / rect.width) * maxMove
    const moveY = (y / rect.height) * maxMove

    button.style.transform = `translate(${moveX}px, ${moveY}px)`
  }

  const handleMouseLeave = () => {
    if (!buttonRef.current) return
    buttonRef.current.style.transform = "translate(0, 0)"
    setButtonHovered(false)
  }

  return (
    <section ref={containerRef} id="contact" className="relative py-32 px-6 overflow-hidden">
      {/* Rich background with multiple elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0316] to-[#14052A]"></div>

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-[#A72BFF] blur-[120px] opacity-10"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      <motion.div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[#E94EFF] blur-[100px] opacity-10"
        animate={{
          x: [0, -50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          delay: 2,
        }}
      />

      {/* Particle field effect */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <ParticleField />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid opacity-[0.03]"></div>

      {/* Main content with 3D perspective container */}
      <div className="perspective-[1000px] relative z-10">
        <motion.div
          className="max-w-4xl mx-auto relative z-10 bg-black/30 backdrop-blur-lg rounded-3xl p-10 md:p-16 border border-white/10"
          initial={{ opacity: 0, rotateX: 10, y: 50 }}
          animate={isInView ? { opacity: 1, rotateX: 0, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        >
          <motion.div
            className="text-center"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            initial="hidden"
            animate={controls}
          >
            <motion.h2
              className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] },
                },
              }}
            >
              AI is the Future of Work—{" "}
              <span className="bg-gradient-to-r from-[#A72BFF] to-[#E94EFF] bg-clip-text text-transparent">
                Zimbabwe Shouldn't Be Left Behind
              </span>
            </motion.h2>

            <motion.p
              className="text-xl text-white/80 mb-10 leading-relaxed max-w-3xl mx-auto"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] },
                },
              }}
            >
              We create AI systems designed for African markets, with measurable results and fast implementation.
            </motion.p>

            {/* Key benefits */}
            <motion.div
              className="flex flex-wrap justify-center gap-6 mb-12"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] },
                },
              }}
            >
              {["30-day implementation", "ROI within 90 days", "Local support team"].map((benefit, index) => (
                <div key={index} className="flex items-center text-white/90">
                  <CheckCircle2 className="w-5 h-5 text-[#A72BFF] mr-2" />
                  <span className="font-medium">{benefit}</span>
                </div>
              ))}
            </motion.div>

            {/* Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] },
                },
              }}
            >
              <div
                ref={buttonRef}
                className="relative"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setButtonHovered(true)}
                onMouseLeave={handleMouseLeave}
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-[#A72BFF] to-[#E94EFF] hover:from-[#9020E6] hover:to-[#D63EE6] text-white font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-[#A72BFF]/25 border-0"
                >
                  <a href="" onClick={handleCalendlyClick} className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Book Free Consultation
                    <motion.div animate={buttonHovered ? { x: 5 } : { x: 0 }} transition={{ duration: 0.2 }}>
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </motion.div>
                  </a>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
