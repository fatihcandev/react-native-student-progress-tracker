import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'student-progress-tracker-f69e2.firebaseapp.com',
  projectId: 'student-progress-tracker-f69e2',
  storageBucket: 'student-progress-tracker-f69e2.appspot.com',
  messagingSenderId: '463659212390',
  appId: '1:463659212390:web:8f5b868674e85e8ead17a7',
  measurementId: 'G-HG43CD1VXL',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
