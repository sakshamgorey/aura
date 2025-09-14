<script setup lang="ts">
import { Button, ScrollArea } from '@/components/ui'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui'
import { Info } from 'lucide-vue-next'

interface TerminalWindowProps {
  title?: string
  showTrafficLights?: boolean
  showInfoButton?: boolean
}

withDefaults(defineProps<TerminalWindowProps>(), {
  title: 'aura@localhost:~/writing-profiler',
  showTrafficLights: true,
  showInfoButton: true
})
</script>

<template>
  <div class="bg-white border border-gray-300 rounded-lg shadow-terminal-lg overflow-hidden font-mono min-h-[80vh]">
    <!-- Terminal Title Bar -->
    <div class="bg-gray-100 border-b border-gray-300 flex items-center px-6 py-3">
      <!-- Traffic Light Buttons -->
      <div v-if="showTrafficLights" class="flex space-x-2 mr-6">
        <button class="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors cursor-pointer" />
        <button class="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors cursor-pointer" />
        <button class="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors cursor-pointer" />
      </div>
      
      <!-- Terminal Title -->
      <div class="text-gray-600 text-sm flex-1 font-mono">
        {{ title }}
      </div>
      
      <!-- Info Button with Sheet -->
      <Sheet v-if="showInfoButton">
        <SheetTrigger as-child>
          <Button 
            variant="ghost" 
            size="sm"
            class="h-8 w-8 p-0 hover:bg-gray-200"
          >
            <Info class="h-4 w-4" />
            <span class="sr-only">Show site information</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" class="w-[400px] sm:w-[540px] bg-white border-l border-gray-300 p-0">
          <SheetHeader class="p-6 pb-4">
            <SheetTitle class="text-black font-mono">About Aura</SheetTitle>
            <SheetDescription class="text-gray-600 font-mono">
              AI-powered writing style profiler
            </SheetDescription>
          </SheetHeader>
          
          <ScrollArea class="flex-1 px-6">
            <div class="grid gap-6 pb-6">
              <div class="space-y-4">
                <h3 class="text-lg font-semibold text-black font-mono">What is Aura?</h3>
                <p class="text-sm text-gray-600 font-mono">
                  Aura is an AI-powered writing style profiler that analyzes text using advanced AI models. 
                  It provides comprehensive literary analysis including diction, syntax, tone, and rhetorical patterns.
                </p>
              </div>
              
              <div class="space-y-4">
                <h3 class="text-lg font-semibold text-black font-mono">How to Use</h3>
                <div class="space-y-3 text-sm text-gray-600 font-mono">
                  <div class="flex items-start gap-2">
                    <span class="font-medium text-black">1.</span>
                    <span>Upload a file (.txt, .docx, or .pdf)</span>
                  </div>
                  <div class="flex items-start gap-2">
                    <span class="font-medium text-black">2.</span>
                    <span>Click "Generate Profile" to analyze your text</span>
                  </div>
                  <div class="flex items-start gap-2">
                    <span class="font-medium text-black">3.</span>
                    <span>Review the detailed style analysis</span>
                  </div>
                  <div class="flex items-start gap-2">
                    <span class="font-medium text-black">4.</span>
                    <span>Copy the XML results for your applications</span>
                  </div>
                </div>
              </div>
              
              <div class="space-y-4">
                <h3 class="text-lg font-semibold text-black font-mono">Features</h3>
                <ul class="text-sm text-gray-600 font-mono space-y-2">
                  <li>• Multi-format file support</li>
                  <li>• AI-powered literary analysis</li>
                  <li>• Detailed style breakdown</li>
                  <li>• XML export functionality</li>
                  <li>• Terminal-style interface</li>
                  <li>• Real-time analysis processing</li>
                  <li>• Comprehensive style metrics</li>
                  <li>• Export to multiple formats</li>
                </ul>
              </div>
              
              <div class="space-y-4">
                <h3 class="text-lg font-semibold text-black font-mono">Tech Stack</h3>
                <div class="text-sm text-gray-600 font-mono">
                  <p>Built with Vue.js, TypeScript, Tailwind CSS, and advanced AI models</p>
                  <div class="mt-2 space-y-1">
                    <p>• Vue 3 with Composition API</p>
                    <p>• TypeScript for type safety</p>
                    <p>• Tailwind CSS for styling</p>
                    <p>• shadcn-vue components</p>
                    <p>• Google Gemini AI integration</p>
                  </div>
                </div>
              </div>
              
              <div class="space-y-4">
                <h3 class="text-lg font-semibold text-black font-mono">Supported File Types</h3>
                <div class="text-sm text-gray-600 font-mono">
                  <div class="grid grid-cols-2 gap-2">
                    <div class="flex items-center gap-2">
                      <span class="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>.txt files</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <span class="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <span>.docx files</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <span class="w-2 h-2 bg-red-500 rounded-full"></span>
                      <span>.pdf files</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <span class="w-2 h-2 bg-yellow-500 rounded-full"></span>
                      <span>Direct text input</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
          
          <footer class="border-t border-gray-300 p-6 pt-4">
            <div class="text-center text-xs text-gray-500 font-mono">
              Built by{' '}
              <a 
                href="https://github.com/sakshamgorey" 
                target="_blank" 
                rel="noopener noreferrer"
                class="font-medium text-black hover:text-gray-600 transition-colors"
              >
                Saksham Gorey
              </a>
            </div>
          </footer>
        </SheetContent>
      </Sheet>
    </div>
    
    <!-- Terminal Content -->
    <div class="p-8 bg-white text-black min-h-[70vh]">
      <slot />
    </div>
  </div>
</template>
