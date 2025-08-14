"use client"

import { Hero } from "@/components/hero"
import { Stats } from "@/components/stats"
import { Solutions } from "@/components/solutions"
import { TechStack } from "@/components/tech-stack" // Added tech stack import
import { Process } from "@/components/process"
import { Testimonials } from "@/components/testimonials"
import { About } from "@/components/about"
import { Founder } from "@/components/founder"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <section id="home">
        <Hero />
      </section>

      <section id="stats" className="scroll-mt-20">
        <Stats />
      </section>

      <section id="services" className="scroll-mt-20">
        <Solutions />
      </section>

      <section id="tech-stack" className="scroll-mt-20">
        <TechStack />
      </section>

      <section id="process" className="scroll-mt-20">
        <Process />
      </section>

      <section id="testimonials" className="scroll-mt-20">
        <Testimonials />
      </section>

      <section id="about" className="scroll-mt-20">
        <About />
        <Founder />
      </section>

      <section id="contact" className="scroll-mt-20">
        <CTA />
      </section>

      <Footer />
    </main>
  )
}
