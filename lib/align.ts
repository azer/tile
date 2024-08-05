import { CSS } from '@stitches/react'
import { MethodRegistrar, Chain } from './chain'

export type Methods = {
  align: (
    options:
      | StackAlignment
      | [StackAlignment, StackAlignment]
      | {
          horizontal?: StackAlignment
          vertical?: StackAlignment
          x?: StackAlignment
          y?: StackAlignment
        }
  ) => Chain
}

export function register(method: MethodRegistrar) {
  method("align", applyAlignOptions)
}

export type StackAlignment =
  | 'top'
  | 'center'
  | 'bottom'
  | 'left'
  | 'right'
  | 'start'
  | 'end'
  | 'leading'
  | 'trailing'

export function applyAlignOptions(
  css: CSS,
  alignment:
    | StackAlignment
    | [StackAlignment, StackAlignment]
    | {
        horizontal?: StackAlignment
        vertical?: StackAlignment
        x?: StackAlignment
        y?: StackAlignment
      }
): CSS {
  const result = { ...css }
  const alignmentMap: Record<StackAlignment, string> = {
    top: 'flex-start',
    center: 'center',
    bottom: 'flex-end',
    left: 'flex-start',
    right: 'flex-end',
    start: 'flex-start',
    end: 'flex-end',
    leading: 'flex-start',
    trailing: 'flex-end',
  }

  let hor: StackAlignment | undefined
  let ver: StackAlignment | undefined

  if (typeof alignment === 'string') {
    hor = ver = alignment
  } else if (Array.isArray(alignment)) {
    ;[hor, ver] = alignment
  } else {
    hor = alignment.horizontal || alignment.x
    ver = alignment.vertical || alignment.y
  }

  const isRow = css.flexDirection !== 'column'

  if (isRow && hor) {
    result.justifyContent = alignmentMap[hor]
  } else if (!isRow && ver) {
    result.justifyContent = alignmentMap[ver]
  }

  if (isRow && ver) {
    result.alignItems = alignmentMap[ver]
  } else if (!isRow && hor) {
    result.alignItems = alignmentMap[hor]
  }

  return result
}
