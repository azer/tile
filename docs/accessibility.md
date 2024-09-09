# Accessibility Module

The Accessibility module in Tile provides methods for enhancing the accessibility of your React components. Currently, it focuses on text selection control.

```ts
import { View } from "tile-css"

const AccessibleQuote = View('blockquote')
  .selection({
    bg: 'rgba(0, 123, 255, 0.2)',
    fg: 'navy'
  })
  .element();

export const ImportantMessage = () => (
  <AccessibleQuote>
    This quote is selectable with custom highlight colors. 
    It enhances readability and indicates that the text can be copied.
  </AccessibleQuote>
);
```

- [Shortcut Methods](#shortcut-methods)
  - [selection](#selectionoptions-selectionoptions)

## Shortcut Methods

### selection(options: SelectionOptions)

Controls text selection behavior and appearance.

To disable selection:

```tsx
const NonSelectableText = View()
  .selection(false)
  .element();
```

To customize:

```typescript
const SelectableText = View()
  .selection({
    bg: 'blue',
    fg: 'white'
  })
  .element();
```

#### SelectionOptions

- `bg?: string`: Background color of selected text
- `fg?: string`: Foreground (text) color of selected text
- `enabled?: boolean`: Enables or disables text selection
- `userSelect?: UserSelectValue`: Specifies the user selection behavior

`UserSelectValue` can be one of:
- `'none'`: Prevents text selection
- `'auto'`: Default behavior
- `'text'`: Allows text selection
- `'all'`: Allows selection of all content
- `'contain'`: Selection is contained to the element
- `'element'`: Allows selection of the entire element
- `boolean`: `true` for 'auto', `false` for 'none'

#### Shorthand Usage

You can use `true` or `false` as a shorthand:

```typescript
const SelectableText = View().selection(true).element();  // Equivalent to { userSelect: 'auto' }
const NonSelectableText = View().selection(false).element();  // Equivalent to { userSelect: 'none' }
```

This method provides fine-grained control over text selection, allowing you to enhance the accessibility and user experience of your React components.