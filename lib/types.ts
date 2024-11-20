import { createStitches, CSS, styled as stitchesStyled } from "@stitches/react";

export type StitchesConfig = Parameters<typeof createStitches>[0];
export type ElementTag = Parameters<typeof stitchesStyled>[0];
export type Tokens = Parameters<typeof createStitches>[0];
export type Node = ReturnType<typeof stitchesStyled>;
export type StitchesInstance = ReturnType<typeof createStitches>;

export type ChainMethod = (input: CSS, ...args: any[]) => CSS;

export interface BaseChain {
  extend: () => Chain;
  compile: () => CSS;
  select: (selector: string, subchain: CSS | Chain) => Chain;
  variant: (
    name: string,
    value: string | number | boolean,
    subchain: Chain,
  ) => Chain;
  css(input: CSS): Chain;
  element: () => Node;
}

// Empty interface that modules will augment
export interface ChainMethods {}

// Final Chain type that combines base functionality with all module methods
export type Chain = BaseChain & {
  [K in keyof ChainMethods]: ChainMethods[K];
};

// Method registration helper
export type MethodRegistrar = (name: string, method: ChainMethod) => void;

export interface VariantValue {
  chain: Chain;
  value: string | number | boolean;
}

export type VariantCSS = Record<string, CSS | Array<VariantValue>>;
