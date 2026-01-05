<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import { useDevotionalsStore } from '@/stores/devotionals'
import DevotionalsDevotional from '@/components/DevotionalsDevotional.vue'

const colors = [
  'bg-red-700 hover:bg-red-800 active:bg-red-600',
  'bg-orange-700 hover:bg-orange-800 active:bg-orange-600',
  'bg-amber-700 hover:bg-amber-800 active:bg-amber-600',
  'bg-yellow-700 hover:bg-yellow-800 active:bg-yellow-600',
  'bg-lime-700 hover:bg-lime-800 active:bg-lime-600',
  'bg-green-700 hover:bg-green-800 active:bg-green-600',
  'bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-600',
  'bg-teal-700 hover:bg-teal-800 active:bg-teal-600',
  'bg-cyan-700 hover:bg-cyan-800 active:bg-cyan-600',
  'bg-sky-700 hover:bg-sky-800 active:bg-sky-600',
  'bg-blue-700 hover:bg-blue-800 active:bg-blue-600',
  'bg-indigo-700 hover:bg-indigo-800 active:bg-indigo-600',
  'bg-violet-700 hover:bg-violet-800 active:bg-violet-600',
  'bg-purple-700 hover:bg-purple-800 active:bg-purple-600',
  'bg-fuchsia-700 hover:bg-fuchsia-800 active:bg-fuchsia-600',
  'bg-pink-700 hover:bg-pink-800 active:bg-pink-600',
  'bg-rose-700 hover:bg-rose-800 active:bg-rose-600',
  'bg-slate-700 hover:bg-slate-800 active:bg-slate-600',
  'bg-gray-700 hover:bg-gray-800 active:bg-gray-600',
  'bg-zinc-700 hover:bg-zinc-800 active:bg-zinc-600',
  'bg-neutral-700 hover:bg-neutral-800 active:bg-neutral-600',
  'bg-stone-700 hover:bg-stone-800 active:bg-stone-600',
]

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)]
}

const devotionalStore = useDevotionalsStore()

const devotionalThemesWithColors = computed(() => {
  if (!devotionalStore.allDevotionals || devotionalStore.allDevotionals.length === 0) {
    return []
  }

  const themes = Array.from(
    new Set(devotionalStore.allDevotionals.map((devotional) => devotional.theme)),
  )

  const allThemes = [
    { theme: 'Todos os Temas', color: 'bg-fuchsia-900 hover:bg-fuchsia-950 active:bg-fuchsia-800' },
    ...themes.map((theme) => ({
      theme,
      color: getRandomColor(),
    })),
  ]

  return allThemes
})

const selectedDevotional = ref<any>(null)

const handleDevotionalClick = (devotional: any) => {
  selectedDevotional.value = devotional
}

const closeSelectedDevotional = () => {
  selectedDevotional.value = null
}

const handleThemeFilter = (theme: string) => {
  if (theme === 'Todos os Temas') {
    devotionalStore.setSelectedTheme(null)
  } else {
    devotionalStore.setSelectedTheme(theme)
  }
}

onMounted(() => {
  devotionalStore.fetchAllDevotionals()
})
</script>

<template>
  <main class="flex flex-col flex-1 px-21 gap-4 py-8 relative">
    <div v-if="devotionalThemesWithColors.length > 0" class="flex gap-2 flex-wrap">
      <div v-for="item in devotionalThemesWithColors" :key="item.theme">
        <button
          @click="handleThemeFilter(item.theme)"
          :class="[
            'flex py-1 px-2 rounded-lg font-medium cursor-pointer text-neutral-50 w-fit shadow text-sm',
            item.color,
            {
              'ring-2 ring-offset-2 ring-fuchsia-900':
                devotionalStore.selectedTheme === item.theme ||
                (item.theme === 'Todos os Temas' && !devotionalStore.selectedTheme),
            },
          ]"
        >
          {{ item.theme }}
        </button>
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
    <div
      v-else-if="devotionalStore.filteredDevotionals.length > 0"
      class="flex flex-wrap gap-4 mt-4"
    >
      <div
        v-for="devotional in devotionalStore.filteredDevotionals"
        :key="devotional.id"
        class="p-4 w-fit border border-fuchsia-950 rounded-lg shadow bg-white flex flex-col gap-2 cursor-pointer hover:bg-fuchsia-100 active:bg-fuchsia-50 relative overflow-hidden"
        @click="handleDevotionalClick(devotional)"
      >
        <h2 class="text-xl -mt-1.5 font-semibold text-fuchsia-950">{{ devotional.title }}</h2>
        <strong
          class="bg-fuchsia-50 border border-fuchsia-900 w-fit text-fuchsia-950 rounded-md px-2 py-0.5 flex items-center"
          >{{ devotional.verse.verse }}</strong
        >
        <div class="absolute bottom-0 right-0 bg-fuchsia-900 flex py-0.5 px-1 rounded-tl-md">
          <span
            class="shadow-lg text-xs font-medium bg-gradient-to-tr from-zinc-300 via-zinc-100 to-zinc-300 bg-clip-text text-transparent drop-shadow-sm"
            >{{ devotional.theme }}</span
          >
        </div>
      </div>
    </div>
    <div v-else class="text-gray-600 text-lg">
      Nenhum devocional disponível para o tema selecionado.
    </div>

    <DevotionalsDevotional
      v-if="selectedDevotional"
      :devotional="selectedDevotional"
      @close="closeSelectedDevotional"
    />
  </main>
</template>
