<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps<{
  container?: HTMLElement | null
}>()

const isVisible = ref(false)
const activeContainer = ref<HTMLElement | Window>(window)

const handleScroll = () => {
  const scrollTop =
    activeContainer.value instanceof Window
      ? window.scrollY
      : (activeContainer.value as HTMLElement).scrollTop
  isVisible.value = scrollTop > 300
}

const scrollToTop = () => {
  activeContainer.value.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

const updateContainer = () => {
  // Remove previous listener if exists
  activeContainer.value.removeEventListener('scroll', handleScroll)

  // Use prop container if provided, otherwise window
  activeContainer.value = props.container || window
  activeContainer.value.addEventListener('scroll', handleScroll)

  // Initial check
  handleScroll()
}

onMounted(() => {
  updateContainer()
})

onUnmounted(() => {
  activeContainer.value.removeEventListener('scroll', handleScroll)
})

watch(
  () => props.container,
  () => {
    updateContainer()
  },
)
</script>

<template>
  <Transition name="fade">
    <button v-if="isVisible" @click="scrollToTop"
      class="fixed bottom-2 right-2 1440:right-12 1600:right-34 1920:right-74 z-50 bg-fuchsia-900 hover:bg-fuchsia-950 text-neutral-50 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center cursor-pointer"
      aria-label="Voltar para o topo">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor"
        class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
      </svg>
    </button>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
