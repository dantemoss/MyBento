// Configuración de plataformas soportadas
// Iconos de svgl.app - https://svgl.app

export type Platform = 
  | 'youtube'
  | 'spotify'
  | 'instagram'
  | 'twitter'
  | 'tiktok'
  | 'github'
  | 'linkedin'
  | 'discord'
  | 'twitch'
  | 'facebook'
  | 'whatsapp'
  | 'telegram'
  | 'dribbble'
  | 'behance'
  | 'figma'
  | 'notion'
  | 'medium'
  | 'substack'
  | 'patreon'
  | 'buymeacoffee'
  | 'link'    // fallback genérico
  | 'header'  // título de sección

export interface PlatformConfig {
  name: string
  patterns: string[]  // URL patterns para detectar
  color: string       // Color principal de la marca
  hoverColor: string  // Color en hover
  bgColor: string     // Background color
}

export const platforms: Record<Platform, PlatformConfig> = {
  youtube: {
    name: 'YouTube',
    patterns: ['youtube.com', 'youtu.be'],
    color: '#FF0000',
    hoverColor: '#CC0000',
    bgColor: 'rgba(255, 0, 0, 0.1)',
  },
  spotify: {
    name: 'Spotify',
    patterns: ['spotify.com', 'open.spotify.com'],
    color: '#1DB954',
    hoverColor: '#1AA34A',
    bgColor: 'rgba(29, 185, 84, 0.1)',
  },
  instagram: {
    name: 'Instagram',
    patterns: ['instagram.com', 'instagr.am'],
    color: '#E4405F',
    hoverColor: '#D62E4C',
    bgColor: 'rgba(228, 64, 95, 0.1)',
  },
  twitter: {
    name: 'X (Twitter)',
    patterns: ['twitter.com', 'x.com'],
    color: '#000000',
    hoverColor: '#333333',
    bgColor: 'rgba(0, 0, 0, 0.1)',
  },
  tiktok: {
    name: 'TikTok',
    patterns: ['tiktok.com'],
    color: '#000000',
    hoverColor: '#333333',
    bgColor: 'rgba(0, 0, 0, 0.1)',
  },
  github: {
    name: 'GitHub',
    patterns: ['github.com'],
    color: '#181717',
    hoverColor: '#333333',
    bgColor: 'rgba(24, 23, 23, 0.1)',
  },
  linkedin: {
    name: 'LinkedIn',
    patterns: ['linkedin.com'],
    color: '#0A66C2',
    hoverColor: '#004182',
    bgColor: 'rgba(10, 102, 194, 0.1)',
  },
  discord: {
    name: 'Discord',
    patterns: ['discord.com', 'discord.gg'],
    color: '#5865F2',
    hoverColor: '#4752C4',
    bgColor: 'rgba(88, 101, 242, 0.1)',
  },
  twitch: {
    name: 'Twitch',
    patterns: ['twitch.tv'],
    color: '#9146FF',
    hoverColor: '#7B2FFF',
    bgColor: 'rgba(145, 70, 255, 0.1)',
  },
  facebook: {
    name: 'Facebook',
    patterns: ['facebook.com', 'fb.com'],
    color: '#1877F2',
    hoverColor: '#0C5DC9',
    bgColor: 'rgba(24, 119, 242, 0.1)',
  },
  whatsapp: {
    name: 'WhatsApp',
    patterns: ['whatsapp.com', 'wa.me'],
    color: '#25D366',
    hoverColor: '#1DA851',
    bgColor: 'rgba(37, 211, 102, 0.1)',
  },
  telegram: {
    name: 'Telegram',
    patterns: ['telegram.org', 't.me'],
    color: '#26A5E4',
    hoverColor: '#0D8ECF',
    bgColor: 'rgba(38, 165, 228, 0.1)',
  },
  dribbble: {
    name: 'Dribbble',
    patterns: ['dribbble.com'],
    color: '#EA4C89',
    hoverColor: '#D43A77',
    bgColor: 'rgba(234, 76, 137, 0.1)',
  },
  behance: {
    name: 'Behance',
    patterns: ['behance.net'],
    color: '#1769FF',
    hoverColor: '#0050E6',
    bgColor: 'rgba(23, 105, 255, 0.1)',
  },
  figma: {
    name: 'Figma',
    patterns: ['figma.com'],
    color: '#F24E1E',
    hoverColor: '#D93D0D',
    bgColor: 'rgba(242, 78, 30, 0.1)',
  },
  notion: {
    name: 'Notion',
    patterns: ['notion.so', 'notion.site'],
    color: '#000000',
    hoverColor: '#333333',
    bgColor: 'rgba(0, 0, 0, 0.1)',
  },
  medium: {
    name: 'Medium',
    patterns: ['medium.com'],
    color: '#000000',
    hoverColor: '#333333',
    bgColor: 'rgba(0, 0, 0, 0.1)',
  },
  substack: {
    name: 'Substack',
    patterns: ['substack.com'],
    color: '#FF6719',
    hoverColor: '#E55A0D',
    bgColor: 'rgba(255, 103, 25, 0.1)',
  },
  patreon: {
    name: 'Patreon',
    patterns: ['patreon.com'],
    color: '#FF424D',
    hoverColor: '#E6323D',
    bgColor: 'rgba(255, 66, 77, 0.1)',
  },
  buymeacoffee: {
    name: 'Buy Me a Coffee',
    patterns: ['buymeacoffee.com'],
    color: '#FFDD00',
    hoverColor: '#E6C700',
    bgColor: 'rgba(255, 221, 0, 0.1)',
  },
  link: {
    name: 'Link',
    patterns: [],
    color: '#71717A',
    hoverColor: '#52525B',
    bgColor: 'rgba(113, 113, 122, 0.1)',
  },
  header: {
    name: 'Header',
    patterns: [],
    color: '#71717A',
    hoverColor: '#52525B',
    bgColor: 'transparent',
  },
}

/**
 * Detecta la plataforma basándose en la URL
 */
export function detectPlatform(url: string): Platform {
  if (!url) return 'link'
  
  const normalizedUrl = url.toLowerCase()
  
  for (const [platform, config] of Object.entries(platforms)) {
    if (platform === 'link' || platform === 'header') continue
    
    for (const pattern of config.patterns) {
      if (normalizedUrl.includes(pattern)) {
        return platform as Platform
      }
    }
  }
  
  return 'link'
}

/**
 * Obtiene la configuración de una plataforma
 */
export function getPlatformConfig(platform: Platform): PlatformConfig {
  return platforms[platform] || platforms.link
}
