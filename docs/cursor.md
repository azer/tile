# Cursor Module

Methods for setting cursor styles in React components.

```tsx
import { View, Cursor } from "tile-css"

const InteractiveElement = View()
  .size(100)
  .bg('lightblue')
  .cursor(Cursor.Pointer)
  .element();

export const CursorDemo = () => <InteractiveElement />;
```

- [Shortcut Methods](#shortcut-methods)
  - [cursor](#cursorvalue-cursor--cursoroptions)

## Shortcut Methods

### cursor(value: Cursor | CursorOptions)

Set the cursor style for an element.

```typescript
View()
  .cursor(Cursor.Pointer)
  .element();
```

Using a custom cursor image:

```typescript
View()
  .cursor({
    src: 'url(path/to/cursor.png)',
    cursor: Cursor.Pointer
  })
  .element();
```

Using the `url` option:

```typescript
View()
  .cursor({
    url: 'path/to/cursor.png',
    cursor: Cursor.Auto
  })
  .element();
```

#### Cursor Enum Values

```typescript
enum Cursor {
  Auto, Default, Pointer, Wait, Text, Move, Help, NotAllowed, None,
  ContextMenu, Progress, Cell, Crosshair, VerticalText, Alias, Copy,
  NoDrop, Grab, Grabbing, AllScroll, ColResize, RowResize,
  NResize, EResize, SResize, WResize, NEResize, NWResize, SEResize,
  SWResize, EWResize, NSResize, NESWResize, NWSEResize, ZoomIn, ZoomOut
}
```

#### CursorOptions

- `cursor?: Cursor`: A Cursor enum value
- `src?: string`: URL of a custom cursor image (in "url(..)" format)
- `url?: string`: URL of a custom cursor image (will be automatically wrapped in "url(..)")

When using a custom cursor image, you can provide a fallback cursor type.
If no cursor is specified when using a custom image, it defaults to `auto`.