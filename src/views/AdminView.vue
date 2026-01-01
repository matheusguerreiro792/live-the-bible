<script setup lang="ts"></script>

<template>
  <main class="flex flex-col flex-1 bg-neutral-900 text-neutral-50 px-21">
    <h1 class="text-3xl font-semibold text-yellow-500 my-4">Admin</h1>
    <div class="bg-neutral-800 flex flex-col gap-4 p-4 rounded-lg shadow-md">
      <div class="flex justify-between items-center p-4 border-2 rounded-lg border-neutral-900">
        <h2 class="text-xl font-medium ml-3">Devotionals</h2>
        <button
          class="bg-green-600 py-2 px-3 rounded-lg cursor-pointer appearance-none hover:bg-green-700 active:bg-green-800"
        >
          Create
        </button>
      </div>
      <div class="flex justify-between items-center p-4 border-2 rounded-lg border-neutral-900">
        <h2 class="text-xl font-medium ml-3">Studies</h2>
        <button
          class="bg-green-600 py-2 px-3 rounded-lg cursor-pointer appearance-none hover:bg-green-700 active:bg-green-800"
        >
          Create
        </button>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
