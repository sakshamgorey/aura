<script setup lang="ts">
import { ref } from 'vue'
import { toast } from 'vue-sonner'
import { Loader2, Wand2 } from 'lucide-vue-next'
import FileUpload from '@/components/FileUpload.vue'
import AnalysisDrawer from '@/components/AnalysisDrawer.vue'
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui'
import { APP_CONFIG, ERROR_MESSAGES, SUCCESS_MESSAGES, UI_TEXT } from '@/lib/constants'

// Reactive state
const files = ref<File[]>([])
const isLoading = ref(false)
const analysisResult = ref<string | null>(null)
const isDrawerOpen = ref(false)

/**
 * Handles file changes from FileUpload component
 * @param newFiles - Array of selected files
 */
const handleFilesChanged = (newFiles: File[]) => {
  files.value = newFiles
}

/**
 * Handles the analysis process
 */
const handleAnalyze = async () => {
  if (files.value.length === 0) {
    toast.error(ERROR_MESSAGES.NO_IMAGES, { 
      description: ERROR_MESSAGES.NO_IMAGES_DESCRIPTION 
    })
    return
  }

  isLoading.value = true
  analysisResult.value = null

  try {
    const formData = new FormData()
    files.value.forEach(file => formData.append('files', file))

    const response = await fetch(APP_CONFIG.API_ENDPOINT, {
      method: 'POST',
      body: formData
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || `HTTP error! Status: ${response.status}`)
    }

    const xmlData = await response.text()
    analysisResult.value = xmlData
    isDrawerOpen.value = true
    
    toast.success(SUCCESS_MESSAGES.ANALYSIS_COMPLETE, { 
      description: SUCCESS_MESSAGES.ANALYSIS_COMPLETE_DESCRIPTION 
    })

  } catch (err: any) {
    console.error('Analysis error:', err)
    toast.error('Analysis Failed', { description: err.message })
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <Card class="w-full max-w-2xl mx-auto">
    <CardHeader class="text-center space-y-3">
      <Wand2 class="mx-auto h-10 w-10 text-primary" />
      <CardTitle class="text-3xl font-bold tracking-tight">{{ UI_TEXT.APP_TITLE }}</CardTitle>
      <CardDescription class="max-w-md mx-auto">
        {{ UI_TEXT.APP_DESCRIPTION }}
      </CardDescription>
    </CardHeader>

    <CardContent class="space-y-8">
      <!-- File Upload Section -->
      <FileUpload @files-changed="handleFilesChanged" />

      <!-- Action Section -->
      <div class="flex flex-col items-center gap-4">
        <Button 
          @click="handleAnalyze" 
          :disabled="isLoading || files.length === 0" 
          size="lg" 
          class="w-full sm:w-auto text-base px-10 py-6"
        >
          <Loader2 v-if="isLoading" class="mr-2 h-5 w-5 animate-spin" />
          {{ isLoading ? UI_TEXT.ANALYZING : UI_TEXT.GENERATE_PROFILE }}
        </Button>

        <!-- Analysis Results Drawer -->
        <AnalysisDrawer 
          v-if="analysisResult" 
          v-model:open="isDrawerOpen" 
          :xml-result="analysisResult" 
        />
      </div>
    </CardContent>
  </Card>
</template>
