import { CSS } from "@stitches/react";
import { Chain, MethodRegistrar } from "./chain";

export type SelectorFunction = (styles: Chain | CSS) => CSS;

export type Methods = {
  onHover: SelectorFunction;
  onFocus: SelectorFunction;
  onActive: SelectorFunction;
  before: SelectorFunction;
  after: SelectorFunction;
  select: (styles: Chain | CSS, selector: string) => CSS;
  attr: (styles: Chain | CSS, attributeName: string, options?: AttrSelectorOptions) => CSS;
};

export function register(method: MethodRegistrar) {
  method("onHover", applyHover);
  method("onFocus", applyFocus);
  method("onActive", applyActive);
  method("before", applyBefore);
  method("after", applyAfter);
  method("attr", applyAttr);
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
function applyBefore(css: CSS, styles: Chain | CSS): CSS {
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
function applyAfter(css: CSS, styles: Chain | CSS): CSS {
  return applySelector.call(this, css, '&::after', styles);
}

function applySelector(css: CSS, selector: string, styles: Chain | CSS): CSS {
  this.select(selector, styles)

  return {
    ...css,
  };
}


type AttrSelectorOptions = {
  eq?: string;
  contains?: string;
  startsWith?: string;
  endsWith?: string;
  includes?: string;
  dashMatch?: string;
  caseSensitive?: boolean;
};


/**
 * Applies an attribute selector to the given CSS object.
 *
 * This function creates a CSS selector based on an attribute name and optional constraints.
 * It supports all standard CSS attribute selector syntaxes, including presence, exact match,
 * substring match, prefix match, suffix match, word match, and hyphen-separated prefix match.
 *
 * @param css - The current CSS object to which the attribute selector will be added.
 * @param attrName - The name of the attribute to select.
 * @param options - Optional. An object specifying the type of attribute selection to perform.
 *   - eq: Exact match (=)
 *   - contains: Substring match (*)
 *   - startsWith: Prefix match (^)
 *   - endsWith: Suffix match ($)
 *   - includes: Whitespace-separated word match (~=)
 *   - dashMatch: Hyphen-separated prefix match (|=)
 *   - caseSensitive: Boolean to specify case sensitivity (defaults to true)
 *
 * @returns A new CSS object with the applied attribute selector.
 *
 * @example
 * // Simple attribute presence
 * applyAttr({}, "title", View().fg('blue'))
 * // Output: { '&[title]': { color: 'blue' } }
 *
 * @example
 * // Exact match
 * applyAttr({}, "href", { eq: "https://example.org" }, View().bg('red'))
 * // Output: { '&[href="https://example.org"]': { backgroundColor: 'red' } }
 *
 * @example
 * // Substring match
 * applyAttr({}, "data-value", { contains: "example" }, View().bg('yellow'))
 * // Output: { '&[data-value*="example"]': { backgroundColor: 'yellow' } }
 *
 */
function applyAttr(css: CSS, attrName: string, optionsOrChain: AttrSelectorOptions | Chain | CSS, chainOrRawStyle?: Chain | CSS): CSS {
  let options: AttrSelectorOptions | undefined = optionsOrChain;
  let styles = chainOrRawStyle;

  if (arguments.length === 3) {
    options = undefined
    styles = optionsOrChain as Chain | CSS
  }

  let selector = `&[${attrName}`;

  if (options) {
    if (options.eq !== undefined) {
      selector += `="${options.eq}"`;
    } else if (options.contains !== undefined) {
      selector += `*="${options.contains}"`;
    } else if (options.startsWith !== undefined) {
      selector += `^="${options.startsWith}"`;
    } else if (options.endsWith !== undefined) {
      selector += `$="${options.endsWith}"`;
    } else if (options.includes !== undefined) {
      selector += `~="${options.includes}"`;
    } else if (options.dashMatch !== undefined) {
      selector += `|="${options.dashMatch}"`;
    }

    if (options.caseSensitive !== undefined) {
      selector += options.caseSensitive ? ' s' : ' i';
    }
  }

  selector += ']';

  this.select(selector, styles);

  return css
}
