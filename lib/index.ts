import { createStitches } from "@stitches/react";
import { Tokens, Chain, createChain } from "./chain";
import { BoxOptions } from "./box";
import { breakpoints } from "./breakpoints";
import { tokens } from "./tokens";

interface InitOptions {
  tokens: Tokens;
  breakpoints: Record<string, string>;
}

/**
 * Initializes the styling library with custom tokens and breakpoints.
 *
 * @param options - Configuration options for the library
 * @returns An object containing styling utility functions
 *
 * @example
 * const { View, HStack, VStack } = init({
 *   tokens: { colors: { primary: '#007bff' } },
 *   breakpoints: { tablet: '(min-width: 768px)' }
 * });
 */
export function init(options?: InitOptions) {
  const stitches = createStitches({
    media: {
      ...breakpoints,
      ...options?.breakpoints,
    },
    theme: options?.tokens || tokens,
  });

  const chain = (tag?: string) => createChain(stitches, tag);

  return {
    /**
     * Creates a new Chain instance for a div or specified element.
     *
     * @param elementTag - Optional HTML tag (default: 'div')
     * @returns A new Chain instance
     *
     * @example
     * const MyComponent = View().bg('red').text('white').element();
     */
    View: (elementTag?: string): Chain => {
      return chain(elementTag || "div");
    },

    /**
     * Creates a new Chain instance for a div element.
     *
     * @returns A new Chain instance
     *
     * @example
     * const MyStyle = style().padding(20).margin(10);
     */
    style: (): Chain => {
      return chain("div");
    },

    /**
     * Creates a flexible frame layout with customizable dimensions and alignment. Frames center their content by default.
     *
     * @param widthOrBoxOptions - Width or BoxOptions for the frame
     * @param heightOrBoxOptions - Height or BoxOptions for the frame
     * @param align - Optional alignment options
     * @returns A new Chain instance configured as a frame
     *
     * @example
     * const MyFrame = Frame(200, 200).bg('red').element();
     * const MyCustomFrame = Frame(200, { opacity: 0.5 }).element();
     * const MyAlignedFrame = Frame(200, 200, { x: "center", y: "end" }).element();
     */
    Frame: (
      widthOrBoxOptions?: number | string | BoxOptions,
      heightOrBoxOptions?: number | string | BoxOptions,
      align?:
        | StackAlignment
        | [StackAlignment, StackAlignment]
        | { horizontal?: StackAlignment; vertical?: StackAlignment },
    ): Chain => {
      let width: number | string | undefined;
      let height: number | string | undefined;
      let boxOptions: BoxOptions = {};

      // Parse first argument
      if (typeof widthOrBoxOptions === "object") {
        boxOptions = widthOrBoxOptions;
      } else {
        width = widthOrBoxOptions;
      }

      // Parse second argument
      if (typeof heightOrBoxOptions === "object") {
        boxOptions = { ...boxOptions, ...heightOrBoxOptions };
      } else {
        height = heightOrBoxOptions;
      }

      const c = chain("div").vstack().box({ ...boxOptions, width, height });
      if (!align) {
        return c.align("center");
      }

      return c.align({
        x: align?.x || "center",
        y: align?.y || "center",
      });
    },

    /**
     * Creates a horizontally stacked layout.
     *
     * @param elementTagOrOptions - HTML tag or BoxOptions
     * @param options - Additional BoxOptions
     * @returns A new Chain instance with horizontal stack styles
     *
     * @example
     * const MyHStack = HStack().space({ gap: 10 }).padding(20).element();
     */
    HStack: (
      elementTagOrOptions?: string | BoxOptions,
      options?: BoxOptions,
    ): Chain => {
if (typeof elementTagOrOptions === "object") {
        return chain("div").hstack(elementTagOrOptions);
      }

      if (typeof options === "object") {
	return chain(elementTagOrOptions || "div").hstack().box(options);
      }

      return chain(elementTagOrOptions || "div").hstack()
    },

    /**
     * Creates a scrollable view with customizable scroll behavior.
     *
     * @param options - Scroll options for x and y axes
     * @returns A new Chain instance configured as a scrollable view
     *
     * @example
     * const VerticalScroll = ScrollView({ y: true }).height(300).padding(20).element();
     * const HorizontalScroll = ScrollView({ x: true }).width(500).padding(20).element();
     */
    ScrollView: (options: ScrollOptions = { x: true, y: true }): Chain => {
      return chain("div").scroll(options);
    },

    /**
     * Creates a vertically stacked layout.
     *
     * @param elementTagOrOptions - HTML tag or BoxOptions
     * @param options - Additional BoxOptions
     * @returns A new Chain instance with vertical stack styles
     *
     * @example
     * const MyVStack = VStack().space({ gap: 20 }).align('center').element();
     */
    VStack: (
      elementTagOrOptions?: string | BoxOptions,
      options?: BoxOptions,
    ): Chain => {
      if (typeof elementTagOrOptions === "object") {
        return chain("div").vstack(elementTagOrOptions);
      }

      if (typeof options === "object") {
	return chain(elementTagOrOptions || "div").vstack().box(options);
      }

      return chain(elementTagOrOptions || "div").vstack()
    },
  };
}
