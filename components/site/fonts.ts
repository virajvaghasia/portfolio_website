import localFont from "next/font/local"

/** Self-hosted, like every other face on the site: next/font/google broke a deploy. */
export const serif = localFont({
  src: "../../app/fonts/SourceSerif4-Variable.woff2",
  weight: "400 700",
  display: "swap",
  variable: "--f-serif",
  fallback: ["Georgia", "serif"],
})

export const sans = localFont({
  src: "../../app/fonts/IBMPlexSans-Variable.woff2",
  weight: "400 700",
  display: "swap",
  variable: "--f-sans",
  fallback: ["system-ui", "sans-serif"],
})

export const mono = localFont({
  src: "../../app/fonts/JetBrainsMono-Variable.woff2",
  weight: "400 700",
  display: "swap",
  variable: "--f-mono",
  fallback: ["ui-monospace", "monospace"],
})

export const fontVars = `${serif.variable} ${sans.variable} ${mono.variable}`
