"use client"

import { incrementClick } from "@/app/admin/actions"
import { PlatformIcon } from "@/components/icons"
import { detectPlatform, getPlatformConfig, type Platform } from "@/lib/platforms"

interface Block {
  id: string
  title: string
  url: string
  type: string
}

export function BlockLink({ block }: { block: Block }) {
  // Detectar plataforma por URL (más preciso que el type guardado)
  const platform = detectPlatform(block.url) as Platform
  const config = getPlatformConfig(platform)

  return (
    <a 
      href={block.url} 
      target="_blank" 
      rel="noreferrer"
      className="block w-full transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
      onClick={() => {
        incrementClick(block.id)
      }}
    >
      <div 
        className="w-full h-14 flex items-center gap-4 px-5 rounded-xl border transition-all duration-200"
        style={{
          backgroundColor: 'rgba(24, 24, 27, 0.8)',
          borderColor: 'rgba(63, 63, 70, 0.5)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = config.bgColor
          e.currentTarget.style.borderColor = config.color
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(24, 24, 27, 0.8)'
          e.currentTarget.style.borderColor = 'rgba(63, 63, 70, 0.5)'
        }}
      >
        <PlatformIcon platform={platform} className="w-5 h-5 flex-shrink-0" />
        <span className="text-base font-medium text-zinc-100 truncate">
          {block.title}
        </span>
      </div>
    </a>
  )
}