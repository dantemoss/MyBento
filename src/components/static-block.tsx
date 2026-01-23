"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { GripVertical, BarChart2 } from "lucide-react"
import { EditBlockBtn } from "./edit-block-btn"
import { DeleteBlockBtn } from "./delete-block-btn"

interface Block {
  id: string
  title: string | null
  url: string | null
  type: string
  clicks: number | null
}

interface StaticBlockProps {
  block: Block
}

export function StaticBlock({ block }: StaticBlockProps) {
  return (
    <Card className="bg-zinc-900 border-zinc-800 text-zinc-100 group hover:border-zinc-700 transition-colors">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium truncate flex-1 mr-2">
          {block.title || "Sin título"}
        </CardTitle>
        <div className="flex items-center gap-1">
          <EditBlockBtn
            block={{
              id: block.id,
              title: block.title || "",
              url: block.url || "",
              type: block.type,
            }}
          />
          <DeleteBlockBtn
            blockId={block.id}
            blockTitle={block.title || "Sin título"}
          />
          <div className="p-1">
            <GripVertical className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 cursor-grab" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-zinc-500 font-mono truncate">
          {block.type.toUpperCase()}
        </p>
        {block.url && (
          <p className="text-sm text-zinc-400 mt-2 truncate underline decoration-zinc-700 underline-offset-4">
            {block.url}
          </p>
        )}
        <div className="flex items-center gap-2 mt-4 text-zinc-500 text-xs font-medium bg-zinc-950/50 p-2 rounded w-fit">
          <BarChart2 className="w-3 h-3" />
          <span>{block.clicks || 0} clicks</span>
        </div>
      </CardContent>
    </Card>
  )
}
