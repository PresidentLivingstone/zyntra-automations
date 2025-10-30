"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "framer-motion"
import { Menu, X, ChevronRight, Calendar, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useWindowSize } from "@/hooks/use-window-size"

declare global {
  interface Window {
    Calendly: {
      initPopupWidget: (options: { url: string }) => void
    }
  }
}

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  const [visible, setVisible] = useState(true)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const lastScrollY = useRef(0)
  const navRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)
  const size = useWindowSize()

  // Scroll values for effects
  const { scrollY } = useScroll()
  const navBackground = useTransform(scrollY, [0, 100], ["rgba(11, 3, 22, 0)", "rgba(11, 3, 22, 0.92)"])
  const navBorderOpacity = useTransform(scrollY, [0, 100], ["rgba(45, 27, 78, 0)", "rgba(45, 27, 78, 0.5)"])
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.92])
  const navBlur = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(12px)"])

  const navItems = [
    { href: "#home", label: "Home" },
    { href: "#highlights", label: "Workshop" },
    { href: "#bonuses", label: "Bonuses" },
    { href: "#audience", label: "Who's It For" },
    { href: "#contact", label: "Register" },
  ]

  // Hide/show navigation based on scroll direction
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (typeof window !== "undefined") {
      const currentScrollY = latest
      setHasScrolled(currentScrollY > 50)

      // Only start hiding when we've scrolled a bit
      if (currentScrollY > 200) {
        if (currentScrollY > lastScrollY.current && visible) {
          setVisible(false)
        } else if (currentScrollY < lastScrollY.current && !visible) {
          setVisible(true)
        }
      } else if (!visible) {
        setVisible(true)
      }

      lastScrollY.current = currentScrollY
    }
  })

  // Memoized calendly handler to prevent rerenders
  const handleCalendlyClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault()

    // Load Calendly script if needed
    if (typeof window !== "undefined" && !window.Calendly) {
      const script = document.createElement("script")
      script.src = "https://assets.calendly.com/assets/external/widget.js"
      script.async = true
      document.body.appendChild(script)

      script.onload = () => {
        if (window.Calendly) {
          window.Calendly.initPopupWidget({
            url: "https://calendly.com/mazvoverelivingstone/30min",
          })
        }
      }
    } else if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: "https://calendly.com/mazvoverelivingstone/30min",
      })
    }

    return false
  }, [])

  // Track active section based on scroll position
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id
            setActiveSection(id)
          }
        })
      },
      {
        rootMargin: "-80px 0px -80% 0px",
        threshold: 0,
      },
    )

    // Observe all sections
    navItems.forEach((item) => {
      const sectionId = item.href.replace("#", "")
      const element = document.getElementById(sectionId)
      if (element) observer.observe(element)
    })

    return () => {
      navItems.forEach((item) => {
        const sectionId = item.href.replace("#", "")
        const element = document.getElementById(sectionId)
        if (element) observer.unobserve(element)
      })
    }
  }, [navItems])

  // Handle body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  // Initial loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    // Preload Calendly for faster initialization
    if (typeof window !== "undefined" && !window.Calendly) {
      const link = document.createElement("link")
      link.rel = "preconnect"
      link.href = "https://assets.calendly.com"
      document.head.appendChild(link)
    }

    return () => clearTimeout(timer)
  }, [])

  // Subtle interaction sounds
  const playSound = useCallback((type: "hover" | "click") => {
    // Uncomment this to enable sounds
    /*
    if (typeof window === "undefined" || !localStorage.getItem('soundsEnabled')) return
    
    const audio = new Audio(type === 'hover' 
      ? "/sounds/hover.mp3" 
      : "/sounds/click.mp3"
    )
    audio.volume = type === 'hover' ? 0.05 : 0.1
    audio.play().catch(() => {})
    */
  }, [])

  const handleSmoothScroll = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault()
      const targetId = href.replace("#", "")
      const element = document.getElementById(targetId) || document.querySelector("main")

      if (element) {
        playSound("click")

        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
      setIsOpen(false)
    },
    [playSound],
  )

  // Magnetic button effect with improved performance
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!buttonRef.current) return
    const btn = buttonRef.current
    const rect = btn.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    // Limit the movement range
    const maxMove = 10
    const moveX = (x / rect.width) * maxMove
    const moveY = (y / rect.height) * maxMove

    // Use requestAnimationFrame for smoother animation
    requestAnimationFrame(() => {
      btn.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (!buttonRef.current) return

    // Add spring-like return animation
    buttonRef.current.style.transition = "transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
    buttonRef.current.style.transform = `translate3d(0px, 0px, 0)`

    // Remove transition after animation completes
    setTimeout(() => {
      if (buttonRef.current) {
        buttonRef.current.style.transition = ""
      }
    }, 500)
  }, [])

  return (
    <>
      {/* Progress indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-neon z-[100] origin-left"
        style={{
          scaleX: useTransform(
            scrollY,
            [0, typeof document !== "undefined" ? document.body.scrollHeight - (size?.height || 0) : 1000],
            [0, 1],
          ),
        }}
      />

      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 z-[200] bg-background flex items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
          >
            <motion.div
              className="w-16 h-16 relative"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <div className="w-full h-full rounded-full border-t-2 border-r-2 border-primary opacity-75"></div>
              <div className="absolute top-0 left-0 w-full h-full rounded-full border-t-2 border-primary opacity-50 rotate-45"></div>
              <div className="absolute top-0 left-0 w-full h-full rounded-full border-t-2 border-primary opacity-25 rotate-90"></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b h-20"
        style={{
          backgroundColor: navBackground,
          borderColor: navBorderOpacity,
          backdropFilter: navBlur,
          translateY: visible ? 0 : -100,
        }}
        initial={{ y: -100 }}
        animate={{ y: visible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo with animation */}
            <motion.div style={{ scale: logoScale }}>
              <Link
                href="#home"
                onClick={(e) => handleSmoothScroll(e, "#home")}
                className="flex items-center group"
                onMouseEnter={() => playSound("hover")}
              >
                <div className="flex flex-col leading-none">
                  <span className="text-xl font-bold text-white group-hover:text-primary transition-all duration-300">
                    Harness the Future
                  </span>
                  <span className="text-xs text-white/60">Zimbabwe 2025</span>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2 lg:space-x-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  onHoverStart={() => {
                    setHoverIndex(index)
                    playSound("hover")
                  }}
                  onHoverEnd={() => setHoverIndex(null)}
                  className="relative py-2 px-3"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <a
                    href={item.href}
                    onClick={(e) => handleSmoothScroll(e, item.href)}
                    className={cn(
                      "nav-link relative z-10 text-sm lg:text-base text-white transition-colors duration-200 font-medium cursor-pointer",
                      activeSection === item.href.replace("#", "") ? "text-gradient-neon" : "hover:text-white/80",
                    )}
                  >
                    {item.label}
                  </a>

                  {/* Hover background */}
                  <AnimatePresence>
                    {hoverIndex === index && (
                      <motion.div
                        className="absolute inset-0 rounded-lg bg-white/5"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Active indicator */}
                  {activeSection === item.href.replace("#", "") && (
                    <motion.div
                      className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-neon"
                      layoutId="activeSection"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.div>
              ))}

              {/* CTA Button with magnetic effect */}
              <motion.div
                ref={buttonRef}
                className="relative"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onMouseEnter={() => playSound("hover")}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  <Button
                    size="sm"
                    className="group bg-gradient-cta hover:opacity-90 text-white px-6 py-5 font-semibold shadow-glow-primary transition-all duration-500 border-0 relative overflow-hidden"
                  >
                    <span className="flex items-center relative z-10">
                      <span>Register</span>
                      <motion.div className="ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                        <ChevronRight size={16} />
                      </motion.div>
                    </span>

                    {/* Animated gradient overlay */}
                    <motion.div
                      className="absolute inset-0 bg-white/10"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    />
                  </Button>
                </a>

                {/* Button pulse effect */}
                <motion.div
                  className="absolute inset-0 rounded-md pointer-events-none"
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(255, 27, 141, 0)",
                      "0 0 0 4px rgba(255, 27, 141, 0.3)",
                      "0 0 0 8px rgba(255, 27, 141, 0)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 3,
                  }}
                />
              </motion.div>
            </div>

            {/* Mobile menu button */}
            <motion.button
              onClick={() => {
                setIsOpen(!isOpen)
                playSound("click")
              }}
              className="md:hidden p-2 rounded-md text-white hover:text-gray-300 hover:bg-white/10 transition-colors"
              whileTap={{ scale: 0.92 }}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden fixed inset-0 top-20 bg-background/95 backdrop-blur-lg z-40"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "calc(100vh - 5rem)" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
            >
              <div className="h-full flex flex-col justify-between overflow-auto">
                <motion.div
                  className="flex flex-col space-y-1 p-6"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: {
                      transition: {
                        staggerChildren: 0.05,
                      },
                    },
                  }}
                >
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: {
                          opacity: 1,
                          x: 0,
                          transition: { duration: 0.3 },
                        },
                      }}
                      className="py-3"
                    >
                      <a
                        href={item.href}
                        onClick={(e) => handleSmoothScroll(e, item.href)}
                        className={cn(
                          "nav-link text-2xl text-white hover:text-gradient-neon transition-colors duration-200 font-medium cursor-pointer flex items-center group",
                          activeSection === item.href.replace("#", "") ? "text-gradient-neon" : "",
                        )}
                      >
                        {activeSection === item.href.replace("#", "") && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2 h-2 rounded-full bg-primary mr-3"
                          />
                        )}
                        <span>{item.label}</span>
                        <motion.div
                          initial={{ opacity: 0, x: -5 }}
                          whileHover={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2 }}
                          className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <ArrowUpRight size={16} />
                        </motion.div>
                      </a>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div
                  className="p-6 border-t border-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault()
                      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                      setIsOpen(false)
                    }}
                  >
                    <Button
                      size="lg"
                      className="bg-gradient-cta hover:opacity-90 text-white px-6 py-6 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 w-full border-0 text-xl"
                    >
                      <span>Register Now</span>
                    </Button>
                  </a>

                  <div className="mt-8 flex flex-col space-y-4">
                    <p className="text-white/40 text-sm uppercase tracking-wider">Connect With Us</p>
                    <div className="flex items-center space-x-6">
                      <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/60 hover:text-white transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                        </svg>
                      </a>
                      <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/60 hover:text-white transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                          <rect x="2" y="9" width="4" height="12"></rect>
                          <circle cx="4" cy="4" r="2"></circle>
                        </svg>
                      </a>
                      <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/60 hover:text-white transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                        </svg>
                      </a>
                    </div>
                  </div>

                  <div className="mt-8 pt-8 border-t border-white/10 text-center">
                    <p className="text-white/30 text-sm">© 2025 Harness the Future Zimbabwe</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  )
}
