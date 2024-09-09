# Flex Module

Methods for creating and manipulating flex layouts in React components.

- [Factory Functions](#factory-functions)
  - [VStack](#vstackelementtagoroptions-options)
  - [HStack](#hstackelementtagoroptions-options)
- [Shortcut Methods](#shortcut-methods)
  - [flex](#flexoptions-flexoptions)
  - [hstack](#hstackoptions-flexoptions)
  - [vstack](#vstackoptions-flexoptions)
  - [center](#centeroptions-flexoptions)
- [Core Layout Function](#core-layout-function)
  - [flex](#flexoptions-flexoptions-1)

## Factory Functions

Import these functions from "tile" to start your flex layout chain:

```typescript
import { VStack, HStack } from "tile";
```

### VStack(elementTagOrOptions?, options?)

Creates a vertically stacked layout.

```typescript
const SimpleVStack = VStack().element();
const CustomVStack = VStack({ items: "center", justify: "space-between" }).element();
```

### HStack(elementTagOrOptions?, options?)

Creates a horizontally stacked layout.

```typescript
const SimpleHStack = HStack().element();
const CustomHStack = HStack({ items: "center", justify: "flex-end" }).element();
```

## Shortcut Methods

### flex(options: FlexOptions)

Applies flex container styles.

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
  .hstack({ justify: "space-around", items: "center" })
  .element();
```

### vstack(options?: FlexOptions)

Creates a vertical stack (flex column).

```typescript
const VerticalStack = View()
  .vstack({ justify: "flex-start", items: "stretch" })
  .element();
```

### center(options?: FlexOptions)

Creates a centered flex layout.

```typescript
const CenteredContent = View()
  .center({ wrap: "wrap" })
  .element();
```

## Core Layout Function

### flex(options: FlexOptions)

The `flex` function is the primary method for applying comprehensive flex styling options. It accepts an object with various properties to control the layout and behavior of flex containers and items.

```typescript
const FlexLayout = View()
  .flex({
    direction: "row",
    justify: "space-between",
    items: "center",
    wrap: "wrap",
    grow: 1,
    shrink: 0,
    basis: "auto",
    align: "center"
  })
  .element();
```

#### Valid Properties for `flex`:

- `direction`: Sets the direction of the flex container's main axis ("row" | "column" | "row-reverse" | "column-reverse")
- `justify`: Defines how the browser distributes space between and around content items along the main axis ("flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly")
- `items`: Defines how the browser distributes space between and around flex items along the cross axis ("flex-start" | "flex-end" | "center" | "baseline" | "stretch")
- `wrap`: Controls whether the flex container is single-line or multi-line ("nowrap" | "wrap" | "wrap-reverse")
- `grow`: Specifies how much the flex item will grow relative to the rest of the flex items (number)
- `shrink`: Specifies how much the flex item will shrink relative to the rest of the flex items (number)
- `basis`: Specifies the initial main size of the flex item (string | number)
- `align`: Aligns flex lines within the flex container when there's extra space in the cross-axis (StackAlignment | [StackAlignment, StackAlignment] | { horizontal?: StackAlignment; vertical?: StackAlignment; x?: StackAlignment; y?: StackAlignment })