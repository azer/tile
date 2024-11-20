import { CSS } from "@stitches/react";
import { MethodRegistrar, Chain } from "./types";

export type Methods = {
  geometry: (options: CSS, styles: Chain | CSS) => Chain;
  media: (breakpoint: string, styles: Chain | CSS) => Chain;
  mobile: (styles: Chain | CSS) => Chain;
  desktop: (styles: Chain | CSS) => Chain;
  portrait: (styles: Chain | CSS) => Chain;
  landscape: (styles: Chain | CSS) => Chain;
};

declare module "./types" {
  interface ChainMethods extends Methods {}
}

export function register(method: MethodRegistrar) {
  method("geometry", applyGeometry);
  method("media", applyMedia);
  method("mobile", applyMobile);
  method("desktop", applyDesktop);
  method("portrait", applyPortrait);
  method("landscape", applyLandscape);
}

interface MediaQueryOptions {
  minWidth?: number | string;
  maxWidth?: number | string;
  minHeight?: number | string;
  maxHeight?: number | string;
  orientation?: "portrait" | "landscape";
}

/**
 * Applies base styles and geometry to the element.
 *
 * @param css - The current CSS object
 * @param options - Base CSS options
 * @param styles - Styles to apply, either a Chain or CSS object
 * @returns Updated CSS object with applied styles
 *
 * @example
 * applyGeometry({}, { maxWidth: 640 }, Chain().width('100%').bg('red'))
 * // Output: { '@media (max-width: 640px)': { width: '100%', backgroundColor: 'red' } }
 */
function applyGeometry(
  css: CSS,
  options: MediaQueryOptions,
  styles: Chain | CSS,
): CSS {
  const mediaQuery = convertToMediaQuery(options);

  if (mediaQuery) {
    this.select(`@media ${mediaQuery}`, styles);
  }

  return { ...css };
}

/**
 * Applies styles for a specific media query.
 *
 * @param css - The current CSS object
 * @param breakpoint - The breakpoint or media query
 * @param styles - Styles to apply, either a Chain or CSS object
 * @returns Updated CSS object with media query styles
 *
 * @example
 * applyMedia({}, "$min-xs", Chain().width('50%').bg('blue'))
 * // Output: { '@media (min-width: 480px)': { width: '50%', backgroundColor: 'blue' } }
 */
function applyMedia(css: CSS, breakpoint: string, styles: Chain | CSS): CSS {
  this.select(`@media ${breakpoint}`, styles);
  return { ...css };
}

/**
 * Applies styles for mobile devices.
 *
 * @param css - The current CSS object
 * @param styles - Styles to apply, either a Chain or CSS object
 * @returns Updated CSS object with mobile styles
 *
 * @example
 * applyMobile({}, Chain().width('100%').bg('green'))
 * // Output: { '@media (max-width: 767px)': { width: '100%', backgroundColor: 'green' } }
 */
function applyMobile(css: CSS, styles: Chain | CSS): CSS {
  return applyMediaQueryOptions.call(this, css, { maxWidth: 767 }, styles);
}

/**
 * Applies styles for desktop devices.
 *
 * @param css - The current CSS object
 * @param styles - Styles to apply, either a Chain or CSS object
 * @returns Updated CSS object with desktop styles
 *
 * @example
 * applyDesktop({}, Chain().width('80%').bg('blue'))
 * // Output: { '@media (min-width: 768px)': { width: '80%', backgroundColor: 'blue' } }
 */
function applyDesktop(css: CSS, styles: Chain | CSS): CSS {
  return applyMediaQueryOptions.call(this, css, { minWidth: 768 }, styles);
}

/**
 * Applies styles for portrait orientation.
 *
 * @param css - The current CSS object
 * @param styles - Styles to apply, either a Chain or CSS object
 * @returns Updated CSS object with portrait orientation styles
 *
 * @example
 * applyPortrait({}, Chain().height('100vh'))
 * // Output: { '@media (orientation: portrait)': { height: '100vh' } }
 */
function applyPortrait(css: CSS, styles: Chain | CSS): CSS {
  return applyMediaQueryOptions.call(
    this,
    css,
    { orientation: "portrait" },
    styles,
  );
}

/**
 * Applies styles for landscape orientation.
 *
 * @param css - The current CSS object
 * @param styles - Styles to apply, either a Chain or CSS object
 * @returns Updated CSS object with landscape orientation styles
 *
 * @example
 * applyLandscape({}, Chain().width('100vw'))
 * // Output: { '@media (orientation: landscape)': { width: '100vw' } }
 */
function applyLandscape(css: CSS, styles: Chain | CSS): CSS {
  return applyMediaQueryOptions.call(
    this,
    css,
    { orientation: "landscape" },
    styles,
  );
}

function applyMediaQueryOptions(
  css: CSS,
  options: MediaQueryOptions,
  styles: Chain | CSS,
): CSS {
  const mediaQuery = convertToMediaQuery(options);
  this.select(`@media ${mediaQuery}`, styles);
  return { ...css };
}

function convertToMediaQuery(options: MediaQueryOptions): string {
  const conditions: string[] = [];

  if ("minWidth" in options)
    conditions.push(`(min-width: ${options.minWidth}px)`);
  if ("maxWidth" in options)
    conditions.push(`(max-width: ${options.maxWidth}px)`);
  if ("minHeight" in options)
    conditions.push(`(min-height: ${options.minHeight}px)`);
  if ("maxHeight" in options)
    conditions.push(`(max-height: ${options.maxHeight}px)`);
  if ("orientation" in options)
    conditions.push(`(orientation: ${options.orientation})`);

  return conditions.join(" and ");
}
