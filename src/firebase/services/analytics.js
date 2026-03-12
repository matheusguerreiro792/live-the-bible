import { db } from '../config'
import { collection, addDoc, serverTimestamp, getCountFromServer } from 'firebase/firestore'

/**
 * Gets the total number of visits from Firestore.
 */
export const getVisitCount = async () => {
  try {
    const visitsRef = collection(db, 'visits')
    const snapshot = await getCountFromServer(visitsRef)
    return snapshot.data().count
  } catch (error) {
    console.error('Erro ao buscar contagem de visitas:', error)
    return 0
  }
}

/**
 * Tracks a visit to the application.
 * Uses sessionStorage to avoid multiple counts in the same session.
 */
export const trackVisit = async () => {
  // Check if we already tracked this session
  if (sessionStorage.getItem('viva_biblia_visited')) {
    return
  }

  try {
    const visitsRef = collection(db, 'visits')
    await addDoc(visitsRef, {
      timestamp: serverTimestamp(),
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
      // Optional: you could add screen resolution or other non-identifying info
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      referrer: document.referrer || 'direct'
    })
    
    // Mark as visited in this session
    sessionStorage.setItem('viva_biblia_visited', 'true')
  } catch (error) {
    // Fail silently to not impact user experience
    console.error('Erro ao registrar visita:', error)
  }
}
