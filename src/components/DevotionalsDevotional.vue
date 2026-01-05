<script setup lang="ts">
import IconXmark from './icons/IconXmark.vue'

const props = defineProps<{
  devotional: {
    title: string
    verse: {
      verse: string
      versions: {
        arc: string
        nvi: string
        ntlh: string
      }
    }
    theme: string
    introduction: string[]
    analysis: {
      title?: string
      text: string[]
    }[]
    practicalApplication: {
      title?: string
      text: string[]
    }[]
    reflection: string[]
    prayer: string[]
  } | null
}>()

const emit = defineEmits(['close'])

const closeDevotional = () => {
  emit('close')
}
</script>

<template>
  <div
    v-if="devotional"
    class="absolute top-0 left-0 w-full h-full bg-neutral-950/75 flex items-center justify-center"
  >
    <div class="bg-neutral-50 py-4 px-5 gap-4 flex flex-col w-3/4 h-full overflow-y-auto relative">
      <button
        @click="closeDevotional"
        class="absolute top-6 right-5 bg-red-700 hover:bg-red-800 text-neutral-50 rounded-full text-sm font-medium flex items-center justify-center w-6 h-6"
        aria-label="Fechar devocional"
      >
        <IconXmark color="currentColor" class="w-3.5 h-3.5" />
      </button>

      <div class="flex flex-col gap-4">
        <div class="absolute top-0 right-0 bg-fuchsia-900 flex py-0.5 px-1 rounded-bl-md">
          <span
            class="text-xs font-medium bg-gradient-to-tr from-zinc-300 via-zinc-100 to-zinc-300 bg-clip-text text-transparent"
            >{{ devotional.theme }}</span
          >
        </div>
        <h2 class="font-semibold text-2xl text-fuchsia-950 w-fit">
          {{ devotional.title }}
        </h2>
        <strong
          class="bg-fuchsia-50 border border-fuchsia-900 w-fit text-fuchsia-950 rounded-md px-2 py-1 flex items-center"
          >{{ devotional.verse.verse }}</strong
        >
        <ul class="flex flex-col gap-2">
          <li class="flex items-center gap-4">
            <div class="bg-fuchsia-950 w-1.5 h-1.5 rounded-full"></div>
            <strong class="font-semibold text-xs w-8 text-fuchsia-900">ARC</strong>
            <span>{{ devotional.verse.versions.arc }}</span>
          </li>
          <li class="flex items-center gap-4">
            <div class="bg-fuchsia-950 w-1.5 h-1.5 rounded-full"></div>
            <strong class="font-semibold text-xs w-8 text-fuchsia-900">NVI</strong>
            <span>{{ devotional.verse.versions.nvi }}</span>
          </li>
          <li class="flex items-center gap-4">
            <div class="bg-fuchsia-950 w-1.5 h-1.5 rounded-full"></div>
            <strong class="font-semibold text-xs w-8 text-fuchsia-900">NTLH</strong>
            <span>{{ devotional.verse.versions.ntlh }}</span>
          </li>
        </ul>
        <hr class="text-fuchsia-900 -mb-0.5" />
        <h3 class="text-fuchsia-950 font-semibold text-lg -mb-2">Introdução</h3>
        <p v-for="(p, i) in devotional.introduction" :key="i" class="text-justify">{{ p }}</p>
        <hr class="text-fuchsia-900 -mb-0.5" />
        <h3 class="text-fuchsia-950 font-semibold text-lg -mb-2">Análise Profunda</h3>
        <p v-for="(p, i) in devotional.analysis[0].text" :key="i" class="text-justify">{{ p }}</p>
        <div v-for="(o, i) in devotional.analysis.slice(1)" :key="i" class="flex flex-col gap-2">
          <h4 class="text-fuchsia-900 font-semibold text-base">{{ o.title }}</h4>
          <p v-for="(p, j) in o.text" :key="j" class="text-justify">{{ p }}</p>
        </div>
        <hr class="text-fuchsia-900 -mb-0.5" />
        <h3 class="text-fuchsia-950 font-semibold text-lg -mb-2">Aplicação Prática</h3>
        <p v-for="(p, i) in devotional.practicalApplication[0].text" :key="i" class="text-justify">
          {{ p }}
        </p>
        <ol class="flex flex-col gap-4">
          <li
            v-for="(o, i) in devotional.practicalApplication.slice(1)"
            :key="i"
            class="text-justify list-decimal list-inside flex flex-col gap-2"
          >
            <strong class="text-fuchsia-900 font-semibold">
              <span class="text-neutral-950 font-normal text-sm">{{ i + 1 }}.</span>
              {{ o.title }}</strong
            >
            <p v-for="(p, j) in o.text" :key="j" class="text-justify">
              {{ p }}
            </p>
          </li>
        </ol>
        <hr class="text-fuchsia-900 -mb-0.5" />
        <h3 class="text-fuchsia-950 font-semibold text-lg -mb-2">Reflexão Pessoal</h3>
        <p class="text-justify">{{ devotional.reflection[0] }}</p>
        <ul class="flex flex-col gap-1">
          <li
            v-for="(p, i) in devotional.reflection.slice(1)"
            :key="i"
            class="text-justify list-disc list-inside"
          >
            {{ p }}
          </li>
        </ul>
        <hr class="text-fuchsia-900 -mb-0.5" />
        <h3 class="text-fuchsia-950 font-semibold text-lg -mb-2">Oração</h3>
        <p v-for="(p, i) in devotional.prayer" :key="i" class="text-justify">{{ p }}</p>
      </div>
    </div>
  </div>
</template>
