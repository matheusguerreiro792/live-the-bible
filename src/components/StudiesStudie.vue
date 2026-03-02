<script setup lang="ts">
import { computed, ref } from 'vue'
import { marked } from 'marked'
import IconXmark from './icons/IconXmark.vue'
import BackToTop from './BackToTop.vue'

const props = defineProps<{
  studie: {
    title: string
    theme: string
    content: string
  } | null
}>()

const emit = defineEmits(['close'])
const scrollContainer = ref<HTMLElement | null>(null)

const renderedHtml = computed(() => {
  return marked(props.studie?.content || '')
})

const closeStudie = () => {
  emit('close')
}
</script>

<template>
  <div
    v-if="studie"
    class="fixed top-0 left-0 z-30 h-full w-full bg-neutral-950/75 flex items-center justify-center p-0"
    @click.self="closeStudie"
  >
    <div
      ref="scrollContainer"
      class="bg-neutral-50 py-4 px-5 gap-4 flex flex-col w-full max-w-342 h-full overflow-y-auto relative rounded-lg shadow-lg"
    >
      <button
        @click="closeStudie"
        class="absolute top-1 right-1 bg-red-700 hover:bg-red-800 text-neutral-50 rounded-full flex items-center justify-center w-8 h-8 transition-colors z-10"
        aria-label="Fechar estudo"
      >
        <IconXmark color="currentColor" class="w-4 h-4" />
      </button>

      <div class="flex flex-col gap-4">
        <div
          class="absolute top-0 right-10 bg-fuchsia-900 py-1 px-2 rounded-b-md text-neutral-50 text-xs font-medium"
        >
          {{ studie.theme }}
        </div>

        <h2 class="font-semibold text-3xl text-fuchsia-950 mt-5">{{ studie.title }}</h2>

        <hr class="text-fuchsia-900 mt-2" />

        <div class="markdown-content text-justify flex flex-col gap-4" v-html="renderedHtml"></div>
      </div>
      <BackToTop :container="scrollContainer" />
    </div>
  </div>
</template>

<style scoped>
.markdown-content :deep(h2) {
  color: var(--color-fuchsia-950);
  font-weight: 600;
  font-size: 1.25rem;
}
.markdown-content :deep(h3) {
  color: var(--color-fuchsia-950);
  font-weight: 600;
  font-size: 1.125rem;
}
.markdown-content :deep(p) {
  color: var(--color-neutral-950);
}
.markdown-content :deep(strong) {
  color: var(--color-fuchsia-900);
  font-weight: 700;
}
.markdown-content :deep(ul) {
  list-style-type: disc;
  margin-left: 1.125rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.markdown-content :deep(ol) {
  list-style-type: decimal;
  margin-left: 1.125rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.markdown-content :deep(hr) {
  border-top: 1px solid var(--color-fuchsia-900);
  margin-top: 0.25rem;
}
.markdown-content :deep(blockquote) {
  background-color: var(--color-yellow-50);
  border: 1px solid var(--color-yellow-200);
  border-left: 4px solid var(--color-yellow-400);
  padding: 0.25rem 0.63rem;
  font-style: italic;
  border-radius: 0 0.25rem 0.25rem 0;
  color: var(--color-neutral-950);
  font-size: 0.875rem;
}
</style>
