"use client"

import { incrementClick } from "@/app/admin/actions"
import { BrandIcon, getBrandColor, isPlatformSupported, type PlatformKey } from "@/components/brand-icon"
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
  
  // Usar BrandIcon si la plataforma está soportada
  const platformKey = platform as string
  const useBrandIcon = isPlatformSupported(platformKey)
  const brandColor = useBrandIcon ? getBrandColor(platformKey as PlatformKey) : config.color

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
          e.currentTarget.style.borderColor = brandColor
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(24, 24, 27, 0.8)'
          e.currentTarget.style.borderColor = 'rgba(63, 63, 70, 0.5)'
        }}
      >
        {useBrandIcon ? (
          <BrandIcon 
            platform={platformKey as PlatformKey} 
            className="w-5 h-5 flex-shrink-0 text-zinc-100"
          />
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 flex-shrink-0">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
          </svg>
        )}
        <span className="text-base font-medium text-zinc-100 truncate">
          {block.title}
        </span>
      </div>
    </a>
  )
}