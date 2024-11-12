# Tile Reference

## Init:

```ts
// Ready-to-use Factory Methods (no initialization required)
import { View, Frame, HStack, VStack, Grid, style } from 'tile-css'

View(tag?: str) => Chain               // Create basic component
style(tag?: str) => Chain             // Create reusable styles
Frame(                                // Create centered flex container
  width?: num|str|BoxOptions,
  height?: num|str|BoxOptions,
  align?: StackAlignment|[StackAlignment,StackAlignment]|{x?,y?}
) => Chain
ScrollView(opts?: {x?,y?:bool}) => Chain  // Create scrollable container
VStack(                                   // Create vertical stack
  width?: num|str|BoxOptions,
  height?: num|str|BoxOptions,
  opts?: BoxOptions
) => Chain
HStack(                                   // Create horizontal stack
  width?: num|str|BoxOptions,
  height?: num|str|BoxOptions,
  opts?: BoxOptions
) => Chain
Grid(opts: GridOptions) => Chain         // Create grid container

// Basic Usage
View('button').bg('blue').text('white')
Frame(200, 200).bg('red')
HStack().gap(20).padding(10)
VStack(400).align('center')
Grid({ columns: 3, gap: 10 })

// Optional Custom Instance
// Only needed if you want custom tokens/breakpoints
init(opts?: InitOptions) => { View, Frame, ... }

type InitOptions = {
  tokens?: Tokens          // Custom theme tokens
  breakpoints?: Record<str,str>  // Custom media queries
}

// Custom instance example
const custom = init({
  tokens: { colors: { primary: '#007bff' }},
  breakpoints: { tablet: '(min-width: 768px)' }
})
custom.View('button').bg('$primary')
```

## Accessibility

```
// Accessibility Methods
.selection(opts: SelectionOptions|bool) => Chain // Control text selection behavior and appearance

// Types
type SelectionOptions = {
  bg?: str           // Selection background color
  fg?: str           // Selection text color
  enabled?: bool     // Enable/disable selection
  userSelect?: UserSelectValue // Fine-grained selection control
}

type UserSelectValue = 'none'|'auto'|'text'|'all'|'contain'|'element'|bool

// Usage Examples & Generated CSS
.selection(false) => { userSelect: 'none' }
.selection(true) => { userSelect: 'auto' }
.selection({ bg:'blue', fg:'white' }) => {
  "::selection": {
    backgroundColor: 'blue',
    color: 'white'
  }
}
.selection({ enabled:true }) => { userSelect: 'auto' }
.selection({ userSelect:'text' }) => { userSelect: 'text' }
```

## Alignment

```
// Align Methods
.align(align: StackAlignment|[StackAlignment,StackAlignment]|AlignOptions) => Chain // Control content alignment in flex/grid containers

// Types
type StackAlignment = 'top'|'center'|'bottom'|'left'|'right'|'start'|'end'|'leading'|'trailing'

type AlignOptions = {
  horizontal?: StackAlignment  // x-axis alignment
  vertical?: StackAlignment   // y-axis alignment
  x?: StackAlignment         // alias for horizontal
  y?: StackAlignment         // alias for vertical
}

// Usage Examples & Generated CSS
// For Flex Containers
.align('center') => {
  justifyContent: 'center',
  alignItems: 'center'
}

.align(['start', 'center']) => {
  justifyContent: 'flex-start',
  alignItems: 'center'
}

.align({ x:'left', y:'bottom' }) => {
  justifyContent: 'flex-start',
  alignItems: 'flex-end'
}

// For Grid Containers
// Same API but generates:
.align('center') => {
  justifyContent: 'center',
  alignContent: 'center'
}

/* Alignment Map:
Flex: top/left/start/leading → 'flex-start'
      center → 'center'
      bottom/right/end/trailing → 'flex-end'

Grid: top/left/start/leading → 'start'
      center → 'center'
      bottom/right/end/trailing → 'end'
*/
```

## Aspect

```ts
// Aspect Method
.aspect(ratio: number) => Chain // Set element's aspect ratio (width/height)

// Usage Examples & Generated CSS
.aspect(1) => { aspectRatio: '1' }         // Square
.aspect(16/9) => { aspectRatio: '1.7778' } // Widescreen
.aspect(4/3) => { aspectRatio: '1.3333' }  // Traditionla
```

## Backdrop

```ts
// Backdrop Method
.backdrop(opts?: BackdropOptions) => Chain // Apply backdrop filter effects

// Types
type BackdropOptions = {
  blur?: num|str        // default: 20
  saturate?: num|str    // default: "190%"
  contrast?: num|str    // default: "70%"
  brightness?: num|str  // default: "80%"
}

// Usage Examples & Generated CSS
.backdrop() => {
  backdropFilter: 'blur(20px) saturate(190%) contrast(70%) brightness(80%)'
}

.backdrop({
  blur: 10,
  saturate: "150%",
  contrast: "80%",
  brightness: "90%"
}) => {
  backdropFilter: 'blur(10px) saturate(150%) contrast(80%) brightness(90%)'
}

// Commonly used for frosted glass effects:
.backdrop()
.bg('rgba(255,255,255,0.2)')
.border(1, { color: 'rgba(255,255,255,0.3)' })
```

## border:

```ts
// Border Methods
.border(width: str|num|BorderOptions, opts?: BorderOptions) => Chain  // Set border styles
.stroke(width: str|num|BorderOptions, opts?: BorderOptions) => Chain  // Alias for border
.round(val?: num|str|BoxCorners|BoxSides, opts?: BoxCorners) => Chain // Set border radius

// Types
type BorderOptions = {
  width?: num|str|BoxSides
  style?: 'solid'|'dashed'|'dotted'|'double'|'none'
  color?: str
  radius?: num|str|BoxCorners|BoxSides
  top?: num|str
  right?: num|str
  bottom?: num|str
  left?: num|str
}

type BoxCorners = {
  topLeft?: num|str
  topRight?: num|str
  bottomRight?: num|str
  bottomLeft?: num|str
}

type BoxSides = {x?: num|str, y?: num|str}|[num|str, num|str, num|str, num|str]

// Usage Examples & Generated CSS
.border(1) => {
  borderWidth: '1px',
  borderStyle: 'solid'
}

.border(2, { color: 'red', style: 'dashed' }) => {
  borderWidth: '2px',
  borderStyle: 'dashed',
  borderColor: 'red'
}

.border({
  width: { x: 1, y: 2 },
  color: 'blue'
}) => {
  borderLeftWidth: '1px',
  borderRightWidth: '1px',
  borderTopWidth: '2px',
  borderBottomWidth: '2px',
  borderColor: 'blue',
  borderStyle: 'solid'
}

.round(10) => { borderRadius: '10px' }

.round({ topLeft: 5, bottomRight: 15 }) => {
  borderTopLeftRadius: '5px',
  borderBottomRightRadius: '15px'
}

.round([5,10,15,20]) => {
  borderTopLeftRadius: '5px',
  borderTopRightRadius: '10px',
  borderBottomRightRadius: '15px',
  borderBottomLeftRadius: '20px'
}
```

## box-sides

```ts
// BoxSides Pattern - Used by border, padding, margin, etc
// Multiple ways to specify values for box sides/corners

// Types
type BoxSides = {
  top?: num|str
  right?: num|str
  bottom?: num|str
  left?: num|str
  x?: num|str    // applies to left & right
  y?: num|str    // applies to top & bottom
} | [top:num|str, right:num|str, bottom:num|str, left:num|str]

type BoxCorners = {
  topLeft?: num|str
  topRight?: num|str
  bottomRight?: num|str
  bottomLeft?: num|str
} | [topLeft:num|str, topRight:num|str, bottomRight:num|str, bottomLeft:num|str]

// Usage Examples
// These patterns work with padding(), margin(), border(), round() etc:

// Single value for all sides
.padding(10)                    => { padding: '10px' }

// Array syntax (clockwise from top)
.margin([10, 20, 10, 20])      => { marginTop: '10px', marginRight: '20px', marginBottom: '10px', marginLeft: '20px' }

// Object syntax with individual sides
.border({ top: 1, bottom: 2 }) => { borderTop: '1px', borderBottom: '2px' }

// Shorthand x/y syntax
.padding({ x: 20, y: 10 })     => { paddingLeft: '20px', paddingRight: '20px', paddingTop: '10px', paddingBottom: '10px' }

// Corner values for border-radius
.round({ topLeft: 5, bottomRight: 10 }) => { borderTopLeftRadius: '5px', borderBottomRightRadius: '10px' }
```

## box

```ts
// Box Methods - Core layout control
.box(opts: BoxOptions) => Chain                            // Apply box model properties
.frame(opts: BoxOptions) => Chain                          // Centered flex container (default: display:flex, justify/items:center)
.display(disp: str, opts?: BoxOptions) => Chain            // Set display property with options
.absolute(x: str|num|BoxOptions, y?: str|num) => Chain     // Absolute positioning
.position(x: str|num, y?: str|num) => Chain                // Alias for absolute
.pin(x: str|num|BoxOptions, y?: str|num) => Chain          // Fixed positioning
.relative(opts: BoxOptions) => Chain                       // Relative positioning
.opacity(val: num|str) => Chain                            // Set opacity
.zIndex(val: num) => Chain                                 // Set z-index

// Types
type BoxOptions = {
  width?: str|num
  height?: str|num
  maxWidth?: str|num
  maxHeight?: str|num
  minWidth?: str|num
  minHeight?: str|num
  top?: str|num
  right?: str|num
  bottom?: str|num
  left?: str|num
  x?: str|num         // shorthand for left
  y?: str|num         // shorthand for top
  position?: "static"|"relative"|"absolute"|"fixed"|"sticky"
  flexDir?: "row"|"column"|"row-reverse"|"column-reverse"
  justify?: "start"|"end"|"center"|"between"|"around"|"evenly"
  items?: "start"|"end"|"center"|"baseline"|"stretch"
  aspect?: str|num
  display?: "block"|"inline-block"|"inline"|"flex"|"grid"|"none"|"inline-flex"
  align?: StackAlignment|[StackAlignment,StackAlignment]|{horizontal?,vertical?}
  placeSelf?: str
  alignSelf?: str
  opacity?: num|str
  zIndex?: num
}

// Usage Examples & Generated CSS
.box({ width: 100, height: 100 }) => {
  width: '100px',
  height: '100px'
}

.frame() => {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

.absolute(10, 20) => {
  position: 'absolute',
  left: '10px',
  top: '20px'
}

.pin({ right: 0, top: 0 }) => {
  position: 'fixed',
  right: '0px',
  top: '0px'
}

.relative({ top: 10 }) => {
  position: 'relative',
  top: '10px'
}

.display('grid', { gap: 20 }) => {
  display: 'grid',
  gap: '20px'
}
```


## breakpoints.ts

```ts
// Size Breakpoints (min/max width)
max-2xs: '(max-width: 359px)'   // Tiny screens max
min-2xs: '(min-width: 360px)'   // Tiny screens min
max-xs: '(max-width: 479px)'    // Extra small max
min-xs: '(min-width: 480px)'    // Extra small min
max-sm: '(max-width: 639px)'    // Small max
min-sm: '(min-width: 640px)'    // Small min
max-md: '(max-width: 767px)'    // Medium max
min-md: '(min-width: 768px)'    // Medium min
max-lg: '(max-width: 1023px)'   // Large max
min-lg: '(min-width: 1024px)'   // Large min
max-xl: '(max-width: 1279px)'   // Extra large max
min-xl: '(min-width: 1280px)'   // Extra large min
max-2xl: '(max-width: 1535px)'  // 2X large max
min-2xl: '(min-width: 1536px)'  // 2X large min

// Device Shortcuts
mobile: '(max-width: 767px)'
tablet: '(min-width: 768px) and (max-width: 1023px)'
desktop: '(min-width: 1024px)'

// Specific Devices
iphone-se: '(max-width: 375px)'
iphone: '(max-width: 428px)'
ipad: '(min-width: 768px) and (max-width: 1024px)'
ipad-pro: '(min-width: 1024px) and (max-width: 1366px)'

// Orientation
portrait: '(orientation: portrait)'
landscape: '(orientation: landscape)'

// High DPI
retina: '(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)'

// Usage Examples with media() method:
.media(breakpoints.mobile, style().width('100%'))
.media(breakpoints.tablet, style().maxWidth(800))
.media(breakpoints.portrait, style().height('100vh'))
```

chaining:

```ts
// Core Chain Methods - Available on all Tile components
.extend() => Chain                      // Create copy of current style chain
.compile() => CSS                       // Convert chain to CSS object
.select(selector: str, styles: Chain) => Chain   // Apply styles to child selector
.variant(name: str, val: str|num|bool, styles: Chain) => Chain  // Create variant styles
.element() => ReactComponent            // Convert chain to React component
.css(styles: CSS) => Chain             // Apply raw CSS object

// Method Chaining
View()
  .bg('blue')           // Each method returns the chain
  .padding(20)          // allowing multiple styles
  .onHover(             // to be chained together
    style()
      .bg('darkblue')
  )
  .select('p',          // Apply styles to child elements
    style()
      .color('white')
  )
  .variant('size',      // Create variants
    'large',
    style().padding(40)
  )
  .element()           // Finally create the component
```


## colors.ts

```ts
// Color Methods
.color(opts: ColorOptions) => Chain     // Set multiple color properties
.fg(color: str) => Chain               // Set text color
.bg(opts: BGOptions|str) => Chain      // Set background color/image
.placeholder(color: str) => Chain      // Set placeholder text color
.fill(opts: BGOptions|str) => Chain    // Alias for bg()

// Types
type ColorOptions = {
  fg?: str                         // Text color
  bg?: str|BGOptions              // Background
  border?: str                    // Border color
  caret?: str                     // Cursor color
  placeholder?: str               // Placeholder color
  selectionBg?: str              // Selected text bg
  selectionFg?: str              // Selected text color
  outline?: str                   // Outline color
}

type BGOptions = {
  color?: str
  url?: str                      // Background image URL
  src?: str                      // Raw background value
  base64?: str                   // Base64 encoded image
  size?: "cover"|"contain"|"auto"
  position?: str|[str,str]       // Background position
  repeat?: "repeat"|"repeat-x"|"repeat-y"|"no-repeat"
} | str                          // Or just color string

// Usage Examples & Generated CSS
.color({ fg: 'white', bg: 'blue' }) => {
  color: 'white',
  backgroundColor: 'blue'
}

.fg('red') => { color: 'red' }

.bg('blue') => { backgroundColor: 'blue' }

.bg({
  url: 'img.jpg',
  size: 'cover',
  position: 'center'
}) => {
  backgroundImage: 'url(img.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center'
}

.placeholder('gray') => {
  "&::placeholder": { color: 'gray' }
}
```

## cursor

```ts
// Cursor Methods
.cursor(val: Cursor|CursorOptions) => Chain // Set cursor style

// Types
enum Cursor {
  Auto = 'auto'
  Default = 'default'
  Pointer = 'pointer'
  Wait = 'wait'
  Text = 'text'
  Move = 'move'
  Help = 'help'
  NotAllowed = 'not-allowed'
  None = 'none'
  ContextMenu = 'context-menu'
  Progress = 'progress'
  Cell = 'cell'
  Crosshair = 'crosshair'
  VerticalText = 'vertical-text'
  Alias = 'alias'
  Copy = 'copy'
  NoDrop = 'no-drop'
  Grab = 'grab'
  Grabbing = 'grabbing'
  AllScroll = 'all-scroll'
  ColResize = 'col-resize'
  RowResize = 'row-resize'
  NResize = 'n-resize'
  // ... directional resize cursors
  ZoomIn = 'zoom-in'
  ZoomOut = 'zoom-out'
}

type CursorOptions = {
  cursor?: Cursor    // Cursor type
  src?: string      // Custom cursor image (url() format)
  url?: string      // Custom cursor URL (auto-wrapped in url())
}

// Usage Examples & Generated CSS
.cursor(Cursor.Pointer) => {
  cursor: 'pointer'
}

.cursor({
  url: 'cursor.png',
  cursor: Cursor.Auto
}) => {
  cursor: 'url(cursor.png), auto'
}

.cursor({
  src: 'url(cursor.png)',
  cursor: Cursor.Pointer
}) => {
  cursor: 'url(cursor.png), pointer'
}
```

## flex

```
// Flex Methods
.flex(opts?: FlexOptions) => Chain       // Create flex container with options
.hstack(opts?: FlexOptions) => Chain    // Horizontal flex container (row)
.vstack(opts?: FlexOptions) => Chain    // Vertical flex container (column)
.center(opts?: FlexOptions) => Chain    // Centered flex container

// Types
type FlexOptions = {
  direction?: "row"|"column"|"row-reverse"|"column-reverse"
  justify?: "flex-start"|"flex-end"|"center"|"space-between"|"space-around"|"space-evenly"
  items?: "flex-start"|"flex-end"|"center"|"baseline"|"stretch"
  wrap?: "nowrap"|"wrap"|"wrap-reverse"
  grow?: number          // flex-grow
  shrink?: number        // flex-shrink
  basis?: string|number  // flex-basis
  align?: StackAlignment|[StackAlignment,StackAlignment]|{
    horizontal?: StackAlignment
    vertical?: StackAlignment
    x?: StackAlignment
    y?: StackAlignment
  }
}

// Usage Examples & Generated CSS
.flex() => {
  display: "flex"
}

.flex({
  direction: "row",
  justify: "space-between",
  items: "center"
}) => {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center"
}

.hstack() => {
  display: "flex",
  flexDirection: "row"
}

.vstack() => {
  display: "flex",
  flexDirection: "column"
}

.center() => {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center"
}

// Common Patterns
.hstack().items("center")        // Centered row
.vstack().justify("space-between") // Spaced column
.center().wrap("wrap")           // Centered wrapping container
```

## grid

```
// Grid Methods
.grid(opts: GridOptions) => Chain                       // Create CSS Grid container
.columns(template: str|num, opts?: GridOptions) => Chain // Grid with column template
.rows(template: str|num, opts?: GridOptions) => Chain    // Grid with row template

// Types
type GridOptions = {
  gap?: str|num
  columnGap?: str|num
  rowGap?: str|num
  autoFlow?: "row"|"column"|"dense"|"row dense"|"column dense"
  autoColumns?: str
  autoRows?: str
  columns?: str
  rows?: str
  templateAreas?: str
  alignContent?: "start"|"end"|"center"|"stretch"|"space-around"|"space-between"|"space-evenly"
  justifyContent?: "start"|"end"|"center"|"stretch"|"space-around"|"space-between"|"space-evenly"
  alignItems?: "start"|"end"|"center"|"stretch"|"baseline"
  justifyItems?: "start"|"end"|"center"|"stretch"
  align?: StackAlignment|[StackAlignment,StackAlignment]|{x?,y?}
}

// Usage Examples & Generated CSS
.grid({
  columns: "repeat(3, 1fr)",
  gap: 20
}) => {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "20px"
}

// Shorthand for column templates
.columns(3) => {                     // number = equal columns
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)"
}

.columns("1fr 2fr 1fr") => {        // string = custom template
  display: "grid",
  gridTemplateColumns: "1fr 2fr 1fr"
}

// Row templates
.rows(3) => {                       // number = equal rows
  display: "grid",
  gridTemplateRows: "repeat(3, 1fr)"
}

.rows("auto 1fr auto") => {         // string = custom template
  display: "grid",
  gridTemplateRows: "auto 1fr auto"
}

// Common Patterns
.grid({                             // Named grid areas
  templateAreas: `
    "header header"
    "nav main"
    "footer footer"
  `,
  columns: "200px 1fr"
})

.grid({                             // Responsive grid
  columns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: 20
})
```

## outline

```
// Outline Method
.outline(width: str|num|OutlineOptions, opts?: OutlineOptions) => Chain // Set outline styles

// Types
type OutlineOptions = {
  width?: num|str
  color?: str
  style?: "none"|"hidden"|"dotted"|"dashed"|"solid"|"double"|"groove"|"ridge"|"inset"|"outset"
  offset?: num|str
}

// Usage Examples & Generated CSS
.outline(2) => {
  outlineWidth: '2px',
  outlineStyle: 'solid'
}

.outline('3px', {
  color: 'red',
  style: 'dashed'
}) => {
  outlineWidth: '3px',
  outlineColor: 'red',
  outlineStyle: 'dashed'
}

.outline({
  width: 2,
  color: 'blue',
  offset: '1px',
  style: 'groove'
}) => {
  outlineWidth: '2px',
  outlineColor: 'blue',
  outlineStyle: 'groove',
  outlineOffset: '1px'
}
```

## responsive

```
// Responsive Methods
.geometry(opts: MediaQueryOptions, styles: Chain|CSS) => Chain // Custom media query
.media(breakpoint: str, styles: Chain|CSS) => Chain           // Use predefined breakpoint
.mobile(styles: Chain|CSS) => Chain                         // Mobile styles (<768px)
.desktop(styles: Chain|CSS) => Chain                        // Desktop styles (≥768px)
.portrait(styles: Chain|CSS) => Chain                       // Portrait orientation
.landscape(styles: Chain|CSS) => Chain                      // Landscape orientation

// Types
type MediaQueryOptions = {
  minWidth?: num|str
  maxWidth?: num|str
  minHeight?: num|str
  maxHeight?: num|str
  orientation?: 'portrait'|'landscape'
}

// Usage Examples & Generated CSS
.geometry({
  maxWidth: 640
}, style().width('100%')) => {
  '@media (max-width: 640px)': {
    width: '100%'
  }
}

.media(breakpoints.tablet,
  style().padding(20)
) => {
  '@media (min-width: 768px) and (max-width: 1023px)': {
    padding: '20px'
  }
}

.mobile(
  style().width('100%')
) => {
  '@media (max-width: 767px)': {
    width: '100%'
  }
}

.desktop(
  style().maxWidth(1200)
) => {
  '@media (min-width: 768px)': {
    maxWidth: '1200px'
  }
}

.portrait(
  style().height('100vh')
) => {
  '@media (orientation: portrait)': {
    height: '100vh'
  }
}

// Common Patterns
.mobile(style().padding(10))           // Mobile-specific padding
.desktop(style().width('80%'))         // Desktop width
.portrait(style().flexDir('column'))   // Stack vertically in portrait
```

## scroll

```
// Scroll Methods
.scroll(opts: ScrollOptions) => Chain           // Control scrolling behavior
.customScrollbar(opts: CustomScrollbarOptions) => Chain  // Style custom scrollbar
.overflow(val: bool|OverflowValue|OverflowOptions) => Chain // Set overflow behavior

// Types
type ScrollOptions = {
  x?: bool  // Enable horizontal scroll
  y?: bool  // Enable vertical scroll
} | bool    // Enable/disable both

type CustomScrollbarOptions = {
  width?: str         // Scrollbar width (default: "5px")
  trackBg?: str       // Track background color
  thumbBg?: str       // Thumb background color (default: rgba(59,63,67))
  borderRadius?: str  // Corner radius (default: "10px")
  hoverOnly?: bool    // Show only on hover
}

type OverflowValue = "visible"|"hidden"|"scroll"|"auto"
type OverflowOptions = {
  x?: OverflowValue
  y?: OverflowValue
}

// Usage Examples & Generated CSS
.scroll({ x: true, y: false }) => {
  overflowX: 'scroll',
  overflowY: 'hidden'
}

.customScrollbar({
  width: '8px',
  thumbBg: 'rgba(0,0,0,0.5)',
  trackBg: 'rgba(0,0,0,0.1)',
  borderRadius: '4px',
  hoverOnly: true
}) => {
  "&::-webkit-scrollbar": { width: '8px', /*...*/ },
  "&::-webkit-scrollbar-track": { background: 'rgba(0,0,0,0.1)' },
  "&::-webkit-scrollbar-thumb": {
    background: 'rgba(0,0,0,0.5)',
    borderRadius: '4px'
  },
  "&:not(:hover)": {
    "&::-webkit-scrollbar-thumb": { background: 'transparent' }
  }
}

.overflow("hidden") => { overflow: 'hidden' }
.overflow({ x: "auto", y: "scroll" }) => {
  overflowX: 'auto',
  overflowY: 'scroll'
}

// Common Patterns
.scroll({ y: true })              // Vertical scrolling only
.overflow(false)                  // Hide overflow
.customScrollbar({ hoverOnly: true }) // Show scrollbar on hover
```

## selector

```ts
// Selector Methods
.onHover(styles: Chain|CSS) => Chain    // Apply styles on hover
.onFocus(styles: Chain|CSS) => Chain    // Apply styles on focus
.onActive(styles: Chain|CSS) => Chain   // Apply styles on active/press
.before(styles: Chain|CSS) => Chain     // Style ::before pseudo-element
.after(styles: Chain|CSS) => Chain      // Style ::after pseudo-element
.attr(                                  // Style based on attributes
  attrName: str,
  opts?: AttrSelectorOptions,
  styles: Chain|CSS
) => Chain

// Types
type AttrSelectorOptions = {
  eq?: str          // [attr="val"]
  contains?: str    // [attr*="val"]
  startsWith?: str  // [attr^="val"]
  endsWith?: str    // [attr$="val"]
  includes?: str    // [attr~="val"]
  dashMatch?: str   // [attr|="val"]
  caseSensitive?: bool
}

// Usage Examples & Generated CSS
.onHover(
  style().bg('blue')
) => {
  '&:hover': {
    backgroundColor: 'blue'
  }
}

.onFocus(
  style().outline('2px solid blue')
) => {
  '&:focus': {
    outline: '2px solid blue'
  }
}

.before(
  style()
    .content('"→"')
    .margin({ right: 5 })
) => {
  '&::before': {
    content: '"→"',
    marginRight: '5px'
  }
}

.attr('title',
  { contains: 'hello' },
  style().color('blue')
) => {
  '&[title*="hello"]': {
    color: 'blue'
  }
}

// Common Patterns
.onHover(style().opacity(0.8))         // Hover opacity
.before(style().content('"*"'))        // Add required field marker
.attr('disabled', style().opacity(0.5)) // Style disabled elements
```

## shadow

```
// Shadow Methods
.shadow(opts?: ShadowOptions|num) => Chain     // Apply box shadow
.textShadow(opts?: TextShadowOptions|num) => Chain  // Apply text shadow

// Types
type ShadowOptions = {
  x?: num|str      // default: 0
  y?: num|str      // default: 4
  blur?: num|str   // default: 4
  spread?: num|str // default: 0
  color?: str      // default: rgba(0,0,0,0.25)
  inset?: bool     // default: false
}

type TextShadowOptions = {
  x?: num|str     // default: 1
  y?: num|str     // default: 1
  blur?: num|str  // default: 2
  color?: str     // default: rgba(0,0,0,0.25)
}

// Usage Examples & Generated CSS
// Default shadow
.shadow() => {
  boxShadow: '0 4px 4px 0 rgba(0,0,0,0.25)'
}

// Opacity shorthand
.shadow(0.5) => {
  boxShadow: '0 4px 4px 0 rgba(0,0,0,0.5)'
}

// Custom shadow
.shadow({
  x: 5,
  y: 5,
  blur: 10,
  spread: 2,
  color: 'rgba(0,0,0,0.2)',
  inset: true
}) => {
  boxShadow: 'inset 5px 5px 10px 2px rgba(0,0,0,0.2)'
}

// Default text shadow
.textShadow() => {
  textShadow: '1px 1px 2px rgba(0,0,0,0.25)'
}

// Text shadow opacity
.textShadow(0.5) => {
  textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
}

// Custom text shadow
.textShadow({
  x: 2,
  y: 2,
  blur: 4,
  color: 'blue'
}) => {
  textShadow: '2px 2px 4px blue'
}

// Common Patterns
.shadow()                     // Default elevation
.shadow({ y: 8, blur: 16 })  // Larger elevation
.textShadow({ color: '#fff' }) // Light text on dark bg
```

## size

```ts
// Size Methods
.size(width: str|num|SizeOptions, height?: str|num|SizeOptions) => Chain // Set width & height
.width(w: str|num, opts?: {max?: num|str, min?: num|str}) => Chain      // Set width + constraints
.height(h: str|num, opts?: {max?: num|str, min?: num|str}) => Chain     // Set height + constraints

// Types
type SizeOptions = {
  width?: str|num
  height?: str|num
  minWidth?: str|num
  minHeight?: str|num
  maxWidth?: str|num
  maxHeight?: str|num
  aspect?: num
}

// Usage Examples & Generated CSS
// Basic sizes
.size(100) => {        // Square
  width: '100px',
  height: '100px'
}

.size(200, 100) => {   // Rectangle
  width: '200px',
  height: '100px'
}

.size({               // With options
  width: '100%',
  maxWidth: 1200,
  height: 'auto',
  minHeight: 300,
  aspect: 16/9
}) => {
  width: '100%',
  maxWidth: '1200px',
  height: 'auto',
  minHeight: '300px',
  aspectRatio: '1.7778'
}

// Individual dimensions
.width('100%', {
  max: 800,
  min: 320
}) => {
  width: '100%',
  maxWidth: '800px',
  minWidth: '320px'
}

.height(300, {
  max: 600
}) => {
  height: '300px',
  maxHeight: '600px'
}

// Common Patterns
.size('100%', 'auto')     // Responsive width, auto height
.width('100%', {max:1200}) // Constrained responsive width
.height('100vh')          // Full viewport height
```

## spacing:

```ts
// Spacing Methods
.space(opts: SpacingOptions) => Chain    // Set gap, padding, margin together
.margin(val: num|str|BoxSides, override?: BoxSides) => Chain  // Set margin
.padding(val: num|str|BoxSides, override?: BoxSides) => Chain // Set padding

// Types
type SpacingOptions = {
  gap?: str|num             // Gap between flex/grid items
  inner?: str|num|BoxSides  // Padding
  outer?: str|num|BoxSides  // Margin
}

type BoxSides = {
  top?: num|str
  right?: num|str
  bottom?: num|str
  left?: num|str
  x?: num|str        // left & right
  y?: num|str        // top & bottom
} | [top:num|str, right:num|str, bottom:num|str, left:num|str]

// Usage Examples & Generated CSS
// Combined spacing
.space({
  gap: 20,
  inner: 10,
  outer: 30
}) => {
  gap: '20px',
  padding: '10px',
  margin: '30px'
}

// Margin variations
.margin(10) => {
  margin: '10px'
}

.margin({ x: 20, y: 10 }) => {
  marginLeft: '20px',
  marginRight: '20px',
  marginTop: '10px',
  marginBottom: '10px'
}

.margin([10,20,10,20]) => {
  marginTop: '10px',
  marginRight: '20px',
  marginBottom: '10px',
  marginLeft: '20px'
}

.margin(20, { right: 0 }) => {
  marginTop: '20px',
  marginBottom: '20px',
  marginLeft: '20px',
  marginRight: '0px'
}

// Padding variations
.padding(10) => {
  padding: '10px'
}

.padding({ x: 20, y: 10 }) => {
  paddingLeft: '20px',
  paddingRight: '20px',
  paddingTop: '10px',
  paddingBottom: '10px'
}

// Common Patterns
.space({ gap: 20 })           // Grid/flex gap only
.padding({ x: 20 })          // Horizontal padding
.margin({ y: 'auto' })       // Center horizontally
```

## text

```
// Text Methods
.text(size: str|num|TextOptions, opts?: TextOptions) => Chain  // General text styles
.sans(size: str|num|TextOptions, opts?: TextOptions) => Chain  // Sans-serif font
.mono(size: str|num|TextOptions, opts?: TextOptions) => Chain  // Monospace font
.serif(size: str|num|TextOptions, opts?: TextOptions) => Chain // Serif font
.ellipsis() => Chain                                         // Truncate with ...

// Types
type TextOptions = {
  color?: str
  size?: num|str
  family?: str
  weight?: num|str
  tracking?: num|str      // letter-spacing
  leading?: num|str      // line-height
  height?: num|str       // line-height alias
  lineHeight?: num|str   // line-height alias
  align?: "left"|"center"|"right"|"justify"|"start"|"end"
  case?: "upper"|"lower"|"capitalize"|"normal"
  wrap?: "wrap"|"nowrap"|"pre"|"pre-line"|"pre-wrap"
  whiteSpace?: "normal"|"nowrap"|"pre"|"pre-line"|"pre-wrap"
  cursor?: Cursor
  decoration?: "none"|"underline"|"line-through"|"overline"
  ellipsis?: bool
  shadow?: TextShadowOptions|num
}

// Usage Examples & Generated CSS
// Basic usage
.text(16) => {
  fontSize: '16px'
}

.text(16, {
  color: 'red',
  weight: 'bold'
}) => {
  fontSize: '16px',
  color: 'red',
  fontWeight: 'bold'
}

// Font families
.sans(16) => {
  fontSize: '16px',
  fontFamily: '$sans'
}

.mono(14) => {
  fontSize: '14px',
  fontFamily: '$mono'
}

.serif(20) => {
  fontSize: '20px',
  fontFamily: '$serif'
}

// Complex styling
.text({
  size: 16,
  color: '#333',
  weight: 500,
  tracking: 0.5,
  leading: 1.5,
  case: 'upper',
  align: 'center',
  decoration: 'underline',
  shadow: { x: 1, y: 1, blur: 2 }
}) => {
  fontSize: '16px',
  color: '#333',
  fontWeight: 500,
  letterSpacing: '0.5px',
  lineHeight: 1.5,
  textTransform: 'uppercase',
  textAlign: 'center',
  textDecoration: 'underline',
  textShadow: '1px 1px 2px'
}

// Truncation
.ellipsis() => {
  overflowX: 'hidden',
  overflowY: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis'
}

// Common Patterns
.sans(16, { weight: 500 })    // Medium sans-serif
.mono(14).ellipsis()          // Truncated code
.text({ case: 'upper' })      // All caps
```

tokens

```ts
// Default Theme Tokens - Available out of the box

// Font Sizes
$xs: '0.75rem'     // 12px
$sm: '0.875rem'    // 14px
$base: '1rem'      // 16px
$lg: '1.125rem'    // 18px
$xl: '1.25rem'     // 20px
$2xl: '1.5rem'     // 24px
$3xl: '1.875rem'   // 30px
$4xl: '2.25rem'    // 36px
$5xl: '3rem'       // 48px
$6xl: '3.75rem'    // 60px
$7xl: '4.5rem'     // 72px
$8xl: '6rem'       // 96px
$9xl: '8rem'       // 128px

// Font Families
$sans: "Inter", ui-sans-serif, system-ui...
$serif: ui-serif, Georgia, Cambria...
$mono: "Berkeley Mono", ui-monospace...

// Font Weights
$thin: 100
$extralight: 200
$light: 300
$normal: 400
$medium: 500
$semibold: 600
$bold: 700
$extrabold: 800
$black: 900

// Line Heights
$3: '0.75rem'      // 12px
$4: '1rem'         // 16px
$5: '1.25rem'      // 20px
$6: '1.5rem'       // 24px
$7: '1.75rem'      // 28px
$8: '2rem'         // 32px
$9: '2.25rem'      // 36px
$10: '2.5rem'      // 40px
$none: '1'
$tight: '1.25'
$snug: '1.375'
$normal: '1.5'
$relaxed: '1.625'
$loose: '2'

// Letter Spacing
$tighter: '-0.05em'
$tight: '-0.025em'
$normal: '0em'
$wide: '0.025em'
$wider: '0.05em'
$widest: '0.1em'

// Border Radius
$sm: '0.25rem'     // 4px
$md: '0.375rem'    // 6px
$lg: '0.5rem'      // 8px
$xl: '0.75rem'     // 12px
$2xl: '1rem'       // 16px
$3xl: '1.5rem'     // 24px
$full: '9999px'

// Z-Index
$0: '0'
$10: '10'
$20: '20'
$30: '30'
$40: '40'
$50: '50'

// Usage Examples
.text({
  size: '$lg',         // 18px
  weight: '$medium',   // 500
  leading: '$normal'   // 1.5
})

.round('$lg')         // 8px border radius

// Also includes all Tailwind colors
// See lib/themes/tailwind.ts for color reference
```


## transform

```
// Transform Methods
.transform(value: str) => Chain                          // Apply raw transform
.rotate(angle: str|num) => Chain                        // Rotate element (num=deg)
.scale(x: num, y?: num) => Chain                        // Scale element
.translate(x: str|num, y?: str|num) => Chain            // Move element
.skew(x: str|num, y?: str|num) => Chain                // Skew element
.perspective(value: str|num) => Chain                   // Add perspective transform

// Usage Examples & Generated CSS
// Raw transform
.transform('rotate(45deg) scale(1.5)') => {
  transform: 'rotate(45deg) scale(1.5)'
}

// Rotate
.rotate(45)     => { transform: 'rotate(45deg)' }
.rotate('90deg') => { transform: 'rotate(90deg)' }

// Scale
.scale(2)       => { transform: 'scale(2)' }
.scale(2, 0.5)  => { transform: 'scale(2, 0.5)' }

// Translate
.translate(10)           => { transform: 'translate(10px)' }
.translate('2rem','1rem') => { transform: 'translate(2rem, 1rem)' }
.translate(10, 20)       => { transform: 'translate(10px, 20px)' }

// Skew
.skew(10)              => { transform: 'skew(10deg)' }
.skew('45deg','30deg') => { transform: 'skew(45deg, 30deg)' }
.skew(45, 30)         => { transform: 'skew(45deg, 30deg)' }

// Perspective
.perspective(1000)      => { transform: 'perspective(1000px)' }
.perspective('50rem')   => { transform: 'perspective(50rem)' }

// Methods can be chained
.rotate(45).scale(1.5).translate(10) => {
  transform: 'rotate(45deg) scale(1.5) translate(10px)'
}
```

## transition

```ts
// Transition Method
.transition(speed?: num|str, props?: str[]) => Chain  // Add CSS transitions

// Default Properties (if none specified)
const defaultProps = [
  'color',
  'background-color',
  'border-color',
  'text-decoration-color',
  'fill',
  'stroke',
  'opacity',
  'box-shadow',
  'transform',
  'filter',
  'backdrop-filter'
]

// Usage Examples & Generated CSS
// Default transition (150ms)
.transition() => {
  transitionProperty: 'color, background-color, ...',
  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
  transitionDuration: '150ms'
}

// Custom duration
.transition(300) => {
  transitionProperty: 'color, background-color, ...',
  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
  transitionDuration: '300ms'
}

// Custom duration and properties
.transition('0.5s', ['opacity', 'transform']) => {
  transitionProperty: 'opacity, transform',
  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
  transitionDuration: '0.5s'
}

// Common Patterns
.transition(200)                    // Quick transition
.transition(300, ['transform'])     // Transform only
.transition('0.5s', ['opacity'])    // Fade transition

// Example with hover
.transition()
.onHover(style().opacity(0.8))     // Smooth opacity change on hover
```
