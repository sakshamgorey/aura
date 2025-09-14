<script setup lang="ts">
import { inject, type Ref } from 'vue'

interface SheetTriggerProps {
  asChild?: boolean
}

interface SheetContext {
  isOpen: Ref<boolean>
  openSheet: () => void
  closeSheet: () => void
  toggleSheet: () => void
}

const props = withDefaults(defineProps<SheetTriggerProps>(), {
  asChild: false
})

const sheetContext = inject<SheetContext>('sheetContext')

const handleClick = () => {
  if (sheetContext) {
    sheetContext.toggleSheet()
  }
}
</script>

<template>
  <component 
    :is="asChild ? 'div' : 'button'"
    @click="handleClick"
    :class="asChild ? '' : 'cursor-pointer'"
  >
    <slot />
  </component>
</template>
