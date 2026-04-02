export const colors = {
  // Core neutrals (light mode, mostly white with soft grays)
  background: "#ffffff", // page background
  backgroundSoft: "#f9fafb", // subtle off-white
  surface: "#ffffff", // cards / surfaces
  surfaceSoft: "#f3f4f6", // soft panel background
  borderMuted: "#e5e7eb", // light gray border
  borderDashed: "#000000", // slightly stronger dashed border
  textPrimary: "#111827", // near-black text
  textMuted: "#6b7280", // muted gray text

  // Accent (warm yellow, comic-ish)
  accent: "#FACC15", // bright yellow
  accentSoft: "#FEF9C3", // pale yellow
} as const

export type AppColors = typeof colors
