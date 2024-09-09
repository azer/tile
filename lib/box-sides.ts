import { CSS } from "@stitches/react";
import { or } from "./utils";

export type BoxCorners =
  | {
      topLeft?: string | number;
      topRight?: string | number;
      bottomRight?: string | number;
      bottomLeft?: string | number;
      // Incorrect writing, will be automatically corrected:
      leftTop?: string | number;
      rightTop?: string | number;
      rightBottom?: string | number;
      leftBottom?: string | number;
    }
  // Corners in order: topLeft, topRight, bottomRight, bottomLeft
  | (number | string)[];

export type BoxSides =
  | {
      top?: number | string;
      right?: number | string;
      bottom?: number | string;
      left?: number | string;
      x?: number | string;
      y?: number | string;
    }
  // Sides in order: top, right, bottom, left
  | (number | string)[];

export function boxSideProps(
  propertyName: string,
  values?: string | number | BoxSides,
  propertySuffix?: string,
  opt?: { override?: number | string },
): CSS {
  const result: CSS = {};
  const sideNames = ["top", "right", "bottom", "left"];

  if (typeof values === "number" || typeof values === "string") {
    result[`${propertyName}${propertySuffix || ""}`] = opt?.override
      ? opt.override
      : values;
    return result;
  }

  if (Array.isArray(values)) {
    values.forEach((value, index) => {
      if (value != null) {
        const sideName = sideNames[index];
        result[generatePropertyName(propertyName, sideName, propertySuffix)] =
          opt?.override ? opt.override : value;
      }
    });

    return result;
  }

  if (typeof values === "object") {
    for (const [side, value] of Object.entries(expandXYToSides(values))) {
      if (value != null) {
        result[generatePropertyName(propertyName, side, propertySuffix)] =
          opt?.override ? opt.override : value;
      }
    }

    return result;
  }

  return result;
}

export function generatePropertyName(
  baseProperty: string,
  side: string,
  suffix?: string,
): string {
  return `${baseProperty}${side.charAt(0).toUpperCase() + side.slice(1)}${
    suffix || ""
  }`;
}

export function expandSidesToCorners(
  input: BoxSides | BoxCorners,
): string | number | BoxCorners {
  // Early return for non-object inputs or arrays
  if (typeof input !== "object" || Array.isArray(input)) {
    return input;
  }

  // Early return if input is already BoxCorners
  if (
    "topLeft" in input ||
    "topRight" in input ||
    "bottomRight" in input ||
    "bottomLeft" in input ||
    "leftTop" in input ||
    "rightTop" in input ||
    "rightBottom" in input ||
    "leftBottom" in input
  ) {
    return normalizeBoxCorners(input);
  }

  // At this point, we know input is a BoxSides object
  const { top, right, bottom, left } = input as {
    top?: number | string;
    right?: number | string;
    bottom?: number | string;
    left?: number | string;
  };

  return {
    topLeft: or(top, left),
    topRight: or(top, right),
    bottomRight: or(bottom, right),
    bottomLeft: or(bottom, left),
  };
}

function expandXYToSides(sides: BoxSides): BoxSides {
  if (Array.isArray(sides)) return sides;

  const result: BoxSides = { ...sides };

  if (sides.x !== undefined) {
    result.left = sides.x;
    result.right = sides.x;
    delete result.x;
  }

  if (sides.y !== undefined) {
    result.top = sides.y;
    result.bottom = sides.y;
    delete result.y;
  }

  return result;
}

export function normalizeBoxCorners(input: BoxCorners): BoxCorners {
  if (Array.isArray(input) || typeof input !== "object") return input;

  const normalized: BoxCorners = { ...input };

  if (input.leftTop !== undefined) normalized.topLeft = input.leftTop;
  if (input.rightTop !== undefined) normalized.topRight = input.rightTop;
  if (input.rightBottom !== undefined)
    normalized.bottomRight = input.rightBottom;
  if (input.leftBottom !== undefined) normalized.bottomLeft = input.leftBottom;

  return normalized;
}
