"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface BentoGridProps {
  className?: string
  children: ReactNode
}

interface BentoCardProps {
  className?: string
  name?: string
  description?: string
  href?: string
  cta?: string
  children?: ReactNode
  header?: ReactNode
  icon?: ReactNode
  delay?: number
}

export function BentoGrid({ className, children }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-1 gap-4",
        "md:grid-cols-3",
        className
      )}
    >
      {children}
    </div>
  )
}

export function BentoCard({
  name,
  description,
  href,
  cta,
  className,
  children,
  header,
  icon,
  delay = 0,
}: BentoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "group relative col-span-1 flex flex-col justify-between overflow-hidden rounded-2xl",
        "bg-white dark:bg-zinc-900",
        "border border-zinc-200 dark:border-zinc-800",
        "transition-all duration-300 hover:border-zinc-300 dark:hover:border-zinc-700",
        "hover:shadow-lg hover:shadow-zinc-900/5 dark:hover:shadow-zinc-900/30",
        className
      )}
    >
      {header}
      <div className="relative flex h-full min-h-[6rem] flex-col gap-3 p-8">
        {icon && (
          <div className="mb-2 p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 w-fit">
            {icon}
          </div>
        )}
        {name && (
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-xl">
              {name}
            </h3>
          </div>
        )}
        {description && (
          <p className="text-sm font-normal text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {description}
          </p>
        )}
        {children}
      </div>
    </motion.div>
  )
}
