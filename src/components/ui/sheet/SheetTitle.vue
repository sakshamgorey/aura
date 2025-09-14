<script setup lang="ts">
interface SheetTitleProps {
  class?: string
}
</script>

<template>
  <h2 :class="['text-lg font-semibold text-slate-950', $props.class]">
    <slot />
  </h2>
</template>
