<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="flex h-24 relative justify-center items-center bg-fuchsia-900">
    <img
      class="h-3/4 absolute left-3 top-1/2 -translate-y-1/2"
      src="./assets/logo-biblia-sem-fundo.png"
      alt="Bíblia"
    />
    <img class="h-full" src="./assets/logo-texto-sem-fundo.png" alt="Viva a Bíblia" />
  </header>
  <nav
    class="bg-fuchsia-950 text-neutral-50 flex gap-3 font-medium text-lg justify-center items-center p-2"
  >
    <RouterLink active-class="underline underline-offset-2" class="hover:opacity-85" to="/"
      >Home</RouterLink
    >
    <RouterLink
      active-class="underline underline-offset-2"
      class="hover:opacity-85"
      to="/devocionais"
      >Devocionais</RouterLink
    >
    <RouterLink active-class="underline underline-offset-2" class="hover:opacity-85" to="/estudos"
      >Estudos</RouterLink
    >
    <RouterLink active-class="underline underline-offset-2" class="hover:opacity-85" to="/sobre"
      >Sobre</RouterLink
    >
  </nav>
  <RouterView />
  <footer
    class="bg-neutral-950 text-neutral-50 text-sm p-1 font-mono flex h-fit justify-center items-center"
  >
    RS &copy; {{ new Date().getFullYear() }} Viva a Bíblia
  </footer>
</template>

<style scoped></style>
