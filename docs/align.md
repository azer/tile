# Align Module

Methods for controlling the alignment of content within flex and grid containers.

- [Factory Functions](#factory-functions)
  - [Frame](#framewidth-height-align)
  - [VStack](#vstackelementtagoroptions-options)
  - [HStack](#hstackelementtagoroptions-options)
- [Shortcut Methods](#shortcut-methods)
  - [align](#alignoptions-alignmentoptions)

## Factory Functions

Import these functions from "tile" to create pre-configured aligned layouts:

```typescript
import { Frame, VStack, HStack } from "tile";
```

### Frame(width?, height?, align?)

Creates a flexible frame layout that centers its content by default.

```typescript
const CenteredFrame = Frame(200, 200).element();
const CustomAlignedFrame = Frame('100%', 'auto', { x: 'end', y: 'start' }).element();
```

### VStack(elementTagOrOptions?, options?)

Creates a vertically stacked layout.

```typescript
const CenteredVStack = VStack({ align: 'center' }).element();
```

### HStack(elementTagOrOptions?, options?)

Creates a horizontally stacked layout.

```typescript
const EndAlignedHStack = HStack({ align: 'end' }).element();
```

## Shortcut Methods

### align(options: AlignmentOptions)

Controls the alignment of content within a container.

```typescript
const CenteredContent = View()
  .align('center')
  .element();

const ComplexAlignment = View()
  .align({ horizontal: 'start', vertical: 'center' })
  .element();
```

#### AlignmentOptions

You can specify alignment in several ways:

1. Single value for both axes:
   ```typescript
   View().align('center')
   ```

2. Separate values for horizontal and vertical alignment:
   ```typescript
   View().align(['start', 'center'])
   ```

3. Object with `horizontal` and `vertical` properties:
   ```typescript
   View().align({ horizontal: 'end', vertical: 'top' })
   ```

4. Object with `x` and `y` properties (aliases for `horizontal` and `vertical`):
   ```typescript
   View().align({ x: 'left', y: 'bottom' })
   ```

#### Alignment Values

- `'top'`, `'center'`, `'bottom'`
- `'left'`, `'right'`
- `'start'`, `'end'`
- `'leading'`, `'trailing'`

#### Behavior

- For flex containers:
  - In row direction, horizontal alignment affects `justifyContent` and vertical alignment affects `alignItems`.
  - In column direction, vertical alignment affects `justifyContent` and horizontal alignment affects `alignItems`.

- For grid containers:
  - Horizontal alignment affects `justifyContent`.
  - Vertical alignment affects `alignContent`.

#### Examples

Centering content in a flex container:

```typescript
const CenteredFlex = View()
  .display('flex')
  .align('center')
  .element();
```

Aligning content in a grid container:

```typescript
const AlignedGrid = View()
  .display('grid')
  .align({ horizontal: 'end', vertical: 'start' })
  .element();
```

Complex alignment in a flex container:

```typescript
const ComplexFlexAlign = View()
  .display('flex')
  .flexDirection('column')
  .align(['center', 'start'])
  .element();
```