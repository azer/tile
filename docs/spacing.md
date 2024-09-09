# Spacing Module

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

- [Shortcut Methods](#shortcut-methods)
  - [margin](#marginoptions-number--string--boxsides-override-boxsides)
  - [padding](#paddingoptions-number--string--boxsides-override-boxsides)
  - [space](#spaceoptions-spacingoptions)

## Shortcut Methods

### margin(options: number | string | BoxSides, override?: BoxSides)

Applies margin to an element.

Apply 10px margin on all sides:

```typescript
.margin(10)
```

Apply 10px margin on all sides except right side, which gets 5px:

```typescript
.margin(10, { right: 5 })
```

Apply 10px margin on left and right, 5px on top and bottom:

```typescript
.margin({ x: 10, y: 5 })
```

### padding(options: number | string | BoxSides, override?: BoxSides)

Applies padding to an element.

Apply 15px padding on all sides:

```typescript
.padding(15)
```

Apply 20px padding on left and right, 10px on top and bottom:

```typescript
.padding({ x: 20, y: 10 })
```

Apply 10px padding on all sides except top, which gets 25px:

```typescript
.padding(10, { top: 25 })
```

## space(options: SpacingOptions)

The `space` function is the primary method for applying comprehensive spacing styles.

`SpacingOptions`:
- `gap?: string | number`: Sets the gap between flex/grid items
- `inner?: string | number | BoxSides`: Sets padding
- `outer?: string | number | BoxSides`: Sets margin

Create an element with 10px gap between flex/grid items, 20px padding on all sides, and 30px margin on all sides:

```typescript
.space({ gap: 10, inner: 20, outer: 30 })
```

Create an element with 1rem gap, 20px horizontal padding, 10px vertical padding, 30px top margin, and 15px bottom margin:

```typescript
.space({
  gap: '1rem',
  inner: { x: 20, y: 10 },
  outer: { top: 30, bottom: 15 }
})
```