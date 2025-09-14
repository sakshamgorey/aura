<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

interface Props {
  class?: string
}

const props = withDefaults(defineProps<Props>(), {})

const classes = computed(() => 
  cn('mt-auto flex flex-col gap-2 p-4', props.class)
)
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
