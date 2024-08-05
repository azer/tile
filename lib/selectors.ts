import { CSS } from "@stitches/react";
import { Chain, MethodRegistrar } from "./chain";

export type SelectorFunction = (styles: Chain | CSS) => CSS;

export type Methods = {
  onHover: SelectorFunction;
  onFocus: SelectorFunction;
  onActive: SelectorFunction;
  before: SelectorFunction;
  after: SelectorFunction;
};

export function register(method: MethodRegistrar) {
  method("onHover", applyHover);
  method("onFocus", applyFocus);
  method("onActive", applyActive);
  method("before", applyBefore);
  method("after", applyAfter);
  method("select", applySelector);
}

/**
 * Applies hover styles to the element.
 *
 * @param css - The current CSS object
 * @param styles - Styles to apply on hover, either a View or CSS object
 * @returns Updated CSS object with hover styles
 *
 * @example
 * applyHover({}, View().bg('blue'))
 * // Output: { '&:hover': { backgroundColor: 'blue' } }
 */
function applyHover(css: CSS, styles: Chain | CSS): CSS {
  return applySelector.call(this, css, '&:hover', styles);
}

/**
 * Applies focus styles to the element.
 *
 * @param css - The current CSS object
 * @param styles - Styles to apply on focus, either a View or CSS object
 * @returns Updated CSS object with focus styles
 *
 * @example
 * applyFocus({}, View().outline('2px solid blue'))
 * // Output: { '&:focus': { outline: '2px solid blue' } }
 */
function applyFocus(css: CSS, styles: Chain | CSS): CSS {
  return applySelector.call(this, css, '&:focus', styles);
}

/**
 * Applies active styles to the element.
 *
 * @param css - The current CSS object
 * @param styles - Styles to apply on active state, either a View or CSS object
 * @returns Updated CSS object with active styles
 *
 * @example
 * applyActive({}, View().transform('scale(0.98)'))
 * // Output: { '&:active': { transform: 'scale(0.98)' } }
 */
function applyActive(css: CSS, styles: Chain | CSS): CSS {
  return applySelector.call(this, css, '&:active', styles);
}

/**
 * Applies styles to the ::before pseudo-element.
 *
 * @param css - The current CSS object
 * @param styles - Styles to apply to ::before, either a View or CSS object
 * @returns Updated Chain with ::before styles
 *
 * @example
 * onBefore(View().content('"→"').marginRight(5))
 * // Applies: { '&::before': { content: '"→"', marginRight: 5 } }
 */
function applyBefore(css: CSS, styles: Chain | CSS): Chain {
  return applySelector(css, '&::before', styles);
}

/**
 * Applies styles to the ::after pseudo-element.
 *
 * @param css - The current CSS object
 * @param styles - Styles to apply to ::after, either a View or CSS object
 * @returns Updated Chain with ::after styles
 *
 * @example
 * onAfter(View().content('"←"').marginLeft(5))
 * // Applies: { '&::after': { content: '"←"', marginLeft: 5 } }
 */
function applyAfter(css: CSS, styles: Chain | CSS): Chain {
  return applySelector.call(this, css, '&::after', styles);
}

function applySelector(css: CSS, selector: string, styles: Chain | CSS): CSS {
  this.select(selector, styles)

  return {
    ...css,
  };
}
