import { CSS } from "@stitches/react";
import { MethodRegistrar, Chain } from "./chain";
import { toPx } from "./utils";

// Add to the Methods type
export type Methods = {
  backdrop: (options?: BackdropOptions) => Chain;
};

declare module "./types" {
  interface ChainMethods extends Methods {}
}

// Add to the register function
export function register(method: MethodRegistrar) {
  method("backdrop", applyBackdrop);
}

// Define the options interface
interface BackdropOptions {
  blur?: number | string;
  saturate?: number | string;
  contrast?: number | string;
  brightness?: number | string;
}

// Default values
const defaultBackdropOptions: BackdropOptions = {
  blur: 20,
  saturate: "190%",
  contrast: "70%",
  brightness: "80%",
};

/**
 * Applies backdrop filter to the CSS object.
 *
 * @param css - The current CSS object
 * @param options - Backdrop filter options
 * @returns Updated CSS object with backdrop filter applied
 *
 * @example
 * // Input:
 * applyBackdrop({})
 * // Output:
 * { backdropFilter: 'blur(20px) saturate(190%) contrast(70%) brightness(80%)' }
 *
 * @example
 * // Input:
 * applyBackdrop({}, { blur: 10, saturate: "150%", contrast: "80%", brightness: "90%" })
 * // Output:
 * { backdropFilter: 'blur(10px) saturate(150%) contrast(80%) brightness(90%)' }
 */
function applyBackdrop(css: CSS, options?: BackdropOptions): CSS {
  const backdrop = { ...defaultBackdropOptions, ...options };

  return {
    ...css,
    backdropFilter: `blur(${toPx(backdrop.blur)}) saturate(${toPx(backdrop.saturate)}) contrast(${toPx(backdrop.contrast)}%) brightness(${toPx(backdrop.brightness)})`,
  };
}
