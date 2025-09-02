import DOMPurify from 'dompurify';
/**
 * Sanitizes a given DOM string by removing each potentially malicious code.
 *
 * @param {string} dom - The DOM string to sanitize.
 * @param {DOMPurify.Config} [config] - Optional configuration for DOMPurify.
 * @return {string} The sanitized DOM string.
 */
export declare const domSanitizer: (dom: string, config?: DOMPurify.Config) => string | null;
