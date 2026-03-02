<script setup lang="ts">
import { onMounted } from 'vue'
import HomeDevotional from '@/components/HomeDevotional.vue'
import HomeStudie from '@/components/HomeStudie.vue'
import BackToTop from '@/components/BackToTop.vue'
import { useDevotionalsStore } from '@/stores/devotionals'
import { useStudiesStore } from '@/stores/studies'

const devotionalsStore = useDevotionalsStore()
const studiesStore = useStudiesStore()

onMounted(() => {
  devotionalsStore.fetchLatestDevotional()
  studiesStore.fetchLatestStudie()
})
</script>

<template>
  <main
    className="flex flex-col bg-neutral-200 flex-1 items-center gap-4 py-4 sm:gap-6 sm:py-6 sm:px-14 md:px-20 md:gap-8 md:py-11 max-sm:px-4">
    <h2
      class="text-2xl font-medium p-1 text-neutral-50 rounded-lg bg-[linear-gradient(to_right,var(--color-fuchsia-900),var(--color-fuchsia-800),var(--color-fuchsia-800),var(--color-fuchsia-900))] flex justify-center w-full shadow">
      Devocional
    </h2>
    <div v-if="devotionalsStore.isLoading" class="text-fuchsia-900 text-lg font-semibold">
      carregando Devocional...
    </div>
    <div v-else-if="devotionalsStore.error" class="text-red-700 py-1 px-2 bg-red-50 border border-red-600 rounded-md">
      {{ devotionalsStore.error }}
    </div>
    <HomeDevotional v-else-if="devotionalsStore.latestDevotional" :devotional="devotionalsStore.latestDevotional" />
    <div v-else class="text-neutral-950 text-lg">Nenhum Devocional disponível no momento.</div>
    <hr class="w-full text-fuchsia-900 mt-1 border-dashed border-2" />
    <h2
      class="text-2xl font-medium p-1 text-neutral-50 rounded-lg bg-[linear-gradient(to_right,var(--color-fuchsia-900),var(--color-fuchsia-800),var(--color-fuchsia-800),var(--color-fuchsia-900))] flex justify-center w-full shadow">
      Estudo
    </h2>
    <div v-if="studiesStore.isLoading" class="text-fuchsia-900 text-lg font-semibold">
      carregando Estudo...
    </div>
    <div v-else-if="studiesStore.error" class="text-red-700 py-1 px-2 bg-red-50 border border-red-600 rounded-md">
      {{ studiesStore.error }}
    </div>
    <HomeStudie v-else-if="studiesStore.latestStudie" :studie="studiesStore.latestStudie" />
    <div v-else class="text-neutral-950 text-lg">Nenhum Estudo disponível no momento.</div>
  </main>
  <BackToTop />
</template>
