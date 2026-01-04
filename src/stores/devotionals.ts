import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getLatestDevotional, getDevotionals } from '@/firebase/services/devotionals'

interface Devotional {
  id?: string
  title: string
  verse: {
    verse: string
    versions: {
      arc: string
      nvi: string
      ntlh: string
    }
  }
  theme: string
  introduction: string[]
  analysis: {
    title?: string
    text: string[]
  }[]
  practicalApplication: {
    title?: string
    text: string[]
  }[]
  reflection: string[]
  prayer: string[]
  createdAt: any
}

export const useDevotionalsStore = defineStore('devotionals', () => {
  const latestDevotional = ref<Devotional | null>(null)
  const allDevotionals = ref<Devotional[]>([])

  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const LATEST_DEVOTIONAL_CACHE_KEY = 'latestDevotionalCache'
  const LATEST_DEVOTIONAL_LAST_FETCH_DATE_KEY = 'latestDevotionalLastFetchDate'

  const ALL_DEVOTIONALS_CACHE_KEY = 'allDevotionalsCache'
  const ALL_DEVOTIONALS_LAST_FETCH_DATE_KEY = 'allDevotionalsLastFetchDate'

  const isToday = (dateString: string): boolean => {
    const today = new Date()
    const cachedDate = new Date(dateString)
    return (
      today.getDate() === cachedDate.getDate() &&
      today.getMonth() === cachedDate.getMonth() &&
      today.getFullYear() === cachedDate.getFullYear()
    )
  }

  const fetchLatestDevotional = async () => {
    isLoading.value = true
    error.value = null

    try {
      const cachedData = localStorage.getItem(LATEST_DEVOTIONAL_CACHE_KEY)
      const lastFetchDate = localStorage.getItem(LATEST_DEVOTIONAL_LAST_FETCH_DATE_KEY)

      if (cachedData && lastFetchDate && isToday(lastFetchDate)) {
        latestDevotional.value = JSON.parse(cachedData) as Devotional
        console.log('Devocional mais recente carregado do cache local.')
        return
      }

      console.log('Buscando devocional mais recente do Firestore...')
      const devotional = await getLatestDevotional()

      if (devotional) {
        latestDevotional.value = devotional

        localStorage.setItem(LATEST_DEVOTIONAL_CACHE_KEY, JSON.stringify(devotional))
        localStorage.setItem(LATEST_DEVOTIONAL_LAST_FETCH_DATE_KEY, new Date().toISOString())
        console.log('Devocional mais recente salvo no cache local.')
      } else {
        latestDevotional.value = null
        error.value = 'Nenhum devocional encontrado. Por favor, adicione um na área administrativa.'
      }
    } catch (e: any) {
      console.error('Erro ao buscar ou carregar devocional mais recente:', e)
      error.value = `Erro ao carregar devocional: ${e.message || 'Verifique sua conexão e as regras do Firebase.'}`

      localStorage.removeItem(LATEST_DEVOTIONAL_CACHE_KEY)
      localStorage.removeItem(LATEST_DEVOTIONAL_LAST_FETCH_DATE_KEY)
    } finally {
      isLoading.value = false
    }
  }

  const fetchAllDevotionals = async () => {
    isLoading.value = true
    error.value = null

    try {
      const cachedData = localStorage.getItem(ALL_DEVOTIONALS_CACHE_KEY)
      const lastFetchDate = localStorage.getItem(ALL_DEVOTIONALS_LAST_FETCH_DATE_KEY)

      if (cachedData && lastFetchDate && isToday(lastFetchDate)) {
        allDevotionals.value = JSON.parse(cachedData) as Devotional[]
        console.log('Lista de devocionais carregada do cache local.')
        return
      }

      console.log('Buscando lista de devocionais do Firestore...')
      const devotionals = await getDevotionals()

      if (devotionals && devotionals.length > 0) {
        allDevotionals.value = devotionals as Devotional[]
        localStorage.setItem(ALL_DEVOTIONALS_CACHE_KEY, JSON.stringify(devotionals))
        localStorage.setItem(ALL_DEVOTIONALS_LAST_FETCH_DATE_KEY, new Date().toISOString())
        console.log('Lista de devocionais salva no cache local.')
      } else {
        allDevotionals.value = []
        error.value = 'Nenhum devocional encontrado na lista.'
      }
    } catch (e: any) {
      console.error('Erro ao buscar ou carregar lista de devocionais:', e)
      error.value = `Erro ao carregar lista de devocionais: ${e.message || 'Verifique sua conexão e as regras do Firebase.'}`
      localStorage.removeItem(ALL_DEVOTIONALS_CACHE_KEY)
      localStorage.removeItem(ALL_DEVOTIONALS_LAST_FETCH_DATE_KEY)
    } finally {
      isLoading.value = false
    }
  }

  const clearCache = () => {
    localStorage.removeItem(LATEST_DEVOTIONAL_CACHE_KEY)
    localStorage.removeItem(LATEST_DEVOTIONAL_LAST_FETCH_DATE_KEY)
    latestDevotional.value = null

    localStorage.removeItem(ALL_DEVOTIONALS_CACHE_KEY)
    localStorage.removeItem(ALL_DEVOTIONALS_LAST_FETCH_DATE_KEY)
    allDevotionals.value = []

    console.log('Cache de devocionais limpo.')
  }

  return {
    latestDevotional,
    allDevotionals,
    isLoading,
    error,
    fetchLatestDevotional,
    fetchAllDevotionals,
    clearCache,
  }
})
