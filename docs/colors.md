# Colors Module

Methods for applying color-related styles to React components.

```tsx
import { View } from "tile-css"

const KittenButton = View('button')
  .fg("#ff0")
  .bg({
    url: 'https://placekitten.com/100x100.jpg',
    size: 'cover'
  })
  .element();

export const FancyButton = ({ children }) => (
  <KittenButton>{children}</KittenButton>
);
```

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

Set background styling.

To set solid color:

```typescript
View()
  .bg('blue')
  .element();
```

To set a background image:

```ts
View()
  .bg({ url: 'https://foo.com/bar.png' }) // use `src` property for non-url values
  .element()
```

More complex example:

```ts
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
- `url`: Background image URL, shortcut for `url(...)`
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
