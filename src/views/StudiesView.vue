<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import { useStudiesStore } from '@/stores/studies'
import StudiesStudie from '@/components/StudiesStudie.vue'

type Studie = (typeof studiesStore.allStudies)[0]

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

const studiesStore = useStudiesStore()

const studieThemesWithColors = computed(() => {
  if (!studiesStore.allStudies || studiesStore.allStudies.length === 0) {
    return []
  }

  const themes = Array.from(
    new Set(studiesStore.allStudies.map((studie) => studie.theme)),
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

const selectedStudie = ref<Studie | null>(null)

const handleStudieClick = (studie: Studie) => {
  selectedStudie.value = studie
}

const closeSelectedStudie = () => {
  selectedStudie.value = null
}

const handleThemeFilter = (theme: string) => {
  if (theme === 'Todos os Temas') {
    studiesStore.setSelectedTheme(null)
  } else {
    studiesStore.setSelectedTheme(theme)
  }
}

onMounted(() => {
  studiesStore.fetchAllStudies()
})
</script>

<template>
  <main class="flex flex-col flex-1 px-21 gap-4 py-8 relative bg-neutral-100">
    <div v-if="studieThemesWithColors.length > 0" class="flex gap-2 flex-wrap">
      <div v-for="item in studieThemesWithColors" :key="item.theme">
        <button
          @click="handleThemeFilter(item.theme)"
          :class="[
            'flex py-1 px-2 rounded-lg font-medium cursor-pointer text-neutral-50 w-fit shadow text-sm transition-all',
            item.color,
            {
              'ring-2 ring-offset-2 ring-fuchsia-900':
                studiesStore.selectedTheme === item.theme ||
                (item.theme === 'Todos os Temas' && !studiesStore.selectedTheme),
            },
          ]"
        >
          {{ item.theme }}
        </button>
      </div>
    </div>

    <div v-if="studiesStore.isLoading" class="text-fuchsia-900 text-lg font-semibold">
      Carregando estudos...
    </div>
    <div
      v-else-if="studiesStore.error"
      class="text-red-600 py-1 px-2 bg-red-50 border border-red-600 rounded-md"
    >
      {{ studiesStore.error }}
    </div>

    <div
      v-else-if="studiesStore.filteredStudies.length > 0"
      class="flex flex-wrap gap-4 mt-4"
    >
      <div
        v-for="studie in studiesStore.filteredStudies"
        :key="studie.id"
        class="p-4 w-fit max-w-1/4 border border-fuchsia-950 rounded-lg shadow-md bg-white flex flex-col gap-2 cursor-pointer hover:bg-fuchsia-100 active:bg-fuchsia-50 relative overflow-hidden transition-colors"
        @click="handleStudieClick(studie)"
      >
        <h2 class="text-xl -mt-1.5 font-semibold text-fuchsia-950">{{ studie.title }}</h2>

        <div class="absolute bottom-0 right-0 bg-fuchsia-900 flex py-0.5 px-1 rounded-tl-md">
          <span class="text-xs font-medium text-neutral-50">{{ studie.theme }}</span>
        </div>
      </div>
    </div>

    <div v-else class="text-gray-600 text-lg">
      Nenhum estudo disponível para o tema selecionado.
    </div>

    <!-- Modal de Detalhe -->
    <StudiesStudie
      v-if="selectedStudie"
      :studie="selectedStudie"
      @close="closeSelectedStudie"
    />
  </main>
</template>
