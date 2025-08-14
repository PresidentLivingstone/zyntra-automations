"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { motion, useAnimation, useScroll, useTransform } from "framer-motion"
import { useMagneticHover } from "@/hooks/use-magnetic-hover"

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const button1Ref = useRef<HTMLDivElement>(null)
  const button2Ref = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  // Magnetic button effects
  const { magnify: magnifyButton1 } = useMagneticHover(button1Ref, 0.5)
  const { magnify: magnifyButton2 } = useMagneticHover(button2Ref, 0.8)

  // Text animation controls
  const textControls = useAnimation()

  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Text gradient animation effect
  const [gradientPosition, setGradientPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    // Handle text gradient following mouse
    const handleMouseMove = (e: MouseEvent) => {
      if (titleRef.current) {
        const rect = titleRef.current.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        setGradientPosition({ x, y })
      }
    }

    // Trigger entrance animations
    const sequence = async () => {
      await textControls.start("visible")
      setIsLoaded(true)
    }

    window.addEventListener("mousemove", handleMouseMove)
    sequence()

    // Initialize WebGL particles
    initParticleSystem()

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [textControls])

  // WebGL particles system
  const initParticleSystem = () => {
    // This would be implemented using Three.js or Pixi.js
    // For brevity, I'm just including the function signature
    // In a real implementation, this would create an interactive
    // particle system that responds to user movement
  }

  return (
    <section ref={containerRef} className="relative min-h-[100vh] overflow-hidden pt-0 bg-gradient-dark">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* Dynamic gradient overlay */}
        <div
          className="absolute inset-0 bg-gradient-radial-glow opacity-70"
          style={{
            background: `radial-gradient(circle at ${gradientPosition.x}% ${gradientPosition.y}%, 
                        rgba(167, 43, 255, 0.15) 0%, 
                        rgba(233, 78, 255, 0.1) 30%, 
                        transparent 70%)`,
          }}
        />

        {/* WebGL Canvas for particles */}
        <canvas id="particles-canvas" className="absolute inset-0 w-full h-full" />

        {/* Animated morphing shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <motion.div
            className="absolute top-[10%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-primary/5 mix-blend-screen"
            animate={{
              borderRadius: ["60% 40% 30% 70% / 60% 30% 70% 40%", "30% 60% 70% 40% / 50% 60% 30% 60%"],
              scale: [1, 1.05, 1],
              x: [0, 20, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />

          <motion.div
            className="absolute bottom-[10%] left-[10%] w-[30vw] h-[30vw] rounded-full bg-secondary/5 mix-blend-screen"
            animate={{
              borderRadius: ["30% 60% 70% 40% / 50% 60% 30% 60%", "60% 40% 30% 70% / 60% 30% 70% 40%"],
              scale: [1, 1.1, 1],
              x: [0, -20, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 15,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: 2,
            }}
          />

          <motion.div
            className="absolute top-[40%] left-[30%] w-[20vw] h-[20vw] rounded-full bg-accent/5 mix-blend-screen"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: 1,
            }}
          />
        </div>

        {/* Grid lines */}
        <div className="absolute inset-0 bg-grid opacity-[0.03]"></div>

        {/* Subtle noise texture */}
        <div className="absolute inset-0 opacity-[0.015]">
          <svg width="100%" height="100%">
            <filter id="noise">
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noise)" />
          </svg>
        </div>
      </div>

      {/* Hero content */}
      <motion.div
        className="relative z-10 flex items-center justify-center min-h-[100vh] px-6 pt-0"
        style={{ y, opacity }}
      >
        <div className="text-center max-w-5xl mx-auto py-16">
          {/* Animated brand tag */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
            className="mb-6"
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse mr-2"></span>
              <span className="text-primary font-medium text-lg tracking-wide">Zyntra Automations</span>
            </span>
          </motion.div>

          <motion.h1
            ref={titleRef}
            className="text-5xl lg:text-7xl xl:text-8xl font-bold mb-8 leading-tight tracking-tight"
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
              className="inline-block"
              variants={{
                hidden: { y: 40, opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] },
                },
              }}
            >
              The&nbsp;
            </motion.span>
            <motion.span
              className="inline-block text-gradient-neon animate-gradient-shift"
              variants={{
                hidden: { y: 40, opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] },
                },
              }}
            >
              Future,&nbsp;
            </motion.span>
            <br className="hidden md:block" />
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: 40, opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] },
                },
              }}
            >
              On&nbsp;
            </motion.span>
            <motion.span
              className="inline-block text-gradient-neon animate-gradient-shift"
              variants={{
                hidden: { y: 40, opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] },
                },
              }}
            >
              Autopilot.
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-xl lg:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.19, 1, 0.22, 1] }}
          >
            We're a Zimbabwean start-up helping local businesses transform through AI automation.
            <span className="hidden md:inline">
              {" "}
              From saving time to cutting costs to scaling faster, our systems deliver real impact.
            </span>
          </motion.p>

          {/* Call to action buttons with magnetic effect */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.19, 1, 0.22, 1] }}
          >
            <motion.div ref={button1Ref} style={magnifyButton1} className="relative">
              <a
                href="#process"
                className="block"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById("process")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="group relative border-2 border-primary/30 text-white hover:bg-transparent px-8 py-6 text-lg font-semibold overflow-hidden bg-transparent"
                >
                  <span className="relative z-10">Explore Solutions</span>
                  <span className="absolute inset-0 bg-gradient-neon opacity-0 group-hover:opacity-20 transition-opacity duration-500"></span>
                </Button>
              </a>
            </motion.div>

            <motion.div ref={button2Ref} style={magnifyButton2} className="relative">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  if (typeof window !== "undefined" && window.Calendly) {
                    window.Calendly.initPopupWidget({
                      url: "https://calendly.com/mazvoverelivingstone/30min",
                    })
                  }
                }}
                className="block"
              >
                <Button
                  size="lg"
                  className="group relative bg-gradient-neon hover:opacity-90 text-white px-8 py-6 text-lg font-semibold shadow-glow overflow-hidden border-0"
                >
                  <span className="relative z-10">Book a Free Consultation</span>
                  <motion.span
                    className="absolute inset-0 bg-white mix-blend-overlay"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  />
                </Button>
              </a>
            </motion.div>
          </motion.div>

          {isLoaded && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="mt-16 flex flex-col items-center"
            >
              <p className="text-muted-foreground text-sm uppercase tracking-widest mb-4">
                Trusted by 120+ Zimbabwean Businesses
              </p>
              <div className="flex flex-wrap justify-center gap-6 opacity-70">
                {/* Company logos would go here */}
                <div className="h-8 w-24 bg-white/10 rounded-md backdrop-blur-sm"></div>
                <div className="h-8 w-32 bg-white/10 rounded-md backdrop-blur-sm"></div>
                <div className="h-8 w-28 bg-white/10 rounded-md backdrop-blur-sm"></div>
                <div className="h-8 w-24 bg-white/10 rounded-md backdrop-blur-sm"></div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <motion.div
          className="w-8 h-12 rounded-full border-2 border-white/20 flex justify-center p-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" }}
        >
          <motion.div className="w-1 h-3 bg-primary rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}

// CSS for grid background - add to your globals.css
// .bg-grid {
//   background-size: 40px 40px;
//   background-image:
//     linear-gradient(to right, rgba(167, 43, 255, 0.05) 1px, transparent 1px),
//     linear-gradient(to bottom, rgba(167, 43, 255, 0.05) 1px, transparent 1px);
// }

// .shadow-glow {
//   box-shadow: 0 0 20px rgba(167, 43, 255, 0.5);
// }
