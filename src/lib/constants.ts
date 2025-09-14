/**
 * Application constants
 */
export const APP_CONFIG = {
  MAX_FILES: 5,
  MAX_FILE_SIZE: 15 * 1024 * 1024, // 15MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  API_ENDPOINT: '/api/analyze',
} as const

/**
 * Error messages
 */
export const ERROR_MESSAGES = {
  NO_IMAGES: 'No images selected',
  NO_IMAGES_DESCRIPTION: 'Please upload at least one image.',
  FILE_TOO_LARGE: (fileName: string) => `File "${fileName}" is too large (max 15MB).`,
  UNSUPPORTED_FORMAT: (fileName: string) => `File "${fileName}" has an unsupported format.`,
  ANALYSIS_FAILED: 'Analysis Failed',
  COPY_FAILED: 'Failed to copy XML.',
  API_KEY_MISSING: 'API key not configured.',
  NO_IMAGES_PROVIDED: 'No images provided.',
} as const

/**
 * Success messages
 */
export const SUCCESS_MESSAGES = {
  ANALYSIS_COMPLETE: 'Analysis Complete',
  ANALYSIS_COMPLETE_DESCRIPTION: 'Your visual profile is ready.',
  XML_COPIED: 'XML profile copied to clipboard!',
} as const

/**
 * UI text constants
 */
export const UI_TEXT = {
  APP_TITLE: 'Aura',
  APP_DESCRIPTION: 'Upload an image to generate a prescriptive XML style profile, perfect for recreating aesthetics with AI.',
  UPLOAD_PROMPT: 'Click to upload',
  UPLOAD_ALTERNATIVE: 'or drag and drop',
  UPLOAD_FORMATS: 'JPG, PNG, WEBP, or GIF (max 15MB)',
  SELECTED_IMAGES: 'Selected Images:',
  GENERATE_PROFILE: 'Generate Profile',
  ANALYZING: 'Analyzing...',
  VIEW_PROFILE: 'View Generated Profile',
  COPY_XML: 'Copy XML to Clipboard',
  COPIED: 'Copied!',
  CLOSE: 'Close',
  VISUAL_PROFILE_TITLE: 'Visual Style Profile',
  VISUAL_PROFILE_DESCRIPTION: 'A prescriptive XML recipe for recreating this image\'s aesthetic.',
} as const
