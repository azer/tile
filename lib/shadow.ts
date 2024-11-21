import { CSS } from "@stitches/react";
import { MethodRegistrar, Chain } from "./types";
import { toPx } from "./utils";

export type Methods = {
  shadow: (options?: ShadowOptions | number) => Chain;
  textShadow: (options?: TextShadowOptions | number) => Chain;
};

// Add this augmentation using the existing Methods type
declare module "./types" {
  interface ChainMethods extends Methods {}
}

// Add interface
export interface TextShadowOptions {
  x?: number | string;
  y?: number | string;
  blur?: number | string;
  color?: string;
}

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
  method("textShadow", applyTextShadow);
}

const defaultShadow: ShadowOptions = {
  x: 0,
  y: 4,
  blur: 4,
  spread: 0,
  color: "rgba(0, 0, 0, 0.25)",
  inset: false,
};

/**
 * Applies shadow styles to the CSS object.
 *
 * @param css - The current CSS object
 * @param options - Optional shadow options or opacity between 0-1
 * @returns Updated CSS object with shadow styles applied
 *
 * @example
 * // Default shadow
 * applyShadow({})
 *
 * // Shadow with 0.5 opacity
 * applyShadow({}, 0.5)
 *
 * // Custom shadow
 * applyShadow({}, {
 *   x: '5px',
 *   y: '5px',
 *   blur: '10px',
 *   spread: '2px',
 *   color: 'rgba(0, 0, 0, 0.2)',
 *   inset: true
 * })
 */
function applyShadow(
  css: CSS,
  options?: ShadowOptions | number | boolean,
): CSS {
  if (options === undefined || options === true) {
    return applyShadowOptions(css, defaultShadow);
  }

  if (options === 0 || options === false) {
    return { ...css, boxShadow: "none" };
  }

  if (typeof options === "number") {
    const opacity = Math.min(1, Math.max(0, options));
    return applyShadowOptions(css, {
      ...defaultShadow,
      color: `rgba(0, 0, 0, ${opacity})`,
    });
  }

  return applyShadowOptions(css, options);
}

function applyShadowOptions(css: CSS, options: ShadowOptions): CSS {
  const shadowOptions = { ...defaultShadow, ...options };
  const { x, y, blur, spread, color, inset } = shadowOptions;

  const shadowValue = `${inset ? "inset " : ""}${toPx(x)} ${toPx(y)} ${toPx(
    blur,
  )} ${toPx(spread)} ${color}`;

  return {
    ...css,
    boxShadow: shadowValue,
  };
}

/**
 * Default text shadow configuration.
 */
const defaultTextShadow: TextShadowOptions = {
  x: 1,
  y: 1,
  blur: 2,
  color: "rgba(0, 0, 0, 0.25)",
};

/**
 * Applies text shadow styles to the CSS object.
 *
 * @param css - The current CSS object
 * @param options - Optional text shadow options or opacity between 0-1
 * @returns Updated CSS object with text shadow styles applied
 *
 * @example
 * // Default text shadow
 * applyTextShadow({})
 *
 * // Text shadow with 0.5 opacity
 * applyTextShadow({}, 0.5)
 *
 * // Custom text shadow
 * applyTextShadow({}, {
 *   x: 2,
 *   y: 2,
 *   blur: 4,
 *   color: 'blue'
 * })
 */
export function applyTextShadow(
  css: CSS,
  options?: TextShadowOptions | number,
): CSS {
  if (options === undefined) {
    return applyTextShadowOptions(css, defaultTextShadow);
  }

  if (typeof options === "number") {
    const opacity = Math.min(1, Math.max(0, options));
    return applyTextShadowOptions(css, {
      ...defaultTextShadow,
      color: `rgba(0, 0, 0, ${opacity})`,
    });
  }

  return applyTextShadowOptions(css, options);
}

/**
 * Applies text shadow options to the CSS object.
 *
 * @param css - The current CSS object
 * @param options - Text shadow options
 * @returns Updated CSS object with text shadow styles applied
 */
function applyTextShadowOptions(css: CSS, options: TextShadowOptions): CSS {
  const shadowOptions = { ...defaultTextShadow, ...options };
  const { x, y, blur, color } = shadowOptions;

  const shadowValue =
    `${toPx(x)} ${toPx(y)} ${blur ? toPx(blur) : ""} ${color}`.trim();

  return {
    ...css,
    textShadow: shadowValue,
  };
}
