<script setup lang="ts">
import { ref } from 'vue'
// Removido 'db', 'collection', 'addDoc' daqui
import { serverTimestamp } from 'firebase/firestore' // serverTimestamp ainda é usado
import IconXmark from './icons/IconXmark.vue'
import { postDevotional } from '@/firebase/services/devotionals' // Importa o serviço
import { useDevotionalsStore } from '@/stores/devotionals' // Importa o store para limpar o cache

const devotionalStore = useDevotionalsStore() // Instancia o store

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
  theme: '',
  introduction: [''],
  analysis: [{ title: '', text: [''] }],
  practicalApplication: [{ title: '', text: [''] }],
  reflection: [''],
  prayer: [''],
  createdAt: null,
})

// Funções auxiliares para adicionar/remover itens de arrays (mantidas)
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
    newDevotional.value.createdAt = serverTimestamp()

    const savedDevotional = await postDevotional(newDevotional.value)
    console.log('Devocional salvo com ID: ', savedDevotional.id)
    alert('Devocional salvo com sucesso!')

    devotionalStore.clearCache()
    // devotionalStore.fetchLatestDevotional(); // Pode ser útil se você quiser que a HomeView atualize imediatamente

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
      theme: '',
      introduction: [''],
      analysis: [{ title: '', text: [''] }],
      practicalApplication: [{ title: '', text: [''] }],
      reflection: [''],
      prayer: [''],
      createdAt: null,
    }
  } catch (e) {
    console.error('Erro ao adicionar devocional: ', e)
    alert('Erro ao salvar devocional. Verifique o console para mais detalhes.')
  }
}
</script>

<template>
  <div
    class="relative bg-neutral-800 p-4 rounded-lg shadow-md flex flex-col gap-4 w-3/4 items-center"
  >
    <h2 class="font-semibold text-3xl text-fuchsia-400">New Devotional</h2>
    <button
      @click="$emit('close')"
      class="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-neutral-50 text-xs font-medium p-1 rounded"
    >
      <IconXmark color="var(--color-neutral-50)" />
    </button>

    <form @submit.prevent="handleSubmit" class="flex flex-col gap-6 w-full">
      <!-- Título do Devocional -->
      <div class="flex flex-col gap-2">
        <label for="title" class="text-fuchsia-400 text-sm font-medium">Title</label>
        <input
          type="text"
          id="title"
          v-model="newDevotional.title"
          class="text-neutral-50 bg-neutral-900 rounded-md py-2 px-3"
          required
        />
      </div>

      <!-- Versículo Base -->
      <div class="border-t border-fuchsia-400 pt-4 flex flex-col gap-4">
        <h3 class="text-lg font-semibold text-fuchsia-400">Verse</h3>
        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-2">
            <label for="verse" class="text-sm font-medium text-fuchsia-400">Verse Reference</label>
            <input
              type="text"
              id="verse"
              v-model="newDevotional.verse.verse"
              class="rounded-md py-2 px-3 bg-neutral-900 text-neutral-50"
              placeholder="Ex: 2 Coríntios 5:17"
              required
            />
          </div>
          <div class="flex flex-col gap-2">
            <label for="arc" class="font-medium text-fuchsia-400 text-sm">ARC version</label>
            <textarea
              id="arc"
              v-model="newDevotional.verse.versions.arc"
              rows="3"
              class="rounded-md py-2 px-3 bg-neutral-900 text-neutral-50"
              required
            ></textarea>
          </div>
          <div class="flex flex-col gap-2">
            <label for="nvi" class="font-medium text-fuchsia-400 text-sm">NVI version</label>
            <textarea
              id="nvi"
              v-model="newDevotional.verse.versions.nvi"
              rows="3"
              class="rounded-md py-2 px-3 bg-neutral-900 text-neutral-50"
              required
            ></textarea>
          </div>
          <div class="flex flex-col gap-2">
            <label for="ntlh" class="font-medium text-fuchsia-400 text-sm">NTLH version</label>
            <textarea
              id="ntlh"
              v-model="newDevotional.verse.versions.ntlh"
              rows="3"
              class="rounded-md py-2 px-3 bg-neutral-900 text-neutral-50"
              required
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Tema do Devocional -->
      <div class="flex flex-col gap-2">
        <label for="theme" class="text-fuchsia-400 text-sm font-medium">Theme</label>
        <input
          type="text"
          id="theme"
          v-model="newDevotional.theme"
          class="text-neutral-50 bg-neutral-900 rounded-md py-2 px-3"
          required
        />
      </div>

      <!-- Introdução -->
      <div class="border-t border-fuchsia-500 pt-4 flex flex-col gap-4">
        <h3 class="text-lg font-semibold text-fuchsia-400">Introduction</h3>
        <div
          v-for="(paragraph, index) in newDevotional.introduction"
          :key="index"
          class="flex items-center gap-2"
        >
          <textarea
            v-model="newDevotional.introduction[index]"
            rows="4"
            class="w-full rounded-md py-2 px-3 bg-neutral-900 text-neutral-50"
            :placeholder="`Parágrafo ${index + 1} da Introdução`"
            required
          ></textarea>
          <button
            type="button"
            @click="removeParagraph(newDevotional.introduction, index)"
            class="bg-red-600 hover:bg-red-700 py-2 px-3 rounded-md text-neutral-50 text-sm font-medium"
            v-if="newDevotional.introduction.length > 1"
          >
            Delete
          </button>
        </div>
        <button
          type="button"
          @click="addParagraph(newDevotional.introduction)"
          class="inline-flex w-fit items-center px-3 py-2 border border-transparent font-medium rounded-md text-neutral-50 bg-fuchsia-700 hover:bg-fuchsia-800 focus:outline-none"
        >
          Add Paragraph
        </button>
      </div>

      <!-- Análise Profunda -->
      <div class="border-t border-fuchsia-400 pt-4 flex flex-col gap-4">
        <h3 class="text-lg font-semibold text-fuchsia-400">Deep Analysis</h3>
        <div
          v-for="(analysisItem, itemIndex) in newDevotional.analysis"
          :key="itemIndex"
          class="py-2 px-3 rounded-md bg-neutral-900 flex flex-col gap-2"
        >
          <div class="flex justify-between items-center gap-2">
            <h4 class="font-medium text-fuchsia-400">Analysis Item {{ itemIndex + 1 }}</h4>
            <button
              type="button"
              @click="removeAnalysisItem(itemIndex)"
              class="bg-red-600 hover:bg-red-700 py-2 px-3 rounded-md text-neutral-50 text-sm font-medium"
              v-if="newDevotional.analysis.length > 1"
            >
              Delete Item
            </button>
          </div>
          <div class="flex items-center gap-2">
            <label
              :for="`analysis-title-${itemIndex}`"
              class="font-medium text-nowrap text-fuchsia-400 text-sm"
              >Item Title (Optional):</label
            >
            <input
              type="text"
              :id="`analysis-title-${itemIndex}`"
              v-model="analysisItem.title"
              class="rounded-md py-2 px-3 bg-neutral-800 w-full text-neutral-50"
              :placeholder="`Título para o item de análise ${itemIndex + 1}`"
            />
          </div>
          <div
            v-for="(paragraph, paragraphIndex) in analysisItem.text"
            :key="paragraphIndex"
            class="flex items-center gap-2"
          >
            <textarea
              v-model="analysisItem.text[paragraphIndex]"
              rows="4"
              class="w-full rounded-md py-2 px-3 bg-neutral-800 text-neutral-50"
              :placeholder="`Parágrafo ${paragraphIndex + 1} do item de análise ${itemIndex + 1}`"
              required
            ></textarea>
            <button
              type="button"
              @click="removeAnalysisParagraph(analysisItem, paragraphIndex)"
              class="bg-red-600 hover:bg-red-700 py-2 px-3 rounded-md text-neutral-50 text-sm font-medium"
              v-if="analysisItem.text.length > 1"
            >
              Delete
            </button>
          </div>
          <button
            type="button"
            @click="addAnalysisParagraph(analysisItem)"
            class="inline-flex items-center px-3 py-2 border border-transparent font-medium rounded-md text-neutral-50 bg-fuchsia-600 hover:bg-fuchsia-700 w-fit"
          >
            Add Paragraph to Analysis
          </button>
        </div>
        <button
          type="button"
          @click="addAnalysisItem"
          class="inline-flex items-center px-3 py-2 border border-transparent font-medium rounded-md text-neutral-50 bg-fuchsia-600 w-fit hover:bg-fuchsia-700"
        >
          Add New Analysis Item
        </button>
      </div>

      <!-- Aplicação Prática -->
      <div class="border-t border-fuchsia-400 pt-4 flex flex-col gap-4">
        <h3 class="text-lg font-semibold text-fuchsia-400">Aplicação Prática</h3>
        <div
          v-for="(practicalItem, itemIndex) in newDevotional.practicalApplication"
          :key="itemIndex"
          class="py-2 px-3 rounded-md bg-neutral-900 flex flex-col gap-2"
        >
          <div class="flex justify-between items-center">
            <h4 class="text-base font-medium text-fuchsia-400">
              Application Item {{ itemIndex + 1 }}
            </h4>
            <button
              type="button"
              @click="removePracticalApplicationItem(itemIndex)"
              class="bg-red-600 hover:bg-red-700 py-2 px-3 rounded-md text-neutral-50 text-sm font-medium"
              v-if="newDevotional.practicalApplication.length > 1"
            >
              Delete
            </button>
          </div>
          <div class="flex items-center gap-2">
            <label
              :for="`practical-title-${itemIndex}`"
              class="font-medium text-sm text-nowrap text-fuchsia-400"
              >Item Title (Optional):</label
            >
            <input
              type="text"
              :id="`practical-title-${itemIndex}`"
              v-model="practicalItem.title"
              class="rounded-md w-full py-2 px-3 bg-neutral-800 text-neutral-50"
              :placeholder="`Título para o item de aplicação ${itemIndex + 1}`"
            />
          </div>
          <div
            v-for="(paragraph, paragraphIndex) in practicalItem.text"
            :key="paragraphIndex"
            class="flex items-center gap-2"
          >
            <textarea
              v-model="practicalItem.text[paragraphIndex]"
              rows="4"
              class="w-full rounded-md py-2 px-3 bg-neutral-800 text-neutral-50"
              :placeholder="`Parágrafo ${paragraphIndex + 1} do item de aplicação ${itemIndex + 1}`"
              required
            ></textarea>
            <button
              type="button"
              @click="removePracticalApplicationParagraph(practicalItem, paragraphIndex)"
              class="bg-red-600 hover:bg-red-700 py-2 px-3 rounded-md text-neutral-50 text-sm font-medium"
              v-if="practicalItem.text.length > 1"
            >
              Delete
            </button>
          </div>
          <button
            type="button"
            @click="addPracticalApplicationParagraph(practicalItem)"
            class="inline-flex items-center px-3 py-2 border border-transparent w-fit font-medium rounded-md text-neutral-50 bg-fuchsia-600 hover:bg-fuchsia-700"
          >
            Add Paragraph to Application
          </button>
        </div>
        <button
          type="button"
          @click="addPracticalApplicationItem"
          class="inline-flex items-center px-3 py-2 border border-transparent w-fit font-medium rounded-md text-neutral-50 bg-fuchsia-600 hover:bg-fuchsia-700"
        >
          Add New Application Item
        </button>
      </div>

      <!-- Reflexão Pessoal -->
      <div class="border-t border-fuchsia-400 pt-4 flex flex-col gap-4">
        <h3 class="text-lg font-semibold text-fuchsia-400">Personal Reflection</h3>
        <div
          v-for="(paragraph, index) in newDevotional.reflection"
          :key="index"
          class="flex items-center gap-2"
        >
          <textarea
            v-model="newDevotional.reflection[index]"
            rows="4"
            class="w-full rounded-md py-2 px-3 bg-neutral-900 text-neutral-50"
            :placeholder="`Pergunta ou Parágrafo ${index + 1} da Reflexão`"
            required
          ></textarea>
          <button
            type="button"
            @click="removeParagraph(newDevotional.reflection, index)"
            class="bg-red-600 hover:bg-red-700 py-2 px-3 rounded-md text-neutral-50 text-sm font-medium"
            v-if="newDevotional.reflection.length > 1"
          >
            Delete
          </button>
        </div>
        <button
          type="button"
          @click="addParagraph(newDevotional.reflection)"
          class="inline-flex items-center px-3 py-2 border w-fit border-transparent font-medium rounded-md text-neutral-50 bg-fuchsia-600 hover:bg-fuchsia-700"
        >
          Add Paragraph/Question
        </button>
      </div>

      <!-- Oração -->
      <div class="border-t border-fuchsia-400 pt-4 flex flex-col gap-4">
        <h3 class="text-lg font-semibold text-fuchsia-400">Prayer</h3>
        <div
          v-for="(paragraph, index) in newDevotional.prayer"
          :key="index"
          class="flex items-center gap-2"
        >
          <textarea
            v-model="newDevotional.prayer[index]"
            rows="4"
            class="w-full rounded-md py-2 px-3 bg-neutral-900 text-neutral-50"
            :placeholder="`Parágrafo ${index + 1} da Oração`"
            required
          ></textarea>
          <button
            type="button"
            @click="removeParagraph(newDevotional.prayer, index)"
            class="bg-red-600 hover:bg-red-700 py-2 px-3 rounded-md text-neutral-50 text-sm font-medium"
            v-if="newDevotional.prayer.length > 1"
          >
            Delete
          </button>
        </div>
        <button
          type="button"
          @click="addParagraph(newDevotional.prayer)"
          class="inline-flex items-center w-fit px-3 py-2 font-medium rounded-md text-neutral-50 bg-fuchsia-600 hover:bg-fuchsia-700"
        >
          Add Paragraph
        </button>
      </div>

      <!-- Botão de Envio -->
      <div class="">
        <button
          type="submit"
          class="w-full inline-flex justify-center py-3 px-6 border border-transparent text-lg font-medium rounded-md text-neutral-50 bg-fuchsia-700 hover:bg-fuchsia-800"
        >
          Save Devotional
        </button>
      </div>
    </form>
  </div>
</template>
