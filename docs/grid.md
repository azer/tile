# Grid Module

Methods for creating and manipulating grid layouts in React components.

- [Factory Functions](#factory-functions)
  - [Grid](#gridoptions-gridoptions)
- [Shortcut Methods](#shortcut-methods)
  - [columns](#columnstemplate-string--number-options-gridoptions)
  - [rows](#rowstemplate-string--number-options-gridoptions)
- [Core Layout Function](#core-layout-function)
  - [grid](#gridoptions-gridoptions-1)

## Factory Functions

Import this function from "tile" to start your grid layout chain:

```typescript
import { Grid } from "tile";
```

### Grid(options: GridOptions)

Create a 3-column grid with equal-width columns and a 10px gap between items.

```typescript
const SimpleGrid = Grid({ columns: 3, gap: 10 }).element();
```

Create a grid with 3 columns of varying widths and 2 rows of different heights, with a 20px gap between items.

```typescript
const ComplexGrid = Grid({
  columns: '1fr 2fr 1fr',
  rows: '100px auto',
  gap: 20
}).element();
```

## Shortcut Methods

### columns(template: string | number, options?: GridOptions)

Creates a grid layout with specified columns.

```typescript
const ThreeColumnGrid = View()
  .columns(3, { gap: 20 })
  .element();
```

This creates a grid with 3 equal-width columns and a 20px gap between items.

### rows(template: string | number, options?: GridOptions)

Creates a grid layout with specified rows.

```typescript
const ThreeRowGrid = View()
  .rows(3, { gap: 15 })
  .element();
```

This creates a grid with 3 equal-height rows and a 15px gap between rows.

## Core Layout Function

### grid(options: GridOptions)

The `grid` function is the primary method for applying comprehensive grid styling options.

```typescript
const GridLayout = View()
  .grid({
    columns: 'repeat(3, 1fr)',
    rows: 'auto',
    gap: 20,
    autoFlow: 'dense',
    alignItems: 'center',
    justifyContent: 'space-between'
  })
  .element();
```

This creates a 3-column grid with automatically sized rows, 20px gaps, dense auto-placement, vertically centered items, and space distributed between items horizontally.

### GridOptions

The `GridOptions` interface provides various properties to control the layout and behavior of grid containers:

- `gap`: Sets the gap between grid items (string | number)
- `columnGap`: Sets the gap between columns (string | number)
- `rowGap`: Sets the gap between rows (string | number)
- `autoFlow`: Controls how the auto-placement algorithm works ("row" | "column" | "dense" | "row dense" | "column dense")
- `autoColumns`: Specifies the size of implicitly-created column tracks (string)
- `autoRows`: Specifies the size of implicitly-created row tracks (string)
- `columns`: Defines the columns of the grid (string)
- `rows`: Defines the rows of the grid (string)
- `templateAreas`: Defines named grid areas (string)
- `alignContent`: Aligns the grid along the block axis ("start" | "end" | "center" | "stretch" | "space-around" | "space-between" | "space-evenly")
- `justifyContent`: Aligns the grid along the inline axis ("start" | "end" | "center" | "stretch" | "space-around" | "space-between" | "space-evenly")
- `alignItems`: Aligns grid items along the block axis ("start" | "end" | "center" | "stretch" | "baseline")
- `justifyItems`: Aligns grid items along the inline axis ("start" | "end" | "center" | "stretch")
- `align`: Aligns both grid content and items (StackAlignment | [StackAlignment, StackAlignment] | { horizontal?: StackAlignment; vertical?: StackAlignment; x?: StackAlignment; y?: StackAlignment })