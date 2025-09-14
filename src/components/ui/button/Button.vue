<script setup lang="ts">
import { computed } from 'vue'
import { buttonVariants, type ButtonVariants } from './button'
import { cn } from '@/lib/utils'

interface Props extends /* @vue-ignore */ ButtonVariants {
  disabled?: boolean
  class?: string
  as?: string
  asChild?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'default',
  disabled: false,
  as: 'button',
  asChild: false,
})

const classes = computed(() => 
  cn(buttonVariants({ variant: props.variant, size: props.size }), props.class)
)
</script>

<template>
  <component
    :is="as"
    :class="classes"
    :disabled="disabled"
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>
