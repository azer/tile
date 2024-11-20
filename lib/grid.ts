import { CSS } from "@stitches/react";
import { MethodRegistrar, Chain } from "./types";
import { applyGridAlignOptions, StackAlignment } from "./align";

export type Methods = {
  grid: (options: GridOptions) => Chain;
  columns: (template: string | number, options?: GridOptions) => Chain;
  rows: (template: string | number, options?: GridOptions) => Chain;
};

declare module "./types" {
  interface ChainMethods extends Methods {}
}

export function register(method: MethodRegistrar) {
  method("grid", applyGrid);
  method("columns", applyColumns);
  method("rows", applyRows);
}

// GridOptions for the public API
export interface GridOptions {
  gap?: string | number;
  columnGap?: string | number;
  rowGap?: string | number;
  autoFlow?: "row" | "column" | "dense" | "row dense" | "column dense";
  autoColumns?: string;
  autoRows?: string;
  columns?: string;
  rows?: string;
  templateAreas?: string;
  alignContent?:
    | "start"
    | "end"
    | "center"
    | "stretch"
    | "space-around"
    | "space-between"
    | "space-evenly";
  justifyContent?:
    | "start"
    | "end"
    | "center"
    | "stretch"
    | "space-around"
    | "space-between"
    | "space-evenly";
  alignItems?: "start" | "end" | "center" | "stretch" | "baseline";
  justifyItems?: "start" | "end" | "center" | "stretch";
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
 * Applies grid styles to the CSS object.
 *
 * @param css - The current CSS object
 * @param options - Grid options to be applied
 * @returns Updated CSS object with grid styles applied
 *
 * @example
 * applyGrid({}, { gap: 10, columns: 'repeat(3, 1fr)' })
 * // Output: { display: 'grid', gap: '10px', gridTemplateColumns: 'repeat(3, 1fr)' }
 */
function applyGrid(css: CSS, options: GridOptions): CSS {
  return applyGridOptions(css, { ...options });
}

/**
 * Applies grid column styles to the CSS object.
 *
 * @param css - The current CSS object
 * @param template - Grid column template
 * @param options - Additional grid options
 * @returns Updated CSS object with grid column styles applied
 *
 * @example
 * applyColumns({}, '1fr 1fr 1fr', { gap: 10 })
 * // Output: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }
 */
function applyColumns(
  css: CSS,
  template: string | number,
  options: GridOptions = {},
): CSS {
  const columns =
    typeof template === "number" ? `repeat(${template}, 1fr)` : template;
  return applyGridOptions(css, { columns, ...options });
}

/**
 * Applies grid row styles to the CSS object.
 *
 * @param css - The current CSS object
 * @param template - Grid row template
 * @param options - Additional grid options
 * @returns Updated CSS object with grid row styles applied
 *
 * @example
 * applyRows({}, '100px auto 100px', { gap: 20 })
 * // Output: { display: 'grid', gridTemplateRows: '100px auto 100px', gap: '20px' }
 */
function applyRows(
  css: CSS,
  template: string | number,
  options: GridOptions = {},
): CSS {
  const rows =
    typeof template === "number" ? `repeat(${template}, 1fr)` : template;
  return applyGridOptions(css, { rows, ...options });
}

function applyGridOptions(css: CSS, options: GridOptions): CSS {
  let output = { ...css, display: "grid" } as CSS;

  const propertyMap: Record<string, string> = {
    gap: "gap",
    columnGap: "columnGap",
    rowGap: "rowGap",
    autoFlow: "gridAutoFlow",
    autoColumns: "gridAutoColumns",
    autoRows: "gridAutoRows",
    columns: "gridTemplateColumns",
    rows: "gridTemplateRows",
    templateAreas: "gridTemplateAreas",
    alignContent: "alignContent",
    justifyContent: "justifyContent",
    alignItems: "alignItems",
    justifyItems: "justifyItems",
  };

  for (const [key, value] of Object.entries(options)) {
    if (key in propertyMap && value !== undefined) {
      output[propertyMap[key]] = value;
    }
  }

  if (options.align) {
    output = applyGridAlignOptions(output, options.align);
  }

  return output;
}
