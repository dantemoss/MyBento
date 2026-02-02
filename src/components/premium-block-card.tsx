"use client"

import { PlatformIcon } from "@/components/icons"
import { detectPlatform, getPlatformConfig, type Platform } from "@/lib/platforms"
import { MousePointerClick, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

interface PremiumBlockCardProps {
  title: string
  url?: string | null
  clicks?: number | null
  variant?: "silver" | "black" | "white"
  className?: string
  onClick?: () => void
}

export function PremiumBlockCard({
  title,
  url,
  clicks,
  variant = "black",
  className,
  onClick,
}: PremiumBlockCardProps) {
  const platform = url ? (detectPlatform(url) as Platform) : "link"
  const config = getPlatformConfig(platform)

  // Configuración de variantes
  const variantStyles = {
    silver: {
      bg: "bg-gradient-to-br from-zinc-200 via-zinc-100 to-zinc-50",
      darkBg: "dark:from-zinc-700 dark:via-zinc-600 dark:to-zinc-500",
      text: "text-zinc-900 dark:text-zinc-100",
      textSecondary: "text-zinc-600 dark:text-zinc-400",
      metricBg: "bg-zinc-900/20 dark:bg-zinc-900/40",
      metricText: "text-zinc-700 dark:text-zinc-300",
      iconBg: "bg-zinc-900/20 dark:bg-zinc-900/40",
    },
    black: {
      bg: "bg-zinc-900",
      darkBg: "",
      text: "text-white",
      textSecondary: "text-zinc-400",
      metricBg: "bg-black/40",
      metricText: "text-zinc-300",
      iconBg: "bg-black/40",
    },
    white: {
      bg: "bg-white",
      darkBg: "dark:bg-zinc-800",
      text: "text-zinc-900 dark:text-white",
      textSecondary: "text-zinc-600 dark:text-zinc-400",
      metricBg: "bg-zinc-800/20 dark:bg-zinc-900/40",
      metricText: "text-zinc-700 dark:text-zinc-300",
      iconBg: "bg-zinc-800/20 dark:bg-zinc-900/40",
    },
  }

  const styles = variantStyles[variant]

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else if (url) {
      window.open(url, "_blank", "noopener,noreferrer")
    }
  }

  return (
    <div
      onClick={handleClick}
      className={cn(
        "group relative w-full h-full rounded-xl border transition-all duration-300 cursor-pointer",
        variant === "black" && "bg-zinc-900 border-zinc-800 hover:border-zinc-700",
        variant === "silver" && "bg-gradient-to-br from-zinc-200 via-zinc-100 to-zinc-50 dark:from-zinc-700 dark:via-zinc-600 dark:to-zinc-500 border-zinc-300/50 dark:border-zinc-600/50",
        variant === "white" && "bg-white dark:bg-zinc-800 border-zinc-200/50 dark:border-zinc-700/50",
        className
      )}
    >
      {/* Logo de plataforma grande en el fondo */}
      {url && (
        <div className="absolute -right-6 -bottom-6 opacity-[0.06] rotate-12 transition-all duration-500 group-hover:opacity-[0.1] pointer-events-none">
          <div className="w-40 h-40 flex items-center justify-center">
            <PlatformIcon
              platform={platform}
              className="w-full h-full text-white"
            />
          </div>
        </div>
      )}

      {/* Contenido principal */}
      <div className="relative z-10 p-5 h-full flex flex-col justify-between">
        {/* Header */}
        <div className="space-y-1.5">
          {/* Título grande */}
          <h3 className={cn(
            "text-base font-bold leading-tight",
            variant === "black" && "text-white",
            variant === "silver" && "text-zinc-900 dark:text-zinc-100",
            variant === "white" && "text-zinc-900 dark:text-white"
          )}>
            {title}
          </h3>

          {/* Nombre de plataforma */}
          {url && (
            <span className={cn(
              "text-xs font-normal block",
              variant === "black" && "text-zinc-400",
              variant === "silver" && "text-zinc-600 dark:text-zinc-400",
              variant === "white" && "text-zinc-600 dark:text-zinc-400"
            )}>
              {config.name}
            </span>
          )}
        </div>

        {/* Footer con métricas */}
        <div className="flex items-center justify-between mt-auto pt-4">
          {/* Métricas de clicks */}
          {clicks !== undefined && clicks !== null && (
            <div className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium",
              variant === "black" && "bg-black/40 text-zinc-300",
              variant === "silver" && "bg-zinc-900/20 dark:bg-zinc-900/40 text-zinc-700 dark:text-zinc-300",
              variant === "white" && "bg-zinc-800/20 dark:bg-zinc-900/40 text-zinc-700 dark:text-zinc-300"
            )}>
              <MousePointerClick className="w-3.5 h-3.5" />
              <span>{clicks} clicks</span>
            </div>
          )}

          {/* Icono de enlace externo */}
          {url && (
            <div className={cn(
              "p-2 rounded-lg",
              variant === "black" && "bg-black/40",
              variant === "silver" && "bg-zinc-900/20 dark:bg-zinc-900/40",
              variant === "white" && "bg-zinc-800/20 dark:bg-zinc-900/40"
            )}>
              <ExternalLink className={cn(
                "w-4 h-4",
                variant === "black" && "text-zinc-300",
                variant === "silver" && "text-zinc-700 dark:text-zinc-300",
                variant === "white" && "text-zinc-700 dark:text-zinc-300"
              )} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
