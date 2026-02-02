"use client"

import { cn } from "@/lib/utils"

interface RetroGridProps {
  className?: string
  angle?: number
}

export function RetroGrid({ className, angle = 0 }: RetroGridProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 [background-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.03)_50%,transparent_100%),linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.03)_50%,transparent_100%)] [background-size:20px_20px] [background-position:0_0]",
        "dark:[background-image:linear-gradient(to_right,transparent_0%,rgba(255,255,255,0.02)_50%,transparent_100%),linear-gradient(to_bottom,transparent_0%,rgba(255,255,255,0.02)_50%,transparent_100%)]",
        className
      )}
      style={{
        transform: `rotate(${angle}deg)`,
      }}
    />
  )
}
