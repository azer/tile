# Outline Module

Methods for applying outline styles to React components.

- [Shortcut Methods](#shortcut-methods)
  - [outline](#outlinewidthoroptions-options)

## Shortcut Methods

### outline(widthOrOptions, options?)

Apply outline styles to an element.

```typescript
View()
  .outline(2)
  .element();
```

This creates an element with a 2px solid outline.

```typescript
View()
  .outline('3px', { color: 'red', style: 'dashed' })
  .element();
```

This creates an element with a 3px dashed red outline.

```typescript
View()
  .outline({
    width: 2,
    color: 'blue',
    style: 'double',
    offset: '1px'
  })
  .element();
```

This creates an element with a 2px double blue outline, offset by 1px from the edge of the element.

### OutlineOptions

The `OutlineOptions` interface provides various properties to control the outline appearance:

- `width`: Width of the outline (number | string)
- `color`: Color of the outline (string)
- `style`: Style of the outline ("none" | "hidden" | "dotted" | "dashed" | "solid" | "double" | "groove" | "ridge" | "inset" | "outset")
- `offset`: Offset of the outline from the edge of the element (number | string)

If only a width is provided, the outline style defaults to "solid".