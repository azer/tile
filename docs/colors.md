# Colors Module

Methods for applying color-related styles to React components.

- [Shortcut Methods](#shortcut-methods)
  - [color](#coloroptions-coloroptions)
  - [fg](#fgcolor-string)
  - [bg](#bgoptions-bgoptions)
  - [placeholder](#placeholderfg-string)
  - [fill](#filloptions-bgoptions)

## Shortcut Methods

### color(options: ColorOptions)

Apply multiple color-related styles at once.

```typescript
View()
  .color({
    fg: 'white',
    bg: 'blue',
    border: 'red',
    caret: 'green',
    placeholder: 'lightgray',
    selectionBg: 'yellow',
    selectionFg: 'black',
    outline: 'orange'
  })
  .element();
```

#### ColorOptions

- `fg`: Foreground color
- `bg`: Background color or BGOptions
- `border`: Border color
- `caret`: Caret color
- `placeholder`: Placeholder text color
- `selectionBg`: Selection background color
- `selectionFg`: Selection text color
- `outline`: Outline color

### fg(color: string)

Set the foreground (text) color.

```typescript
View()
  .fg('blue')
  .element();
```

### bg(options: BGOptions)

Set background styles.

```typescript
View()
  .bg('blue')
  .element();

View()
  .bg({
    color: 'blue',
    url: 'image.jpg',
    size: 'cover',
    position: 'center',
    repeat: 'no-repeat'
  })
  .element();
```

#### BGOptions

- `color`: Background color
- `url`: Background image URL
- `src`: Background image source
- `base64`: Base64 encoded background image
- `size`: 'cover' | 'contain' | 'auto'
- `position`: string | [string, string]
- `repeat`: 'repeat' | 'repeat-x' | 'repeat-y' | 'no-repeat'

### placeholder(fg: string)

Set the placeholder text color.

```typescript
View('input')
  .placeholder('lightgray')
  .element();
```

### fill(options: BGOptions)

Alias for `bg`. Uses the same options.

```typescript
View()
  .fill('red')
  .element();
```