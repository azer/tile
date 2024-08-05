import { CSS } from '@stitches/react'
import { MethodRegistrar, Chain } from './chain'

export type Methods = {
  scroll: (options: ScrollOptions) => Chain
  customScrollbar: (options: CustomScrollbarOptions) => Chain
}

export interface ScrollOptions {
  x?: boolean
  y?: boolean
}

export interface CustomScrollbarOptions {
  width?: string
  trackBg?: string
  thumbBg?: string
  borderRadius?: string
  hoverOnly?: boolean
}

export function register(method: MethodRegistrar) {
  method("scroll", applyScrollOptions)
  method("scrollbar", applyCustomScrollbarOptions)
}

/**
 * Applies scroll styles to the CSS object.
 *
 * @param css - The current CSS object
 * @param options - Scroll options for x and y axes
 * @returns Updated CSS object with scroll styles applied
 *
 * @example
 * // Input:
 * applyScroll({}, { x: true, y: false })
 * // Output:
 * { overflowX: 'scroll', overflowY: 'hidden' }
 */
function applyScrollOptions(css: CSS, options: ScrollOptions): CSS {
  const result = { ...css }

  if (options.x !== undefined) {
    result.overflowX = options.x ? 'scroll' : 'hidden'
  }

  if (options.y !== undefined) {
    result.overflowY = options.y ? 'scroll' : 'hidden'
  }

  return result
}


/**
 * Applies custom scrollbar styles to an element.
 *
 * @param css - The current CSS object
 * @param options - Custom scrollbar options
 * @returns Updated CSS object with custom scrollbar styles applied
 *
 * @example
 * // Apply custom scrollbar with default settings
 * applyCustomScrollbar({})
 *
 * @example
 * // Apply custom scrollbar with specific settings
 * applyCustomScrollbar({}, {
 *   width: '8px',
 *   thumbBg: 'rgba(0,0,0,0.5)',
 *   trackBg: 'rgba(0,0,0,0.1)',
 *   borderRadius: '4px',
 *   hoverOnly: true
 * })
 */

function applyCustomScrollbarOptions(css: CSS, options: CustomScrollbarOptions): CSS {
  const scrollWidth = options.width || '5px'
  const scrollRadius = options.borderRadius || '10px'

  return {
    ...css,
    overflow: 'hidden',
    '&:hover': {
      overflowX: options.x ? 'overlay' : 'hidden',
      overflowY: options.y ? 'overlay' : 'hidden',
    },
    '&::-webkit-scrollbar': {
      width: scrollWidth,
      opacity: '0',
      background: 'transparent',
      position: 'absolute',
      zIndex: '9999999',
    },
    '&::-webkit-scrollbar-track': {
      background: options.trackBg || '',
    },
    '&::-webkit-scrollbar-thumb': {
      background: (options.thumbBg || 'rgba(59, 63, 67)'),
      borderRadius: scrollRadius,
      width: `calc(${scrollWidth} - 0.5px)`,
    },
    '&::-webkit-scrollbar:hover': {
      opacity: '1',
    },
    ...(options.hoverOnly ? {
      '&:not(:hover)': {
        '&::-webkit-scrollbar-thumb': {
          background: 'transparent',
        },
      },
    } : {}),
  }
}
