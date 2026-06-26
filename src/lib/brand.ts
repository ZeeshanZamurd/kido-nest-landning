/** KidNest brand tokens — synced with kidnest-mobile/constants/branding.ts */

export const brand = {
  primary: "#7B4DFF",
  accent: "#FF4DB8",
  cyan: "#5FE9FF",
  white: "#FFFFFF",
  background: "#F8FAFC",
  surface: "#FFFFFF",
  text: "#0F172A",
  textSecondary: "#475569",
  textMuted: "#94A3B8",
  border: "#E2E8F0",
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
  childPrimary: "#FF6B9D",
  childAccent: "#FFD93D",
  gradientDark: ["#5532BF", "#D63D98"] as const,
  slate: {
    950: "#020617",
    900: "#0F172A",
    800: "#1E293B",
    700: "#334155",
    600: "#475569",
    500: "#64748B",
    400: "#94A3B8",
    300: "#CBD5E1",
    200: "#E2E8F0",
    100: "#F1F5F9",
    50: "#F8FAFC",
  },
} as const;

export const radius = {
  sm: "8px",
  md: "12px",
  lg: "16px",
  xl: "24px",
  full: "999px",
} as const;

export const shadows = {
  card: "0 4px 24px rgba(15, 23, 42, 0.08)",
  glow: "0 0 40px rgba(123, 77, 255, 0.18)",
  brand: "0 8px 20px rgba(123, 77, 255, 0.28)",
} as const;
