import { CSS } from '@stitches/react'
import { MethodRegistrar, Chain } from './chain'
import { Cursor } from './cursor'

export type Methods = {
  text: (sizeOrOptions: string | number | TextOptions, options?: TextOptions) => Chain
  sans: (sizeOrOptions: string | number | TextOptions, options?: TextOptions) => Chain
  mono: (sizeOrOptions: string | number | TextOptions, options?: TextOptions) => Chain
  serif: (sizeOrOptions: string | number | TextOptions, options?: TextOptions) => Chain
  ellipsis: () => Chain
}

export function register(method: MethodRegistrar) {
  method("text", applyText)
  method("sans", applySans)
  method("mono", applyMono)
  method("serif", applySerif)
  method("ellipsis", applyEllipsis)
}

export interface TextOptions {
  color?: string
  size?: number | string
  family?: string
  weight?: number | string
  tracking?: number | string
  leading?: number | string
  height?: number | string
  lineHeight?: number | string
  align?: 'left' | 'center' | 'right' | 'justify' | 'start' | 'end'
  case?: 'upper' | 'lower' | 'capitalize' | 'normal'
  wrap?: 'wrap' | 'nowrap' | 'pre' | 'pre-line' | 'pre-wrap'
  whiteSpace?: 'normal' | 'nowrap' | 'pre' | 'pre-line' | 'pre-wrap'
  cursor?: Cursor
  decoration?: 'none' | 'underline' | 'line-through' | 'overline'
  ellipsis?: boolean
}

/**
 * Applies text styles to the CSS object.
 *
 * @param css - The current CSS object
 * @param sizeOrOptions - Font size or TextOptions object
 * @param options - Additional TextOptions (optional)
 * @returns Updated CSS object with text styles applied
 *
 * @example
 * // Input:
 * applyText({}, 16, { color: 'red', weight: 'bold' })
 * // Output:
 * { fontSize: 16, color: 'red', fontWeight: 'bold' }
 *
 * @example
 * // Input:
 * applyText({}, { size: 20, family: 'Arial', case: 'upper' })
 * // Output:
 * { fontSize: 20, fontFamily: 'Arial', textTransform: 'uppercase' }
 */
function applyText(css: CSS, sizeOrOptions: string | number | TextOptions, options?: TextOptions): CSS {
  if (typeof sizeOrOptions === 'number' || typeof sizeOrOptions === 'string') {
    return applyTextOptions(css, { size: sizeOrOptions, ...options })
  } else {
    return applyTextOptions(css, { ...sizeOrOptions, ...options })
  }
}

/**
 * Applies sans-serif font styles to the CSS object.
 *
 * @param css - The current CSS object
 * @param sizeOrOptions - Font size or TextOptions object
 * @param options - Additional TextOptions (optional)
 * @returns Updated CSS object with sans-serif font styles applied
 *
 * @example
 * // Input:
 * applySans({}, 18, { weight: 'bold' })
 * // Output:
 * { fontSize: 18, fontFamily: '$sans', fontWeight: 'bold' }
 */
function applySans(css: CSS, sizeOrOptions: string | number | TextOptions, options?: TextOptions): CSS {
  return applyText(css, sizeOrOptions, { family: '$sans', ...options })
}

/**
 * Applies monospace font styles to the CSS object.
 *
 * @param css - The current CSS object
 * @param sizeOrOptions - Font size or TextOptions object
 * @param options - Additional TextOptions (optional)
 * @returns Updated CSS object with monospace font styles applied
 *
 * @example
 * // Input:
 * applyMono({}, { size: 14, color: 'blue' })
 * // Output:
 * { fontSize: 14, fontFamily: '$mono', color: 'blue' }
 */
function applyMono(css: CSS, sizeOrOptions: string | number | TextOptions, options?: TextOptions): CSS {
  return applyText(css, sizeOrOptions, { family: '$mono', ...options })
}

/**
 * Applies serif font styles to the CSS object.
 *
 * @param css - The current CSS object
 * @param sizeOrOptions - Font size or TextOptions object
 * @param options - Additional TextOptions (optional)
 * @returns Updated CSS object with serif font styles applied
 *
 * @example
 * // Input:
 * applySerif({}, 22, { weight: 'normal', align: 'center' })
 * // Output:
 * { fontSize: 22, fontFamily: '$serif', fontWeight: 'normal', textAlign: 'center' }
 */
function applySerif(css: CSS, sizeOrOptions: string | number | TextOptions, options?: TextOptions): CSS {
  return applyText(css, sizeOrOptions, { family: '$serif', ...options })
}

function applyTextOptions(css: CSS, options: TextOptions): CSS {
  let output = { ...css }

  const map: Record<string, string> = {
    color: 'color',
    size: 'fontSize',
    family: 'fontFamily',
    weight: 'fontWeight',
    tracking: 'letterSpacing',
    leading: 'lineHeight',
    height: 'lineHeight',
    wrap: 'whiteSpace',
    whiteSpace: 'whiteSpace',
    align: 'textAlign',
    cursor: 'cursor',
    decoration: 'textDecoration',
  }

  const caseMap: Record<string, string> = {
    upper: 'uppercase',
    lower: 'lowercase',
    capitalize: 'capitalize',
    normal: 'none',
  }

  for (const [key, value] of Object.entries(options)) {
    if (key in map) {
      output[map[key]] = value
    } else if (key === 'case') {
      output.textTransform = caseMap[value as string] || 'none'
    } else {
      output[key] = value
    }
  }

  if (options.ellipsis) {
    output = applyEllipsis(output)
  }

  return output
}

// Add this new function
/**
 * Applies ellipsis text overflow styles to the CSS object.
 *
 * @param css - The current CSS object
 * @returns Updated CSS object with ellipsis styles applied
 *
 * @example
 * // Input:
 * applyEllipsis({})
 * // Output:
 * {
 *   overflowX: 'hidden',
 *   overflowY: 'hidden',
 *   whiteSpace: 'nowrap',
 *   textOverflow: 'ellipsis'
 * }
 */
function applyEllipsis(css: CSS): CSS {
  return {
    ...css,
    overflowX: 'hidden',
    overflowY: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
  }
}
