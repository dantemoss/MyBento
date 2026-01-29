"use client"

import { GripVertical, BarChart2, ExternalLink } from "lucide-react"
import { EditBlockBtn } from "./edit-block-btn"
import { DeleteBlockBtn } from "./delete-block-btn"
import { PlatformIcon } from "@/components/icons"
import { detectPlatform, getPlatformConfig, type Platform } from "@/lib/platforms"

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
  const platform = block.url ? detectPlatform(block.url) as Platform : 'link'
  const config = getPlatformConfig(platform)

  return (
    <div className="relative w-full flex flex-col overflow-hidden rounded-xl border bg-gradient-to-br from-zinc-900 via-zinc-800 to-black border-white/[0.08] shadow-2xl shadow-black/60 transition-all duration-500 group hover:border-white/15 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)] before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/[0.05] before:via-transparent before:to-transparent before:opacity-0 before:transition-opacity before:duration-500 group-hover:before:opacity-100">
      {/* RUIDO METÁLICO */}
      <div 
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* EFECTO DE BRILLO METÁLICO */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* LOGO GIGANTE FONDO */}
      {block.url && (
        <div className="absolute -right-6 -bottom-8 opacity-[0.06] rotate-12 transition-all duration-700 group-hover:scale-110 group-hover:opacity-[0.12] group-hover:rotate-6 pointer-events-none">
          <div className="w-40 h-40 flex items-center justify-center" style={{ filter: 'blur(0.5px)' }}>
            <PlatformIcon 
              platform={platform} 
              className="w-full h-full text-white drop-shadow-2xl"
            />
          </div>
        </div>
      )}

      {/* HEADER CON CONTROLES */}
      <div className="relative z-10 flex flex-row items-center justify-between p-4 border-b border-white/[0.05]">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {/* ICONO */}
          {block.url && (
            <div className="flex-shrink-0 p-2.5 rounded-xl bg-gradient-to-br from-white/[0.08] to-white/[0.03] border border-white/[0.1] shadow-lg shadow-black/30 backdrop-blur-sm group-hover:from-white/[0.15] group-hover:to-white/[0.08] group-hover:border-white/[0.2] transition-all duration-500">
              <div className="w-6 h-6 flex items-center justify-center" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>
                <PlatformIcon 
                  platform={platform} 
                  className="w-full h-full text-zinc-200 group-hover:text-white transition-all duration-500"
                />
              </div>
            </div>
          )}
          
          {/* TÍTULO */}
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-zinc-100 truncate group-hover:text-white transition-colors duration-500 drop-shadow-sm">
              {block.title || "Sin título"}
            </h3>
            {block.url && (
              <p className="text-[10px] font-mono text-zinc-500 truncate mt-0.5 group-hover:text-zinc-400 transition-colors duration-500">
                {config.name}
              </p>
            )}
          </div>
        </div>

        {/* CONTROLES */}
        <div className="flex items-center gap-1.5 ml-3">
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
          <div className="p-1.5 rounded-lg bg-white/[0.05] border border-white/[0.08] cursor-grab">
            <GripVertical className="w-4 h-4 text-zinc-500 group-hover:text-zinc-300 transition-colors duration-500" />
          </div>
        </div>
      </div>

      {/* CONTENIDO */}
      <div className="relative z-10 p-4 space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
            {block.type}
          </span>
          {block.url && (
            <div className="flex items-center gap-1.5 text-zinc-500">
              <ExternalLink className="w-3 h-3" />
              <span className="text-[10px] font-mono truncate max-w-[200px]">
                {block.url}
              </span>
            </div>
          )}
        </div>

        {/* CLICKS */}
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-400 bg-black/50 backdrop-blur-sm px-2.5 py-1.5 rounded-lg border border-white/[0.08] shadow-inner w-fit group-hover:bg-black/60 group-hover:border-white/[0.12] transition-all duration-500">
          <BarChart2 className="w-3 h-3" />
          <span>{block.clicks || 0} clicks</span>
        </div>
      </div>

      {/* REFLEJO SUPERIOR */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  )
}
