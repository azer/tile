import { createStitches } from "@stitches/react";
import { Chain, createChain } from "./chain";
import { BoxOptions } from "./box";
import { breakpoints } from "./breakpoints";
import { tokens } from "./tokens";
import { GridOptions } from "./grid";
import { ScrollOptions } from "./scroll";
import { StackAlignment } from "./align";
import { ElementTag as Tag, Tokens, StitchesConfig } from "./types";

export { Cursor } from "./cursor";

interface InitOptions {
  tokens: Tokens;
  breakpoints: Record<string, string>;
}

// Create a default instance of init
const defaultInstance = init();

// Export the components from the default instance
export const { View, style, Frame, ScrollView, VStack, HStack, Grid } =
  defaultInstance;

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
  } as StitchesConfig);

  const chain = (tag?: Tag) => createChain(stitches, tag);

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
    View: (elementTag?: Tag): Chain => {
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
    style: (tagOrElement?: Tag): Chain => {
      return chain(tagOrElement);
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
        | {
            horizontal?: StackAlignment;
            vertical?: StackAlignment;
            x?: StackAlignment;
            y?: StackAlignment;
          },
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

      const c = chain("div")
        .vstack()
        .box({ ...boxOptions, width, height });

      if (!align) {
        return c.align("center");
      }

      // Handle the different alignment types properly
      if (typeof align === "string") {
        return c.align(align);
      }

      if (Array.isArray(align)) {
        return c.align(align);
      }

      return c.align({
        horizontal: align.horizontal || align.x || "center",
        vertical: align.vertical || align.y || "center",
      });
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
     * @param widthOrOptions - Width or BoxOptions for the stack
     * @param heightOrOptions - Height or BoxOptions for the stack
     * @param options - Additional BoxOptions
     * @returns A new Chain instance with vertical stack styles
     *
     * @example
     * const SimpleVStack = VStack(100, 100).element();
     * const AspectVStack = VStack(200, { aspect: 1 }).element();
     * const ComplexVStack = VStack(100, 200, { maxHeight: "100%" }).element();
     */
    VStack: (
      widthOrOptions?: number | string | BoxOptions,
      heightOrOptions?: number | string | BoxOptions,
      options?: BoxOptions,
    ): Chain => {
      let width: number | string | undefined;
      let height: number | string | undefined;
      let boxOptions: BoxOptions = {};

      if (typeof widthOrOptions === "object") {
        boxOptions = widthOrOptions;
      } else {
        width = widthOrOptions;
      }

      if (typeof heightOrOptions === "object") {
        boxOptions = { ...boxOptions, ...heightOrOptions };
      } else {
        height = heightOrOptions;
      }

      if (options) {
        boxOptions = { ...boxOptions, ...options };
      }

      return chain("div")
        .vstack()
        .box({ ...boxOptions, width, height });
    },

    /**
     * Creates a horizontally stacked layout.
     *
     * @param widthOrOptions - Width or BoxOptions for the stack
     * @param heightOrOptions - Height or BoxOptions for the stack
     * @param options - Additional BoxOptions
     * @returns A new Chain instance with horizontal stack styles
     *
     * @example
     * const SimpleHStack = HStack(100, 100).element();
     * const MaxWidthHStack = HStack(100, { maxWidth: "500px" }).element();
     * const ComplexHStack = HStack(200, 200, { maxHeight: "100%" }).element();
     */
    HStack: (
      widthOrOptions?: number | string | BoxOptions,
      heightOrOptions?: number | string | BoxOptions,
      options?: BoxOptions,
    ): Chain => {
      let width: number | string | undefined;
      let height: number | string | undefined;
      let boxOptions: BoxOptions = {};

      if (typeof widthOrOptions === "object") {
        boxOptions = widthOrOptions;
      } else {
        width = widthOrOptions;
      }

      if (typeof heightOrOptions === "object") {
        boxOptions = { ...boxOptions, ...heightOrOptions };
      } else {
        height = heightOrOptions;
      }

      if (options) {
        boxOptions = { ...boxOptions, ...options };
      }

      return chain("div")
        .hstack()
        .box({ ...boxOptions, width, height });
    },

    /**
     * Creates a grid layout.
     *
     * @param options - Grid options
     * @returns A new Chain instance with grid styles
     *
     * @example
     * const SimpleGrid = Grid({ columns: 3, gap: 10 }).element();
     * const ComplexGrid = Grid({ columns: '1fr 2fr 1fr', rows: '100px auto' }).element();
     */
    Grid: (options: GridOptions): Chain => {
      return chain("div").grid(options);
    },
  };
}
