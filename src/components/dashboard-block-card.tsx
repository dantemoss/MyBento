"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { GripVertical, Settings, MousePointerClick, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

interface DashboardBlockCardProps {
  title: string
  icon: ReactNode
  brandColor: string
  platform?: string
  isActive?: boolean
  isHighlighted?: boolean
  clicks?: number
  url?: string
  variant?: "dark" | "silver"
  className?: string
  onManage?: () => void
  onEdit?: () => void
  onDrag?: () => void
}

export function DashboardBlockCard({
  title,
  icon,
  brandColor,
  platform,
  isActive = true,
  isHighlighted = false,
  clicks = 0,
  url,
  variant = "dark",
  className,
  onManage,
  onEdit,
  onDrag,
}: DashboardBlockCardProps) {
  // Variantes de estilo
  const variantStyles = {
    dark: "bg-zinc-900 border-zinc-800",
    silver: "bg-gradient-to-br from-[#c0c0c0] via-[#d4d4d8] to-[#a8a8a8] border-zinc-400",
  }

  const textColorVariants = {
    dark: "text-zinc-100",
    silver: "text-zinc-900",
  }

  const subtextColorVariants = {
    dark: "text-zinc-400",
    silver: "text-zinc-700",
  }

  // Determinar si el logo necesita invertirse (logos oscuros en fondos oscuros)
  // Detecta colores blancos, grises claros y colores con alta luminosidad
  const isLightColor = (color: string): boolean => {
    // Normalizar el color
    const normalizedColor = color.toLowerCase().trim()
    
    // Verificar nombres de colores comunes
    if (normalizedColor === "white" || normalizedColor === "#fff" || normalizedColor === "#ffffff") {
      return true
    }
    
    // Verificar colores grises claros y blancos en formato hex
    if (normalizedColor.startsWith("#")) {
      const hex = normalizedColor.replace("#", "")
      const r = parseInt(hex.substring(0, 2), 16)
      const g = parseInt(hex.substring(2, 4), 16)
      const b = parseInt(hex.substring(4, 6), 16)
      
      // Calcular luminosidad (fórmula estándar)
      const luminosity = (0.299 * r + 0.587 * g + 0.114 * b) / 255
      
      // Si la luminosidad es mayor a 0.7, considerarlo claro
      return luminosity > 0.7
    }
    
    return false
  }
  
  const needsInvert = variant === "dark" && isLightColor(brandColor)

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn(
        "group relative w-full rounded-xl overflow-hidden cursor-pointer",
        variantStyles[variant],
        "shadow-[0_2px_8px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.06)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.3)]",
        "border",
        isHighlighted && "ring-2 ring-yellow-500/50 shadow-[0_0_30px_rgba(234,179,8,0.4)]",
        className
      )}
    >
      {/* Efecto de brillo animado para bloques destacados */}
      {isHighlighted && (
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          animate={{
            boxShadow: [
              "inset 0 0 20px rgba(234, 179, 8, 0.3)",
              "inset 0 0 40px rgba(234, 179, 8, 0.5)",
              "inset 0 0 20px rgba(234, 179, 8, 0.3)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
      {/* Inner highlight for depth */}
      <div 
        className={cn(
          "absolute inset-0 rounded-xl pointer-events-none",
          variant === "dark" && "shadow-[inset_0_1px_2px_rgba(255,255,255,0.05)]",
          variant === "silver" && "shadow-[inset_0_2px_4px_rgba(255,255,255,0.8),inset_0_-2px_4px_rgba(0,0,0,0.15)]"
        )}
      />

      {/* Metallic texture for silver */}
      {variant === "silver" && (
        <>
          {/* Brushed metal effect */}
          <div 
            className="absolute inset-0 rounded-xl pointer-events-none opacity-30"
            style={{
              background: "repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.4) 2px, rgba(255,255,255,0.4) 4px)",
            }}
          />
          {/* Metallic noise texture */}
          <div 
            className="absolute inset-0 rounded-xl mix-blend-overlay pointer-events-none opacity-40"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />
        </>
      )}

      {/* Metallic shine sweep on hover */}
      <div 
        className={cn(
          "absolute inset-0 bg-gradient-to-r -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none",
          variant === "dark" && "from-transparent via-white/30 to-transparent",
          variant === "silver" && "from-transparent via-white/60 to-transparent"
        )}
      />

      {/* Top row: drag handle + status */}
      <div className="absolute top-3 left-4 right-4 flex items-center justify-between z-10">
        <GripVertical 
          className={cn(
            "w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab",
            subtextColorVariants[variant]
          )}
          onMouseDown={onDrag}
        />
        
        {/* Active indicator */}
        <div className="flex items-center gap-1.5">
          <div
            className={cn(
              "w-2 h-2 rounded-full transition-colors duration-300",
              isActive
                ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)]"
                : "bg-zinc-400 dark:bg-zinc-500"
            )}
          />
          <span 
            className={cn(
              "text-[9px] font-semibold uppercase tracking-widest",
              subtextColorVariants[variant]
            )}
          >
            {isActive ? "Active" : "Inactive"}
          </span>
        </div>
      </div>

      {/* Left side: Title, platform, stats and action buttons */}
      <div className="absolute top-12 left-5 flex flex-col gap-3 z-10">
        <div>
          <p className={cn(
            "text-lg font-bold tracking-tight leading-tight",
            textColorVariants[variant]
          )}>
            {title}
          </p>
          <p className={cn(
            "text-[10px] font-medium uppercase tracking-widest mt-0.5",
            subtextColorVariants[variant]
          )}>
            {platform || "Integration"}
          </p>
        </div>

        {/* Stats - Clicks */}
        {clicks !== undefined && (
          <div className="flex items-center gap-1.5">
            <MousePointerClick className={cn("w-3 h-3", subtextColorVariants[variant])} />
            <span className={cn(
              "text-xs font-semibold",
              textColorVariants[variant]
            )}>
              {clicks} clicks
            </span>
          </div>
        )}
        
        {/* Action buttons */}
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {(onManage || onEdit) && (
            <button
              onClick={onManage || onEdit}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium text-xs shadow-md transition-colors w-fit",
                variant === "dark" && "bg-zinc-100 text-zinc-900 hover:bg-white",
                variant === "silver" && "bg-zinc-900 text-zinc-100 hover:bg-black"
              )}
            >
              <Settings className="w-3 h-3" />
              Manage
            </button>
          )}
          
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium text-xs shadow-md transition-colors",
                variant === "dark" && "bg-zinc-100 text-zinc-900 hover:bg-white",
                variant === "silver" && "bg-zinc-900 text-zinc-100 hover:bg-black"
              )}
            >
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>

      {/* Bottom-right: Large logo on bottom edge */}
      <div className="absolute bottom-0 right-2 z-0">
        {/* Brand color glow */}
        <div
          className="absolute inset-0 w-24 h-24 rounded-full blur-3xl opacity-20 group-hover:opacity-35 transition-opacity duration-300"
          style={{ backgroundColor: needsInvert ? "#ffffff" : brandColor }}
        />
        
        {/* Logo - larger and on bottom with smart color adaptation */}
        <div
          className={cn(
            "relative w-32 h-32 flex items-center justify-center transition-transform duration-300 group-hover:scale-105",
            needsInvert && "brightness-0 invert"
          )}
          style={{ color: brandColor }}
        >
          {icon}
        </div>
      </div>
    </motion.div>
  )
}
