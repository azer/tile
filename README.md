# Tile

Chainable styling library for React.

## Installation

Add `tile` to your project dependencies:

```bash
npm install azer/tile
```

## Usage Example

Create a box with "Hello World" message centered;

```jsx
import { init } from '@azer/tile';
const { Frame } = init();

const TestBox = Frame("90vw", "90vh")
  .color({ bg: "black", fg: "white" })
  .border(10, { color: "blue" })
  .center()
  .element();

export const App = () => {
  return (
    <TestBox>Hello World</TestBox>
  );
};
```

## API

### `init(options?: { tokens, breakpoints })`

```typescript
import { init } from 'tile';

const { View, style, Frame, HStack, ScrollView, VStack } = init();
```

Methods returned:

- `Frame(width?, height?, align?)`: Creates a flexible frame layout. Frames center their content by default.
- `HStack(elementTagOrOptions?, options?)`: Creates a horizontal stack
- `VStack(elementTagOrOptions?, options?)`: Creates a vertical stack
- `View(elementTag?)`: Creates a new styled component
- `style()`: Creates new styling object
- `ScrollView(options?)`: Creates a scrollable view

For custom configuration:

```typescript
const components = init({
  tokens: { colors: { primary: '#007bff' } },
  breakpoints: { tablet: '(min-width: 768px)' }
});
```

Options:
- `tokens`: Custom design tokens
- `breakpoints`: Custom responsive breakpoints

#### Frame(width, height, align)

Creates a flex layout that centers its content by default. Can specify dimensions and alignment.

Example options: `Frame(200, '50%', { x: 'center', y: 'start' })`

```typescript
const CenteredBox = Frame(200, 200).bg('gray').element();
const CustomFrame = Frame('100%', 'auto', { x: 'end' }).maxWidth(500).element();
```

#### HStack(elementTagOrOptions, options)

Creates a horizontal stack. Can specify element tag or box options.

Example options: `HStack('section', { gap: 10, padding: 20 })`

```typescript
const Row = HStack().space({ gap: 10 }).element();
const CustomRow = HStack('section', { padding: 20 }).element();
```

#### VStack(elementTagOrOptions, options)

Creates a vertical stack. Similar options to HStack.

Example options: `VStack({ gap: 15, align: 'center' })`

```typescript
const Column = VStack().align('center').element();
const CustomColumn = VStack({ gap: 15 }).element();
```

#### ScrollView(options)

Creates a scrollable view. Configure scroll behavior for x and y axes.

Example options: `ScrollView({ y: true, x: false })`

```typescript
const Scroll = ScrollView({ y: true }).height(300).element();
```

#### View(elementTag)

Creates a new styled component with given element tag. Optionally specify an HTML tag (default is 'div').

```typescript
const Box = View().bg('red').padding(20).element();
const Paragraph = View('p').color('blue').fontSize(16).element();
```

#### style()

Creates a new Chain instance for a div element.

```typescript
const BlueFont = style().color('blue').fontSize(16);
```


### .align(options)

Aligns items in a flex container.

Options can be:
- A single `StackAlignment` value
- An array of two `StackAlignment` values `[horizontal, vertical]`
- An object with `horizontal`/`x` and `vertical`/`y` properties

`StackAlignment` values:
`'top'`, `'center'`, `'bottom'`, `'left'`, `'right'`, `'start'`, `'end'`, `'leading'`, `'trailing'`

Examples:

```typescript
// Single alignment for both axes
const CenteredBox = View().align('center').element();

// Separate horizontal and vertical alignment
const CustomAligned = View().align(['start', 'center']).element();

// Using object notation
const ComplexAligned = View().align({ x: 'end', y: 'top' }).element();
```

### .aspect(ratio)

Sets the aspect ratio of an element.

Parameters:
- `ratio`: A number representing the desired aspect ratio (width/height).

Examples:

```typescript
// Create a square element
const Square = View().aspect(1).element();

// Create a 16:9 ratio element
const Widescreen = View().aspect(16/9).element();

// Create a 4:3 ratio element
const Standard = View().aspect(4/3).element();
```

### .border(widthOrOptions, options?)

Applies a border to an element.

Parameters:
- `widthOrOptions`: Border width or BorderOptions object
- `options`: Additional BorderOptions (optional)

BorderOptions:
- `width`: number | string | BoxSides
- `style`: 'solid' | 'dashed' | 'dotted' | 'double' | 'none'
- `color`: string
- `radius`: number | string | BoxCorners | BoxSides
- `top`, `right`, `bottom`, `left`: number | string

Examples:

```typescript
// Simple border
const BorderedBox = View().border(1, { color: 'black' }).element();

// Border on top and bottom, no border on sides
View().border({ x: 10, y: 0, color: "black" })

// Complex border: 10px border around, 0px on the right
const ComplexBorder = View()
  .border(10, { right: 0, style: 'dashed', color: 'red', radius: 5 })
  .element();
```

### .stroke(widthOrOptions, options?)

Alias for `border`. Uses the same parameters and options.

### .round(valueOrOptions?, options?)

Applies border radius to an element.

Parameters:
- `valueOrOptions`: Radius value or BoxCorners or BoxSides object
- `options`: Additional BoxCorners (optional)

Examples:

```typescript
// Simple rounded corners
const RoundedBox = View().round(10).element();

// Left corners 10, right corners 5
const RoundedBox = View().round({ left: 10, right: 5 }).element();

// Complex rounded corners: 20px around, 0px right bottom
const ComplexRounded = View()
   .round(20, { bottomRight: 0, })
   .element();
```

### .box(options: BoxOptions)

Apply box model properties. `frame` is an alias for `box`.

BoxOptions:
- `width`, `height`, `maxWidth`, `maxHeight`, `minWidth`, `minHeight`: string | number
- `top`, `right`, `bottom`, `left`, `x`, `y`: string | number
- `position`: "static" | "relative" | "absolute" | "fixed" | "sticky"
- `flexDir`: "row" | "column" | "row-reverse" | "column-reverse"
- `justify`: "start" | "end" | "center" | "between" | "around" | "evenly"
- `items`: "start" | "end" | "center" | "baseline" | "stretch"
- `aspect`: string | number
- `display`: "block" | "inline-block" | "inline" | "flex" | "grid" | "none" | "inline-flex"
- `align`: StackAlignment | [StackAlignment, StackAlignment] | { horizontal?: StackAlignment; vertical?: StackAlignment }
- `placeSelf`, `alignSelf`: string
- `opacity`: number | string
- `zIndex`: number

```typescript
const Box = View().box({ width: 100, height: 100, bg: 'red' }).element();
```

### .frame(options: BoxOptions)

Alias for `box`. Uses the same parameters and options.

### display(display: string, options?: BoxOptions)

Set the display property with additional box options.

```typescript
const FlexBox = View().display('flex', { justifyContent: 'center' }).element();
```

### .position(x, y, options?)

Alias for `absolute`. Uses the same parameters and options.

### absolute(xOrOptions, y?, options?)

Position an element absolutely.

```typescript
View().absolute(10, 20).element();
View().position(10, 20).element();
```

### pin(xOrOptions, y?, options?)

Position an element with fixed positioning.

```typescript
const PinnedBox = View().pin({ right: 20, bottom: 20 }).element();
```

### relative(options: BoxOptions)

Apply relative positioning.

```typescript
View().relative({ top: 10, left: 20 }).element();
```

### opacity(value: number | string)

Set the opacity of an element.

```typescript
View().opacity(0.5).element();
```

### zIndex(value: number)

Set the z-index of an element.

```typescript
const TopLayer = View().zIndex(100).element();
```

### content(value: string)

Set the content property (useful for pseudo-elements).

```typescript
const PseudoElement = View()
  .before(View().content('"→"'))
  .element();
```

### color(options: ColorOptions)

Apply multiple color-related styles at once.

ColorOptions:
- `fg`: Foreground color
- `bg`: Background color or BGOptions
- `border`: Border color
- `caret`: Caret color
- `placeholder`: Placeholder text color
- `selectionBg`: Selection background color
- `selectionFg`: Selection text color
- `outline`: Outline color

```typescript
const ColorfulBox = View()
  .color({
    fg: 'white',
    bg: 'blue',
    border: 'red',
    placeholder: 'lightgray'
  })
  .element();
```

### fg(color: string)

Set the foreground (text) color.

```typescript
const RedText = View().fg('red').element();
```

### bg(options: BGOptions)

Set background styles. `fill` is an alias for `bg`.

BGOptions (string or object):
- `color`: Background color
- `url`: Background image URL.
- `src`: Background image source.
- `size`: 'cover' | 'contain' | 'auto'
- `position`: string | [string, string]
- `repeat`: 'repeat' | 'repeat-x' | 'repeat-y' | 'no-repeat'

```typescript
const BlueBox = View().bg('blue').element();

const BackgroundImage = View()
  .bg({
    url: 'image.jpg',
    size: 'cover',
    position: 'center'
  })
  .element();
```

### fill(options: BGOptions)

Alias for `bg`. Uses the same parameters and options.

### placeholder(color: string)

Set the placeholder text color.

```typescript
const Input = View('input').placeholder('lightgray').element();
```

### selection(bg: string, fg: string)

Set the text selection colors.

```typescript
const SelectableText = View().selection('blue', 'white').element();
```

### .cursor(value: Cursor | CursorOptions)

Set the cursor style for an element.

Parameters:
- `value`: A `Cursor` enum value or `CursorOptions` object

Cursor enum values:
```typescript
Auto, Default, Pointer, Wait, Text, Move, Help, NotAllowed, None, ContextMenu,
Progress, Cell, Crosshair, VerticalText, Alias, Copy, NoDrop, Grab, Grabbing,
AllScroll, ColResize, RowResize, NResize, EResize, SResize, WResize, NEResize,
NWResize, SEResize, SWResize, EWResize, NSResize, NESWResize, NWSEResize,
ZoomIn, ZoomOut
```

CursorOptions:
- `cursor?: Cursor`: A Cursor enum value
- `src?: string`: URL of a custom cursor image (in "url(..)" format)
- `url?: string`: URL of a custom cursor image (will be automatically wrapped in "url(..)")

Examples:

```typescript
// Using Cursor enum
const PointerCursor = View().cursor(Cursor.Pointer).element();

// Using custom cursor image
const CustomCursor = View()
  .cursor({
    src: 'url(path/to/cursor.png)',
    cursor: Cursor.Pointer
  })
  .element();

// Using url option
const AnotherCustomCursor = View()
  .cursor({
    url: 'path/to/cursor.png',
    cursor: Cursor.Auto
  })
  .element();
```

Notes:
- When using a custom cursor image, you can provide a fallback cursor type.
- If no cursor is specified when using a custom image, it defaults to `auto`.
- The `url` option is a convenience method that automatically wraps the provided string in `url(..)`.
- If neither `src`, `url`, nor `cursor` is provided, the cursor will default to `Cursor.Default`.

### flex(options: FlexOptions)

Creates a flex container with customizable properties.

FlexOptions:
- `direction`: "row" | "column" | "row-reverse" | "column-reverse"
- `justify`: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly"
- `items`: "flex-start" | "flex-end" | "center" | "baseline" | "stretch"
- `wrap`: "nowrap" | "wrap" | "wrap-reverse"
- `grow`: number
- `shrink`: number
- `basis`: string | number
- `align`: StackAlignment | [StackAlignment, StackAlignment] | { horizontal?, vertical?, x?, y?: StackAlignment }

```typescript
const FlexContainer = View()
  .flex({
    direction: "row",
    justify: "space-between",
    items: "center",
    wrap: "wrap"
  })
  .element();
```

### hstack(options?: FlexOptions)

Creates a horizontal stack (flex row).

```typescript
const HorizontalStack = View()
  .hstack({
    justify: "space-around",
    items: "center"
  })
  .element();
```

### vstack(options?: FlexOptions)

Creates a vertical stack (flex column).

```typescript
const VerticalStack = View()
  .vstack({
    justify: "flex-start",
    items: "stretch"
  })
  .element();
```

### center(options?: FlexOptions)

Creates a centered flex layout.

```typescript
const CenteredContent = View()
  .center()
  .element();
```

#### outline(widthOrOptions, options?)

Apply outline styles to an element.

Parameters:
- `widthOrOptions`: Width value (number | string) or OutlineOptions object
- `options`: Additional OutlineOptions (optional)

OutlineOptions:
- `width`: number | string
- `color`: string
- `style`: "none" | "hidden" | "dotted" | "dashed" | "solid" | "double" | "groove" | "ridge" | "inset" | "outset"
- `offset`: number | string

Examples:

```typescript
// Simple outline
const SimpleOutline = View().outline(2).element();

// Outline with color and style
const ColoredOutline = View()
  .outline('3px', {
    color: 'red',
    style: 'dashed'
  })
  .element();

// Complex outline
const ComplexOutline = View()
  .outline({
    width: 2,
    color: 'blue',
    style: 'double',
    offset: '1px'
  })
  .element();
```

Notes:
- If only a width is provided, the outline style defaults to "solid".
- The `outline` method can be called with just a width, or with a width and options, or with a single options object.
- When using an options object, any unspecified properties will use their default values or be omitted.
- The `offset` property creates space between the outline and the edge of the element.

Advanced Usage:

```typescript
const FocusableInput = View('input')
  .border(1, { color: 'gray' })
  .outline(0)  // Remove default outline
  .onFocus(style().outline({
    width: 2,
    color: 'blue',
    offset: '2px'
  }))
  .element();
```


### geometry(options: MediaQueryOptions, styles: Chain | CSS)

Applies styles based on specific geometry conditions.

MediaQueryOptions:
- `minWidth`: number | string
- `maxWidth`: number | string
- `minHeight`: number | string
- `maxHeight`: number | string
- `orientation`: 'portrait' | 'landscape'

```typescript
const ResponsiveBox = View()
  .geometry({ maxWidth: 640 }, style().width('100%').bg('red'))
  .element();
```

### media(breakpoint: string, styles: Chain | CSS)

Applies styles for a specific media query or breakpoint.

```typescript
const MediaQueryBox = View().media(
  "$min-xs",
  style().width('50%').bg('blue')
).element();
```

### mobile(styles: Chain | CSS)

Applies styles for mobile devices (max-width: 767px).

```typescript
const MobileStyles = View().mobile(
  style().width('100%').bg('green')
).element();
```

### desktop(styles: Chain | CSS)

Applies styles for desktop devices (min-width: 768px).

```typescript
const DesktopStyles = View().desktop(
  style().width('80%').bg('blue')
).element();
```

### portrait(styles: Chain | CSS)

Applies styles for portrait orientation.

```typescript
const PortraitStyles = View().portrait(
  style().height('100vh')
).element();
```

### landscape(styles: Chain | CSS)

Applies styles for landscape orientation.

```typescript
const LandscapeStyles = View().landscape(
  style().width('100vw')
).element();
```


Advanced Usage:

```typescript
const ComplexResponsive = View()
  .geometry({ minWidth: 768, maxWidth: 1024 },
    style().padding(20).bg('lightblue')
  )
  .mobile(style().fontSize(14).color('darkgray'))
  .desktop(style().fontSize(16).color('black'))
  .portrait(style().height('100vh'))
  .landscape(style().width('100vw'))
  .element();
```

### Default Breakpoints

Tile comes with a set of predefined breakpoints that can be used with the `media` method:

- `max-2xs`: (max-width: 359px)
- `min-2xs`: (min-width: 360px)
- `max-xs`: (max-width: 479px)
- `min-xs`: (min-width: 480px)
- `max-sm`: (max-width: 639px)
- `min-sm`: (min-width: 640px)
- `max-md`: (max-width: 767px)
- `min-md`: (min-width: 768px)
- `max-lg`: (max-width: 1023px)
- `min-lg`: (min-width: 1024px)
- `max-xl`: (max-width: 1279px)
- `min-xl`: (min-width: 1280px)
- `max-2xl`: (max-width: 1535px)
- `min-2xl`: (min-width: 1536px)

Device aliases:
- `mobile`: (max-width: 767px)
- `tablet`: (min-width: 768px) and (max-width: 1023px)
- `desktop`: (min-width: 1024px)

Orientation aliases:
- `portrait`: (orientation: portrait)
- `landscape`: (orientation: landscape)


### scroll(options: ScrollOptions)

Applies scroll styles to an element.

ScrollOptions:
- `x`: boolean - Enable/disable horizontal scrolling
- `y`: boolean - Enable/disable vertical scrolling

```typescript
const HorizontalScroll = View().scroll({ x: true, y: false }).element();
const VerticalScroll = View().scroll({ x: false, y: true }).element();
```

### customScrollbar(options: CustomScrollbarOptions)

Applies custom scrollbar styles to an element.

CustomScrollbarOptions:
- `width`: string - Width of the scrollbar
- `trackBg`: string - Background color of the scrollbar track
- `thumbBg`: string - Background color of the scrollbar thumb
- `darkThumbBg`: string - Background color of the scrollbar thumb in dark mode
- `borderRadius`: string - Border radius of the scrollbar thumb
- `hoverOnly`: boolean - Show scrollbar only on hover

```typescript
const CustomScrollbar = View()
  .customScrollbar({
    width: '8px',
    thumbBg: 'rgba(0,0,0,0.5)',
    trackBg: 'rgba(0,0,0,0.1)',
    borderRadius: '4px',
    hoverOnly: true
  })
  .element();
```

Notes:
- The `scroll` method sets the `overflow` property for the specified axes.
- The `customScrollbar` method applies styles to WebKit scrollbars (`::-webkit-scrollbar`).
- Custom scrollbars are hidden by default and shown on hover.

Advanced Usage:

```typescript
const AdvancedScroll = View()
  .scroll({ x: true, y: true })
  .customScrollbar({
    width: '10px',
    thumbBg: 'rgba(0,0,0,0.3)',
    trackBg: 'rgba(0,0,0,0.05)',
    borderRadius: '5px',
    hoverOnly: true
  })
  .height(300)
  .width('100%')
  .padding(20)
  .element();
```

### Selectors

The selectors module provides methods for applying styles to various element states, pseudo-elements, and custom selectors.

#### onHover(styles: Chain | CSS)

Applies styles when the element is hovered.

```typescript
const HoverBox = View()
  .bg('blue')
  .onHover(style().bg('darkblue').transform('scale(1.1)'))
  .element();
```

#### onFocus(styles: Chain | CSS)

Applies styles when the element is focused.

```typescript
const FocusInput = View('input')
  .border(1, { color: 'gray' })
  .onFocus(style().outline('2px solid blue').borderColor('blue'))
  .element();
```

#### onActive(styles: Chain | CSS)

Applies styles when the element is active (being clicked or tapped).

```typescript
const ActiveButton = View('button')
  .bg('green')
  .onActive(style().bg('darkgreen').transform('translateY(1px)'))
  .element();
```

#### before(styles: Chain | CSS)

Applies styles to the `::before` pseudo-element.

```typescript
const BeforeElement = View()
  .before(style()
    .content('"→"')
    .marginRight(5)
    .color('red')
  )
  .element();
```

#### after(styles: Chain | CSS)

Applies styles to the `::after` pseudo-element.

```typescript
const AfterElement = View()
  .after(style()
    .content('"←"')
    .marginLeft(5)
    .color('blue')
  )
  .element();
```

#### select(selector: string, styles: Chain | CSS)

Applies styles to a custom selector.

```typescript
const CustomSelector = View()
  .select("& > span", style().color('red').fontWeight('bold'))
  .element();
```

Notes:
- All methods accept either a `Chain` or a CSS object for styles.
- The `before` and `after` methods automatically set the `content` property if not specified.
- These methods can be chained with other Tile methods for complex styling.
- Users can pass raw CSS objects directly instead of using the `style()` method if preferred:

Passing raw CSS objects:

```typescript
const RawCSSExample = View()
  .onHover({ backgroundColor: 'blue', transform: 'scale(1.1)' })
  .select("& > p", { color: 'green', fontSize: '16px' })
  .element();
```

Advanced Usage:

```typescript
const ComplexElement = View()
  .bg('white')
  .padding(10)
  .onHover(style().bg('lightgray'))
  .onFocus(style().outline('2px solid blue'))
  .onActive(style().bg('darkgray'))
  .before(style()
    .content('"Start"')
    .color('green')
    .marginRight(5)
  )
  .after(style()
    .content('"End"')
    .color('red')
    .marginLeft(5)
  )
  .select("& > .highlight", style()
    .color('yellow')
    .textDecoration('underline')
  )
  .element();
```

### Spacing

The spacing module provides methods for applying margin, padding, and gap to elements.

Examples:

```typescript
// Single value for all sides
.margin(10)

// Object with specific sides
.padding({ top: 10, left: 20, right: 20, bottom: 30 })

// Using x and y shorthands
.margin({ x: 15, y: 25 })

// Mixing specific sides with shorthands
.padding({ top: 10, x: 20, bottom: 30 })
```

More complex example:

```typescript
const ComplexSpacing = View()
  .space({
    gap: '1rem',
    inner: { x: 20, y: 10 },
    outer: { top: 30, bottom: 15 }
  })
  .margin({ left: 25 }) // This will override the left margin set by space
  .padding({ right: 35 }) // This will override the right padding set by space
  .element();
```

This example demonstrates how to use `space` for overall spacing and then fine-tune specific sides with `margin` and `padding`.

#### space(options: SpacingOptions)

Applies comprehensive spacing styles to an element.

SpacingOptions:
- `gap`: string | number - Sets the gap between flex/grid items
- `inner`: string | number | BoxSides - Sets padding
- `outer`: string | number | BoxSides - Sets margin

```typescript
const SpacedElement = View()
  .space({
    gap: 10,
    inner: 20,
    outer: { top: 30, bottom: 30 }
  })
  .element();
```

#### margin(options: number | string | BoxSides, override?: BoxSides)

Applies margin to an element.

```typescript
const MarginElement = View().margin(20).element();
const ComplexMargin = View().margin({ top: 10, bottom: 20 }, { left: 15 }).element();
```

#### padding(options: number | string | BoxSides, override?: BoxSides)

Applies padding to an element.

```typescript
const PaddedElement = View().padding(15).element();
const ComplexPadding = View().padding({ x: 20, y: 10 }, { top: 25 }).element();
```

Notes:
- `BoxSides` can be specified as `top`, `right`, `bottom`, `left`, or shorthand `x` (for left and right) and `y` (for top and bottom).
- The `override` parameter in `margin` and `padding` allows for fine-tuning specific sides.
- When using `space`, `inner` corresponds to padding and `outer` to margin.

### Text

The text module provides methods for applying various text styles to elements.

#### text(sizeOrOptions: string | number | TextOptions, options?: TextOptions)

Applies general text styles to an element.

TextOptions:
- `color`: string
- `size`: number | string
- `family`: string
- `weight`: number | string
- `tracking`: number | string (letter-spacing)
- `leading`: number | string (line-height)
- `height`: number | string (line-height)
- `lineHeight`: number | string
- `align`: 'left' | 'center' | 'right' | 'justify' | 'start' | 'end'
- `case`: 'upper' | 'lower' | 'capitalize' | 'normal'
- `wrap`: 'wrap' | 'nowrap' | 'pre' | 'pre-line' | 'pre-wrap'
- `whiteSpace`: 'normal' | 'nowrap' | 'pre' | 'pre-line' | 'pre-wrap'
- `cursor`: Cursor
- `decoration`: 'none' | 'underline' | 'line-through' | 'overline'
- `ellipsis`: boolean

```typescript
const StyledText = View().text(16, { color: 'blue', weight: 'bold' }).element();
const ComplexText = View().text({ size: 20, case: 'upper', tracking: '0.05em' }).element();
```

#### sans(sizeOrOptions: string | number | TextOptions, options?: TextOptions)

Applies sans-serif font styles.

```typescript
const SansText = View().sans(18, { weight: 'bold' }).element();
```

#### mono(sizeOrOptions: string | number | TextOptions, options?: TextOptions)

Applies monospace font styles.

```typescript
const MonoText = View().mono(14, { color: 'gray' }).element();
```

#### serif(sizeOrOptions: string | number | TextOptions, options?: TextOptions)

Applies serif font styles.

```typescript
const SerifText = View().serif(22, { align: 'center' }).element();
```

#### ellipsis()

Applies ellipsis text overflow styles.

```typescript
const EllipsisText = View().text(16).ellipsis().element();
```

Notes:
- The `text` method can be called with just a size, or with a size and options, or with a single options object.
- `sans`, `mono`, and `serif` methods set the font family and can be used with the same options as `text`.
- The `ellipsis` method can be used independently or as part of the TextOptions.

Advanced Usage:

```typescript
const ComplexTextElement = View()
  .text({
    size: 16,
    color: 'darkblue',
    weight: 500,
    tracking: '0.02em',
    leading: 1.5,
    case: 'capitalize',
    decoration: 'underline'
  })
  .ellipsis()
  .element();

const ResponsiveText = View()
  .sans(14)
  .mobile(style().text(12))
  .desktop(style().text(16))
  .element();
```

This example demonstrates combining multiple text styling options and using responsive text sizes.

Font Tokens:
- `$sans`: References the default sans-serif font family
- `$mono`: References the default monospace font family
- `$serif`: References the default serif font family

These tokens can be customized during the initialization of Tile to use your preferred font families.

### size(widthOrOptions, heightOrOptions?)

Sets both width and height of an element.

Parameters:
- `widthOrOptions`: string | number | SizeOptions
- `heightOrOptions`: string | number | SizeOptions (optional)

```typescript
const SquareBox = View().size(100).element();
const RectangleBox = View().size(200, 100).element();
const ComplexSize = View().size({ width: '100%', maxWidth: 500, aspect: 16/9 }).element();
```

### width(width, options?)

Sets the width of an element.

Parameters:
- `width`: string | number
- `options`: { max?: number | string } (optional)

```typescript
const WidthBox = View().width(200).element();
const MaxWidthBox = View().width('100%', { max: 800 }).element();
```

### height(height, options?)

Sets the height of an element.

Parameters:
- `height`: string | number
- `options`: { max?: number | string } (optional)

```typescript
const HeightBox = View().height(150).element();
const MaxHeightBox = View().height('100vh', { max: 600 }).element();
```

SizeOptions:
- `width`: string | number
- `height`: string | number
- `minWidth`: string | number
- `minHeight`: string | number
- `maxWidth`: string | number
- `maxHeight`: string | number
- `aspect`: number

Notes:
- All size values can be specified as numbers (interpreted as pixels) or strings (for other units or percentages).
- The `aspect` option sets the aspect ratio of the element.

Advanced Usage:

```typescript
const ComplexSizedElement = View()
  .size({
    width: '100%',
    maxWidth: 1200,
    height: 'auto',
    minHeight: 300,
    aspect: 16/9
  })
  .mobile(style().size({ width: '90%', height: 'auto' }))
  .element();

const ResponsiveWidth = View()
  .width('100%')
  .desktop(style().width(960))
  .element();
```
