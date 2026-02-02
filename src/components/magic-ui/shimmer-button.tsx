"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface ShimmerButtonProps extends React.ComponentProps<typeof Button> {
  children: ReactNode
  shimmerColor?: string
  shimmerSize?: string
  borderRadius?: string
  shimmerDuration?: string
  background?: string
  className?: string
}

export function ShimmerButton({
  children,
  className,
  shimmerColor,
  shimmerDuration = "3s",
  borderRadius = "100px",
  ...props
}: ShimmerButtonProps) {
  return (
    <Button
      className={cn(
        "relative z-10 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap px-6 py-3 text-sm font-semibold transition-all duration-300 hover:scale-[1.05]",
        "bg-black dark:bg-white text-white dark:text-black",
        "border border-black/10 dark:border-white/20",
        className
      )}
      style={{
        borderRadius: borderRadius,
      }}
      {...props}
    >
      <div
        className={cn(
          "pointer-events-none absolute -inset-[100%] z-0 animate-[shimmer_3s_ease-in-out_infinite]",
          "bg-gradient-to-r from-transparent via-white/20 dark:via-black/20 to-transparent"
        )}
        style={{
          animationDuration: shimmerDuration,
        }}
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </Button>
  )
}
