# Selectors Module

Methods for applying styles to various element states, pseudo-elements, and custom selectors in React components.

- [Shortcut Methods](#shortcut-methods)
  - [onHover](#onhoverstyles-chain--css)
  - [onFocus](#onfocusstyles-chain--css)
  - [onActive](#onactivestyles-chain--css)
  - [before](#beforestyles-chain--css)
  - [after](#afterstyles-chain--css)
  - [attr](#attrstyles-chain--css-attributename-string-options-attrselectoroptions)

## Shortcut Methods

### onHover(styles: Chain | CSS)

Applies styles when the element is hovered.

```typescript
const HoverBox = View()
  .bg('blue')
  .onHover(style().bg('darkblue'))
  .element();
```

### onFocus(styles: Chain | CSS)

Applies styles when the element is focused.

```typescript
const FocusInput = View('input')
  .border(1, { color: 'gray' })
  .onFocus(style().outline('2px solid blue'))
  .element();
```

### onActive(styles: Chain | CSS)

Applies styles when the element is active (being clicked or tapped).

```typescript
const ActiveButton = View('button')
  .bg('green')
  .onActive(style().bg('darkgreen'))
  .element();
```

### before(styles: Chain | CSS)

Applies styles to the `::before` pseudo-element.

```typescript
const BeforeElement = View()
  .before(style()
    .content('"→"')
    .margin({ right: 5 })
    .color('red')
  )
  .element();
```

### after(styles: Chain | CSS)

Applies styles to the `::after` pseudo-element.

```typescript
const AfterElement = View()
  .after(style()
    .content('←')
    .margin({ left: 5 })
    .color('blue')
  )
  .element();
```

### attr(styles: Chain | CSS, attributeName: string, options?: AttrSelectorOptions)

Applies styles based on attribute selectors.

```typescript
// Simple attribute presence
const TitledElement = View()
  .attr(style().color('blue'), 'title')
  .element();

// Exact match
const SpecificLink = View()
  .attr(style().bg('red'), 'href', { eq: 'https://example.org' })
  .element();

// Substring match
const DataElement = View()
  .attr(style().bg('yellow'), 'data-value', { contains: 'example' })
  .element();
```

`AttrSelectorOptions`:
- `eq?: string`: Exact match (=)
- `contains?: string`: Substring match (*)
- `startsWith?: string`: Prefix match (^)
- `endsWith?: string`: Suffix match ($)
- `includes?: string`: Whitespace-separated word match (~=)
- `dashMatch?: string`: Hyphen-separated prefix match (|=)
- `caseSensitive?: boolean`: Specify case sensitivity (defaults to true)