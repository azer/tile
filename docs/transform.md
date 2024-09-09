# Transform Module

Methods for applying CSS transforms to React components.

```typescript
const Card = View('div')
  .scale(1.5) // zoom in by 1.5
  .rotate(90) // 90deg
  .translate(-25, -10) // x, y
  .element();

export const InteractiveCard = ({ children }) => (
  <Card>{children}</Card>
);
```

- [Shortcut Methods](#shortcut-methods)
  - [transform](#transformvalue-string)
  - [rotate](#rotateangle-string--number)
  - [scale](#scalex-number-y-number)
  - [translate](#translatex-string--number-y-string--number)
  - [skew](#skewx-string--number-y-string--number)
  - [transform](#transformvalue-string-1)

## Shortcut Methods

### rotate(angle: string | number)

Rotates the element.

Rotate by 45 degrees:

```typescript
.rotate(45)
```

Rotate by -90 degrees:

```typescript
.rotate('-90deg')
```

### scale(x: number, y?: number)

Scales the element.

Scale uniformly by 1.5:

```typescript
.scale(1.5)
```

Scale horizontally by 2 and vertically by 0.5:

```typescript
.scale(2, 0.5)
```

### translate(x: string | number, y?: string | number)

Translates the element.

Move 20 pixels to the right:

```typescript
.translate(20)
```

Move 10 pixels right and 30 pixels down:

```typescript
.translate('10px', '30px')
```

### skew(x: string | number, y?: string | number)

Skews the element.

Skew 10 degrees along the X-axis:

```typescript
.skew(10)
```

Skew 15 degrees on X-axis and -5 degrees on Y-axis:

```typescript
.skew('15deg', '-5deg')
```

## Core Layout Function

### transform(value: string)

The `transform` function is the primary method for applying CSS transforms.

Combine multiple transformations:

```typescript
.transform('translateX(100px) rotate(45deg) scale(1.5)')
```