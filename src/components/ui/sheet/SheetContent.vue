<script setup lang="ts">
import { inject, computed, type Ref } from 'vue'
import { X } from 'lucide-vue-next'

interface SheetContentProps {
  side?: 'top' | 'right' | 'bottom' | 'left'
  class?: string
}

interface SheetContext {
  isOpen: Ref<boolean>
  openSheet: () => void
  closeSheet: () => void
  toggleSheet: () => void
}

const props = withDefaults(defineProps<SheetContentProps>(), {
  side: 'right'
})

const sheetContext = inject<SheetContext>('sheetContext')

const sideClasses = computed(() => {
  const baseClasses = 'fixed z-50 gap-4 bg-white p-6 shadow-lg transition ease-in-out'
  
  switch (props.side) {
    case 'top':
      return `${baseClasses} inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top`
    case 'right':
      return `${baseClasses} inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm`
    case 'bottom':
      return `${baseClasses} inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom`
    case 'left':
      return `${baseClasses} inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm`
    default:
      return baseClasses
  }
})

const closeSheet = () => {
  if (sheetContext) {
    sheetContext.closeSheet()
  }
}

const handleOverlayClick = (event: Event) => {
  // Only close if clicking the overlay itself, not its children
  if (event.target === event.currentTarget) {
    closeSheet()
  }
}
</script>

<template>
  <Teleport to="body">
    <!-- Overlay -->
    <div 
      v-if="sheetContext?.isOpen.value"
      class="fixed inset-0 z-50 bg-black/80"
      @click="handleOverlayClick"
    />
    
    <!-- Sheet Content -->
    <div 
      v-if="sheetContext?.isOpen.value"
      :class="[sideClasses, props.class]"
    >
      <!-- Close Button -->
      <button
        @click="closeSheet"
        class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary"
      >
        <X class="h-4 w-4" />
        <span class="sr-only">Close</span>
      </button>
      
      <slot />
    </div>
  </Teleport>
</template>
