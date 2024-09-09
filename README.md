# Tile

Chainable styling library for React. Built on top of [Stitches](https://stitches.dev).

```bash
npm install azer/tile
```

## Usage Examples

Create a box with "Hello World" message centered;

```tsx
import { Frame } from 'tile';

const TestBox = Frame("90vw", "90vh") // `Frame` centers its content by default
  .color({ bg: "black", fg: "white" })
  .border(10, { color: "blue", right: 0 }) // 10px border around, disabled on right side.
  .round(5) // Round by 5px
  .element();

export const App = () => {
  return (
    <TestBox>Hello World</TestBox>
  );
};
```

In addition to `Frame`, you can use `HStack` (orders items horizontally) and `VStack` (vertically) factory methods:

```tsx
import { Frame, style } from 'tile';

const TestBox = Vstack("90vw", "90vh") // Vertically ordered items
  .align({ x: "center", y: "end" }) // align content to bottom center
  .scale(2.5) // Apply `scale` transform 
  .border(10, { color: "blue" })
  .round(5) // Round by 5px
  .text(24) // font-size: 24px
  .mobile(style().padding(0)) // Set `padding` to 0, if user is on mobile
  .element();

export const App = () => {
  return (
    <TestBox>
      <div>Hello</div>
      <div>World</div>
    </TestBox>
  );
};
```

It includes lots of shortcuts for writing simpler TypeScript, e.g;

```tsx
import { View, style } from "tile"

const Container = View()
  .center() // just center everything inside the element on both x/y axis
  .attr("data-value", { contains: "example" }, style().bg("yellow")) // Selects all children with data-value attributes containing "example" string
  .element()
```

## API

Check out docs/ folder.
