"use client"

import { type ReactNode, useRef } from "react"
import { motion, useInView } from "framer-motion"

type ScrollRevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  once?: boolean
  direction?: "up" | "down" | "left" | "right"
}

const directionOffset = {
  up: { y: 24 },
  down: { y: -24 },
  left: { x: 24 },
  right: { x: -24 },
}

export const ScrollReveal = ({
  children,
  className = "",
  delay = 0,
  once = true,
  direction = "up",
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once, amount: 0.2 })
  const offset = directionOffset[direction]

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...offset }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...offset }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  )
}
