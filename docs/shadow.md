# Shadow Module

Methods for applying box shadow styles to React components.

- [Shortcut Methods](#shortcut-methods)
  - [shadow](#shadowoptions-shadowoptions--number)

## Shortcut Methods

### shadow(options?: ShadowOptions | number)

Applies box shadow styles to an element. Supports three usage patterns:

Default shadow (when called with no arguments):
```typescript
const DefaultShadow = View()
  .shadow()
  .element();
```

Using opacity value between 0-1:
```typescript
const LightShadow = View()
  .shadow(0.5) // 50% opacity
  .element();
```

Applying a custom shadow:
```typescript
const CustomShadow = View()
  .shadow({
    x: 5,
    y: 5,
    blur: 10,
    spread: 2,
    color: 'rgba(0, 0, 0, 0.2)',
    inset: true
  })
  .element();
```

#### Default Values
When called without arguments, applies these default values:
```typescript
{
  x: 0,        // 0px horizontal offset
  y: 4,        // 4px vertical offset
  blur: 4,     // 4px blur radius
  spread: 0,   // 0px spread
  color: 'rgba(0, 0, 0, 0.25)', // 25% black
  inset: false // outer shadow
}
```

#### ShadowOptions
- `x?: number | string`: Horizontal offset
- `y?: number | string`: Vertical offset
- `blur?: number | string`: Blur radius
- `spread?: number | string`: Spread radius
- `color?: string`: Shadow color
- `inset?: boolean`: Whether the shadow is inset

### textShadow(options?: TextShadowOptions | number)

Applies text shadow styles to an element. Supports three usage patterns:

Default text shadow:
```typescript
const DefaultTextShadow = View()
  .textShadow()
  .element();
```

Using opacity value between 0-1:
```typescript
const LightTextShadow = View()
  .textShadow(0.5) // 50% opacity
  .element();
```

Custom text shadow:
```typescript
const CustomTextShadow = View()
  .textShadow({
    x: 2,
    y: 2,
    blur: 4,
    color: 'blue'
  })
  .element();
```

#### Default Values
When called without arguments, applies these defaults:
```typescript
{
  x: 1,        // 1px horizontal offset
  y: 1,        // 1px vertical offset
  blur: 2,     // 2px blur radius
  color: 'rgba(0, 0, 0, 0.25)' // 25% black
}
```

#### TextShadowOptions
- `x?: number | string`: Horizontal offset
- `y?: number | string`: Vertical offset
- `blur?: number | string`: Blur radius
- `color?: string`: Shadow color
