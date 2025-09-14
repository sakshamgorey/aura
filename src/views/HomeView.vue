<script setup lang="ts">
import { ref } from 'vue'
import { toast } from 'vue-sonner'
import { Loader2, Wand2 } from 'lucide-vue-next'
import FileUpload from '@/components/FileUpload.vue'
import AnalysisDrawer from '@/components/AnalysisDrawer.vue'
import TerminalWindow from '@/components/TerminalWindow.vue'
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
  <div class="min-h-screen bg-black text-white font-mono p-4">
    <div class="max-w-6xl mx-auto">
      <TerminalWindow title="aura@localhost:~/writing-profiler">
        <div class="space-y-8">
          <!-- Terminal Header -->
          <div class="text-center space-y-4">
            <div class="flex items-center justify-center space-x-2">
              <Wand2 class="h-8 w-8 text-white" />
              <h1 class="text-4xl font-bold text-white animate-terminal-glow">
                {{ UI_TEXT.APP_TITLE }}
              </h1>
            </div>
            <p class="text-gray-300 max-w-2xl mx-auto leading-relaxed">
              {{ UI_TEXT.APP_DESCRIPTION }}
            </p>
          </div>

          <!-- Command Line Interface -->
          <div class="space-y-6">
            <!-- Command Prompt -->
            <div class="text-white text-lg">
              <span class="text-terminal-accent">$</span> upload_files
            </div>

            <!-- File Upload Section -->
            <FileUpload @files-changed="handleFilesChanged" />

            <!-- Execute Button -->
            <div class="text-center">
              <Button 
                @click="handleAnalyze" 
                :disabled="isLoading || files.length === 0" 
                size="lg" 
                class="bg-black text-white hover:bg-gray-800 border border-gray-300 font-mono text-base px-8 py-4 transition-all duration-200 hover:shadow-lg"
              >
                <Loader2 v-if="isLoading" class="mr-2 h-5 w-5 animate-spin" />
                {{ isLoading ? UI_TEXT.ANALYZING : './analyze --execute' }}
              </Button>
            </div>

            <!-- Analysis Results Drawer -->
            <div class="text-center">
              <AnalysisDrawer 
                v-if="analysisResult" 
                v-model:open="isDrawerOpen" 
                :xml-result="analysisResult" 
              />
            </div>
          </div>
        </div>
      </TerminalWindow>
    </div>
  </div>
</template>
