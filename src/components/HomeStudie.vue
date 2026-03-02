<script setup lang="ts">
import { computed } from 'vue'
import { marked } from 'marked'

const props = defineProps<{
  studie: {
    title: string
    theme: string
    content: string
  }
}>()

const renderedHtml = computed(() => {
  return marked(props.studie.content || '')
})
</script>

<template>
  <div
    class="relative bg-neutral-50 py-4 px-5 rounded-lg shadow-md flex flex-col gap-4 w-full max-w-342 border border-neutral-100 overflow-hidden"
  >
    <div
      class="absolute top-0 right-0 bg-fuchsia-900 py-1 px-2 rounded-bl-md text-neutral-50 text-xs font-medium"
    >
      {{ studie.theme }}
    </div>

    <h2 class="font-semibold text-3xl text-fuchsia-950 w-11/12">{{ studie.title }}</h2>

    <hr class="text-fuchsia-900 mt-2" />

    <div class="markdown-content text-justify flex flex-col gap-4" v-html="renderedHtml"></div>
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
