import { db } from '../config'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'

const METADATA_DOC_PATH = 'metadata/updates'

export const notifyUpdate = async () => {
  try {
    const docRef = doc(db, METADATA_DOC_PATH)
    await setDoc(docRef, { lastUpdated: serverTimestamp() }, { merge: true })
  } catch (error) {
    console.error('Erro ao notificar atualização:', error)
  }
}

export const getLastUpdate = async () => {
  try {
    const docRef = doc(db, METADATA_DOC_PATH)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return docSnap.data().lastUpdated
    }
    return null
  } catch (error) {
    console.error('Erro ao buscar timestamp de atualização:', error)
    return null
  }
}
