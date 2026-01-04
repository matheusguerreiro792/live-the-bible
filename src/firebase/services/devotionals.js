import { db } from '../config'
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore'

export const getDevotionals = async () => {
  try {
    const devotionalsRef = collection(db, 'devotionals')

    const q = query(devotionalsRef, orderBy('createdAt', 'desc'))
    const querySnapshot = await getDocs(q)
    const devotionals = []
    querySnapshot.forEach((doc) => {
      devotionals.push({ id: doc.id, ...doc.data() })
    })
    return devotionals
  } catch (error) {
    console.error('Erro ao buscar devocionais:', error)
    throw error
  }
}

export const getDevotional = async (id) => {
  try {
    const docRef = doc(db, 'devotionals', id)
    const docSnapshot = await getDoc(docRef)
    if (docSnapshot.exists()) {
      return { id: docSnapshot.id, ...docSnapshot.data() }
    } else {
      return null
    }
  } catch (error) {
    console.error('Erro ao buscar devocional:', error)
    throw error
  }
}

export const getLatestDevotional = async () => {
  try {
    const devotionalsRef = collection(db, 'devotionals')

    const q = query(devotionalsRef, orderBy('createdAt', 'desc'), limit(1))
    const querySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0]
      return { id: doc.id, ...doc.data() }
    } else {
      return null
    }
  } catch (error) {
    console.error('Erro ao buscar o devocional mais recente:', error)
    throw error
  }
}

export const postDevotional = async (devotional) => {
  try {
    const devotionalsRef = collection(db, 'devotionals')
    const docRef = await addDoc(devotionalsRef, devotional)
    return { id: docRef.id, ...devotional }
  } catch (error) {
    console.error('Erro ao adicionar devocional:', error)
    throw error
  }
}

export const updateDevotional = async (id, updatedData) => {
  try {
    const docRef = doc(db, 'devotionals', id)
    await updateDoc(docRef, updatedData)
    return { id, ...updatedData }
  } catch (error) {
    console.error('Erro ao atualizar devocional:', error)
    throw error
  }
}

export const deleteDevotional = async (id) => {
  try {
    const docRef = doc(db, 'devotionals', id)
    await deleteDoc(docRef)
  } catch (error) {
    console.error('Erro ao deletar devocional:', error)
    throw error
  }
}
