import { CSS } from '@stitches/react';
import { MethodRegistrar, Chain } from './chain';
import { toPx } from './utils';

export type Methods = {
  shadow: (options: ShadowOptions | number) => Chain;
};

export interface ShadowOptions {
  x?: number | string;
  y?: number | string;
  blur?: number | string;
  spread?: number | string;
  color?: string;
  inset?: boolean;
}

export function register(method: MethodRegistrar) {
  method("shadow", applyShadow);
}

const defaultShadow: ShadowOptions = {
  x: 0,
  y: 0,
  blur: 4,
  spread: 0,
  color: 'rgba(0, 0, 0, 0.1)',
  inset: false,
};

// Predefined shadow strengths
const shadowStrengths: ShadowOptions[] = [
  { x: '0', y: '0', blur: '0', spread: '0', color: 'transparent' }, // none
  { y: '1px', blur: '2px', color: 'rgba(0, 0, 0, 0.05)' }, // sm
  { y: '4px', blur: '6px', spread: '-1px', color: 'rgba(0, 0, 0, 0.1)' }, // md
  { y: '10px', blur: '15px', spread: '-3px', color: 'rgba(0, 0, 0, 0.1)' }, // lg
  { y: '20px', blur: '25px', spread: '-5px', color: 'rgba(0, 0, 0, 0.1)' }, // xl
  { y: '25px', blur: '50px', spread: '-12px', color: 'rgba(0, 0, 0, 0.25)' }, // 2xl
  { inset: true, y: '2px', blur: '4px', color: 'rgba(0, 0, 0, 0.05)' }, // inner
];

/**
 * Applies shadow styles to the CSS object.
 *
 * @param css - The current CSS object
 * @param options - Shadow options or a number for predefined strength
 * @returns Updated CSS object with shadow styles applied
 *
 * @example
 * // Apply default shadow
 * applyShadow({}, 2)
 *
 * @example
 * // Apply custom shadow
 * applyShadow({}, {
 *   x: '5px',
 *   y: '5px',
 *   blur: '10px',
 *   spread: '2px',
 *   color: 'rgba(0, 0, 0, 0.2)',
 *   inset: true
 * })
 */
function applyShadow(css: CSS, options: ShadowOptions | number): CSS {
  if (typeof options === 'number') {
    const index = Math.max(0, Math.min(shadowStrengths.length - 1, Math.floor(options)));
    return applyShadowOptions(css, shadowStrengths[index]);
  }
  return applyShadowOptions(css, options);
}

/**
 * Applies shadow options to the CSS object.
 *
 * @param css - The current CSS object
 * @param options - Shadow options
 * @returns Updated CSS object with shadow styles applied
 */
function applyShadowOptions(css: CSS, options: ShadowOptions): CSS {
  const {
    x, y, blur, spread, color, inset
  } = { ...defaultShadow, ...options };

  const shadowValue = `${inset ? 'inset ' : ''}${toPx(x)} ${toPx(y)} ${toPx(blur)} ${toPx(spread)} ${color}`;

  return {
    ...css,
    boxShadow: shadowValue,
  };
}
