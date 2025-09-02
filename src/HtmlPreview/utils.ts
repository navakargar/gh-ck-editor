import DOMPurify from 'dompurify';

/**
 * Sanitizes a given DOM string by removing each potentially malicious code.
 *
 * @param {string} dom - The DOM string to sanitize.
 * @param {DOMPurify.Config} [config] - Optional configuration for DOMPurify.
 * @return {string} The sanitized DOM string.
 */
export const domSanitizer = (
  dom: string,
  config?: DOMPurify.Config,
): string | null => {
  const defaultConfig = {
    ALLOWED_TAGS: [
      'p',
      'strong',
      'em',
      'ins',
      'del',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'blockquote',
      'code',
      'pre',
      'span',
      'ul',
      'li',
      'ol',
      'a',
      'div',
      'img',
      'i',
      's',
      'u',
    ],
    FORCE_BODY: true,
    ALLOWED_ATTR: [
      'style',
      'href',
      'target',
      'class',
      'id',
      'src',
      'alt',
      'rel',
    ],
    ADD_TAGS: ['style'],
    FORBID_TAGS: ['br'],
  };
  const sanitized = DOMPurify.sanitize(dom, config ?? defaultConfig).toString();
  return sanitized === '' ? null : sanitized;
};
