"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import { Linkedin, Twitter, ExternalLink, Quote } from "lucide-react"
import Image from "next/image"

export function Founder() {
  const containerRef = useRef<HTMLElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })
  const controls = useAnimation()
  const [highlightedWord, setHighlightedWord] = useState<number | null>(null)

  // Keywords to highlight in the quote
  const keyPhrases = [
    "AI's potential in Africa",
    "solve real problems",
    "hundreds of hours",
    "not about replacing jobs",
    "tools to do more",
  ]

  // Find and highlight key phrases in text
  const highlightText = (text: string) => {
    const result: React.ReactNode[] = []
    let lastIndex = 0

    keyPhrases.forEach((phrase, index) => {
      const phraseIndex = text.indexOf(phrase, lastIndex)
      if (phraseIndex !== -1) {
        // Add text before the phrase
        if (phraseIndex > lastIndex) {
          result.push(text.substring(lastIndex, phraseIndex))
        }

        // Add the highlighted phrase
        result.push(
          <motion.span
            key={`highlight-${index}`}
            className={`relative inline-block cursor-pointer font-medium ${
              highlightedWord === index ? "text-primary" : "text-white"
            }`}
            onHoverStart={() => setHighlightedWord(index)}
            onHoverEnd={() => setHighlightedWord(null)}
            whileHover={{ scale: 1.05 }}
          >
            {phrase}
            {highlightedWord === index && (
              <motion.span
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-neon"
                layoutId="highlightUnderline"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            )}
          </motion.span>,
        )

        lastIndex = phraseIndex + phrase.length
      }
    })

    // Add remaining text
    if (lastIndex < text.length) {
      result.push(text.substring(lastIndex))
    }

    return result
  }

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  return (
    <section ref={containerRef} className="relative py-32 px-6 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 z-0">
        {/* Gradient backdrop */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F051C] to-[#0B0316]"></div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid opacity-[0.03]"></div>

        {/* Animated quote marks */}
        <motion.div
          className="absolute left-[5%] top-[15%] text-primary/5"
          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
          animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
          transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
        >
          <Quote size={120} />
        </motion.div>

        <motion.div
          className="absolute right-[5%] bottom-[15%] text-primary/5"
          initial={{ opacity: 0, scale: 0.5, rotate: 10 }}
          animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
          transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1], delay: 0.3 }}
        >
          <Quote size={120} className="rotate-180" />
        </motion.div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
          {/* Founder photo column */}
          <motion.div
            className="w-full md:w-2/5 flex justify-center md:justify-start"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
          >
            <div className="relative w-full max-w-sm md:max-w-none">
              {/* Photo frame with gradient border */}
              <div className="relative rounded-2xl p-1 bg-gradient-to-br from-primary via-secondary to-accent overflow-hidden">
                <div className="absolute inset-0 bg-gradient-neon opacity-30 animate-gradient-shift"></div>

                {/* Founder image - placeholder for now */}
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-black/30">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/founder_profile-o0h8h01pn5NJfkzTRKggoLpppWnpr3.png"
                    alt="Livingstone Mazvovere - Founder & AI Automation Specialist"
                    fill
                    className="object-cover object-center"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 33vw"
                  />

                  {/* Glass overlay with details */}
                  <div className="absolute bottom-0 left-0 right-0 backdrop-blur-md bg-black/60 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
                    <p className="text-sm text-white/80">
                      With over 10 years of experience in AI and automation systems
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating information card */}
              <motion.div
                className="absolute -bottom-6 -right-6 bg-black/80 backdrop-blur-lg rounded-xl p-4 shadow-lg border border-white/10"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.19, 1, 0.22, 1] }}
              >
                <div className="flex gap-3">
                  {/* Social links */}
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full flex items-center justify-center bg-white/10 hover:bg-primary/30 transition-colors text-white"
                  >
                    <Linkedin size={16} />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full flex items-center justify-center bg-white/10 hover:bg-primary/30 transition-colors text-white"
                  >
                    <Twitter size={16} />
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content column */}
          <motion.div
            className="md:w-3/5"
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
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, ease: [0.19, 1, 0.22, 1] },
                },
              }}
              className="mb-2"
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm mb-6">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse mr-2"></span>
                <span className="text-primary font-medium tracking-wide">Founder</span>
              </div>
            </motion.div>

            <motion.h3
              className="text-3xl lg:text-5xl font-bold text-white mb-3"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, ease: [0.19, 1, 0.22, 1] },
                },
              }}
            >
              Livingstone Mazvovere
            </motion.h3>

            <motion.p
              className="text-xl text-white/80 font-medium mb-8"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, ease: [0.19, 1, 0.22, 1] },
                },
              }}
            >
              Software Developer and AI Generalist
              <br />
              <span className="text-lg text-white/60">Delhi University Alumni</span>
            </motion.p>

            <motion.blockquote
              className="text-lg lg:text-xl text-white/70 leading-relaxed relative pl-6 border-l-2 border-primary/30"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, ease: [0.19, 1, 0.22, 1], delay: 0.2 },
                },
              }}
            >
        <p>"Starting <strong>Zyntra Automations</strong> in <strong>2025</strong> was about taking a <strong>leap of faith</strong>. To prove that <strong>AI</strong> can <strong>create opportunities</strong> for <strong>Zimbabwean businesses</strong>, not take them away. It's not about <strong>replacing people</strong>. It's about giving them <strong>tools</strong> to <strong>do more in less time</strong>. When your <strong>business grows</strong>, so does <strong>ours</strong>."</p> 
              {/* Animated signature */}
              <motion.div
                className="mt-8 flex justify-end"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1, ease: [0.19, 1, 0.22, 1] }}
              >
                <svg width="180" height="60" viewBox="0 0 180 60" className="text-primary">
                  <motion.path
                    d="M10,40 C20,20 30,10 40,30 C50,50 60,30 70,20 C80,10 90,20 100,30 C110,40 120,30 130,20 C140,10 150,20 160,30"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : {}}
                    transition={{ duration: 1.5, delay: 1.2, ease: "easeInOut" }}
                  />
                </svg>
              </motion.div>
            </motion.blockquote>

            {/* CTA Button */}
            <motion.div
              className="mt-10"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, ease: [0.19, 1, 0.22, 1], delay: 0.4 },
                },
              }}
            >
              <a
                href="#contact"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-neon text-white hover:shadow-glow transition-all duration-300 group"
              >
                <span className="mr-2">Connect with me</span>
                <motion.div whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
                  <ExternalLink size={16} />
                </motion.div>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
