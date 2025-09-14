<script setup lang="ts">
import HomeView from './views/HomeView.vue'
import { Toaster } from 'vue-sonner'
</script>

<template>
  <div class="min-h-screen bg-black text-white font-mono antialiased flex items-center justify-center p-4">
    <HomeView />
    <Toaster 
      position="top-right" 
      :toast-options="{
        class: 'terminal-toast',
        style: {
          background: '#ffffff',
          color: '#000000',
          border: '1px solid #cccccc',
          fontFamily: 'JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace',
          fontSize: '14px',
          borderRadius: '8px',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
        }
      }"
      :theme="'light'"
    />
  </div>
</template>

<style>
html {
  background-color: #000000;
}

/* Custom Sonner toast styling */
:root {
  --toast-bg: #ffffff;
  --toast-color: #000000;
  --toast-border: #cccccc;
}

.terminal-toast {
  background: var(--toast-bg) !important;
  color: var(--toast-color) !important;
  border: 1px solid var(--toast-border) !important;
  font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace !important;
  font-size: 14px !important;
  border-radius: 8px !important;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
}

.terminal-toast [data-sonner-toast] {
  background: var(--toast-bg) !important;
  color: var(--toast-color) !important;
  border: 1px solid var(--toast-border) !important;
}

.terminal-toast [data-sonner-toast][data-type="success"] {
  border-left: 4px solid #008000 !important;
}

.terminal-toast [data-sonner-toast][data-type="error"] {
  border-left: 4px solid #ff0000 !important;
}

.terminal-toast [data-sonner-toast][data-type="warning"] {
  border-left: 4px solid #ffaa00 !important;
}

.terminal-toast [data-sonner-toast][data-type="info"] {
  border-left: 4px solid #0066cc !important;
}
</style>
