"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion"
import { ChevronUp, Zap, Users, BarChart3 } from "lucide-react"

// Icons for each stat type
const statIcons = [Users, Zap, BarChart3]

export function Stats() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.3 })
  const [hasAnimated, setHasAnimated] = useState(false)
  
  const stats = [
    {
      value: "120+",
      numericalValue: 120,
      label: "Zimbabwean Businesses Served",
      description: "From startups to established enterprises across the country",
      gradient: ["#A72BFF", "#E94EFF"]
    },
    {
      value: "5X",
      numericalValue: 5,
      label: "Average ROI Per Project",
      description: "Measured across all clients within the first 12 months",
      gradient: ["#E94EFF", "#FF3DD9"]
    },
    {
      value: "20+",
      numericalValue: 20,
      label: "Industries Transformed",
      description: "Including retail, healthcare, finance, agriculture, and more",
      gradient: ["#FF3DD9", "#A72BFF"]
    },
  ]

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true)
    }
  }, [isInView, hasAnimated])

  return (
    <section className="relative bg-background py-24 px-6 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <svg width="100%" height="100%" className="absolute inset-0 opacity-20">
          <defs>
            <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(167, 43, 255, 0.1)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
        
        {/* Animated gradient orbs */}
        <div className="absolute -top-[300px] -right-[300px] w-[600px] h-[600px] rounded-full bg-gradient-to-r from-[#A72BFF] to-[#E94EFF] opacity-[0.03] blur-[100px]" />
        <div className="absolute -bottom-[300px] -left-[300px] w-[600px] h-[600px] rounded-full bg-gradient-to-r from-[#FF3DD9] to-[#A72BFF] opacity-[0.03] blur-[100px]" />
      </div>
      
      <div className="max-w-6xl mx-auto relative" ref={containerRef}>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          {stats.map((stat, index) => {
            const IconComponent = statIcons[index % statIcons.length]
            
            return (
              <motion.div
                key={index}
                className="relative flex flex-col items-center"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.7,
                  delay: index * 0.15,
                  ease: [0.19, 1, 0.22, 1]
                }}
              >
                {/* Background Card with Glow */}
                <div className="absolute inset-0 bg-white/[0.02] rounded-2xl backdrop-blur-sm" />
                
                {/* Animated Gradient Border */}
                <AnimatePresence>
                  {isInView && (
                    <motion.div 
                      className="absolute inset-0 rounded-2xl overflow-hidden"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.15 }}
                    >
                      <div className="absolute inset-0 p-[1px] rounded-2xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r opacity-30"
                            style={{ backgroundImage: `linear-gradient(to right, ${stat.gradient[0]}, ${stat.gradient[1]})` }} 
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <div className="relative z-10 py-10 px-6 w-full h-full flex flex-col items-center justify-center">
                  {/* Icon with glowing background */}
                  <motion.div
                    className="mb-6 rounded-full p-3"
                    style={{ 
                      background: `linear-gradient(135deg, ${stat.gradient[0]}22, ${stat.gradient[1]}44)`,
                    }}
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ 
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.1 + index * 0.15 
                    }}
                  >
                    <IconComponent className="w-6 h-6 text-white" />
                  </motion.div>
                  
                  {/* Value with counting animation */}
                  <div className="relative">
                    <CountUpAnimation 
                      value={stat.numericalValue} 
                      suffix={stat.value.includes('+') ? '+' : 'X'}
                      isInView={isInView} 
                      delay={0.3 + index * 0.15}
                    />
                    
                    {/* Up arrow for positive metrics */}
                    <motion.div 
                      className="absolute -right-8 -top-1"
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.15 }}
                    >
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-r from-green-500/20 to-green-400/20">
                        <ChevronUp className="w-4 h-4 text-green-400" />
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Label with highlight */}
                  <motion.div 
                    className="mt-3 text-center"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.15 }}
                  >
                    <h3 className="text-lg font-medium text-white mb-2">
                      {stat.label}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {stat.description}
                    </p>
                  </motion.div>
                  
                  {/* Animated highlight line */}
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl overflow-hidden"
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 1, delay: 0.7 + index * 0.15 }}
                    style={{ 
                      background: `linear-gradient(to right, ${stat.gradient[0]}, ${stat.gradient[1]})`,
                      originX: 0
                    }}
                  />
                </div>
              </motion.div>
            )
          })}
        </motion.div>
        
        {/* Bottom caption - optional */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <p className="text-muted-foreground text-sm px-4 py-2 rounded-full inline-block bg-white/5">
            Data verified as of August 2025
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// Counter animation component
function CountUpAnimation({ 
  value, 
  suffix = '', 
  isInView, 
  delay = 0 
}: { 
  value: number, 
  suffix?: string, 
  isInView: boolean, 
  delay?: number 
}) {
  const [displayValue, setDisplayValue] = useState(0)
  const controls = useAnimation()
  
  useEffect(() => {
    if (isInView) {
      let startTimestamp: number | null = null
      const duration = 1500 // Animation duration in ms
      
      // Start animation after delay
      const timer = setTimeout(() => {
        const animateCount = (timestamp: number) => {
          if (!startTimestamp) startTimestamp = timestamp
          const progress = Math.min((timestamp - startTimestamp) / duration, 1)
          
          // Easing function for smoother animation
          const easeOutQuart = (x: number): number => 1 - Math.pow(1 - x, 4)
          const easedProgress = easeOutQuart(progress)
          
          setDisplayValue(Math.floor(easedProgress * value))
          
          if (progress < 1) {
            requestAnimationFrame(animateCount)
          } else {
            setDisplayValue(value)
          }
        }
        
        requestAnimationFrame(animateCount)
        controls.start({ scale: 1, opacity: 1 })
      }, delay * 1000)
      
      return () => clearTimeout(timer)
    }
  }, [isInView, value, controls, delay])

  return (
    <motion.div 
      className="text-5xl lg:text-6xl font-bold text-white mb-2 relative flex items-baseline"
      initial={{ scale: 0.7, opacity: 0 }}
      animate={controls}
      transition={{ 
        type: "spring",
        stiffness: 100,
        damping: 10,
      }}
    >
      <span>{displayValue}</span>
      <span className="text-gradient-neon">{suffix}</span>
    </motion.div>
  )
}
