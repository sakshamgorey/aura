<script setup lang="ts">
interface SheetDescriptionProps {
  class?: string
}
</script>

<template>
  <p :class="['text-sm text-slate-500', $props.class]">
    <slot />
  </p>
</template>
