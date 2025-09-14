<script setup lang="ts">
import { computed } from 'vue'

interface ScrollAreaProps {
  class?: string
}

const props = defineProps<ScrollAreaProps>()

const classes = computed(() => [
  'relative overflow-hidden',
  props.class
])
</script>

<template>
  <div :class="classes">
    <div class="h-full w-full rounded-[inherit] overflow-auto">
      <slot />
    </div>
    <!-- Custom scrollbar styling -->
    <div class="absolute right-0 top-0 h-full w-2.5 border-l border-l-transparent p-[1px]">
      <div class="relative flex-1 rounded-full bg-border"></div>
    </div>
  </div>
</template>
