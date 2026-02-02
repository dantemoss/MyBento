"use client"

import { motion } from "framer-motion"
import { GripVertical, Edit3, ExternalLink, MousePointerClick } from "lucide-react"
import { cn } from "@/lib/utils"
import { ReactNode, useState } from "react"

interface DashboardBlockCardProps {
  title: string
  platform?: string
  icon: ReactNode
  brandColor?: string
  isActive?: boolean
  clicks?: number
  url?: string
  onEdit?: () => void
  onDelete?: () => void
  onDrag?: () => void
  className?: string
  variant?: "dark" | "silver" | "white"
}

export function DashboardBlockCard({
  title,
  platform,
  icon,
  brandColor = "#71717a",
  isActive = true,
  clicks = 0,
  url,
  onEdit,
  onDelete,
  onDrag,
  className,
  variant = "dark",
}: DashboardBlockCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Configuración de variantes premium con efectos metálicos reales
  const variantStyles = {
    dark: {
      bg: "bg-gradient-to-br from-zinc-800 to-zinc-900",
      border: "border-zinc-700/50",
      shadow: "shadow-[0_8px_32px_rgba(0,0,0,0.4)]",
      titleColor: "text-white",
      platformColor: "text-zinc-400",
      metricBg: "bg-black/40",
      metricText: "text-zinc-300",
      iconColor: "text-zinc-400",
      shine: "from-white/5 via-white/10 to-white/5",
      metallic: "bg-gradient-to-br from-zinc-700/20 via-zinc-600/10 to-zinc-700/20",
    },
    silver: {
      bg: "bg-gradient-to-br from-zinc-200 via-zinc-100 to-zinc-300",
      border: "border-zinc-400/60",
      shadow: "shadow-[0_12px_40px_rgba(0,0,0,0.15),0_4px_12px_rgba(0,0,0,0.1)]",
      titleColor: "text-zinc-900",
      platformColor: "text-zinc-700",
      metricBg: "bg-white/90 backdrop-blur-sm",
      metricText: "text-zinc-800",
      iconColor: "text-zinc-900",
      shine: "from-white/60 via-white/95 to-white/60",
      metallic: "bg-gradient-to-br from-zinc-300/40 via-zinc-200/20 to-zinc-300/40",
    },
    white: {
      bg: "bg-gradient-to-br from-zinc-50 via-gray-100 to-zinc-100",
      border: "border-zinc-300/50",
      shadow: "shadow-[0_8px_32px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04)]",
      titleColor: "text-zinc-900",
      platformColor: "text-zinc-600",
      metricBg: "bg-zinc-100/90 backdrop-blur-sm",
      metricText: "text-zinc-700",
      iconColor: "text-zinc-800",
      shine: "from-white/80 via-white to-white/80",
      metallic: "bg-gradient-to-br from-gray-100/30 via-zinc-50/10 to-gray-100/30",
    },
  }

  const styles = variantStyles[variant]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        scale: 1.02,
        y: -4,
      }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn(
        "group relative overflow-hidden rounded-2xl cursor-pointer",
        styles.bg,
        `border-2 ${styles.border}`,
        styles.shadow,
        "transition-all duration-300",
        !isActive && "opacity-60",
        className
      )}
      style={{
        boxShadow: isHovered 
          ? `0 20px 60px rgba(0,0,0,0.2), 0 0 0 1px ${variant === "dark" ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.8)"} inset, 0 0 40px ${brandColor}20`
          : undefined,
      }}
    >
      {/* Gradient Border Effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div 
          className="absolute inset-0 rounded-2xl"
          style={{
            background: `linear-gradient(135deg, ${brandColor}20 0%, transparent 50%, ${brandColor}10 100%)`,
          }}
        />
      </div>

      {/* Inner Glow/Shadow for depth - Premium Edition */}
      <div className={cn(
        "absolute inset-0 rounded-2xl pointer-events-none",
        variant === "dark" && "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),inset_0_-1px_0_0_rgba(0,0,0,0.2)]",
        variant === "silver" && "shadow-[inset_0_3px_6px_0_rgba(255,255,255,0.9),inset_0_-3px_6px_0_rgba(0,0,0,0.15)]",
        variant === "white" && "shadow-[inset_0_2px_4px_0_rgba(255,255,255,1),inset_0_-1px_2px_0_rgba(0,0,0,0.06)]"
      )} />
      
      {/* Metallic Base Layer */}
      <div 
        className={cn(
          "absolute inset-0 rounded-2xl pointer-events-none",
          styles.metallic,
          variant === "silver" && "opacity-60",
          variant === "white" && "opacity-40",
          variant === "dark" && "opacity-30"
        )}
      />
      
      {/* Metallic Texture Overlay */}
      <div 
        className={cn(
          "absolute inset-0 rounded-2xl mix-blend-overlay pointer-events-none",
          variant === "silver" && "opacity-50",
          variant === "white" && "opacity-25",
          variant === "dark" && "opacity-30"
        )}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Silver Specific: Brushed Metal Effect */}
      {variant === "silver" && (
        <div 
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-20"
          style={{
            background: "repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.3) 2px, rgba(255,255,255,0.3) 4px)",
          }}
        />
      )}
      
      {/* Grid Pattern Background - Sutil para todas las variantes */}
      <div 
        className={cn(
          "absolute inset-0 rounded-2xl pointer-events-none",
          variant === "dark" && "opacity-[0.15]",
          variant === "silver" && "opacity-[0.12]",
          variant === "white" && "opacity-[0.18]"
        )}
        style={{
          backgroundImage: `
            linear-gradient(${variant === "dark" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.4)"} 1px, transparent 1px),
            linear-gradient(90deg, ${variant === "dark" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.4)"} 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Top Controls - Drag Handle & Status */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20">
        {/* Drag Handle */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => {
            e.stopPropagation()
            onDrag?.()
          }}
          className={cn(
            "p-1.5 rounded-lg backdrop-blur-sm border transition-colors cursor-grab active:cursor-grabbing",
            variant === "dark" && "bg-black/40 border-zinc-700/50 hover:bg-black/60",
            variant === "silver" && "bg-white/90 border-zinc-400/50 hover:bg-white",
            variant === "white" && "bg-zinc-100/90 border-zinc-300/50 hover:bg-zinc-100"
          )}
        >
          <GripVertical className={cn(
            "w-4 h-4",
            variant === "dark" && "text-zinc-400",
            variant === "silver" && "text-zinc-700",
            variant === "white" && "text-zinc-600"
          )} />
        </motion.button>

        {/* Active Status Indicator */}
        <div className="flex items-center gap-2">
          <div className={cn(
            "w-2 h-2 rounded-full transition-all duration-300",
            isActive 
              ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" 
              : "bg-zinc-400 dark:bg-zinc-600"
          )} />
        </div>
      </div>

      {/* Logo Grande Difuminado a la Derecha - Alineado con la base */}
      <motion.div
        animate={{
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="absolute right-8 bottom-12 z-0"
      >
        {/* Glow Effect */}
        <div 
          className="absolute inset-0 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle, ${brandColor} 0%, transparent 70%)`,
            transform: "scale(1.8)",
          }}
        />
        
        {/* Icon Container - Grande y Difuminado con color adaptativo */}
        <div 
          className={cn(
            "relative w-48 h-48 flex items-center justify-center blur-[0.3px]",
            variant === "dark" && "opacity-60",
            variant === "silver" && "opacity-70",
            variant === "white" && "opacity-65"
          )}
        >
          <div 
            className={cn(
              "w-full h-full flex items-center justify-center",
              styles.iconColor
            )}
            style={{
              filter: variant !== "dark" ? `drop-shadow(0 2px 12px ${brandColor}60) brightness(1.1)` : `brightness(1.2)`,
            }}
          >
            {icon}
          </div>
        </div>
      </motion.div>

      {/* Main Content - Izquierda */}
      <div className="relative z-10 p-6 pt-12 pb-16 flex flex-col items-start justify-center text-left">
        {/* Title - Premium Typography */}
        <h3 className={cn(
          "text-xl font-bold mb-2 line-clamp-2 max-w-[70%]",
          "tracking-tight leading-tight",
          "font-sans",
          styles.titleColor
        )}>
          {title}
        </h3>

        {/* Platform Name - Refined Typography */}
        {platform && (
          <p className={cn(
            "text-xs font-medium uppercase tracking-wider",
            "font-sans",
            styles.platformColor
          )}>
            {platform}
          </p>
        )}
      </div>

      {/* Bottom Info Bar - Premium Edition */}
      <div className={cn(
        "absolute bottom-0 left-0 right-0 p-3 backdrop-blur-sm",
        "bg-gradient-to-t",
        variant === "dark" && "from-black/20 to-transparent border-t border-zinc-700/50",
        variant === "silver" && "from-zinc-100/80 to-transparent border-t border-zinc-300/60",
        variant === "white" && "from-zinc-50/80 to-transparent border-t border-zinc-200/60"
      )}>
        <div className="flex items-center justify-between">
          {/* Clicks Counter */}
          <div className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg",
            styles.metricBg,
            "border",
            variant === "dark" && "border-zinc-700/30",
            variant === "silver" && "border-zinc-300/50",
            variant === "white" && "border-zinc-200/50"
          )}>
            <MousePointerClick className={cn("w-3 h-3", styles.metricText)} />
            <span className={cn("text-xs font-semibold tabular-nums", styles.metricText)}>
              {clicks}
            </span>
          </div>

          {/* External Link Icon */}
          {url && (
            <div className={cn(
              "p-1.5 rounded-lg border",
              styles.metricBg,
              variant === "dark" && "border-zinc-700/30",
              variant === "silver" && "border-zinc-300/50",
              variant === "white" && "border-zinc-200/50"
            )}>
              <ExternalLink className={cn("w-3.5 h-3.5", styles.metricText)} />
            </div>
          )}
        </div>
      </div>

      {/* Hover Overlay - Edit Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent backdrop-blur-[2px] flex items-center justify-center z-30 pointer-events-none"
      >
        <motion.button
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: isHovered ? 1 : 0.8,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 20,
            delay: 0.05,
          }}
          onClick={(e) => {
            e.stopPropagation()
            onEdit?.()
          }}
          className={cn(
            "pointer-events-auto px-6 py-2.5 rounded-xl font-semibold text-sm shadow-2xl hover:scale-105 transition-transform flex items-center gap-2 border",
            variant === "dark" && "bg-white text-zinc-900 border-zinc-200",
            variant === "silver" && "bg-zinc-900 text-white border-zinc-700",
            variant === "white" && "bg-zinc-900 text-white border-zinc-700"
          )}
        >
          <Edit3 className="w-4 h-4" />
          Editar
        </motion.button>
      </motion.div>

      {/* Premium Metallic Shine Effect */}
      <div 
        className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl",
          "bg-gradient-to-br",
          styles.shine
        )}
        style={{
          backgroundSize: "200% 200%",
          animation: "shimmer 3s ease-in-out infinite",
        }}
      />
    </motion.div>
  )
}
