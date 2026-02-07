"use client"

import { useState } from "react"
import { BlocksGrid } from "@/components/blocks-grid"
import { CardVariantSelector } from "@/components/card-variant-selector"
import { EditBlockSheet } from "@/components/edit-block-sheet"
import type { Block } from "@/lib/types"

interface AdminDashboardClientProps {
  initialBlocks: Block[]
}

export function AdminDashboardClient({ initialBlocks }: AdminDashboardClientProps) {
  const [cardVariant, setCardVariant] = useState<"dark" | "silver">("dark")
  const [selectedBlock, setSelectedBlock] = useState<Block | null>(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const handleBlockClick = (block: Block) => {
    setSelectedBlock(block)
    setIsSheetOpen(true)
  }

  const handleSheetClose = (open: boolean) => {
    setIsSheetOpen(open)
    if (!open) {
      setSelectedBlock(null)
    }
  }

  return (
    <>
      {/* Selector de Variante de Cards */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-zinc-400 font-medium">Estilo de cards:</span>
        <CardVariantSelector value={cardVariant} onChange={setCardVariant} />
      </div>

      {/* GRID DE BLOQUES CON DRAG & DROP */}
      <BlocksGrid 
        initialBlocks={initialBlocks} 
        cardVariant={cardVariant}
        onBlockClick={handleBlockClick}
      />

      {/* EDIT BLOCK SHEET - key fuerza re-render cuando cambia el bloque */}
      {selectedBlock && (
        <EditBlockSheet
          key={selectedBlock.id}
          block={selectedBlock}
          open={isSheetOpen}
          onOpenChange={handleSheetClose}
        />
      )}
    </>
  )
}
