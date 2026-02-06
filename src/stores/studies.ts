import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getLatestStudie, getStudies } from '@/firebase/services/studies'

interface Studie {
  id?: string
  title: string
  theme: string
  content: string
  createdAt: any
}

export const useStudiesStore = defineStore('studies', () => {
  const latestStudie = ref<Studie | null>(null)
  const allStudies = ref<Studie[]>([])
  const selectedTheme = ref<string | null>(null)

  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const LATEST_STUDIE_CACHE_KEY = 'latestStudieCache'
  const LATEST_STUDIE_LAST_FETCH_DATE_KEY = 'latestStudieLastFetchDate'
  const ALL_STUDIES_CACHE_KEY = 'allStudiesCache'
  const ALL_STUDIES_LAST_FETCH_DATE_KEY = 'allStudiesLastFetchDate'

  const isToday = (dateString: string): boolean => {
    const today = new Date()
    const cachedDate = new Date(dateString)
    return (
      today.getDate() === cachedDate.getDate() &&
      today.getMonth() === cachedDate.getMonth() &&
      today.getFullYear() === cachedDate.getFullYear()
    )
  }

  const fetchLatestStudie = async () => {
    isLoading.value = true
    error.value = null

    try {
      const cachedData = localStorage.getItem(LATEST_STUDIE_CACHE_KEY)
      const lastFetchDate = localStorage.getItem(LATEST_STUDIE_LAST_FETCH_DATE_KEY)

      if (cachedData && lastFetchDate && isToday(lastFetchDate)) {
        latestStudie.value = JSON.parse(cachedData) as Studie
        console.log('Estudo mais recente carregado do cache local.')
        return
      }

      console.log('Buscando estudo mais recente do Firestore...')
      const studie = await getLatestStudie()

      if (studie) {
        latestStudie.value = studie

        localStorage.setItem(LATEST_STUDIE_CACHE_KEY, JSON.stringify(studie))
        localStorage.setItem(LATEST_STUDIE_LAST_FETCH_DATE_KEY, new Date().toISOString())
        console.log('Estudo mais recente salvo no cache local.')
      } else {
        latestStudie.value = null
        error.value = 'Nenhum estudo encontrado. Por favor, adicione um na área administrativa.'
      }
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : 'Erro desconhecido'
      console.error('Erro ao buscar ou carregar estudo mais recente:', e)
      error.value = `Erro ao carregar estudo: ${errorMessage || 'Verifique sua conexão e as regras do Firebase.'}`

      localStorage.removeItem(LATEST_STUDIE_CACHE_KEY)
      localStorage.removeItem(LATEST_STUDIE_LAST_FETCH_DATE_KEY)
    } finally {
      isLoading.value = false
    }
  }

  const fetchAllStudies = async () => {
    isLoading.value = true
    error.value = null

    try {
      const cachedData = localStorage.getItem(ALL_STUDIES_CACHE_KEY)
      const lastFetchDate = localStorage.getItem(ALL_STUDIES_LAST_FETCH_DATE_KEY)

      if (cachedData && lastFetchDate && isToday(lastFetchDate)) {
        allStudies.value = JSON.parse(cachedData) as Studie[]
        console.log('Lista de estudos carregada do cache local.')
        return
      }

      console.log('Buscando lista de estudos do Firestore...')
      const studies = await getStudies()

      if (studies && studies.length > 0) {
        allStudies.value = studies as Studie[]
        localStorage.setItem(ALL_STUDIES_CACHE_KEY, JSON.stringify(studies))
        localStorage.setItem(ALL_STUDIES_LAST_FETCH_DATE_KEY, new Date().toISOString())
        console.log('Lista de estudos salva no cache local.')
      } else {
        allStudies.value = []
        error.value = 'Nenhum estudo encontrado na lista.'
      }
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : 'Erro desconhecido'
      console.error('Erro ao buscar ou carregar lista de estudos:', e)
      error.value = `Erro ao carregar lista de estudos: ${errorMessage || 'Verifique sua conexão e as regras do Firebase.'}`
      localStorage.removeItem(ALL_STUDIES_CACHE_KEY)
      localStorage.removeItem(ALL_STUDIES_LAST_FETCH_DATE_KEY)
    } finally {
      isLoading.value = false
    }
  }

  const setSelectedTheme = (theme: string | null) => {
    selectedTheme.value = theme
  }

  const filteredStudies = computed(() => {
    if (!selectedTheme.value) {
      return allStudies.value
    }
    return allStudies.value.filter((studie) => studie.theme === selectedTheme.value)
  })

  const clearCache = () => {
    localStorage.removeItem(LATEST_STUDIE_CACHE_KEY)
    localStorage.removeItem(LATEST_STUDIE_LAST_FETCH_DATE_KEY)
    latestStudie.value = null

    localStorage.removeItem(ALL_STUDIES_CACHE_KEY)
    localStorage.removeItem(ALL_STUDIES_LAST_FETCH_DATE_KEY)
    allStudies.value = []
    selectedTheme.value = null

    console.log('Cache de estudos limpo.')
  }

  return {
    latestStudie,
    allStudies,
    isLoading,
    error,
    fetchLatestStudie,
    fetchAllStudies,
    selectedTheme,
    setSelectedTheme,
    filteredStudies,
    clearCache,
  }
})
