"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useAnimation, useInView } from "framer-motion"
import { ChevronLeft, ChevronRight, Star, Quote, BadgeCheck, ExternalLink } from "lucide-react"

// Enhanced testimonial data with additional fields
const testimonials = [
  {
    quote:
      "Zyntra Automations transformed our customer service. We now handle 3× more inquiries with the same team size. The rollout was smooth, and the team was with us every step.",
    author: "Sarah Mukamuri",
    position: "Operations Manager",
    rating: 5,
    avatar: "/avatars/sarah-m.jpg",
    gradient: ["#A72BFF", "#E94EFF"],
    verified: true,
    featured: true,
  },
  {
    quote:
      "The AI voice agent books appointments in Shona perfectly. Our clients love it, and we've reduced no-shows by 42% through automated reminders.",
    author: "James Chikwanha",
    position: "Clinic Director",
    rating: 5,
    avatar: "/avatars/james-c.jpg",
    gradient: ["#E94EFF", "#FF3DD9"],
    verified: true,
    featured: false,
  },
  {
    quote:
      "Our inventory management is now fully automated. Stock-outs dropped by 80% and we save over 20 hours each week. ROI showed in just one month.",
    author: "Grace Mutindi",
    position: "Supply Chain Manager",
    rating: 5,
    avatar: "/avatars/grace-m.jpg",
    gradient: ["#FF3DD9", "#A72BFF"],
    verified: true,
    featured: false,
  },
]

function NavigationButton({
  onClick,
  icon,
  direction,
}: {
  onClick: () => void
  icon: React.ReactNode
  direction: "prev" | "next"
}) {
  return (
    <motion.button
      onClick={onClick}
      className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`${direction === "prev" ? "Previous" : "Next"} testimonial`}
    >
      {icon}
    </motion.button>
  )
}

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.3 })
  const controls = useAnimation()

  // Auto-advance testimonials with pause on hover/interaction
  useEffect(() => {
    if (!isInView || !isAutoPlaying) return

    const interval = setInterval(() => {
      handleNext()
    }, 5000)

    return () => clearInterval(interval)
  }, [currentIndex, isInView, isAutoPlaying])

  // Start animations when section comes into view
  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const handlePrev = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  // Get visible testimonials (current + 1 more on desktop)
  const getVisibleTestimonials = () => {
    const testimonialCount = testimonials.length

    // Main testimonials to display
    const mainIndex = currentIndex
    const secondaryIndex = (currentIndex + 1) % testimonialCount
    const tertiaryIndex = (currentIndex + 2) % testimonialCount

    return [testimonials[mainIndex], testimonials[secondaryIndex], testimonials[tertiaryIndex]]
  }

  const visibleTestimonials = getVisibleTestimonials()

  return (
    <section
      id="testimonials"
      className="relative py-20 md:py-32 px-4 md:px-6 bg-gradient-to-b from-[#0F051C] to-background overflow-hidden"
      ref={containerRef}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-[10%] right-[5%] w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] opacity-50"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-[10%] left-[5%] w-[500px] h-[500px] rounded-full bg-secondary/5 blur-[100px] opacity-40"
          animate={{
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 2,
          }}
        />

        {/* Quote decorative elements */}
        <motion.div
          className="absolute left-[5%] top-[20%] text-white/5"
          animate={{
            rotate: [0, 10, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          <Quote size={120} strokeWidth={1} />
        </motion.div>

        <motion.div
          className="absolute right-[5%] bottom-[20%] text-white/5"
          animate={{
            rotate: [0, -10, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 2,
          }}
        >
          <Quote size={120} strokeWidth={1} />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse mr-2"></span>
            <span className="text-primary font-medium tracking-wide">Testimonials</span>
          </div>

          <h2 className="text-4xl lg:text-6xl font-bold mb-6 tracking-tight">
            Trusted by{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-gradient-neon animate-gradient-shift">Zimbabwean Businesses</span>
              <motion.span
                className="absolute -bottom-2 left-0 right-0 h-[10px] bg-gradient-neon opacity-20 rounded-full blur-sm"
                initial={{ width: "0%" }}
                animate={isInView ? { width: "100%" } : {}}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </span>
          </h2>

          <motion.p
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Hear how local companies are saving hundreds of hours every year with our AI systems.
          </motion.p>
        </motion.div>

        {/* Testimonial Slider */}
        <div className="relative pb-16 md:pb-20">
          {/* Main testimonial display */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative">
            <AnimatePresence mode="wait" custom={direction}>
              {visibleTestimonials.map((testimonial, idx) => (
                <motion.div
                  key={`${currentIndex + idx}`}
                  custom={direction}
                  initial={idx === 0 ? { opacity: 0, x: direction * 50 } : { opacity: 0, scale: 0.95 }}
                  animate={{ opacity: idx < 3 ? 1 : 0, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -direction * 50, scale: 0.95 }}
                  transition={{
                    duration: 0.4,
                    ease: [0.25, 0.46, 0.45, 0.94],
                    delay: idx * 0.05,
                  }}
                  className={`${idx === 0 ? "md:col-span-2 z-20" : "hidden md:block z-10"} h-full`}
                >
                  <TestimonialCard testimonial={testimonial} isFeatured={idx === 0} index={currentIndex + idx} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Navigation controls */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-8 md:mt-12 gap-4 sm:gap-0">
            <div className="flex space-x-2 md:space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "w-6 md:w-8 bg-gradient-neon" : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <div className="flex space-x-3 md:space-x-4">
              <NavigationButton onClick={handlePrev} icon={<ChevronLeft size={18} />} direction="prev" />
              <NavigationButton onClick={handleNext} icon={<ChevronRight size={18} />} direction="next" />
            </div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            className="mt-20 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
              }}
              className="inline-flex items-center px-8 py-3 rounded-full bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 transition-all duration-300 group"
            >
              <span className="mr-2">Read more success stories</span>
              <motion.div whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
                <ExternalLink size={14} />
              </motion.div>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Testimonial Card Component
function TestimonialCard({
  testimonial,
  isFeatured,
  index,
}: {
  testimonial: (typeof testimonials)[0]
  isFeatured: boolean
  index: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, amount: 0.2 })
  const [hovered, setHovered] = useState(false)

  // Calculate delay for staggered animations
  const baseDelay = 0.3
  const staggerDelay = index * 0.1

  return (
    <motion.div
      ref={cardRef}
      className={`relative rounded-2xl overflow-hidden h-full group ${isFeatured ? "p-1" : "p-0.5"}`}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      {/* Gradient border */}
      <div
        className="absolute inset-0 rounded-2xl opacity-20 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: `linear-gradient(60deg, ${testimonial.gradient[0]}, ${testimonial.gradient[1]})`,
          backgroundSize: "200% 200%",
        }}
      />

      {/* Main card content */}
      <div className="relative rounded-2xl bg-black/60 backdrop-blur-xl p-8 md:p-10 h-full flex flex-col">
        {/* Featured indicator */}
        {testimonial.featured && (
          <motion.div
            className="absolute top-4 right-4 text-accent"
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{
              duration: 0.5,
              delay: baseDelay + staggerDelay,
              type: "spring",
            }}
          >
            <div className="px-3 py-1 rounded-full text-xs bg-accent/10 flex items-center space-x-1">
              <Star size={12} className="fill-accent" />
              <span>Featured</span>
            </div>
          </motion.div>
        )}

        {/* Rating */}
        <motion.div
          className="flex mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: baseDelay + staggerDelay }}
        >
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={`mr-1 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-400"}`}
            />
          ))}
        </motion.div>

        {/* Quote */}
        <motion.blockquote
          className={`text-white leading-relaxed font-medium mb-8 relative ${isFeatured ? "text-xl" : "text-base"}`}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: baseDelay + staggerDelay + 0.1 }}
        >
          <Quote size={24} className="absolute -top-2 -left-2 text-primary/20" />"{testimonial.quote}"
        </motion.blockquote>

        {/* Author info */}
        <motion.div
          className="flex items-center mt-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: baseDelay + staggerDelay + 0.2 }}
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold mr-4">
            {testimonial.author
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div>
            <div className="flex items-center">
              <h4 className="font-semibold text-white">{testimonial.author}</h4>
              {testimonial.verified && <BadgeCheck size={16} className="ml-2 text-primary" />}
            </div>
            <p className="text-sm text-muted-foreground">{testimonial.position}</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
