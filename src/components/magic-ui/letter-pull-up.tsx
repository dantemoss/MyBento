"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface LetterPullUpProps {
  className?: string
  words: string
  delay?: number
}

export function LetterPullUp({ className, words, delay = 0 }: LetterPullUpProps) {
  const letters = words.split("")

  return (
    <div className={cn("flex flex-wrap justify-center", className)}>
      {letters.map((letter, i) => (
        <motion.span
          key={`${letter}-${i}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: delay + i * 0.05,
            type: "spring",
            stiffness: 125,
            damping: 12,
          }}
          className="inline-block"
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </div>
  )
}
