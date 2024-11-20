import { CSS } from "@stitches/react";
import { MethodRegistrar, Chain } from "./chain";

export type Methods = {
  aspect: (ratio: number) => Chain;
};

declare module "./types" {
  interface ChainMethods extends Methods {}
}

export function register(method: MethodRegistrar) {
  method("aspect", applyAspectOptions);
}

function applyAspectOptions(css: CSS, ratio: number): CSS {
  return {
    ...css,
    aspectRatio: `${ratio}`,
  };
}
