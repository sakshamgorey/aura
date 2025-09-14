<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

interface Props {
  class?: string
}

const props = withDefaults(defineProps<Props>(), {})

const classes = computed(() => 
  cn('text-lg font-semibold leading-none tracking-tight', props.class)
)
</script>

<template>
  <h2 :class="classes">
    <slot />
  </h2>
</template>
