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
  Button,
  ScrollArea
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
 * Applies syntax highlighting to XML content with terminal colors
 */
const highlightedXml = computed(() => {
  if (!props.xmlResult) return ''
  
  return props.xmlResult
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/(&lt;\/?)(\w+)(.*?)(\/?&gt;)/g, (match, p1, p2, p3, p4) => {
      // Highlight attributes with terminal colors
      const attributes = p3.replace(/(\w+)=(".*?")/g, '<span class="text-terminal-accent">$1</span>=<span class="text-terminal-warning">$2</span>')
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
      <Button variant="outline" class="w-full sm:w-auto bg-white text-black border-gray-300 hover:bg-gray-50 font-mono">
        View Generated Profile
      </Button>
    </DrawerTrigger>
    
    <DrawerContent class="h-[85vh] bg-white border-gray-300">
      <!-- Terminal Title Bar -->
      <div class="bg-gray-100 border-b border-gray-300 flex items-center px-4 py-2">
        <div class="flex space-x-2 mr-4">
          <div class="w-3 h-3 rounded-full bg-red-500" />
          <div class="w-3 h-3 rounded-full bg-yellow-500" />
          <div class="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div class="text-gray-600 text-sm font-mono">
          aura@localhost:~/analysis
        </div>
      </div>

      <div class="p-4 h-full flex flex-col max-w-4xl mx-auto w-full bg-white">
        <DrawerHeader class="text-left">
          <DrawerTitle class="text-2xl text-black font-mono">
            Visual Style Profile
          </DrawerTitle>
          <DrawerDescription class="text-gray-600 font-mono">
            A prescriptive XML recipe for recreating this image's aesthetic.
          </DrawerDescription>
        </DrawerHeader>
        
        <!-- XML Content Display -->
        <div class="flex-grow my-4 overflow-hidden rounded-lg border border-gray-300 bg-white">
          <ScrollArea class="h-full">
            <pre class="bg-white p-4 sm:p-6 text-sm text-black">
              <code 
                class="font-mono whitespace-pre-wrap" 
                v-html="highlightedXml"
              ></code>
            </pre>
          </ScrollArea>
        </div>
        
        <!-- Footer Actions -->
        <DrawerFooter class="bg-white">
          <div class="flex flex-col sm:flex-row gap-4">
            <Button 
              @click="copyXml" 
              class="w-full bg-black text-white hover:bg-gray-800 border border-gray-300 font-mono"
            >
              <ClipboardCopy class="h-4 w-4 mr-2"/>
              {{ copied ? 'Copied!' : 'cp analysis.xml' }}
            </Button>
            <DrawerClose as-child>
              <Button variant="outline" class="w-full bg-white text-black border-gray-300 hover:bg-gray-50 font-mono">
                Close
              </Button>
            </DrawerClose>
          </div>
        </DrawerFooter>
      </div>
    </DrawerContent>
  </Drawer>
</template>
