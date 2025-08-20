import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: 'AIzaSyCahepORrGAl--fTbt7qffV1AqQZdVP94I',
  authDomain: 'live-the-bible.firebaseapp.com',
  projectId: 'live-the-bible',
  storageBucket: 'live-the-bible.firebasestorage.app',
  messagingSenderId: '143781290759',
  appId: '1:143781290759:web:6dc2ef5a399821e8a35ba2',
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const auth = getAuth(app)
