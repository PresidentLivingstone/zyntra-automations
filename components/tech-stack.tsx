"use client"

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ChevronRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

// Automation technology data
const technologies = [
  {
    name: "Claude",
    description: "Advanced AI assistant by Anthropic for intelligent automation and content generation.",
    color: "#D97757",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/claude-2UBaFrln7WseIDkjPXWQXqZ9D8XL0M.png",
    features: ["Advanced reasoning", "Long context windows", "Safe AI responses"],
    useCases: ["Content automation", "Customer support", "Document analysis"],
  },
  {
    name: "n8n",
    description: "Open-source workflow automation tool with self-hosting options for data sovereignty.",
    color: "#EA5A47",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/n8n-QACbqhsiytPuZvl2zhxKhFbPWVx1qT.png",
    features: ["Self-hosted option", "Open-source", "Advanced filtering"],
    useCases: ["Secure data processing", "Internal system integration", "Custom node development"],
  },
  {
    name: "Make",
    description: "Create complex automation scenarios with advanced mapping and transformation tools.",
    color: "#6366F1",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/make-luxYvJDXpG4aOF1vf6zml33HgCxVwn.png",
    features: ["Unlimited complexity", "Data mapping", "Real-time execution"],
    useCases: ["Custom API integrations", "E-commerce operations", "Multi-step approvals"],
  },
  {
    name: "OpenAI",
    description: "Leading AI platform providing GPT models for intelligent automation and content creation.",
    color: "#000000",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/openai-btMKQ30SW34LFOv8miAYuJRGxJbECi.png",
    features: ["GPT-4 integration", "Function calling", "Multimodal AI"],
    useCases: ["Intelligent chatbots", "Content generation", "Data analysis"],
  },
  {
    name: "Airtable",
    description: "Flexible database platform that combines spreadsheet simplicity with database power.",
    color: "#18BFFF",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/airtable-MAaXQ8FqL1mgM9NZIbQwjx6o9qU8k6.png",
    features: ["Flexible schemas", "Rich field types", "Powerful API"],
    useCases: ["Project management", "CRM systems", "Content planning"],
  },
]

export function TechStack() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.2 })
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [hoveredTech, setHoveredTech] = useState<number | null>(null)

  const handleCardClick = () => {
    setCurrentCardIndex((prev) => (prev + 1) % technologies.length)
  }

  return (
    <section
      ref={containerRef}
      className="relative py-20 md:py-32 px-4 md:px-6 overflow-hidden bg-gradient-to-b from-cosmic-dark to-cosmic-darker"
    >
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-[10%] right-[5%] w-[600px] h-[600px] rounded-full bg-electric-magenta blur-[120px] opacity-10"
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
          className="absolute bottom-[10%] left-[5%] w-[500px] h-[500px] rounded-full bg-electric-cyan blur-[100px] opacity-10"
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
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-electric-magenta animate-pulse mr-2"></span>
            <span className="text-electric-magenta font-medium tracking-wide">Technology Stack</span>
          </div>

          <h2 className="text-4xl lg:text-6xl font-bold mb-6 tracking-tight text-white">
            Tools Built for <span className="text-electric-magenta">Speed</span>
          </h2>

          <motion.p
            className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Your business deserves better tools. We leverage cutting-edge automation platforms to build robust, scalable
            systems perfectly tailored to your needs.
          </motion.p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
          {/* 3D Cards Visualization */}
          <motion.div
            className="w-full lg:w-1/2 relative"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative h-[300px] md:h-[400px] lg:h-[500px] flex items-center justify-center">
              {/* 3D Card Stack */}
              <div className="relative w-full max-w-[280px] md:max-w-[350px] lg:max-w-[400px] h-[200px] md:h-[250px] lg:h-[300px]">
                <AnimatePresence mode="wait">
                  {technologies.slice(0, 3).map((tech, index) => {
                    const displayIndex = (currentCardIndex + index) % technologies.length
                    const displayTech = technologies[displayIndex]

                    return (
                      <motion.div
                        key={`${displayTech.name}-${currentCardIndex}`}
                        className="absolute inset-0 bg-white rounded-xl md:rounded-2xl shadow-2xl flex items-center justify-center cursor-pointer"
                        style={{
                          zIndex: 3 - index,
                          transformStyle: "preserve-3d",
                        }}
                        initial={{
                          x: index * 15,
                          y: index * -10,
                          rotateY: 0,
                          scale: 1 - index * 0.05,
                        }}
                        animate={{
                          x: index * 15,
                          y: index * -10,
                          rotateY: [0, 3, -3, 0],
                          rotateX: [0, 1, -1, 0],
                          scale: 1 - index * 0.05,
                        }}
                        exit={{
                          x: -300,
                          rotateY: -60,
                          opacity: 0,
                          transition: { duration: 0.4 },
                        }}
                        transition={{
                          duration: 4 + index * 1.5,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "reverse",
                          delay: index * 0.3,
                        }}
                        whileHover={{
                          scale: (1 - index * 0.05) * 1.03,
                          rotateY: 8,
                          transition: { duration: 0.3 },
                        }}
                        onClick={index === 0 ? handleCardClick : undefined}
                      >
                        <div className="w-full h-full p-6 md:p-8 lg:p-12 flex items-center justify-center">
                          <img
                            src={displayTech.logo || "/placeholder.svg"}
                            alt={`${displayTech.name} logo`}
                            className="w-full h-full object-contain max-w-[120px] md:max-w-[160px] lg:max-w-[200px] max-h-[80px] md:max-h-[100px] lg:max-h-[120px]"
                          />
                        </div>
                      </motion.div>
                    )
                  })}
                </AnimatePresence>
              </div>

              {/* Click instruction */}
              <motion.div
                className="absolute -bottom-8 md:-bottom-10 left-1/2 transform -translate-x-1/2 text-white/60 text-xs md:text-sm text-center px-4"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                Tap the top card to cycle through tools
              </motion.div>

              {/* Floating badges - hidden on mobile */}
              <div className="hidden md:block absolute -bottom-5 -right-5 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 shadow-lg">
                <div className="text-white text-sm">
                  <div className="flex items-center mb-2">
                    <Check size={14} className="text-electric-cyan mr-2" />
                    <span>Seamless Integrations</span>
                  </div>
                  <div className="flex items-center">
                    <Check size={14} className="text-electric-cyan mr-2" />
                    <span>No-Code Solutions</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Technology List */}
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="space-y-3 md:space-y-4">
              {technologies.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  className={`relative rounded-lg md:rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
                    currentCardIndex === index ? "bg-white/10" : "bg-white/5 hover:bg-white/8"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  onClick={() => setCurrentCardIndex(index)}
                  onMouseEnter={() => setHoveredTech(index)}
                  onMouseLeave={() => setHoveredTech(null)}
                  whileHover={{ y: -3 }}
                >
                  {/* Left accent border */}
                  <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: tech.color }}></div>

                  <div className="flex items-center p-3 md:p-4 pl-4 md:pl-6">
                    {/* Logo */}
                    <div className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 bg-white rounded-full flex items-center justify-center mr-3 md:mr-4 p-2">
                      <img
                        src={tech.logo || "/placeholder.svg"}
                        alt={`${tech.name} logo`}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="flex-grow min-w-0">
                      <h3 className="text-white text-base md:text-lg font-semibold flex items-center">
                        {tech.name}
                        {currentCardIndex === index && (
                          <motion.span
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="ml-2 w-2 h-2 rounded-full flex-shrink-0"
                            style={{ backgroundColor: tech.color }}
                          />
                        )}
                      </h3>
                      <p className="text-white/60 text-xs md:text-sm line-clamp-1 pr-2">{tech.description}</p>
                    </div>

                    <div className="flex-shrink-0">
                      <motion.div
                        animate={{ rotate: currentCardIndex === index ? 90 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center bg-white/5"
                      >
                        <ChevronRight className="text-white/60" size={16} />
                      </motion.div>
                    </div>
                  </div>

                  {/* Expanded view */}
                  <AnimatePresence>
                    {currentCardIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden bg-white/5 border-t border-white/10"
                      >
                        <div className="p-4 md:p-6 pt-3 md:pt-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-4">
                            <div>
                              <h4 className="text-white/80 text-xs md:text-sm mb-2 uppercase tracking-wider">
                                Key Features
                              </h4>
                              <ul className="space-y-1.5 md:space-y-2">
                                {tech.features.map((feature, i) => (
                                  <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center text-white/70 text-xs md:text-sm"
                                  >
                                    <div
                                      className="w-1.5 h-1.5 rounded-full mr-2 flex-shrink-0"
                                      style={{ backgroundColor: tech.color }}
                                    ></div>
                                    {feature}
                                  </motion.li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="text-white/80 text-xs md:text-sm mb-2 uppercase tracking-wider">
                                Use Cases
                              </h4>
                              <ul className="space-y-1.5 md:space-y-2">
                                {tech.useCases.map((useCase, i) => (
                                  <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 + i * 0.1 }}
                                    className="flex items-center text-white/70 text-xs md:text-sm"
                                  >
                                    <div
                                      className="w-1.5 h-1.5 rounded-full mr-2 flex-shrink-0"
                                      style={{ backgroundColor: tech.color }}
                                    ></div>
                                    {useCase}
                                  </motion.li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Hover glow effect */}
                  <AnimatePresence>
                    {hoveredTech === index && (
                      <motion.div
                        className="absolute inset-0 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          background: `radial-gradient(circle at center, ${tech.color}80 0%, transparent 70%)`,
                        }}
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              className="mt-6 md:mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Button
                className="w-full md:w-auto group bg-electric-magenta/20 hover:bg-electric-magenta/30 text-white border border-electric-magenta/30 hover:border-electric-magenta/50 transition-all duration-300"
                onClick={() => {
                  if (typeof window !== "undefined" && (window as any).Calendly) {
                    ;(window as any).Calendly.initPopupWidget({
                      url: "https://calendly.com/mazvoverelivingstone/30min",
                    })
                  }
                  return false
                }}
              >
                <span>Discuss Your Automation Needs</span>
                <motion.div
                  className="ml-2 opacity-70 group-hover:opacity-100"
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronRight size={14} />
                </motion.div>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
