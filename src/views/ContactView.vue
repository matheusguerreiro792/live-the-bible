<script setup lang="ts">
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const subject = ref('')
const message = ref('')
const submitted = ref(false)

const handleSubmit = () => {
  const mailtoLink = `mailto:livethebible7@gmail.com
?subject=${encodeURIComponent(subject.value)}&body=${encodeURIComponent(`Nome: ${name.value}\nE-mail: ${email.value}\n\n${message.value}`)}`
  window.open(mailtoLink, '_blank')
  submitted.value = true
  name.value = ''
  email.value = ''
  subject.value = ''
  message.value = ''
}
</script>

<template>
  <main class="flex flex-col flex-1 items-center p-4 md:py-11 md:px-20 bg-neutral-100">
    <div class="w-full max-w-342 bg-white py-6 px-6 rounded-lg shadow-lg flex flex-col gap-5">
      <h1 class="text-3xl font-bold text-fuchsia-950 text-center">Contato</h1>
      <p class="text-neutral-700 text-center">
        Tem alguma dúvida, sugestão ou gostaria de entrar em contato conosco? Preencha o formulário abaixo ou
        envie um
        e-mail diretamente para
        <a href="mailto:livethebible7@gmail.com
" class="text-blue-700 font-semibold hover:underline hover:underline-offset-2">livethebible7@gmail.com
        </a>.
      </p>

      <div v-if="submitted"
        class="bg-green-50 border border-green-500 text-green-800 rounded-md p-4 text-center font-medium">
        Obrigado por entrar em contato! Seu e-mail foi preparado para envio.
      </div>

      <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
        <div class="flex flex-col gap-1">
          <label for="contact-name" class="text-fuchsia-900 font-semibold text-sm">Nome *</label>
          <input id="contact-name" v-model="name" type="text" required placeholder="Seu nome completo"
            class="px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-900 focus:border-fuchsia-900 text-neutral-950" />
        </div>

        <div class="flex flex-col gap-1">
          <label for="contact-email" class="text-fuchsia-900 font-semibold text-sm">E-mail *</label>
          <input id="contact-email" v-model="email" type="email" required placeholder="seu@email.com"
            class="px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-900 focus:border-fuchsia-900 text-neutral-950" />
        </div>

        <div class="flex flex-col gap-1">
          <label for="contact-subject" class="text-fuchsia-900 font-semibold text-sm">Assunto *</label>
          <input id="contact-subject" v-model="subject" type="text" required placeholder="Assunto da mensagem"
            class="px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-900 focus:border-fuchsia-900 text-neutral-950" />
        </div>

        <div class="flex flex-col gap-1">
          <label for="contact-message" class="text-fuchsia-900 font-semibold text-sm">Mensagem *</label>
          <textarea id="contact-message" v-model="message" required rows="5" placeholder="Escreva sua mensagem aqui..."
            class="px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-900 focus:border-fuchsia-900 text-neutral-950 resize-y"></textarea>
        </div>

        <button type="submit"
          class="bg-fuchsia-900 text-neutral-50 font-medium py-2 px-4 rounded-md hover:bg-fuchsia-950 active:bg-fuchsia-800 transition-colors shadow">
          Enviar Mensagem
        </button>
      </form>

      <section class="flex flex-col gap-3 border-t border-fuchsia-900 pt-4">
        <h2 class="text-xl font-semibold text-fuchsia-900">Outras Formas de Contato</h2>
        <ul class="list-none text-neutral-950 flex flex-col gap-2">
          <li class="flex items-center gap-2">
            <strong class="text-fuchsia-900">E-mail:</strong>
            <a href="mailto:livethebible7@gmail.com
" class="text-blue-700 font-semibold hover:underline hover:underline-offset-2">livethebible7@gmail.com
            </a>
          </li>
          <li class="flex items-center gap-2">
            <strong class="text-fuchsia-900">YouTube:</strong>
            <a href="https://www.youtube.com/@VivaaB%C3%ADblia-vab7" target="_blank" rel="noopener noreferrer"
              class="text-blue-700 font-semibold hover:underline hover:underline-offset-2">Canal Viva a
              Bíblia</a>
          </li>
        </ul>
      </section>
    </div>
  </main>
</template>
