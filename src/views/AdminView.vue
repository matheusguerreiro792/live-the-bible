<script setup lang="ts">
import { ref } from 'vue'
import DevotionalForm from '@/components/DevotionalForm.vue'
import StudiesForm from '@/components/StudiesForm.vue'

const showDevotionalForm = ref(false)
const showStudyForm = ref(false)

const openDevotionalForm = () => {
  showDevotionalForm.value = true
}
const closeDevotionalForm = () => {
  showDevotionalForm.value = false
}

const openStudyForm = () => {
  showStudyForm.value = true
}
const closeStudyForm = () => {
  showStudyForm.value = false
}
</script>

<template>
  <main class="flex flex-col flex-1 bg-neutral-900 text-neutral-50 px-21 gap-4 p-4 items-center">
    <h1 class="text-3xl font-semibold text-yellow-500 w-full">Admin</h1>
    <div class="bg-neutral-800 flex flex-col gap-4 p-4 w-full rounded-lg shadow-md">
      <div class="flex justify-between items-center p-4 border-2 rounded-lg border-neutral-900">
        <h2 class="text-xl font-medium ml-3">Devotionals</h2>
        <button
          class="bg-green-600 py-2 px-3 rounded-lg cursor-pointer appearance-none hover:bg-green-700 active:bg-green-800"
          @click="openDevotionalForm"
        >
          Create
        </button>
      </div>
      <div class="flex justify-between items-center p-4 border-2 rounded-lg border-neutral-900">
        <h2 class="text-xl font-medium ml-3">Studies</h2>
        <button
          class="bg-green-600 py-2 px-3 rounded-lg cursor-pointer appearance-none hover:bg-green-700 active:bg-green-800"
          @click="openStudyForm"
        >
          Create
        </button>
      </div>
    </div>
    <DevotionalForm v-if="showDevotionalForm" @close="closeDevotionalForm" />
    <StudiesForm v-if="showStudyForm" @close="closeStudyForm" />
  </main>
</template>

<style scoped></style>
