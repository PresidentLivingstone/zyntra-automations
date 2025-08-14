// components/scroll-restoration.tsx
"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function ScrollRestoration() {
  const pathname = usePathname()

  useEffect(() => {
    // Save scroll position before navigation
    const saveScrollPosition = () => {
      sessionStorage.setItem(
        `scrollPos-${pathname}`,
        JSON.stringify({ x: window.scrollX, y: window.scrollY })
      )
    }

    // Restore scroll position
    const scrollData = sessionStorage.getItem(`scrollPos-${pathname}`)
    if (scrollData) {
      const { x, y } = JSON.parse(scrollData)
      window.scrollTo(x, y)
    }

    window.addEventListener("beforeunload", saveScrollPosition)
    return () => window.removeEventListener("beforeunload", saveScrollPosition)
  }, [pathname])

  return null
}
