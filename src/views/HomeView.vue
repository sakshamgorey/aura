<script setup lang="ts">
import { Loader2, Wand2 } from 'lucide-vue-next'
import FileUpload from '@/components/forms/FileUpload.vue'
import AnalysisDrawer from '@/components/layout/AnalysisDrawer.vue'
import AppLayout from '@/components/layout/AppLayout.vue'
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui'
import { UI_TEXT } from '@/lib/constants'
import { useFileAnalysis } from '@/composables/useFileAnalysis'

// Use the file analysis composable
const {
  files,
  isLoading,
  analysisResult,
  isDrawerOpen,
  handleFilesChanged,
  handleAnalyze
} = useFileAnalysis()
</script>

<template>
  <AppLayout 
    :title="UI_TEXT.APP_TITLE" 
    :description="UI_TEXT.APP_DESCRIPTION"
  >
  

    <!-- Terminal UI Card -->
    <div class="terminal-window animate-fade-in">
      <!-- Terminal Header Bar -->
      <div class="terminal-header">
        <div class="terminal-controls">
          <div class="terminal-button terminal-button-close"></div>
          <div class="terminal-button terminal-button-minimize"></div>
          <div class="terminal-button terminal-button-maximize"></div>
        </div>
        <div class="terminal-title console-text">
          <span class="console-prompt">vani2@terminal:</span>~/upload-analyze
        </div>
      </div>
      
      <!-- Terminal Body -->
      <div class="terminal-body">
        <!-- Terminal Content -->
        <div class="terminal-content">
          <!-- Command Line Interface -->
          <div class="terminal-cli">
            <div class="terminal-line">
              <span class="console-prompt">./upload-analyze --help</span>
            </div>
            <div class="terminal-output">
              <div class="console-text text-gray-700">Usage: upload-analyze [options]</div>
              <div class="console-text text-gray-700">Select your images to generate a visual style profile</div>
            </div>
          </div>

          <!-- File Upload Section -->
          <div class="terminal-section">
            <div class="terminal-line">
              <span class="console-prompt">./upload-analyze --input</span>
            </div>
            <div class="terminal-upload-area">
              <FileUpload @files-changed="(files: File[]) => handleFilesChanged(files)" />
            </div>
          </div>

          <!-- Action Button -->
          <div class="terminal-section">
            <div class="terminal-line">
              <span class="console-prompt">./upload-analyze --execute</span>
            </div>
            <div class="terminal-action">
              <Button 
                @click="handleAnalyze" 
                :disabled="isLoading || files.length === 0" 
                size="lg" 
                class="terminal-button-execute w-full sm:w-auto min-w-[240px] h-12 text-base font-medium focus-ring console-text"
              >
                <Loader2 v-if="isLoading" class="mr-2 h-5 w-5 animate-spin" />
                {{ isLoading ? UI_TEXT.ANALYZING : 'Execute Analysis' }}
              </Button>
            </div>
          </div>

          <!-- Analysis Results -->
          <div v-if="analysisResult" class="terminal-section">
            <div class="terminal-line">
              <span class="console-prompt">./upload-analyze --results</span>
            </div>
            <div class="terminal-results">
              <AnalysisDrawer 
                v-model:open="isDrawerOpen" 
                :xml-result="analysisResult" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>
