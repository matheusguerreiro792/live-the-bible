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
import { notifyUpdate } from './sync'

export const getStudies = async () => {
  try {
    const studiesRef = collection(db, 'studies')

    const q = query(studiesRef, orderBy('createdAt', 'desc'))
    const querySnapshot = await getDocs(q)
    const studies = []
    querySnapshot.forEach((doc) => {
      studies.push({ id: doc.id, ...doc.data() })
    })
    return studies
  } catch (error) {
    console.error('Erro ao buscar estudos:', error)
    throw error
  }
}

export const getStudie = async (id) => {
  try {
    const docRef = doc(db, 'studies', id)
    const docSnapshot = await getDoc(docRef)
    if (docSnapshot.exists()) {
      return { id: docSnapshot.id, ...docSnapshot.data() }
    } else {
      return null
    }
  } catch (error) {
    console.error('Erro ao buscar estudo:', error)
    throw error
  }
}

export const getLatestStudie = async () => {
  try {
    const studiesRef = collection(db, 'studies')

    const q = query(studiesRef, orderBy('createdAt', 'desc'), limit(1))
    const querySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0]
      return { id: doc.id, ...doc.data() }
    } else {
      return null
    }
  } catch (error) {
    console.error('Erro ao buscar o estudo mais recente:', error)
    throw error
  }
}

export const postStudie = async (studie) => {
  try {
    const studiesRef = collection(db, 'studies')
    const docRef = await addDoc(studiesRef, studie)
    await notifyUpdate()
    return { id: docRef.id, ...studie }
  } catch (error) {
    console.error('Erro ao adicionar estudo:', error)
    throw error
  }
}

export const updateStudie = async (id, updatedData) => {
  try {
    const docRef = doc(db, 'studies', id)
    await updateDoc(docRef, updatedData)
    await notifyUpdate()
    return { id, ...updatedData }
  } catch (error) {
    console.error('Erro ao atualizar estudo:', error)
    throw error
  }
}

export const deleteStudie = async (id) => {
  try {
    const docRef = doc(db, 'studies', id)
    await deleteDoc(docRef)
    await notifyUpdate()
  } catch (error) {
    console.error('Erro ao deletar estudo:', error)
    throw error
  }
}
