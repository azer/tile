# Tile

Chainable styling library for React. Built on top of [Stitches](https://stitches.dev).

```bash
npm install tile-css
```

## Usage Examples

Create a box with "Hello World" message centered;

```tsx
import { Frame } from 'tile';

const TestBox = Frame("90vw", "90vh") // `Frame` centers its content by default
  .color({ bg: "black", fg: "white" })
  .border(10, { color: "blue", right: 0 }) // 10px border around, disabled on right side.
  .round(5) // Round by 5px
  .element();

export const App = () => {
  return (
    <TestBox>Hello World</TestBox>
  );
};
```

In addition to `Frame`, you can use `HStack` (orders items horizontally) and `VStack` (vertically) factory methods:

```tsx
import { Frame, style } from 'tile';

const TestBox = Vstack("90vw", "90vh") // Vertically ordered items
  .align({ x: "center", y: "end" }) // align content to bottom center
  .scale(2.5) // Apply `scale` transform 
  .border(10, { color: "blue" })
  .round(5) // Round by 5px
  .text(24) // font-size: 24px
  .mobile(style().padding(0)) // Set `padding` to 0, if user is on mobile
  .element();

export const App = () => {
  return (
    <TestBox>
      <div>Hello</div>
      <div>World</div>
    </TestBox>
  );
};
```

It includes lots of shortcuts for writing simpler TypeScript, e.g;

```tsx
import { View, style } from "tile"

const Container = View()
  .center() // just center everything inside the element on both x/y axis
  .attr("data-value", { contains: "example" }, style().bg("yellow")) // Selects all children with data-value attributes containing "example" string
  .element()
```

## API

### [Accessibility](./docs/accessibility.md)

The Accessibility module in Tile provides methods for enhancing the accessibility of your React components. Currently, it focuses on text selection control.

```ts
import { View } from "tile-css"

const AccessibleQuote = View('blockquote')
  .selection({
    bg: 'rgba(0, 123, 255, 0.2)',
    fg: 'navy'
  })
  .element();

export const ImportantMessage = () => (
  <AccessibleQuote>
    This quote is selectable with custom highlight colors.
    It enhances readability and indicates that the text can be copied.
  </AccessibleQuote>
);
```

Methods:

* [selection(options: SelectionOptions)](./docs/accessibility.md#selection-options-selectionoptions-)

### [Alignment](./docs/align.md)

Methods for controlling the alignment of content within flex and grid containers.

```tsx
import { View } from "tile-css"

const Container = View('100%', '100vh')
  .align({ x: 'center', y: 'end' }) // align contents to bottom center
  .element();

export const AppLayout = () => (
  <ResponsiveLayout>
    <Header />
    <MainContent />
    <Footer />
  </ResponsiveLayout>
);
```

Methods:

* [Frame(width?, height?, align?)](./docs/align.md#frame-width-height-align-)
* [VStack(elementTagOrOptions?, options?)](./docs/align.md#vstack-elementtagoroptions-options-)
* [HStack(elementTagOrOptions?, options?)](./docs/align.md#hstack-elementtagoroptions-options-)
* [center(options?: FlexOptions)](./docs/align.md#center-options-flexoptions-)
* [align(options: AlignmentOptions)](./docs/align.md#align-options-alignmentoptions-)

### [Aspect](./docs/aspect.md)

Set the aspect ratio of an element.

```tsx
import { View } from "tile-css"

const SquareElement = View()
  .aspect(1)
  .bg("red")
  .element();

export const SquareDemo = () => (<SquareElement />)
```

Methods:

* [aspect(ratio: number)](./docs/aspect.md#aspect-ratio-number-)

## [Backdrop](./docs/backdrop.md)

Apply backdrop filter effects to elements.

```tsx
import { View } from "tile-css"

const FrostedGlassCard = View(300, 200)
  .backdrop({
    blur: 10,
    saturate: "180%",
    brightness: "105%"
  })
  .bg('rgba(255, 255, 255, 0.2)')
  .border(1, { color: 'rgba(255, 255, 255, 0.3)' })
  .round(15)
  .padding(20)
  .element();

export const GlassCard = ({ children }) => (
  <FrostedGlassCard>{children}</FrostedGlassCard>
);
```

Methods:

* [backdrop(options?: BackdropOptions)](./docs/backdrop.md#backdrop-options-backdropoptions-)

## [Border](./docs/border.md)

Methods for applying and manipulating border styles in React components.

```typescript
import { View } from "tile-css"

const FancyButton = View('button')
  .size(200, 50)
  .color({ fg: 'blue', bg: 'white' })
  .border(2, { color: 'blue' })
  .round({ x: 25, y: 10 })
  .onHover(
    style()
      .color({ bg: 'blue', fg: 'white' })
      .border(2, { color: 'white' })
  )
  .element();

export const CustomButton = ({ children }) => (
  <FancyButton>{children}</FancyButton>
);
```

Methods:

* [border](./docs/border.md#border)
* [stroke](./docs/border.md#stroke)
* [round](./docs/border.md#round)

## [Box](./docs/box.md)

Methods for creating and manipulating layout containers. Use these functions to set dimensions, position elements, and control other box model properties in your React components.

```tsx
import { View } from "tile-css"

const ResponsiveCard = View()
  .box({
    display: 'flex',
    flexDir: 'column',
    justify: 'center',
    items: 'center',

  })
  .element();

export const Card = ({ children }) => (
  <ResponsiveCard>{children}</ResponsiveCard>
);
```

Methods:

* [Frame(width?, height?, align?)](./docs/box.md#frame-width-height-align-)
* [VStack(elementTagOrOptions?, options?)](./docs/box.md#vstack-elementtagoroptions-options-)
* [HStack(elementTagOrOptions?, options?)](./docs/box.md#hstack-elementtagoroptions-options-)
* [frame(options: BoxOptions)](./docs/box.md#frame-options-boxoptions-)
* [display(display: string, options?: BoxOptions)](./docs/box.md#display-display-string-options-boxoptions-)
* [absolute(xOrOptions, y?, options?)](./docs/box.md#absolute-xoroptions-y-options-)
* [position(x, y, options?)](./docs/box.md#position-x-y-options-)
* [pin(xOrOptions, y?, options?)](./docs/box.md#pin-xoroptions-y-options-)
* [relative(options: BoxOptions)](./docs/box.md#relative-options-boxoptions-)
* [opacity(value: number | string)](./docs/box.md#opacity-value-number-string-)
* [zIndex(value: number)](./docs/box.md#zindex-value-number-)
* [content(value: string)](./docs/box.md#content-value-string-)
* [box(options: BoxOptions)](./docs/box.md#box-options-boxoptions-)

## [Colors](./docs/colors.md)

Methods for applying color-related styles to React components.

```tsx
import { View } from "tile-css"

const KittenButton = View('button')
  .fg("#ff0")
  .bg({
    url: 'https://placekitten.com/100x100.jpg',
    size: 'cover'
  })
  .element();

export const FancyButton = ({ children }) => (
  <KittenButton>{children}</KittenButton>
);
```

Methods:

* [color(options: ColorOptions)](./docs/colors.md#color-options-coloroptions-)
* [fg(color: string)](./docs/colors.md#fg-color-string-)
* [bg(options: BGOptions)](./docs/colors.md#bg-options-bgoptions-)
* [placeholder(fg: string)](./docs/colors.md#placeholder-fg-string-)
* [fill(options: BGOptions)](./docs/colors.md#fill-options-bgoptions-)

## [Cursor](./docs/cursor.md)

Methods for setting cursor styles in React components.

```tsx
import { View, Cursor } from "tile-css"

const InteractiveElement = View()
  .size(100)
  .bg('lightblue')
  .cursor(Cursor.Pointer)
  .element();

export const CursorDemo = () => <InteractiveElement />;
```

Methods:

* [cursor(value: Cursor | CursorOptions)](./docs/cursor.md#cursor-value-cursor-cursoroptions-)

## [Flex](./docs/flex.md)

Methods for creating and manipulating flex layouts in React components.

Methods:

* [VStack(elementTagOrOptions?, options?)](./docs/flex.md#vstack-elementtagoroptions-options-)
* [HStack(elementTagOrOptions?, options?)](./docs/flex.md#hstack-elementtagoroptions-options-)
* [flex(options: FlexOptions)](./docs/flex.md#flex-options-flexoptions-)
* [hstack(options?: FlexOptions)](./docs/flex.md#hstack-options-flexoptions-)
* [vstack(options?: FlexOptions)](./docs/flex.md#vstack-options-flexoptions-)
* [center(options?: FlexOptions)](./docs/flex.md#center-options-flexoptions-)
* [flex(options: FlexOptions)](./docs/flex.md#flex-options-flexoptions-)

## [Grid](./docs/grid.md)

Methods for creating and manipulating grid layouts in React components.

Methods:

* [Grid(options: GridOptions)](./docs/grid.md#grid-options-gridoptions-)
* [columns(template: string | number, options?: GridOptions)](./docs/grid.md#columns-template-string-number-options-gridoptions-)
* [rows(template: string | number, options?: GridOptions)](./docs/grid.md#rows-template-string-number-options-gridoptions-)
* [grid(options: GridOptions)](./docs/grid.md#grid-options-gridoptions-)
* [GridOptions](./docs/grid.md#gridoptions)

## [Outline](./docs/outline.md)

Methods for applying outline styles to React components.

Methods:

* [outline(widthOrOptions, options?)](./docs/outline.md#outline-widthoroptions-options-)
* [OutlineOptions](./docs/outline.md#outlineoptions)

## [Responsive](./docs/responsive.md)

Methods for creating responsive and scalable layouts in React components.

```typescript
const ResponsiveBox = View()
  .mobile(style().width('100%').bg('red'))
  .element();
```

Methods:

* [geometry(options: MediaQueryOptions, styles: Chain | CSS)](./docs/responsive.md#geometry-options-mediaqueryoptions-styles-chain-css-)
* [media(breakpoint: string, styles: Chain | CSS)](./docs/responsive.md#media-breakpoint-string-styles-chain-css-)
* [mobile(styles: Chain | CSS)](./docs/responsive.md#mobile-styles-chain-css-)
* [desktop(styles: Chain | CSS)](./docs/responsive.md#desktop-styles-chain-css-)
* [portrait(styles: Chain | CSS)](./docs/responsive.md#portrait-styles-chain-css-)
* [landscape(styles: Chain | CSS)](./docs/responsive.md#landscape-styles-chain-css-)
* [Size Breakpoints](./docs/responsive.md#size-breakpoints)
* [Device Aliases](./docs/responsive.md#device-aliases)
* [Specific Device Aliases](./docs/responsive.md#specific-device-aliases)
* [Orientation Aliases](./docs/responsive.md#orientation-aliases)
* [High-resolution Screens](./docs/responsive.md#high-resolution-screens)

## [Scroll](./docs/scroll.md)

Methods for controlling scrolling behavior and customizing scrollbars in React components.

```typescript
const VerticalScrollableBox = View()
  .scroll({ y: true }) // Enable vertical scrolling
  .size(300)
  .element();
```

Methods:

* [ScrollView(options?: ScrollOptions)](./docs/scroll.md#scrollview-options-scrolloptions-)
* [scroll(options: ScrollOptions)](./docs/scroll.md#scroll-options-scrolloptions-)
* [customScrollbar(options: CustomScrollbarOptions)](./docs/scroll.md#customscrollbar-options-customscrollbaroptions-)
* [overflow(value: boolean | OverflowValue | OverflowOptions)](./docs/scroll.md#overflow-value-boolean-overflowvalue-overflowoptions-)
* [scroll(options: ScrollOptions)](./docs/scroll.md#scroll-options-scrolloptions-)

## [Selectors](./docs/selectors.md)

Methods for applying styles to various element states, pseudo-elements, and custom selectors in React components.

```typescript
const HoverBox = View()
  .bg('blue')
  .onHover(style().bg('darkblue'))
  .element();
```

Methods:

* [onHover(styles: Chain | CSS)](./docs/selectors.md#onhover-styles-chain-css-)
* [onFocus(styles: Chain | CSS)](./docs/selectors.md#onfocus-styles-chain-css-)
* [onActive(styles: Chain | CSS)](./docs/selectors.md#onactive-styles-chain-css-)
* [before(styles: Chain | CSS)](./docs/selectors.md#before-styles-chain-css-)
* [after(styles: Chain | CSS)](./docs/selectors.md#after-styles-chain-css-)
* [attr(styles: Chain | CSS, attributeName: string, options?: AttrSelectorOptions)](./docs/selectors.md#attr-styles-chain-css-attributename-string-options-attrselectoroptions-)

## [Shadow](./docs/shadow.md)

Methods for applying box shadow styles to React components.

```typescript
const LightShadowBox = View()
  .shadow()
  .size(200)
  .element();
```

Methods:

* [shadow(options: ShadowOptions | number)](./docs/shadow.md#shadow-options-shadowoptions-number-)

## [Size](./docs/size.md)

Methods for setting dimensions of React components.

```tsx
import { View } from "tile-css"

const ResponsiveSquare = View()
  .size(600, 300) // width: 600px, height: 300px
  .bg('lightblue')
  .element();

export const SquareDemo = () => <ResponsiveSquare />;
```

Methods:

* [width(width, options?)](./docs/size.md#width-width-options-)
* [height(height, options?)](./docs/size.md#height-height-options-)
* [size(widthOrOptions, heightOrOptions?)](./docs/size.md#size-widthoroptions-heightoroptions-)

## [Spacing](./docs/spacing.md)

Methods for applying spacing styles to React components.

```tsx
import { View } from "tile-css"

const SpacedCard = View()
  .size(200)
  .padding({ x: 20, y: 15 }) // left, right: 20px -- top, bottom: 15px
  .margin(10, { right: 0 }) // 10px around, except right
  .element();

export const CardWithSpacing = ({ children }) => (
  <SpacedCard>{children}</SpacedCard>
);
```

Methods:

* [margin(options: number | string | BoxSides, override?: BoxSides)](./docs/spacing.md#margin-options-number-string-boxsides-override-boxsides-)
* [padding(options: number | string | BoxSides, override?: BoxSides)](./docs/spacing.md#padding-options-number-string-boxsides-override-boxsides-)

## [Text](./docs/text.md)

Methods for applying text styles to React components.

```ts
const Info = View('p')
  .sans(16, {
    color: 'gray.800',
    weight: 500,
    leading: 1.6,
    tracking: '0.5px'
  })
  .element();

export const InfoSection = () => (
  <Info>
    This paragraph demonstrates responsive typography with hover effects.
  </Info>
);
```

Methods:

* [text(sizeOrOptions: string | number | TextOptions, options?: TextOptions)](./docs/text.md#text-sizeoroptions-string-number-textoptions-options-textoptions-)
* [sans(sizeOrOptions: string | number | TextOptions, options?: TextOptions)](./docs/text.md#sans-sizeoroptions-string-number-textoptions-options-textoptions-)
* [mono(sizeOrOptions: string | number | TextOptions, options?: TextOptions)](./docs/text.md#mono-sizeoroptions-string-number-textoptions-options-textoptions-)
* [serif(sizeOrOptions: string | number | TextOptions, options?: TextOptions)](./docs/text.md#serif-sizeoroptions-string-number-textoptions-options-textoptions-)
* [ellipsis()](./docs/text.md#ellipsis-)
* [text(sizeOrOptions: string | number | TextOptions, options?: TextOptions)](./docs/text.md#text-sizeoroptions-string-number-textoptions-options-textoptions-)

## [Transform](./docs/transform.md)

Methods for applying CSS transforms to React components.

```typescript
const Card = View('div')
  .scale(1.5) // zoom in by 1.5
  .rotate(90) // 90deg
  .translate(-25, -10) // x, y
  .element();

export const InteractiveCard = ({ children }) => (
  <Card>{children}</Card>
);
```

Methods:

* [rotate(angle: string | number)](./docs/transform.md#rotate-angle-string-number-)
* [scale(x: number, y?: number)](./docs/transform.md#scale-x-number-y-number-)
* [translate(x: string | number, y?: string | number)](./docs/transform.md#translate-x-string-number-y-string-number-)
* [skew(x: string | number, y?: string | number)](./docs/transform.md#skew-x-string-number-y-string-number-)
* [transform(value: string)](./docs/transform.md#transform-value-string-)
