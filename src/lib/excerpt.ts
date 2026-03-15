/**
 * Extract plain text content from HTML string
 */
export function stripHtmlTags(html: string): string {
  if (!html) return '';
  
  // Remove all HTML tags using regex
  let text = html;
  
  // Remove script and style tags completely
  text = text.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  text = text.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
  
  // Remove all HTML tags
  text = text.replace(/<[^>]+>/g, '');
  
  // Decode HTML entities
  text = text
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");
  
  // Clean up whitespace
  text = text
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .trim();
  
  return text;
}

/**
 * Generate an excerpt from HTML content by extracting first N words
 * @param html - HTML string content
 * @param wordLimit - Maximum number of words (default: 50)
 * @returns Excerpt string
 */
export function generateExcerpt(html: string, wordLimit: number = 50): string {
  if (!html) return '';
  
  // First, strip all HTML tags to get plain text
  let plainText = stripHtmlTags(html);
  
  if (!plainText) return '';
  
  // Split by whitespace and filter out empty strings
  const words = plainText
    .split(/\s+/)
    .filter(word => word && word.trim().length > 0);
  
  // If text is shorter than word limit, return as is
  if (words.length <= wordLimit) {
    return plainText;
  }
  
  // Take first N words and add ellipsis
  const excerptWords = words.slice(0, wordLimit);
  const excerpt = excerptWords.join(' ') + '...';
  
  return excerpt;
}

/**
 * Convert plain text to formatted HTML with paragraph tags
 * @param text - Plain text string
 * @returns Formatted HTML string
 */
export function convertPlainTextToHtml(text: string): string {
  if (!text) return '';
  
  // Split by double line breaks (paragraphs)
  const paragraphs = text
    .split(/\n\n+/)
    .map(para => para.trim())
    .filter(para => para.length > 0);
  
  // Wrap each paragraph in <p> tags
  const html = paragraphs
    .map(para => {
      // Escape HTML special characters
      const escaped = para
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
      
      return `<p>${escaped}</p>`;
    })
    .join('');
  
  return html;
}

/**
 * Check if a string looks like it already contains HTML
 */
export function isHtml(text: string): boolean {
  return /<[a-z][\s\S]*>/i.test(text);
}
