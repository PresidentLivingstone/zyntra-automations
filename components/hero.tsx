"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { motion, useAnimation, useScroll, useTransform } from "framer-motion"
import { TrendingUp, Zap, Rocket } from "lucide-react"

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const textControls = useAnimation()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    const sequence = async () => {
      await textControls.start("visible")
      setIsLoaded(true)
    }
    sequence()
  }, [textControls])

  const keyStats = [
    { value: "87%", label: "Adopting AI", icon: TrendingUp },
    { value: "40%", label: "Tasks Automated", icon: Zap },
    { value: "30%", label: "Faster Results", icon: Rocket },
  ]

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden pt-20 bg-gradient-hero"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 to-gray-900/40" />

      <div className="absolute inset-0">
        <motion.div
          className="absolute top-[10%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-white/5 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-[10%] left-[10%] w-[30vw] h-[30vw] rounded-full bg-white/5 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 2,
          }}
        />
      </div>

      <motion.div
        className="relative z-10 flex items-center justify-center min-h-screen px-6"
        style={{ y, opacity }}
      >
        <div className="text-center max-w-5xl mx-auto py-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-6"
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse mr-2" />
              <span className="text-white font-medium text-sm md:text-base tracking-wide">
                Harness the Future Zimbabwe 2025
              </span>
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.08,
                },
              },
            }}
          >
            <motion.span
              className="block text-white"
              variants={{
                hidden: { y: 40, opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: { duration: 0.6 },
                },
              }}
            >
              Master Generative AI
            </motion.span>
            <motion.span
              className="block text-white"
              variants={{
                hidden: { y: 40, opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: { duration: 0.6 },
                },
              }}
            >
              in{" "}
              <span className="text-gradient-hero font-extrabold">
                3 Hours
              </span>
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Work Smarter, Create Faster, Innovate Boldly
          </motion.p>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {keyStats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={index}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
                  transition={{ duration: 0.3 }}
                >
                  <Icon className="w-6 h-6 text-accent mb-2 mx-auto" />
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </motion.div>
              )
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <Button
              size="lg"
              className="bg-gradient-cta hover:opacity-90 text-white px-10 py-7 text-lg font-semibold shadow-glow-primary rounded-full border-0"
              onClick={() => {
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              Register Now
            </Button>
          </motion.div>

          {isLoaded && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="mt-12"
            >
              <p className="text-white/70 text-sm">
                Join professionals transforming their careers with AI
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <motion.div
          className="w-8 h-12 rounded-full border-2 border-white/30 flex justify-center p-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" }}
        >
          <motion.div className="w-1 h-3 bg-white rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}
