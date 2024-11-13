# Tile

Chainable styling library for React, built on Stitches.

```ts
interface InitOptions {
  tokens: Tokens
  breakpoints: Record<string, string>
}
```

- [Installation](#installation)
- [Factory Methods](#factory-methods)
  - [View](#view)
  - [Frame](#frame)
  - [HStack](#hstack)
  - [VStack](#vstack)
  - [ScrollView](#scrollview)
  - [Grid](#grid)
  - [style](#style)
- [Initialization](#initialization)

## Installation

```bash
npm install tile-css
```

## Factory Methods

### View
Creates a new chainable element.
```ts
View(elementTag?: string)
```

Basic usage:
```ts
const Box = View()
  .bg('red')
  .padding(20)
  .element()

const Image = View('img')
  .size(200)
  .round('50%')
  .element()
```

### Frame
Creates a centered flex container.

```ts
Frame(
  widthOrBoxOptions?: number | string | BoxOptions,
  heightOrBoxOptions?: number | string | BoxOptions,
  align?: StackAlignment | [StackAlignment, StackAlignment] | {
    horizontal?: StackAlignment
    vertical?: StackAlignment
  }
)
```

Usage:
```ts
// Simple frame
const SimpleFrame = Frame(200, 200)
  .bg('red')
  .element()

// Custom alignment
const AlignedFrame = Frame(200, 200, { x: "center", y: "end" })
  .element()

// With box options
const CustomFrame = Frame(
  { maxWidth: 500, overflow: 'hidden' },
  { aspect: 16/9 }
)
```

### HStack
Creates a horizontal stack layout.
```ts
HStack(
  widthOrOptions?: number | string | BoxOptions,
  heightOrOptions?: number | string | BoxOptions,
  options?: BoxOptions
)
```

Usage:
```ts
const NavBar = HStack()
  .padding(20)
  .space({ gap: 16 })
  .element()

const Gallery = HStack(800, 200, {
  maxWidth: '100%',
  overflow: 'auto'
})
```

### VStack
Creates a vertical stack layout.
```ts
VStack(
  widthOrOptions?: number | string | BoxOptions,
  heightOrOptions?: number | string | BoxOptions,
  options?: BoxOptions
)
```

Usage:
```ts
const Form = VStack()
  .space({ gap: 20 })
  .align({ x: 'center' })
  .element()

const Feed = VStack('100%', {
  minHeight: '100vh',
  gap: 32
})
```

### ScrollView
Creates a scrollable container.
```ts
ScrollView(options: ScrollOptions = { x: true, y: true })
```

Usage:
```ts
const VerticalScroll = ScrollView({ y: true })
  .height(300)
  .padding(20)
  .element()

const HorizontalScroll = ScrollView({ x: true })
  .width(500)
  .element()
```

### Grid
Creates a grid layout.
```ts
Grid(options: GridOptions)
```

Usage:
```ts
const SimpleGrid = Grid({
  columns: 3,
  gap: 10
}).element()

const ComplexGrid = Grid({
  columns: '1fr 2fr 1fr',
  rows: '100px auto'
}).element()
```

### style
Creates a chain for composing styles.
```ts
style(elementTag?: string)
```

Usage:
```ts
const baseButton = style()
  .padding(16)
  .round(8)
  .bg('blue')

const Button = View('button')
  .compose(baseButton)
  .onHover(style().bg('darkblue'))
  .element()
```

## Initialization

You can customize tokens and breakpoints by initializing Tile:

```ts
const { View, HStack, VStack } = init({
  tokens: {
    colors: {
      primary: '#007bff',
      secondary: '#6c757d'
    }
  },
  breakpoints: {
    tablet: '(min-width: 768px)',
    desktop: '(min-width: 1024px)'
  }
})
```
