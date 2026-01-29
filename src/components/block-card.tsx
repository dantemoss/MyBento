"use client"

import { incrementClick } from "@/app/admin/actions"
import { PlatformIcon } from "@/components/icons"
import { detectPlatform, getPlatformConfig, type Platform } from "@/lib/platforms"
import { ExternalLink, MousePointerClick } from "lucide-react"

interface Block {
  id: string
  title: string
  url: string
  type: string
  clicks?: number
}

interface BlockCardProps {
  block: Block
  variant?: 'grid' | 'bento'
  size?: 'large' | 'medium' | 'small'
  showMetadata?: boolean // Controla si se muestran clicks y ExternalLink
}

export function BlockCard({ block, variant = 'grid', size = 'small', showMetadata = false }: BlockCardProps) {
  const platform = detectPlatform(block.url) as Platform
  const config = getPlatformConfig(platform)

  const isLarge = size === 'large'
  const isMedium = size === 'medium'
  const isBento = variant === 'bento'

  return (
    <a 
      href={block.url} 
      target="_blank" 
      rel="noreferrer"
      className="group relative block w-full h-full transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1"
      onClick={() => incrementClick(block.id)}
    >
      <div 
        className={`
          relative w-full h-full flex overflow-hidden rounded-xl border
          bg-gradient-to-br from-zinc-900 via-zinc-800 to-black
          border-white/[0.08] shadow-2xl shadow-black/60
          transition-all duration-500
          group-hover:border-white/15 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)]
          before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/[0.05] before:via-transparent before:to-transparent before:opacity-0 before:transition-opacity before:duration-500
          group-hover:before:opacity-100
          ${isBento 
            ? isLarge 
              ? 'flex-row items-center justify-between p-6' 
              : isMedium 
                ? 'flex-col items-start justify-between p-5'
                : 'flex-col items-center justify-center gap-3 p-4'
            : 'flex-row items-center justify-between p-4 gap-4'
          }
        `}
      >
        {/* RUIDO METÁLICO MEJORADO */}
        <div 
          className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* EFECTO DE BRillo METÁLICO */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* LOGO GIGANTE FONDO - MEJOR CALIDAD */}
        <div className="absolute -right-6 -bottom-8 opacity-[0.06] rotate-12 transition-all duration-700 group-hover:scale-110 group-hover:opacity-[0.12] group-hover:rotate-6 pointer-events-none">
          <div className="w-40 h-40 flex items-center justify-center" style={{ filter: 'blur(0.5px)' }}>
            <PlatformIcon 
              platform={platform} 
              className="w-full h-full text-white drop-shadow-2xl"
            />
          </div>
        </div>
        
        {/* CONTENIDO */}
        <div className={`relative z-10 flex items-center gap-4 ${!isLarge && !isMedium && isBento ? 'flex-col' : 'flex-row'}`}>
          
          {/* CONTENEDOR DE ICONO MEJORADO */}
          <div className="flex-shrink-0 p-3 rounded-xl bg-gradient-to-br from-white/[0.08] to-white/[0.03] border border-white/[0.1] shadow-lg shadow-black/30 backdrop-blur-sm group-hover:from-white/[0.15] group-hover:to-white/[0.08] group-hover:border-white/[0.2] group-hover:shadow-xl transition-all duration-500">
            <div className="w-7 h-7 flex items-center justify-center" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>
              <PlatformIcon 
                platform={platform} 
                className="w-full h-full text-zinc-200 group-hover:text-white transition-all duration-500"
              />
            </div>
          </div>

          <div className={`flex flex-col ${(!isLarge && !isMedium && isBento) ? 'items-center text-center' : 'items-start text-left'}`}>
            <span className="font-semibold text-zinc-100 text-sm tracking-wide leading-tight group-hover:text-white transition-colors duration-500 drop-shadow-sm">
              {block.title}
            </span>
            <span className="text-[10px] font-mono text-zinc-500 truncate max-w-[150px] mt-0.5 group-hover:text-zinc-400 transition-colors duration-500">
              {config.name}
            </span>
          </div>
        </div>

        {/* META DATA - Solo se muestra si showMetadata es true (Dashboard) */}
        {showMetadata && (isLarge || (!isBento)) && (
          <div className="relative z-10 flex items-center gap-3 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
            {block.clicks !== undefined && (
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-400 bg-black/50 backdrop-blur-sm px-2.5 py-1.5 rounded-lg border border-white/[0.08] shadow-inner group-hover:bg-black/60 group-hover:border-white/[0.12] transition-all duration-500">
                    <MousePointerClick className="w-3 h-3" />
                    <span>{block.clicks}</span>
                </div>
            )}
            <div className="p-1.5 rounded-lg bg-white/[0.05] border border-white/[0.08] group-hover:bg-white/[0.1] group-hover:border-white/[0.15] transition-all duration-500">
              <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-colors duration-500" />
            </div>
          </div>
        )}

      </div>
      
      {/* REFLEJO SUPERIOR MEJORADO */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* REFLEJO INFERIOR SUTIL */}
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </a>
  )
}
