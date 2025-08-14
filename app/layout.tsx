import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import { Navigation } from "@/components/navigation"
import { Providers } from "@/components/providers"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Zyntra Automations - The Future, On Autopilot",
  description:
    "Zimbabwean AI automation start-up helping local businesses transform through smart automation. Save time, cut costs, and scale faster with AI systems designed for real impact.",
  keywords: [
    "AI automation Zimbabwe",
    "business automation Harare",
    "AI solutions Bulawayo",
    "Zimbabwe tech companies",
    "African AI systems",
    "startup automation",
    "Zyntra Automations",
  ],
  generator: "v0.app",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B0316",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
        <script src="https://assets.calendly.com/assets/external/widget.js" type="text/javascript" async></script>
      </head>
      <body className="font-sans antialiased bg-[#0B0316] text-white">
        <Providers>
          <Navigation />
          {children}
        </Providers>
      </body>
    </html>
  )
}
