/**
 * Font configuration for hrakAi Studio
 * Uses system font stack instead of remote fonts
 */

export const fontVariables = {
  '--font-hrakai': "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  '--font-hrakai-fallback': "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
} as const;

export const fontPreloadLinks = [] as const;
