export const breakpoints = {
  'max-2xs': '(max-width: 359px)',
  'min-2xs': '(min-width: 360px)',
  'max-xs': '(max-width: 479px)',
  'min-xs': '(min-width: 480px)',
  'max-sm': '(max-width: 639px)',
  'min-sm': '(min-width: 640px)',
  'max-md': '(max-width: 767px)',
  'min-md': '(min-width: 768px)',
  'max-lg': '(max-width: 1023px)',
  'min-lg': '(min-width: 1024px)',
  'max-xl': '(max-width: 1279px)',
  'min-xl': '(min-width: 1280px)',
  'max-2xl': '(max-width: 1535px)',
  'min-2xl': '(min-width: 1536px)',

  // Device aliases
  mobile: '(max-width: 767px)',
  tablet: '(min-width: 768px) and (max-width: 1023px)',
  desktop: '(min-width: 1024px)',

  // Specific device aliases
  'iphone-se': '(max-width: 375px)',
  iphone: '(max-width: 428px)', // Covers most iPhone models
  ipad: '(min-width: 768px) and (max-width: 1024px)',
  'ipad-pro': '(min-width: 1024px) and (max-width: 1366px)',

  // Orientation aliases
  portrait: '(orientation: portrait)',
  landscape: '(orientation: landscape)',

  // High-resolution screens
  retina: '(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)',
}
