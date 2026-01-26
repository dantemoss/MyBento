import { type Platform } from "@/lib/platforms"
import {
  YouTubeIcon,
  SpotifyIcon,
  InstagramIcon,
  TwitterIcon,
  TikTokIcon,
  GitHubIcon,
  LinkedInIcon,
  DiscordIcon,
  TwitchIcon,
  FacebookIcon,
  WhatsAppIcon,
  TelegramIcon,
  DribbbleIcon,
  BehanceIcon,
  FigmaIcon,
  NotionIcon,
  MediumIcon,
  SubstackIcon,
  PatreonIcon,
  BuyMeACoffeeIcon,
  LinkIcon,
} from "./platform-icons"

interface PlatformIconProps {
  platform: Platform
  className?: string
}

const iconMap: Record<Platform, React.ComponentType<{ className?: string }>> = {
  youtube: YouTubeIcon,
  spotify: SpotifyIcon,
  instagram: InstagramIcon,
  twitter: TwitterIcon,
  tiktok: TikTokIcon,
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  discord: DiscordIcon,
  twitch: TwitchIcon,
  facebook: FacebookIcon,
  whatsapp: WhatsAppIcon,
  telegram: TelegramIcon,
  dribbble: DribbbleIcon,
  behance: BehanceIcon,
  figma: FigmaIcon,
  notion: NotionIcon,
  medium: MediumIcon,
  substack: SubstackIcon,
  patreon: PatreonIcon,
  buymeacoffee: BuyMeACoffeeIcon,
  link: LinkIcon,
  header: LinkIcon, // Header no usa icono pero necesita un fallback
}

export function PlatformIcon({ platform, className }: PlatformIconProps) {
  const Icon = iconMap[platform] || LinkIcon
  return <Icon className={className} />
}

// Re-export individual icons for direct use
export * from "./platform-icons"
