/**
 * File validation result
 */
export interface FileValidationResult {
  isValid: boolean
  error?: string
}

/**
 * Visual profile XML structure
 */
export interface VisualProfile {
  id: string
  summary: string
  promptKeywords: {
    keywords: string
  }
  composition: {
    type: string
    subjectPlacement: string
    perspective: {
      angle: string
    }
    framing: {
      type: string
    }
    leadingLines: string
  }
  lighting: {
    style: string
    quality: string
    direction: string
    temperature: {
      kelvin: string
    }
    mood: string
  }
  color: {
    dominantPalette: {
      hex: string[]
    }
    harmony: {
      type: string
    }
    mood: string
  }
  cameraSettings: {
    aperture: string
    shutterSpeed: string
    iso: string
    focalLength: string
    depthOfField: string
  }
  postProcessing: {
    vignette: {
      strength: string
    }
    grain: {
      type: string
    }
    contrast: {
      level: string
    }
    saturation: {
      level: string
    }
    sharpening: {
      level: string
    }
  }
}

/**
 * API response types
 */
export interface ApiErrorResponse {
  error: string
}

/**
 * Button component props
 */
export interface ButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  disabled?: boolean
  class?: string
  as?: string
  asChild?: boolean
}

/**
 * Badge component props
 */
export interface BadgeProps {
  variant?: 'default' | 'secondary'
  class?: string
}

/**
 * File upload component events
 */
export interface FileUploadEvents {
  'files-changed': (files: File[]) => void
}

/**
 * Analysis drawer component props
 */
export interface AnalysisDrawerProps {
  xmlResult: string | null
  open: boolean
}

/**
 * Analysis drawer component events
 */
export interface AnalysisDrawerEvents {
  'update:open': (open: boolean) => void
}
