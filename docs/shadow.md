# Shadow Module

Methods for applying box shadow styles to React components.

- [Shortcut Methods](#shortcut-methods)
  - [shadow](#shadowoptions-shadowoptions--number)

## Shortcut Methods

### shadow(options: ShadowOptions | number)

Applies box shadow styles to an element.

Using a predefined shadow strength:

```typescript
const LightShadowBox = View()
  .shadow(1)
  .size(200)
  .bg('white')
  .element();
```

This creates a 200x200px white box with a light shadow (strength 1 out of 6).

Applying a custom shadow:

```typescript
const CustomShadowBox = View()
  .shadow({
    x: 5,
    y: 5,
    blur: 10,
    spread: 2,
    color: 'rgba(0, 0, 0, 0.2)',
    inset: true
  })
  .size(200)
  .bg('white')
  .element();
```

This creates a 200x200px white box with a custom inset shadow, offset 5px to the right and down, with 10px blur, 2px spread, and 20% opacity black color.

`ShadowOptions`:
- `x?: number | string`: Horizontal offset
- `y?: number | string`: Vertical offset
- `blur?: number | string`: Blur radius
- `spread?: number | string`: Spread radius
- `color?: string`: Shadow color
- `inset?: boolean`: Whether the shadow is inset

Create a element with no shadow:

```typescript
const NoShadow = View().shadow(0).element();
```

Applies a medium strength shadow to the element:

```typescript
const MediumShadow = View().shadow(2).element();
```

Strength can be specified up to 6:

```typescript
const InnerShadow = View().shadow(6).element();
```