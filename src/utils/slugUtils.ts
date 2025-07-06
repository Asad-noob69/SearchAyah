/**
 * Converts a string to a URL-friendly slug
 * Handles Arabic, Latin and other characters
 * @param text The text to convert to a slug
 * @returns URL-friendly slug
 */
export function createSlug(text: string): string {
  if (!text) return '';
  
  // Handle Arabic and special characters with transliteration map
  const arabicToEnglishMap: { [key: string]: string } = {
    'أ': 'a', 'إ': 'i', 'آ': 'a', 'ء': 'a',
    'ب': 'b', 'ت': 't', 'ث': 'th',
    'ج': 'j', 'ح': 'h', 'خ': 'kh',
    'د': 'd', 'ذ': 'th', 'ر': 'r',
    'ز': 'z', 'س': 's', 'ش': 'sh',
    'ص': 's', 'ض': 'd', 'ط': 't',
    'ظ': 'z', 'ع': 'a', 'غ': 'gh',
    'ف': 'f', 'ق': 'q', 'ك': 'k',
    'ل': 'l', 'م': 'm', 'ن': 'n',
    'ه': 'h', 'و': 'w', 'ي': 'y',
    'ة': 'a', 'ى': 'a', 'ؤ': 'o',
    'ئ': 'e', 'ا': 'a',
    // Common ligatures and diacritics
    'ﻻ': 'la', 'ﷲ': 'allah',
    'ّ': '', 'َ': '', 'ً': '', 
    'ُ': '', 'ٌ': '', 'ِ': '', 
    'ٍ': '', 'ْ': '', 'ـ': ''
  };
  
  // Transliterate Arabic characters
  const transliterated = [...text].map(char => 
    arabicToEnglishMap[char] || char
  ).join('');
  
  return transliterated
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim(); // Trim leading/trailing whitespace
}

/**
 * Gets the original ID from a slug if it contains an ID pattern at the end
 * Format: slug-id (e.g., "al-hidayah-60f1a2b3c4d5e6f7g8h9i0j1")
 * @param slug The slug that may contain an ID
 * @returns The extracted ID or null if not found
 */
export function getIdFromSlug(slug: string): string | null {
  // Match MongoDB ObjectId pattern (24 hex characters) at the end of the slug
  const match = slug.match(/-([0-9a-f]{24})$/);
  return match ? match[1] : null;
}

/**
 * Creates a slug with the ID appended for uniqueness
 * @param title The title to slugify
 * @param id The ID to append
 * @returns A slug in the format "title-slug-id"
 */
export function createSlugWithId(title: string, id: string): string {
  const baseSlug = createSlug(title);
  return `${baseSlug}`;
}
