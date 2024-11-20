import { createStitches, CSS, styled as stitchesStyled } from "@stitches/react";

export type StitchesConfig = Parameters<typeof createStitches>[0];
export type ElementTag = Parameters<typeof stitchesStyled>[0];
export type Tokens = Parameters<typeof createStitches>[0];
export type Node = ReturnType<typeof stitchesStyled>;
export type StitchesInstance = ReturnType<typeof createStitches>;

export type ChainMethod = (input: CSS, ...args: any[]) => CSS;
