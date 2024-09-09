# Responsive Module

Methods for creating responsive and scalable layouts in React components.

- [Shortcut Methods](#shortcut-methods)
  - [geometry](#geometryoptions-mediaquery-options-styles-chain--css)
  - [media](#mediabreakpoint-string-styles-chain--css)
  - [mobile](#mobilestyles-chain--css)
  - [desktop](#desktopstyles-chain--css)
  - [portrait](#portraitstyles-chain--css)
  - [landscape](#landscapestyles-chain--css)
- [Predefined Breakpoints](#predefined-breakpoints)

## Shortcut Methods

### geometry(options: MediaQueryOptions, styles: Chain | CSS)

Apply styles based on specific geometry conditions.

```typescript
const ResponsiveBox = View()
  .geometry({ maxWidth: 640 }, style().width('100%').bg('red'))
  .element();
```

This creates an element that's full-width with a red background when the screen width is 640px or less.

#### MediaQueryOptions

The `geometry` method accepts a `MediaQueryOptions` object with the following properties:

- `minWidth?: number | string`: Minimum width of the viewport
- `maxWidth?: number | string`: Maximum width of the viewport
- `minHeight?: number | string`: Minimum height of the viewport
- `maxHeight?: number | string`: Maximum height of the viewport
- `orientation?: 'portrait' | 'landscape'`: Orientation of the viewport

Example using multiple options:

```typescript
const ComplexResponsive = View()
  .geometry(
    { minWidth: 768, maxWidth: 1024, orientation: 'landscape' },
    style().padding(20).bg('lightblue')
  )
  .element();
```

This applies styles when the viewport is between 768px and 1024px wide and in landscape orientation.

### media(breakpoint: string, styles: Chain | CSS)

Apply styles for a specific media query or breakpoint.

```typescript
const TabletStyles = View()
  .media(breakpoints.tablet, style().padding(20).color('blue'))
  .element();
```

This applies padding and text color changes specifically for tablet-sized screens.

### mobile(styles: Chain | CSS)

Apply styles for mobile devices (max-width: 767px).

```typescript
const MobileLayout = View()
  .mobile(style().width('100%').padding(10))
  .element();
```

This changes the layout to full width with smaller padding on mobile devices.

### desktop(styles: Chain | CSS)

Apply styles for desktop devices (min-width: 768px).

```typescript
const DesktopLayout = View()
  .desktop(style().maxWidth(1200).margin('0 auto'))
  .element();
```

This centers the content and sets a max-width for larger screens.

### portrait(styles: Chain | CSS)

Apply styles for portrait orientation.

```typescript
const PortraitStyles = View()
  .portrait(style().height('100vh'))
  .element();
```

This adjusts the layout for portrait mode, setting full viewport height.

### landscape(styles: Chain | CSS)

Apply styles for landscape orientation.

```typescript
const LandscapeStyles = View()
  .landscape(style().width('100vw'))
  .element();
```

This adjusts the layout for landscape mode, setting full viewport width.

## Predefined Breakpoints

Tile provides a set of predefined breakpoints for common screen sizes and devices:

```typescript
import { breakpoints } from 'tile';
```

Here's how to use them:

```typescript
const TabletStyles = View()
  .media(breakpoints.tablet, style().padding(20).color('blue'))
  .element();
```

### Size Breakpoints

- `max-2xs`: (max-width: 359px)
- `min-2xs`: (min-width: 360px)
- `max-xs`: (max-width: 479px)
- `min-xs`: (min-width: 480px)
- `max-sm`: (max-width: 639px)
- `min-sm`: (min-width: 640px)
- `max-md`: (max-width: 767px)
- `min-md`: (min-width: 768px)
- `max-lg`: (max-width: 1023px)
- `min-lg`: (min-width: 1024px)
- `max-xl`: (max-width: 1279px)
- `min-xl`: (min-width: 1280px)
- `max-2xl`: (max-width: 1535px)
- `min-2xl`: (min-width: 1536px)

### Device Aliases

- `mobile`: (max-width: 767px)
- `tablet`: (min-width: 768px) and (max-width: 1023px)
- `desktop`: (min-width: 1024px)

### Specific Device Aliases

- `iphone-se`: (max-width: 375px)
- `iphone`: (max-width: 428px) // Covers most iPhone models
- `ipad`: (min-width: 768px) and (max-width: 1024px)
- `ipad-pro`: (min-width: 1024px) and (max-width: 1366px)

### Orientation Aliases

- `portrait`: (orientation: portrait)
- `landscape`: (orientation: landscape)

### High-resolution Screens

- `retina`: (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)

By combining these methods with the predefined breakpoints, you can create highly responsive and adaptable layouts that work seamlessly across a wide range of devices and screen sizes.