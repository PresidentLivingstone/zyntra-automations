"use client"

import type React from "react"

import { ThemeProvider } from "next-themes"
import { LazyMotion, domMax } from "framer-motion"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
      <LazyMotion features={domMax} strict>
        {children}
      </LazyMotion>
    </ThemeProvider>
  )
}
