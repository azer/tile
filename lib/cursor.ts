import { CSS } from "@stitches/react";

import { MethodRegistrar, Chain } from "./types";

export type Methods = {
  cursor: (value: Cursor | CursorValue) => Chain;
};

declare module "./types" {
  interface ChainMethods extends Methods {}
}

export function register(method: MethodRegistrar) {
  method("cursor", applyCursor);
}

export enum Cursor {
  Auto = "auto",
  Default = "default",
  Pointer = "pointer",
  Wait = "wait",
  Text = "text",
  Move = "move",
  Help = "help",
  NotAllowed = "not-allowed",
  None = "none",
  ContextMenu = "context-menu",
  Progress = "progress",
  Cell = "cell",
  Crosshair = "crosshair",
  VerticalText = "vertical-text",
  Alias = "alias",
  Copy = "copy",
  NoDrop = "no-drop",
  Grab = "grab",
  Grabbing = "grabbing",
  AllScroll = "all-scroll",
  ColResize = "col-resize",
  RowResize = "row-resize",
  NResize = "n-resize",
  EResize = "e-resize",
  SResize = "s-resize",
  WResize = "w-resize",
  NEResize = "ne-resize",
  NWResize = "nw-resize",
  SEResize = "se-resize",
  SWResize = "sw-resize",
  EWResize = "ew-resize",
  NSResize = "ns-resize",
  NESWResize = "nesw-resize",
  NWSEResize = "nwse-resize",
  ZoomIn = "zoom-in",
  ZoomOut = "zoom-out",
}

export type CursorValue = Cursor | string;

export interface CursorOptions {
  cursor?: Cursor | CursorValue;
  src?: string;
  url?: string;
}

/**
 * Applies cursor styles to the CSS object.
 *
 * @param css - The current CSS object
 * @param input - Either a Cursor enum value or a CursorOptions object
 * @returns Updated CSS object with cursor styles applied
 *
 * @example
 * // Input:
 * applyCursor({}, Cursor.Pointer)
 * // Output:
 * { cursor: 'pointer' }
 *
 * @example
 * // Input:
 * applyCursor({}, { src: 'url(path/to/cursor.png)', cursor: Cursor.Pointer })
 * // Output:
 * { cursor: 'url(path/to/cursor.png), pointer' }
 *
 * @example
 * // Input:
 * applyCursor({}, { url: 'path/to/cursor.png', cursor: Cursor.Auto })
 * // Output:
 * { cursor: 'url(path/to/cursor.png), auto' }
 */
function applyCursor(css: CSS, input: CursorValue | CursorOptions): CSS {
  const options = typeof input === "string" ? { cursor: input } : input;
  return applyCursorOptions(css, options);
}

function applyCursorOptions(css: CSS, options: CursorOptions): CSS {
  let cursorValue: string;

  if (options.url) {
    options.src = `url(${options.url})`;
  }

  if (options.src) {
    cursorValue = options.cursor
      ? `${options.src}, ${options.cursor}`
      : `${options.src}, auto`;
  } else if (options.cursor) {
    cursorValue = options.cursor;
  } else {
    cursorValue = Cursor.Default;
  }

  return { ...css, cursor: cursorValue };
}
