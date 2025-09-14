<script setup lang="ts">
import { provide, ref, watch, onMounted } from 'vue'

interface SheetProps {
  open?: boolean
  defaultOpen?: boolean
}

const props = withDefaults(defineProps<SheetProps>(), {
  open: undefined,
  defaultOpen: false
})

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const isOpen = ref(false) // Always start closed

// Initialize state on mount
onMounted(() => {
  isOpen.value = false
})

// Watch for prop changes
watch(() => props.open, (newVal) => {
  if (newVal !== undefined) {
    isOpen.value = newVal
  }
})

// Watch for internal state changes
watch(isOpen, (newVal) => {
  emit('update:open', newVal)
})

const openSheet = () => {
  isOpen.value = true
}

const closeSheet = () => {
  isOpen.value = false
}

const toggleSheet = () => {
  isOpen.value = !isOpen.value
}

// Provide context to child components
provide('sheetContext', {
  isOpen,
  openSheet,
  closeSheet,
  toggleSheet
})
</script>

<template>
  <slot />
</template>
