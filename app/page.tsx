"use client"

import { Hero } from "@/components/hero"
import { Overview } from "@/components/overview"
import { WorkshopHighlights } from "@/components/workshop-highlights"
import { Outcomes } from "@/components/outcomes"
import { Bonuses } from "@/components/bonuses"
import { TargetAudience } from "@/components/target-audience"
import { DeliveryFormat } from "@/components/delivery-format"
import { Testimonials } from "@/components/testimonials"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <section id="home">
        <Hero />
      </section>

      <section id="overview" className="scroll-mt-20">
        <Overview />
      </section>

      <section id="highlights" className="scroll-mt-20">
        <WorkshopHighlights />
      </section>

      <section id="outcomes" className="scroll-mt-20">
        <Outcomes />
      </section>

      <section id="bonuses" className="scroll-mt-20">
        <Bonuses />
      </section>

      <section id="audience" className="scroll-mt-20">
        <TargetAudience />
      </section>

      <section id="format" className="scroll-mt-20">
        <DeliveryFormat />
      </section>

      <section id="testimonials" className="scroll-mt-20">
        <Testimonials />
      </section>

      <section id="contact" className="scroll-mt-20">
        <Contact />
      </section>

      <Footer />
    </main>
  )
}
