import { CSS } from '@stitches/react'
import { MethodRegistrar, Chain } from './chain'
import { BoxSides, BoxCorners, expandSidesToCorners, generatePropertyName, boxSideProps } from './box-sides'
import { isDefined } from './utils'

export type Methods = {
  border: (
    widthOrOptions: string | number | BorderOptions,
    options?: BorderOptions
  ) => Chain
  stroke: (
    widthOrOptions: string | number | BorderOptions,
    options?: BorderOptions
  ) => Chain
   round: (
    valueOrOptions?: number | string | BoxCorners | BoxSides,
    options?: BoxCorners
  ) => Chain
}

export function register(method: MethodRegistrar) {
  method("border", applyBorder)
  method("stroke", applyStroke)
    method("round", applyRound)

}

export interface BorderOptions {
  width?: number | string | BoxSides
  style?: 'solid' | 'dashed' | 'dotted' | 'double' | 'none'
  color?: string
  radius?: number | string | BoxCorners | BoxSides
  top?: number | string
  right?: number | string
  bottom?: number | string
  left?: number | string
}

function applyBorder(
  input: CSS,
  widthOrOptions: string | number | BorderOptions,
  options?: BorderOptions
): CSS {
  let output = { ...input }
  if (typeof widthOrOptions === 'object') {
    output = applyBorderOptions(output, widthOrOptions)
  } else if (options) {
    output = applyBorderOptions(
      applyBorderOptions(output, { width: widthOrOptions }),
      options
    )
  } else {
    output = applyBorderOptions(output, { width: widthOrOptions })
  }
  if (options?.radius) {
    output = applyRoundedCornerOptions(output, options.radius)
  }
  return output
}

function applyStroke(
  input: CSS,
  widthOrOptions: string | number | BorderOptions,
  options?: BorderOptions
): CSS {
  return applyBorder(input, widthOrOptions, options)
}

function applyRound(
  input: CSS,
  valueOrOptions?: number | string | BoxCorners | BoxSides,
  options?: BoxCorners
): CSS {
  let output = { ...input }
  if (typeof valueOrOptions === 'undefined') {
    output = applyRoundedCornerOptions(output, '$sm')
  } else {
    output = applyRoundedCornerOptions(output, valueOrOptions)
  }
  if (options) {
    output = applyRoundedCornerOptions(output, options)
  }
  return output
}

export function applyBorderOptions(css: CSS, options: BorderOptions): CSS {
  const result = {
    ...css,
    ...boxSideProps(
      'border',
      isDefined(options.width) ? options.width : options,
      'Width'
    ),
    ...boxSideProps(
      'border',
      isDefined(options.width) ? options.width : options,
      'Style',
      {
        override: css.borderStyle || 'solid',
      }
    ),
  }

  if (options.color) {
    result.borderColor = options.color
  }

  return result
}

export function applyRoundedCornerOptions(
  css: CSS,
  input: number | string | BoxCorners | BoxSides
) {
  const result = { ...css }
  const corners = ['topLeft', 'topRight', 'bottomRight', 'bottomLeft']
  const values = expandSidesToCorners(input)

  if (typeof values === 'number' || typeof values === 'string') {
    result.borderRadius = values
    return result
  }

  if (Array.isArray(values)) {
    values.forEach((value, index) => {
      if (value != null) {
        const corner = corners[index]
        result[generatePropertyName('border', corner, 'Radius')] = value
      }
    })

    return result
  }

  if (typeof values === 'object') {
    for (const corner of corners) {
      if (typeof values[corner] != 'undefined') {
        result[generatePropertyName('border', corner, 'Radius')] =
          values[corner]
      }
    }

    return result
  }

  return result
}
