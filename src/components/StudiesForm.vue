<script setup lang="ts">
import { ref } from 'vue'
import { serverTimestamp } from 'firebase/firestore'
import IconXmark from './icons/IconXmark.vue'
import { postStudie } from '@/firebase/services/studies'
import { useStudiesStore } from '@/stores/studies'

const devotionalStore = useStudiesStore()

const newStudie = ref({
  title: '',
  theme: '',
  content: '',
  createdAt: null,
})

const handleSubmit = async () => {
  try {
    const dataToSave = {
      ...newStudie.value,
      createdAt: serverTimestamp(),
    }

    const savedStudie = await postStudie(dataToSave)
    console.log('Estudo salvo com ID: ', savedStudie.id)
    alert('Estudo salvo com sucesso!')

    devotionalStore.clearCache()

    newStudie.value = {
      title: '',
      theme: '',
      content: '',
      createdAt: null,
    }
  } catch (e) {
    console.error('Erro ao adicionar devocional: ', e)
    alert('Erro ao salvar devocional.')
  }
}
</script>

<template>
  <div
    class="relative bg-neutral-800 p-4 rounded-lg shadow-md flex flex-col gap-4 w-3/4 items-center"
  >
    <h2 class="font-semibold text-3xl text-fuchsia-400">New Studie</h2>
    <button
      @click="$emit('close')"
      class="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-neutral-50 text-xs font-medium p-1 rounded"
    >
      <IconXmark color="var(--color-neutral-50)" />
    </button>

    <form @submit.prevent="handleSubmit" class="flex flex-col gap-6 w-full">
      <div class="flex flex-col gap-2">
        <label for="title" class="text-fuchsia-400 text-sm font-medium">Title</label>
        <input
          type="text"
          id="title"
          v-model="newStudie.title"
          class="text-neutral-50 bg-neutral-900 rounded-md py-2 px-3"
          required
        />
      </div>

      <div class="flex flex-col gap-2">
        <label for="theme" class="text-fuchsia-400 text-sm font-medium">Theme</label>
        <input
          type="text"
          id="theme"
          v-model="newStudie.theme"
          class="text-neutral-50 bg-neutral-900 rounded-md py-2 px-3"
          required
        />
      </div>

      <div class="border-t border-fuchsia-500 pt-4 flex flex-col gap-4">
        <h3 class="text-lg font-semibold text-fuchsia-400">Studie Content (Markdown)</h3>
        <textarea
          v-model="newStudie.content"
          rows="15"
          class="w-full rounded-md py-2 px-3 bg-neutral-900 text-neutral-50 font-mono"
          placeholder="Use Markdown para formatar: # Título, **Negrito**, etc."
          required
        ></textarea>
      </div>

      <div class="">
        <button
          type="submit"
          class="w-full inline-flex justify-center py-3 px-6 border border-transparent text-lg font-medium rounded-md text-neutral-50 bg-fuchsia-700 hover:bg-fuchsia-800"
        >
          Save Studie
        </button>
      </div>
    </form>
  </div>
</template>
