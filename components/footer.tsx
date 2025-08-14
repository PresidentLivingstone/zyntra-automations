"use client"

import type React from "react"

import { useState, useRef } from "react"
import Link from "next/link"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ArrowUpRight, ChevronUp, Mail, Phone, MapPin, Linkedin, Twitter, Instagram } from "lucide-react"

export function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const isInView = useInView(footerRef, { once: true, amount: 0.1 })
  const [activeSection, setActiveSection] = useState<string | null>(null)

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const footerLinks = [
    {
      title: "Services",
      links: [
        { name: "AI Agents", href: "#services" },
        { name: "Workflow Automation", href: "#services" },
        { name: "Voice Agents", href: "#services" },
        { name: "Social Media AI", href: "#services" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#about" },
        { name: "Our Process", href: "#process" },
        { name: "Testimonials", href: "#testimonials" },
        { name: "Contact", href: "#contact" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "AI Training", href: "#about" },
        { name: "Consulting", href: "#about" },
        { name: "Partnerships", href: "#about" },
        { name: "Tech Stack", href: "#tech-stack" },
      ],
    },
  ]

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault()
      const element = document.getElementById(href.replace("#", ""))
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  return (
    <motion.footer
      ref={footerRef}
      className="relative overflow-hidden bg-gradient-to-b from-[#0B0316] to-[#14052A] pt-32 pb-16 px-6"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 z-0">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid opacity-[0.03]"></div>

        {/* Animated gradient orbs */}
        <motion.div
          className="absolute -top-[200px] -right-[200px] w-[500px] h-[500px] rounded-full bg-[#A72BFF] blur-[120px] opacity-[0.07]"
          animate={{
            x: [0, -30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />

        <motion.div
          className="absolute -bottom-[200px] -left-[200px] w-[500px] h-[500px] rounded-full bg-[#E94EFF] blur-[120px] opacity-[0.07]"
          animate={{
            x: [0, 30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 2,
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Back to top button - fixed positioned */}
        <AnimatePresence>
          {isInView && (
            <motion.button
              onClick={scrollToTop}
              className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-gradient-neon flex items-center justify-center shadow-lg hover:shadow-[0_0_15px_rgba(167,43,255,0.5)] transition-shadow"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              aria-label="Back to top"
            >
              <ChevronUp className="text-white" size={20} />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 mb-20">
          {/* Company Info */}
          <motion.div
            className="md:col-span-5"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
          >
            <Link href="#home" onClick={(e) => handleLinkClick(e, "#home")} className="inline-block mb-8 group">
              <div className="flex items-center">
                <div className="mr-3 w-10 h-10 rounded-lg overflow-hidden relative flex items-center justify-center group-hover:shadow-glow transition-shadow duration-300">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Company%20Logo-RWdZxOon3xbVrfJVQidoJ1rwUZolma.png"
                    alt="Zyntra Automations Logo"
                    className="w-full h-full object-contain filter brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-all duration-300"
                  />
                </div>

                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-white group-hover:text-gradient-neon transition-all duration-300">
                    Zyntra
                  </span>
                  <span className="text-xs text-white/50">Automations</span>
                </div>
              </div>
            </Link>

            <p className="text-white/80 mb-8 leading-relaxed text-lg max-w-md">
              The Future, On Autopilot. Zimbabwean AI automation start-up helping local businesses transform through
              smart automation.
            </p>

            {/* Social links */}
            <div className="flex space-x-4">
              <SocialButton icon={<Linkedin size={18} />} href="https://linkedin.com/company/zyntra-automations" />
              <SocialButton icon={<Twitter size={18} />} href="https://twitter.com/zyntraai" />
              <SocialButton icon={<Instagram size={18} />} href="https://instagram.com/zyntra.automations" />
            </div>
          </motion.div>

          {/* Footer Links */}
          <div className="md:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {footerLinks.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.7,
                    delay: 0.1 * (index + 1),
                    ease: [0.19, 1, 0.22, 1],
                  }}
                  onHoverStart={() => setActiveSection(section.title)}
                  onHoverEnd={() => setActiveSection(null)}
                >
                  <h4 className="text-white font-semibold text-lg mb-6 pb-2 border-b border-white/10 relative">
                    {section.title}
                    <AnimatePresence>
                      {activeSection === section.title && (
                        <motion.div
                          className="absolute bottom-0 left-0 h-[2px] bg-gradient-neon"
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          exit={{ width: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </AnimatePresence>
                  </h4>
                  <ul className="space-y-4">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link
                          href={link.href}
                          onClick={(e) => handleLinkClick(e, link.href)}
                          className="text-white/70 hover:text-white transition-colors duration-200 flex items-center group"
                        >
                          <span>{link.name}</span>
                          <motion.div
                            initial={{ opacity: 0, x: -5 }}
                            whileHover={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2 }}
                            className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <ArrowUpRight size={14} />
                          </motion.div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <motion.div
          className="border-t border-white/10 pt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.7,
            delay: 0.4,
            ease: [0.19, 1, 0.22, 1],
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <ContactInfo
              icon={<Mail size={18} />}
              title="Email"
              href="mailto:hello@zyntraautomations.com"
              text="hello@zyntraautomations.com"
            />
            <ContactInfo icon={<Phone size={18} />} title="Phone" href="tel:+263771234567" text="+263 77 123 4567" />
            <ContactInfo icon={<MapPin size={18} />} title="Location" text="Harare, Zimbabwe" />
          </div>

          <motion.div
            className="flex flex-col md:flex-row justify-between items-center border-t border-white/10 pt-8 text-center md:text-left"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <p className="text-white/40 text-sm mb-4 md:mb-0">
              © 2025 Zyntra Automations — Zimbabwean AI Automation Start-Up
            </p>
            <div className="flex space-x-6 text-white/40 text-sm">
              <Link
                href="#about"
                onClick={(e) => handleLinkClick(e, "#about")}
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="#about"
                onClick={(e) => handleLinkClick(e, "#about")}
                className="hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  )
}

// Social Media Button Component
function SocialButton({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-white/80 hover:text-white hover:border-primary/50 hover:bg-white/10 transition-all duration-300"
      whileHover={{
        scale: 1.1,
        boxShadow: "0 0 10px rgba(167, 43, 255, 0.3)",
      }}
      whileTap={{ scale: 0.95 }}
    >
      {icon}
    </motion.a>
  )
}

// Contact Info Component
function ContactInfo({
  icon,
  title,
  text,
  href,
}: {
  icon: React.ReactNode
  title: string
  text: string
  href?: string
}) {
  return (
    <motion.div className="flex items-start" whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 mr-4 text-white/80 border border-white/10">
        {icon}
      </div>
      <div>
        <h5 className="text-white font-semibold mb-1">{title}</h5>
        {href ? (
          <a href={href} className="text-white/70 hover:text-white transition-colors group flex items-center">
            <span>{text}</span>
            <motion.div
              initial={{ opacity: 0, x: -5 }}
              whileHover={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ArrowUpRight size={14} />
            </motion.div>
          </a>
        ) : (
          <p className="text-white/70">{text}</p>
        )}
      </div>
    </motion.div>
  )
}
