"use client"

import { useRef, useCallback } from "react"

export function useMagneticHover(strength = 0.3) {
  const ref = useRef<HTMLElement>(null)

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!ref.current) return

      const { left, top, width, height } = ref.current.getBoundingClientRect()
      const centerX = left + width / 2
      const centerY = top + height / 2

      const deltaX = (e.clientX - centerX) * strength
      const deltaY = (e.clientY - centerY) * strength

      ref.current.style.transform = `translate(${deltaX}px, ${deltaY}px)`
    },
    [strength],
  )

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return
    ref.current.style.transform = "translate(0px, 0px)"
  }, [])

  const bind = useCallback(
    () => ({
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
    }),
    [handleMouseMove, handleMouseLeave],
  )

  return { ref, bind }
}
