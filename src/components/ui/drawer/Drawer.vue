<script setup lang="ts">
import { provide, ref, watch } from 'vue'

interface Props {
  open?: boolean
  shouldScaleBackground?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  open: false,
  shouldScaleBackground: true
})

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const isOpen = ref(props.open)

watch(() => props.open, (newValue) => {
  isOpen.value = newValue
})

watch(isOpen, (newValue) => {
  emit('update:open', newValue)
})

const openDrawer = () => {
  isOpen.value = true
}

const closeDrawer = () => {
  isOpen.value = false
}

provide('drawer', {
  isOpen,
  openDrawer,
  closeDrawer,
  shouldScaleBackground: props.shouldScaleBackground
})
</script>

<template>
  <div>
    <slot />
  </div>
</template>
