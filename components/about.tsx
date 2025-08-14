"use client"

import { useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ArrowUpRight, Activity, Users, BookOpen, Lightbulb } from "lucide-react"

// Service icons mapping
const serviceIcons = {
  "Direct B2B Solutions": Activity,
  Partnerships: Users,
  "AI Training": BookOpen,
  Consulting: Lightbulb,
}

export function About() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const services = [
    {
      title: "Direct B2B Solutions",
      description: "Custom AI builds for businesses",
      color: "#FF57B9",
      details: ["End-to-end implementation", "Tailored to your workflows", "Continuous optimization"],
    },
    {
      title: "Partnerships",
      description: "Collaborations with local tech & agencies",
      color: "#E3008C",
      details: ["White-label solutions", "Revenue sharing models", "Technology integration"],
    },
    {
      title: "AI Training",
      description: "Practical workshops for teams",
      color: "#FF96E6",
      details: ["Hands-on skill building", "Real-world applications", "Ongoing support"],
    },
    {
      title: "Consulting",
      description: "AI adoption strategy & planning",
      color: "#E94EFF",
      details: ["Opportunity assessment", "Roadmap development", "ROI forecasting"],
    },
  ]

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-32 px-6 overflow-hidden bg-gradient-to-b from-white to-[#FFF0F7]"
    >
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        {/* Abstract shapes */}
        <motion.div
          className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-[#FF96E6] blur-[180px] opacity-10"
          animate={{
            x: [50, -50, 50],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-[#E3008C] blur-[150px] opacity-5"
          animate={{
            x: [-50, 50, -50],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 2,
          }}
        />

        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(#FF57B9 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            opacity: 0.05,
          }}
        ></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#FFF0F7] shadow-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-[#E3008C] animate-pulse mr-2"></span>
            <span className="text-[#E3008C] font-medium tracking-wide">About Us</span>
          </div>

          <h2 className="text-4xl lg:text-6xl font-bold mb-6 tracking-tight text-[#1B1B1B]">
            About{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-bright bg-clip-text text-transparent animate-gradient-shift">
                Zyntra Automations
              </span>
              <motion.span
                className="absolute -bottom-2 left-0 right-0 h-[10px] bg-gradient-bright opacity-20 rounded-full blur-sm"
                initial={{ width: "0%" }}
                animate={isInView ? { width: "100%" } : {}}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </span>
          </h2>

          <motion.p
            className="text-xl text-[#1B1B1B]/80 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            We're a Zimbabwean AI automation start-up created to change the way African businesses work. Founded in
            2025, our vision is to make advanced yet practical automation tools accessible to every company and not just
            big corporations.
          </motion.p>
        </motion.div>

        {/* Company info with image */}
        <motion.div
          className="flex flex-col lg:flex-row items-center gap-16 mb-24"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* Image side */}
          <div className="lg:w-1/2 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-bright opacity-10"></div>
              <div className="aspect-[4/3] relative">
                {/* Replace with your actual image */}
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mission.jpg-KTzbXHQFhUsFvMIQHsuavtkhYjc9SV.jpeg"
                  alt="Zyntra Automations mission - futuristic cityscape with neon Z logo"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between">
                <div className="text-white">
                  <div className="text-2xl font-bold">Est. 2025</div>
                  <div className="text-sm">Harare, Zimbabwe</div>
                </div>
                <div className="text-white text-right">
                  <div className="text-2xl font-bold">5+</div>
                  <div className="text-sm">Team Members</div>
                </div>
              </div>
            </div>

            <motion.div
              className="absolute -bottom-8 -right-8 bg-white rounded-xl p-6 shadow-lg border border-[#FF57B9]/10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-[#FFF0F7] flex items-center justify-center mr-3">
                  <Activity size={20} className="text-[#E3008C]" />
                </div>
                <div className="text-[#1B1B1B] font-semibold">Our Mission</div>
              </div>
              <p className="text-[#1B1B1B]/70 text-sm">
                Empower African businesses with affordable AI tools that deliver real, measurable results.
              </p>
            </motion.div>
          </div>

          <div className="lg:w-1/2">
            <h3 className="text-2xl font-bold text-[#1B1B1B] mb-6">Our Approach</h3>

            <div className="space-y-6">
              <div className="flex">
                <div className="w-10 h-10 rounded-full bg-[#FFF0F7] flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <span className="text-[#E3008C] font-bold">1</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-[#1B1B1B] mb-2">Local First</h4>
                  <p className="text-[#1B1B1B]/70">Designed for Zimbabwean markets and daily realities.</p>
                </div>
              </div>

              <div className="flex">
                <div className="w-10 h-10 rounded-full bg-[#FFF0F7] flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <span className="text-[#E3008C] font-bold">2</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-[#1B1B1B] mb-2">Practical Innovation</h4>
                  <p className="text-[#1B1B1B]/70">Deliver quick wins while paving the way for future growth.</p>
                </div>
              </div>

              <div className="flex">
                <div className="w-10 h-10 rounded-full bg-[#FFF0F7] flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <span className="text-[#E3008C] font-bold">3</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-[#1B1B1B] mb-2">Results-Driven</h4>
                  <p className="text-[#1B1B1B]/70">
                    Track every project against time saved, costs reduced, and revenue increased.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Services grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="relative"
        >
          <motion.h3
            className="text-2xl font-bold text-[#1B1B1B] mb-8 text-center"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
          >
            How We Partner With You
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const IconComponent = serviceIcons[service.title as keyof typeof serviceIcons]

              return (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] },
                    },
                  }}
                  onHoverStart={() => setHoveredCard(index)}
                  onHoverEnd={() => setHoveredCard(null)}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                >
                  <Card className="border border-[#FF57B9]/10 shadow-lg hover:shadow-xl transition-all duration-500 bg-white overflow-hidden h-full group">
                    {/* Top gradient bar */}
                    <div className="h-1.5 w-full" style={{ background: service.color }}></div>

                    <CardHeader className="pt-6 pb-3">
                      <div className="flex justify-between items-start mb-4">
                        <div
                          className="w-12 h-12 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${service.color}15` }}
                        >
                          <IconComponent size={24} style={{ color: service.color }} />
                        </div>

                        <motion.div
                          className="w-8 h-8 rounded-full flex items-center justify-center border border-[#FF57B9]/10 opacity-0 group-hover:opacity-100 transition-opacity"
                          whileHover={{ rotate: 45 }}
                        >
                          <ArrowUpRight size={14} className="text-[#E3008C]" />
                        </motion.div>
                      </div>

                      <CardTitle className="text-xl font-bold text-[#1B1B1B] mb-2 group-hover:text-[#E3008C] transition-colors duration-300">
                        {service.title}
                      </CardTitle>

                      <CardDescription className="text-[#1B1B1B]/70 text-base font-medium">
                        {service.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      {/* Expanded details on hover */}
                      <AnimatePresence>
                        {hoveredCard === index && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-2 pt-4 border-t border-[#FF57B9]/10"
                          >
                            <ul className="space-y-2">
                              {service.details.map((detail, i) => (
                                <motion.li
                                  key={i}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.1 }}
                                  className="flex items-center text-sm text-[#1B1B1B]/70"
                                >
                                  <div
                                    className="w-1.5 h-1.5 rounded-full mr-2"
                                    style={{ backgroundColor: service.color }}
                                  ></div>
                                  {detail}
                                </motion.li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
