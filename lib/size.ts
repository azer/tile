import { CSS } from "@stitches/react";
import { Chain, MethodRegistrar } from "./types";

export type Methods = {
  size: (
    widthOrOptions: string | number | SizeOptions,
    heightOrOptions?: string | number | SizeOptions,
  ) => Chain;
  width: (width: string | number, options?: { max?: number | string }) => Chain;
  height: (
    height: string | number,
    options?: { max?: number | string },
  ) => Chain;
};

declare module "./types" {
  interface ChainMethods extends Methods {}
}

export function register(method: MethodRegistrar) {
  method("size", applySize);
  method("width", applyWidth);
  method("height", applyHeight);
}

function applyWidth(
  input: CSS,
  width: string | number,
  options?: { max?: number | string; min?: number | string },
): CSS {
  return applySizeOptions(input, {
    width,
    maxWidth: options?.max,
    minWidth: options?.min,
  });
}

function applyHeight(
  input: CSS,
  height: string | number,
  options?: { max?: number | string; min?: number | string },
): CSS {
  return applySizeOptions(input, {
    height,
    maxHeight: options?.max,
    minHeight: options?.min,
  });
}

function applySize(
  input: CSS,
  widthOrOptions: string | number | SizeOptions,
  heightOrOptions?: string | number | SizeOptions,
): CSS {
  let output = { ...input };

  if (typeof widthOrOptions === "object") {
    output = applySizeOptions(output, widthOrOptions);
  }

  if (typeof heightOrOptions === "object") {
    output = applySizeOptions(output, heightOrOptions);
  }

  if (
    typeof heightOrOptions === "string" ||
    typeof heightOrOptions === "number"
  ) {
    output = applySizeOptions(output, { height: heightOrOptions });
  }

  if (
    typeof widthOrOptions === "string" ||
    typeof widthOrOptions === "number"
  ) {
    output = applySizeOptions(output, { width: widthOrOptions });
  }

  return output;
}

export interface SizeOptions {
  width?: string | number;
  height?: string | number;
  minWidth?: string | number;
  minHeight?: string | number;
  maxWidth?: string | number;
  maxHeight?: string | number;
  aspect?: number;
}

export function applySizeOptions(css: CSS, options: SizeOptions): CSS {
  const result = { ...css };

  if (options.width !== undefined) {
    result.width = options.width;
  }

  if (options.height !== undefined) {
    result.height = options.height;
  }

  if (options.maxWidth !== undefined) {
    result.maxWidth = options.maxWidth;
  }

  if (options.maxHeight !== undefined) {
    result.maxHeight = options.maxHeight;
  }

  if (options.minWidth !== undefined) {
    result.minWidth = options.minWidth;
  }

  if (options.minHeight !== undefined) {
    result.minHeight = options.minHeight;
  }

  if (options.aspect !== undefined) {
    result.aspectRatio = `${options.aspect}`;
  }

  return result;
}
