import { CSS } from '@stitches/react'
import { MethodRegistrar, Chain } from './chain'

export type Methods = {
  shadow: (strength?: number) => Chain
}

export function register(method: MethodRegistrar) {
  method("shadow", applyShadow)
}

const shadows = [
  '0 0 #0000', // shadow-none
  '0 1px 2px 0 rgb(0 0 0 / 0.05)', // shadow-sm
  '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)', // shadow
  '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', // shadow-md
  '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)', // shadow-lg
  '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)', // shadow-xl
  '0 25px 50px -12px rgb(0 0 0 / 0.25)', // shadow-2xl
  'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)', // shadow-inner
]

function applyShadow(css: CSS, strength?: number): CSS {
  const index = Math.max(0, Math.min(shadows.length - 1, Math.floor((strength || 0.5) * 4)))
  return {
    ...css,
    boxShadow: shadows[index]
  }
}
