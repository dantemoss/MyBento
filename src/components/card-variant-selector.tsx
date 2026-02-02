"use client"

import { cn } from "@/lib/utils"

interface CardVariantSelectorProps {
  value: "dark" | "silver" | "white"
  onChange: (variant: "dark" | "silver" | "white") => void
}

export function CardVariantSelector({ value, onChange }: CardVariantSelectorProps) {
  const variants = [
    {
      id: "dark" as const,
      name: "Dark",
      preview: "bg-gradient-to-br from-zinc-800 to-zinc-900 border-zinc-700",
    },
    {
      id: "silver" as const,
      name: "Silver",
      preview: "bg-gradient-to-br from-zinc-100 via-zinc-50 to-zinc-100 border-zinc-300",
    },
    {
      id: "white" as const,
      name: "White",
      preview: "bg-gradient-to-br from-white via-zinc-50 to-white border-zinc-200",
    },
  ]

  return (
    <div className="flex items-center gap-3">
      {variants.map((variant) => (
        <button
          key={variant.id}
          onClick={() => onChange(variant.id)}
          className={cn(
            "group relative flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all duration-200",
            value === variant.id
              ? "border-zinc-400 bg-zinc-800/50"
              : "border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/30"
          )}
        >
          {/* Preview */}
          <div
            className={cn(
              "w-16 h-10 rounded-lg border-2 shadow-lg",
              variant.preview
            )}
          />
          {/* Label */}
          <span className="text-xs font-medium text-zinc-400 group-hover:text-zinc-300">
            {variant.name}
          </span>
          {/* Selected Indicator */}
          {value === variant.id && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-zinc-950" />
          )}
        </button>
      ))}
    </div>
  )
}
