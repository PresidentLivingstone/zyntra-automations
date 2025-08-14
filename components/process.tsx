"use client"

import { useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion, useInView } from "framer-motion"
import { CheckCircle, ArrowRight, Zap, Settings } from "lucide-react"

const processIcons = [CheckCircle, Zap, Settings]

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })

  const steps = [
    {
      title: "Discovery & Consultation",
      description: "We learn your goals, identify bottlenecks, and plan where automation will have the biggest ROI.",
      details: ["Business process audit", "ROI opportunity mapping", "Custom solution design"],
      gradient: ["#A72BFF", "#E94EFF"],
    },
    {
      title: "Custom AI Design",
      description: "We tailor automation systems to your industry, processes, and budget.",
      details: ["Prototype development", "Integration planning", "Testing & validation"],
      gradient: ["#E94EFF", "#FF3DD9"],
    },
    {
      title: "Deployment & Training",
      description:
        "We launch your solution, train your team, and provide ongoing optimisation to ensure lasting value.",
      details: ["Live deployment", "Team training", "Ongoing optimization"],
      gradient: ["#FF3DD9", "#A72BFF"],
    },
  ]

  return (
    <section
      id="process"
      ref={containerRef}
      className="relative py-section px-mobile overflow-hidden bg-gradient-to-b from-background to-[#0F051C]"
    >
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute top-10 right-10 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-primary/5 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-24 h-24 sm:w-32 sm:h-32 lg:w-48 lg:h-48 bg-primary/10 rounded-full blur-2xl"
          animate={{
            x: [0, -20, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 2,
          }}
        />
      </div>

      <div className="container-wide relative z-10">
        <motion.div
          className="text-center mb-12 sm:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse mr-2"></span>
            <span className="text-primary font-medium tracking-wide">Our Process</span>
          </div>

          <h2 className="text-responsive-4xl lg:text-responsive-5xl font-bold text-white mb-4 sm:mb-6 tracking-tight">
            How We{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-gradient-neon animate-gradient-shift">Work With You</span>
              <motion.span
                className="absolute -bottom-2 left-0 right-0 h-[6px] sm:h-[10px] bg-gradient-neon opacity-20 rounded-full blur-sm"
                initial={{ width: "0%" }}
                animate={isInView ? { width: "100%" } : {}}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </span>
          </h2>

          <motion.p
            className="text-responsive-base sm:text-responsive-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            From initial consultation to full deployment, we ensure your AI automation delivers real results.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {steps.map((step, index) => {
            const IconComponent = processIcons[index]

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: index * 0.15,
                  ease: [0.19, 1, 0.22, 1],
                }}
                whileHover={{ y: -10 }}
                className="h-full"
              >
                <Card className="border border-white/10 shadow-lg overflow-hidden h-full bg-black/20 backdrop-blur-sm group transition-all duration-500 relative">
                  {/* Gradient border effect */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{
                      background: `linear-gradient(60deg, ${step.gradient[0]}22, ${step.gradient[1]}22)`,
                      borderRadius: "inherit",
                    }}
                  />

                  {/* Card Content */}
                  <div className="relative z-10">
                    <CardHeader className="card-mobile pb-4">
                      <div className="flex items-center justify-between mb-4">
                        {/* Step number and icon */}
                        <div className="flex items-center space-x-4">
                          <div
                            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white text-xl sm:text-2xl font-bold relative overflow-hidden"
                            style={{
                              background: `linear-gradient(135deg, ${step.gradient[0]}, ${step.gradient[1]})`,
                            }}
                          >
                            <span className="relative z-10">{index + 1}</span>
                            <motion.div
                              className="absolute inset-0 bg-white/20"
                              initial={{ scale: 0 }}
                              whileHover={{ scale: 1 }}
                              transition={{ duration: 0.3 }}
                            />
                          </div>

                          <div
                            className="p-2 sm:p-3 rounded-lg"
                            style={{
                              background: `linear-gradient(135deg, ${step.gradient[0]}22, ${step.gradient[1]}44)`,
                            }}
                          >
                            <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                          </div>
                        </div>

                        {/* Arrow indicator */}
                        {index < steps.length - 1 && (
                          <motion.div
                            className="hidden lg:block text-white/30"
                            animate={{ x: [0, 5, 0] }}
                            transition={{
                              duration: 2,
                              repeat: Number.POSITIVE_INFINITY,
                              repeatType: "reverse",
                            }}
                          >
                            <ArrowRight className="w-5 h-5" />
                          </motion.div>
                        )}
                      </div>

                      <CardTitle className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-gradient-neon transition-all duration-300">
                        {step.title}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="card-mobile pt-0">
                      <CardDescription className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">
                        {step.description}
                      </CardDescription>

                      {/* Process details */}
                      <div className="space-y-3">
                        <h4 className="text-white/80 text-xs sm:text-sm uppercase tracking-wider font-medium">
                          What We Do
                        </h4>
                        <ul className="space-y-2">
                          {step.details.map((detail, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={isInView ? { opacity: 1, x: 0 } : {}}
                              transition={{ delay: 0.5 + index * 0.15 + i * 0.1 }}
                              className="flex items-center text-white/70 text-xs sm:text-sm"
                            >
                              <div
                                className="w-1.5 h-1.5 rounded-full mr-3 flex-shrink-0"
                                style={{ backgroundColor: step.gradient[0] }}
                              ></div>
                              {detail}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </div>

                  {/* Bottom gradient line */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(to right, ${step.gradient[0]}, ${step.gradient[1]})`,
                    }}
                  />
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-12 sm:mt-16 lg:mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <a
            href="#testimonials"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById("testimonials")?.scrollIntoView({ behavior: "smooth" })
            }}
            className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 transition-all duration-300 group text-sm sm:text-base"
          >
            See how it works in practice
            <motion.div initial={{ x: 0 }} whileHover={{ x: 5 }} className="ml-2">
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
