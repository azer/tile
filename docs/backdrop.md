# Backdrop Module

Apply backdrop filter effects to elements.

```tsx
import { View } from "tile-css"

const FrostedGlassCard = View(300, 200)
  .backdrop({
    blur: 10,
    saturate: "180%",
    brightness: "105%"
  })
  .bg('rgba(255, 255, 255, 0.2)')
  .border(1, { color: 'rgba(255, 255, 255, 0.3)' })
  .round(15)
  .padding(20)
  .element();

export const GlassCard = ({ children }) => (
  <FrostedGlassCard>{children}</FrostedGlassCard>
);
```

- [Shortcut Methods](#shortcut-methods)
  - [backdrop](#backdropoptions-backdropoptions)

## Shortcut Methods

### backdrop(options?: BackdropOptions)

Applies backdrop filter effects to an element.

```typescript
const BlurredBackdrop = View()
  .backdrop()
  .element();

const CustomBackdrop = View()
  .backdrop({
    blur: 10,
    saturate: "150%",
    contrast: "80%",
    brightness: "90%"
  })
  .element();
```

#### BackdropOptions

- `blur?: number | string` (default: 20)
- `saturate?: number | string` (default: "190%")
- `contrast?: number | string` (default: "70%")
- `brightness?: number | string` (default: "80%")

If no options are provided, default values are used.

#### Examples

Default backdrop filter:

```typescript
const DefaultBackdrop = View()
  .backdrop()
  .bg('rgba(255, 255, 255, 0.5)')
  .element();
```

Custom backdrop filter:

```typescript
const CustomBackdrop = View()
  .backdrop({
    blur: 5,
    saturate: "200%",
    contrast: "85%",
    brightness: "95%"
  })
  .bg('rgba(0, 0, 0, 0.3)')
  .element();
```

Combining with other styles:

```typescript
const FrostedGlass = View()
  .backdrop({ blur: 15, brightness: "105%" })
  .bg('rgba(255, 255, 255, 0.2)')
  .border(1, { color: 'rgba(255, 255, 255, 0.3)' })
  .borderRadius(10)
  .element();
```

The `backdrop` method allows you to create various glass-like and frosted effects, enhancing the visual depth of your UI components.