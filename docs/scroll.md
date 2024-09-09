# Scroll Module

Methods for controlling scrolling behavior and customizing scrollbars in React components.

- [Factory Functions](#factory-functions)
  - [ScrollView](#scrollviewoptions-scrolloptions)
- [Shortcut Methods](#shortcut-methods)
  - [scroll](#scrolloptions-scrolloptions)
  - [customScrollbar](#customscrollbaroptions-customscrollbaroptions)
  - [overflow](#overflowvalue-boolean--overflowvalue--overflowoptions)
- [Core Layout Function](#core-layout-function)
  - [scroll](#scrolloptions-scrolloptions-1)

## Factory Functions

Import this function from "tile" to create a scrollable view:

```typescript
import { ScrollView } from "tile";
```

### ScrollView(options?: ScrollOptions)

Creates a scrollable view with customizable scroll behavior.

```typescript
// Enable only vertical scroll
const VerticalScroll = ScrollView({ y: true })
    .size(300)
    .padding(20)
    .element();

// Or only horizontal
const HorizontalScroll = ScrollView({ x: true })
    .width(500)
    .padding(20)
    .element();
```

## Shortcut Methods

### scroll(options: ScrollOptions)

Applies scroll styles to an element.

```typescript
// Enable scrolling
const ScrollableBox = View()
  .scroll(true)
  .size(300)
  .element();

// Vertical only
const VerticalScrollableBox = View()
  .scroll({ y: true })
  .size(300)
  .element();

// Horizontal only
const HorizontalScrollableBox = View()
  .scroll({ x: true })
  .size(500)
  .element();
```

`ScrollOptions` can be a boolean or an object:
- `boolean`: `true` enables scrolling on both axes, `false` disables it.
- `object`: `{ x?: boolean; y?: boolean }` to control each axis individually.

### customScrollbar(options: CustomScrollbarOptions)

Applies custom scrollbar styles to an element.

```typescript
const CustomScrollbarBox = View()
  .customScrollbar({
    width: '8px',
    thumbBg: 'rgba(0,0,0,0.5)',
    trackBg: 'rgba(0,0,0,0.1)',
    borderRadius: '4px',
    hoverOnly: true
  })
  .height(300)
  .width('100%')
  .padding(20)
  .element();
```

`CustomScrollbarOptions`:
- `width?: string`: Width of the scrollbar
- `trackBg?: string`: Background color of the scrollbar track
- `thumbBg?: string`: Background color of the scrollbar thumb
- `borderRadius?: string`: Border radius of the scrollbar thumb
- `hoverOnly?: boolean`: Show scrollbar only on hover

### overflow(value: boolean | OverflowValue | OverflowOptions)

Controls the overflow behavior of an element.

To hide overflow, simply;

```ts
const HiddenOverflowBox = View()
  .overflow(false)
  .size(200, 200)
  .element();
```

```typescript
const CustomOverflowBox = View()
  .overflow({ x: 'hidden', y: 'scroll' })
  .size(200, 200)
  .element();
```

`OverflowValue`: "visible" | "hidden" | "scroll" | "auto"
`OverflowOptions`: `{ x?: OverflowValue; y?: OverflowValue }`

## Core Layout Function

### scroll(options: ScrollOptions)

The `scroll` function is the primary method for applying scroll styles.

```typescript
const ScrollableContent = View()
  .scroll({
    x: false,
    y: true
  })
  .height(400)
  .width('100%')
  .padding(20)
  .element();
```

This creates a vertically scrollable element with a height of 400px, full width, and 20px padding.