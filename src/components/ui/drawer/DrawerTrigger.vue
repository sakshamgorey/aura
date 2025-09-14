<script setup lang="ts">
import { inject } from 'vue'

const drawer = inject('drawer') as any

const handleClick = () => {
  if (drawer) {
    drawer.openDrawer()
  }
}
</script>

<template>
  <div @click="handleClick">
    <slot />
  </div>
</template>
