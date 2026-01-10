<script setup lang="ts">
import { onMounted } from 'vue'
import HomeDevotional from '@/components/HomeDevotional.vue'
import { useDevotionalsStore } from '@/stores/devotionals'

const devotionalStore = useDevotionalsStore()

onMounted(() => {
  devotionalStore.fetchLatestDevotional()
})
</script>

<template>
  <main className="flex flex-col bg-neutral-200 flex-1 items-center gap-4 py-8 px-21">
    <h2
      class="text-2xl font-medium p-1 text-neutral-50 rounded-lg bg-[linear-gradient(to_right,var(--color-fuchsia-900),var(--color-fuchsia-800),var(--color-fuchsia-800),var(--color-fuchsia-900))] flex justify-center w-full shadow"
    >
      Devocional
    </h2>
    <div v-if="devotionalStore.isLoading" class="text-fuchsia-900 text-lg font-semibold">
      Carregando devocional...
    </div>
    <div
      v-else-if="devotionalStore.error"
      class="text-red-700 py-1 px-2 bg-red-50 border border-red-600 rounded-md"
    >
      {{ devotionalStore.error }}
    </div>
    <HomeDevotional
      v-else-if="devotionalStore.latestDevotional"
      :devotional="devotionalStore.latestDevotional"
    />
    <div v-else class="text-neutral-950 text-lg">Nenhum devocional disponível no momento.</div>
    <h2
      class="text-2xl font-medium p-1 text-neutral-50 rounded-lg bg-[linear-gradient(to_right,var(--color-fuchsia-900),var(--color-fuchsia-800),var(--color-fuchsia-800),var(--color-fuchsia-900))] flex justify-center w-full shadow"
    >
      Estudo
    </h2>
  </main>
</template>
