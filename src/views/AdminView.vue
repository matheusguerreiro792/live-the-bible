<script setup lang="ts">
import { ref, onMounted } from 'vue'
import DevotionalForm from '@/components/DevotionalForm.vue'
import StudiesForm from '@/components/StudiesForm.vue'
import { getDevotionals, deleteDevotional } from '@/firebase/services/devotionals'
import { getStudies, deleteStudie } from '@/firebase/services/studies'
import type { Devotional, Studie } from '@/types'

const devotionals = ref<Devotional[]>([])
const studies = ref<Studie[]>([])

const showDevotionalForm = ref(false)
const showStudyForm = ref(false)
const editingDevotional = ref<Devotional | null>(null)
const editingStudy = ref<Studie | null>(null)

const fetchData = async () => {
  try {
    devotionals.value = await getDevotionals()
    studies.value = await getStudies()
  } catch (error) {
    console.error('Erro ao buscar dados:', error)
  }
}

onMounted(fetchData)

const openDevotionalForm = (devotional: Devotional | null = null) => {
  editingDevotional.value = devotional
  showDevotionalForm.value = true
}
const closeDevotionalForm = () => {
  showDevotionalForm.value = false
  editingDevotional.value = null
}

const openStudyForm = (study: Studie | null = null) => {
  editingStudy.value = study
  showStudyForm.value = true
}
const closeStudyForm = () => {
  showStudyForm.value = false
  editingStudy.value = null
}

const handleDeleteDevotional = async (id: string | undefined) => {
  if (!id) return
  if (confirm('Deseja realmente excluir este devocional?')) {
    await deleteDevotional(id)
    await fetchData()
  }
}

const handleDeleteStudy = async (id: string | undefined) => {
  if (!id) return
  if (confirm('Deseja realmente excluir este estudo?')) {
    await deleteStudie(id)
    await fetchData()
  }
}
</script>

<template>
  <main class="flex flex-col flex-1 bg-neutral-900 text-neutral-50 gap-4 p-4 items-center w-full max-w-342 mx-auto">
    <h1 class="text-4xl font-semibold text-yellow-400 w-full mb-1">Administração</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
      <!-- Devotionals Section -->
      <section class="bg-neutral-800 flex flex-col gap-4 p-6 rounded-xl shadow-xl border border-neutral-700">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-semibold text-fuchsia-400">Devocionais</h2>
          <button class="bg-green-600 py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors shadow-lg"
            @click="openDevotionalForm()">
            Novo Devocional
          </button>
        </div>

        <div class="flex flex-col gap-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
          <div v-for="item in devotionals" :key="item.id"
            class="flex flex-col gap-2 p-4 bg-neutral-900 rounded-lg border border-neutral-800 hover:border-fuchsia-500/50 transition-all group">
            <div class="flex justify-between items-start">
              <h3 class="font-medium text-lg text-neutral-200">{{ item.title }}</h3>
              <div class="flex gap-2">
                <button @click="openDevotionalForm(item)"
                  class="bg-blue-600/20 text-blue-400 p-2 rounded hover:bg-blue-600 hover:text-white transition-all text-xs">
                  Editar
                </button>
                <button @click="handleDeleteDevotional(item.id)"
                  class="bg-red-600/20 text-red-400 p-2 rounded hover:bg-red-600 hover:text-white transition-all text-xs">
                  Excluir
                </button>
              </div>
            </div>
            <p class="text-xs text-neutral-500 italic">{{ item.theme }}</p>
          </div>
        </div>
      </section>

      <!-- Studies Section -->
      <section class="bg-neutral-800 flex flex-col gap-4 p-6 rounded-xl shadow-xl border border-neutral-700">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-semibold text-fuchsia-400">Estudos</h2>
          <button class="bg-green-600 py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors shadow-lg"
            @click="openStudyForm()">
            Novo Estudo
          </button>
        </div>

        <div class="flex flex-col gap-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
          <div v-for="item in studies" :key="item.id"
            class="flex flex-col gap-2 p-4 bg-neutral-900 rounded-lg border border-neutral-800 hover:border-fuchsia-500/50 transition-all group">
            <div class="flex justify-between items-start">
              <h3 class="font-medium text-lg text-neutral-200">{{ item.title }}</h3>
              <div class="flex gap-2">
                <button @click="openStudyForm(item)"
                  class="bg-blue-600/20 text-blue-400 p-2 rounded hover:bg-blue-600 hover:text-white transition-all text-xs">
                  Editar
                </button>
                <button @click="handleDeleteStudy(item.id)"
                  class="bg-red-600/20 text-red-400 p-2 rounded hover:bg-red-600 hover:text-white transition-all text-xs">
                  Excluir
                </button>
              </div>
            </div>
            <p class="text-xs text-neutral-500 italic">{{ item.theme }}</p>
          </div>
        </div>
      </section>
    </div>

    <!-- Modals -->
    <div v-if="showDevotionalForm"
      class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <DevotionalForm :devotional="editingDevotional" @close="closeDevotionalForm" @saved="fetchData" />
    </div>

    <div v-if="showStudyForm"
      class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <StudiesForm :studie="editingStudy" @close="closeStudyForm" @saved="fetchData" />
    </div>
  </main>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #444;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
