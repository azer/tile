import { CSS } from '@stitches/react'
import { MethodRegistrar, Chain } from './chain'

export type Methods = {
  transition: (speed?: number | string, props?: string[]) => Chain
}

export function register(method: MethodRegistrar) {
  method("transition", applyTransition)
}

const defaultTransitionProps = [
  'color',
  'background-color',
  'border-color',
  'text-decoration-color',
  'fill',
  'stroke',
  'opacity',
  'box-shadow',
  'transform',
  'filter',
  'backdrop-filter',
]

/**
 * Applies transition styles to the CSS object.
 *
 * @param css - The current CSS object
 * @param speed - Transition duration in milliseconds or as a string (e.g., '150ms', '0.15s')
 * @param props - Array of CSS properties to transition (optional)
 * @returns Updated CSS object with transition styles applied
 *
 * @example
 * // Input:
 * applyTransition({}, 300)
 * // Output:
 * {
 *   transitionProperty: 'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter',
 *   transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
 *   transitionDuration: '300ms'
 * }
 *
 * @example
 * // Input:
 * applyTransition({}, '0.5s', ['opacity', 'transform'])
 * // Output:
 * {
 *   transitionProperty: 'opacity, transform',
 *   transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
 *   transitionDuration: '0.5s'
 * }
 */
function applyTransition(css: CSS, speed?: number | string, props?: string[]): CSS {
  return applyTransitionOptions(css, speed, props)
}

function applyTransitionOptions(css: CSS, speed?: number | string, props?: string[]): CSS {
  const output = { ...css }

  output.transitionProperty = (props || defaultTransitionProps).join(', ')
  output.transitionTimingFunction = 'cubic-bezier(0.4, 0, 0.2, 1)'
  output.transitionDuration = speed ?
    (typeof speed === 'number' ? `${speed}ms` : speed) :
    '150ms'

  return output
}
