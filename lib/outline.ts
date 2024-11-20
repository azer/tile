import { CSS } from "@stitches/react";
import { MethodRegistrar, Chain } from "./types";

export type Methods = {
  outline: (
    widthOrOptions: string | number | OutlineOptions,
    options?: OutlineOptions,
  ) => Chain;
};

// Add this augmentation using the existing Methods type
declare module "./types" {
  interface ChainMethods extends Methods {}
}

export function register(method: MethodRegistrar) {
  method("outline", applyOutline);
}

export interface OutlineOptions {
  width?: number | string;
  color?: string;
  style?:
    | "none"
    | "hidden"
    | "dotted"
    | "dashed"
    | "solid"
    | "double"
    | "groove"
    | "ridge"
    | "inset"
    | "outset";
  offset?: number | string;
}

/**
 * Interface function for applying outline styles.
 *
 * @param css - The current CSS object
 * @param widthOrOptions - Width value or OutlineOptions object
 * @param options - Additional OutlineOptions (optional)
 * @returns Updated CSS object with outline styles applied
 *
 * @example
 * // Input:
 * applyOutline({}, 2)
 * // Output:
 * { outlineWidth: 2, outlineStyle: 'solid' }
 *
 * @example
 * // Input:
 * applyOutline({}, '3px', { color: 'red', style: 'dashed' })
 * // Output:
 * { outlineWidth: '3px', outlineColor: 'red', outlineStyle: 'dashed' }
 *
 * @example
 * // Input:
 * applyOutline({}, { width: 2, color: 'blue', offset: '1px' })
 * // Output:
 * { outlineWidth: 2, outlineColor: 'blue', outlineStyle: 'solid', outlineOffset: '1px' }
 */
function applyOutline(
  css: CSS,
  widthOrOptions: string | number | OutlineOptions,
  options?: OutlineOptions,
): CSS {
  if (typeof widthOrOptions === "object") {
    return applyOutlineOptions(css, widthOrOptions);
  } else if (options) {
    return applyOutlineOptions(
      applyOutlineOptions(css, { width: widthOrOptions }),
      options,
    );
  } else {
    return applyOutlineOptions(css, { width: widthOrOptions });
  }
}

/**
 * Applies outline styles to the CSS object.
 *
 * @param css - The current CSS object
 * @param options - OutlineOptions object containing outline settings
 * @returns Updated CSS object with outline styles applied
 */
function applyOutlineOptions(css: CSS, options: OutlineOptions): CSS {
  const result = { ...css };

  if (options.width !== undefined) {
    result.outlineWidth = options.width;
  }
  if (options.color !== undefined) {
    result.outlineColor = options.color;
  }
  result.outlineStyle = options.style || "solid";
  if (options.offset !== undefined) {
    result.outlineOffset = options.offset;
  }

  return result;
}
