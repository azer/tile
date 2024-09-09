# Size Module

Methods for setting dimensions of React components.

```tsx
import { View } from "tile-css"

const ResponsiveSquare = View()
  .size(600, 300) // width: 600px, height: 300px
  .bg('lightblue')
  .element();

export const SquareDemo = () => <ResponsiveSquare />;
```

- [Shortcut Methods](#shortcut-methods)
  - [width](#widthwidth-options)
  - [height](#heightheight-options)
- [The `size` method](#sizewidthoroptions-heightoroptions)


## Shortcut Methods

### width(width, options?)

Sets the width of an element.

To create an element 200 pixels wide:

```typescript
const WidthBox = View()
  .width(200)
  .element();
```

With max width:

```typescript
const MaxWidthBox = View()
  .width('100%', { max: 800 }) //  100% wide & no wider than 800 pixels.
  .element();
```

With min width:

```typescript
const MaxWidthBox = View()
  .width('100%', { min: 800 }) //  minWidth: 800px
  .element();
```

### height(height, options?)

Sets the height of an element.

To create an element 150 pixels tall.

```typescript
const HeightBox = View()
  .height(150)
  .element();
```

With max height:

```typescript
const MaxHeightBox = View()
  .height('100vh', { max: 600 }) // height: 100%, maxHeight: 600px
  .element();
```

With min height:

```typescript
const MaxWidthBox = View()
  .height('100%', { min: 600 }) //  height: 100%, minHeight: 600px
  .element();
```

## Core Layout Methods

### size(widthOrOptions, heightOrOptions?)

Sets both width and height of an element.

To create a 100x100 pixel square element;

```typescript
const SquareBox = View()
  .size(100)
  .element();
```

To create a rectangle element 200 px wide and 100 px tall.

```typescript
const RectangleBox = View()
  .size(200, 100)
  .element();
```

Pass more detailed options:

```typescript
const ComplexSizedElement = View()
  .size({
    width: '100%',
    maxWidth: 1200,
    height: 'auto',
    minHeight: 300,
    aspect: 16/9
  })
  .element();
```

This creates an element with full width (max 1200px), auto height (min 300px), and a 16:9 aspect ratio.
