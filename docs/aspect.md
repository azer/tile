# Aspect Module

Set the aspect ratio of an element.

- [Shortcut Methods](#shortcut-methods)
  - [aspect](#aspectratio-number)

## Shortcut Methods

### aspect(ratio: number)

Sets the aspect ratio of an element.

```typescript
const SquareElement = View()
  .aspect(1)
  .element();

const WideScreenElement = View()
  .aspect(16/9)
  .element();
```

The `aspect` method takes a single numeric argument representing the desired aspect ratio (width/height).

#### Examples

Creating a square element:

```typescript
const Square = View()
  .width(200)
  .aspect(1)
  .bg('red')
  .element();
```

Creating a 16:9 ratio element:

```typescript
const Widescreen = View()
  .width('100%')
  .aspect(16/9)
  .bg('blue')
  .element();
```

Creating a 4:3 ratio element with a minimum height:

```typescript
const StandardRatio = View()
  .width('100%')
  .aspect(4/3)
  .minHeight(200)
  .bg('green')
  .element();
```

The `aspect` method can be combined with other layout properties to create responsive elements that maintain their aspect ratio.