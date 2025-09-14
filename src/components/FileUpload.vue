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
  <div class="space-y-4">
    <!-- Upload Area -->
    <Card 
      @click="openFileDialog" 
      class="border-2 border-dashed border-gray-400 p-8 text-center cursor-pointer hover:border-white transition-colors group bg-white"
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
        <UploadCloud class="mx-auto h-12 w-12 text-gray-400 group-hover:text-black transition-colors" />
        <p class="mt-4 text-black font-mono">
          <span class="font-semibold text-black">Click to upload</span> or drag and drop
        </p>
        <p class="text-xs text-gray-500 mt-1 font-mono">JPG, PNG, WEBP, or GIF (max 15MB)</p>
      </CardContent>
    </Card>

    <!-- Selected Files List -->
    <div v-if="files.length > 0" class="space-y-3">
      <h4 class="text-sm font-medium text-white font-mono">Selected Images:</h4>
      <ul class="space-y-2">
        <li 
          v-for="(file, index) in files" 
          :key="index" 
          class="flex items-center justify-between text-sm"
        >
          <Card class="flex-1 bg-white border-gray-300">
            <CardContent class="p-3">
              <div class="flex items-center gap-3 truncate">
                <FileImage class="h-5 w-5 flex-shrink-0 text-gray-400" />
                <span class="text-black truncate font-mono">{{ file.name }}</span>
              </div>
            </CardContent>
          </Card>
          <Badge variant="secondary" class="ml-2 bg-gray-100 text-black border-gray-300 font-mono">{{ formatFileSize(file.size) }}</Badge>
        </li>
      </ul>
    </div>
  </div>
</template>
