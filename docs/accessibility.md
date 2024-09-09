# Accessibility Module

The Accessibility module in Tile provides methods for enhancing the accessibility of your React components. Currently, it focuses on text selection control.

- [Shortcut Methods](#shortcut-methods)
  - [selection](#selectionoptions-selectionoptions)

## Shortcut Methods

### selection(options: SelectionOptions)

Controls text selection behavior and appearance.

```typescript
const SelectableText = View()
  .selection({
    bg: 'blue',
    fg: 'white',
    userSelect: 'text'
  })
  .element();

const NonSelectableText = View()
  .selection(false)
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