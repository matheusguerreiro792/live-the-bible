<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useDevotionalsStore } from '@/stores/devotionals'

import { ref } from 'vue'

const colors = [
  'bg-red-600',
  'bg-orange-600',
  'bg-amber-600',
  'bg-yellow-600',
  'bg-lime-600',
  'bg-green-600',
  'bg-emerald-600',
  'bg-teal-600',
  'bg-cyan-600',
  'bg-sky-600',
  'bg-blue-600',
  'bg-indigo-600',
  'bg-violet-600',
  'bg-purple-600',
  'bg-fuchsia-600',
  'bg-pink-600',
  'bg-rose-600',
  'bg-slate-600',
  'bg-gray-600',
  'bg-zinc-600',
  'bg-neutral-600',
  'bg-stone-600',
]

const randomBgClass = ref(colors[Math.floor(Math.random() * colors.length)])
console.log('Random background class selected:', randomBgClass)

const devotionalStore = useDevotionalsStore()

const devotionalThemes = computed(() => {
  if (!devotionalStore.allDevotionals || devotionalStore.allDevotionals.length === 0) {
    return []
  }

  const themes = new Set(devotionalStore.allDevotionals.map((devotional) => devotional.theme))
  return Array.from(themes)
})

onMounted(() => {
  devotionalStore.fetchAllDevotionals()
})
</script>

<template>
  <main class="flex flex-col flex-1 px-21 gap-4 py-14">
    <div v-if="devotionalThemes.length > 0">
      <div v-for="theme in devotionalThemes" :key="theme" class="flex">
        <div
          :class="`flex ${randomBgClass} py-1 px-2 rounded-lg font-medium text-neutral-50 w-fit shadow text-sm`"
        >
          {{ theme }}
        </div>
      </div>
    </div>
    <div v-if="devotionalStore.isLoading" class="text-fuchsia-900 text-lg font-semibold">
      Carregando devocionais...
    </div>
    <div
      v-else-if="devotionalStore.error"
      class="text-red-600 py-1 px-2 bg-red-50 border border-red-600 rounded-md"
    >
      {{ devotionalStore.error }}
    </div>
    <div v-else-if="devotionalStore.allDevotionals.length > 0">
      <div
        v-for="devotional in devotionalStore.allDevotionals"
        :key="devotional.id"
        class="p-4 w-fit border border-fuchsia-950 rounded-lg shadow bg-white flex flex-col gap-2 cursor-pointer hover:bg-fuchsia-100 active:bg-fuchsia-50"
      >
        <h2 class="text-xl -mt-1.5 font-semibold text-fuchsia-950">{{ devotional.title }}</h2>
        <strong
          class="bg-fuchsia-50 border border-fuchsia-900 w-fit text-fuchsia-950 rounded-md px-2 py-0.5 flex items-center"
          >{{ devotional.verse.verse }}</strong
        >
      </div>
    </div>
    <div v-else class="text-gray-600 text-lg">Nenhum devocional disponível.</div>
  </main>
</template>
