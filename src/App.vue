<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { trackVisit } from './firebase/services/analytics'

onMounted(() => {
  trackVisit()
})
</script>

<template>
  <header
    class="bg-fuchsia-900 flex justify-center items-center h-24 px-4 py-2 gap-2 425:py-4 sm:py-4 sm:gap-4 sm:justify-start sm:relative">
    <div class="inline-flex items-center h-full w-fit">
      <img class="object-contain max-h-full max-w-full" src="./assets/logo-biblia-sem-fundo.png" alt="Bíblia" />
    </div>
    <div
      class="inline-flex items-center h-full w-fit justify-center sm:justify-start sm:absolute sm:left-1/2 sm:-translate-x-1/2">
      <img class="object-contain max-h-full max-w-full" src="./assets/logo-texto-sem-fundo.png" alt="Viva a Bíblia" />
    </div>
  </header>
  <nav
    class="bg-fuchsia-950 text-neutral-50 flex gap-3 max-sm:flex-col max-sm:gap-1 font-medium text-lg justify-center items-center p-2">
    <RouterLink active-class="underline underline-offset-2" class="hover:opacity-85" to="/">Home</RouterLink>
    <RouterLink active-class="underline underline-offset-2" class="hover:opacity-85" to="/devocionais">Devocionais
    </RouterLink>
    <RouterLink active-class="underline underline-offset-2" class="hover:opacity-85" to="/estudos">Estudos</RouterLink>
    <RouterLink active-class="underline underline-offset-2" class="hover:opacity-85" to="/sobre">Sobre</RouterLink>
    <RouterLink active-class="underline underline-offset-2" class="hover:opacity-85" to="/contato">Contato</RouterLink>
  </nav>
  <RouterView />
  <footer class="bg-neutral-950 text-neutral-50 flex flex-col items-center gap-2 p-2 425:gap-4 425:p-4">
    <nav class="flex flex-wrap justify-center gap-2 text-xs font-medium">
      <div class="flex gap-2 justify-center w-full 425:w-fit 425:border-r 425:border-neutral-400 425:pr-2">
        <RouterLink class="hover:text-fuchsia-500 hover:underline underline-offset-2 transition-colors" to="/sobre">
          Sobre
        </RouterLink>
        <span class="text-neutral-400">|</span>
        <RouterLink class="hover:text-fuchsia-500 hover:underline underline-offset-2 transition-colors" to="/contato">
          Contato</RouterLink>
      </div>
      <div class="flex gap-2 justify-center w-full 425:w-fit">
        <RouterLink class="hover:text-fuchsia-500 hover:underline underline-offset-2 transition-colors"
          to="/politica-de-privacidade">Política de Privacidade</RouterLink>
        <span class="text-neutral-400">|</span>
        <RouterLink class="hover:text-fuchsia-500 hover:underline underline-offset-2 transition-colors"
          to="/termos-de-uso">Termos de Uso</RouterLink>
      </div>
    </nav>
    <p class="text-xs text-neutral-400 font-mono">
      RS &copy; {{ new Date().getFullYear() }} Viva a Bíblia
    </p>
  </footer>
</template>

<style scoped></style>
