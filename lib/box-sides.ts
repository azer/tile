import { CSS } from '@stitches/react'

export type BoxCorners =
  | {
      topLeft?: string | number
      topRight?: string | number
      bottomRight?: string | number
      bottomLeft?: string | number
    }
  | (number | string)[]

export type BoxSides =
  | {
      top?: number | string
      right?: number | string
      bottom?: number | string
      left?: number | string
      x?: number | string
      y?: number | string
    }
  | (number | string)[]

export function boxSideProps(
  propertyName: string,
  values?: string | number | BoxSides,
  propertySuffix?: string,
  opt?: { override?: number | string }
): CSS {
  const result: CSS = {}
  const sideNames = ['top', 'right', 'bottom', 'left']

  if (typeof values === 'number' || typeof values === 'string') {
    result[`${propertyName}${propertySuffix || ''}`] = opt?.override
      ? opt.override
      : values
    return result
  }

  if (Array.isArray(values)) {
    values.forEach((value, index) => {
      if (value != null) {
        const sideName = sideNames[index]
        result[generatePropertyName(propertyName, sideName, propertySuffix)] =
          opt?.override ? opt.override : value
      }
    })

    return result
  }

  if (typeof values === 'object') {
    for (const [side, value] of Object.entries(expandXYToSides(values))) {
      if (value != null) {
        result[generatePropertyName(propertyName, side, propertySuffix)] =
          opt?.override ? opt.override : value
      }
    }

    return result
  }

  return result
}

export function generatePropertyName(
  baseProperty: string,
  side: string,
  suffix?: string
): string {
  return `${baseProperty}${side.charAt(0).toUpperCase() + side.slice(1)}${
    suffix || ''
  }`
}

export function expandSidesToCorners(
  input: BoxSides | BoxCorners
): string | number | BoxCorners {
  // Early return for non-object inputs or arrays
  if (typeof input !== 'object' || Array.isArray(input)) {
    return input
  }

  // Early return if input is already BoxCorners
  if (
    'topLeft' in input ||
    'topRight' in input ||
    'bottomRight' in input ||
    'bottomLeft' in input
  ) {
    return input
  }

  // At this point, we know input is a BoxSides object
  const { top, right, bottom, left } = input as {
    top?: number | string
    right?: number | string
    bottom?: number | string
    left?: number | string
  }

  return {
    topLeft: top || left,
    topRight: top || right,
    bottomRight: bottom || right,
    bottomLeft: bottom || left,
  }
}

function expandXYToSides(sides: BoxSides): BoxSides {
  const result: BoxSides = { ...sides }

  if (sides.x !== undefined) {
    result.left = sides.x
    result.right = sides.x
    delete result.x
  }

  if (sides.y !== undefined) {
    result.top = sides.y
    result.bottom = sides.y
    delete result.y
  }

  return result
}
