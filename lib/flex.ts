import { CSS } from "@stitches/react";
import { Chain, MethodRegistrar } from "./chain";
import { applyFlexAlignOptions, StackAlignment } from "./align";

export type Methods = {
  flex: (options: FlexOptions) => Chain;
  hstack: (options?: FlexOptions) => Chain;
  vstack: (options?: FlexOptions) => Chain;
  center: (options?: FlexOptions) => Chain;
};

export function register(method: MethodRegistrar) {
  method("flex", applyFlex);
  method("hstack", applyHstack);
  method("vstack", applyVstack);
  method("center", applyCenter);
}

/**
 * Options for configuring flex container and item properties.
 */
export interface FlexOptions {
  /** Sets the direction of the flex container's main axis. */
  direction?: "row" | "column" | "row-reverse" | "column-reverse";
  /** Defines how the browser distributes space between and around content items along the main axis. */
  justify?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
  /** Defines how the browser distributes space between and around flex items along the cross axis. */
  items?: "flex-start" | "flex-end" | "center" | "baseline" | "stretch";
  /** Controls whether the flex container is single-line or multi-line. */
  wrap?: "nowrap" | "wrap" | "wrap-reverse";
  /** Specifies how much the flex item will grow relative to the rest of the flex items. */
  grow?: number;
  /** Specifies how much the flex item will shrink relative to the rest of the flex items. */
  shrink?: number;
  /** Specifies the initial main size of the flex item. */
  basis?: string | number;
  /** Aligns flex lines within the flex container when there's extra space in the cross-axis. */
  align?:
    | StackAlignment
    | [StackAlignment, StackAlignment]
    | {
        horizontal?: StackAlignment;
        vertical?: StackAlignment;
        x?: StackAlignment;
        y?: StackAlignment;
      };
}

/**
 * Applies flex container and item styles to the CSS object.
 *
 * @param input - The current CSS object
 * @param options - Flex options to be applied
 * @returns Updated CSS object with flex styles applied
 *
 * @example
 * // Creates a flex container with items aligned to the end
 * applyFlex({}, { direction: "row", justify: "flex-end", items: "center" })
 * // Output: { display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center" }
 */
function applyFlex(input: CSS, options: FlexOptions = {}): CSS {
  let output = { ...input, display: "flex" } as CSS;

  if (options.direction) output.flexDirection = options.direction;
  if (options.justify) output.justifyContent = options.justify;
  if (options.items) output.alignItems = options.items;
  if (options.wrap) output.flexWrap = options.wrap;
  if (options.grow !== undefined) output.flexGrow = options.grow;
  if (options.shrink !== undefined) output.flexShrink = options.shrink;
  if (options.basis !== undefined) output.flexBasis = options.basis;

  if (options.align) {
    output = applyFlexAlignOptions(output, options.align);
  }

  return output;
}

/**
 * Creates a horizontal stack layout (flex row).
 *
 * @param input - The current CSS object
 * @param options - Additional flex options to be applied
 * @returns Updated CSS object with horizontal stack styles applied
 *
 * @example
 * // Creates a horizontal stack with centered items
 * applyHstack({}, { items: "center", justify: "space-between" })
 * // Output: { display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }
 */
function applyHstack(input: CSS, options: FlexOptions = {}): CSS {
  return applyFlex(input, { direction: "row", ...options });
}

/**
 * Creates a vertical stack layout (flex column).
 *
 * @param input - The current CSS object
 * @param options - Additional flex options to be applied
 * @returns Updated CSS object with vertical stack styles applied
 *
 * @example
 * // Creates a vertical stack with items aligned to the start
 * applyVstack({}, { items: "flex-start", justify: "center" })
 * // Output: { display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center" }
 */
function applyVstack(input: CSS, options: FlexOptions = {}): CSS {
  return applyFlex(input, { direction: "column", ...options });
}

/**
 * Creates a centered flex layout.
 *
 * @param input - The current CSS object
 * @param options - Additional flex options to be applied
 * @returns Updated CSS object with centered flex styles applied
 *
 * @example
 * // Creates a centered layout with column direction
 * applyCenter({}, { wrap: "wrap" })
 * // Output: {
 * //   display: "flex",
 * //   flexDirection: "column",
 * //   alignItems: "center",
 * //   justifyContent: "center",
 * //   flexWrap: "wrap"
 * // }
 */
function applyCenter(input: CSS, options: FlexOptions = {}): CSS {
  return applyFlex(input, {
    direction: "column",
    items: "center",
    justify: "center",
    ...options,
  });
}
