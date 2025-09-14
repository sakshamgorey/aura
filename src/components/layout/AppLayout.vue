<script setup lang="ts">
import { computed } from 'vue'

interface AppLayoutProps {
  title?: string
  description?: string
  showFooter?: boolean
}

const props = withDefaults(defineProps<AppLayoutProps>(), {
  title: 'Visual Style Profiler',
  description: 'Generate prescriptive XML recipes for image aesthetics',
  showFooter: true
})

const currentYear = computed(() => new Date().getFullYear())
</script>

<template>
  <div class="min-h-screen bg-white text-foreground" style="background-color: #ffffff !important;">
    <div class="minimal-container section-spacing">
      <!-- Header Section -->
      <header class="text-center minimal-spacing animate-fade-in">
        <slot name="header">
          <div class="flex items-center justify-center space-x-4 mb-8">
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance text-spacing-tight console-heading text-black ">
              {{ title }}
            </h1>
          </div>
          <p class="text-muted-foreground text-xl sm:text-2xl max-w-3xl mx-auto text-balance text-spacing console-text text-black">
            {{ description }}
          </p>
        </slot>
      </header>

      <!-- Main Content -->
      <main class="minimal-spacing mt-4">
        <slot />
      </main>

      <!-- Footer -->
      <footer v-if="showFooter" class="text-center mt-16 sm:mt-20">
        <slot name="footer">
          <p class="text-sm text-muted-foreground text-spacing console-text">
            Powered by Google Gemini • Built with Vue & shadcn/ui & Vercel
          </p>
        </slot>
      </footer>
    </div>
  </div>
</template>
