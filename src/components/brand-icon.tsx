/**
 * BrandIcon Component
 * 
 * Renders platform icons using the simple-icons package.
 * Supports 59+ platforms with official brand colors and SVG paths.
 * 
 * Note: Some platforms are not available in simple-icons and use fallback icons.
 */

import type { SimpleIcon } from 'simple-icons';

// ============================================================================
// IMPORTS - Organized by Category
// ============================================================================

// Social Media (Existing)
import {
  siYoutube,
  siSpotify,
  siInstagram,
  siX,
  siTiktok,
  siGithub,
  siDiscord,
  siTwitch,
  siFacebook,
  siWhatsapp,
  siTelegram,
  siDribbble,
  siBehance,
  siFigma,
  siNotion,
  siMedium,
  siSubstack,
  siPatreon,
  siBuymeacoffee,
} from 'simple-icons';

// Social Media (NEW)
import {
  siReddit,
  siBluesky,
  siThreads,
  siSnapchat,
  siPinterest,
  siMastodon,
} from 'simple-icons';

// Music & Video (NEW)
import {
  siVimeo,
  siSoundcloud,
  siBandcamp,
  siApplemusic,
  siTidal,
} from 'simple-icons';

// Tech & Development (NEW)
import {
  siProducthunt,
  siStackoverflow,
  siGitlab,
  siBitbucket,
  siDevdotto,
  siHashnode,
  siPolywork,
} from 'simple-icons';

// Link-in-Bio Platforms (NEW)
import {
  siLinktree,
  siCarrd,
} from 'simple-icons';

// Monetization & E-commerce (NEW)
import {
  siKofi,
  siGumroad,
  siEtsy,
  siShopify,
  siKickstarter,
  siOnlyfans,
} from 'simple-icons';

// Productivity & Tools (NEW)
import {
  siZoom,
  siCalendly,
  siCaldotcom,
} from 'simple-icons';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export type PlatformKey =
  // Social Media (Existing)
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
  // Social Media (NEW)
  | 'reddit'
  | 'bluesky'
  | 'threads'
  | 'snapchat'
  | 'pinterest'
  | 'mastodon'
  // Music & Video (NEW)
  | 'vimeo'
  | 'soundcloud'
  | 'bandcamp'
  | 'applemusic'
  | 'deezer'
  | 'tidal'
  // Tech & Development (NEW)
  | 'producthunt'
  | 'stackoverflow'
  | 'codepen'
  | 'gitlab'
  | 'bitbucket'
  | 'devto'
  | 'hashnode'
  | 'polywork'
  // Link-in-Bio (NEW)
  | 'linktree'
  | 'beacons'
  | 'carrd'
  // Monetization (NEW)
  | 'kofi'
  | 'gumroad'
  | 'etsy'
  | 'shopify'
  | 'kickstarter'
  | 'indiegogo'
  | 'onlyfans'
  | 'fansly'
  // Productivity (NEW)
  | 'twilio'
  | 'slack'
  | 'zoom'
  | 'calendly'
  | 'cal';

// ============================================================================
// FALLBACK ICONS - For platforms not available in simple-icons
// ============================================================================

const createFallbackIcon = (title: string, hex: string, path: string): SimpleIcon => ({
  title,
  slug: title.toLowerCase().replace(/\s+/g, ''),
  hex,
  source: '',
  svg: '',
  path,
  guidelines: undefined,
  license: undefined,
});

// Fallback icons for missing platforms
const fallbackIcons = {
  linkedin: createFallbackIcon('LinkedIn', '0A66C2', 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'),
  deezer: createFallbackIcon('Deezer', 'FF0092', 'M18.81 16.83v-3.45h3.74v3.45h-3.74zm0-4.3v-3.45h3.74v3.45h-3.74zm-4.68 4.3v-3.45h3.74v3.45h-3.74zm0-4.3v-3.45h3.74v3.45h-3.74zm0-4.3V4.78h3.74v3.45h-3.74zm-4.68 8.6v-3.45h3.74v3.45H9.45zm0-4.3v-3.45h3.74v3.45H9.45zm0-4.3V4.78h3.74v3.45H9.45zm-4.68 8.6v-3.45h3.74v3.45H4.77zm0-4.3v-3.45h3.74v3.45H4.77z'),
  codepen: createFallbackIcon('CodePen', '000000', 'M24 8.182l-.018-.087-.017-.05c-.01-.024-.018-.05-.03-.075-.003-.018-.015-.034-.02-.05l-.035-.067-.03-.05-.044-.06-.046-.045-.06-.045-.046-.03-.06-.044-.044-.04-.015-.02L12.58.19c-.347-.232-.796-.232-1.142 0L.453 7.502l-.015.015-.044.035-.06.05-.038.04-.05.056-.037.045-.05.06c-.02.017-.03.03-.03.046l-.05.06-.02.06c-.02.01-.02.04-.03.07l-.01.05C0 8.12 0 8.15 0 8.18v7.497c0 .044.003.09.01.135l.01.046c.005.03.01.06.02.086l.015.05c.01.027.016.053.027.075l.022.05c0 .01.015.04.03.06l.03.04c.015.01.03.04.045.06l.03.04.04.04c.01.013.01.03.03.03l.06.042.04.03.01.014 10.97 7.33c.164.12.375.163.57.163s.39-.06.57-.18l10.99-7.28.014-.01.046-.037.06-.043.048-.036.052-.058.033-.045.04-.06.03-.05.03-.07.016-.052.03-.077.015-.045.03-.08v-7.5c0-.05 0-.095-.016-.14l-.014-.045.044.003zm-11.99 6.28l-3.65-2.44 3.65-2.442 3.65 2.44-3.65 2.44zm-1.034-6.674l-4.473 2.99L2.89 8.362l8.086-5.39V7.79zm-6.33 4.233l-2.582 1.73V10.3l2.582 1.726zm1.857 1.25l4.473 2.99v4.82L2.89 15.69l3.618-2.417v-.004zm6.537 2.99l4.474-2.98 3.613 2.42-8.087 5.39v-4.82zm6.33-4.23l2.583-1.72v3.456l-2.583-1.73zm-1.855-1.24L13.042 7.8V2.97l8.085 5.39-3.612 2.415v.003z'),
  beacons: createFallbackIcon('Beacons', '6C5CE7', 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'),
  indiegogo: createFallbackIcon('Indiegogo', 'EB1478', 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z'),
  fansly: createFallbackIcon('Fansly', '0091FF', 'M12 2L4 7v10l8 5 8-5V7l-8-5zm0 2.18L17.82 7 12 10.82 6.18 7 12 4.18zM6 8.82l5 3v6.36l-5-3V8.82zm7 9.36v-6.36l5-3v6.36l-5 3z'),
  twilio: createFallbackIcon('Twilio', 'F22F46', 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm0-6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm4 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm0-6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z'),
  slack: createFallbackIcon('Slack', '4A154B', 'M6 15c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2V15H6zm-1-2h2c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2v4c0 1.1.9 2 2 2zm13 2c1.1 0 2-.9 2-2s-.9-2-2-2h-2v2c0 1.1.9 2 2 2zm1 2h-2c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2s2-.9 2-2v-4c0-1.1-.9-2-2-2zM9 6c0-1.1-.9-2-2-2s-2 .9-2 2v2h2c1.1 0 2-.9 2-2zm6 0c0 1.1.9 2 2 2h2V6c0-1.1-.9-2-2-2s-2 .9-2 2zm-6 13c0 1.1.9 2 2 2s2-.9 2-2v-2H9v2zm6 0v-2h2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2z'),
};

// ============================================================================
// ICONS MAP - Organized by Category
// ============================================================================

const iconsMap: Record<PlatformKey, SimpleIcon> = {
  // ========== Social Media (Existing) ==========
  youtube: siYoutube,
  spotify: siSpotify,
  instagram: siInstagram,
  twitter: siX,
  tiktok: siTiktok,
  github: siGithub,
  linkedin: fallbackIcons.linkedin, // Not in simple-icons
  discord: siDiscord,
  twitch: siTwitch,
  facebook: siFacebook,
  whatsapp: siWhatsapp,
  telegram: siTelegram,
  dribbble: siDribbble,
  behance: siBehance,
  figma: siFigma,
  notion: siNotion,
  medium: siMedium,
  substack: siSubstack,
  patreon: siPatreon,
  buymeacoffee: siBuymeacoffee,

  // ========== Social Media (NEW) ==========
  reddit: siReddit,
  bluesky: siBluesky,
  threads: siThreads,
  snapchat: siSnapchat,
  pinterest: siPinterest,
  mastodon: siMastodon,

  // ========== Music & Video (NEW) ==========
  vimeo: siVimeo,
  soundcloud: siSoundcloud,
  bandcamp: siBandcamp,
  applemusic: siApplemusic,
  deezer: fallbackIcons.deezer, // Not in simple-icons
  tidal: siTidal,

  // ========== Tech & Development (NEW) ==========
  producthunt: siProducthunt,
  stackoverflow: siStackoverflow,
  codepen: fallbackIcons.codepen, // Not in simple-icons
  gitlab: siGitlab,
  bitbucket: siBitbucket,
  devto: siDevdotto,
  hashnode: siHashnode,
  polywork: siPolywork,

  // ========== Link-in-Bio Platforms (NEW) ==========
  linktree: siLinktree,
  beacons: fallbackIcons.beacons, // Not in simple-icons
  carrd: siCarrd,

  // ========== Monetization & E-commerce (NEW) ==========
  kofi: siKofi,
  gumroad: siGumroad,
  etsy: siEtsy,
  shopify: siShopify,
  kickstarter: siKickstarter,
  indiegogo: fallbackIcons.indiegogo, // Not in simple-icons
  onlyfans: siOnlyfans,
  fansly: fallbackIcons.fansly, // Not in simple-icons

  // ========== Productivity & Tools (NEW) ==========
  twilio: fallbackIcons.twilio, // Not in simple-icons
  slack: fallbackIcons.slack, // Not in simple-icons
  zoom: siZoom,
  calendly: siCalendly,
  cal: siCaldotcom,
};

// ============================================================================
// COMPONENT
// ============================================================================

interface BrandIconProps {
  platform: PlatformKey;
  className?: string;
  size?: number;
  style?: React.CSSProperties;
}

export function BrandIcon({ platform, className = '', size = 24, style }: BrandIconProps) {
  const icon = iconsMap[platform];

  if (!icon) {
    console.warn(`BrandIcon: No icon found for platform "${platform}"`);
    return null;
  }

  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="currentColor"
      style={style}
      aria-label={icon.title}
    >
      <title>{icon.title}</title>
      <path d={icon.path} />
    </svg>
  );
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get the official brand color for a platform
 */
export function getBrandColor(platform: PlatformKey): string {
  const icon = iconsMap[platform];
  return icon ? `#${icon.hex}` : '#71717A'; // Default gray if not found
}

/**
 * Get all available platform keys
 */
export function getAvailablePlatforms(): PlatformKey[] {
  return Object.keys(iconsMap) as PlatformKey[];
}

/**
 * Check if a platform is supported
 */
export function isPlatformSupported(platform: string): platform is PlatformKey {
  return platform in iconsMap;
}
