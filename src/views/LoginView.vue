<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { auth } from '@/firebase/config'
import { signInWithEmailAndPassword } from 'firebase/auth'

const email = ref('')
const password = ref('')
const errorMessage = ref<string | null>(null)
const router = useRouter()

const handleLogin = async () => {
  errorMessage.value = null
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value)
    router.push('/admin')
  } catch (error: any) {
    console.error('Erro de login:', error.code, error.message)
    switch (error.code) {
      case 'auth/user-not-found':
        errorMessage.value = 'Usuário não encontrado. Verifique seu e-mail.'
        break
      case 'auth/wrong-password':
        errorMessage.value = 'Senha incorreta. Tente novamente.'
        break
      case 'auth/invalid-email':
        errorMessage.value = 'E-mail inválido.'
        break
      case 'auth/too-many-requests':
        errorMessage.value = 'Muitas tentativas de login. Tente novamente mais tarde.'
        break
      default:
        errorMessage.value = 'Erro ao fazer login. Verifique suas credenciais.'
        break
    }
  }
}
</script>

<template>
  <main class="flex flex-1 items-center justify-center bg-fuchsia-950">
    <div class="w-1/4 p-4 gap-4 flex flex-col bg-neutral-50 rounded-lg shadow-md">
      <h2 class="text-center text-2xl font-bold text-fuchsia-950">Acesso Administrativo</h2>
      <p class="text-center text-sm text-neutral-950 -mt-2">Entre com suas credenciais...</p>
      <form class="flex flex-col gap-4" @submit.prevent="handleLogin">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email" class="sr-only">E-mail</label>
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="appearance-none rounded-none relative w-full px-3 py-2 border border-neutral-400 placeholder-neutral-500 text-neutral-950 rounded-t-md focus:outline-none focus:ring-fuchsia-900 focus:border-fuchsia-900 focus:z-10"
              placeholder="E-mail"
              v-model="email"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Senha</label>
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="appearance-none rounded-none relative w-full px-3 py-2 border border-neutral-400 placeholder-neutral-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-fuchsia-900 focus:border-fuchsia-900 focus:z-10"
              placeholder="Senha"
              v-model="password"
            />
          </div>
        </div>

        <div v-if="errorMessage" class="text-red-700 text-sm flex justify-center text-center">
          {{ errorMessage }}
        </div>

        <div>
          <button
            type="submit"
            class="group w-full flex justify-center py-2 px-4 border border-transparent font-medium rounded-md text-white bg-fuchsia-900 hover:bg-fuchsia-950 active:bg-fuchsia-800 focus:outline-none"
          >
            Entrar
          </button>
        </div>
      </form>
    </div>
  </main>
</template>
