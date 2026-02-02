"use client"

import { useState } from "react"
import { BlocksGrid } from "@/components/blocks-grid"
import { CardVariantSelector } from "@/components/card-variant-selector"

interface Block {
  id: string
  title: string | null
  url: string | null
  type: string
  clicks: number | null
  position: number
}

interface AdminDashboardClientProps {
  initialBlocks: Block[]
}

export function AdminDashboardClient({ initialBlocks }: AdminDashboardClientProps) {
  const [cardVariant, setCardVariant] = useState<"dark" | "silver" | "white">("dark")

  return (
    <>
      {/* Selector de Variante de Cards */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-zinc-400 font-medium">Estilo de cards:</span>
        <CardVariantSelector value={cardVariant} onChange={setCardVariant} />
      </div>

      {/* GRID DE BLOQUES CON DRAG & DROP */}
      <BlocksGrid initialBlocks={initialBlocks} cardVariant={cardVariant} />
    </>
  )
}
