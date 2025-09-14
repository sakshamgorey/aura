import { ref } from 'vue'
import { toast } from 'vue-sonner'
import { APP_CONFIG, ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/lib/constants'

export function useFileAnalysis() {
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

  return {
    files,
    isLoading,
    analysisResult,
    isDrawerOpen,
    handleFilesChanged,
    handleAnalyze
  }
}
