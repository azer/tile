# Box Module

Methods for creating and manipulating layout containers. Use these functions to set dimensions, position elements, and control other box model properties in your React components.

- [Factory Functions](#factory-functions)
  - [Frame](#framewidth-height-align)
  - [VStack](#vstackelementtagoroptions-options)
  - [HStack](#hstackelementtagoroptions-options)
- [Shortcut Methods](#shortcut-methods)
  - [frame](#frameoptions-boxoptions)
  - [display](#displaydisplay-string-options-boxoptions)
  - [absolute](#absolutexoroptions-y-options)
  - [position](#positionx-y-options)
  - [pin](#pinxoroptions-y-options)
  - [relative](#relativeoptions-boxoptions)
  - [opacity](#opacityvalue-number--string)
  - [zIndex](#zindexvalue-number)
  - [content](#contentvalue-string)
- [Core Layout Function](#core-layout-function)
  - [box](#boxoptions-boxoptions)

## Factory Functions

Import these functions from "tile" to start your layout chain:

```typescript
import { Frame, VStack, HStack } from "tile";
```

### Frame(width?, height?, align?)

Creates a flexible frame layout that centers its content by default.

```typescript
const CenteredBox = Frame(200, 200).bg('gray').element();
const CustomFrame = Frame('100%', 'auto', { x: 'end' }).maxWidth(500).element();
```

### VStack(elementTagOrOptions?, options?)

Creates a vertically stacked layout.

```typescript
const SimpleVStack = VStack(100, 100).element();
const AspectVStack = VStack(200, { aspect: 1 }).element();
const ComplexVStack = VStack(100, 200, { maxHeight: "100%" }).element();
```

### HStack(elementTagOrOptions?, options?)

Creates a horizontally stacked layout.

```typescript
const SimpleHStack = HStack(100, 100).element();
const MaxWidthHStack = HStack(100, { maxWidth: "500px" }).element();
const ComplexHStack = HStack(200, 200, { maxHeight: "100%" }).element();
```

## Shortcut Methods

### frame(options: BoxOptions)

Alias for `box`, but sets display to 'flex' and centers content by default.

```typescript
const FramedElement = View()
  .frame({
    width: '100%',
    maxWidth: 1200,
    height: 'auto',
    minHeight: 300
  })
  .element();
```

### display(display: string, options?: BoxOptions)

Sets the display property with additional box options.

```typescript
const FlexBox = View()
  .display('flex', { justifyContent: 'center', alignItems: 'center' })
  .element();
```

### absolute(xOrOptions, y?, options?)

Positions an element absolutely.

```typescript
const AbsoluteBox = View()
  .absolute(10, 20)
  .element();

const ComplexAbsolute = View()
  .absolute({ top: '10%', left: '5%', width: 200, height: 100 })
  .element();
```

### position(x, y, options?)

Alias for `absolute`. Uses the same parameters and options.

```typescript
const PositionedBox = View()
  .position(30, 40)
  .element();
```

### pin(xOrOptions, y?, options?)

Positions an element with fixed positioning.

```typescript
const PinnedBox = View()
  .pin({ right: 20, bottom: 20 })
  .element();
```

### relative(options: BoxOptions)

Applies relative positioning.

```typescript
const RelativeBox = View()
  .relative({ top: 10, left: 20 })
  .element();
```

### opacity(value: number | string)

Sets the opacity of an element.

```typescript
const TransparentBox = View()
  .opacity(0.5)
  .element();
```

### zIndex(value: number)

Sets the z-index of an element.

```typescript
const TopLayer = View()
  .zIndex(100)
  .element();
```

### content(value: string)

Sets the content property (useful for pseudo-elements).

```typescript
const PseudoElement = View()
  .before(View().content('"→"'))
  .element();
```

## Core Layout Function

### box(options: BoxOptions)

The `box` function is the primary method for applying comprehensive box styling options. It accepts an object with various properties to control the layout and appearance of the element.

```typescript
const StyledBox = View()
  .box({
    width: 200,
    height: 100,
    maxWidth: '80%',
    minHeight: 50,
    position: 'relative',
    display: 'flex',
    flexDir: 'column',
    justify: 'center',
    items: 'stretch',
    aspect: 16/9
  })
  .element();
```

#### Valid Properties for `box`:

- `width`: Width of the element (string | number)
- `height`: Height of the element (string | number)
- `maxWidth`: Maximum width of the element (string | number)
- `maxHeight`: Maximum height of the element (string | number)
- `minWidth`: Minimum width of the element (string | number)
- `minHeight`: Minimum height of the element (string | number)
- `top`, `right`, `bottom`, `left`: Positioning offsets (string | number)
- `x`, `y`: Shorthand for left/right and top/bottom positioning (string | number)
- `position`: CSS position property ("static" | "relative" | "absolute" | "fixed" | "sticky")
- `flexDir`: Flex direction ("row" | "column" | "row-reverse" | "column-reverse")
- `justify`: Justify content ("start" | "end" | "center" | "between" | "around" | "evenly")
- `items`: Align items ("start" | "end" | "center" | "baseline" | "stretch")
- `aspect`: Aspect ratio (string | number)
- `display`: CSS display property ("block" | "inline-block" | "inline" | "flex" | "grid" | "none" | "inline-flex")
- `align`: Alignment options (StackAlignment | [StackAlignment, StackAlignment] | { horizontal?: StackAlignment; vertical?: StackAlignment })
- `placeSelf`: Place self property (string)
- `alignSelf`: Align self property (string)
- `opacity`: Opacity value (number | string)
- `zIndex`: Z-index value (number)