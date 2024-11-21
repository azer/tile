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
  element: (css?: CSS) => Node;
}

// Empty interface that modules will augment
export interface ChainMethods {}

// Final Chain type that combines base functionality with all module methods
export type Chain = BaseChain &
  ChainMethods &
  align.Methods &
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

// Method registration helper
export type MethodRegistrar = (name: string, method: ChainMethod) => void;

export interface VariantValue {
  chain: Chain | CSS;
  value: string | number | boolean;
}

export type VariantCSS = Record<string, Array<VariantValue>>;
