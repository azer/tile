import { createStitches, CSS, styled as stitchesStyled } from "@stitches/react";
import * as box from "./box";
import * as size from "./size";
import * as colors from "./colors";
import * as align from "./align";
import * as aspect from "./aspect";
import * as border from "./border";
import * as cursor from "./cursor";
import * as outline from "./outline";
import * as shadow from "./shadow";
import * as spacing from "./spacing";
import * as text from "./text";
import * as transition from "./transition";
import * as scroll from "./scroll";
import * as flex from "./flex";
import * as selectors from "./selectors";
import * as grid from "./grid";
import * as responsive from "./responsive";
import * as transform from "./transform";
import * as accessibility from "./accessibility";
import * as backdrop from "./backdrop";

export type Tag = Parameters<typeof stitchesStyled>[0];
export type Tokens = Parameters<typeof createStitches>[0];
export type Node = ReturnType<typeof stitchesStyled>;
export type StitchesInstance = ReturnType<typeof createStitches>;
export type VariantCSS = Record<
  string,
  CSS | { chain: Chain; value: string | number | boolean }[]
>;

export type MethodRegistrar = (name: string, m: ChainMethod) => void;

export type Chain = {
  extend: () => Chain;
  compile: () => CSS;
  select: (selector: string, subchain: CSS | Chain) => Chain;
  variant: (
    name: string,
    value: string | number | boolean,
    subchain: Chain,
  ) => Chain;
  element: () => Node;
} & align.Methods &
  box.Methods &
  colors.Methods &
  size.Methods &
  aspect.Methods &
  border.Methods &
  cursor.Methods &
  outline.Methods &
  shadow.Methods &
  spacing.Methods &
  text.Methods &
  transition.Methods &
  scroll.Methods &
  flex.Methods &
  selectors.Methods &
  responsive.Methods &
  grid.Methods &
  transform.Methods &
  accessibility.Methods &
  backdrop.Methods;

export type ChainMethod = (input: CSS, ...args: unknown[]) => CSS;

const modules = [
  align,
  aspect,
  border,
  box,
  colors,
  cursor,
  size,
  outline,
  shadow,
  spacing,
  text,
  transition,
  scroll,
  flex,
  selectors,
  responsive,
  grid,
  transform,
  accessibility,
  backdrop,
];

export function createChain(
  stitches: StitchesInstance,
  elementTag?: Tag,
  startingValues?: {
    tree: CSS;
    variants: VariantCSS;
    children: Record<string, Chain>;
  },
): Chain {
  let tree: CSS = { ...startingValues?.tree };
  const variants: VariantCSS = { ...startingValues?.variants };
  const children: Record<string, Chain> = { ...startingValues?.children };

  const chain: Chain = {
    extend: () => {
      return createChain(stitches, elementTag, { tree, variants, children });
    },
    compile,
    select: (selector: string, subchain: Chain) => {
      children[selector] = subchain;
      return chain;
    },
    element: (rawCSS?: CSS) => {
      return stitches.styled(elementTag || ("div" as Tag), {
        ...chain.compile(),
        ...rawCSS,
      });
    },
    variant: (
      name: string,
      value: string | number | boolean,
      subchain: Chain,
    ) => {
      if (variants[name]) {
        variants[name].push({ chain: subchain, value });
      } else {
        variants[name] = [
          {
            value,
            chain: subchain,
          }
        ];
      }

      return chain;
    },
    css: (rawCSS: CSS) => {
      update(rawCSS);
      return chain;
    },
  };

  modules.forEach((m) => m.register(addMethod));

  return chain;

  function addMethod(name: string, fn: MethodRegistrar) {
    chain[name] = (...args: unknown[]) => {
      update(fn.apply(chain, [tree, ...args]));
      return chain;
    };
  }

  function update(updates: CSS) {
    tree = { ...tree, ...updates };
  }

  function compile() {
    const output: CSS = {
      ...tree,
    };

    output.variants = {};

    for (const name in variants) {
      output.variants[name] = {}

      for (const variant of variants[name]) {
				output.variants[name][variant.value] =
					variant.chain.compile === undefined
						? variant.chain
						: variant.chain.compile();
      }
    }

    for (const selector in children) {
      output[selector] =
        children[selector].compile === undefined
          ? children[selector]
          : children[selector].compile();
    }

    return output;
  }
}
