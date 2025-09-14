<script setup lang="ts">
import HomeView from './views/HomeView.vue'
import { Toaster } from 'vue-sonner'
</script>

<template>
  <div class="min-h-screen bg-white text-foreground font-sans antialiased flex items-center justify-center p-4" style="background-color: #ffffff !important;">
    <HomeView />
    <Toaster position="top-right" richColors />
  </div>
</template>

<style>
html {
  background-color: hsl(var(--background));
}
</style>
