# Text Module

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

- [Options](#options)
  - [align](#align)
  - [case](#case)
  - [color](#color)
  - [cursor](#cursor)
  - [decoration](#decoration)
  - [ellipsis](#ellipsis)
  - [family](#family)
  - [leading](#leadinglineheightheight)
  - [shadow](#shadow)
  - [size](#size)
  - [tracking](#tracking)
  - [weight](#weight)
  - [wrap](#wrapwhitespace)
- [Shortcut Methods](#shortcut-methods)
  - [text](#textsizeoroptions-string--number--textoptions-options-textoptions)
  - [sans](#sanssizeoroptions-string--number--textoptions-options-textoptions)
  - [mono](#monosizeoroptions-string--number--textoptions-options-textoptions)
  - [serif](#serifsizeoroptions-string--number--textoptions-options-textoptions)
  - [ellipsis](#ellipsis)
- [Core Layout Function](#core-layout-function)
  - [text](#textsizeoroptions-string--number--textoptions-options-textoptions-1)

## Options

### align
Text alignment within its container.
```ts
.text({ align: 'center' })
.text({ align: 'justify' })
```
Values: `'left'` | `'center'` | `'right'` | `'justify'` | `'start'` | `'end'`

### case
Text casing transformation.
```ts
.text({ case: 'upper' })
.text({ case: 'capitalize' })
```
Values: `'upper'` | `'lower'` | `'capitalize'` | `'normal'`

### color
Text color. Accepts any CSS color value.
```ts
.text({ color: 'blue' })
.text({ color: '#FF0000' })
.text({ color: 'rgba(0,0,0,0.5)' })
```

### cursor
Mouse cursor style when hovering.
```ts
.text({ cursor: 'pointer' })
```

### decoration
Text decoration lines.
```ts
.text({ decoration: 'underline' })
.text({ decoration: 'line-through' })
```
Values: `'none'` | `'underline'` | `'line-through'` | `'overline'`

### ellipsis
Enable text truncation with ellipsis.
```ts
.text({ ellipsis: true })
```

### family
Font family name or variable.
```ts
.text({ family: 'Arial' })
.text({ family: '$sans' })  // Use system variable
```

### leading/lineHeight/height
Line height. All three props control the same CSS property.
```ts
.text({ leading: 1.5 })
.text({ lineHeight: '24px' })
.text({ height: '2em' })
```

### shadow
Text shadow effects. Pass a number between 0-1 to control opacity of default shadow, or customize it fully:

```ts
.text({ shadow: 0.5 })  // Default shadow at 50% opacity
.text({ shadow: { x: 1, y: 1, blur: 2, color: 'blue' }})
.text({ shadow: { x: 2, y: 2 }}) // Default color with custom offset
```

Default shadow:

```ts
const defaultTextShadow: TextShadowOptions = {
  x: 1,
  y: 1,
  blur: 2,
  color: "rgba(0, 0, 0, 0.25)",
};
```

See also: [Shadows](./shadow.md).

### size
Font size. Accepts number (px) or string with units.
```ts
.text({ size: 16 })      // 16px
.text({ size: '1.2rem' })
.text({ size: '2em' })
```

### tracking
Letter spacing. Number (px) or string with units.
```ts
.text({ tracking: 0.5 })    // 0.5px
.text({ tracking: '0.1em' })
```

### weight
Font weight. Accepts numbers (100-900) or keywords.
```ts
.text({ weight: 500 })
.text({ weight: 'bold' })
```

### wrap/whiteSpace
Text wrapping behavior. Both props control white space handling.
```ts
.text({ wrap: 'nowrap' })
.text({ whiteSpace: 'pre' })
```
Values: `'wrap'` | `'nowrap'` | `'pre'` | `'pre-line'` | `'pre-wrap'`

## Shortcut Methods

### text(sizeOrOptions: string | number | TextOptions, options?: TextOptions)

Applies general text styles to an element.

Set font size to 16px:

```typescript
.text(16)
```

Set font size to 18px and color to blue:

```typescript
.text(18, { color: 'blue' })
```

Set multiple text properties:

```typescript
.text(20, {
  weight: 'bold',
  color: 'red',
  align: 'center',
  family: 'sans-serif'
})
```

### sans(sizeOrOptions: string | number | TextOptions, options?: TextOptions)

Applies sans-serif font styles.

Set sans-serif font with 16px size:

```typescript
.sans(16)
```

Set sans-serif font with custom styles:

```typescript
.sans(18, { weight: 'bold', color: 'blue' })
```

### mono(sizeOrOptions: string | number | TextOptions, options?: TextOptions)

Applies monospace font styles.

Set monospace font with 14px size:

```typescript
.mono(14)
```

Set monospace font with custom styles:

```typescript
.mono({ size: 16, color: 'gray' })
```

### serif(sizeOrOptions: string | number | TextOptions, options?: TextOptions)

Applies serif font styles.

Set serif font with 20px size:

```typescript
.serif(20)
```

Set serif font with custom styles:

```typescript
.serif(22, { weight: 'normal', align: 'center' })
```

### ellipsis()

Applies ellipsis text overflow styles.

```typescript
.ellipsis()
```

## Core Layout Function

### text(sizeOrOptions: string | number | TextOptions, options?: TextOptions)

The `text` function is the primary method for applying text styles.

`TextOptions`:
- `color?: string`
- `size?: number | string`
- `family?: string`
- `weight?: number | string`
- `tracking?: number | string` (letter-spacing)
- `leading?: number | string` (line-height)
- `height?: number | string` (line-height)
- `lineHeight?: number | string`
- `align?: 'left' | 'center' | 'right' | 'justify' | 'start' | 'end'`
- `case?: 'upper' | 'lower' | 'capitalize' | 'normal'`
- `wrap?: 'wrap' | 'nowrap' | 'pre' | 'pre-line' | 'pre-wrap'`
- `whiteSpace?: 'normal' | 'nowrap' | 'pre' | 'pre-line' | 'pre-wrap'`
- `cursor?: Cursor`
- `decoration?: 'none' | 'underline' | 'line-through' | 'overline'`
- `ellipsis?: boolean`
- `shadow?: TextShadowOptions | number`

Apply multiple text styles:

```typescript
.text({
  size: 16,
  color: 'darkblue',
  weight: 500,
  tracking: '0.5px',
  leading: 1.5,
  case: 'capitalize',
  align: 'center',
  decoration: 'underline',
  shadow: { offsetX: 1, offsetY: 1, blurRadius: 2, color: 'rgba(0,0,0,0.2)' }
})
```

Apply text styles with ellipsis:

```typescript
.text({
  size: 14,
  ellipsis: true,
  color: 'gray'
})
```
