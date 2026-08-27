/**
 * Memory Match Arena - DOM & Helper Utilities
 */

/**
 * Safely query selector element
 * @param {string} selector 
 * @param {HTMLElement} parent 
 * @returns {HTMLElement|null}
 */
export function $(selector, parent = document) {
  return parent.querySelector(selector);
}

/**
 * Safely query selector all elements
 * @param {string} selector 
 * @param {HTMLElement} parent 
 * @returns {HTMLElement[]}
 */
export function $$(selector, parent = document) {
  return Array.from(parent.querySelectorAll(selector));
}

/**
 * Create DOM element with attributes and children
 * @param {string} tag 
 * @param {Object} attrs 
 * @param {string|HTMLElement|Array} children 
 * @returns {HTMLElement}
 */
export function createElement(tag, attrs = {}, children = null) {
  const el = document.createElement(tag);
  Object.entries(attrs).forEach(([key, value]) => {
    if (key === 'className') {
      el.className = value;
    } else if (key === 'dataset') {
      Object.entries(value).forEach(([dKey, dVal]) => {
        el.dataset[dKey] = dVal;
      });
    } else if (key.startsWith('on') && typeof value === 'function') {
      const eventName = key.slice(2).toLowerCase();
      el.addEventListener(eventName, value);
    } else {
      el.setAttribute(key, value);
    }
  });

  if (children !== null) {
    if (Array.isArray(children)) {
      children.forEach(child => {
        if (typeof child === 'string') {
          el.appendChild(document.createTextNode(child));
        } else if (child instanceof HTMLElement) {
          el.appendChild(child);
        }
      });
    } else if (typeof children === 'string') {
      el.innerHTML = children;
    } else if (children instanceof HTMLElement) {
      el.appendChild(children);
    }
  }

  return el;
}
