<script setup lang="ts">
import { ref } from 'vue'
import { toast } from 'vue-sonner'
import { UploadCloud, FileImage } from 'lucide-vue-next'
import { Badge, Card, CardContent } from '@/components/ui'
import { APP_CONFIG, ERROR_MESSAGES } from '@/lib/constants'
import type { FileUploadEvents } from '@/types'

const emit = defineEmits<FileUploadEvents>()

const files = ref<File[]>([])
const fileInputRef = ref<HTMLInputElement | null>(null)

/**
 * Validates a single file for size and type
 * @param file - The file to validate
 * @returns Error message if invalid, null if valid
 */
const validateFile = (file: File): string | null => {
  if (file.size > APP_CONFIG.MAX_FILE_SIZE) {
    return ERROR_MESSAGES.FILE_TOO_LARGE(file.name)
  }
  
  if (!APP_CONFIG.ALLOWED_TYPES.includes(file.type)) {
    return ERROR_MESSAGES.UNSUPPORTED_FORMAT(file.name)
  }
  
  return null
}

/**
 * Handles file input change event
 * @param event - The change event
 */
const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const selectedFiles = Array.from(target.files || [])
  
  const newValidFiles: File[] = []
  
  selectedFiles.forEach(file => {
    const error = validateFile(file)
    if (error) {
      toast.error('Invalid File', { description: error })
    } else {
      newValidFiles.push(file)
    }
  })

  // Add new files and limit to MAX_FILES
  files.value = [...files.value, ...newValidFiles].slice(0, APP_CONFIG.MAX_FILES)
  emit('files-changed', files.value)
  
  // Reset input value to allow selecting the same file again
  if (target) {
    target.value = ''
  }
}

/**
 * Opens the file selection dialog
 */
const openFileDialog = () => {
  fileInputRef.value?.click()
}

/**
 * Formats file size in bytes to human readable format
 * @param bytes - File size in bytes
 * @returns Formatted file size string
 */
const formatFileSize = (bytes: number): string => {
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
}
</script>

<template>
  <div class="space-y-8">
    <!-- Upload Area -->
    <Card 
      @click="openFileDialog" 
      class="bg-white border-2 border-dashed border-border/50 p-8 sm:p-12 text-center cursor-pointer hover:border-primary/50 transition-all duration-200 group focus-ring rounded-xl"
      tabindex="0"
      @keydown.enter="openFileDialog"
      @keydown.space="openFileDialog"
    >
      <CardContent class="p-0">
        <input 
          ref="fileInputRef" 
          type="file" 
          multiple 
          :accept="APP_CONFIG.ALLOWED_TYPES.join(',')" 
          @change="handleFileChange" 
          class="hidden" 
        />
        <div class="flex flex-col items-center space-y-6">
          <div class="p-6 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors ring-1 ring-primary/20">
            <UploadCloud class="h-12 w-12 sm:h-14 sm:w-14 text-primary" />
          </div>
          <div class="space-y-3">
            <p class="text-lg sm:text-xl font-semibold text-spacing-tight console-text">
              <span class="text-primary console-accent">Click to upload</span> or drag and drop
            </p>
            <p class="text-sm sm:text-base text-muted-foreground text-spacing console-text">
              JPG, PNG, WEBP, or GIF (max 15MB each)
            </p>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Selected Files List -->
    <div v-if="files.length > 0" class="space-y-6 ">
      <div class="flex items-center justify-between">
        <h4 class="text-base font-semibold text-foreground console-text">Selected Images</h4>
        <Badge variant="secondary" class="text-sm px-3 py-1">
          {{ files.length }} file{{ files.length > 1 ? 's' : '' }}
        </Badge>
      </div>
      
      <div class="grid gap-4 bg-white">
        <div 
          v-for="(file, index) in files" 
          :key="index" 
          class="flex items-center gap-4 p-4 rounded-xl border bg-white hover:bg-gray-100 transition-colors"
        >
          <div class="p-3 rounded-lg  ring-1 ring-primary/20">
            <FileImage class="h-5 w-5 text-primary" />
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-foreground truncate console-text">{{ file.name }}</p>
            <p class="text-xs text-muted-foreground mt-1 console-text">{{ formatFileSize(file.size) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
