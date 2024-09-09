# Border Module

Methods for applying and manipulating border styles in React components.

```typescript
import { View } from "tile-css"

const FancyButton = View('button')
  .size(200, 50)
  .color({ fg: 'blue', bg: 'white' })
  .border(2, { color: 'blue' })
  .round({ x: 25, y: 10 })
  .onHover(
    style()
      .color({ bg: 'blue', fg: 'white' })
      .border(2, { color: 'white' })
  )
  .element();

export const CustomButton = ({ children }) => (
  <FancyButton>{children}</FancyButton>
);
```

## Shortcut Methods

- [border](#border)
- [stroke](#stroke)
- [round](#round)

## Shortcut Methods

### border

Apply border styles to elements.

Standard usage:

```typescript
View()
  .border(1, { color: "black" })
  .element();
```

Customizing specific sides:

```typescript
View()
  .border(3, { color: "black", right: 0 }) // Remove right border, while other sides retain the 3px black border.
  .element();
```

Or, choose different border for horizontal / vertical sides:

```typescript
View()
  .border({ x: 10, y: 5, color: "black", right: 0 }) // x: left, right / y: top, bottom
  .element();
```

Changing style:

```typescript
View()
  .border(1, { color: "black", style: "dashed" })
  .element();
```

### stroke

Alias for `border`. Uses the same parameters and options.

### round

Apply border-radius to elements.

Basic usage:

```typescript
View()
  .round(10)
  .element();
```

Customizing specific corners:

```typescript
View()
  .round(10, { topLeft: 5, bottomRight: 15 })
  .element();
```

The second parameter overrides the radius for specific corners.

Using shorthand:

```typescript
View()
  .round({ x: 10, y: 20 })
  .element();
```

Here, `x` sets the top-left and bottom-right corners, while `y` sets the top-right and bottom-left corners.