export interface GradientPreset {
  id: string;
  name: string;
  style: string;
}

export const GRADIENT_PRESETS: GradientPreset[] = [
  {
    id: "default",
    name: "Oscuro",
    style: "#09090b",
  },
  {
    id: "midnight",
    name: "Midnight",
    style: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
  },
  {
    id: "aurora",
    name: "Aurora",
    style: "linear-gradient(135deg, #020e18 0%, #0a3d2e 40%, #020e18 100%)",
  },
  {
    id: "sunset",
    name: "Sunset",
    style: "linear-gradient(135deg, #1a0533 0%, #8b0050 50%, #1a0533 100%)",
  },
  {
    id: "ocean",
    name: "Ocean",
    style: "linear-gradient(135deg, #0a0a2e 0%, #0d3a5c 50%, #0a1a2e 100%)",
  },
  {
    id: "forest",
    name: "Forest",
    style: "linear-gradient(135deg, #0a1a0a 0%, #1a4a1a 50%, #0a1a0a 100%)",
  },
  {
    id: "cosmic",
    name: "Cosmic",
    style: "linear-gradient(135deg, #1a0033 0%, #4d0099 50%, #0a0a2e 100%)",
  },
  {
    id: "ember",
    name: "Ember",
    style: "linear-gradient(135deg, #1a0a00 0%, #7a2000 50%, #1a0500 100%)",
  },
];

// ─── Animated backgrounds (UnicornStudio) ────────────────────────────────────
// To add a new animated background:
//   1. Create your scene in UnicornStudio
//   2. Copy the `data-us-project` value from the embed code
//   3. Add a new entry below with a unique `id`, display name, description,
//      the `projectId`, and a `thumbnailGradient` that approximates the look.

export interface UnicornPreset {
  id: string;
  name: string;
  description: string;
  projectId: string;
  thumbnailGradient: string;
}

export const UNICORN_PRESETS: UnicornPreset[] = [
  {
    id: "aura",
    name: "Aura",
    description: "Efecto de aura suave y pulsante",
    projectId: "PbfL8YshrLU8GjeTZ4HP",
    thumbnailGradient:
      "radial-gradient(ellipse at 50% 60%, #7c3aed 0%, #2e1065 45%, #09090b 100%)",
  },
  // Agregá más assets acá ↓
];

export function getGradientStyle(
  backgroundType: string | null,
  backgroundConfig: string | null
): { background: string } {
  if (backgroundType === "gradient" && backgroundConfig) {
    const preset = GRADIENT_PRESETS.find((p) => p.id === backgroundConfig);
    if (preset) return { background: preset.style };
  }
  return { background: "#09090b" };
}

export function getUnicornProjectId(presetId: string): string | null {
  const preset = UNICORN_PRESETS.find((p) => p.id === presetId);
  return preset?.projectId ?? null;
}

