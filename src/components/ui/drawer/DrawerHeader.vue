<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

interface Props {
  class?: string
}

const props = withDefaults(defineProps<Props>(), {})

const classes = computed(() => 
  cn('grid gap-1.5 p-4 text-center sm:text-left', props.class)
)
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
