import { CSS } from "@stitches/react";
import {
  ElementTag as Tag,
  Node,
  StitchesInstance,
  Chain,
  VariantCSS,
  MethodRegistrar,
  ChainMethod,
} from "./types";

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
    children: Record<string, CSS | Chain>;
  },
): Chain {
  let tree: CSS = { ...startingValues?.tree };
  const variants: VariantCSS = { ...startingValues?.variants };
  const children: Record<string, CSS | Chain> = { ...startingValues?.children };

  const chain: Chain = {
    extend: () => {
      return createChain(stitches, elementTag, { tree, variants, children });
    },
    compile,
    // @ts-ignore
    select: (selector: string, subchain: CSS | Chain) => {
      children[selector] = subchain;
      return chain;
    },
    // In your element method:
    element: (rawCSS?: CSS) => {
      const component = stitches.styled(elementTag || "div", {
        ...chain.compile(),
        ...rawCSS,
      });

      return component;
    },
    variant: (
      name: string,
      value: string | number | boolean,
      subchain: Chain | CSS,
    ) => {
      if (variants[name]) {
        variants[name].push({ chain: subchain, value });
      } else {
        variants[name] = [
          {
            value,
            chain: subchain,
          },
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

  function addMethod(name: string, fn: ChainMethod) {
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
      output.variants[name] = {};

      for (const variant of variants[name]) {
        output.variants[name][variant.value] =
          typeof variant.chain.compile === "function"
            ? variant.chain.compile()
            : variant.chain;
      }
    }

    for (const selector in children) {
      output[selector] =
        typeof children[selector].compile === "function"
          ? children[selector].compile()
          : children[selector];
    }

    return output;
  }
}
