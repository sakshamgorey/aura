<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerFooter,
  DrawerClose,
  Button
} from '@/components/ui'
import { toast } from 'vue-sonner'
import { ClipboardCopy } from 'lucide-vue-next'
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from '@/lib/constants'
import type { AnalysisDrawerProps, AnalysisDrawerEvents } from '@/types'

const props = defineProps<AnalysisDrawerProps>()
const emit = defineEmits<AnalysisDrawerEvents>()

const isDrawerOpen = ref(props.open)
const copied = ref(false)

// Watch for prop changes and update local state
watch(() => props.open, (newVal) => {
  isDrawerOpen.value = newVal
})

// Watch for local state changes and emit to parent
watch(isDrawerOpen, (newVal) => {
  emit('update:open', newVal)
})

/**
 * Applies syntax highlighting to XML content
 */
const highlightedXml = computed(() => {
  if (!props.xmlResult) return ''
  
  return props.xmlResult
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/(&lt;\/?)(\w+)(.*?)(\/?&gt;)/g, (match, p1, p2, p3, p4) => {
      // Highlight attributes with light theme colors
      const attributes = p3.replace(/(\w+)=(".*?")/g, '<span class="text-green-600">$1</span>=<span class="text-amber-600">$2</span>')
      return `<span class="text-gray-500">${p1}</span><span class="text-blue-600">${p2}</span>${attributes}<span class="text-gray-500">${p4}</span>`
    })
})

/**
 * Copies XML content to clipboard
 */
const copyXml = async () => {
  if (!props.xmlResult) return
  
  try {
    await navigator.clipboard.writeText(props.xmlResult)
    copied.value = true
    toast.success(SUCCESS_MESSAGES.XML_COPIED)
    
    // Reset copied state after 2 seconds
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy XML:', err)
    toast.error(ERROR_MESSAGES.COPY_FAILED)
  }
}
</script>

<template>
  <Drawer v-model:open="isDrawerOpen">
    <DrawerTrigger as-child>
      <Button variant="outline" class="w-full sm:w-auto focus-ring">
        View Generated Profile
      </Button>
    </DrawerTrigger>
    
    <DrawerContent class="h-[90vh] sm:h-[85vh]">
      <div class="minimal-container h-full flex flex-col">
        <DrawerHeader class="text-center pb-6">
          <DrawerTitle class="text-2xl sm:text-3xl font-semibold text-spacing-tight console-heading">
            Visual Style Profile
          </DrawerTitle>
          <DrawerDescription class="text-base sm:text-lg text-spacing mt-3 console-text">
            A prescriptive XML recipe for recreating this image's aesthetic.
          </DrawerDescription>
        </DrawerHeader>
        
        <!-- XML Content Display -->
        <div class="flex-grow overflow-hidden xml-content-display">
          <pre class="h-full overflow-auto p-4 sm:p-6 text-sm sm:text-base">
            <code 
              class="font-mono whitespace-pre-wrap text-spacing" 
              v-html="highlightedXml"
            ></code>
          </pre>
        </div>
        
        <!-- Footer Actions -->
        <DrawerFooter class="pt-6">
          <div class="flex flex-col sm:flex-row gap-4">
            <Button @click="copyXml" class="w-full h-11 text-base font-medium focus-ring">
              <ClipboardCopy class="h-4 w-4 mr-2"/>
              {{ copied ? 'Copied!' : 'Copy XML to Clipboard' }}
            </Button>
            <DrawerClose as-child>
              <Button variant="outline" class="w-full h-11 text-base font-medium focus-ring">
                Close
              </Button>
            </DrawerClose>
          </div>
        </DrawerFooter>
      </div>
    </DrawerContent>
  </Drawer>
</template>
