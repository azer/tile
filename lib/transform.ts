import { CSS } from "@stitches/react";
import { MethodRegistrar, Chain } from "./types";

export type Methods = {
  transform: (value: string) => Chain;
  rotate: (angle: string | number) => Chain;
  scale: (x: number, y?: number) => Chain;
  translate: (x: string | number, y?: string | number) => Chain;
  skew: (x: string | number, y?: string | number) => Chain;
  perspective: (value: string | number) => Chain;
};

declare module "./types" {
  interface ChainMethods extends Methods {}
}

export function register(method: MethodRegistrar) {
  method("transform", applyTransform);
  method("rotate", applyRotate);
  method("scale", applyScale);
  method("translate", applyTranslate);
  method("skew", applySkew);
  method("perspective", applyPerspective);
}

/**
 * Applies a custom transform to the element.
 *
 * @param css - The current CSS object
 * @param value - The transform value
 * @returns Updated CSS object with transform applied
 *
 * @example
 * View().transform('rotate(45deg) translateX(10px)').element()
 */
function applyTransform(css: CSS, value: string): CSS {
  return { ...css, transform: value };
}

/**
 * Rotates the element.
 *
 * @param css - The current CSS object
 * @param angle - The rotation angle (with unit for string, or degrees for number)
 * @returns Updated CSS object with rotation applied
 *
 * @example
 * View().rotate('45deg').element()
 * View().rotate(45).element()
 */
function applyRotate(css: CSS, angle: string | number): CSS {
  const value = typeof angle === "number" ? `${angle}deg` : angle;
  return {
    ...css,
    transform: `${css.transform || ""} rotate(${value})`.trim(),
  };
}

/**
 * Scales the element.
 *
 * @param css - The current CSS object
 * @param x - The x-axis scale factor
 * @param y - The y-axis scale factor (optional, defaults to x)
 * @returns Updated CSS object with scaling applied
 *
 * @example
 * View().scale(2).element()
 * View().scale(2, 0.5).element()
 */
function applyScale(css: CSS, x: number, y?: number): CSS {
  const value = y === undefined ? `${x}` : `${x}, ${y}`;
  return { ...css, transform: `${css.transform || ""} scale(${value})`.trim() };
}

/**
 * Translates the element.
 *
 * @param css - The current CSS object
 * @param x - The x-axis translation
 * @param y - The y-axis translation (optional)
 * @returns Updated CSS object with translation applied
 *
 * @example
 * View().translate('10px').element()
 * View().translate('10px', '20px').element()
 * View().translate(10, 20).element()
 */
function applyTranslate(
  css: CSS,
  x: string | number,
  y?: string | number,
): CSS {
  const xValue = typeof x === "number" ? `${x}px` : x;
  const yValue = y === undefined ? "" : typeof y === "number" ? `${y}px` : y;
  const value = yValue ? `${xValue}, ${yValue}` : xValue;
  return {
    ...css,
    transform: `${css.transform || ""} translate(${value})`.trim(),
  };
}

/**
 * Skews the element.
 *
 * @param css - The current CSS object
 * @param x - The x-axis skew angle
 * @param y - The y-axis skew angle (optional)
 * @returns Updated CSS object with skew applied
 *
 * @example
 * View().skew('10deg').element()
 * View().skew('10deg', '20deg').element()
 * View().skew(10, 20).element()
 */
function applySkew(css: CSS, x: string | number, y?: string | number): CSS {
  const xValue = typeof x === "number" ? `${x}deg` : x;
  const yValue = y === undefined ? "" : typeof y === "number" ? `${y}deg` : y;
  const value = yValue ? `${xValue}, ${yValue}` : xValue;
  return { ...css, transform: `${css.transform || ""} skew(${value})`.trim() };
}

/**
 * Applies perspective transform to the element.
 *
 * @param css - The current CSS object
 * @param value - Perspective distance (with unit for string, or pixels for number)
 * @returns Updated CSS object with perspective applied
 *
 * @example
 * View().perspective('1000px').element()
 * View().perspective(1000).element()
 */
function applyPerspective(css: CSS, value: string | number): CSS {
  const perspectiveValue = typeof value === "number" ? `${value}px` : value;
  return {
    ...css,
    transform: `${css.transform || ""} perspective(${perspectiveValue})`.trim(),
  };
}
