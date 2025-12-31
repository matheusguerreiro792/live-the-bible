<script setup lang="ts">
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
    introduction: string[]
    analysis: {
      title?: string
      text: string[]
    }[]
    practicalApplication: {
      title?: string
      text: string[]
    }
    reflection: string[]
    prayer: string[]
  }
}>()
</script>

<template>
  <div class="bg-neutral-50 p-4 gap-4 rounded-lg shadow-md flex flex-col">
    <h2 class="font-semibold text-2xl py-0 text-fuchsia-950 px-1 rounded-md w-fit">
      {{ devotional.title }}
    </h2>
    <strong
      class="bg-fuchsia-50 border border-fuchsia-900 w-fit text-fuchsia-950 rounded-md px-2 py-0.5 flex items-center"
      >{{ devotional.verse.verse }}</strong
    >
    <ul class="flex flex-col gap-2">
      <li class="flex items-center gap-4">
        <div class="bg-fuchsia-950 w-1.5 h-1.5 rounded-full"></div>
        <strong class="font-semibold text-xs w-8.25 text-fuchsia-900">ARC</strong>
        <span>{{ devotional.verse.versions.arc }}</span>
      </li>
      <li class="flex items-center gap-4">
        <div class="bg-fuchsia-950 w-1.5 h-1.5 rounded-full"></div>
        <strong class="font-semibold text-xs w-8.25 text-fuchsia-900">NVI</strong>
        <span>{{ devotional.verse.versions.nvi }}</span>
      </li>
      <li class="flex items-center gap-4">
        <div class="bg-fuchsia-950 w-1.5 h-1.5 rounded-full"></div>
        <strong class="font-semibold text-xs w-8.25 text-fuchsia-900">NTLH</strong>
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
        class="text-justify list-decimal list-inside"
      >
        <span v-for="(p, j) in o.text" :key="j" class="text-justify">
          <strong class="text-fuchsia-900 font-semibold">{{ o.title }}</strong
          >: {{ p }}
        </span>
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
</template>
