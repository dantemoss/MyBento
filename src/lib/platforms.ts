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
  | 'reddit'
  | 'bluesky'
  | 'threads'
  | 'snapchat'
  | 'pinterest'
  | 'vimeo'
  | 'soundcloud'
  | 'bandcamp'
  | 'applemusic'
  | 'deezer'
  | 'tidal'
  | 'mastodon'
  | 'producthunt'
  | 'stackoverflow'
  | 'codepen'
  | 'gitlab'
  | 'bitbucket'
  | 'devto'
  | 'hashnode'
  | 'polywork'
  | 'linktree'
  | 'beacons'
  | 'carrd'
  | 'kofi'
  | 'gumroad'
  | 'etsy'
  | 'shopify'
  | 'kickstarter'
  | 'indiegogo'
  | 'onlyfans'
  | 'fansly'
  | 'twilio'
  | 'slack'
  | 'zoom'
  | 'calendly'
  | 'cal'
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
  reddit: {
    name: 'Reddit',
    patterns: ['reddit.com', 'redd.it'],
    color: '#FF4500',
    hoverColor: '#E63E00',
    bgColor: 'rgba(255, 69, 0, 0.1)',
  },
  bluesky: {
    name: 'Bluesky',
    patterns: ['bsky.app', 'bsky.social'],
    color: '#1185FE',
    hoverColor: '#0A6FE0',
    bgColor: 'rgba(17, 133, 254, 0.1)',
  },
  threads: {
    name: 'Threads',
    patterns: ['threads.net'],
    color: '#000000',
    hoverColor: '#333333',
    bgColor: 'rgba(0, 0, 0, 0.1)',
  },
  snapchat: {
    name: 'Snapchat',
    patterns: ['snapchat.com', 'snap.com'],
    color: '#FFFC00',
    hoverColor: '#E6E300',
    bgColor: 'rgba(255, 252, 0, 0.1)',
  },
  pinterest: {
    name: 'Pinterest',
    patterns: ['pinterest.com', 'pin.it'],
    color: '#E60023',
    hoverColor: '#CC001F',
    bgColor: 'rgba(230, 0, 35, 0.1)',
  },
  vimeo: {
    name: 'Vimeo',
    patterns: ['vimeo.com'],
    color: '#1AB7EA',
    hoverColor: '#0E9FD1',
    bgColor: 'rgba(26, 183, 234, 0.1)',
  },
  soundcloud: {
    name: 'SoundCloud',
    patterns: ['soundcloud.com'],
    color: '#FF5500',
    hoverColor: '#E64D00',
    bgColor: 'rgba(255, 85, 0, 0.1)',
  },
  bandcamp: {
    name: 'Bandcamp',
    patterns: ['bandcamp.com'],
    color: '#629AA9',
    hoverColor: '#528797',
    bgColor: 'rgba(98, 154, 169, 0.1)',
  },
  applemusic: {
    name: 'Apple Music',
    patterns: ['music.apple.com'],
    color: '#FA243C',
    hoverColor: '#E11530',
    bgColor: 'rgba(250, 36, 60, 0.1)',
  },
  deezer: {
    name: 'Deezer',
    patterns: ['deezer.com'],
    color: '#FF0092',
    hoverColor: '#E60083',
    bgColor: 'rgba(255, 0, 146, 0.1)',
  },
  tidal: {
    name: 'Tidal',
    patterns: ['tidal.com'],
    color: '#000000',
    hoverColor: '#333333',
    bgColor: 'rgba(0, 0, 0, 0.1)',
  },
  mastodon: {
    name: 'Mastodon',
    patterns: ['mastodon.social', 'mastodon.online', 'mas.to'],
    color: '#6364FF',
    hoverColor: '#4F50E6',
    bgColor: 'rgba(99, 100, 255, 0.1)',
  },
  producthunt: {
    name: 'Product Hunt',
    patterns: ['producthunt.com'],
    color: '#DA552F',
    hoverColor: '#C74826',
    bgColor: 'rgba(218, 85, 47, 0.1)',
  },
  stackoverflow: {
    name: 'Stack Overflow',
    patterns: ['stackoverflow.com'],
    color: '#F58025',
    hoverColor: '#DC7320',
    bgColor: 'rgba(245, 128, 37, 0.1)',
  },
  codepen: {
    name: 'CodePen',
    patterns: ['codepen.io'],
    color: '#000000',
    hoverColor: '#333333',
    bgColor: 'rgba(0, 0, 0, 0.1)',
  },
  gitlab: {
    name: 'GitLab',
    patterns: ['gitlab.com'],
    color: '#FC6D26',
    hoverColor: '#E35E1F',
    bgColor: 'rgba(252, 109, 38, 0.1)',
  },
  bitbucket: {
    name: 'Bitbucket',
    patterns: ['bitbucket.org'],
    color: '#0052CC',
    hoverColor: '#0043A8',
    bgColor: 'rgba(0, 82, 204, 0.1)',
  },
  devto: {
    name: 'DEV',
    patterns: ['dev.to'],
    color: '#0A0A0A',
    hoverColor: '#333333',
    bgColor: 'rgba(10, 10, 10, 0.1)',
  },
  hashnode: {
    name: 'Hashnode',
    patterns: ['hashnode.com', 'hashnode.dev'],
    color: '#2962FF',
    hoverColor: '#1E4FE6',
    bgColor: 'rgba(41, 98, 255, 0.1)',
  },
  polywork: {
    name: 'Polywork',
    patterns: ['polywork.com', 'poly.work'],
    color: '#6366F1',
    hoverColor: '#4F52D8',
    bgColor: 'rgba(99, 102, 241, 0.1)',
  },
  linktree: {
    name: 'Linktree',
    patterns: ['linktr.ee'],
    color: '#43E55E',
    hoverColor: '#34CC4B',
    bgColor: 'rgba(67, 229, 94, 0.1)',
  },
  beacons: {
    name: 'Beacons',
    patterns: ['beacons.ai'],
    color: '#6C5CE7',
    hoverColor: '#5849CE',
    bgColor: 'rgba(108, 92, 231, 0.1)',
  },
  carrd: {
    name: 'Carrd',
    patterns: ['carrd.co'],
    color: '#7C3AED',
    hoverColor: '#6929D4',
    bgColor: 'rgba(124, 58, 237, 0.1)',
  },
  kofi: {
    name: 'Ko-fi',
    patterns: ['ko-fi.com'],
    color: '#FF5E5B',
    hoverColor: '#E64D4A',
    bgColor: 'rgba(255, 94, 91, 0.1)',
  },
  gumroad: {
    name: 'Gumroad',
    patterns: ['gumroad.com', 'gum.co'],
    color: '#FF90E8',
    hoverColor: '#E67DD0',
    bgColor: 'rgba(255, 144, 232, 0.1)',
  },
  etsy: {
    name: 'Etsy',
    patterns: ['etsy.com'],
    color: '#F1641E',
    hoverColor: '#D8561A',
    bgColor: 'rgba(241, 100, 30, 0.1)',
  },
  shopify: {
    name: 'Shopify',
    patterns: ['shopify.com', 'myshopify.com'],
    color: '#96BF48',
    hoverColor: '#7FA63A',
    bgColor: 'rgba(150, 191, 72, 0.1)',
  },
  kickstarter: {
    name: 'Kickstarter',
    patterns: ['kickstarter.com'],
    color: '#05CE78',
    hoverColor: '#04B566',
    bgColor: 'rgba(5, 206, 120, 0.1)',
  },
  indiegogo: {
    name: 'Indiegogo',
    patterns: ['indiegogo.com'],
    color: '#EB1478',
    hoverColor: '#D20F68',
    bgColor: 'rgba(235, 20, 120, 0.1)',
  },
  onlyfans: {
    name: 'OnlyFans',
    patterns: ['onlyfans.com'],
    color: '#00AFF0',
    hoverColor: '#0096D7',
    bgColor: 'rgba(0, 175, 240, 0.1)',
  },
  fansly: {
    name: 'Fansly',
    patterns: ['fansly.com'],
    color: '#0091FF',
    hoverColor: '#0078E6',
    bgColor: 'rgba(0, 145, 255, 0.1)',
  },
  twilio: {
    name: 'Twilio',
    patterns: ['twilio.com'],
    color: '#F22F46',
    hoverColor: '#D9263D',
    bgColor: 'rgba(242, 47, 70, 0.1)',
  },
  slack: {
    name: 'Slack',
    patterns: ['slack.com'],
    color: '#4A154B',
    hoverColor: '#3A0F3C',
    bgColor: 'rgba(74, 21, 75, 0.1)',
  },
  zoom: {
    name: 'Zoom',
    patterns: ['zoom.us', 'zoom.com'],
    color: '#2D8CFF',
    hoverColor: '#1A7AE6',
    bgColor: 'rgba(45, 140, 255, 0.1)',
  },
  calendly: {
    name: 'Calendly',
    patterns: ['calendly.com'],
    color: '#006BFF',
    hoverColor: '#0058E6',
    bgColor: 'rgba(0, 107, 255, 0.1)',
  },
  cal: {
    name: 'Cal.com',
    patterns: ['cal.com'],
    color: '#292929',
    hoverColor: '#1A1A1A',
    bgColor: 'rgba(41, 41, 41, 0.1)',
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
