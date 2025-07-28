/**
 * Security utilities for safe HTML rendering
 * 
 * This module provides safer alternatives to dangerouslySetInnerHTML
 * to prevent XSS attacks while still allowing specific formatting.
 */

/**
 * A simple HTML sanitizer that only allows specific safe tags
 * This is a basic implementation to prevent XSS while preserving formatting
 */
export const sanitizeHtml = (html: string): string => {
  // Simple regex-based sanitization for basic HTML tags
  // Only allow <b>, </b>, <strong>, </strong>
  const allowedPattern = /<\/?(?:b|strong)>/gi;
  
  // Remove all HTML tags except the allowed ones
  let sanitized = html.replace(/<[^>]*>/g, (match) => {
    return allowedPattern.test(match) ? match : '';
  });
  
  return sanitized;
};

/**
 * Creates safe HTML props for React components
 */
export const createSafeHtmlProps = (html: string) => {
  const sanitizedHtml = sanitizeHtml(html);
  return {
    dangerouslySetInnerHTML: { __html: sanitizedHtml }
  };
};

/**
 * Validates language codes to prevent injection attacks
 */
export const validateLanguageCode = (code: string): boolean => {
  // Only allow 2-letter lowercase language codes
  return /^[a-z]{2}$/.test(code);
};

/**
 * Sanitizes user input to prevent XSS in general text inputs
 */
export const sanitizeTextInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
};