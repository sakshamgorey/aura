<script setup lang="ts">
interface SheetHeaderProps {
  class?: string
}
</script>

<template>
  <div :class="['flex flex-col space-y-2 text-center sm:text-left', $props.class]">
    <slot />
  </div>
</template>
