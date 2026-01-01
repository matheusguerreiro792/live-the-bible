<script setup lang="ts">
import { ref } from 'vue'
import { db } from '@/firebase/config'
import { collection, addDoc } from 'firebase/firestore'

const newDevotional = ref({
  title: '',
  verse: {
    verse: '',
    versions: {
      arc: '',
      nvi: '',
      ntlh: '',
    },
  },
  introduction: [''],
  analysis: [{ title: '', text: [''] }],
  practicalApplication: [{ title: '', text: [''] }],
  reflection: [''],
  prayer: [''],
})

// Funções auxiliares para adicionar/remover itens de arrays
const addParagraph = (array: string[]) => {
  array.push('')
}

const removeParagraph = (array: string[], index: number) => {
  if (array.length > 1) {
    array.splice(index, 1)
  }
}

const addAnalysisItem = () => {
  newDevotional.value.analysis.push({ title: '', text: [''] })
}

const removeAnalysisItem = (index: number) => {
  if (newDevotional.value.analysis.length > 1) {
    newDevotional.value.analysis.splice(index, 1)
  }
}

const addAnalysisParagraph = (item: { title?: string; text: string[] }) => {
  item.text.push('')
}

const removeAnalysisParagraph = (item: { title?: string; text: string[] }, index: number) => {
  if (item.text.length > 1) {
    item.text.splice(index, 1)
  }
}

const addPracticalApplicationItem = () => {
  newDevotional.value.practicalApplication.push({ title: '', text: [''] })
}

const removePracticalApplicationItem = (index: number) => {
  if (newDevotional.value.practicalApplication.length > 1) {
    newDevotional.value.practicalApplication.splice(index, 1)
  }
}

const addPracticalApplicationParagraph = (item: { title?: string; text: string[] }) => {
  item.text.push('')
}

const removePracticalApplicationParagraph = (
  item: { title?: string; text: string[] },
  index: number,
) => {
  if (item.text.length > 1) {
    item.text.splice(index, 1)
  }
}

// Função para lidar com o envio do formulário
const handleSubmit = async () => {
  try {
    const docRef = await addDoc(collection(db, 'devotionals'), newDevotional.value)
    console.log('Devocional salvo com ID: ', docRef.id)
    alert('Devocional salvo com sucesso!')
    newDevotional.value = {
      title: '',
      verse: {
        verse: '',
        versions: {
          arc: '',
          nvi: '',
          ntlh: '',
        },
      },
      introduction: [''],
      analysis: [{ title: '', text: [''] }],
      practicalApplication: [{ title: '', text: [''] }],
      reflection: [''],
      prayer: [''],
    }
  } catch (e) {
    console.error('Erro ao adicionar devocional: ', e)
    alert('Erro ao salvar devocional. Verifique o console para mais detalhes.')
  }
}
</script>

<template>
  <div class="bg-neutral-50 p-6 rounded-lg shadow-md flex flex-col gap-6 w-full max-w-3xl">
    <h2 class="font-bold text-3xl text-fuchsia-950 text-center">Novo Devocional</h2>

    <form @submit.prevent="handleSubmit" class="flex flex-col gap-6">
      <!-- Título do Devocional -->
      <div>
        <label for="title" class="block text-sm font-medium text-gray-700">Título</label>
        <input
          type="text"
          id="title"
          v-model="newDevotional.title"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-fuchsia-500 focus:ring-fuchsia-500 sm:text-sm p-2"
          required
        />
      </div>

      <!-- Versículo Base -->
      <div class="border-t border-gray-200 pt-4">
        <h3 class="text-lg font-semibold text-fuchsia-900 mb-3">Versículo</h3>
        <div class="flex flex-col gap-4">
          <div>
            <label for="verse" class="block text-sm font-medium text-gray-700">Referência do Versículo</label>
            <input
              type="text"
              id="verse"
              v-model="newDevotional.verse.verse"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-fuchsia-500 focus:ring-fuchsia-500 sm:text-sm p-2"
              placeholder="Ex: 2 Coríntios 5:17"
              required
            />
          </div>
          <div>
            <label for="arc" class="block text-sm font-medium text-gray-700">Versão ARC</label>
            <textarea
              id="arc"
              v-model="newDevotional.verse.versions.arc"
              rows="3"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-fuchsia-500 focus:ring-fuchsia-500 sm:text-sm p-2"
              required
            ></textarea>
          </div>
          <div>
            <label for="nvi" class="block text-sm font-medium text-gray-700">Versão NVI</label>
            <textarea
              id="nvi"
              v-model="newDevotional.verse.versions.nvi"
              rows="3"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-fuchsia-500 focus:ring-fuchsia-500 sm:text-sm p-2\"></textarea>
      <div class="border-t border-gray-200 pt-4">
        <h3 class="text-lg font-semibold text-fuchsia-900 mb-3">Aplicação Prática</h3>
        <div v-for="(practicalItem, itemIndex) in newDevotional.practicalApplication" :key="itemIndex" class="mb-6 p-4 border border-gray-200 rounded-md bg-gray-50">
          <div class="flex justify-between items-center mb-3">
            <h4 class="text-base font-medium text-fuchsia-800">Item de Aplicação {{ itemIndex + 1 }}</h4>
            <button
              type="button"
              @click="removePracticalApplicationItem(itemIndex)"
              class="text-red-600 hover:text-red-800 text-sm font-medium"
              v-if="newDevotional.practicalApplication.length > 1"
            >
              Remover Item
            </button>
          </div>
          <div class="mb-3">
            <label :for="`practical-title-${itemIndex}`" class="block text-sm font-medium text-gray-700">Título do Item (Opcional)</label>
            <input
              type="text"
              :id="`practical-title-${itemIndex}`"
              v-model="practicalItem.title"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-fuchsia-500 focus:ring-fuchsia-500 sm:text-sm p-2"
              :placeholder="`Título para o item de aplicação ${itemIndex + 1}`"
            />
          </div>
          <div v-for="(paragraph, paragraphIndex) in practicalItem.text" :key="paragraphIndex" class="mb-3 flex items-start gap-2">
            <textarea
              v-model="practicalItem.text[paragraphIndex]"
              rows="4"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-fuchsia-500 focus:ring-fuchsia-500 sm:text-sm p-2"
              :placeholder="`Parágrafo ${paragraphIndex + 1} do item de aplicação ${itemIndex + 1}`"
              required
            ></textarea>
            <button
              type="button"
              @click="removePracticalApplicationParagraph(practicalItem, paragraphIndex)"
              class="mt-2 text-red-600 hover:text-red-800 text-sm font-medium"
              v-if="practicalItem.text.length > 1"
            >
              Remover
            </button>
          </div>
          <button
            type="button"
            @click="addPracticalApplicationParagraph(practicalItem)"
            class="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-fuchsia-600 hover:bg-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-500"
          >
            Adicionar Parágrafo à Aplicação
          </button>
        </div>
        <button
          type="button"
          @click="addPracticalApplicationItem"
          class="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-fuchsia-600 hover:bg-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-500"
        >
          Adicionar Novo Item de Aplicação
        </button>
      </div>

      <!-- Reflexão Pessoal -->
      <div class="border-t border-gray-200 pt-4">
        <h3 class="text-lg font-semibold text-fuchsia-900 mb-3">Reflexão Pessoal</h3>
        <div v-for="(paragraph, index) in newDevotional.reflection" :key="index" class="mb-3 flex items-start gap-2">
          <textarea
            v-model="newDevotional.reflection[index]"
            rows="4"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-fuchsia-500 focus:ring-fuchsia-500 sm:text-sm p-2"
            :placeholder="`Pergunta ou Parágrafo ${index + 1} da Reflexão`"
            required
          ></textarea>
          <button
            type="button"
            @click="removeParagraph(newDevotional.reflection, index)"
            class="mt-2 text-red-600 hover:text-red-800 text-sm font-medium"
            v-if="newDevotional.reflection.length > 1"
          >
            Remover
          </button>
        </div>
        <button
          type="button"
          @click="addParagraph(newDevotional.reflection)"
          class="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-fuchsia-600 hover:bg-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-500"
        >
          Adicionar Parágrafo/Pergunta
        </button>
      </div>

      <!-- Oração -->
      <div class="border-t border-gray-200 pt-4">
        <h3 class="text-lg font-semibold text-fuchsia-900 mb-3">Oração</h3>
        <div v-for="(paragraph, index) in newDevotional.prayer" :key="index" class="mb-3 flex items-start gap-2">
          <textarea
            v-model="newDevotional.prayer[index]"
            rows="4"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-fuchsia-500 focus:ring-fuchsia-500 sm:text-sm p-2"
            :placeholder="`Parágrafo ${index + 1} da Oração`"
            required
          ></textarea>
          <button
            type="button"
            @click="removeParagraph(newDevotional.prayer, index)"
            class="mt-2 text-red-600 hover:text-red-800 text-sm font-medium"
            v-if="newDevotional.prayer.length > 1"
          >
            Remover
          </button>
        </div>
        <button
          type="button"
          @click="addParagraph(newDevotional.prayer)"
          class="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-fuchsia-600 hover:bg-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-500"
        >
          Adicionar Parágrafo
        </button>
      </div>

      <!-- Botão de Envio -->
      <div class="pt-4">
        <button
          type="submit"
          class="w-full inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-fuchsia-800 hover:bg-fuchsia-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-500"
        >
          Salvar Devocional
        </button>
      </div>
    </form>
  </div>
</template>
