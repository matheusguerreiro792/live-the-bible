<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header
    class="bg-fuchsia-900 flex justify-center items-center h-24 px-4 py-2 gap-2 425:py-4 sm:py-4 sm:gap-4 sm:justify-start sm:relative"
  >
    <div class="inline-flex items-center h-full w-fit">
      <img
        class="object-contain max-h-full max-w-full"
        src="./assets/logo-biblia-sem-fundo.png"
        alt="Bíblia"
      />
    </div>
    <div
      class="inline-flex items-center h-full w-fit justify-center sm:justify-start sm:absolute sm:left-1/2 sm:-translate-x-1/2"
    >
      <img
        class="object-contain max-h-full max-w-full"
        src="./assets/logo-texto-sem-fundo.png"
        alt="Viva a Bíblia"
      />
    </div>
  </header>
  <nav
    class="bg-fuchsia-950 text-neutral-50 flex gap-3 max-sm:flex-col max-sm:gap-1 font-medium text-lg justify-center items-center p-2"
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
